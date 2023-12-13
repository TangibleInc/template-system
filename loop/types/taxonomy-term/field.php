<?php

namespace Tangible\Loop;

$loop->get_taxonomy_term_field = function( $item, $field_name, $args = [] ) use ( $loop ) {

  if ( is_numeric( $item ) ) {

    // get_taxonomy_term_field( $id, .. )

    $item = get_term_by( 'id', $item );

  } elseif ( is_string( $item ) ) {

    $item = get_term_by( 'slug', $item );
  }

  // TODO: Current taxonomy term?
  // if (empty( $item )) $item = get_post();

  if (empty( $item )) return;

  $id = $item->term_id;

  switch ( $field_name ) {

    // @see https://developer.wordpress.org/reference/classes/wp_term/
    /*
      ["term_id"]=>  //int
      ["name"]=>   //string
      ["slug"]=>  //string
      ["term_group"]=>  //int
      ["term_taxonomy_id"]=> //int
      ["taxonomy"]=>   //string
      ["description"]=>    //string
      ["parent"]=> //int
      ["count"]=>  // int
      ["filter"]= //string
      ["meta"]= array(0) {} //an array of meta fields.
    */
    case 'all':
      $defined_fields = [];
      foreach ( TaxonomyTermLoop::$config['fields'] as $key => $config ) {
        if ($key === 'all' || substr( $key, -2 ) === '_*') continue;
        $defined_fields[ $key ] = $loop->get_taxonomy_term_field( $item, $key, $args );
      }

      ob_start();
      ?><pre><code><?php
      print_r( $defined_fields );
      ?></code></pre><?php
      $value = ob_get_clean();
        break;

    case 'id':
        return $id;
    case 'name':
        return $item->slug;
    case 'title':
        return $item->name;
    case 'url':
        return get_term_link( $id );
    case 'link':
      // Link attributes
      $link_atts = [
        'href' => get_term_link( $id ),
      ];
      foreach ( [
        'rel',
        'target',
      ] as $key ) {
        if ( isset( $args[ $key ] ) ) {
          $link_atts[ $key ] = $args[ $key ];
        }
      }

        return tangible_template()->render_raw_tag( 'a', $link_atts, $item->name );
    case 'taxonomy':
      // Return instance of TaxonomyLoop

      return $loop('taxonomy', [
        'name' => $item->taxonomy,
      ]);

    case 'parent':
      // Return instance of TaxonomyTermLoop with parent term

      if (empty( $item->parent )) return $loop( 'list', [] );

      return $loop('taxonomy_term', [
        'id'       => $item->parent,
        'taxonomy' => $item->taxonomy,
      ]);

    case 'children':
      // https://developer.wordpress.org/reference/functions/get_term_children/
      $children = get_term_children( $id, $item->taxonomy );

      if (is_wp_error( $children ) || empty( $children )) return $loop( 'list', [] );

      return $loop('taxonomy_term', [
        'include'  => $children,
        'taxonomy' => $item->taxonomy,
      ]);

    case 'ancestors':
      // https://developer.wordpress.org/reference/functions/get_ancestors/

      // Ancestor IDs from lowest to highest in the hierarchy
      $ancestors = get_ancestors( $id, $item->taxonomy, 'taxonomy' );

      if (empty( $ancestors )) return $loop( 'list', [] );

      // Support reverse=true
      if ( isset( $args['reverse'] ) ) {
        array_reverse( $ancestors );
      }

      return $loop('taxonomy_term', [
        'include'  => $ancestors,
        'taxonomy' => $item->taxonomy,
      ]);

    case 'posts':
      unset( $args['field'] ); // Remove field=posts

    $loop_args = array_merge([
        'taxonomy' => $item->taxonomy,
        'term'     => $id,
      ], $args); // Other loop parameters

        return $loop( 'any', $loop_args );

    default:
      if ( property_exists( $item, $field_name ) ) {
        return $item->$field_name;
      }

      /**
       * Support ACF field
       *
       * To get various field types from a template, use acf_* attributes of the Field tag.
       *
       * @see vendor/tangible/template/tags/field/acf.php
       */
      if ( tangible_template()->is_acf_active ) {
        return get_field( $field_name, "term_$id" );
      } else {
        // Fallback to support PODS
        return get_term_meta($id, $field_name, true);
      }
  }
};
