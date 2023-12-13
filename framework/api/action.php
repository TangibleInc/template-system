<?php
namespace tangible\api;
use tangible\api;

api::$state->actions = [];
api::$state->action_key = 'tangible_api';

// Action

function add_action($name, $callback) {
  api::$state->actions[ $name ] = $callback;
}

function remove_action($name) {
  unset(api::$state->actions[ $name ]);
}

function action($name, $data = []) {

  if (!isset(api::$state->actions[ $name ])) {
    throw new Exception("Action not found: {$action}");    
  }

  return call_user_func(api::$state->actions[ $name ], $data);
}

function get_action_key() {
  return api::$state->action_key;
}
