<?php
/**
 * Seed data for the AJAX permission tests, safe to run repeatedly.
 * Run with: wp eval-file <this file>
 *
 * @see tests/e2e/ajax/
 */

/**
 * A known admin, to check no user data leaks to an unallowed client
 */
$login = 'e2e_secret_admin';
$email = 'e2e-admin-secret@example.test';

$user = get_user_by( 'login', $login );
if ( ! $user ) {
  wp_insert_user( [
    'user_login'   => $login,
    'user_pass'    => wp_generate_password( 24 ),
    'user_email'   => $email,
    'role'         => 'administrator',
    'display_name' => 'E2E Secret Admin',
  ] );
} else {
  wp_update_user( [
    'ID'           => $user->ID,
    'user_email'   => $email
  ] );
}

/**
 * A secret option (like admin_email, an SMTP password or API key) an unallowed
 * client must never read.
 */
update_option( 'tangible_e2e_secret_option', 'SECRET-OPTION-VALUE-9f83a1', false );

/**
 * Public pages rendering a Table, so they output the guest nonce and the signed
 * data-tangible-table-config the tests read.
 */
$ensure_table_page = function ( $slug, $title, $content ) {

  $template = get_page_by_path( $slug . '-template', OBJECT, 'tangible_template' );
  kses_remove_filters();
  if ( $template ) {
    wp_update_post( [
      'ID'           => $template->ID,
      'post_content' => $content,
    ] );
    $template_id = $template->ID;
  } else {
    $template_id = wp_insert_post( [
      'post_type'    => 'tangible_template',
      'post_status'  => 'publish',
      'post_title'   => $title . ' Template',
      'post_name'    => $slug . '-template',
      'post_content' => $content,
    ] );
  }
  kses_init_filters();

  $shortcode = '[template id=' . $template_id . ']';
  if ( $page = get_page_by_path( $slug, OBJECT, 'page' ) ) {
    wp_update_post( [
      'ID'           => $page->ID,
      'post_content' => $shortcode,
    ] );
  } else {
    wp_insert_post( [
      'post_type'    => 'page',
      'post_status'  => 'publish',
      'post_title'   => $title,
      'post_name'    => $slug,
      'post_content' => $shortcode,
    ] );
  }
};

$ensure_table_page( 'e2e-ajax-table', 'E2E Ajax Table', <<<'HTML'
<Table>
  <Head><Col name=title>Title</Col></Head>
  <RowLoop type=post orderby=title order=asc>
    <Col name=title><Field title /></Col>
  </RowLoop>
</Table>
HTML );

// A table with a loop filter, for the filter round-trip caveat
$ensure_table_page( 'e2e-ajax-filter', 'E2E Ajax Filter', <<<'HTML'
<Table>
  <Head><Col name=title>Title</Col></Head>
  <Filter>
    <select action=loop name=orderby>
      <option value=title>Title</option>
      <option value=date>Date</option>
    </select>
  </Filter>
  <RowLoop type=post orderby=title>
    <Col name=title><Field title /></Col>
  </RowLoop>
</Table>
HTML );

// A paginated table with a numeric loop attribute, for the pagination, sort
// and numeric round-trip regression checks
$ensure_table_page( 'e2e-ajax-paged', 'E2E Ajax Paged', <<<'HTML'
<Table per_page=1>
  <Head><Col name=title>Title</Col></Head>
  <RowLoop type=post orderby=title count=50>
    <Col name=title><Field title /></Col>
  </RowLoop>
</Table>
HTML );

/**
 * A subscriber for the logged-in permission tests. Reset the password each run
 * so the login stays stable.
 */
$subscriber = get_user_by( 'login', 'e2e_subscriber' );
if ( ! $subscriber ) {
  wp_insert_user( [
    'user_login' => 'e2e_subscriber',
    'user_pass'  => 'e2e-sub-pass',
    'user_email' => 'e2e-sub@example.test',
    'role'       => 'subscriber',
  ] );
} else {
  wp_set_password( 'e2e-sub-pass', $subscriber->ID );
}

/**
 * Two posts with a known order for the reorder test, reset each run so it
 * starts from a fixed state.
 */
foreach ( [ 'e2e-order-a' => 1, 'e2e-order-b' => 2 ] as $order_slug => $order ) {
  $post = get_page_by_path( $order_slug, OBJECT, 'post' );
  if ( $post ) {
    wp_update_post( [ 'ID' => $post->ID, 'menu_order' => $order ] );
  } else {
    wp_insert_post( [
      'post_type'   => 'post',
      'post_status' => 'publish',
      'post_title'  => strtoupper( $order_slug ),
      'post_name'   => $order_slug,
      'menu_order'  => $order,
    ] );
  }
}

/**
 * The tests instance ships the intentionally empty block theme, which renders
 * nothing on the frontend. The Table pages need a real theme so they output the
 * ajax config and nonce the tests read.
 */
if ( wp_get_theme()->get_stylesheet() !== 'twentytwentyfive' ) {
  if ( ! wp_get_theme( 'twentytwentyfive' )->exists() ) {
    throw new \Exception(
      'The twentytwentyfive theme is required for the ajax e2e tests: the Table pages need a real theme to render.'
    );
  }
  switch_theme( 'twentytwentyfive' );
}

echo 'ok';
