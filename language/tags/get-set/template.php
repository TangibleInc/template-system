<?php
/**
 * Template is like variable, but rendered on get, instead of set
 */
$html->register_variable_type('template', [
  'set' => function($name, $atts, $content, &$memory) use ($html) {
    $memory[ $name ] = $content;
  },
  'get' => function($name, $atts, &$memory) use ($html) {

    if ( ! isset($memory[ $name ]) ) return '';

    $value = $memory[ $name ];

    $render = !isset($atts['render']) || ($atts['render']!=='false' && $atts['render']!==false);

    if (!$render) return trim($html->render_raw( $value ));

    $html->push_local_variable_scope( $atts );

    $content = $html->render( $value );

    $html->pop_local_variable_scope();

    return $content;
  },
]);

$html->get_template = function($name, $atts = []) use ($html) {
  return $html->get_variable_type('template', $name, $atts);
};

$html->get_template_raw = function($name, $atts = []) use ($html) {
  return $html->get_variable_type('template', $name, $atts+[
    'render' => false
  ]);
};

$html->set_template = function($name, $content, $atts = []) use ($html) {
  return $html->set_variable_type('template', $name, $content, $atts);
};
