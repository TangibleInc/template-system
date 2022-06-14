<?php

/**
 * Loop type action
 *
 * A loop class may implement a static method called "action".
 *
 * The method has the function signature: action($action_name, $action_data)
 *
 * It should support the following core actions, and optionally any others.
 *
 * - get, create, update, delete
 *
 * It should return an associative array with these properties (at least one is required):
 *
 * - `result` - Any value on success
 * - `error` - Associative array with required property "message" (string)
 *
 * @see ./register, register_type()
 */

$loop->action = function($type, $action, $data = []) use ($loop) {

  $config = $loop->get_type_config( $type );

  // If defaulted to post, pass the loop type name
  if ($config['name'] !== $type) {
    $data['type'] = $type;
  }

  if (!isset($config['action'])) {
    trigger_error('Loop type "' . $type . '" has no static method "action"', E_USER_WARNING);
    return;
  }

  return call_user_func_array($config['action'], [
    $action,
    $data
  ]);
};

$loop->has_action = function($type) use ($loop) {
  $config = $loop->get_type_config( $type );
  return isset($config['action']);
};
