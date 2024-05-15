<?php

namespace tangible\template_system;

class SortablePostType {

  public $registered_types = [];
  public $url              = '';
  public $version          = '';

  function __construct(
    $url,
    $version
  ) {

    $this->url     = $url;
    $this->version = $version;

    add_action( 'admin_init', [ $this, 'refresh' ] );
    add_action( 'admin_init', [ $this, 'load_script_css' ] );

    add_action( 'pre_get_posts', [ $this, 'pre_get_posts' ] );

    add_filter( 'get_previous_post_where', [ $this, 'previous_post_where' ] );
    add_filter( 'get_previous_post_sort', [ $this, 'previous_post_sort' ] );
    add_filter( 'get_next_post_where', [ $this, 'next_post_where' ] );
    add_filter( 'get_next_post_sort', [ $this, 'next_post_sort' ] );

    add_action( 'wp_ajax_tangible_sortable_post_type__update_menu_order', [ $this, 'update_menu_order' ] );
    add_action( 'wp_ajax_tangible_sortable_post_type__reset_order', [ $this, 'ajax_reset_order' ] );
  }

  function register( $type ) {
    $this->registered_types [] = $type;
  }

  function get_registered_types() {
    return $this->registered_types;
  }

  function check_load_script_css() {

    $active = false;

    $types = $this->get_registered_types();

    if (empty( $types ) && empty( $tags )) return false;

    if (isset( $_GET['orderby'] )
      || strstr( $_SERVER['REQUEST_URI'], 'action=edit' )
      || strstr( $_SERVER['REQUEST_URI'], 'wp-admin/post-new.php' )
    ) return false;

    if ( ! empty( $types ) ) {
      if ( isset( $_GET['post_type'] )
        && ! isset( $_GET['taxonomy'] )
        && in_array( $_GET['post_type'], $types )
      ) { // if page or custom post types
        $active = true;
      }
      if ( ! isset( $_GET['post_type'] )
        && strstr( $_SERVER['REQUEST_URI'], 'wp-admin/edit.php' )
        && in_array( 'post', $types )
      ) { // if post
        $active = true;
      }
    }

    return $active;
  }

