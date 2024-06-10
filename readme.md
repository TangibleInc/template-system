# Template System

This is the template system shared by Tangible Blocks and Loops & Logic.

**Source code**: https://github.com/tangibleinc/template-system

**Documentation**: https://docs.loopsandlogic.com/reference/template-system/


## Overview

The codebase is organized by feature areas, which are made up of modules.

- [Language](language/) - Defines the template language and tags
- [Admin](admin/) - Admin features such as template post types, editor, import/export, assets, locations, layouts, builder integrations
- [Modules](modules/) - Additional template system features, such as Chart, Slider, Table
- [Integrations](integrations/) - Integrate with third-party plugins
- [Framework](../framework/) - Features shared across plugins, such as AJAX, Date, HJSON

Each module should aim to be generally useful, clarify its dependencies internal and external, and ideally be well-documented and tested. Some are published as NPM (JavaScript) or Composer (PHP) package.

See section [Folder Structure](#folder-structure) for a detailed view.


## Getting started

Prerequisites: [Git](https://git-scm.com/) and [Node](https://nodejs.org/en/)

Clone the repository, and install dependencies.

```sh
git clone https://github.com/tangibleinc/template-system
cd template-system
npm install
```

### Contributing

To contribute to the codebase, [create a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) and make a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests). Tangible team members can clone from `git@github.com:tangibleinc/template-system`, and pull request from a feature branch.


## Develop

### Start local dev site

```sh
npm run start
```

### Build for production

Builds minified bundles with source maps.

```sh
npm run build [module1 module2..]
```

The project is composed of modules which can be built individually. Specify which modules to build, for example:

```sh
npm run build editor integrations/gutenberg
```

### Build for development

Watch files for changes and rebuild. Press CTRL + C to stop the process.

```sh
npm run dev [module1 module2..]
```

### Format files

Format files to code standard with [Prettier](https://prettier.io) and [PHP Beautify](https://github.com/tangibleinc/php-beautify).

```sh
npm run format [module1 module2..]
```

### List all modules with assets

See the complete list of modules with assets.

```sh
npm run list
```

The list is generated from the codebase by finding all config files `tangible.config.js`, and gathering their folder names relative to the project root.

These can be built with the `dev` and `build` commands.

For example, `npm run build admin` will build all child modules of the `admin` module; or you can build an individual module like `npm run build admin/editor`.

### Install optional plugin dependencies

This step is optional. Run the following to install plugin dependencies such as Advanced Custom Fields, Beaver Builder, Elementor, and WP Fusion.

```sh
npm run deps all
```

They will be downloaded in the folder `vendor/tangible`. Existing plugins will be skipped. Pass the the option `--update` to re-download their latest version.

```sh
npm run deps all --update
```

You can install and update plugins individually. Run `npm run deps` to see the help screen.

After install, the command updates the file `.wp-env.override.json` to map the local plugin folders.


## Test

There is a suite of unit and integration tests included. The test environment uses `wp-now`, which does not require Docker or PHP being installed on the local system.

Run the tests.

```sh
npm run test
```

By default it uses PHP 7.4, the oldest version we support. WordPress itself only has beta support for PHP 8.x. See [PHP Compatibility and WordPress versions](https://make.wordpress.org/core/handbook/references/php-compatibility-and-wordpress-versions/) and [Usage Statistics](https://wordpress.org/about/stats/).

Run the tests with PHP 8.3.

```sh
npm run test:8.3
```

Run the tests with PHP 7.4 and 8.3, as well as end-to-end tests.

```sh
npm run test:all
```

### End-to-end tests

The folder `/tests/e2e` contains end-to-end-tests using [Playwright](https://playwright.dev/docs/intro) and [WordPress E2E Testing Utils](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/).

```sh
npm run e2e
```

The first time you run it, it will prompt you to install the browser engine (Chromium).

```sh
npx playwright install
```

#### Watch mode

There is a "Watch mode", where it will watch the test files for changes and re-run them. 
This provides a helpful feedback loop when writing tests, as a kind of test-driven development. Press CTRL + C to stop the process.

```sh
npm run e2e:watch
```

A common usage is to have terminal sessions open with `npm run dev` (build assets and watch to rebuild) and `npm run e2e:watch` (run tests and watch to re-run).

#### UI mode

There's also "UI mode" that opens a browser interface to see the tests run.

```sh
npm run e2e:ui
```

#### Utilities

Here are the common utilities used to write the tests.

- `test` - https://playwright.dev/docs/api/class-test
- `expect` - https://playwright.dev/docs/api/class-genericassertions
- `admin` - https://github.com/WordPress/gutenberg/tree/trunk/packages/e2e-test-utils-playwright/src/admin
- `page` - https://playwright.dev/docs/api/class-page
- `request` - https://playwright.dev/docs/api/class-apirequestcontext

#### References

Examples of how to write end-to-end tests:

- WordPress E2E tests - https://github.com/WordPress/wordpress-develop/blob/trunk/tests/e2e
- Gutenberg E2E tests - https://github.com/WordPress/gutenberg/tree/trunk/test/e2e


## Folder structure

```js
.
├── admin                      // Admin features
│   │
│   ├── editor                 // Template editor
│   ├── import-export          // Import/export
│   ├── location               // Template location
│   ├── post-types             // Template post types
│   ├── settings               // Plugin settings
│   ├── template-assets        // Template assets
│   ├── template-post          // Template post
│   └── universal-id           // Universal ID
│
├── content                    // Content Structure integration
├── form                       // Form
├── editor                     // Template editor core
│
├── elandel                    // TypeScript implementation of the template language
│   ├── css                    // CSS engine with extended syntax
│   ├── editor                 // Code editor
│   └── html                   // HTML engine with extended syntax
│
├── framework                  // Framework module shared by plugins
│   │
│   ├── admin                  // Admin features 
│   ├── ajax                   // AJAX
│   ├── api                    // API
│   ├── async-action           // Async action
│   ├── background-queue       // Background queue
│   ├── content                // Content structure
│   ├── date                   // Date module based on Carbon library
│   ├── design                 // Design
│   ├── empty-block-theme      // Empty Block Theme for testing
│   ├── env                    // Dev and test environment
│   ├── format                 // Format methods
│   ├── hjson                  // Human JSON
│   ├── html                   // New streaming HTML parser and renderer 
│   ├── interface              // Interface module (deprecated)
│   ├── log                    // Logger
│   ├── object                 // Object module (deprecated)
│   ├── plugin                 // Plugin features
│   ├── preact                 // Preact
│   └── select                 // Select
│
├── integrations               // Vendor integrations
│   │
│   ├── advanced-custom-fields // Advanced custom fields
│   ├── beaver                 // Beaver Builder
│   ├── elementor              // Elementor
│   ├── gutenberg              // Gutenberg
│   ├── tangible-fields        // Tangible Fields
│   ├── themes                 // Themes
│   ├── third-party            // Third-party extension interface
│   ├── wp-fusion              // WP Fusion
│   └── wp-grid-builder        // WP Grid Builder
│
├── language                   // Template language
│   │
│   ├── format                 // Format methods
│   ├── html                   // HTML parser and renderer
│   ├── logic                  // Logic rules for If tag
│   └── tags                   // Dynamic tags
│
├── logic                      // Logic module
│
├── loop
│   └── types                  // Loop types
│       │
│       ├── attachment         // Attachment
│       ├── base               // Base loop class
│       ├── calendar           // Calendar
│       ├── comment            // Comment
│       ├── field              // Field loop
│       ├── list               // List 
│       ├── map                // Map
│       ├── menu               // Menu
│       ├── post               // Post, page, custom post type
│       ├── taxonomy           // Taxonomy
│       ├── taxonomy-term      // Taxonomy term
│       ├── type               // Post type
│       └── user               // User
│
├── modules                    // Feature modules
│   │
│   ├── async                  // Async
│   ├── cache                  // Cache
│   ├── calendar               // Calendar
│   ├── chart                  // Chart
│   ├── codemirror-v5          // CodeMirror v5 (deprecated)
│   ├── date-picker            // Date picker
│   ├── embed                  // Embed
│   ├── glider                 // Glider image gallery
│   ├── hyperdb                // HyperDB
│   ├── logic-v1               // Logic v1 (deprecated)
│   ├── markdown               // Markdown
│   ├── math                   // Math
│   ├── mermaid                // Mermaid diagram language
│   ├── mobile-detect          // Mobile detect
│   ├── module-loader          // Dynamic module loader
│   ├── pager                  // Pager
│   ├── prism                  // Prism syntax highlighter
│   ├── sass                   // Sass compiler
│   ├── slider                 // Slider
│   ├── sortable               // Sortable
│   └── table                  // Table
│
├── tests
│   ├── e2e                    // End-to-end tests with Playwright
│   ├── empty-block-theme      // Empty block theme for testing
│   ├── html                   // HTML test suite
│   └── integrations           // Integration tests with third-party plugins
│
└── tools
    └── git-subrepo            // Manage Git subrepos
```

Above reference based on output of `tree`.

```sh
tree -I vendor -I node_modules -I artifacts -I publish --gitignore -d -L 2
```
