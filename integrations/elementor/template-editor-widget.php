<?php

namespace Tangible\Template\Integrations\Elementor;

use tangible\template_system;

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

  function get_script_depends() {
    return \Elementor\Plugin::$instance->preview->is_preview_mode()
      ? [ 'tangible-module-loader' ]
      : []
    ;
  }

  protected function register_controls() {

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

    /**
     * Restrict editor to admins who are allowed to edit templates
     * @see /admin/capability
     */
    if ( template_system\can_user_edit_template() ) {

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
    }

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
    $loop     = self::$plugin->loop;

    /**
     * Ensure default loop context is set to current post
     *
     * @see /loop/context/index.php
     */
    $loop->push_current_post_context();

    if ( ! empty( $settings['template'] ) ) {

      $template = get_post( $settings['template'] );
      echo self::$plugin->render_template_post( $template );

    } elseif ( ! empty( $settings['html'] ) ) {

      echo tangible_template()->render( $settings['html'] );

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
