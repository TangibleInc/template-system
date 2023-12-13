<?php

$html->form_actions = [];

require_once __DIR__ . '/create.php';
require_once __DIR__ . '/mail.php';

$html->form_action = function( $attributes, $data ) use ( $html ) {

  if ( empty( $attributes['action'] ) ) {
    if ( isset( $attributes['type'] ) ) {
      // Default action for content type
      $attributes['action'] = 'create';
    } else {
      return [ 'error' => 'Action is required' ];
    }
  }

  $action = $attributes['action'];

  if ( ! isset( $html->form_actions[ $action ] )) return [
    'error' => "Unknown action \"$action\"",
  ];

  return $html->form_actions[ $action ]( $attributes, $data );
};
