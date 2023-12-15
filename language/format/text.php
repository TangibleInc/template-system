<?php

// url_query, trim, prefix, suffix, start_slash, end_slash

/**
 * Encode URL query using rawurlencode()
 *
 * @see https://www.php.net/manual/en/function.rawurlencode.php
 * @see https://stackoverflow.com/questions/996139/urlencode-vs-rawurlencode
 */
$html->format_url_query = function( $content, $options = [] ) {
  return rawurlencode( $content );
};

/**
 * Trim and trim left/right
 */
$html->format_trim = function( $content, $options = [] ) {
  $has_keys = !empty($options['keys']);
  foreach ([
    ['trim', 'trim'],
    ['trim_left', 'ltrim'],
    ['trim_right', 'rtrim'],
  ] as [$key, $callback]) {

    if (!isset($options[$key])) {
      if ($has_keys && in_array($key, $options['keys'])) {
        $options[ $key ] = true;
      } else {
        continue;
      }
    }

    $remove = ($options[$key]===true || $options[$key]==='true')
      ? null // Default: white space
      : $options[$key]
    ;

    $content = is_null($remove)
      ? $callback( $content ) // Don't pass null for second argument
      : $callback( $content, $remove )
    ;
  }

  return $content;
};

$html->format_trim_left = $html->format_trim_right = $html->format_trim;

/**
 * Prefix and suffix
 */
$html->format_prefix = function( $content, $options = [] ) {
  if (isset($options['prefix'])) {
    $content = $options['prefix'] . $content;
  }
  if (isset($options['suffix'])) {
    $content .= $options['suffix'];
  }
  return $content;
};

$html->format_suffix = $html->format_prefix;

/**
 * Start slash
 */
$html->format_start_slash = function( $content, $options = [] ) use ($html) {

  // Trim first to prevent duplicate slashes
  $content = ltrim( $content, '/' );

  if (!(isset($options['start_slash']) && $options['start_slash']==='false')) {
    $content = '/' . $content;
  }

  if ((!empty($options['keys']) &&  in_array('end_slash', $options['keys']))
    || isset($options['end_slash'])
  ) {
    // Prevent infinite loop by not passing start_slash
    unset($options['start_slash']);
    unset($options['keys']);
    $content = $html->format_end_slash($content, $options);
  }

  return $content;
};

/**
 * End slash
 *
 * Not using trailingslashit() because it unexpectedly removes backslash
 * @see https://developer.wordpress.org/reference/functions/trailingslashit/
 */
$html->format_end_slash = function( $content, $options = [] ) use ($html) {

  // Trim first to prevent duplicate slashes
  $content = rtrim( $content, '/' );

  if (!(isset($options['end_slash']) && $options['end_slash']==='false')) {
    $content = $content . '/';
  }

  if ((!empty($options['keys']) && in_array('start_slash', $options['keys']))
    || isset($options['start_slash'])
  ) {
    // Prevent infinite loop by not passing $options with end_slash
    unset($options['end_slash']);
    unset($options['keys']);
    $content = $html->format_start_slash($content, $options);
  }

  return $content;
};
