<?php

/**
 * Queue
 */

$html->clear_queue = function() use ( $html ) {

  $html->enqueued_style_files  = [];
  $html->enqueued_script_files = [];

  $html->enqueued_inline_styles  = [];
  $html->enqueued_inline_scripts = [];
};

$html->clear_queue();

/**
 * Enqueue style and script files
 */

$html->enqueue_style_file = function( $url, $options = [] ) use ( $html ) {
  $html->enqueued_style_files [] = $url;
};

$html->enqueue_script_file = function( $url, $options = [] ) use ( $html ) {
  $html->enqueued_script_files [] = $url;
};

/**
 * Enqueue inline styles and scripts
 */

$html->enqueue_inline_style = function( $content ) use ( $html ) {

  $is_rest = defined( 'REST_REQUEST' ) && REST_REQUEST;

  // Load immediately if after wp_head, or during AJAX (inside page builder)
  if ( $html->is_action_done( 'head' ) || wp_doing_ajax() || $is_rest ) {
    ?><style data-name="tangible-template-inline-style"><?php echo $content; ?></style><?php
    return;
  }

  $html->enqueued_inline_styles [] = $content;
};

$html->enqueue_inline_script = function( $content ) use ( $html ) {

  $is_rest = defined( 'REST_REQUEST' ) && REST_REQUEST;

  // Load immediately if during AJAX (inside page builder)
  if ( wp_doing_ajax() || $is_rest ) {
    ?><script data-name="tangible-template-inline-script"><?php echo $content; ?></script><?php
    return;
  }

  $html->enqueued_inline_scripts [] = $content;
};

/**
 * Load all enqueued styles - Called on wp_head from ../actions
 */
$html->load_all_enqueued_styles = function() use ( $html ) {

  // Style files

  if ( ! empty( $html->enqueued_style_files ) ) {
    foreach ( $html->enqueued_style_files as $file_url ) {
      ?><link data-name="tangible-template-style" rel="stylesheet" href="<?php echo $file_url; ?>"><?php
    }
    $html->enqueued_style_files = [];
  }

  // Inline styles

  if ( ! empty( $html->enqueued_inline_styles ) ) {
    $content = implode( "\n", $html->enqueued_inline_styles );
    ?><style data-name="tangible-template-inline-style"><?php echo $content; ?></style><?php
    $html->enqueued_inline_styles = [];
  }
};

/**
 * Load all enqueued scripts - Called on wp_footer from ../actions
 */
$html->load_all_enqueued_scripts = function() use ( $html ) {

  // Script files

  if ( ! empty( $html->enqueued_script_files ) ) {
    foreach ( $html->enqueued_script_files as $file_url ) {
      ?><script data-name="tangible-template-script" type="text/javascript" src="<?php echo $file_url; ?>"></script><?php
    }
    $html->enqueued_script_files = [];
  }

  // Inline scripts

  if ( ! empty( $html->enqueued_inline_scripts ) ) {
    $content = implode( "\n;;;\n", $html->enqueued_inline_scripts );
    ?><script data-name="tangible-template-inline-script"><?php echo $content; ?></script><?php
    $html->enqueued_inline_scripts = [];
  }
};
