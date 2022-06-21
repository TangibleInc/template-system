<?php

namespace Tangible\Loop;

require_once __DIR__ . '/field.php';

class AttachmentLoop extends PostLoop {

  static $config = [
    'name'       => 'attachment',
    'title'      => 'Attachment',
    'category'   => 'core',
    'query_args' => [

      'id'      => [
        'target_name' => 'include',
        'description' => 'ID',
        'type'        => [ 'string', 'array' ],
      ],

      'name'    => [
        'target_name' => 'include',
        'description' => 'Name/slug',
        'type'        => [ 'string', 'array' ],
      ],

      'count'   => [
        'target_name' => false,
        'description' => 'Limit number of items',
        'type'        => 'number',
      ],

      'include' => [
        'description' => 'Include by ID or name',
        'type'        => [ 'string', 'array' ],
      ],

      'exclude' => [
        'description' => 'Exclude by ID or name',
        'type'        => [ 'string', 'array' ],
      ],
    ],
    'fields'     => [
      'id'          => [ 'description' => 'ID' ],
      'title'       => [ 'description' => 'Title' ],
      'caption'     => [ 'description' => 'Caption' ],
      'description' => [ 'description' => 'Description' ],
      'alt'         => [ 'description' => 'Image attribute alt' ],
      'url'         => [
        'description' => 'URL - Accepts optional attribute "size" for image size',
        'subfields'   => [
          'size' => [
            'description' => 'Image size',
          ],
        ],
      ],
      'filename'    => [ 'description' => 'File name' ],
      'extension'   => [ 'description' => 'File extension' ],
      'size'        => [ 'description' => 'File size' ],
      'type'        => [ 'description' => 'File type' ],

      'srcset'      => [ 'description' => 'Responsive image attribute "srcset" for img tag - Accepts optional attribute "size" for image size name (default is "medium"), or width and height values in pixels separated by comma like "400,300"' ],

      'sizes'       => [ 'description' => 'Responsive image attribute "sizes" for img tag - Accepts optional attribute "size" for image size name (default is "medium"), or width and height values in pixels separated by comma like "400,300"' ],

      'image'       => [ 'description' => 'Image' ],
    ],
  ];

  function __construct( $args ) {

    $args['type']   = 'attachment';
    $args['status'] = 'inherit';

    foreach ( [
      'type',
      'paged',
      'fields',
      'orderby',
      'order',
    ] as $key ) {
      self::$config['query_args'][ $key ] = PostLoop::$config['query_args'][ $key ];
    }

    parent::__construct( $args );
  }

  /**
   * Field
   *
   * Inherited `get_field` method runs a filter for extended fields, then
   * calls `get_item_field` as needed.
   */
  function get_item_field( $item, $field_name, $args = [] ) {
    return self::$loop->get_attachment_field( $item, $field_name, $args );
  }

  /**
   * Support Field tag displaying loop instance as value
   */
  function get_as_field_value( $atts = [] ) {
    if ( $this->get_items_count() === 1 ) {
      return $this->get_item_field( $this->total_items[0], 'image', $atts );
    }
    // Return null to default to displaying attachment IDs
  }
};

// Inherit post loop config, but exclude some fields

AttachmentLoop::$config['query_args'] += PostLoop::$config['query_args'];

foreach ( AttachmentLoop::$config['query_args'] as $key => $value ) {
  if (substr( $key, 0, 5 ) === 'image'
    || $key === 'ignore_sticky_posts'
    || $key === 'parent'
    || $key === 'exclude_parent'
    || $key === 'include_children'
  ) unset( AttachmentLoop::$config['query_args'][ $key ] );
}

AttachmentLoop::$config['fields'] += PostLoop::$config['fields'];

foreach ( AttachmentLoop::$config['fields'] as $key => $value ) {
  if (substr( $key, 0, 5 ) === 'image'
    || substr( $key, 0, 6 ) === 'parent'
    || substr( $key, 0, 8 ) === 'children'
  ) unset( AttachmentLoop::$config['fields'][ $key ] );
}

$loop->register_type( AttachmentLoop::class );
