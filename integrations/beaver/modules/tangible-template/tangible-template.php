<?php
namespace Tangible\Template\Integrations\Beaver;
use tangible\framework;
use tangible\template_system;
use FLBuilder, FLBuilderModule, FLPageData;

class TemplateModule extends \FLBuilderModule {

  static $config;
  static $plugin;

  /**
   * @method __construct
   */
  public function __construct() {
    parent::__construct(self::$config);

    $this->register_field_connections();
  }

  private function register_field_connections(){

    add_action('fl_page_data_add_properties', function() {

      FLPageData::add_group('tangible_blocks', array(
        'label' => __('Tangible Blocks', 'fl-builder')
      ));

      FLPageData::add_post_property( 'tangible_template_connection', array(
        'label'   => __('Tangible Templates', 'fl-builder'),
        'group'   => 'tangible_blocks',
        'type'    => 'html',
        'getter'  => function ($settings){

          $id = $settings->saved_template;
          if (empty($id)) return;

          $post = get_post( $id );
          return self::$plugin->render_template_post($post);
        },
      ) );

      FLPageData::add_post_property_settings_fields('tangible_template_connection', array(
        'saved_template' => array(
          'type'    => 'select',
          'label'   => __( 'Choose one', 'fl-builder' ),
          'options' => self::$plugin->get_all_template_options()
        )
      ));
    });
  }

}

TemplateModule::$plugin = $plugin;
TemplateModule::$config = [
  'name'            => __( 'Tangible Template', 'fl-builder' ),
  'description'     => __( 'Render HTML template.', 'fl-builder' ),
  'category'        => __( 'Basic', 'fl-builder' ),
  'partial_refresh' => true,
  'icon'            => 'editor-code.svg',
  'dir'             => __DIR__,
  'url'             => trailingslashit( framework\module_url( __FILE__ ) )
];

/**
 * Register the module and its form settings.
 */

$options = $plugin->get_all_template_options();

FLBuilder::register_module(TemplateModule::class, [
  'general' => [
    'title'    => __( 'General', 'fl-builder' ),
    'sections' => [
      'general' => [
        'title'  => '',
        'fields' => [
          'toggle_type' => [
            'type'       => 'select',
            'label'      => __( 'Use existing template', 'fl-builder' ),
            'default'    => 'editor',
            'options'    => [
              'template'    => __( 'Yes', 'fl-builder' ),
              'editor'      => __( 'No', 'fl-builder' )
            ],
            'toggle'     => [
              'editor'   => [
                'fields'    => [ 'html' ]
              ],
              'template' => [
                'fields'    => [ 'saved_template' ]
              ]
            ]
          ],
          'html' =>
            /**
             * Restrict editor to admins who are allowed to edit templates
             * @see /admin/capability
             */
            template_system\can_user_edit_template()
              ? [
                'type'  => 'tangible_template_editor',
                'label' => __( 'HTML', 'fl-builder' ),
              ]
              : []
          ,
          'saved_template' => [
            'type'    =>  'select',
            'label'   =>  __( 'Select template', 'fl-builder' ),
            'default' => array_keys($options)[0], // At least one option exists even if no templates
            'options' => $options
          ],
        ],
      ],
    ],
  ],
]);
