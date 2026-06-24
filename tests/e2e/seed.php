<?php
/**
 * Idempotent seed data for frontend e2e scenarios.
 * Run via: wp eval-file <this file> (inside wp-env cli container)
 */

$ensure_template = function (string $slug, string $title, string $content): int {
  $existing = get_page_by_path($slug, OBJECT, 'tangible_template');
  kses_remove_filters();
  if ($existing) {
    wp_update_post([ 'ID' => $existing->ID, 'post_content' => $content ]);
    $id = $existing->ID;
  } else {
    $id = wp_insert_post([
      'post_type' => 'tangible_template',
      'post_status' => 'publish',
      'post_title' => $title,
      'post_name' => $slug,
      'post_content' => $content,
    ]);
  }
  kses_init_filters();
  return $id;
};

$ensure_page = function (string $slug, string $title, string $content): int {
  $existing = get_page_by_path($slug, OBJECT, 'page');
  if ($existing) {
    wp_update_post([ 'ID' => $existing->ID, 'post_content' => $content ]);
    return $existing->ID;
  }
  return wp_insert_post([
    'post_type' => 'page',
    'post_status' => 'publish',
    'post_title' => $title,
    'post_name' => $slug,
    'post_content' => $content,
  ]);
};

// Posts in a category, for paged loops
$term = term_exists('e2e-cat', 'category');
if (!$term) {
  $term = wp_insert_term('E2E Cat', 'category', [ 'slug' => 'e2e-cat' ]);
}
$term_id = is_array($term) ? (int) $term['term_id'] : (int) $term;
foreach (['E2E Post A', 'E2E Post B', 'E2E Post C'] as $title) {
  $slug = sanitize_title($title);
  if (!get_page_by_path($slug, OBJECT, 'post')) {
    wp_insert_post([
      'post_type' => 'post', 'post_status' => 'publish',
      'post_title' => $title, 'post_name' => $slug,
      'post_category' => [ $term_id ],
    ]);
  }
}

// 1. Compile-mode parity: dynamic template + page wrapping it in a marker
$tpl = $ensure_template('e2e-compile-tpl', 'E2E Compile Tpl',
  '<Set who>visitor</Set>Hello <Get variable=who />. '
  . '<If variable=missing exists>nope<Else />fallback works</If>. '
  . '<Loop items=\'[{"v":"x"},{"v":"y"}]\'><Field v />,</Loop> '
  . '<Loop type=post category=e2e-cat orderby=title order=asc><Field title />;</Loop>'
);
$ensure_page('e2e-compile-page', 'E2E Compile Page',
  '<div id="parity-zone">[template id=' . $tpl . ']</div>'
);

// 2. Paginated loop with scroll_top buttons, behind a tall spacer
$paged = $ensure_template('e2e-paged-tpl', 'E2E Paged Tpl',
  '<div style="height:1500px">spacer above</div>'
  . '<div id="paged-zone"><Loop type=post category=e2e-cat paged=2 orderby=title order=asc>'
  . '<div class="e2e-row" style="height:800px"><Field title /></div>'
  . '</Loop></div>'
  . '<PaginateButtons scroll_top=true />'
);
$ensure_page('e2e-paged-page', 'E2E Paged Page', '[template id=' . $paged . ']');

// 3. Redirect tag
$redirect = $ensure_template('e2e-redirect-tpl', 'E2E Redirect Tpl',
  '<Redirect to="/?pagename=e2e-compile-page" />never shown'
);
$ensure_page('e2e-redirect-page', 'E2E Redirect Page', '[template id=' . $redirect . ']');

/**
 * The tests instance ships the intentionally empty block theme, which
 * renders nothing on the frontend. Frontend scenarios need a real theme.
 */
if (
  wp_get_theme()->get_stylesheet() !== 'twentytwentyfive'
  && wp_get_theme('twentytwentyfive')->exists()
) {
  switch_theme('twentytwentyfive');
}

// Pretty permalinks for stable URLs
global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/%postname%/');
$wp_rewrite->flush_rules();

echo "seeded\n";
