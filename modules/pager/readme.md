# Pager

Modular building blocks for pagination

## Upgrade from Paginator v1

- Rewrite in TypeScript
- Use React/Preact or vanilla JS for pager elements instead of jQuery
- Use API module using `fetch` instead of AJAX module using `jQuery.ajax`
- General-purpose functionality
  - Separate WordPress/PHP logic in Template System
  - Support any loop type
  - Support dynamic loading, for example, in page builder preview

## Pager elements

### Fields

A pager "field" is an element that is updated when the pager changes.

- Current page
- Total pages

They're usually used to display `Page X of Y`.

### Actions

An element like `button` can trigger a pager action.  

- `first`
- `last`
- `prev`
- `next`
- `page`

### Loading

Show an element, like a spinner icon, while the pager content is loading.
