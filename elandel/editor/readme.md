# Editor

This is the code editor based on CodeMirror 6, with a curated and customized set of features designed for the Loops & Logic template language and system.

The goal is to grow into an integrated development environment (IDE) with the editor at its core.

Ideally, the editor and IDE should run well within WordPress, as well as independently, for example as part of a React-based content management system (CMS).

## Features

The main advantage of the new editor is that it's integrated with the template language definition. This allows smart editor features like code completion, hints, snippets, inline documentation.

Another benefit is the extensibility of the editor interface thanks to CodeMirror, such as [info panel](https://codemirror.net/examples/panel/), [tooltip](https://codemirror.net/examples/tooltip/), [decoration](https://codemirror.net/examples/decoration/), [gutter](https://codemirror.net/examples/gutter/), and getting [language syntax at cursor position](https://codemirror.net/docs/ref/#language.syntaxTree).

The following features are integrated into the template editor.

- Language modes
  - Template - HTML extended
  - Style - Sass
  - Script - JavaScript
- Syntax highlight
- Keyboard shortcuts
- Autocomplete tags and attributes, indent level, closing tag
- [Emmet](https://docs.emmet.io/cheat-sheet/) - HTML shortcuts
- Linter to highlight syntax errors
- Formatter to beautify code style
- Color picker
- Hyperlink - Clickable link icon next to a valid URL
- Themes and fonts
- Editor settings - Global for the site and remembered in browser local storage
