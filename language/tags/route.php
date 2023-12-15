<?php
/**
 * <route> gets current route or route part
 */

$html->register_variable_type('route', [
  'set' => function( $name, $atts, $content, &$memory ) use ( $html ) {

    $content = isset( $atts['raw'] ) ? $content : $html->render( $content );

    // Trim string by default, unless trim=false
    if ( is_string( $content ) &&
      ( ! isset( $atts['trim'] ) || ( $atts['trim'] !== 'false' && $atts['trim'] !== false ) )
    ) {
      $content = trim( $content );
    }

    // Set route state

    switch ( $name ) {
      case 'status':
        global $wp_query;

        if ( is_numeric( $content ) ) {
          $status = (int) $content;
          if ( $status === 404 ) {
            $wp_query->is_404 = true;
          }
          status_header( $status );
        }

          break;
      default:
    }
  },
  'get' => function( $name, $atts, &$memory ) use ( $html ) {

    if ( isset( $atts['query'] ) ) {
      return $html->get_query( $atts['query'], $atts );
    }

    if ( ! empty( $name ) ) {
      switch ( $name ) {
        case 'status':
            return http_response_code();
      }
    }

    global $wp;

    // Route - No starting slash

    $full_route = $wp->request;
    if ( ! empty( $full_route ) && $full_route[0] === '/' ) {
      $full_route = substr( $full_route, 1 );
    }

    if ( ! isset( $atts['part'] ) || $atts['part'] === '' ) {
      return $full_route;
    }

    // Route part

    $route_parts = array_values( array_filter( explode( '/', $full_route ) ) );
    $part_index  = $atts['part']; // Given index starting with 1

    // Support ranges using "~" before, between, or after indexes

    if ( $part_index[0] === '~' ) {

      // ~x for until x-th route part

      $part_index = (int) substr( $part_index, 1 );
      return implode( '/', array_slice( $route_parts, 0, (int) $part_index ) );
    }

    if ( substr( $part_index, -1 ) === '~' ) {

      // x~ for x-th route part and after

      $part_index = substr( $part_index, 0, -1 );

      if ($part_index > 1) $part_index--; // Support negative index

      return implode( '/', array_slice( $route_parts, (int) $part_index ) );
    }

    // x~y for between two positions

    if ( ( $pos = strpos( $part_index, '~' ) ) !== false ) {

      $index_parts = explode( '~', $part_index );

      $from = (int) $index_parts[0];
      $to   = (int) $index_parts[1];

      if ( $to < 0 ) {
        $length = $to;
      } else {
        $length = $to - $from + 1;
      }

      return implode( '/', array_slice( $route_parts, $from - 1, $length ) );
    }

    // x-th part

    if ( is_numeric( $part_index ) ) {

      // User passes index starting with 1
      if ($part_index == 0) return;
      if ($part_index > 0) return isset( $route_parts[ $part_index - 1 ] )
        ? $route_parts[ $part_index - 1 ]
        : '';

      // Support negative index

      // Ensure valid range
      if ( $part_index * -1 > count( $route_parts ) ) return;

    $parts = array_slice(
        $route_parts,
        (int) $part_index,
        1
      );
      return array_pop( $parts );
    }
  },
 ]);

 $html->get_route = function( $atts = [] ) use ( $html ) {

  // Unlike other variable types, route "name" is rarely used,
  // so make this function simpler to call without name.

  if ( is_string( $atts ) ) {
    $atts = [ 'name' => $atts ];
  }

  $name = isset( $atts['name'] ) ? $atts['name'] : '';

  return $html->get_variable_type( 'route', $name, $atts );
 };

  $html->set_route = function( $name, $content, $atts = [] ) use ( $html ) {
    return $html->set_variable_type( 'route', $name, $content, $atts + [ 'raw' => true ] );
  };

  /**
   * Match a route to a shell wildcard pattern using "*" and "?"
   */
  $html->route_matches = function( $pattern, $route ) {

    // Remove duplicate slashes
    $route = preg_replace( '#/+#', '/', $route );
    // Remove slash at the end
    if ($route !== '/') $route = rtrim( $route, '/' );

    return preg_match(
    '#^' . strtr(
      preg_quote( $pattern, '#' ),
      [
        '\*\*' => '.*',  // "**" matches multiple route parts (separated by slash)
        '\*'   => '[^/]+', // "*" matches a single route part
        '\?'   => '.',
      ]
    ) . '$#i',
    $route
    ) === 1; // Cast to boolean
  };

  $html->route_tag = function( $atts ) use ( $html ) {

    if ( isset( $atts['status'] ) ) {
      return $html->set_variable_type( 'route', 'status', $atts + [ 'raw' => true ], $atts['status'] );
    }

    $key = array_shift( $atts['keys'] );
    return $html->get_variable_type( 'route', $key, $atts );
  };

  return $html->route_tag;
