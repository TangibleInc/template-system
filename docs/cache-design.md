# Caching Tier: Design

Goal: throughput for query-heavy templates under concurrency - frontend
reporting over large datasets being the canonical case. Rendering is now
within ~1.3x of hand-written PHP (see compile-php-benchmark.md); the
remaining order-of-magnitude gains are in not repeating database work,
not in rendering faster.

## Layer 0 - query hygiene (shipped)

- Post and user loops bulk-prime object/meta/term caches for each page
  of results (was one object + one meta query per item on cold caches:
  403 queries for a 200-row report, now 5).
- Post loop queries skip `SQL_CALC_FOUND_ROWS`: the loop paginates over
  the fetched ID list in PHP and nothing reads `found_posts`, so the
  forced total-count - a full scan on large tables - was pure waste.
  Overridable via `custom_query`; skipped when WP Grid Builder attaches.

## Layer 1 - query result reuse

**Mostly provided by WordPress core, and that should be verified, not
rebuilt.** Core caches `WP_Query` results in the object cache (6.1+)
keyed on normalized SQL and invalidated via `last_changed` bumps; term
queries are cached similarly, user queries in recent versions. On hosts
with a persistent object cache (Redis/Memcached - standard for the
high-concurrency tier), repeat loop queries are already served from
memory.

Work items:

1. **Verify on a persistent-cache environment**: add a benchmark
   variant against wp-env with Redis (or an equivalent persistent
   drop-in) measuring repeat-render query counts. Expected: near-zero
   queries on warm renders. If reality disagrees, fix the loop's query
   shape until core's caching applies, rather than adding a cache.
2. **Per-request memoization** (small, safe, ours): identical
   normalized loop args rendered more than once in a request (common
   with repeated template parts) reuse the resolved instance. In-memory
   only, no invalidation semantics, no persistence.

## Layer 2 - fragment caching: extend the Cache tag

The `<Cache>` tag already exists (named keys, TTL, transient-backed -
and transients automatically use the persistent object cache when one
is present). It is the right primitive; the gaps are keys and
invalidation, not storage.

Proposed extensions:

1. **Automatic keys**: when `name` is omitted, derive the key from the
   inner template hash plus resolved attributes, so wrapping a loop in
   `<Cache>` needs no manual naming and cannot collide.
2. **Explicit vary**: `vary=user`, `vary=url`, `vary=query` append the
   corresponding context to the key. Personalization safety stays
   opt-in and visible in the template, per the compile spec's caching
   guidance: nothing varies implicitly, defaults cache one shared
   fragment.
3. **Event invalidation**: `invalidate_on="save_post:post_type"` (and
   `save_user`, `edited_term:taxonomy`) - implemented as versioned
   cache groups: matching hooks bump a group version key, which is O(1)
   and works on object caches that cannot enumerate keys. TTL remains
   the backstop.
4. **Compiled-mode awareness** (minor): a cache hit inside a compiled
   template can skip tag dispatch entirely; the tag already works in
   compiled templates via runtime deferral.

Usage target for the reporting case:

```html
<Cache expire="10 minutes" invalidate_on="save_post:report_item">
  <Loop type=report_item ...>...</Loop>
</Cache>
```

Warm renders cost a single object-cache read; edits invalidate
immediately; TTL covers anything the hooks miss.

## Non-goals

- Full-page caching: the host's and page-cache plugins' job; compiled
  templates already avoid bypassing them.
- Storing compiled PHP in the object cache: opcache is the correct
  store for code (answered in the compile spec).
- Implicit caching of anything: every cache in the system is opt-in
  and visible in the template.

## Testing plan

- Fixtures for Cache key derivation and vary behavior (capture.php
  asserting stored keys/groups), and for event invalidation: render,
  store, fire hook, assert miss.
- Repeat-render query-count assertions on a persistent-object-cache
  environment for layer 1 verification.
- E2E: edit a post, reload the cached page, assert fresh content
  before TTL expiry.

## Decision points

1. `vary` value set and spelling; whether `vary=user` means user ID or
   role.
2. `invalidate_on` grammar (hook:qualifier) and which hooks ship first.
3. Whether loops grow `cache=` sugar or `<Cache>` wrapping stays the
   only form (proposal: wrapping only, one way to do it).
4. Whether per-request loop memoization is default-on (proposal: yes -
   no observable behavior change within a request) or opt-in.
