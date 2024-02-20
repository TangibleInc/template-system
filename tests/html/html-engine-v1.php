<?php

/**
 * Mock HTML module instance
 */
$html = new class extends stdClass {
  function __call( $method = '', $args = [] ) {
    if ( isset( $this->$method ) ) {
      return call_user_func_array( $this->$method, $args );
    }
    $caller = current( debug_backtrace() );
    trigger_error( "Undefined method \"$method\" for {$this->name}, called from <b>{$caller['file']}</b> on line <b>{$caller['line']}</b><br>", E_USER_WARNING );
  }
};

/**
 * Mock WordPress functions used
 */
if (!function_exists('apply_filters')) {
  function apply_filters($name, $value) { return $value; };
}

if (!function_exists('esc_attr')) {
  function esc_attr($value) {
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8', false);
  };
}

require_once __DIR__ . '/../../language/html/index.php';

$html->add_raw_tag('script', function($atts, $children) use ($html) {
  return $html->render_raw_tag('script', $atts, $children);
});

return $html;
