<?php
/**
 * Variable type "loop"
 *
 * Provides generic loop fields, such as count, total, previous_total
 *
 * Example use: `<Get loop=count>`
 */
$html->register_variable_type('loop', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {
    $memory[ $name ] = $html->render( $content );
  },
  'get' => function( $name, $atts, &$memory ) use ( $html, $loop ) {

    $current_loop = $loop->get_current();

    foreach ( $atts as $key => $value ) {

      // Support loop fields from a field, like: <Get loop=total field=name />

      $is_acf_field = substr( $key, 0, 4 ) === 'acf_';

      if ( $key === 'field' || $is_acf_field ) {

        $current_loop = $is_acf_field
        ? $html->get_acf_field_type(
            substr( $key, 4 ), // Field type
            $value,          // Field name
            [                // Options
              'loop' => $current_loop,
            ]
          )
          : $current_loop->get_field( $value );

        // tangible\see($key, $current_loop);

        break;
      }
    }

    // Ensure a loop instance

    if ( ! $loop->is_instance( $current_loop ) ) {
      $current_loop = $loop( 'list', [] );
    }

    // Similar as ../logic/evaluate.php
    switch ( $name ) {
      case 'count':
          return $current_loop->index + 1;
      case 'total':
          return $current_loop->get_items_count();
      case 'previous_total':
        $previous_loop = $loop->get_previous();
          return ! empty( $previous_loop )
          ? $previous_loop->get_items_count()
          : 0;
      default:
            if (isset( $memory[ $name ] )) return $memory[ $name ];
    }
  },
]);

$html->get_loop_variable = function( $name, $atts = [] ) use ( $html ) {
  return $html->get_variable_type( 'loop', $name, $atts );
};

$html->set_loop_variable = function( $name, $content, $atts = [] ) use ( $html ) {
  return $html->set_variable_type( 'loop', $name, $content, $atts );
};