  function load_script_css() {

    if ( ! $this->check_load_script_css() ) return;

    $url     = $this->url;
    $version = $this->version;

    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'jquery-ui-sortable' );
    wp_enqueue_script( 'tangible-sortable-post-type', $url . '/sortable-post-type.js', [ 'jquery' ], $version, true );
    wp_enqueue_style( 'tangible-sortable-post-type', $url . '/sortable-post-type.css', [], $version );
  }

  function refresh() {

    if ( wp_doing_ajax() ) return;

    global $wpdb;

    $types = $this->get_registered_types();

    if (empty( $types )) return;

    // NOTE: SQLite does not support the UPDATE query below
    if (class_exists('WP_SQLite_DB')) return;

    foreach ( $types as $type ) {
    $result = $wpdb->get_results("
      SELECT count(*) as cnt, max(menu_order) as max, min(menu_order) as min
      FROM $wpdb->posts
      WHERE post_type = '" . $type . "' AND post_status IN ('publish', 'pending', 'draft', 'private', 'future')
      ");

      if ($result[0]->cnt == 0 || $result[0]->cnt == $result[0]->max) continue;

      // Here's the optimization
      $wpdb->query( 'SET @row_number = 0;' );
      $wpdb->query("UPDATE $wpdb->posts as pt JOIN (
        SELECT ID, (@row_number:=@row_number + 1) AS `rank`
        FROM $wpdb->posts
        WHERE post_type = '$type' AND post_status IN ( 'publish', 'pending', 'draft', 'private', 'future' )
        ORDER BY menu_order ASC
        ) as pt2
        ON pt.id = pt2.id
        SET pt.menu_order = pt2.`rank`;");
    }
  }

  function update_menu_order() {

    global $wpdb;

    parse_str( $_POST['order'], $data );

    if ( ! is_array( $data )) return false;

    $id_arr = array();
    foreach ( $data as $key => $values ) {
      foreach ( $values as $position => $id ) {
        $id_arr[] = $id;
      }
    }

    $menu_order_arr = array();
    foreach ( $id_arr as $key => $id ) {
      $results = $wpdb->get_results( "SELECT menu_order FROM $wpdb->posts WHERE ID = " . intval( $id ) );
      foreach ( $results as $result ) {
        $menu_order_arr[] = $result->menu_order;
      }
    }

    sort( $menu_order_arr );

    foreach ( $data as $key => $values ) {
      foreach ( $values as $position => $id ) {
        $wpdb->update( $wpdb->posts, array( 'menu_order' => $menu_order_arr[ $position ] ), array( 'ID' => intval( $id ) ) );
      }
    }

    do_action( 'tangible_sortable_post_type__update_menu_order' );
  }

  function previous_post_where( $where ) {

    global $post;

    $types = $this->get_registered_types();

    if (empty( $types )) return $where;

    if ( isset( $post->post_type ) && in_array( $post->post_type, $types ) ) {
      $where = preg_replace( "/p.post_date < \'[0-9\-\s\:]+\'/i", "p.menu_order > '" . $post->menu_order . "'", $where );
    }
    return $where;
  }

  function previous_post_sort( $orderby ) {

    global $post;

    $types = $this->get_registered_types();

    if (empty( $types )) return $orderby;

    if ( isset( $post->post_type ) && in_array( $post->post_type, $types ) ) {
      $orderby = 'ORDER BY p.menu_order ASC LIMIT 1';
    }
    return $orderby;
  }

  function next_post_where( $where ) {
    global $post;

    $types = $this->get_registered_types();
    if (empty( $types ))
    return $where;

    if ( isset( $post->post_type ) && in_array( $post->post_type, $types ) ) {
      $where = preg_replace( "/p.post_date > \'[0-9\-\s\:]+\'/i", "p.menu_order < '" . $post->menu_order . "'", $where );
    }
    return $where;
  }

  function next_post_sort( $orderby ) {

    global $post;

    $types = $this->get_registered_types();

    if (empty( $types )) return $orderby;

    if ( isset( $post->post_type ) && in_array( $post->post_type, $types ) ) {
      $orderby = 'ORDER BY p.menu_order DESC LIMIT 1';
    }
    return $orderby;
  }

  function pre_get_posts( $wp_query ) {

    $types = $this->get_registered_types();

    if (empty( $types )) return false;

    if ( is_admin() && ! wp_doing_ajax() ) {

      if ( isset( $wp_query->query['post_type'] ) && ! isset( $_GET['orderby'] )
        && in_array( $wp_query->query['post_type'], $types )
      ) {
        if ( ! $wp_query->get( 'orderby' )) $wp_query->set( 'orderby', 'menu_order' );
        if ( ! $wp_query->get( 'order' )) $wp_query->set( 'order', 'ASC' );
      }

      return;
    }

    $active = false;

    if ( isset( $wp_query->query['post_type'] ) ) {
      if ( ! is_array( $wp_query->query['post_type'] )
        && in_array( $wp_query->query['post_type'], $types )
      ) {
        $active = true;
      }
    } elseif ( in_array( 'post', $types ) ) {
      $active = true;
    }

    if ( ! $active) return false;

    if ( isset( $wp_query->query['suppress_filters'] ) ) {
      if ($wp_query->get( 'orderby' ) == 'date') $wp_query->set( 'orderby', 'menu_order' );
      if ($wp_query->get( 'order' ) == 'DESC') $wp_query->set( 'order', 'ASC' );
    } else {
      if ( ! $wp_query->get( 'orderby' )) $wp_query->set( 'orderby', 'menu_order' );
      if ( ! $wp_query->get( 'order' )) $wp_query->set( 'order', 'ASC' );
    }
  }
}
