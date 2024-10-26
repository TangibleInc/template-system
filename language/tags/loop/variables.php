<?php
namespace Tangible\Template;

/**
 * Utility methods to get/set all variable types defined in a template
 *
 * This is used to pass variables via AJAX request for asynchronously rendering
 * templates.
 *
 * @see Loop tag in ./index.php, /ajax, /tags/async
 */

function merge_variable_types( &$to, $from ) {
  foreach ( $from as $key => $values ) {
    $to[ $key ] = array_merge( $to[ $key ], $from[ $key ] );
  }
  return $to;
};

$html->get_variable_types_from_template = function( $nodes ) use ( $html ) {

  $variable_types = [
    'global'   => [],
    'local'    => [],
    'template' => [],
  ];

  $get_variable_type = $html->get_variable_type;

  foreach ( $nodes as $node ) {

    if ( ! isset( $node['tag'] )) continue;

    $atts = $node['attributes'];

    // Get tag

    if ( $node['tag'] === 'Get' ) {
      if ( ! empty( $atts['keys'] ) ) {

        $name                              = $atts['keys'][0];
        $variable_types['global'][ $name ] = $get_variable_type( 'variable', $name );

      } elseif ( isset( $atts['name'] ) ) {

        $name                              = $atts['name'];
        $variable_types['global'][ $name ] = $get_variable_type( 'variable', $name );

      } elseif ( isset( $atts['local'] ) ) {

        $name                             = $atts['local'];
        $variable_types['local'][ $name ] = $get_variable_type( 'local', $name );

      } elseif ( isset( $atts['template'] ) ) {

        $name                                = $atts['template'];
        $variable_types['template'][ $name ] = $get_variable_type( 'template', $name );
      }
      continue;
    }

    // Other tags

    /**
     * Attributes - Similar logic to $html->render_attribute_value() in
     * /language/html/render/attributes.php
     */

    $pair     = [ '{', '}' ];
    $tag_pair = [ '<', '>' ];
    $parse    = $html->parse;

    foreach ( $atts as $key => $value ) {

      if ( ! is_string( $value )
        || strpos( $value, $pair[0] ) === false || strpos( $value, $pair[1] ) === false
      ) continue;

      $atts_nodes = $parse(
        str_replace([ '<<', '>>' ], $pair, // Double-brackets {{ }} to escape
          str_replace( array_merge( $tag_pair, $pair ), array_merge( [ '&lt;', '&gt;' ], $tag_pair ), $value )
        )
      );

      merge_variable_types($variable_types,
        $html->get_variable_types_from_template( $atts_nodes )
      );
    }

    // Children
    if ( ! empty( $node['children'] )) merge_variable_types($variable_types,
      $html->get_variable_types_from_template( $node['children'] )
    );
  }

  return $variable_types;
};

$html->set_variable_types_from_template = function( $variable_types ) use ( $html ) {

  $set_variable_type = $html->set_variable_type;

  foreach ( $variable_types as $type => $variables ) {

    // variable, local, template
    $variable_type = $type === 'global' ? 'variable' : $type;
    $options       = $type !== 'template' ? [ 'render' => false ] : [];

    foreach ( $variables as $key => $value ) {
      $set_variable_type( $variable_type, $key, $value, $options );
    }
  }
};
