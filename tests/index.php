<?php
/**
 * Tests - References:
 * 
 * - [PHPUnit](https://github.com/sebastianbergmann/phpunit)
 * - [PHPUnit Polyfills](https://github.com/Yoast/PHPUnit-Polyfills)
 * - [Assertions](https://docs.phpunit.de/en/10.2/assertions.html)
 * 
 * - [WP_UnitTestCase](https://github.com/WordPress/wordpress-develop/blob/trunk/tests/phpunit/includes/abstract-testcase.php)
 *   - [WP_UnitTest_Factory](https://github.com/WordPress/wordpress-develop/blob/trunk/tests/phpunit/includes/factory/class-wp-unittest-factory.php)
 *   - [WP_UnitTest_Factory_For_Post](https://github.com/WordPress/wordpress-develop/blob/trunk/tests/phpunit/includes/factory/class-wp-unittest-factory-for-post.php)
 */

if ( ! $_WORDPRESS_DEVELOP_DIR = getenv( 'WORDPRESS_DEVELOP_DIR' ) ) {
  $_WORDPRESS_DEVELOP_DIR = __DIR__ . '/../wordpress-develop';
}
/**
 * Directory of PHPUnit test files
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#using-included-wordpress-phpunit-test-files
 */
if ( ! $_WORDPRESS_TESTS_DIR = getenv( 'WP_TESTS_DIR' ) ) {
  $_WORDPRESS_TESTS_DIR = $_WORDPRESS_DEVELOP_DIR . '/tests/phpunit';
}

require_once $_WORDPRESS_TESTS_DIR . '/includes/functions.php';

tests_add_filter('muplugins_loaded', function() {
  require __DIR__ . '/../index.php';
});

require $_WORDPRESS_TESTS_DIR . '/includes/bootstrap.php';
