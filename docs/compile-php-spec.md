# Compile To PHP: Spec Draft

## Purpose
Switch the Template System runtime from interpreted render to compiled PHP templates
while keeping the template language syntax and behavior stable. Compiled templates
should benefit from opcache and reduce per-request parsing overhead.

## Goals
- Preserve all template syntax and tag behavior.
- Compile template posts and file-based templates to PHP.
- Use opcache for compiled templates where available.
- Keep PHP 8.0 and WordPress compatibility.
- Provide safe fallback to current render on errors.

## Non-goals
- Changing the template language syntax.
- Rewriting tag implementations in a new language.
- Removing existing object or transient caches.
- Full monorepo restructuring or Doctrine ORM adoption in this refactor.

## Standards alignment
- New compiler-related code should use PascalCase namespaces and PSR-4 autoloading.
- Avoid introducing new global functions; add typed class entry points and keep globals as wrappers for BC.
- Prefer DDD-style separation for new services (Domain/Application/Infrastructure).
- Keep static analysis and formatting requirements in view for new/edited code (Phan, PHP-CS-Fixer).

## Current behavior (summary)
- Template post content is parsed and rendered at runtime.
- `admin/template-post/render.php` calls `$html->render_with_catch_exit()` and
  manages local scope, assets, and atomic CSS.
- Parsed content can be cached in transients (`admin/template-post/cache.php`).
- Tags are registered at runtime in `language/tags/index.php` and rendered via
  `language/html/render/*`.
- `Load` reads files and renders them through the same runtime (`language/tags/load.php`).

## Proposed architecture

### Compile outputs
- Compiled PHP file per template post or file-based template.
- Compiled template returns a string (not echo) to match current pipeline.
- Compiled PHP is loaded via `include` from `render_template_post` or `Load`.

### Compiler inputs
- Parsed nodes from `language/html/parse/index.php`.
- Tag registry from `language/html/tag/*`.
- Render behavior from `language/html/render/*`.
- Template context data (local scope, tag context, assets map).

### Compile strategy
- Convert the parsed node tree to PHP code that:
  - Concatenates strings for static text and HTML tags.
  - Calls runtime helpers for dynamic tags and attributes.
  - Preserves raw tag behavior and attribute render rules.
  - Preserves `Exit` / `Catch` behavior.
- Keep a minimal runtime library for common operations:
  - `render_tag`, `render_nodes`, `render_attributes` for dynamic tags.
  - `render_attribute_value`, `render_with_catch_exit`.
  - Local scope push and pop.

### Service boundaries (new code)
- Domain: compiler primitives and template AST transforms.
- Application: compile orchestration, cache keys, and invalidation rules.
- Infrastructure: WordPress hooks, post save integration, and filesystem I/O.

### Cache location
- Default compile cache path in `wp-content/uploads/tangible-template-cache/`.
- Avoid plugin directory writes to prevent permissions issues.
- Ensure cache directory creation and safe permissions.
- Consider `wp-content/tangible-template-cache/` to avoid public uploads.

### Cache key
- Template ID (post ID or file path).
- Template content hash or post modified time.
- Template System version (`template_system::$state->version`).
- Compile settings version (options hash).

### Invalidation
- On template post save (in `admin/template-post/save.php`).
- On file change (hash or mtime).
- On plugin update (version change).
- Manual "Clear compiled templates" admin action.

## Settings proposal

New settings in `admin/settings/index.php`:
- `compile_php_templates` (bool, default false).
- `compile_cache_path` (string, default uploads cache path).
- `compile_auto_reload` (bool, default `WP_DEBUG`).
- `compile_string_strategy` (enum: `no-compile`, `compile-to-temp`, `compile-and-cache`).

Hooks:
- `tangible_template_compile_options` to filter compiler options.
- `tangible_template_compile_cache_path` to override cache path.
- `tangible_template_compile_enabled` to toggle per request.

## Behavior constraints to preserve

### Dynamic tags
- Must call the same callbacks in `language/tags/*`.
- Honor `skip_render_keys`, raw tag behavior, and local tags.

