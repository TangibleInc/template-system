# Template System: Editor

This is the new code editor based on CodeMirror 6. It's a curated and customized set of features designed to integrate with the Loops & Logic template (extended HTML), style (Sass), and script (JavaScript).

The goal is to grow into an integrated development environment (IDE) with the editor at its core.


## Upgrade from previous version

Gradually replace the existing code editor in:

- `/template/codemirror` - Heavily customized fork of CodeMirror 5 and extensions - It used to be a separate repository published as NPM package `@tangible/codemirror`
- `/template/assets/src/codemirror` - Export Tangible.CodeMirror
- `/template/modules/codemirror` - Enqueue a set of scripts and styles

- `/system/editor` - Integrate with template post types in admin edit screen
- `/system/integrations` - Template editor block in Beaver, Elementor, Gutenberg


## Usage

Enqueue the code editor from PHP.

```php
use Tangible\TemplateSystem\Editor;

Editor::enqueue();
```

The script defines a global `Tangible.Editor`.


## Feature ideas

- Tag and attribute autocomplete

- Language intelligence features

  - Reference: Visual Studio Code
    - IntelliSense - https://code.visualstudio.com/docs/editor/intellisense
    - Code Navigation - https://code.visualstudio.com/docs/editor/editingevolved
    - Snippets - https://code.visualstudio.com/docs/editor/userdefinedsnippets
    - Emmet - https://code.visualstudio.com/docs/editor/emmet

  - Interface
    - ? Detect language syntax at cursor

      https://codemirror.net/docs/ref/#language.syntaxTree

    - Editor Panel - https://codemirror.net/examples/panel/

      For example, contextual info from current cursor position

    - Tooltip - https://codemirror.net/examples/tooltip/

      Hovers above the cursor

    - Decoration - https://codemirror.net/examples/decoration/

      Element in the editor

    - Gutter - https://codemirror.net/examples/gutter/

      Button to insert/edit tag?

      - Dynamically change document: https://codemirror.net/examples/change/

  - Linter
    - Example - https://codemirror.net/examples/lint/
    - Reference - https://codemirror.net/docs/ref/#lint

  - Autocomplete - https://codemirror.net/examples/autocompletion/

    - Emmet abbreviations

  - Prettier autoformat

    https://prettier.io/docs/en/browser.html


- Export single template/block (HTML, CSS, JS) from edit screen

- Import/export single template in Template block inside page builder

- Template patterns


## Language support

- HTML

  https://github.com/codemirror/lang-html

- Sass

  - Dart Sass https://github.com/sass/dart-sass#dart-sass-in-the-browser

  - ? Stylelint
    Add support for running in a browser https://github.com/stylelint/stylelint/issues/3935
    https://github.com/openstyles/stylelint-bundle/blob/master/rollup.config.js

    https://github.com/stylelint-scss/stylelint-scss

- ESLint
  https://github.com/UziTech/eslint-linter-browserify

- JSON
  https://github.com/codemirror/lang-json/#user-content-jsonparselinter
  https://github.com/codemirror/lang-json/blob/main/src/lint.ts

- PHP
  Old https://github.com/glayzzle/codemirror-linter
  https://discuss.codemirror.net/t/new-php-linter-with-plain-js/1364/5

