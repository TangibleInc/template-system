<?php

namespace Tangible\Template\Integrations\Elementor;

class Template_Editor_Widget extends \Elementor\Widget_Base {

  static $plugin;
  static $html;

  function get_name() {
    return 'tangible-template-editor';
  }

  function get_title() {
    return __( 'Tangible Template', 'tangible-loops-and-logic' );
  }

  function get_icon() {
    return 'eicon-code';
  }

  function get_categories() {
    return [ 'basic' ];
  }

  protected function register_controls() {

    // Access control - @see /includes/template/editor/user.php
    if ( ! self::$plugin->can_user_edit_template() ) return;

    $this->start_controls_section(
      'content_section',
      [
        'label' => __( 'Content', 'tangible-loops-and-logic' ),
        'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
      ]
    );

    $this->add_control(
      'toggle-type',
      [
        'label'   => __( 'Use existing template', 'tangible-loops-and-logic' ),
        'type'    => \Elementor\Controls_Manager::SELECT,
        'options' => [
          'template' => __( 'Yes', 'tangible-loops-and-logic' ),
          'editor'   => __( 'No', 'tangible-loops-and-logic' ),
        ],
        'default' => 'editor',
      ]
    );

    $this->add_control(
      'html',
      [
        'type'       => Template_Editor_Control::CONTROL_TYPE,
        'label'      => __( 'HTML', 'tangible-template-system' ),
        'default'    => '',
        'show_label' => false,
        'condition'  => [ 'toggle-type' => 'editor' ],
      ]
    );

    // Setting up the list of template options

    $options = self::$plugin->get_all_template_options();

    $this->add_control(
      'template',
      [
        'label'     => __( 'Template', 'tangible-loops-and-logic' ),
        'type'      => \Elementor\Controls_Manager::SELECT,
        'options'   => $options,
        'default'   => array_keys( $options )[0], // At least one option exists even if no templates
        'condition' => [ 'toggle-type' => 'template' ],
      ]
    );

    $this->end_controls_section();
  }

  protected function render() {

    $settings = $this->get_settings_for_display();
    $loop = self::$plugin->loop;

    /**
     * Ensure default loop context is set to current post
     * @see /loop/context/index.php
     */
    $loop->push_current_post_context();

    if ( ! empty( $settings['template'] ) ) {

      $template = get_post( $settings['template'] );
      echo self::$plugin->render_template_post( $template );

    } elseif ( ! empty( $settings['html'] ) ) {

      echo self::$html->render( $settings['html'] );

    } else {
      // White space prevents widget preview from collapsing
      echo ' ';
    }

    $loop->pop_current_post_context();
  }

}

Template_Editor_Widget::$plugin = $plugin;
Template_Editor_Widget::$html   = $html; // Template module instance

$widgets_manager->register(
  new Template_Editor_Widget()
);
