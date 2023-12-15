<?php
/**
 * Variable type "logic"
 *
 * Same as normal variable, except:
 *
 * - Removes new lines and white space, and makes everything lowercase
 * - Reduces conditions based on any=true or all=true
 * - Result is a string "true", or null
 *
 * Example:
 *
 * ```html
 * <Set logic=has_post>
 *   <If total> TRUE <Else/> FALSE </If>
 * </Set>
 * ```
 */
$html->register_variable_type('logic', [
  'set' => function($name, $atts, $content, &$memory) use ($html) {

    /**
     * By default, it works as an AND statement: there must be no "false" value.
     * Set any=true to combine as OR statement: there must be at least one "true" value.
     */

    $any_true = (isset($atts['any']) && $atts['any']==='true') || in_array('any', $atts['keys']);

    $content = strtolower(
      preg_replace('/\s+/', '', $html->render( $content ))
    );

    $condition = $any_true
      ? strpos($content, 'true')  !== false // Must have at least one "true"
      : strpos($content, 'false') === false // Must have no "false"
    ;

    if (isset($atts['debug'])) {
      tangible\see(
        'Logic variable: ' . $name,
        'Content: ' . $content,
        'Result: ' . ($condition ? 'TRUE' : 'FALSE')
      );
    }

    $memory[ $name ] = $condition ? 'true' : '';
  },
  'get' => function($name, $atts, &$memory) use ($html) {
    return isset($memory[ $name ]) ? $memory[ $name ] : '';
  },
]);

$html->get_logic_variable = function($name, $atts = []) use ($html) {
  return $html->get_variable_type('logic', $name, $atts);
};

$html->set_logic_variable = function($name, $content, $atts = []) use ($html) {
  return $html->set_variable_type('logic', $name, $content, $atts);
};
