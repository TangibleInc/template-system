<?php
/**
 * Tags to define content structure
 *
 * @see content/type, field-group, taxonomy
 * @see tangible-views/includes/views/admin/content.php
 */

$html->content_tag_configs = [
  'ContentType' => require_once __DIR__ . '/content-type.php',
  'FieldGroup'  => require_once __DIR__ . '/field-group/index.php',
  'Taxonomy'    => require_once __DIR__ . '/taxonomy.php',
];

$html->render_content_tags = function( $content ) use ( $html ) {
  return $html->render($content, [
    'local_tags' => $html->content_tag_configs,
  ]);
};
