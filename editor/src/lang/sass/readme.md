# Sass language support for CodeMirror

Currently using [`@codemirror/legacy-modes/mode/sass`](https://github.com/codemirror/legacy-modes/blob/main/mode/sass.js).

See if it's possible to create a lighter and more modern language mode based on [`@codemirror/lang-css`](https://github.com/codemirror/lang-css) and [`@lezer/css`](https://github.com/lezer-parser/css).

The file `scss.grammar` is a lezer grammar file generated using [`import-tree-sitter`](https://github.com/lezer-parser/import-tree-sitter) and [`tree-sitter-scss`](https://github.com/serenadeai/tree-sitter-scss). It might be a start.
