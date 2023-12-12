<?php

$framework->get_admin_notice_setting_key = function($name) use ($framework) {
  return "tangible_admin_notice_dismissed__{$name}";
};

$framework->is_admin_notice_dismissed = function($name) use ($framework) {

  $key = $framework->get_admin_notice_setting_key($name);
  $value = \is_multisite()
    ? get_network_option(null, $key, false)
    : get_option($key, false);

  return !empty($value) && $value==='true';
};

$framework->dismiss_admin_notice = function($name, $value = 'true') use ($framework) {

  $key = $framework->get_admin_notice_setting_key($name);

  return \is_multisite()
    ? update_network_option(null, $key, $value)
    : update_option($key, $value);
};

$framework->reset_admin_notice = function($name) use ($framework) {
  return $framework->dismiss_admin_notice($name, 'false');
};
