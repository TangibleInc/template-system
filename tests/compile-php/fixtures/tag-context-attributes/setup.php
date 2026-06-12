<?php
/**
 * Hooks the attribute filter this fixture exists to pin. With the filter
 * hooked, compiled templates containing baked static markup return null and
 * fall back to the runtime renderer, so this fixture also verifies the
 * tripwire keeps parity.
 */
if ( ! function_exists( 'tangible_parity_context_filter' ) ) {
  function tangible_parity_context_filter( $atts ) {
    $html = tangible_template();
    if ( isset( $atts['data-context-tag-test'] ) ) {
      $atts['data-context-tag'] = $html->tag_context['tag'] ?? '';
    }
    return $atts;
  }
}
add_filter( 'tangible_template_render_attributes', 'tangible_parity_context_filter' );
