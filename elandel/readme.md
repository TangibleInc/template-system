# Elandel

Elandel is a **template language** and ecosystem for authoring hypermedia documents on the web.

As a concept, it is inspired by:

- [Computational notebooks](https://maggieappleton.com/computational-notebooks) - Shareable, browser-based documents that can run code
- [End-user Programming](https://www.inkandswitch.com/end-user-programming/) - Empowering users with a living system to create their own software for personal computing
- [Literate programming](https://en.wikipedia.org/wiki/Literate_programming) - Programs are written as literature that describes each section of code

---

It is a TypeScript library with an extensible **HTML engine** based on [Unified](https://unifiedjs.com/) and [hast](https://github.com/syntax-tree/hast) (Hypertext Abstract Syntax Tree format); and **CSS engine** based on [PostCSS](https://github.com/postcss/postcss).

It can **parse** a template into a syntax tree; format to **beautify** code; and **render** it with loops, logic, and dynamic content.

There is an **editor** library based on CodeMirror that deeply integrates with the language. It is designed to be extended with additional features such as charts, diagrams, musical blocks.

The goal is to create a cross-platform template language definition that works in the browser, server side (WordPress/PHP/MySQL/SQLite), and JavaScript runtimes (Node/Bun). This portability would allow features like:

- Instant preview in the editor without request to server
- Local-first web authoring environment with deploy to cloud
- Content management frontend and server with data sources
- Static site generation

As the project develops, it will include a comprehensive test suite and documentation of language features.
