<?php
/**
 * Atomic CSS
 * @see ./atomic-css
 * @see /template-post/render.php
 */

namespace tangible\template_system;
use tangible\template_system;

template_system::$state->atomic_css_rendered_selectors = [];

function clear_atomic_css_rendered_selectors() {
  template_system::$state->atomic_css_rendered_selectors = [];
}

function render_atomic_css_selectors($atomic_css) {

  $rendered = &template_system::$state->atomic_css_rendered_selectors;
  $parents = [];
  $css = '';

  foreach ($atomic_css as $key => $rules) {

    // Skip if rendered already
    if (isset($rendered[$key])) continue;
    $rendered[$key] = true;

    foreach ($rules as $rule) {
      [$selector, $body, $parent] = $rule
        + [2 => null] // Provide default in case undefined
      ;
      if (!is_null($parent)) {
        if (!isset($parents[$parent])) $parents[$parent] = [];
        $parents[$parent] [] = [$selector, $body];
      } else {
        $css .= "{$selector} { {$body} }\n";
      }
    }
  }

  foreach ($parents as $parent => $rules) {
    $css .= "{$parent} {\n";
    foreach ($rules as $rule) {
      [$selector, $body] = $rule;
      $css .= "{$selector} { {$body} }\n";
    }
    $css .= "\n}";
  }

  return $css;
}
