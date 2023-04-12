<?php

namespace Tangible\Template\Integrations\Elementor;

class Template_DynamicTag extends \Elementor\Core\DynamicTags\Tag {

  static $plugin;

  public function get_name() {
    return 'template-dynamic-tag';
  }

  public function get_title() {
    return __( 'Tangible Templates', 'tangible-loops-and-logic' );
  }

  public function get_group() {
    return [ 'loops-logic' ];
  }

  public function get_categories() {
    return [ \Elementor\Modules\DynamicTags\Module::TEXT_CATEGORY ];
  }

  protected function register_controls() {

    // Setting up the list of template options

    $options = self::$plugin->get_all_template_options();

    $this->add_control(
      'template',
      [
        'label'   => __( 'Choose one', 'tangible-template-system' ),
        'type'    => \Elementor\Controls_Manager::SELECT,
        'default' => array_keys( $options )[0], // At least one option exists even if no templates
        'options' => $options,
      ]
    );
  }

  public function render() {

    $id = $this->get_settings( 'template' );

    if (empty( $id )) return;

    $loop = self::$plugin->loop;

    /**
     * Ensure default loop context is set to current post
     *
     * @see /loop/context/index.php
     */
    $loop->push_current_post_context();

    $template = get_post( $id );
    echo self::$plugin->render_template_post( $template );

    $loop->pop_current_post_context();
  }
}

Template_DynamicTag::$plugin = $plugin;
