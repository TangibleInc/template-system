<?php

/**
 * Create content structure: post types, field groups, taxonomies, user roles
 */

require_once __DIR__ . '/content-type/index.php';
require_once __DIR__ . '/field-group/index.php';
require_once __DIR__ . '/taxonomy/index.php';
require_once __DIR__ . '/metabox/index.php';
require_once __DIR__ . '/tags/index.php';

add_action('init', function() use ( $html ) {

  $html->init_content_types();
  $html->init_field_groups();

  $html->init_taxonomies();
  $html->init_metaboxes();
});
