<?php
/**
 * Slider
 *
 * @see vendor/tangible/interface
 */

$html->add_open_tag('Slider', function( $atts, $nodes ) use ( $framework, $html, $interface ) {

  $interface->enqueue( 'slider' );

  // <Slider enqueue />
  if (in_array( 'enqueue', $atts['keys'] )) return;

  $tag_atts = [

    'class' => 'tangible-slider'
      . ( isset( $atts['class'] ) ? ' ' . $atts['class'] : '' )
    ,

    /**
     * Support for page builders with dynamic HTML fetch & insert
     *
     * @see /module-loader in Template module
     */
    'data-tangible-dynamic-module' => 'slider',
  ];

  if (isset( $atts['id'] )) $tag_atts['id'] = $atts['id'];

  $options = [

    // Visibility

    'controls'       => true,
    'pager'          => true,

    // Behavior

    'loop'           => true,
    'drag'           => true,
    'adaptiveHeight' => false,

    // Autoplay

    'auto'           => false,
    'speed'          => 800,
    'pause'          => 5000,
    'pauseOnHover'   => true,
  ];

  foreach ( $atts as $key => $value ) {

    $js_key = $framework->camel_case( $key );

    if ( ! isset( $options[ $js_key ] ) ) continue;

    // Cast to same type as default
    $options[ $js_key ] = is_bool( $options[ $js_key ] )
      ? $atts[ $key ] === 'true'
      : ( is_int( $options[ $js_key ] )
        ? (int) $atts[ $key ]
        : ( $atts[ $key ] )
      );
  }

  if ( isset( $atts['items'] ) ) {

    // Note: Expected option is "item"
    $options['item'] = (int) $atts['items'];

    // TODO: Provide option for items per slide move?
    $options['slideMove'] = $options['item'];
  }

  /**
   * Responsive options - Should be passed a list, like:
   *
   * [{ break: 800, items: 3 }, { break: 280, items: 2 }]
   */
  if ( isset( $atts['responsive'] ) ) {

    // Parse

    $responsive_options = false;

    try {

      $responsive_options = $html->hjson()->parse( $atts['responsive'], [
        'throw' => true,
      ]);

    } catch ( \Throwable $th ) {
      $message                           = $th->getMessage();
      if ( ! empty( $message )) $message = ': ' . $message;
      trigger_error( "JSON error{$message}", E_USER_WARNING );
    }

    if ( is_array( $responsive_options ) ) {

      $options['responsive'] = [];

      foreach ( $responsive_options as $responsive_option ) {
        if ( ! isset( $responsive_option['break'] )
          || ! isset( $responsive_option['items'] )
        ) continue;

        // Convert to expected option schema

        $breakpoint = (int) $responsive_option['break'];
        $items      = (int) $responsive_option['items'];

        $options['responsive'] [] = [
          'breakpoint' => $breakpoint,
          'settings'   => [
            'item'      => $items,
            'slideMove' => $items,
          ],
        ];
      }

      // tangible()->see($options['responsive']);
    }
  }

  $tag_atts['data-tangible-dynamic-module-options'] = json_encode( $options );

  return $html->render_tag( 'div', $tag_atts, $nodes );
});

$html->add_open_tag('Slide', function( $atts, $nodes ) use ( $html, $interface ) {
  return $html->render_tag( 'div', $atts, $nodes );
});
