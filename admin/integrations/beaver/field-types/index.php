<?php

add_filter('fl_builder_custom_fields', function( $fields ) use ( $plugin ) {

  $fields['tangible_template_editor'] = __DIR__ . '/tangible-template-editor.php';

  return $fields;
});
