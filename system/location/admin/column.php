<?php
/**
 * Display location field as a column in post type archives
 *
 * @see ../post-types/index.php for post types definition
 */

foreach ($plugin->template_post_types_with_location as $post_type) {

  /**
   * Register column for the post type
   */
  add_filter("manage_{$post_type}_posts_columns", function( $columns ) {

    // Put it before date column

    $new_columns = [];

    foreach ($columns as $key => $value) {

      if ($key === 'date') {
        $new_columns['location'] = 'Location';
      }

      $new_columns[ $key ] = $value;
    }

    return $new_columns;
  }, 10);

  /**
   * Render column
   */
  add_action("manage_{$post_type}_posts_custom_column", function( $column, $post_id )
    use ($plugin, $post_type)
  {

    switch ( $column ) {
      case 'location' :

        $value = null;

        try {
          $value = get_post_meta( $post_id , 'location' , true );
          if (is_string($value)) {
            $value = json_decode( $value, true );
          }
        } catch (\Throwable $e) {
          $value = null;
        }

        if (empty($value) || empty($value['description'])) {
          $value = [
            'description' =>
              // These template types apply to entire site by default
              ($post_type==='tangible_style' || $post_type==='tangible_script')
                ? 'Entire Site'
                : ''
          ];
        }

        echo $value['description'];

        // Theme position

        $theme_position = get_post_meta( $post_id , 'theme_position' , true );

        if (empty($theme_position)) return;

        $label = false;

        /**
         * Search for theme position label
         * @see /system/location/theme/index.php
         */
        foreach ($plugin->theme_positions as $pos) {
          if ($pos['name']===$theme_position) {
            $label = $pos['label'];
            break;
          }
        }
        if (!$label) {
          foreach ($plugin->theme_position_groups as $group_name => $group) {
            foreach ($group['hooks'] as $pos) {
              if ($pos['name']===$theme_position) {
                $label = $pos['label'];
                break;
              }
            }
            if ($label) break;
          }
        }

        // Fallback to hook name
        if (!$label) $label = '<code>' . $theme_position . '</code>';

        if (!empty($value['description'])) echo '<br>';
        echo 'Theme Position: ' . $label;

      break;
    }
  }, 10, 2);

}

/**
 * Column style
 */
add_action('admin_head', function() use ($plugin) {

  global $pagenow;

  $should_render = $pagenow==='edit.php'
    && isset($_GET['post_type'])
    && in_array($_GET['post_type'], $plugin->template_post_types_with_location)
  ;

  if ( ! $should_render ) return;

  // Archive for post types with location

?><style>
.column-location {
  text-align: left;
  max-width: 300px;
}
</style><?php

});