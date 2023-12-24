<?php
/**
 * Location fields in template post edit screen
 *
 * Called from ../../editor/fields.php
 */

use tangible\select;

 $plugin->render_location_edit_fields = function( $fields, $post_type ) use ( $plugin ) {

  // Enqueue

  select\enqueue();

  $plugin->enqueue_template_location_editor();

  // Data for editor

  $location_data = $fields['location'];

  $rule_definitions = apply_filters(
    'tangible_template_location_rule_definitions',
    require_once __DIR__ . '/../rules/definition.php',
    $post_type
  );

  $is_style  = $post_type === 'tangible_style';
  $is_script = $post_type === 'tangible_script';
  $is_layout = $post_type === 'tangible_layout';

  if ( $is_style || $is_script ) {

    // Remove first rule definition for "Entire Site", since it's the default
    array_shift( $rule_definitions );

    // Add rule for Nowhere to disable loading
    $rule_definitions []= [
      'name'  => 'none',
      'label' => 'Nowhere',
    ];
  }

  ?>
  <div class="tangible-template-tab tangible-template-tab--location">

    <p><?php
    if ( $is_style || $is_script ) {
      echo 'Add location rules to limit where to load this '
        . ( $is_style ? 'style' : 'script' )
        . ' in the site. Leave empty to apply to entire site.';
    } else {
      echo 'Add location rules to use this '
        . ( $is_layout ? 'layout' : 'template' )
        . ' in the site theme.';
    }
    ?></p>

    <div class="template-location-editor"
      data-location="<?php echo esc_attr( json_encode( $location_data ) ); ?>"
      data-rule-definitions="<?php echo esc_attr( json_encode( $rule_definitions ) ); ?>"
    ></div>

    <?php
    if ( $is_layout ) {
      // In local scope: $fields
      require_once __DIR__ . '/theme-position.php';
    }
    ?>
  </div>
  <?php
};
