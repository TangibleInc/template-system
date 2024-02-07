<?php
namespace tangible\template_system;
use tangible\template_system;

/**
 * Export
 */

function export_templates($data) {

  $plugin = template_system::$system;

  $export_data = [
    'post_types' => [
      // post_type => items
    ],
    'shared_assets' => [
      // old_id => [ name, ... ]
    ],
    'taxonomies' => [
      // taxonomy_name => term slug => term fields
    ],
  ];

  if (!isset($data['export_rules'])) return $export_data;

  $export_rules = $data['export_rules'];
  $exported_ids = []; // id => true

  /**
   * Taxonomy term export
   *
   * Using function variable so it can recursively export parent terms
   */
  $ensure_taxonomy_term_export = function($taxonomy_slug, $term_name)
    use ($plugin, &$export_data, &$ensure_taxonomy_term_export)
  {

    if (!isset($export_data['taxonomies'][ $taxonomy_slug ])) {
      $export_data['taxonomies'][ $taxonomy_slug ] = [];
    }

    if (isset($export_data['taxonomies'][ $taxonomy_slug ][ $term_name ])) return;

    $term = get_term_by('name', $term_name, $taxonomy_slug);
    if (empty($term)) return;

    // @see /includes/template/post-types/taxonomy.php
    $term_fields = $plugin->get_template_taxonomy_term_fields(
      $taxonomy_slug, $term
    );

    $export_data['taxonomies'][ $taxonomy_slug ][ $term_name ] = $term_fields;

    // Export parent terms
    if (!empty($term_fields['parent'])) {
      $ensure_taxonomy_term_export(
        $taxonomy_slug,
        $term_fields['parent']
      );
    }
  };


  foreach ($export_rules as $export_rule) {

    foreach ([
      'field'    => '',
      'operator' => 'all',
      'values'   => [],
    ] as $key => $default_value) {
      $$key = isset($export_rule[ $key ]) ? $export_rule[ $key ] : $default_value;
    }

    if (empty($field)) continue;

    $post_type = $field;

    $query_args = [
      'post_type' => $post_type,
      'post_status' => [
        'publish',    // Published post or page
        'pending',    // Pending review
        'draft',      // Draft status
        // 'auto-draft', // Newly created post, with no content
        'future',     // To publish in the future
        'private',    // Only visible to users who are logged in
        // 'inherit',    // A revision
        // 'trash',      // In trash
      ],
      'posts_per_page' => -1,
      'orderby' => 'menu_order',
      'order' => 'ASC',

      'ignore_sticky_posts' => true,

      // Performance optimization
      'no_found_rows' => true,
      'fields' => 'ids', // Return an array of post IDs
    ];

    if ($operator==='include') {

      $query_args['post__in'] = array_map('intval', $values);

    } elseif ($operator==='exclude') {

      $query_args['post__not_in'] = array_map('intval', $values);

    } elseif ($operator==='include_template_categories') {

      /**
       * tax_query takes an array of arrays
       * @see https://developer.wordpress.org/reference/classes/wp_query/#taxonomy-parameters
       */
      $query_args['tax_query'] = [
        [
          'taxonomy' => 'tangible_template_category',
          'terms' => array_map('intval', $values),
        ]
      ];

    } elseif ($operator==='exclude_template_categories') {

      $query_args['tax_query'] = [
        [
          'taxonomy' => 'tangible_template_category',
          'terms' => array_map('intval', $values),
          'operator' => 'NOT IN',
        ]
      ];
    }

    $post_ids = get_posts($query_args);

    $posts = [];

    foreach ($post_ids as $post_id) {

      if (isset($exported_ids[ $post_id ])) continue; // Avoid duplicate exports

      /**
       * Get all template fields
       * @see ../template-post/fields.php
       */
      $fields = $plugin->get_template_fields( $post_id );

      // Post status
      $fields['post_status'] = get_post_status( $post_id );

      // Ensure universal ID
      if (empty($fields['universal_id'])) {
        $fields['universal_id'] = template_system\set_universal_id($post_id);
      }

      /**
       * Export enable/disable blocks new controls
       * 
       * The field is saved during import by wp_insert_post(), as one of the
       * fields under property "meta_input". Its value is "on" when enabled.
       * 
       * @see ./import.php
       * @see tangible-blocks/includes/block/post-types/meta-boxes.php
       */
      if ( $post_type === 'tangible_block' ) {
        $key = 'tangible_blocks_use_new_controls';
        $fields[ $key ] = get_post_meta( $post_id, $key, true );
      }

      /**
       * Export assets as text or base64 string
       *
       * TODO: Use ZIP format to export a bundle of files
       */
      if (!empty($fields['assets']) && is_array($fields['assets'])) {

        foreach ($fields['assets'] as $index => $asset) {

          if (empty($asset['id'])) continue;

          /**
           * Create a non-numeric key to prevent JS/PHP confusion with array index.
           * See same logic in ./import.php
           */
          $asset_id = $asset['id'];
          $asset_key = '_' . $asset_id;

          if (isset($export_data['shared_assets'][ $asset_key ])) {
            // Already created
            continue;
          }

          $file_path = get_attached_file($asset_id);
          if (empty($file_path)) continue;

          try {
            $data = file_get_contents($file_path);
          } catch (\Throwable $th) {
            continue;
          }

          // Ensure universal ID
          $universal_id = template_system\ensure_universal_id($asset_id);

          $asset_data = [
            'universal_id' => $universal_id
          ];

          $is_text = $asset['mime']==='text/css'
            || $asset['mime']==='application/javascript';

          if ($is_text) {
            // Text
            $asset_data['text'] = $data;
          } else {
            // Binary
            $asset_data['base64'] = base64_encode($data);
          }

          $export_data['shared_assets'][ $asset_key ] = $asset_data;
        }
      }

      /**
       * Taxonomies
       * @see /includes/template/post-types/taxonomy.php
       */
      $fields['taxonomies'] = $plugin->get_template_taxonomies($post_id);

      // Export taxonomy terms
      foreach ($fields['taxonomies'] as $taxonomy_slug => $term_names) {
        foreach ($term_names as $term_name) {
          $ensure_taxonomy_term_export( $taxonomy_slug, $term_name );
        }
      }

      $posts []= $fields;

      $exported_ids[ $post_id ] = true;
    }

    $export_data['post_types'][ $post_type ] = $posts;
  }

  return $export_data;
}

// Deprecated
$plugin->export_templates = __NAMESPACE__ . '\\export_templates';
