# Compile To PHP: Benchmark Results

Method: `tests/compile-php/benchmark.php` renders a 21 KB template
(50 sections mixing static markup, `Get`, `If`/`Else`, and list `Loop`)
200 times per strategy and reports ms per render. Run via:

```sh
wp-env run cli php -d opcache.enable_cli=1 -d opcache.enable=1 \
  -d opcache.file_update_protection=0 \
  wp-content/plugins/tangible-template-system/tests/compile-php/benchmark.php
```

`opcache.file_update_protection=0` matters only for the benchmark itself:
opcache refuses to cache files modified within the last 2 seconds, and the
script measures immediately after compiling. Production files are written
once on save and served long after, so the cached number is representative.

## Results (PHP 8.2, wp-env, 2026-06)

| Strategy | ms/render | Notes |
|---|---|---|
| parse + render (no cache) | 5.12 | production behavior with caches off |
| unserialize + render (transient cache path) | 2.43 | current "processed content" cache |
| render pre-parsed nodes (in memory) | 2.12 | lower bound for the interpreter |
| **compiled include (opcache)** | **2.14** | this feature |
| compiled include (no opcache) | 9.83 | regression — see gate below |
| hand-coded PHP (byte-identical output) | 0.012 | theme template / block render callback equivalent |

The hand-coded baseline shows the template system's total abstraction
overhead is ~170x relative on this workload — but ~2 ms absolute per
render, which is small next to a typical uncached WordPress page
(commonly 50-300 ms). Per-construct costs measured separately: a plain
HTML tag through the pipeline ~1.2 us (vs effectively free hand-coded),
a simple dynamic tag (`Get`, `If`) ~3-4 us, and list loops with nested
fields dominate the rest. The overhead buys render-time semantics:
attribute filters, tag context, local scopes, and loop abstractions.

One-off compile time: ~18 ms for the 21 KB template (483 KB compiled file).

A static-heavy variant (no dynamic tags) favors compiled more clearly:
0.36 ms compiled vs 0.50 ms interpreted (~1.4x), because static markup
becomes direct string concatenation. Dynamic-tag-heavy templates approach
parity, because dynamic tags defer to the same runtime `render_tag` calls
in both paths.

## Interpretation

- Compiled rendering is ~2.4x faster than uncached rendering and on par
  with (slightly ahead of) the transient cache path on dynamic-heavy
  templates, with structural advantages over transients: no database row
  per template, no per-request unserialize, storage shared across requests
  in opcache, immune to transient eviction.
- **Opcache is a hard requirement.** Without it, every include re-parses
  the compiled file and performs ~2x worse than not caching at all. The
  template post and `Load` integrations therefore gate the compiled path
  on `Compiler::isOpcacheEnabled()`.
- The next meaningful speedup is phase-2 codegen: pre-rendering fully
  static subtrees into single string literals and inlining attribute
  rendering where no runtime filter can observe the difference. The
  `tangible_template_render_attributes` filter currently forces attribute
  rendering to stay at runtime for parity (see the
  `tag-context-attributes` fixture).

## Compiled output shape

The template compiles to a named function (keyed by content hash) with a
`static $__data` table holding attribute and child-node arrays, so data is
materialized once per process and shared via opcache. Generated-code format
changes must bump `Compiler::COMPILER_VERSION`, which invalidates cache keys.

## Query-backed loops (tests/compile-php/benchmark-db.php)

The frontend-reporting scenario: 2000 seeded posts with meta, rendering a
200-row report per iteration with a cold object cache (PHP 8.2, June 2026).

Before the post loop primed caches, every strategy paid one post query plus
one meta query per item because the loop's `fields=ids` optimization skips
WP_Query's cache priming:

| Strategy | ms/render | queries/render |
|---|---|---|
| hand-coded PHP | 3.3 | 5 |
| L&L (any strategy) | ~92 | 403 |

After `get_items_from_query` bulk-primes post/meta/term caches via
`_prime_post_caches`:

| Strategy | ms/render | queries/render |
|---|---|---|
| hand-coded PHP | 3.6 | 5 |
| L&L parse + render | 6.3 | 5 |
| L&L pre-parsed | 6.1 | 5 |
| L&L compiled | 5.6 | 5 |

For query-backed templates the database dominated everything: the priming
fix is worth ~16x end-to-end and closes the gap to hand-coded PHP to ~1.5x.
Compiler tiers matter within the remaining render time.

## Progress log (June 2026 sprint)

Synthetic benchmark, compiled ms/render (hand-coded baseline 0.012):

| Stage | ms | vs hand-coded |
|---|---|---|
| Initial scaffold | 2.14 | 178x |
| + static data table | 2.02 | 168x |
| + static subtree/wrapper baking (tier 1) | 1.89 | 158x |
| + Get inlining | ~1.9 | (visible in micro: 30.7x per tag) |
| + compiled loop bodies (closures) | 1.37 | 114x |
| + native If branches | 1.11 | 90x |
| + Field delegation inlining | 0.92 | 80x |
| + hoisted If condition parsing | 0.84 | 67x |
| + pre-decoded loop items | 0.73 | 58x |

Runtime-engine work (benefits interpreted templates equally): a Field
fast path for bare-name and custom= shapes cuts field_tag from 0.99 to
0.65 us (title) and 1.63 to 1.13 us (meta); the DB reporting scenario
lands at 4.27 ms compiled vs 3.26 hand-coded (1.31x), with the
interpreted path improving from 5.73 to 5.47 ms. Measured but not
pursued: the singleton's __call magic costs ~42 ns per hop - real but
small; compiled If emissions now invoke the evaluator closure directly.

DB reporting scenario (200 rows, cold cache): hand-coded 3.2ms / 5
queries; L&L compiled 4.5ms / 5 queries (was 92ms / 403 queries at
sprint start). Remaining ~1.2ms decomposition: compiled loop with empty
body costs 3.59ms (query floor 2.8 + setup_postdata semantics ~0.25 +
cursor bookkeeping), title fields ~0.5us each, meta fields ~1.8us each
(field_tag resolution, shared with the interpreter). Interpretation
overhead specific to the template language is substantially eliminated;
what remains is runtime resolution machinery and intentional WP
integration semantics.

Loop N+1 fixes (independent of compilation, benefit all render paths):
post loop 403 -> 5 queries on the 200-row report; user loop 202 -> 4
queries per 100 users. Attachment inherits the post loop fix;
taxonomy-term primes by default.
