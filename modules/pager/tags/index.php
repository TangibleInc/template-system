<?php
/**
 * Pager tags - Gradually replace v1 with more flexible pagination features
 */
namespace tangible\template_system\pager;

use tangible\html;

html\add_closed_tag('PagerButtons', function($atts, $nodes) {
  return html\render_tag('PaginateButtons', $atts, $nodes);
});

html\add_open_tag('PagerFields', function($atts, $nodes) {
  return html\render_tag('PaginateFields', $atts, $nodes);
});

html\add_open_tag('PagerLoading', function($atts, $nodes) {
  return html\render_tag('PaginateLoading', $atts, $nodes);
});
