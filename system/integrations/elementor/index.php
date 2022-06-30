<?php
/**
 * Integration with Elementor
 *
 * Provide Template widget with template editor.
 *
 * Frontend enqueued in ./template-editor-control.php, Template_Editor_Control::enqueue()
 *
 * Elementor source: https://github.com/elementor/elementor
 *
 * Developer docs:
 *   https://developers.elementor.com/
 *   https://developers.elementor.com/creating-an-extension-for-elementor/
 *   https://developers.elementor.com/creating-a-new-widget/
 * Code reference: https://code.elementor.com/
 * User guide: https://docs.elementor.com/
 */

if ( ! class_exists( 'Elementor\\Plugin' ) ) return;

require_once __DIR__ . '/enqueue.php';

/**
 * Add Elementor-specific actions to replace wp_head and wp_footer
 *
 * This ensures that template styles and scripts are loaded initially in the page builder.
 *
 * @see vendor/tangible/template/actions/index.php
 * @see https://github.com/elementor/elementor/issues/7174#issuecomment-466746848
 */

add_action( 'elementor/editor/before_enqueue_scripts', $html->head_action, 99 );
add_action( 'elementor/editor/footer', $html->footer_action, 99 );


/**
 * Widgets
 *
 * https://developers.elementor.com/creating-a-new-widget/
 * https://developers.elementor.com/creating-a-new-widget/adding-javascript-to-elementor-widgets/
 * https://developers.elementor.com/add-custom-functionality/#Registering_New_Widgets
 */

add_action( 'elementor/widgets/widgets_registered', function() use ( $plugin, $html ) {

  $elementor = \Elementor\Plugin::instance();

  require_once __DIR__ . '/template-editor-widget.php';

});


/**
 * Controls
 *
 * https://developers.elementor.com/elementor-controls/
 * https://developers.elementor.com/creating-a-new-control/
 * https://developers.elementor.com/add-controls-to-widgets/
 * https://developers.elementor.com/add-custom-functionality/#Registering_New_Controls
 */

add_action( 'elementor/controls/controls_registered', function() use ( $plugin, $html ) {

  $elementor = \Elementor\Plugin::instance();

  require_once __DIR__ . '/template-editor-control.php';

});


/**
 * Categories
 *
 * https://developers.elementor.com/widget-categories/
 */
add_action( 'elementor/elements/categories_registered', function( $elements_manager ) use ( $plugin ) {

});


/**
 * Dynamic tags
 */
add_action('elementor/dynamic_tags/register_tags', function( $dynamic_tags ) use ( $plugin, $html ) {

  // Creating tag group
  $dynamic_tags->register_group( 'loops-logic', [
    'title' => 'Tangible Loops & Logic',
  ] );

  // Include Dynamic tag files
  include_once __DIR__ . '/template-dynamic-tag.php';

  // Register tag
  $dynamic_tags->register_tag( 'Tangible\\Template\\Integrations\\Elementor\\Template_DynamicTag' );

});