### Exit / Catch
- Exit should short-circuit remaining nodes in a template.
- Catch must reset the exit flag even when nested.
- Compiled output should emulate the same control flow.

### Local scope
- Each template post or file load pushes a local scope and pops it after render.
- Scope behavior must match `language/tags/get-set/local.php`.

### Load tag
- `Load` should preserve relative paths and context in `language/tags/load.php`.
- For HTML and PHP files, compiled output should wrap content with context markers
  similar to `load_template_with_context`.

### Attributes and raw tags
- `render_attributes` and `render_attribute_value` behavior must match existing
  string parsing and attribute rendering rules.
- Raw tags should not parse or render child content.

## Integration points

### Template post render
- `admin/template-post/render.php` should:
  - Prefer compiled PHP when available and enabled.
  - Fall back to `$html->render_with_catch_exit()` on failure.
  - Keep asset and CSS or JS handling unchanged.

### Load tag
- `language/tags/load.php` should:
  - Compile file templates if enabled.
  - Fall back to runtime render for unknown types or errors.

## Error handling
- Compilation errors should log warnings and fall back to runtime rendering.
- Rendering errors should use existing `render_with_catch_exit` handling.
- Avoid fatal errors in production for missing or stale compiled files.

## Security and safety
- Cache directory should not be web-served or should be protected.
- Compiled file contents should not include user-submitted PHP.
- Avoid writing to plugin directories in production.
- Use fixed, sanitized cache keys only; never accept user paths.
- Write compiled files atomically (temp file then rename).

## Caching safety (dynamic and personalized content)
- Compiled PHP templates should be treated as code cache only, not data cache.
- Output caching must be opt-in and explicitly keyed by user or session context.
- Provide guidance for high-risk tags (LMS progress, user actions, auth-aware UI)
  to avoid fragment caching unless keys vary by user.
- If output caching is added later, defaults must be "off" and TTLs should be
  conservative with explicit invalidation hooks.

## Cache directory policy (performance + security)

### Location
- Prefer `wp-content/tangible-template-cache/` (not uploads) to reduce public exposure.
- Use per-site subdirectories for multisite, e.g. `wp-content/tangible-template-cache/{blog_id}/`.

### Access protection
- Always place an `index.php` to prevent directory listing.
- On Apache/LiteSpeed, write `.htaccess` with `Require all denied` (or `Deny from all`)
  and optionally disable PHP execution in that folder.
- On NGINX, provide a server block snippet and show an admin warning if the cache
  directory is web-accessible.

### Server config snippets

Apache / LiteSpeed (.htaccess inside `wp-content/tangible-template-cache/`):
```
Require all denied
Deny from all
<IfModule mod_authz_core.c>
  Require all denied
</IfModule>
<IfModule mod_php.c>
  php_flag engine off
</IfModule>
Options -Indexes
```

NGINX (add to server block):
```
location ^~ /wp-content/tangible-template-cache/ {
  deny all;
  return 403;
}
```

### Permissions
- Directories: `0755` (or `0700` if safe); files: `0644`.
- Avoid `0777` unless forced by hosting environment.

### Integrity
- Store a hash (sha256) for each compiled file in metadata or alongside the file.
- Verify hash on load; recompile if mismatch and log a warning.

### Clean-up behavior
- On plugin deactivation, remove cache directory if empty.
- Provide a "clean uninstall" option to delete all compiled files.

### Server cache interaction
- Compiled PHP should not bypass full-page caches by default.
- Provide hooks to let host or cache plugins purge on template changes.

### Diagnostics
- If the cache dir is reachable via URL or has incorrect permissions, warn and
  suggest disabling compile mode until fixed.
- For writable cache dirs, optionally create a temporary probe file, request it
  over HTTP, then delete it. If the probe is readable, treat the directory as
  exposed and warn immediately.

## Phased rollout (draft)
1. Foundation alignment: introduce PSR-4 autoloading for compiler code paths and add typed class entry points.
2. Add compiler scaffolding and settings (disabled by default).
3. Support template posts only, with fallback to runtime render.
4. Add file-based `Load` support.
5. Add compile cache tools and admin UI for clearing.
6. Expand tests for parity with current render output.

