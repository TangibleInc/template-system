<?php
/**
 * Location rule definitions
 *
 * Loaded by ../admin/fields to pass to location editor JS in post edit screen
 *
 * @see wp-includes/query.php
 */

return [
  /*
  Theme template conditionals

  From wp-includes/template-loader.php:

  $tag_templates = [
    ? 'is_embed'             => 'get_embed_template',
    x 'is_404'               => 'get_404_template',
    x 'is_search'            => 'get_search_template',
    x 'is_front_page'        => 'get_front_page_template',
    x 'is_home'              => 'get_home_template',
    x 'is_privacy_policy'    => 'get_privacy_policy_template',
    x 'is_post_type_archive' => 'get_post_type_archive_template',

    x 'is_tax'               => 'get_taxonomy_template',

    x 'is_attachment'        => 'get_attachment_template',

    x 'is_single'            => 'get_single_template',
    x 'is_page'              => 'get_page_template',
    x 'is_singular'          => 'get_singular_template',

    x 'is_category'          => 'get_category_template',
    x 'is_tag'               => 'get_tag_template',

    x 'is_author'            => 'get_author_template',
    x 'is_date'              => 'get_date_template',
    x 'is_archive'           => 'get_archive_template',
  ];

  */

  /**
   * Each rule definition has: name, label, field, (field_2), (operands), (values), (values_2)
   */
  [
    'name'  => 'all',
    'label' => 'Entire Site',
  ],
  [
    'name'  => 'home',
    'label' => 'Home',
  ],
  [
    'name'        => 'route',
    'label'       => 'Route',
    'description' => 'Enter route after site URL with starting slash <code>/</code><br>Accepts wildcard: <code>?</code> for any character, <code>*</code> for any route part, and <code>**</code> for any multiple route parts',
    'field_2'     => [
      [
        'type' => 'input',
      ],
    ],
  ],

  [
    'name'    => 'post_type_archive',
    'label'   => 'Archive',
    'field_2' => [
      [
        'type'                  => 'select_ajax',
        'label_for_empty_value' => 'All post types',
        'ajax_action'           => 'get_post_types',
      ],
    ],
  ],
  [
    'name'      => 'post_type_singular',
    'label'     => 'Singular',
    'field_2'   => [
      [
        'type'                  => 'select_ajax',
        'label_for_empty_value' => 'All post types',
        'ajax_action'           => 'get_post_types',
      ],
    ],

    'operators' => [
      [
    'name'  => 'all',
    'label' => 'All',
      ],
      [
      'name'  => 'include',
      'label' => 'Include',
      ],
      [
      'name'  => 'exclude',
      'label' => 'Exclude',
      ],
    ],
    'values'    => [
      [
        'type'                    => 'select_ajax',
        // 'label_for_empty_value' => 'All',
        'multi_select'            => true,

        'ajax_action'             => 'get_post_type_items',

        // Convert rule property to AJAX request
        'rule_properties_to_ajax' => [
          'field_2' => 'post_type',
        ],

        'operators'               => [ 'include', 'exclude' ],
      ],
    ],
  ],

  [
    'name'      => 'taxonomy_archive',
    'label'     => 'Taxonomy Archive',
    'field_2'   => [
      [
        'type'                  => 'select_ajax',
        'label_for_empty_value' => 'All taxonomies',
        'ajax_action'           => 'get_taxonomies',
      ],
    ],

    // Support include/exclude taxonomy terms

    'operators' => [
      [
    'name'  => 'all',
    'label' => 'All',
      ],
      [
      'name'  => 'include',
      'label' => 'Include',
      ],
      [
      'name'  => 'exclude',
      'label' => 'Exclude',
      ],
    ],
    'values'    => [
      [
        'type'                    => 'select_ajax',
        // 'label_for_empty_value' => 'All',
        'multi_select'            => true,

        'ajax_action'             => 'get_taxonomy_items',

        // Convert rule property to AJAX request
        'rule_properties_to_ajax' => [
          'field_2' => 'taxonomy',
        ],

        'operators'               => [ 'include', 'exclude' ],
      ],
    ],

  ],

  [
    'name'  => 'author_archive',
    'label' => 'Author Archive',

    /**
     * For the sake of simplicity, don't support include/exclude users.
     */
  /*
    'operators' => [
      [ 'name' => 'all', 'label' => 'All' ],
      [ 'name' => 'include', 'label' => 'Include' ],
      [ 'name' => 'exclude', 'label' => 'Exclude' ]
    ],
    'values' => [
      [
        'type' => 'select_ajax',
        'multi_select' => true,
        'ajax_action' => 'get_authors',
        'operators' => ['include', 'exclude'],
      ]
    ],
  */
  ],

  [
    'name'  => 'date_archive',
    'label' => 'Date Archive',
  ],

  [
    'name'  => 'search',
    'label' => 'Search Results',
  ],

  [
    'name'  => 'not_found',
    'label' => '404 Not Found',
  ],

];
