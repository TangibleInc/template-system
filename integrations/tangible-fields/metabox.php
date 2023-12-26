<?php
namespace tangible\template_system;
/**
 * Create meta box and render fields
 *
 * Usage:
 * 
 * tangible_fields()->prepare_metabox([
 *    'id'          => 'sample_metabox',
 *    'title        => 'Sample Title',
 *    'post_types'  => [ 'page', 'post', ... ],
 *    'context'     => 'normal' | 'side' | 'advanced',      // default 'advanced'
 *    'priority'    => 'high' | 'core' | 'default' | 'low'  // default 'default'
 * ])
 * ->add_field( $name, args ) // similar to tangible_fields()->render_field( ... )
 * ->add_field( $name, $args ) // similar to tangible_fields()->render_field( ... )
 * ->create_metabox();
 */
function create_metabox( $metabox_args ) {

  if (!function_exists('tangible_fields')) return;

  $fields = tangible_fields();

  return new class( $metabox_args, $fields ) {

    private $fields;
    private $metabox_args = [];
    private $id;

    private $already_created = false;
    private $fields_to_render = [];
    private $meta_names = [];

    function __construct( $metabox_args, $fields ) {
      $this->metabox_args = $metabox_args;
      $this->fields = $fields;

      $this->id = 'tf-metabox-nonce-' . $this->metabox_args['id'];
    }
    function add_field( $field_name, $field_args ) {
      $this->meta_names[] = $field_name;
      $this->fields_to_render[] = [
        'name' => $field_name,
        'args' => $field_args
      ];

      return $this;
    }

    function create_metabox() {
      if ( ! $this->already_created ) {
        add_action('add_meta_boxes', [$this, '_setup_metabox']);
        add_action('save_post', [$this, '_setup_cpt_metadata']);
        $this->already_created = true;
      }
    }

    function _setup_metabox() {
      add_meta_box(
        $this->metabox_args['id'],
        $this->metabox_args['title'],
        [$this, '_render_metabox'],
        $this->metabox_args['post_types'],
        $this->metabox_args['context'] ?? 'advanced',
        $this->metabox_args['priority'] ?? 'default',
      );
    }

    function _render_metabox() {
      wp_nonce_field( $this->id, $this->id, false );

      foreach ( $this->fields_to_render as $field ) {
        echo $this->fields->render_field( $field['name'], $field['args'] );
      }
    }

    function _setup_cpt_metadata( $post_id ) {
      if ( defined( 'DOING_AUTOSAVE') && DOING_AUTOSAVE ) {
        return;
      }

      $post = get_post( $post_id );

      $post_type = $post->post_type;
      $valid_post_types = $this->metabox_args[ 'post_types' ];

      if ( ! in_array( $post_type, $valid_post_types ) ||
           ! current_user_can( 'edit_post', $post_id ) ) {
        return;
      }

      $nonce = $_POST[ $this->id ] ?? null;

      if ( empty( $nonce ) || ! wp_verify_nonce( $nonce, $this->id ) ) {
        return;
      }

      foreach ( $this->meta_names as $meta_name ) {
        $metadata = $_POST[ $meta_name ] ?? null;

        if ( ! empty( $metadata ) ) {
          $metadata = json_decode( stripslashes_deep($metadata), true ) ?? $metadata;
          $filtered_metadata = apply_filters( 'tgbl_update_meta_' . $meta_name, $metadata );
          update_post_meta( $post_id, $meta_name, $filtered_metadata );
        }
      }
    }
  };
}
