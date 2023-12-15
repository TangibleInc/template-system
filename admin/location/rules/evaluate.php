<?php

/**
 * Evaluate location rule
 */

$plugin->evaluate_location_rule = function( $rule ) use ( $plugin, $html ) {

  // Provide default values for convenience
  $rule['field']    = isset( $rule['field'] ) ? $rule['field'] : '';
  $rule['field_2']  = isset( $rule['field_2'] ) ? $rule['field_2'] : '';
  $rule['operator'] = isset( $rule['operator'] ) ? $rule['operator'] : '';
  $rule['value']    = isset( $rule['value'] ) ? $rule['value'] : '';

  /**
   * Apply custom evaluators
   *
   * Not using apply_filters, because we only want the result of
   * a single evaluator that matches.
   *
   * @see $plugin->add_location_rule_evaluator() below
   */

  foreach ( $plugin->custom_location_rule_evaluators as $callback ) {

    $result = $callback( $rule );

    if ( ! is_null( $result ) ) return $result; // Final result

    // Unknown rule
  }

  $field    = $rule['field'];
  $field_2  = $rule['field_2'];
  $operator = $rule['operator'];
  $value    = $rule['value'];

  switch ( $field ) {

    case 'all':
        return true; // Entire site

    case 'none':
        return false; // Nowhere

    case 'home':
        return is_home();

    case 'not_found':
        return is_404();

    case 'route':
      // Do nothing if route is empty
      if (empty( $field_2 )) return false;

      // Ensure starting slash
      if ($field_2[0] !== '/') $field_2 = '/' . $field_2;

      global $wp;

      $current_route = '/' . $wp->request;

      // Match given route with wildcard (?, *, **)
      $result = $html->route_matches(
        $field_2,
        $current_route
      );

        return $result;

    case 'post_type_archive':
      $post_type = $field_2;

      // tangible\see('Archive', $post_type, is_post_type_archive( $post_type ));

        return is_post_type_archive( $post_type );

    case 'post_type_singular':
      $post_type = $field_2;

      // tangible\see('Singular', $post_type, is_singular( $post_type ));

      if ( ! is_singular( $post_type ) ) return false;

      if ( empty( $post_type ) || $operator === 'all' ) return true;

      global $post;

      if ( empty( $post ) ) return false;

      $id = $post->ID;

      // Current post is in value
      if ( $operator === 'include' ) {
        return is_array( $value ) && in_array( $id, $value );
      }

      // Current post is NOT in value
      if ( $operator === 'exclude' ) {
        return ! ( is_array( $value ) && in_array( $id, $value ) );
      }

        return false;

    case 'taxonomy_archive':
      $taxonomy = $field_2;

      /**
       * Category and tag require their own conditional functions
       */

      if ( $taxonomy === 'category' ) {
        if ( $operator === 'include' ) return is_array( $value ) && is_category( $value );
        if ( $operator === 'exclude' ) return ! ( is_array( $value ) && is_category( $value ) );
        return is_category();
      }

      if ( $taxonomy === 'post_tag' ) {
        if ( $operator === 'include' ) return is_array( $value ) && is_tag( $value );
        if ( $operator === 'exclude' ) return ! ( is_array( $value ) && is_tag( $value ) );
        return is_tag();
      }

      // tangible\see('taxonomy_archive', $taxonomy, is_tax(), is_tax( $taxonomy ));

      if ( $operator === 'include' ) return is_array( $value ) && is_tax( $taxonomy, $value );
      if ( $operator === 'exclude' ) return ! ( is_array( $value ) && is_tax( $taxonomy, $value ) );
        return is_tax( $taxonomy );

    case 'author_archive':
        return is_author();

    case 'date_archive':
        return is_date();

    case 'search':
        return is_search();

  }

  return false;
};

/**
 * Custom location rule evaluators
 *
 * Third-party integrations can use this to evaluate location rule definitions.
 *
 * A custom evaluator must either return:
 *
 * - boolean (true/false) when it recognizes a rule
 *
 *   The value will be the final result.
 *
 * - null for unknown rules
 *
 *   Other evaluators will determine the result.
 */

$plugin->custom_location_rule_evaluators = [];

$plugin->add_location_rule_evaluator = function( $callback ) use ( $plugin ) {
  $plugin->custom_location_rule_evaluators [] = $callback;
};
