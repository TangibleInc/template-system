<?php
use Tangible\Loop\AttachmentLoop;
use Tangible\Loop\ListLoop;
use Tangible\Loop\PostLoop;
use Tangible\Loop\UserLoop;

$test('Post loop', function( $it ) {

  $class_name = PostLoop::class;

  $it( 'exists', class_exists( $class_name ) );

  // Get pages because the site doesn't have posts yet

  $page_loop = new PostLoop([
    'type'  => 'page',
    'count' => 3,
  ]);

  $it( 'instantiates', is_a( $page_loop, $class_name ) );

  $it( 'has_next', $page_loop->has_next() === true );

  $item = $page_loop->next();

  $it( 'next returns an instance of WP_Post', is_a( $item, 'WP_Post' ) );

  $value    = $page_loop->get_field( 'title' );
  $expected = $item->post_title;

  $it( 'get_field', $value === $expected );

  $value = $page_loop->get_item_field( $item, 'title' );

  $it( 'get_item_field', $value === $expected );

});

$test('Post loop: Field of another loop type', function( $it ) use ( $loop, $html ) {

  $page_loop = $loop( 'page' );
  $item      = $page_loop->next();

  $fields = [
    'author'   => UserLoop::class,
    'parent'   => PostLoop::class,
    'children' => PostLoop::class,
    'image'    => AttachmentLoop::class,
  ];

  foreach ( $fields as $field => $classname ) {

    $short_classname = str_replace( 'Tangible\\Loop\\', '', $classname );
    $value           = $page_loop->get_field( $field );

    if (is_a( $value, $classname )) {

      $it( "Field $field is an instance of $short_classname", true );

    } elseif (is_a( $value, ListLoop::class )) {

      $it( "Field $field is an instance of ListLoop", true );

    } else {

      $it( "Field $field is an instance of known loop type", false );
      \tangible\see( 'Field of unknown loop type: ' . $field, $value );
      continue;
    }

    if ( ! $value->has_next() ) {
      $it( "$field is empty", true );
      // \tangible\see( 'Field: '.$field, $value );
      continue;
    }

    if ( $field === 'children' ) {
      $it( 'Field children is a loop of child posts', is_a( $value->next(), 'WP_Post' ) );
      continue;
    }

    $value->next();

    $field_id = $value->get_field( 'id' );

    $it( "{$field}_id is $field ID", $page_loop->get_field( "{$field}_id" ) === $field_id );
  }
});

$test('Post loop query', function( $it ) use ( $loop, $html ) {

  // Author

  $user = wp_get_current_user();

  if ( ! empty( $user ) && ! empty( $user->ID ) ) {

    $page_loop = $loop('page', [
      'author' => $user->ID,
    ]);

    if ( $page_loop->has_next() ) {
      $it( 'returns pages for current author', true );
    } else {
      $it( 'returns no pages for current author', true );
    }
  }

  // Category

  $post_loop = $loop('post', [
    'category' => 'category-1',
  ]);

  if ( $post_loop->has_next() ) {
    $it( 'returns posts for specific category: ' . ( implode( ', ', $post_loop->get_items() ) ), true );
  } else {
    $it( 'returns no post for specific category', true );
  }

  // Tag

  $post_loop = $loop('post', [
    'tag' => 'tag-1',
  ]);

  if ( $post_loop->has_next() ) {
    $it( 'returns posts for specific tag: ' . ( implode( ', ', $post_loop->get_items() ) ), true );
  } else {
    $it( 'returns no post for specific tag', true );
  }

  $post_loop = $loop('post', [
    'tag' => [ 'tag-1', 'tag-2' ],
  ]);

  if ( $post_loop->has_next() ) {
    $it( 'returns posts for specific tags: ' . ( implode( ', ', $post_loop->get_items() ) ), true );
  } else {
    $it( 'returns no post for specific tags', true );
  }

  // Taxonomy

  $post_loop = $loop('post', [
    'taxonomy' => 'post_tag',
    'terms'    => 'tag-1,tag-2',
  ]);

  if ( $post_loop->has_next() ) {
    $it( 'returns posts for specific taxonomy: ' . ( implode( ', ', $post_loop->get_items() ) ), true );
  } else {
    $it( 'returns no post for specific taxonomy', true );
  }

  // Search

  $post_loop = $loop('post', [
    'search' => 'search', // Search for the word "search" - Apparently it's case insensitive
  ]);

  if ( $post_loop->has_next() ) {
    $it( 'returns posts for a search keyword: ' . ( implode( ', ', $post_loop->get_items() ) ), true );
  } else {
    $it( 'returns no post for a search keyword', true );
  }

  // Order by field

  $post_loop = $loop('post', [
    'orderby_field' => 'post_title',
  ]);

  if ( $post_loop->has_next() ) {
    $it( 'returns posts for order by field: ' . ( implode( ', ', $post_loop->get_items() ) ), true );
  } else {
    $it( 'returns no post for order by field', true );
  }

  // Date query - Published date

  // Date query - Field
});
