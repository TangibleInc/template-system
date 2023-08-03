

## Tests

This modules comes with a suite of unit and integration tests.

`composer install --dev` will install PHPUnit.

To run the tests, we rely on the [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) tool to quickly spin up a local dev and test environment, optionally switching between multiple PHP versions.

Please note that `wp-env` requires Docker to be installed. There are instructions available for installing Docker on [Windows](https://docs.docker.com/desktop/install/windows-install/), [macOS](https://docs.docker.com/desktop/install/mac-install/), and [Linux](https://docs.docker.com/desktop/install/linux-install/).

This repository includes NPM scripts to run the tests with PHP versions 8.2 and 7.4. 

**Note**: We need to maintain compatibility with PHP 7.4, as WordPress itself only has â€œbeta supportâ€ for PHP 8.x. See https://make.wordpress.org/core/handbook/references/php-compatibility-and-wordpress-versions/ for more information.

If youâ€™re on Windows, you might have to use [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install) to run the tests (see [this comment](https://bitbucket.org/tangibleinc/tangible-fields-module/pull-requests/30#comment-389568162)).

To run the tests with Docker installed:
```
npm install
npm run env:test:8.2
npm run env:test:7.4
```

The version-specific commands take a while to start, but afterwards you can run npm run env:test to re-run tests in the same environment.

To stop the Docker process:
```
npm run env:stop
```

To â€œdestroyâ€ and remove cache:
```
npm run env:destroy
```
