# Compile To PHP: Test Plan

## Purpose
Build confidence that compiled templates are behaviorally identical to the current
runtime renderer while staying safe for dynamic and personalized content.

## Test goals
- Prove parity between compiled output and runtime output.
- Prevent regressions in tag semantics, attribute rendering, and control flow.
- Verify cache safety (no stale content, safe storage, correct invalidation).
- Ensure graceful fallback on compile failures.
- Establish a repeatable harness for future feature tests.

## Test layers

### 1) Unit tests (pure PHP, no WordPress)
Scope: compiler internals, code generation, and helper behavior.

- AST to PHP codegen for text nodes, element nodes, attributes, comments.
- Attribute parsing rules (quoted/unquoted, boolean, empty, special chars).
- Raw tag behavior (no child parsing, preserved content).
- Exit/Catch control flow generation.
- Local scope push/pop order.
- Load tag path normalization and type detection.
- Error handling: invalid node types, missing tag callbacks, malformed attributes.
- Cache key generation: inputs and stable ordering.

### 2) Parity tests (runtime vs compiled)
Scope: same input template and context must yield identical output.

Harness idea:
- Build a fixture set of templates (see below).
- For each fixture:
  - Render with current runtime (`render_with_catch_exit`).
  - Compile and include PHP output.
  - Compare string output exactly.
  - Assert the same Exit/Catch behavior (no residual exit flag).

### 3) WordPress integration tests
Scope: post types, save hooks, and cache invalidation.

- Template post save triggers compile invalidation.
- Compiled file written to cache directory with expected permissions.
- Admin setting toggles compile mode.
- Compile fallback when file missing or hash mismatch.
- Template preview uses expected path (runtime or forced compile).
- Multisite: per-site cache directories and invalidation.

### 4) E2E tests (Playwright)
Scope: editor and front-end rendering.

- Create a template post with code editor.
- Apply template to a page via block or shortcode.
- Confirm front-end matches expected HTML.
- Toggle compile setting and verify output stays identical.
- Confirm warnings appear if cache directory is unsafe.

## Fixture set (parity coverage)

### HTML and attributes
- Plain HTML with nested tags and attributes.
- Boolean attributes, empty attributes, and special characters.
- Mixed quoted/unquoted attributes and spaces.

### Core tags
- `Loop` with basic fields (`title`, `url`, `id`).
- `If` and `Else`, nested conditions.
- `Get`/`Set` and local scope boundaries.
- `Load` of HTML, PHP, and template posts.
- `Shortcode` and raw content tags.
- `Exit` and `Catch` in nested contexts.

### Edge cases
- Whitespace trimming and leading/trailing newlines.
- HTML comment handling.
- Tags with attribute expressions and nested fields.
- Templates with invalid tags (must match runtime error/fallback).

## Cache behavior tests

### Location and protection
- Default path is `wp-content/tangible-template-cache/`.
- Directory contains `index.php` and (Apache/LiteSpeed) `.htaccess`.
- File permissions: 0644; directories: 0755 (or stricter).
- Warn if cache directory is web-accessible.

### Invalidation
- On template post save (content or settings change).
- On template file mtime change.
- On plugin version change.
- On setting changes (compile options hash).

### Integrity and safety
- Hash mismatch forces recompile.
- Corrupted compiled file triggers fallback and warning.
- Attempted path traversal in `Load` is blocked.

## Error handling tests
- Compile exception triggers runtime render.
- Missing compile cache directory triggers runtime render.
- Unexpected runtime errors in compiled output do not fatal the request.
- Log messages and admin notices are consistent and useful.

## Performance tests (non-blocking)
- Measure compile time for large templates.
- Confirm opcache loads compiled files when enabled.
- Verify no additional per-request parsing when compile is on.

## Regression strategy for future features
- Require a parity test for every new tag or syntax change.
- Add a fixture whenever behavior depends on runtime context.
- Prefer test-first for compiler changes to ensure output equivalence.

## Coverage targets
- Compiler and helpers: 90%+ coverage for new code paths.
- Integration tests: cover all compile settings and invalidation paths.
- E2E: at least one user-facing smoke test per major feature.

## References
- `docs/compile-php-spec.md`
- `tests/compile-php/README.md`
