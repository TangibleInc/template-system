# Elandel

Elandel is HTML reimagined with loops and logic.

```html
<Loop type=article count=3>
  <h1><Field title /></h1>
  <If field=status value=draft>(Draft)</If>
  <p><Field excerpt /></p>
</Loop>
```

It's a cross-platform template language and authoring environment for hypermedia documents on the web.

The language can be learned by anyone familiar with the HTML syntax. The tree-structured templates are programs composed with a smart code editor and visual block designer.

The project aims to unify the application user interface, document structure, design and styling, state and behavior; as well as server-side actions, content types, and fields - all written in the same language.

## Library

Currently there is a TypeScript library with an extensible **HTML template engine** based on [Unified](https://unifiedjs.com/) and [hast](https://github.com/syntax-tree/hast) (Hypertext Abstract Syntax Tree format); and **CSS style engine** based on [PostCSS](https://github.com/postcss/postcss) and [Sass](https://github.com/sass/dart-sass).

- **Parse** a language into a syntax tree
- **Beautify** the code formatting
- **Render** with loops, logic, and dynamic content

The **editor** is based on [CodeMirror](https://codemirror.net/) with language integration such as hints, autocomplete, syntax check, and formatting.

The editing environment can be extended with additional blocks such as charts, diagrams, or music scores. Language support planned: HTML, Markdown, CSS, Sass, JSON, JavaScript, TypeScript, maybe even SVG, MusicXML.

## Next

The goal is a **content management system** that runs in the browser and server side. Data sources are pluggable adaptors with a common interface: local storage in browser (origin private file system), WordPress (MySQL/MariaDB/SQLite), JavaScript runtimes (Node/Bun), API server in Go.

This portability would allow features like:

- Local-first web authoring environment (IDE) on the web
- Admin screens built with the template language
- Instant preview in the editor without request to server
- Static site generation
- Sites interacting with each other: move/copy/sync content, shared users

As the project develops, it will include a comprehensive test suite; documentation of language features with live examples; and an open pattern library of templates that can be copy-and-pasted.

### Inspiration

- [Computational notebooks](https://maggieappleton.com/computational-notebooks) - Shareable, browser-based documents that can run code
- [End-user Programming](https://www.inkandswitch.com/end-user-programming/) - Empowering users with a living system to create their own software for personal computing
- [Literate programming](https://en.wikipedia.org/wiki/Literate_programming) - Programs are written as literature that describes each section of code
