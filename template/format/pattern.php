<?php


/**
 * Match regular expression in string to list of values
 */
$html->format_match_pattern = function( $content, $options = [] ) {

  $match = $options['match_pattern'] ?? '';

  if (is_string( $content )) {
    preg_match_all($match, $content, $matches);
    if ($matches) {
      $matches = array_shift($matches) ?? [];
      return $matches;
    }
  }
  return [];
};

/**
 * Seach and replace
 */
$html->format_replace = function( $content, $options = [] ) use ($html) {

  $is_pattern = $options['pattern'] ?? false;

  // Support multiple replaces
  for ( $i = 1; $i <= 3; $i++ ) {

    $postfix = $i === 1 ? '' : '_' . $i;

    $replace_key = ($is_pattern ? 'replace_pattern' : 'replace') . $postfix;
    $with_key    = 'with' . $postfix;

    if ( ! isset( $options[ $replace_key ] )
      || ! isset( $options[ $with_key ] )
    ) continue; // Support mixing replace and replace_pattern

    /**
     * Support replace/with string that includes HTML
     * 
     * The `with_*` attributes are specifically skipped from rendering in
     * tag definition property `skip_render_keys`. See ./tag.php
     * 
     * This whole feature of passing HTML in an HTML tag attribute using {} is
     * questionable. A better solution may need to be developed.
     * 
     * @see /template/tags/format.php
     * @see /template/html/tag.php, attributes.php
     */
    foreach ( [ $replace_key, $with_key ] as $key ) {

      // Skip pattern
      if ($key===$replace_key && $is_pattern) continue;

      if (strpos( $options[ $key ], '{' ) === false
        || !$html->should_render_attribute($key, $options[ $key ])
      ) continue;
      $options[ $key ] = $html->render(
        str_replace(
          [ '<<', '>>' ], [ '{', '}' ], // Escape using {{ and }}
          str_replace( [ '{', '}' ], [ '<', '>' ], $options[ $key ] )
        )
      );
    }

    if (!$is_pattern) {
      $content = str_replace(
        $options[ $replace_key ],
        $options[ $with_key ],
        $content
      );
      continue;
    }

    try {
      $new_content = preg_replace(
        $options[ $replace_key ],
        $options[ $with_key ],
        $content,
        $options[ 'limit' . $postfix ] ?? -1
      );
      $content = $new_content;
    } catch (\Throwable $th) {
      /**
       * preg_replace() can throw an error for invalid regex pattern, such as
       * when encountering an unknown modifier. Convert it into a warning.
       */
       trigger_error($th->getMessage(), E_USER_NOTICE);
    }
  }

  return $content;
};

/**
 * Seach and replace regular expression pattern
 */
$html->format_replace_pattern = function( $content, $options = [] ) use ($html) {
  return $html->format_replace( $content, $options+[
    'pattern' => true
  ] );
};
