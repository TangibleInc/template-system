<?php

/**
 * Post type extensions
 *
 * - Sortable post type
 * - Post type with duplicate action ("Copy to new draft")
 * - Add Columns: ID, Category
 * - Remove extra metaboxes
 * - Remove date filter
 * - Add filter for template category
 */

foreach ($plugin->template_post_types as $post_type) {

  /**
   * Make template post type sortable by drag-and-drop
   * @see vendor/tangible/plugin-framework/modules/sortable-post-type
   */
  $framework->register_sortable_post_type( $post_type );

  /**
   * Increase posts per page
   * @see https://developer.wordpress.org/reference/hooks/edit_post_type_per_page/
   */
  add_filter( "edit_{$post_type}_per_page", function($posts_per_page) {
    return 100;
  }, 10, 1);

  /**
   * Add "Duplicate" action to single post edit screen and archive screen
   * @see vendor/tangible/plugin-framework/modules/duplicate-post
   */
  $framework->register_post_type_with_duplicate_action( $post_type );

  /**
   * Add column "ID"
   */

  /**
   * Register column for the post type
   */
  add_filter("manage_{$post_type}_posts_columns", function( $columns ) {

    // Put column ID in place of date

    $new_columns = [];

    foreach ($columns as $key => $value) {

      if ($key==='date') {
        $new_columns['id'] = 'ID';
        continue; // Remove Date column
      }

      $new_columns[ $key ] = $value;
    }

    // Rename "Template Categories" column

    if (isset($new_columns['taxonomy-tangible_template_category'])) {
      $new_columns['taxonomy-tangible_template_category'] = 'Category';
    }

    return $new_columns;

  }, 11); // After "Location" column - See ../location/admin/column

  /**
   * Render column
   */
  add_action("manage_{$post_type}_posts_custom_column", function( $column, $post_id ) use ($plugin) {

    if ($column==='id') {

      /**
       * Universal ID
       * @see /includes/template/editor/fields.php
       */

      $universal_id = $plugin->get_universal_id($post_id);

      if (!empty($universal_id)) {
        ?><a title="Universal ID: <?php echo $universal_id; ?>"
            style="cursor: pointer; font-size: 1rem"
          >&bigstar;</a>
        <?php
      }

      echo esc_html($post_id);
    }

  }, 10, 2);

} // For every template post type


/**
 * Admin styles
 */
add_action('admin_head', function() use ($plugin) {

?><style>

/* Admin submenu separator above "Import & Export" */

li#toplevel_page_tangible ul.wp-submenu > li:nth-child(5) {
  margin-bottom: 7px;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(240, 246, 252, 0.5); /* Slightly darker than submenu item */
}

</style><?php

  // Archive

  global $pagenow;

  $is_archive = $pagenow==='edit.php'
    && isset($_GET['post_type'])
    && in_array($_GET['post_type'], $plugin->template_post_types)
  ;

  if ( $is_archive ) {

?><style>

@media screen and (min-width: 782px) {

  /* Column "ID" */

  .wp-list-table th.column-id,
  .wp-list-table td.column-id {
    text-align: right;
    width: 80px;
    padding-right: 20px;
  }

  /* Column "Category" */

  .wp-list-table th.column-taxonomy-tangible_template_category,
  .wp-list-table td.column-taxonomy-tangible_template_category {
    width: 100px;
  }

}

<?php

  // For Tangible Block, hide "Add New" button if Block Editor plugin is not installed

  if ($_GET['post_type']==='tangible_block' && !function_exists('tangible_block_editor')) {
?>
.page-title-action {
  display: none;
}
<?php
  }

?>

</style><?php

    return;
  }

  // Single

  global $post;

  $is_single = !empty($post) && in_array($post->post_type, $plugin->template_post_types);

  if ( ! $is_single ) return;

?><style>

/* Template slug input field - Based on permalink #editable-post-name input */

#template-slug-input {
  font-size: 13px;
  font-weight: 400;
  height: 24px;
  min-height: 24px;
  margin: 0;
  width: 12em;
}

/* Custom publish actions section - Based on #major-publishing-actions */

.custom-publish-actions {
  padding: 10px;
  clear: both;
  border-top: 1px solid #dcdcde;
  background: #f6f7f7;
}

/* Fields */

.tangible-template-tab,
.tangible-template-tab p {
  max-width: 620px;
  font-size: 15px; /* WP admin style is 13px */
}

</style><?php

});

if (!is_admin()) return;

/**
 * Remove extra metaboxes from WP core or other plugins
 */
add_action('add_meta_boxes', function($post_type) use ($plugin) {

  if (!in_array($post_type, $plugin->template_post_types)) return;

  global $wp_meta_boxes;

  // "Custom Fields"
  remove_meta_box('postcustom', $post_type, 'normal');

  foreach (['normal', 'side'] as $context) {
    foreach (['high', /*'core',*/ 'default', 'low'] as $priority) {
      if (!empty($wp_meta_boxes[ $post_type ][ $context ][ $priority ])) {

        // tangible()->see($context . ' : ' . $priority, $wp_meta_boxes[ $post_type ][ $context ][ $priority ] );

        foreach ($wp_meta_boxes[ $post_type ][ $context ][ $priority ] as $id => $callback) {

          // TODO: Allow "tangible_" metaboxes for future use?

          unset($wp_meta_boxes[ $post_type ][ $context ][ $priority ][ $id ]);
        }
      }
    }
  }
}, 99, 1);


/**
 * Remove date filter
 * @see https://developer.wordpress.org/reference/hooks/months_dropdown_results/
 */
add_filter('months_dropdown_results', function($months, $post_type) use ($plugin) {
  if (in_array($post_type, $plugin->template_post_types)) return [];
  return $months;
}, 10, 2);


/**
 * Add filter for template category
 *
 * @see https://wordpress.stackexchange.com/questions/578/adding-a-taxonomy-filter-to-admin-list-for-a-custom-post-type#answer-582
 * @see https://gist.github.com/mikeschinkel/541505
 */
add_action('restrict_manage_posts', function() use ($plugin) {

  global $typenow;

  if (!in_array($typenow, $plugin->template_post_types)) return;

  $tax_slug = 'tangible_template_category';
  $tax_obj = get_taxonomy($tax_slug);

  wp_dropdown_categories([
    'show_option_all' => __('All Categories'), // $tax_obj->label
    'taxonomy' => $tax_slug,
    'name'     => $tax_obj->name,
    'orderby'  => 'term_order',
    'selected' => isset($_GET[ $tax_obj->query_var ])
      ? $_GET[ $tax_obj->query_var ]
      : ''
    ,
    'hierarchical' => $tax_obj->hierarchical,
    'show_count' => false,
    'hide_empty' => true
  ]);
});

add_filter('parse_query', function($query) {
  global $pagenow;
  global $typenow;

  $tax_slug = 'tangible_template_category';

  if (
    $pagenow==='edit.php'
    && isset($query->query_vars[ $tax_slug ])
    && !empty($term = get_term_by('id', $query->query_vars[ $tax_slug ], $tax_slug))
  ) {
    $query->query_vars[ $tax_slug ] = $term->slug;
  }

  return $query;
});