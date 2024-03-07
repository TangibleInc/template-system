<?php

/**
 * Process form request
 *
 * type Result {
 *   success?: string,  // Rendered success template, if any
 *   error?: string,    // Error message or rendered error template, if any
 *   [key: string]: any // Other properties like "id"
 * }
 */
$html->process_form_request = function($request) use ($html) {

  foreach ([
    'location',
    'hash',
    'data'
  ] as $key) {
    if (!isset($request[$key])) return [ 'error' => "Property \"{$key}\" is required" ];
    $$key = $request[$key];
  }

  // Validate location hash - see ./tag.php and /utils/hash.php
  if (!$html->verify_tag_attributes_hash($location, $hash)) {
    return [ 'error' => 'Invalid form location' ];
  }

  // Get form action attributes from template location

  $html->processing_form_request = true;

  if (isset($location['template_id'])) {

    $post = get_post( $location['template_id'] );

    if (!empty($post)) {
      $html->render_with_catch_exit( $post->post_content );
    }

  } elseif (isset($location['template_path'])) {

    // Prevent climbing up
    $file_path = str_replace('..', '', $location['template_path']);

    $html->load_file( $file_path );
  }

  $html->processing_form_request = false;

  $attributes = $html->current_form_attributes;

  /**
   * Pass submitted form data as form variables: `<Get form=field_name />`
   * @see /tags/get-set/register.php
   */
  $form_variables = &$data;

  $html->register_variable_type('form', [
    'set' => function($name, $atts, $content) use ($html, &$form_variables) {
      $form_variables[ $name ] = $html->render($content);
    },
    'get' => function($name, $atts = []) use (&$form_variables) {
      if (isset($form_variables[ $name ])) {
        return wp_strip_all_tags($form_variables[ $name ]);
      }
    },
  ]);

  // Before submit template can set derived fields as form vairables
  if ($html->current_form_attributes['before_submit']) {
    $html->render(
      $html->current_form_attributes['before_submit']
    );
  }

  // Call form action

  $result = $html->form_action($attributes, $data);

  // Form action must return associative array
  if (!is_array($result)) $result = [];

  /**
   * Pass result as variable type "result" to success/error templates
   * On error, this includes property "error".
   */
  $html->register_variable_type('result', [
    'set' => function() {},
    'get' => function($name, $atts = []) use (&$result) {
      if (isset($result[ $name ])) {
        return $result[ $name ];
      }
    },
  ]);


  if (isset($result['error'])) {

    // Error

    if (!empty($html->current_form_attributes['error'])) {

      // Pass original error message for frontend debug purpose
      $result['original_error'] = $result['error'];

      $result['error'] = $html->render(
        $html->current_form_attributes['error']
      );
    }

    if (!empty($html->current_form_attributes['redirect-on-error'])) {
      $result['redirect'] = $html->current_form_attributes['redirect-on-error'];
    }

  } else {

    // Success

    if (!empty($html->current_form_attributes['success'])) {
      $result['success'] = $html->render(
        $html->current_form_attributes['success']
      );
    }

    if (!empty($html->current_form_attributes['redirect-on-success'])) {
      $result['redirect'] = $html->current_form_attributes['redirect-on-success'];
    }
  }

  return $result;
};
