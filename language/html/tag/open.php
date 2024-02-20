<?php
namespace tangible\html;
use tangible\html;

/**
 * Open tags have content, with </tag> to close.
 */

function add_open_tag( $tag, $callback, $options = [] ) {

  $html = html::$state;

  if ( ! is_callable( $callback ) ) {
    trigger_error( "Tag \"$tag\" must have valid callback", E_USER_WARNING );
    return;
  }

  $html->tags[ $tag ] = $options + [
    'callback'   => $callback,
    'local_tags' => [],
    'raw'        => false,
    'closed'     => false,
  ];

  if (empty( $options['local_tags'] )) return;

  /**
   * Local tags are only run in the context of a parent tag.
   *
   * @see render_tag() in ../render/tag.php
   */
  foreach ( $options['local_tags'] as $local_tag => $local_tag_config ) {

    // Normalize tag config schema

    $local_tag_config = ( is_array( $local_tag_config )
      ? $local_tag_config
      : [ 'callback' => $local_tag_config ]
    ) + [
      'local_tags' => [], // Nested local tags unsupported for now
      'local'      => true,
      'raw'        => false,
      'closed'     => false,
    ];

    $html->tags[ $tag ]['local_tags'][ $local_tag ] = $local_tag_config;
  }
};
