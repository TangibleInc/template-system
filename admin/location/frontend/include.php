<?php
/**
 * Template type: Tangible Layout
 *
 * Apply templates with matching location rules to override the theme's PHP template.
 */

/**
 * By default, the layout template applies to the "Content" position, which is
 * the whole page including header and footer.
 */
$plugin->layout_template_for_current_location = null;

// Additional positions: header, footer, parts
$plugin->layout_template_for_theme_position = [
  // Theme position => Post ID
];

add_filter('template_include', function( $file_path ) use ( $plugin, $html, $logic ) {

  $include_template = apply_filters( 'tangible_layout_template_include', true, $file_path );
  if ( ! $include_template ) return $file_path;

  $templates = $plugin->get_all_templates( 'tangible_layout' );
  if (empty( $templates )) return $file_path;

  global $wp;

  $current_route       = '/' . $wp->request;
  $content_template_id = null;

  foreach ( $templates as $template ) {

    if (empty( $template['location'] ) || ! isset( $template['location']['rule_groups'] )) continue;

    // Evaluate template location rules

    $rule_groups = $template['location']['rule_groups'];

    /**
     * Evaluate rule groups
     *
     * @see vendor/tangible/logic/evaluate
     */
    $is_matched = empty( $rule_groups )
      ? false // No location rules - Skip this template
    : $logic->evaluate_rule_groups(
        $rule_groups,
        $plugin->evaluate_location_rule
      );

    // tangible\see( 'Layout #' . $template['id'], $rule_groups, $is_matched );

    if ( ! $is_matched) continue;

    $template_id    = $template['id'];
    $theme_position = get_post_meta( $template_id, 'theme_position', true );

    /**
     * Theme position "content"
     */
    if ( empty( $theme_position ) || $theme_position === 'content' ) {

      // Apply only the first matching template found, and pass template ID to content.php
      if ( empty( $content_template_id ) ) {
        $plugin->layout_template_for_current_location = $template_id;
        $content_template_id                          = $template_id;
      }

      continue;
    }

    /**
     * For other theme positions like "header" and "footer", continue search for
     * "content" layout, or fall through to theme.
     *
     * Keep a map of layouts to apply: all theme positions come after the current
     * "template_include" filter.
     */

    // Apply only the first matching template found for this position.
    if ( ! isset( $plugin->layout_template_for_theme_position[ $theme_position ] ) ) {
      $plugin->layout_template_for_theme_position[ $theme_position ] = $template_id;
    }
  }

  /**
   * Apply any layout templates that match theme positions
   */

  foreach ( $plugin->get_all_theme_position_hooks() as $hook ) {

    $hook_name = $hook['name'];

    if ( ! isset( $plugin->layout_template_for_theme_position[ $hook_name ] )) continue;

    /**
     * Matching layout template found for this theme position
     *
     * Add action hook with highest priority, render the template, and remove
     * other action callbacks.
     */

    add_action($hook_name, function() use ( $plugin, $hook_name ) {

      // Apply this template
      $template_id = $plugin->layout_template_for_theme_position[ $hook_name ];

      echo $plugin->render_template_post( $template_id );

      // Remove other action callbacks
      remove_all_actions( $hook_name );

    }, 0);
  }

  // Load content template, if any

  if (empty( $content_template_id )) return $file_path;

  // Always OK unless manually set by <Status>
  global $wp_query;
  $wp_query->is_404 = false;
  status_header( 200 );

  return __DIR__ . '/content.php';

}, 1100, 1); // Ensure priority higher than Tangible Views Theme (1000), Beaver Themer (999), ..
