<?php

add_action('init', function() use ( $plugin ) {

  require_once __DIR__ . '/tangible-template/tangible-template.php';

}, 99);
