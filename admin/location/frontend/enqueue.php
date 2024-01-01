<?php
namespace tangible\template_system\location;
use tangible\template_system;

/**
 * Template type: Tangible Style
 */
function enqueue_style_templates() {

  $plugin = template_system::$system;
  $logic = template_system::$logic;

  $templates = $plugin->get_all_templates(
    'tangible_style'
  );

  if (empty( $templates )) return;

  foreach ( $templates as $template ) {

    // Evaluate template location rules

    $rule_groups = ( isset( $template['location'] ) && isset( $template['location']['rule_groups'] ) )
      ? $template['location']['rule_groups']
      : [];

    $matches = empty( $rule_groups )

      ? true // No location rules - Apply to entire site

      /**
       * Evaluate rule groups
       *
       * @see vendor/tangible/logic/evaluate
       */
    : $logic->evaluate_rule_groups(
        $rule_groups,
        $plugin->evaluate_location_rule
      );

    if ( ! $matches ) continue;

    // Load style - See ../../render.php
    $plugin->enqueue_template_style( $template['id'] );
  }
}

add_action('wp_head', __NAMESPACE__ . '\\enqueue_style_templates', 9); // Earlier than default priority 10


/**
 * Template type: Tangible Script
 */
function enqueue_script_templates() {

  $plugin = template_system::$system;
  $logic = template_system::$logic;

  $templates = $plugin->get_all_templates(
    'tangible_script'
  );

  if (empty( $templates )) return;

  foreach ( $templates as $template ) {

    // Evaluate template location rules

    $rule_groups = ( isset( $template['location'] ) && isset( $template['location']['rule_groups'] ) )
      ? $template['location']['rule_groups']
      : [];

    $matches = empty( $rule_groups )

      ? true // No location rules - Apply to entire site

      /**
       * Evaluate rule groups
       *
       * @see vendor/tangible/logic/evaluate
       */
    : $logic->evaluate_rule_groups(
        $rule_groups,
        $plugin->evaluate_location_rule
      );

    if ( ! $matches ) continue;

    // Load script - See ../../render.php
    $plugin->enqueue_template_script( $template['id'] );
  }

}

add_action('wp_footer', __NAMESPACE__ . '\\enqueue_script_templates', 11); // Later than default priority 10


/**
 * Template type: Tangible Layout - Theme Position "Document Head"
 * 
 * @see /system/location/theme/index.php
 */

add_action('wp_head', function() use ( $plugin ) {
  do_action('tangible_layout_document_head');
}, 0);


/**
 * Template type: Tangible Layout - Theme Position "Document Foot"
 */

add_action('wp_footer', function() use ( $plugin ) {
  do_action('tangible_layout_document_foot');
}, 98);
