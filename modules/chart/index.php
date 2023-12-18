<?php
/**
 * Chart tag
 *
 * @see https://www.chartjs.org/
 */
namespace tangible\chart;
use tangible\chart;
use tangible\format;
use tangible\hjson;
use tangible\template_system;

function register() {
  $url = template_system::$state->url . '/modules/chart/build';
  $version = template_system::$state->version;
  
  wp_register_script(
    'tangible-chart',
    "{$url}/chart.min.js",
    [ 'jquery' ],
    $version,
    true
  );  
}

function enqueue() {
  wp_enqueue_script('tangible-chart');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );

$html->add_open_tag('Chart', function( $atts, $nodes ) use ( $html ) {

  chart\enqueue();

  $tag_atts = [

    'class'                        => 'tangible-chart tangible-dynamic-module'
      . ( isset( $atts['class'] ) ? ' ' . $atts['class'] : '' ),

    /**
     * Support for page builders with dynamic HTML fetch & insert
     *
     * @see /module-loader in Template module
     */
    'data-tangible-dynamic-module' => 'chart',
  ];

  if (isset( $atts['id'] )) $tag_atts['id'] = $atts['id'];

  $config = [
    'type'            => 'bar', // 'line', 'radar' , 'doughnut', 'pie'
    'fill'            => true, // line, radar only
    'backgroundColor' => [],
    'borderColor'     => [],

    'data'            => [
      'labels'   => [],
      'datasets' => [],
    ],

    'options'         => [
      'indexAxis' => 'x',
      'plugins'   => [],
      'scales'    => [],
    ],

    'tickValues'      => [],
    'tooltipValues'   => [],
  ];

  foreach ( $atts as $key => $value ) {

    // Shortcuts for data
    if ( $key === 'labels' || $key === 'datasets' ) {

      $config['data'][ $key ] = hjson\parse( $value );

      continue;
    }

    // Chart Title,  Chart Legend, x Axis, y Axis

    if ( $key === 'chart_title' || $key === 'chart_legend' || $key === 'axis_x' || $key === 'axis_y' ) {

      $value = hjson\parse( $value );

      /**
       * Workaround for map type options being passed as array
       *
       * This can be removed after all examples in the documentation are updated
       * to pass maps for these options.
       */
      if ( is_array( $value ) && isset( $value[0] ) ) {
        $value = $value[0];
      }

      $replace    = strpos( $key, 'chart_' ) !== false ? 'chart_' : ( strpos( $key, 'axis_' ) !== false ? 'axis_' : '' );
      $rkey       = str_replace( $replace, '', $key );
      $option_key = ( $rkey === 'x' || $rkey === 'y' ) ? 'scales' : 'plugins';

      $config['options'][ $option_key ][ $rkey ] = $value;

      continue;
    }

    // Chart Tooltip

    if ( $key === 'tooltip' ) {

      $value = hjson\parse( $value );

      // Workaround
      if ( is_array( $value ) && isset( $value[0] ) ) {
        $value = $value[0];
      }

      $config['options']['plugins']['tooltip'] = $value;

      continue;
    }

    // Chart tick values - will be passed to ticks callback functions

    if ( $key === 'tick_values' ) {

      $value = hjson\parse( $value );

      // Workaround
      if ( is_array( $value ) && isset( $value[0] ) ) {
        $value = $value[0];
      }

      if (isset( $value ) && ! empty( $value )) $config['tickValues'] = $value;

      continue;
    }

    // Chart tooltip values - will be passed to tooltips callback functions

    if ( $key === 'tooltip_values' ) {

      $value = hjson\parse( $value );

      // Workaround
      if ( is_array( $value ) && isset( $value[0] ) ) {
        $value = $value[0];
      }

      if (isset( $value ) && ! empty( $value )) $config['tooltipValues'] = $value;

      continue;
    }

    // Chart datalabels

    if ( $key === 'datalabels' ) {

      $value = hjson\parse( $value );

      // Workaround
      if ( is_array( $value ) && isset( $value[0] ) ) {
        $value = $value[0];
      }

      if (isset( $value ) && ! empty( $value )) $config['options']['plugins']['datalabels'] = $value;

      continue;
    }

    // Chart indexAxis

    if ( $key === 'data_axis' && $value === 'x' ) {

      $config['options']['indexAxis'] = 'y';

      continue;
    }

    $js_key = format\camel_case( $key );

    if ( ! isset( $config[ $js_key ] ) ) continue;

    // Cast to same type as default
    $config[ $js_key ] = is_bool( $config[ $js_key ] )
      ? $value === 'true'
      : ( is_int( $config[ $js_key ] )
        ? (int) $value
        : $value
      );
  }

  // Get array from array-like string of colors

  foreach ( [ 'background_color', 'border_color' ] as $color_attribute ) {
    if ( isset( $atts[ $color_attribute ] ) ) {
      $js_key            = format\camel_case( $color_attribute );
      $config[ $js_key ] = $html->colors_string_to_array( $atts[ $color_attribute ] );
    }
  }

  $tag_atts['data-tangible-dynamic-module-options'] = json_encode( $config );

  return $html->render_tag( 'div', $tag_atts, $nodes );
});
