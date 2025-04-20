<?php
namespace tangible\template_system;
use tangible\template_system;

require_once __DIR__ . '/field-group.php';

function register_acf_field_group( $name, $config ) {
  /**
   * TODO: Refactor with acf_ prefixed function names
   */
  template_system::$html->register_field_group( $name, $config );
}
