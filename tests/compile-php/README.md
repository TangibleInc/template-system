# Compile-to-PHP Test Harness (Skeleton)

This folder outlines the structure and naming conventions for compiler tests.
It is intentionally light-weight so tests can be added incrementally.

## Proposed layout

```
tests/compile-php/
  README.md
  fixtures/
    README.md
    <slug>/
      template.ll.html
      context.json
      expected.html
```

## Naming conventions

- Fixture folders use kebab-case slugs, e.g. `basic-loop`, `exit-catch-nested`.
- Template files use `template.ll.html` to avoid confusion with plain HTML fixtures.
- Context is `context.json` for data passed to the runtime compiler harness.
- Expected output is `expected.html` for parity comparisons.

## Intended usage

- A parity harness should render each fixture via runtime and compiled output and
  assert equality.
- Fixtures should be added for every new tag or syntax change.
