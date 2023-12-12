<?php

add_action('admin_enqueue_scripts', function () use ($framework) {

  if (!$framework->is_latest_version()) return;

  $url = $framework->url;
  $version = $framework->version;

  $js = $url.'/assets/admin-notices.js';

  wp_enqueue_script('tangible-admin-notices-js', $js, ['jquery'], $version);

  wp_localize_script(
  	'tangible-admin-notices-js',
  	'tangibleAdminNotice',
  	[
      'nonce' => wp_create_nonce('tangible-dismiss-admin-notice')
    ]
	);

});

add_action('wp_ajax_tangible_dismiss_admin_notice', function() use ($framework) {

  if (!$framework->is_latest_version()) return;

  check_ajax_referer('tangible-dismiss-admin-notice', 'nonce');
  $name = sanitize_text_field($_POST['admin_notice_key']);
  $framework->dismiss_admin_notice($name);
  exit;
});
