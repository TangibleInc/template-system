# Docs

Docusaurus with custom configuration

- `app` - React pages
- `pages` - Markdown pages
- `style.scss` - Tangible Design module


#### MDX pages

In `pages/components`, MDX files import React examples from `lib`.

Note that entirely React pages under `app` do not have a sidebar and don't get automatically added to the sidebar like MDX files do. Some MDX files are thin wrapper to import the main React page content.
