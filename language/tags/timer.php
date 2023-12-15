<?php
/**
 * Timer tag - Measure time it takes from start to stop
 *
 * Basic usage with default timer: start, check, stop
 *
 * ```html
 * <Timer start />
 *
 * ..Do something..
 *
 * Duration: <Timer check /> seconds
 *
 * ..Do another thing..
 *
 * Duration: <Timer stop /> seconds
 * ```
 *
 * You can check multiple times, and it's not necessary to stop a timer.
 * A "running timer" does not take any processing, because it only stores
 * the started time and current time.
 *
 * Optionally give the timer a name, such as `start=example` and `stop=example`.
 * ```
 */

$html->timers = [
  'default' => 0,
];

$html->last_started_timer_name = null;

$html->start_timer = function( $name = '' ) use ( $html ) {
return $html->timer_tag( [
  'keys'  => [],
  'start' => $name,
  ] );
};

$html->clear_timer = function( $name = '' ) use ( $html ) {
return $html->timer_tag( [
  'keys'  => [],
  'clear' => $name,
  ] );
};

$html->stop_timer = function( $name = '' ) use ( $html ) {
return $html->timer_tag( [
  'keys' => [],
  'stop' => $name,
  ] );
};

$html->timer_tag = function( $atts ) use ( $html ) {

  $stop  = ( isset( $atts['keys'][0] ) && $atts['keys'][0] === 'stop' )
    ? $html->last_started_timer_name
    : ( ! empty( $atts['stop'] ) ? $atts['stop'] : false );
  $check = ( isset( $atts['keys'][0] ) && $atts['keys'][0] === 'check' )
    ? $html->last_started_timer_name
    : ( ! empty( $atts['check'] ) ? $atts['check'] : false );

  // Check or stop

  if ($check) $stop = $check;
  if ( $stop ) {

    if ( ! isset( $html->timers[ $stop ] ) || $html->timers[ $stop ] === 0 ) {
      return 'Timer not found';
    }

    $time_elapsed         = (float) microtime( true ) - $html->timers[ $stop ];
    $time_elapsed_rounded = number_format( $time_elapsed, 4, '.', '' );

    if ( $check ) {

      // Set new time and continue
      $html->timers[ $stop ] = microtime( true );

    } else {

      // Clear timer
      unset( $html->timers[ $stop ] );
    }

    return $time_elapsed_rounded;
  }

  // Clear

  $clear = ( isset( $atts['keys'][0] ) && $atts['keys'][0] === 'clear' )
    ? $html->last_started_timer_name
    : ( ! empty( $atts['clear'] ) ? $atts['clear'] : false );

  if ( $clear ) {
    // Clear timer
    unset( $html->timers[ $clear ] );
    return;
  }

  // Start

  $start = ! empty( $atts['start'] ) ? $atts['start'] : 'default';

  $html->timers[ $start ] = microtime( true ); // Current time

  $html->last_started_timer_name = $start;
};

return $html->timer_tag;
