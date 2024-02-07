<?php
use tangible\format;

/**
 * Send mail
 */
$html->form_actions['mail'] = function($attributes, $data) use ($html) {

  if (!isset($attributes['template'])) {
    return [ 'error' => 'Mail template required' ];
  }

  // Mail template
  $template = $attributes['template'];

  /**
   * Template can set mail variables: `<Set mail=to><Site admin_email></Set>`
   * @see /tags/get-set/register.php
   */
  $mail_variables = [];

  $html->register_variable_type('mail', [
    'set' => function($name, $atts, $content) use ($html, &$mail_variables) {
      $mail_variables[ $name ] = $html->render($content);
    },
    'get' => function($name, $atts = []) use ($mail_variables) {
      if (isset($mail_variables[ $name ])) {
        return $mail_variables[ $name ];
      }
    },
  ]);

  /**
   * Content - After render, mail variables are set
   */
  $content = $html->render($template);


  $headers = [];
  $mail_type = isset($mail_variables['type']) ? $mail_variables['type'] : 'html';

  if ($mail_type==='html') {

    $headers []= 'Content-Type: text/html; charset=UTF-8';

  } else {
    // Plain text
    $content = $html->remove_indentation_from_plain_text_mail($content);
  }

  $title = isset($mail_variables['title'])
    ? $mail_variables['title']
    : 'Message from ' . get_option('blogname')
  ;

  $from = isset($mail_variables['from'])
    ? (isset($mail_variables['from_name'])
      ? $mail_variables['from_name'].' <'.$mail_variables['from'].'>'
      : $mail_variables['from']
    )
    : get_option('blogname').' <'.get_option('admin_email').'>';
  ;

  $headers []= 'From: '.$from;

  $to = isset($mail_variables['to'])
    ? $mail_variables['to']
    : get_option('admin_email')
  ;

  if (isset($mail_variables['cc'])) {
    // Comma-separated list
    $ccs = format\multiple_values($mail_variables['cc']);
    foreach ($ccs as $cc) {
      $headers []= 'Cc: '.trim($cc);
    }
  }

  if (isset($mail_variables['reply'])) {
    $headers []= isset($mail_variables['reply_name'])
      ? "Reply-To: {$mail_variables['reply_name']} <{$mail_variables['reply']}>"
      : "Reply-To: <{$mail_variables['reply']}>"
    ;
  }

  $success = wp_mail( $to, $title, $content, $headers );

  // tangible\log('Mail', [
  //   'to' => $to, 'title' => $title, 'content' => $content, 'headers' => $headers,
  //   'success' => $success ? true : false
  // ]);

  return $success
    ? [ 'success' => 'Sent mail' ]
    : [ 'error' => 'Failed to send mail' ]
  ;
};


/**
 * Remove indentation from plain-text mail based on first line's indent level.
 * It lets the user indent the content of Mail tag, like:
 *
 * ```html
 * <Form>
 *   <Mail>
 *     Hello, <Get form=name />!
 *     ..Rest of message..
 *   </Mail>
 * </Form>
 * ```
 */
$html->remove_indentation_from_plain_text_mail = function($content) {

  $trimmed_lines = [];
  $lines = explode("\n", str_replace("\r\n","\n", $content));
  $started = false;
  $indent  = 0;

  foreach ($lines as $line) {
    $trimmed_line = ltrim($line);
    $trimmed_line_length = strlen($trimmed_line);

    // Ignore all empty lines at the start
    if (!$started && $trimmed_line_length===0) continue;

    // First line determines indent level
    if (!$started) {
      $started = true;
      $indent = strlen($line) - $trimmed_line_length;
      $trimmed_lines []= $trimmed_line;
      continue;
    }

    $current_indent = strlen($line) - $trimmed_line_length;
    if ($current_indent > $indent) {
      // Restore any additional indent
      $trimmed_line = str_repeat(' ', $current_indent - $indent) . $trimmed_line;
    }

    $trimmed_lines []= $trimmed_line;
  }

  $content = implode("\n", $trimmed_lines);

  return $content;
};
