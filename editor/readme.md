# Template System Editor

This is the new code editor based on CodeMirror 6.

It's a curated and customized set of features designed to integrate with a template (extended HTML), style (Sass), and script (JavaScript).

The goal is to grow into an integrated development environment (IDE) with the editor at its core.

Ideally, the editor and IDE can run within and without WordPress, for example, as part of a React-based content management system (CMS).


## Features




## Usage

Enqueue the code editor from PHP.

```php
use Tangible\TemplateSystem\Editor as editor;

editor\enqueue_editor();
```

The script defines a global `Tangible.TemplateSystem.CodeEditor`.

## Upgrade from previous version

Replace the existing use of code editor in:

- `/system/editor` - Integrate with template post types in admin edit screen
- `/system/integrations` - Template editor block in Beaver, Elementor, Gutenberg

Then remove CodeMirror 5 entirely.

- `/template/codemirror` - Heavily customized fork of CodeMirror 5 and extensions - It used to be a separate repository published as NPM package `@tangible/codemirror`
- `/template/assets/src/codemirror` - Export Tangible.CodeMirror
- `/template/modules/codemirror` - Enqueue a set of scripts and styles


## Future ideas

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
