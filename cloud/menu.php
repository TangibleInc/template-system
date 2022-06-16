<?php

/**
 * Add submenu item Tangible -> Tangible Cloud
 */
add_action(
  $plugin->is_multisite() ? 'network_admin_menu' : 'admin_menu',
  function() use ($framework, $plugin) {

    add_submenu_page(
      'tangible', // Parent menu slug
      'Cloud Library', // Page title
      'Cloud Library', // Menu title
      'manage_options', // Capability
      'tangible_cloud', // Menu slug
      function() use ($plugin) {

        // Nonce is automatically generated and validated by AJAX module in plugin framework.
        $plugin->enqueue_template_cloud();

        ?>
        <div class="wrap">

          <h1 className="wp-heading-inline">Tangible Cloud Library</h1>

          <div id="tangible_template_cloud_wrapper"></div>
        </div>
        <?php

      }, // Callback,
      30 // Position
    );

  },
  110 // At the bottom
);

/**
 * Move "Cloud Library" below "Blocks"
 */
add_action('admin_menu', function() {

  global $submenu;

  $key = 'tangible';

  if (empty($submenu) || empty($submenu[$key])) return;

  $items = [];
  $last_item = array_pop( $submenu[ $key ] );

  // Doesn't work: array_splice($submenu[ $key ], 1, 0, $last_item);

  foreach ($submenu[ $key ] as $index => $item) {
    $items []= $item;
    if ($index===0) $items []= $last_item;
  }

  $submenu[ $key ] = $items;

}, 120);
