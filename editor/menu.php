<?php
namespace tangible\template_system\editor;
use tangible\framework;
use tangible\template_system\editor;

function register_template_system_menu() {

  framework\register_admin_menu([
    'name'  => 'tangible-template-system',
    'title' => 'Template System',
    'capability' => 'manage_options',
    'callback' => function () {
      editor\load_ide();
    },
    'position' => 0,
  ]);
}
