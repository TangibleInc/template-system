<?php

namespace Tangible\Loop;

/**
 * Shared interface for all loops
 *
 * Some methods are commented out below, because PHP interface cannot have
 * optional arguments.
 */

interface BaseLoopInterface {

  // Loop type name
  function get_name();
  // Loop type config
  function get_config();

  // Query
  function create_query_args( $args );
  function create_query( $query_args );
  function run_query( $query_args );
  function get_items_from_query( $query );

  // Loop over items
  function loop( $fn);
  function each( $fn ); // Alias of loop
  function map( $fn );
  // function reduce( $fn, $acc = [] );

  // Cursor
  function get_current();
  function set_current( $item );
  function next();
  function has_next();
  function reset();

  // Field
  // function get_field( $field_name, $args = [] );
  // function get_item_field( $item, $field_name, $args = [] );

  // Pagination

  // Paginated items
  function get_items();
  function get_items_count();
  function get_items_per_page();

  // Current page
  function get_current_page();
  function set_current_page( $current_page );
  function get_current_page_items();

  // All pages
  function get_total_items();
  function get_total_items_count();
  function get_total_pages();
}
