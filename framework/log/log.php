<?php
namespace tangible;

function log() {
  $args = func_get_args();
  $log_file_path = WP_CONTENT_DIR . '/log.txt';
  array_unshift($args, $log_file_path);
  return call_user_func_array(__NAMESPACE__ . '\\log_to_file', $args);
};
