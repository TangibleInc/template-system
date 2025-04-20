<?php
/**
 * Atomic CSS
 * @see ./atomic-css
 * @see /template-post/render.php
 */

namespace tangible\template_system;
use tangible\template_system;

template_system::$state->atomic_css_rendered_selectors = [];
template_system::$state->atomic_css_rendered_variables = [];

function clear_atomic_css_rendered_selectors() {
  template_system::$state->atomic_css_rendered_selectors = [];
  template_system::$state->atomic_css_rendered_variables = [];
}

function render_atomic_css_selectors($atomic_css) {

  $selectors_done = &template_system::$state->atomic_css_rendered_selectors;
  $variables_done = &template_system::$state->atomic_css_rendered_variables;
  $parents = [];
  $css = '';

  /**
   * Schema v1 was selectors as root of object; v2 is { variables, selectors }
   */
  if (isset($atomic_css['selectors'])) {
    $variables = $atomic_css['variables'];
    $selectors = $atomic_css['selectors'];
  } else {
    $variables = [];
    $selectors = $atomic_css;
  }

  // Variables - CSS custom properties

  $is_first_variable = true;
  foreach ($variables as $key_value) {

    [$key, $value] = $key_value;
    // Skip if rendered already
    if (isset($variables_done[$key])) continue;
    $variables_done[$key] = true;

    if ($is_first_variable) {
      $is_first_variable = false;
      $css .= ":root, :host {\n";
    }

    $css .= "{$key}: {$value};\n";
  }
  if (!$is_first_variable) {
    $css .= "}\n";
  }

  // Selectors

  foreach ($selectors as $key => $rules) {

    // Skip if rendered already
    if (isset($selectors_done[$key])) continue;
    $selectors_done[$key] = true;

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
