<?php

if ( ! $_WORDPRESS_DEVELOP_DIR = getenv( 'WORDPRESS_DEVELOP_DIR' ) ) {
    $_WORDPRESS_DEVELOP_DIR = __DIR__ . '/../wordpress-develop';
}
/**
 * Directory of PHPUnit test files
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#using-included-wordpress-phpunit-test-files
 */
if ( ! $_WORDPRESS_TESTS_DIR = getenv( 'WP_TESTS_DIR' ) ) {
    $_WORDPRESS_TESTS_DIR = $_WORDPRESS_DEVELOP_DIR . '/tests/phpunit';
}

$_PLUGIN_ENTRYPOINT = __DIR__ . '/../index.php';

require_once $_WORDPRESS_TESTS_DIR . '/includes/functions.php';

require __DIR__ . '/stubs.php';

tests_add_filter('muplugins_loaded', function() use ( $_PLUGIN_ENTRYPOINT ) {
    require_once dirname( $_PLUGIN_ENTRYPOINT ) . '/vendor/tangible/plugin-framework/index.php';
    require $_PLUGIN_ENTRYPOINT;
});

require $_WORDPRESS_TESTS_DIR . '/includes/bootstrap.php';
