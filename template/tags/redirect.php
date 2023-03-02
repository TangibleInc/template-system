<?php

$html->redirect_tag = function( $atts ) use ( $html ) {

  if (empty( $atts['to'] )
    || $html->disable_redirect_tag
    || wp_doing_ajax()
    || wp_is_json_request()
  ) return;

  $url = $html->absolute_or_relative_url( $atts['to'] );

  // https://developer.wordpress.org/reference/functions/wp_redirect/
  wp_redirect( $url );
  exit;
};

$html->disable_redirect_tag = false;

return $html->redirect_tag;
