<?php

$html->set_variable_tag = function($atts, $content) use ($html) {

  // Check variable type from attribute name, for example: <set template=x>..</set>

  foreach ($html->variable_types as $type => $callbacks) {
    if (!isset($atts[ $type ])) continue;

    // For list or map, evoke corresponding tag

    if ($type==='list') {
      $atts['name'] = $atts[ $type ];
      unset($atts[ $type ]);
      return $html->list_tag($atts, $content);
    }

    if ($type==='map') {
      $atts['name'] = $atts[ $type ];
      unset($atts[ $type ]);
      return $html->map_tag($atts, $content);
    }

    return $html->set_variable_type($type, $atts[ $type ], $content, $atts);
  }

  // Default type: variable

  $name = isset($atts['keys'][0]) ? $atts['keys'][0] : (
    isset($atts['name']) ? $atts['name'] : ''
  );

  return $html->set_variable_type('variable', $name, $content, $atts);
};

/**
 * Set variable of type
 *
 * Note: Attributes is the last argument and optional
 */
$html->set_variable_type = function($type, $name, $content, $atts = []) use ($html) {

  if (empty($type) || empty($name) || !isset($html->variable_types[ $type ])
    // Variable type can have no setter, with dynamic getter
    || !isset($html->variable_types[ $type ]['set'])
  ) return;

  return $html->variable_types[ $type ]['set'](
    $name, $atts, $content, $html->variable_type_memory[ $type ]
  );
};
