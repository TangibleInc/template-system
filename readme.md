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

## Getting started

Prerequisites: [Node.js](https://nodejs.org/en/)

Clone the repository, and install dependencies.

```sh
git clone git@github.com:tangibleinc/template-system.git
cd template-system
npm install
```

## Develop

#### Build for production

Builds minified bundles with source maps.

```sh
npm run build [module1 module2..]
```

The Template System is composed of modules which can be built individually. Specify which modules to build, for example:

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

```sh
- admin
  - admin/editor
  - admin/import-export
  - admin/location
  - admin/template-assets
- editor
  - editor/ide
- framework
  - framework/api
  - framework/preact
  - framework/select
- integrations/beaver
- integrations/elementor
- integrations/gutenberg
- language
- logic
- loop
- modules
  - modules/async
  - modules/chart
  - modules/date-picker
  - modules/embed
  - modules/form
  - modules/glider
  - modules/mermaid
  - modules/module-loader
  - modules/paginator
  - modules/prism
  - modules/site-structure
  - modules/slider
  - modules/sortable
  - modules/table
```

These can be built with the `dev` and `build` commands.

For example, `npm run build admin` will build all child modules of the `admin` module; or you can build an individual module like `npm run build admin/editor`.


## Test

There is a suite of unit and integration tests included.

### Requirements

Prerequisites: [Node.js](https://nodejs.org/en/), [PHP](https://www.php.net/), [Composer](https://getcomposer.org/), [Docker](https://docs.docker.com/get-started/overview/)

To run the tests, we use [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) to create a local test environment, optionally switching between PHP versions.

Please note that `wp-env` requires Docker to be installed. There are instructions available for installing it on [Windows](https://docs.docker.com/desktop/install/windows-install/), [macOS](https://docs.docker.com/desktop/install/mac-install/), and [Linux](https://docs.docker.com/desktop/install/linux-install/).

If you're on Windows, you might have to use [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) to run the tests (see [this comment](https://bitbucket.org/tangibleinc/tangible-fields-module/pull-requests/30#comment-389568162)).

### Prepare

Install dependencies by running the following in the project directory. 

```sh
npm install
```

Install PHPUnit.

```sh
composer install --dev
```

### Run tests

This repository includes NPM scripts to run the tests with PHP versions 7.4 and 8.2.

**Note**: We need to maintain compatibility with PHP 7.4, as WordPress itself only has beta support for PHP 8.x. See [PHP Compatibility and WordPress versions](https://make.wordpress.org/core/handbook/references/php-compatibility-and-wordpress-versions/) and [Usage Statistics](https://wordpress.org/about/stats/).

First, start the local server environment.

```sh
npm run env:start # Shortcut: npm run start
```

This serves a local dev site at `http://localhost:8888`, and test site at `http://localhost:8889`.

Then run tests using a specific PHP version. This will tell `wp-env` to install it.

```sh
npm run env:test:8.2
```

The version-specific command takes a while to start, but afterwards you can run the following to re-run tests in the same environment.

```sh
npm run env:test # Shortcut: npm run test
```

To switch the PHP version, run a different version-specific command.

```sh
npm run env:test:7.4
```

To stop the Docker process:

```sh
npm run env:stop # Shortcut: npm run stop
```

Usually it's enough to run `env:start` and `env:stop`. To completely remove the created Docker images and remove cache:

```sh
npm run env:destroy
```

#### Reference

Relevant info for writing unit tests:

- [PHPUnit](https://github.com/sebastianbergmann/phpunit)
  - [PHPUnit Polyfills](https://github.com/Yoast/PHPUnit-Polyfills)
  - [Assertions](https://docs.phpunit.de/en/10.2/assertions.html)

- [WP_UnitTestCase](https://github.com/WordPress/wordpress-develop/blob/trunk/tests/phpunit/includes/abstract-testcase.php)
  - [WP_UnitTest_Factory](https://github.com/WordPress/wordpress-develop/blob/trunk/tests/phpunit/includes/factory/class-wp-unittest-factory.php)
  - [WP_UnitTest_Factory_For_Post](https://github.com/WordPress/wordpress-develop/blob/trunk/tests/phpunit/includes/factory/class-wp-unittest-factory-for-post.php)


### End-to-end tests

The folder `/tests/e2e` contains end-to-end-tests using [Playwright](https://playwright.dev/docs/intro) and [WordPress E2E Testing Utils](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-e2e-test-utils-playwright/).

#### Run

Run the tests. This will start the local WordPress environment with `wp-env` as needed. Then Playwright starts a browser engine to interact with the test site.

```sh
npm run test:e2e
```

The first time you run it, it will prompt you to install the browser engine (Chromium).

```sh
npx playwright install
```

#### Watch mode

There is a "Watch mode", where it will watch the test files for changes and re-run them. 
This provides a helpful feedback loop when writing tests, as a kind of test-driven development. Press CTRL + C to stop the process.

```sh
npm run test:e2e:watch  # Shortcut: npm run tdd
```

A common usage is to have terminal sessions open with `npm run dev` (build assets and watch to rebuild) and `npm run tdd` (run tests and watch to re-run).

#### UI mode

There's also "UI mode" that opens a browser interface to see the tests run.

```sh
npm run test:e2e:ui
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
