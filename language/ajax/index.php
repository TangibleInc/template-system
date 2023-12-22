<?php

use tangible\ajax;

ajax\add_public_action('tangible_template_render', function( $request ) use ($html) {

  $template = $request['template'];
  $hash     = $request['hash'];
  // Verify hash @see /utils/hash.php
  if ( ! $html->verify_tag_attributes_hash(
    is_array( $template ) && isset( $template['attributes'] )
    ? $template['attributes']
    : $template,
    $hash
  ) ) {
    return ajax\error( [ 'message' => 'Invalid template hash' ] );
  }

  if ( isset( $request['context'] ) && isset( $request['context_hash'] ) ) {

    // variable_types, current_post_id

    $context      = $request['context'];
    $context_hash = $request['context_hash'];

    // Must provide default/empty variable types because JSON en/decode removes them
    $default_variable_types    = $html->get_variable_types_from_template( [] );
    $context['variable_types'] = array_merge(
      $default_variable_types,
      isset( $context['variable_types'] )
        ? $context['variable_types']
        : []
    );

    if ( ! $html->verify_tag_attributes_hash( $context, $context_hash ) ) {
      return ajax\error( [
      'message' => 'Invalid context hash',
      'context' => $context,
      ] );
    }

    if ( isset( $context['variable_types'] ) ) {
      $html->set_variable_types_from_template( $context['variable_types'] );
    }

    if ( ! empty( $context['current_post_id'] ) ) {
      // https://developer.wordpress.org/reference/functions/setup_postdata/
      setup_postdata( $context['current_post_id'] );
    }
  }

  // Allow paginator to set page number
  if ( isset( $request['page'] ) && isset( $template['attributes'] ) ) {
    $template['attributes']['page'] = $request['page'];
  }

  try {
    return $html->render( $template );
  } catch ( \Throwable $th ) {
    return $th->getMessage() . ' in ' . str_replace( ABSPATH, '', $th->getFile() ) . ' on line ' . $th->getLine();
  }
});

ajax\add_public_action('tangible_template_logic_evaluate', function( $request ) use ( $logic ) {
  return $logic->evaluate( $request );
});
