<?php

include __DIR__.'/enqueue.php';
include __DIR__.'/fields.php';

$framework->register_admin_notices = function($plugin) use ($framework) {

  if (!isset($plugin['admin_notice'])) return;

  $action = $framework->is_multisite($plugin)
    ? 'network_admin_notices'
    : 'admin_notices';

  add_action($action, function() use ($plugin) {
    $plugin['admin_notice']($plugin);
  });
};
