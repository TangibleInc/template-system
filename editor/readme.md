# Template editor

This is the new editor based on CodeMirror 6, which will replace the existing template editor in:

- `/template/codemirror` - JS library with heavily customized fork of CM5 and extensions; Used to be a separate repository published as NPM package `@tangible/codemirror`
- `/template/modules/codemirror` - Enqueue a set of scripts and styles
- `/system/editor` - Integrate with template post types in admin edit screen
- `/system/integrations` - Template editor block in Beaver, Elementor, Gutenberg


## Feature ideas

- Linters

- Export single template/block (HTML, CSS, JS) from edit screen
- Import/export single template in Template block inside page builder

- Tag and attribute autocomplete
- Template patterns

