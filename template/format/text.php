<?php

/**
 * Case conversion - camel, snake, kebab, pascal, lower, upper
 */
$html->format_case = function( $content, $options = [] ) {

  if ( ! isset( $options['case'] )) return $content;

  $case = $options['case'];

  switch ( $case ) {
    case 'kebab':
    case 'snake':
      // Snake case: hello_world - Used for PHP array keys and variable names
    $content = strtolower(
        preg_replace('/\s+/', '_',
        preg_replace([ '/([a-z\d])([A-Z])/', '/([^_])([A-Z][a-z])/' ], '$1_$2',
            preg_replace( '/[^a-zA-Z0-9]+/', '', $content )
          )
        )
      );
      if ($case === 'snake') return $content;

      // Kebab case: hello-world - Used for post slugs and URL routes
        return str_replace( '_', '-', $content );
    break;
    case 'camel':
    case 'pascal':
      /**
       * Pascal case: HelloWorld - Used for PHP and JS classes
       *
       * This will take any dash or underscore turn it into a space,
       * run ucwords against it so it capitalizes the first letter in
       * all words separated by a space then it turns and deletes all
       * spaces.
       */
    $content = str_replace(' ', '', ucwords(
        strtolower( preg_replace( '/[^a-zA-Z0-9]+/', ' ', $content ) )
      ));
      if ($case === 'pascal') return $content;
      // Camel case: helloWorld - Used for JS object keys and variable names
        return lcfirst( $content );
    break;
    case 'lower':
        return strtolower( $content );
    case 'upper':
        return strtoupper( $content );
  }

  // Unknown case
  return $content;
};

/**
 * Format length - Trim by characters
 */
$html->format_length = function( $content, $options = [] ) {

  $length = isset( $options['characters'] ) ? (int) $options['characters']
    : ( isset( $options['length'] ) ? (int) $options['length']
      : 120 // Default length
    );

  return mb_substr( $content, 0, $length );
};

/**
 * Format string to slug
 */
$html->format_slug = function( $content, $options = [] ) {
  return sanitize_title_with_dashes( $content, null, 'save' );
};

/**
 * Upper case
 */
$html->format_uppercase = function( $content, $options = [] ) {
  return strtoupper( $content );
};

/**
 * Lower case
 */
$html->format_lowercase = function( $content, $options = [] ) {
  return strtolower( $content );
};

/**
 * Capitalize first letter
 */
$html->format_capital = function( $content, $options = [] ) {
  return ucfirst( $content );
};

/**
 * Capitalize words
 */
$html->format_capital_words = function( $content, $options = [] ) {
  return ucwords( $content );
};

/**
 * Seach and replace
 */
$html->format_replace = function( $content, $options = [] ) {

  // Support multiple replaces
  for ( $i = 1; $i <= 3; $i++ ) {
    $postfix = $i === 1 ? '' : '_' . $i;
    if ( ! isset( $options[ 'replace' . $postfix ] )
      || ! isset( $options[ 'with' . $postfix ] )
    ) break;

    $content = str_replace(
      $options[ 'replace' . $postfix ],
      $options[ 'with' . $postfix ],
      $content
    );
  }

  return $content;
};


/**
 * Encode URL query using rawurlencode()
 *
 * @see https://www.php.net/manual/en/function.rawurlencode.php
 * @see https://stackoverflow.com/questions/996139/urlencode-vs-rawurlencode
 */
$html->format_url_query = function( $content, $options = [] ) {
  return rawurlencode( $content );
};
