<?php

namespace Tangible\Template\Integrations\Elementor;

class Template_Editor_Control extends \Elementor\Base_Data_Control {

  static $plugin;
  static $html;

  const CONTROL_TYPE = 'tangible-template-editor';

  function get_type() {
    return self::CONTROL_TYPE;
  }

  function enqueue() {

    $plugin = self::$plugin;

    // See ./enqueue.php
    $plugin->enqueue_elementor_template_editor();
  }

    /**
     * Get code control default settings.
     *
     * Retrieve the default settings of the code control. Used to return the default
     * settings while initializing the code control.
     *
     * https://developers.elementor.com/creating-a-new-control#Control_Settings
     */
  protected function get_default_settings() {
    return [
    'label'       => '',
    'show_label'  => false,
    'label_block' => true,
    'default'     => '',
    ];
  }

    /**
     * Render code control output in the editor.
     *
     * Used to generate the control HTML in the editor using Underscore JS
     * template. The variables for the class are available using `data` JS
     * object.
     */
  function content_template() {

      $control_uid = $this->get_control_uid();
    /*
    <label for="<?php echo $control_uid; ?>" class="elementor-control-title">{{{ data.label }}}</label>
    */
    ?>
        <div class="elementor-control-field">
            <div class="elementor-control-input-wrapper">
                <textarea
          id="<?php echo $control_uid; ?>"
          class="tangible-elementor-template-editor-textarea"
          data-setting="{{ data.name }}"
          style="display: none"
        ></textarea>
            </div>
        </div>
        <?php
  }

}

Template_Editor_Control::$plugin = $plugin;
Template_Editor_Control::$html   = $html; // Template module instance

$controls_manager->register(
  new Template_Editor_Control()
);
