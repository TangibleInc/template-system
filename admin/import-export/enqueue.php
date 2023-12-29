<?php
/**
 * Enqueue style/script
 */

namespace tangible\template_system;
use tangible\template_system;

$plugin->enqueue_template_import_export = function() use ( $plugin ) {

  $url = template_system::$state->url . '/admin/build';
  $version = template_system::$state->version;

  wp_enqueue_script(
    'tangible-template-import-export',
    $url . '/template-import-export.min.js',
    [
      'wp-element',
      'jquery',
      'tangible-ajax',
      'tangible-select'
    ],
    $version
  );

  wp_enqueue_style(
    'tangible-template-import-export',
    $url . '/template-import-export.min.css',
    [ 'tangible-select' ],
    $version
  );

  $template_category_options = [];

  $terms = get_terms([
    'taxonomy' => 'tangible_template_category',
    'hide_empty' => true,
    'orderby' => 'name',
    'order' => 'ASC'
  ]);

  foreach ($terms as $term) {
    $template_category_options []= [
      'label' => $term->name,
      'value' => $term->term_id,
    ];
  }

  wp_add_inline_script(
    'tangible-template-import-export',
    'window.TangibleTemplateImportExport = '
      . json_encode([
        'hasPlugin' => template_system\get_active_plugins(),
        'templateCategoryOptions' => $template_category_options
      ]),
    'before'
  );
};
