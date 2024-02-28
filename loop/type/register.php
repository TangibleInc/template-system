<?php

/**
 * Register loop type
 *
 * @param $config object
 *
 *   name: string                   Name of loop type - The same value as loop query argument "type"
 *   title: string                  Title for documentation section (without "Loop")
 *   description: string            Description of loop type (optional)
 *   action?: function              Loop type item action: get, create, update, remove
 *
 *   post_type?: string             If loop type is an alias of a post type, pass original post type name
 *   taxonomy?: string              If loop type is an alias of a taxonomy, pass original taxonomy name
 *
 *   query_args: object             Supported query arguments
 *     [argument name]: object      Query argument config
 *       default: any               Default value of parameter
 *       description: string        Description of parameter
 *       type: string | array       Type of parameter: boolean, string, number, array (which also accepts comma-separated string)
 *
 *   fields: object                 Supported fields (in addition to arbitrary custom fields)
 *     [field name]: object         Field config
 *       description: string        Description of parameter
 */
$loop->register_type = function( $config ) use ( $loop ) {

  if ( is_string( $config ) ) {

    // Get config from given class name

    $classname = $config;
    $config    = $classname::$config;

    $type = $config['name'];

    if ( ! isset( $config['create'] ) ) {

      // Default loop type creator

      $config['create'] = function( $args, $context = [] ) use ( $classname ) {
        return new $classname( $args, $context );
      };
    }

    // Loop type action defined as static method

    $action_callback = [ $classname, 'action' ];

    if ( is_callable( $action_callback ) ) {
      $config['action'] = $action_callback;
    }
  }

  $configs = &$loop->type_configs;

  $post_type_to_loop_type = &$loop->post_type_to_loop_type;
  $loop_type_to_post_type = &$loop->loop_type_to_post_type;

  $type = $config['name'];

  $configs[ $type ] = $config;

  if ( isset( $config['post_type'] ) ) {
    $post_type_to_loop_type[ $config['post_type'] ] = $type;
    $loop_type_to_post_type[ $type ]                = $config['post_type'];
  }

  return $config;
};
