<?php
/**
 * @param array $atts {
 *     Attributes of the playlist shortcode.
 *
 *     @type string  $type         Type of playlist to display. Accepts 'audio' or 'video'. Default 'audio'.
 *     @type string  $order        Designates ascending or descending order of items in the playlist.
 *                                 Accepts 'ASC', 'DESC'. Default 'ASC'.
 *     @type string  $orderby      Any column, or columns, to sort the playlist. If $ids are
 *                                 passed, this defaults to the order of the $ids array ('post__in').
 *                                 Otherwise default is 'menu_order ID'.
 *     @type int     $id           If an explicit $ids array is not present, this parameter
 *                                 will determine which attachments are used for the playlist.
 *                                 Default is the current post ID.
 *     @type array   $ids          Create a playlist out of these explicit attachment IDs. If empty,
 *                                 a playlist will be created from all $type attachments of $id.
 *                                 Default empty.
 *     @type array   $exclude      List of specific attachment IDs to exclude from the playlist. Default empty.
 *     @type string  $style        Playlist style to use. Accepts 'light' or 'dark'. Default 'light'.
 *     @type bool    $tracklist    Whether to show or hide the playlist. Default true.
 *     @type bool    $tracknumbers Whether to show or hide the numbers next to entries in the playlist. Default true.
 *     @type bool    $images       Show or hide the video or audio thumbnail (Featured Image/post
 *                                 thumbnail). Default true.
 *     @type bool    $artists      Whether to show or hide artist name in the playlist. Default true.
 * }
 */
$html->add_closed_tag('Playlist', function( $atts ) use ( $html ) {

  $type = ( isset( $atts['type'] ) && $atts['type'] !== 'audio' && $atts['type'] !== 'video' )
    ? $atts['type']
    : 'default';

  $callback = isset( $html->playlist_type_callbacks[ $type ] )
    ? $html->playlist_type_callbacks[ $type ]
    : $html->playlist_type_callbacks['default'];

  return $callback( $atts );
});

$html->playlist_type_callbacks = [
  'default' => 'wp_playlist_shortcode',
];

$html->register_playlist_type = function( $type, $callback ) use ( $html ) {
  $html->playlist_type_callbacks[ $type ] = $callback;
};