## Implementation checklist (draft)
- Define compiler entry points and service boundaries (Domain/Application/Infrastructure).
- Add a parity test harness that compares runtime vs compiled output.
- Build a fixture set that exercises tags, attributes, Exit/Catch, and raw tags.
- Implement cache directory creation with protection files and integrity hashing.
- Add invalidation hooks for template saves, file changes, and version changes.
- Ensure safe fallback paths with logging and admin warnings.

## Compile contracts: keeping the language pluggable and compiled

The compiler currently special-cases a fixed set of core constructs
(static markup baking, Get/Field inlining, If condition hoisting, Loop
body closures) and defers everything else to runtime dispatch. That is
correct but treats every extension as an opaque box, which is the main
remaining cost relative to fully compiled template languages.

The proposal is to move that knowledge into the registration API, so an
extension can tell the compiler what to do with its syntax. Twig uses
the same model: extensions participate in compilation rather than only
in rendering. Three tiers:

### Tier 0 - opaque (default, today's behavior)

Register a render callback and nothing else. The compiler defers to
`render_tag` with runtime guards, exactly as now. Nothing existing
changes or breaks; undeclared tags are simply not fast.

### Tier 1 - declarations

Registration carries flags the compiler may rely on:

```php
$html->add_open_tag( 'MyTag', $callback, [
  'compile' => [
    'version'               => 1,     // joins the cache key
    'deterministic'         => false, // output fixed given attributes
    'reads_loop_context'    => true,
    'static_children_safe'  => true,  // children may be baked through it
  ],
] );
```

Cheap for authors, and replaces the compiler's hardcoded whitelists:
baking and hoisting decisions consult declarations instead of tag-name
lists. Logic rules gain the same option, e.g. a registered rule may
provide `compile_comparison` returning a native PHP expression for its
operands, so extension conditions become native branches.

### Tier 2 - emitters

Registration provides a compile function: given the parsed attributes
and children, emit code through a constrained builder (append literal,
append expression, compile children inline, defer to runtime). This is
the full Twig-style path that removes dispatch entirely. The builder
API - not raw code strings - is the security boundary; until an
external ecosystem exists, tier 2 can remain first-party.

### Rules that make this safe

- **Certification**: no compile contract is accepted without a parity
  fixture (`tests/compile-php/fixtures/`). The parity, cache-path, and
  never-fatal suites are the conformance tests for declared tags.
- **Versioning**: contract versions and the active plugin set join the
  compile cache key (the latter is already implemented), so changing a
  declaration invalidates affected compiled templates.
- **Core dogfoods it**: the existing hardcoded Get/If/Loop/Field
  handling migrates behind the same registration API as the first
  tier-1/tier-2 adopters, so first-party integrations are not a
  second-class mechanism.
- **The attribute filter carve-out**: anonymous render-time filters
  (`tangible_template_render_attributes`, `attribute_escape`) cannot
  participate in compilation by nature. The existing tripwire remains
  the compatibility path - hooking them falls the template back to the
  runtime renderer. A future registered-transformer API with the same
  declarations could supersede the global filter.

### Side effect on code structure

Compile contracts require named, typed registration structures rather
than anonymous closures assigned to singleton properties. Migrating
core tags onto the registration API is therefore also an incremental
path toward explicit interfaces for tag definitions - per tag, in
place, verified by fixtures - without a rewrite.

## Open questions
- Which dynamic tags are safe to inline vs. defer to runtime calls?
  (Answered by compile contracts above: the ones that declare it.)
- How to version cache when integrations add new tags? (Answered:
  active plugin set and contract versions join the cache key.)
- Should compiled templates be stored in object cache for memory only?
- How should preview renders in editor bypass or refresh compiled output?

## References
- `language/html/render/index.php`
- `language/html/render/tag.php`
- `language/html/parse/index.php`
- `admin/template-post/render.php`
- `admin/template-post/cache.php`
- `language/tags/load.php`
- `docs/compile-php-test-plan.md`
