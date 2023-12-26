<?php
namespace tangible\framework;
use tangible\framework;

function get_admin_notice_setting_key($name) {
  return "tangible_admin_notice_dismissed__{$name}";
}

function is_admin_notice_dismissed($name) {

  $key = framework\get_admin_notice_setting_key($name);
  $value = \is_multisite()
    ? get_network_option(null, $key, false)
    : get_option($key, false);

  return !empty($value) && $value==='true';
}

function dismiss_admin_notice($name, $value = 'true') {

  $key = framework\get_admin_notice_setting_key($name);

  return \is_multisite()
    ? update_network_option(null, $key, $value)
    : update_option($key, $value);
}

function reset_admin_notice($name) {
  return framework\dismiss_admin_notice($name, 'false');
}
