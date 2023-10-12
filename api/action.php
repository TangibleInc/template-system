<?php

namespace Tangible\TemplateSystem\API;

use Tangible\TemplateSystem\API as api;

api::$state->actions = [];
api::$state->action_key = 'tangible_template_system_api';

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
