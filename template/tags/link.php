<?php

/**
 * Filter href attribute to improve how root and relative URL routes are handled.
 *
 * It provides consistency for:
 *
 * - href="/route" goes to **site root**, not domain as in HTML behavior
 * - href="route" goes to the route **under the current route**, not parent
 */

$html->add_open_tag('a', function($atts, $children) use ($html) {

  if (isset($atts['href'])) {

    $atts['href'] = $html->absolute_or_relative_url($atts['href']);

    // TODO: Link for current language

  }

  if ($html->disable_link_tag) {
    $atts['style'] = (!empty($atts['style']) ? $atts['style'].';' : '')
      . 'pointer-events: none'
    ;
  }

  return $html->render_raw_tag('a', $atts, $children);
});

$html->disable_link_tag = false;

/**
 * For stylesheets: Filter href attribute similarly to "a" tag, but root and current route
 * are based on views folder. It enqueues in wp_head, unless called afterward.
 */
$html->add_closed_tag('link', function($atts, $children) use ($html) {

  if (isset($atts['href']) && isset($atts['rel']) && $atts['rel']==='stylesheet') {

    $atts['href'] = $html->absolute_or_relative_views_url($atts['href']);
    $html->enqueue_style_file( $atts['href'] );

    return;
  }

  return $html->render_raw_tag('link', $atts, $children);
});

/**
 * Image tag: Filter src attribute
 */
$html->add_closed_tag('img', function($atts, $children) use ($html) {

  if (isset($atts['src'])) {
    $atts['src'] = $html->absolute_or_relative_views_url($atts['src']);
  }

  return $html->render_raw_tag('img', $atts, $children);
});

/**
 * Transform given route to URL, based on site root (absolute) and current route (relative)
 */
$html->absolute_or_relative_url = function($route, $current_route = false, $base_url = false) use ($html) {

  if ($current_route===false) {
    $current_route = $html->get_route();
  }

  if ($base_url===false) {
    $base_url = site_url();
  }

  $base_url = trailingslashit($base_url);

  // Empty route is current URL
  if (empty($route)) return $base_url . $current_route;

  // Page anchor
  if ($route[0]==='#') return $route;

  if ($route[0]==='/') {

    // Relative HTTP protocol "//"
    if (isset($route[1]) && $route[1] === '/') return $route;

    // Absolute route from base
    return untrailingslashit($base_url) . $route;
  }

  // Preserve URL with any protocol, such as http(s), mailto, tel
  if (strpos($route, ':') !== false) {

    /**
     * Telephone number must not use spaces for visual separator, according to
     * HTML specification: https://tools.ietf.org/html/rfc3966#section-5.1.1
     */
    if (substr($route, 0, 4) === 'tel:') {
      return str_replace(' ', '-', $route);
    }

    return $route;
  }

  // Relative route from current
  return trailingslashit($base_url . $current_route) . $route;
};


/**
 * Transform given route to URL, based on views folder root (absolute) and current views folder (relative)
 */
$html->absolute_or_relative_views_url = function($route) use ($html) {

  $views_root_path = $html->get_current_context('views_root_path') ?? '';
  $current_context_path = $html->get_current_context('path') ?? '';

  $current_route = str_replace($views_root_path, '', $current_context_path);
  $base_url = str_replace(ABSPATH, trailingslashit(site_url()), $views_root_path);

  // When outside of views template context
  if (empty($views_root_path)) $base_url = false;

  return $html->absolute_or_relative_url(
    $route,
    $current_route,
    $base_url
  );
};
