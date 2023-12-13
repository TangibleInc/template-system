# Template System

This is the template system shared by Tangible Blocks and Loops & Logic.

#### Source code

https://github.com/tangibleinc/template-system

## Overview

The codebase is organized as feature modules, each of which may contain their own modules.

- Loop - Content type loops and fields
- Logic - Conditional rules registry, evaluator, UI
- Interface - Library of UI components
- Template - Defines the template language and tags
- Template System - Admin features such as template post types, editor, import/export, assets, locations, layouts, builder integrations
- Framework - Features shrared across plugins, such as AJAX, Date, HJSON

Each module should aim to be generally useful, clarify its dependencies internal and external, and ideally be documented and tested. Some are published as a Composer module or NPM package.

## Tests

This module comes with a suite of unit and integration tests.

### Requirements

To run the tests, we use the [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) tool to quickly spin up a local dev and test environment, optionally switching between multiple PHP versions.

Please note that `wp-env` requires Docker to be installed. There are instructions available for installing Docker on [Windows](https://docs.docker.com/desktop/install/windows-install/), [macOS](https://docs.docker.com/desktop/install/mac-install/), and [Linux](https://docs.docker.com/desktop/install/linux-install/).

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

This repository includes NPM scripts to run the tests with PHP versions 8.2 and 7.4.

**Note**: We need to maintain compatibility with PHP 7.4, as WordPress itself only has beta support for PHP 8.x. See [PHP Compatibility and WordPress versions](https://make.wordpress.org/core/handbook/references/php-compatibility-and-wordpress-versions/) for more information.

First, run tests using a specific PHP version. This will tell `wp-env` to install it.

```sh
npm run env:test:8.2
```

The version-specific command takes a while to start, but afterwards you can run the following to re-run tests in the same environment.

```sh
npm run env:test
```

To switch the PHP version, run a different version-specific command.

```sh
npm run env:test:7.4
```

To stop the Docker process:

```sh
npm run env:stop
```

Usually it's enough to run `env:start` and `env:stop`. To completely remove the created Docker images and remove cache:

```sh
npm run env:destroy
```


