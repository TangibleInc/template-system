<?php

namespace Tangible\TemplateSystem\Editor;

use Tangible\TemplateSystem\Editor as editor;

function register_template_system_menu() {

  $system = &editor\state::$system;

  add_action(
    $system->is_multisite() ? 'network_admin_menu' : 'admin_menu',
    function() {

      // See ../system/post-types/extend.php for menu separator style

      add_submenu_page(
        'tangible', // Parent menu slug
        'Template System', // Page title
        'Template System', // Menu title
        'manage_options', // Capability
        'tangible-template-system', // Menu slug
        function () {
          editor\load_ide();
        }, // Callback
        0 // Position
      );
    },
    10
  );
}

function register_settings_menu() {

  $system = &editor\state::$system;

  add_action(
    $system->is_multisite() ? 'network_admin_menu' : 'admin_menu',
    function() {
      // See ../system/post-types/extend.php for menu separator style
      add_submenu_page(
        'tangible', // Parent menu slug
        'Settings', // Page title
        'Settings', // Menu title
        'manage_options', // Capability
        'tangible-template-system-settings', // Menu slug
        function () {
?><div class="wrap">

<h2>Settings</h2>

<p><fieldset>
  <label for="new_editor">
    <input type="checkbox" name="new_editor" id="new_editor">
    Editor based on CodeMirror 6
  </label>
</fieldset>
</p>

<p><fieldset>
  <label for="ide">
    <input type="checkbox" name="ide" id="ide">
    Template System IDE - Integrated Development Environment *<b><small>beta</small></b>
  </label>
</fieldset>
</p>

</div><?php
        }, // Callback
        30 // Position
      );
    },
    99
  );  
}
