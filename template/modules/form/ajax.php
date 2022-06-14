<?php

$ajax->add_public_action('tangible_form_handler', function($request, $ajax) use ($html) {

  $response = $html->process_form_request($request);

  if (isset($response['error'])) return $ajax->error($response);

  return $response;
});
