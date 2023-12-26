<?php
namespace tangible\framework;

include __DIR__.'/enqueue.php';
include __DIR__.'/fields.php';

function register_admin_notice($callback) {

  $action = is_multisite()
    ? 'network_admin_notices'
    : 'admin_notices';

  add_action($action, $callback);
};
