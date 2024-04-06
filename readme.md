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

#### Build for production

Builds minified bundles with source maps.

```sh
npm run build [module1 module2..]
```

The project is composed of modules which can be built individually. Specify which modules to build, for example:

```sh
npm run build editor integrations/gutenberg
```

#### Build for development

Watch files for changes and rebuild. Press CTRL + C to stop the process.

```sh
npm run dev [module1 module2..]
```

#### Format files

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


## Test

There is a suite of unit and integration tests included.

### Requirements

Prerequisites: [Docker](https://docs.docker.com/get-started/overview/)

To run the tests, we use [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) to create a local test environment, optionally switching between PHP versions.

Please note that `wp-env` requires Docker to be installed. There are instructions available for installing it on [Windows](https://docs.docker.com/desktop/install/windows-install/), [macOS](https://docs.docker.com/desktop/install/mac-install/), and [Linux](https://docs.docker.com/desktop/install/linux-install/). If you're on Windows, you might have to use [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) to run the tests (see [this comment](https://bitbucket.org/tangibleinc/tangible-fields-module/pull-requests/30#comment-389568162)).


### Prepare

Start the local server environment.

```sh
npm run start
```

After installing everything, it starts a local dev site at `http://localhost:4650`, and test site at `http://localhost:4651`. The default user is `admin` with `password`.

(These port numbers are defined in `.wp-env.json`. An arbitrary number was chosen to avoid conflict with any other environment running on `wp-env`, whose default port numbers are `8888` and `8889`. If you have anything running on the above ports, stop them first.)

Install Composer dependencies for development and testing.

```sh
npm run env:composer
```

This runs `composer install` in the container.


### Install plugin dependencies

This step is optional. Run the following to install plugin dependencies such as Advanced Custom Fields, Beaver Builder, Elementor, and WP Fusion.

```sh
npm run deps all
```

They will be downloaded in the folder `vendor/tangible`. Existing plugins will be skipped. Pass the the option `--update` to re-download their latest version.

```sh
npm run deps all --update
```

You can install and update plugins individually. Run `npm run deps` to see the help screen.

After install, the command updates the file `.wp-env.override.json` to map the local plugin folders to the Docker container. Run `npm run start` to restart the server.


### Run tests

This repository includes NPM scripts to run the tests with PHP versions 7.4 and 8.2.

**Note**: We need to maintain compatibility with PHP 7.4, as WordPress itself only has beta support for PHP 8.x. See [PHP Compatibility and WordPress versions](https://make.wordpress.org/core/handbook/references/php-compatibility-and-wordpress-versions/) and [Usage Statistics](https://wordpress.org/about/stats/).


Ensure a local environment is running, then run tests using a specific PHP version. This will tell `wp-env` to install it.

```sh
npm run test:8.2
```

The version-specific command takes a while to start, but afterwards you can run the following to re-run tests in the same environment.

```sh
npm run test
```

To switch the PHP version, run a different version-specific command.

```sh
npm run test:7.4
```

To stop the Docker process:

```sh
npm run stop
```

Usually it's enough to run `start` and `stop`. To completely remove the created Docker images and cache:

```sh
npm run destroy
```

#### Reference

Relevant info for writing unit tests:

- [PHPUnit](https://github.com/sebastianbergmann/phpunit)
  - [PHPUnit Polyfills](https://github.com/Yoast/PHPUnit-Polyfills)
  - [Assertions](https://docs.phpunit.de/en/10.5/assertions.html)

- [WP_UnitTestCase](https://github.com/WordPress/wordpress-develop/blob/trunk/tests/phpunit/includes/abstract-testcase.php)
  - [WP_UnitTest_Factory](https://github.com/WordPress/wordpress-develop/blob/trunk/tests/phpunit/includes/factory/class-wp-unittest-factory.php)
  - [WP_UnitTest_Factory_For_Post](https://github.com/WordPress/wordpress-develop/blob/trunk/tests/phpunit/includes/factory/class-wp-unittest-factory-for-post.php)


### End-to-end tests

The folder `/tests/e2e` contains end-to-end-tests using [Playwright](https://playwright.dev/docs/intro) and [WordPress E2E Testing Utils](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/).

#### Run

Run the tests. This will start the local WordPress environment with `wp-env` as needed. Then Playwright starts a browser engine to interact with the test site.

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
├── content                    // Content Structure
├── form                       // Form
├── editor                     // Code editor
│
├── framework                  // Framework module shared by plugins
│   │
│   ├── admin                  // Admin features 
│   ├── ajax                   // AJAX
│   ├── api                    // API
│   ├── auth                   // Authentication
│   ├── date                   // Date module based on Carbon library
│   ├── format                 // Format methods
│   ├── hjson                  // Human JSON
│   ├── html                   // New streaming HTML parser and renderer 
│   ├── interface              // Interface module (backward compatibility)
│   ├── log                    // Logger
│   ├── object                 // Object module (backward compatibility)
│   ├── plugin                 // Plugin features
│   ├── preact                 // Preact
│   └── select                 // Select2 (forked)
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
│   ├── codemirror-v5          // CodeMirror v5 (legacy)
│   ├── date-picker            // Date picker
│   ├── embed                  // Embed
│   ├── glider                 // Glider image gallery
│   ├── hyperdb                // HyperDB
│   ├── markdown               // Markdown
│   ├── math                   // Math
│   ├── mermaid                // Mermaid diagram language
│   ├── mobile-detect          // Mobile detect
│   ├── module-loader          // Dynamic module loader
│   ├── paginator              // Paginator
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
    ├── deps                   // Install and update third-party plugins
    └── git-subrepo            // Manage Git subrepos
```

Above reference based on output of `tree`.

```sh
tree -I vendor -I node_modules -I artifacts --gitignore -d -L 2
```
