<?php
/**
 * @param array  $atts {
 *     Attributes of the video shortcode.
 *
 *     @type string $src      URL to the source of the video file. Default empty.
 *     @type int    $height   Height of the video embed in pixels. Default 360.
 *     @type int    $width    Width of the video embed in pixels. Default $content_width or 640.
 *     @type string $poster   The 'poster' attribute for the `<video>` element. Default empty.
 *     @type string $loop     The 'loop' attribute for the `<video>` element. Default empty.
 *     @type string $autoplay The 'autoplay' attribute for the `<video>` element. Default empty.
 *     @type string $preload  The 'preload' attribute for the `<video>` element.
 *                            Default 'metadata'.
 *     @type string $class    The 'class' attribute for the `<video>` element.
 *                            Default 'wp-video-shortcode'.
 * }
 */
$html->add_closed_tag('Video', function( $atts ) use ( $html ) {

  $type = isset( $atts['type'] ) ? $atts['type'] : 'default';

  $callback = isset( $html->video_type_callbacks[ $type ] )
    ? $html->video_type_callbacks[ $type ]
    : $html->video_type_callbacks['default'];

  return $callback( $atts );
});

$html->video_type_callbacks = [
  'default' => 'wp_video_shortcode',
];

$html->register_video_type = function( $type, $callback ) use ( $html ) {
  $html->video_type_callbacks[ $type ] = $callback;
};
