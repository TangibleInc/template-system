<?php
/**
 * @param array $atts {
 *     Attributes of the gallery shortcode.
 *
 *     @type string       $order      Order of the images in the gallery. Default 'ASC'. Accepts 'ASC', 'DESC'.
 *     @type string       $orderby    The field to use when ordering the images. Default 'menu_order ID'.
 *                                    Accepts any valid SQL ORDERBY statement.
 *     @type int          $id         Post ID.
 *     @type string       $itemtag    HTML tag to use for each image in the gallery.
 *                                    Default 'dl', or 'figure' when the theme registers HTML5 gallery support.
 *     @type string       $icontag    HTML tag to use for each image's icon.
 *                                    Default 'dt', or 'div' when the theme registers HTML5 gallery support.
 *     @type string       $captiontag HTML tag to use for each image's caption.
 *                                    Default 'dd', or 'figcaption' when the theme registers HTML5 gallery support.
 *     @type int          $columns    Number of columns of images to display. Default 3.
 *     @type string|int[] $size       Size of the images to display. Accepts any registered image size name, or an array
 *                                    of width and height values in pixels (in that order). Default 'thumbnail'.
 *     @type string       $ids        A comma-separated list of IDs of attachments to display. Default empty.
 *     @type string       $include    A comma-separated list of IDs of attachments to include. Default empty.
 *     @type string       $exclude    A comma-separated list of IDs of attachments to exclude. Default empty.
 *     @type string       $link       What to link each image to. Default empty (links to the attachment page).
 *                                    Accepts 'file', 'none'.
 * }
 */
$html->add_closed_tag('Gallery', function( $atts ) use ( $html ) {

  $type = isset( $atts['type'] ) ? $atts['type'] : 'default';

  $callback = isset( $html->gallery_type_callbacks[ $type ] )
    ? $html->gallery_type_callbacks[ $type ]
    : $html->gallery_type_callbacks['default'];

  return $callback( $atts );
});

$html->gallery_type_callbacks = [
  // https://developer.wordpress.org/reference/functions/gallery_shortcode/
  'default' => 'gallery_shortcode',
];

$html->register_gallery_type = function( $type, $callback ) use ( $html ) {
  $html->gallery_type_callbacks[ $type ] = $callback;
};
