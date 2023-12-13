<?php

use tangible\ajax;

/**
 * Template type item options - For include/exclude posts
 */
ajax\add_action("{$prefix}get_template_type_item_options", function($data) {

  if (!current_user_can('manage_options')) return ajax\error('Must be admin user');
  if (!isset($data['post_type'])) return ajax\error('Property "post_type" is required');

  $post_type = $data['post_type'];

  $posts = get_posts([
    'post_type' => $post_type,
      // Same as ../export.php
      'post_status' => [
        'publish',
        'pending',
        'draft',
        'future',
        'private',
      ],
    'posts_per_page' => -1,
    'orderby' => 'title',
    'order' => 'ASC',

    // Performance optimization
    'no_found_rows' => true
  ]);

  $options = [
    // { label, value }
  ];

  foreach ($posts as $post) {
    $options []= [
      'label' => $post->post_title,
      'value' => $post->ID,
    ];
  }

  return $options;
});
