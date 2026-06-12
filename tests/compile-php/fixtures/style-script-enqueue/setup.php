<?php
/**
 * Earlier tests in the suite may mark the head action done on the template
 * singleton or define DOING_AJAX (a constant, permanent for the process);
 * either flips style/script from enqueue to inline output. Pin pre-head,
 * non-AJAX behavior for both passes.
 */
$parity_html = tangible_template();
$parity_html->actions_done = [];
// A previous render can leave options (e.g. render_raw) in the tag
// context, which render() inherits - reset to a neutral context
$parity_html->tag_context = [ 'local_tags' => [], 'path' => '' ];
$parity_html->enqueued_inline_styles = [];
$parity_html->enqueued_inline_scripts = [];

if ( ! function_exists( 'tangible_parity_not_ajax' ) ) {
  function tangible_parity_not_ajax() {
    return false;
  }
}
add_filter( 'wp_doing_ajax', 'tangible_parity_not_ajax' );
