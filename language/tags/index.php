<?php
/**
 * Template core tags
 */

// Variable types
require_once __DIR__ . '/get-set/index.php';

require_once __DIR__ . '/comment/index.php';
require_once __DIR__ . '/context.php';
require_once __DIR__ . '/data/index.php';
require_once __DIR__ . '/exit.php';
// require_once __DIR__ . '/format.php'; // See ../format/tag.php
require_once __DIR__ . '/if/index.php';
require_once __DIR__ . '/link.php';
require_once __DIR__ . '/media/index.php';

/**
 * Open tags: <Tag>..</Tag>
 */
foreach ( [
  'Date'     => require_once __DIR__ . '/date.php',
  'Loop'     => require_once __DIR__ . '/loop/index.php',
  'Meta'     => require_once __DIR__ . '/meta/index.php',
  'Note'     => function() {},
  'Set'      => $html->set_variable_tag,
  'Taxonomy' => require_once __DIR__ . '/taxonomy.php',
] as $tag => $callback ) {
  $html->add_open_tag( $tag, $callback );
}

/**
 * Closed tags: <Tag />
 */
foreach ( [
  'Field'    => require_once __DIR__ . '/field/index.php',
  'Get'      => $html->get_variable_tag,
  'Load'     => require_once __DIR__ . '/load.php',
  'Path'     => require_once __DIR__ . '/path.php',
  'Random'   => require_once __DIR__ . '/random.php',
  'Redirect' => require_once __DIR__ . '/redirect.php',
  'Route'    => require_once __DIR__ . '/route.php',
  'Setting'  => require_once __DIR__ . '/setting.php',
  'Site'     => require_once __DIR__ . '/site.php',
  'Term'     => require_once __DIR__ . '/term.php',
  'Timer'    => require_once __DIR__ . '/timer.php',
  'Url'      => require_once __DIR__ . '/url.php',
  'User'     => require_once __DIR__ . '/user.php',
] as $tag => $callback ) {
  $html->add_closed_tag( $tag, $callback );
}

/**
 * Raw tags - With unrendered content
 */
foreach ( [
  // These filter native HTML tags for enqueue
  'script'    => require_once __DIR__ . '/script.php',
  'style'     => require_once __DIR__ . '/style.php',

  'Shortcode' => require_once __DIR__ . '/shortcode.php',
] as $tag => $callback ) {
  $html->add_raw_tag( $tag, $callback );
}
