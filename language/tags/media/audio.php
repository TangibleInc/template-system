<?php
/**
 * @param array  $atts {
 *     Attributes of the audio shortcode.
 *
 *     @type string $src      URL to the source of the audio file. Default empty.
 *     @type string $loop     The 'loop' attribute for the `<audio>` element. Default empty.
 *     @type string $autoplay The 'autoplay' attribute for the `<audio>` element. Default empty.
 *     @type string $preload  The 'preload' attribute for the `<audio>` element. Default 'none'.
 *     @type string $class    The 'class' attribute for the `<audio>` element. Default 'wp-audio-shortcode'.
 *     @type string $style    The 'style' attribute for the `<audio>` element. Default 'width: 100%;'.
 * }
 */
$html->add_closed_tag('Audio', function( $atts ) use ( $html ) {

  $type = isset( $atts['type'] ) ? $atts['type'] : 'default';

  $callback = isset( $html->audio_type_callbacks[ $type ] )
    ? $html->audio_type_callbacks[ $type ]
    : $html->audio_type_callbacks['default'];

  return $callback( $atts );
});

$html->audio_type_callbacks = [
  'default' => 'wp_audio_shortcode',
];

$html->register_audio_type = function( $type, $callback ) use ( $html ) {
  $html->audio_type_callbacks[ $type ] = $callback;
};
