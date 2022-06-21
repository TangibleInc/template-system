<?php

/**
 * Access control for template editor
 *
 * TODO: Settings for more detailed access control by user role
 */
$plugin->can_user_edit_template = function() {
  return current_user_can( 'manage_options' );
};
