<?php

$html->redirect_tag = function($atts) use ($html) {

  if (empty($atts['to'])) return;

  $url = $html->absolute_or_relative_url($atts['to']);

  // https://developer.wordpress.org/reference/functions/wp_redirect/
  wp_redirect($url);
  exit;
};

return $html->redirect_tag;
