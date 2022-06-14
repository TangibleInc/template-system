<?php

$html->current_form_attributes = [];
$html->processing_form_request = false;

$html->add_open_tag('Form', function($atts, $nodes) use ($html) {

  $form_id = isset($atts['id'])
    ? $atts['id']
    : 'tangible_form_' . uniqid()
  ;

  // Build <form> tag

  $form_tag_atts = [
    'keys' => [],
    'id'   => $form_id
  ];

  unset($atts['id']);
  unset($atts['keys']);

  if (isset($atts['class'])) {
    $form_tag_atts['class'] = $atts['class'];
    unset($atts['class']);
  }

  /**
   * Expand redirect URLs
   * @see ./process.php
   */
  if (isset($atts['redirect-on-success'])) {
    $atts['redirect-on-success'] = $html->absolute_or_relative_url(
      $atts['redirect-on-success']
    );
  }
  if (isset($atts['redirect-on-error'])) {
    $atts['redirect-on-error'] = $html->absolute_or_relative_url(
      $atts['redirect-on-error']
    );
  }

  // Other properties on $atts are passed as form config

  /**
   * Location - Template file path or post ID
   *
   * Form request handler on server side uses location to get form action
   * attributes from the template itself. This avoids having to pass them
   * to frontend and back.
   *
   * A hash is created from the location, so the form handler can verify that
   * action attributes have not been changed in the request.
   *
   * Inline template without post or file cannot contain a form, because there's
   * no way to locate them from the form handler.
   */

  $location = [];

  if (!empty($html->current_form_template_id)) {

    $location['template_id'] = $html->current_form_template_id;

  } elseif (!empty($template_file = $html->get_current_context('file'))) {

    $template_folder = $html->get_current_context('path');
    $views_root_path = $html->get_variable_type('path', 'views');

    $location['template_path'] = str_replace(
      $views_root_path,
      '',
      $template_folder . '/' . $template_file
    );

  } else {
    // No template location
    return;
  }

  $html->current_form_attributes = $atts;

  // Render content

  $content = $html->render([
    [ 'tag' => 'form',
      'attributes' => $form_tag_atts,
      'children' => $nodes
    ]
  ], [
    'local_tags' => [
      'Success' => [ 'callback' => $html->form_success_tag ],
      'Error'   => [ 'callback' => $html->form_error_tag ],
      'Mail'    => [ 'callback' => $html->form_mail_tag ],
      'BeforeSubmit' => [ 'callback' => $html->form_before_submit_tag ],
    ]
  ]);

  // Return to form handler
  if ($html->processing_form_request) return;

  // Form data for frontend
  $html->enqueue_form([
    'id'       => $form_id,
    'location' => $location,
    // @see /utils/hash.php
    'hash'     => $html->create_tag_attributes_hash( $location ),
  ]);

  return $content;
});


/**
 * Success
 */
$html->form_success_tag = function($atts, $nodes) use ($html) {

  $html->current_form_attributes['success'] = $nodes;

  return $html->render([
    [ 'tag' => 'div',
      'attributes' => [
        'class' => 'tangible-form-success-message',
        'style' => 'display: none',
      ],
      'children' => []
    ]
  ]);
};

/**
 * Error
 */
$html->form_error_tag = function($atts, $nodes) use ($html) {

  $html->current_form_attributes['error'] = $nodes;

  return $html->render([
    [ 'tag' => 'div',
      'attributes' => [
        'class' => 'tangible-form-error-message',
        'style' => 'display: none',
      ],
      'children' => []
    ]
  ]);
};

/**
 * Mail
 */
$html->form_mail_tag = function($atts, $nodes) use ($html) {

  if (!isset($html->current_form_attributes['mail'])) {
    $html->current_form_attributes['mail'] = [];
  }

  $html->current_form_attributes['mail'] []= $nodes;
};

/**
 * Before submit
 *
 * This tag runs before form submit on server side. It lets the user create
 * derived fields like:
 *
 * ```html
 * <BeforeSubmit>
 *   <Set form=field_name>..<Get form=another_field>..</Set>
 * </BeforeSubmit>
 * ```
 *
 * @see ./process.php
 */
$html->form_before_submit_tag = function($atts, $nodes) use ($html) {
  $html->current_form_attributes['before_submit'] = $nodes;
};
