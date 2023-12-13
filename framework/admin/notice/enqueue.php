<?php
namespace tangible\admin;
use tangible\admin as admin;

add_action('admin_enqueue_scripts', function () {

  $url = admin::$state->url;
  $version = admin::$state->version;

  $js = $url . '/notice/admin-notice.js';

  wp_enqueue_script('tangible-admin-notice-js', $js, ['jquery'], $version);

  wp_localize_script(
  	'tangible-admin-notice-js',
  	'tangibleAdminDismissNotice',
  	[
      'nonce' => wp_create_nonce('tangible-admin-dismiss-notice')
    ]
	);
});

add_action('wp_ajax_tangible_admin_dismiss_notice', function() {

  check_ajax_referer('tangible-admin-dismiss-notice', 'nonce');
  $name = sanitize_text_field($_POST['admin_notice_key']);

  admin\dismiss_admin_notice($name);
  exit;
});
