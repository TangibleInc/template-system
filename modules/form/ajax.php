<?php
use tangible\ajax;

ajax\add_public_action('tangible_form_handler', function( $request ) use ( $html ) {

  $response = $html->process_form_request( $request );

  if (isset( $response['error'] )) return ajax\error( $response );

  return $response;
});
