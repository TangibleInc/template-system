<?php
use tangible\format;
/**
 * Case conversion - camel, snake, kebab, pascal, lower, upper
 * 
 * TODO: Convert to use format utilities in /framework/format
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
            preg_replace( '/[^a-zA-Z0-9]+/', ' ', $content )
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
 * Format string to slug
 */
$html->format_slug = function( $content, $options = [] ) {
  return format\slugify( $content );
};

/**
 * Upper case
 */
$html->format_uppercase = function( $content, $options = [] ) {
  return mb_strtoupper( $content );
};

/**
 * Lower case
 */
$html->format_lowercase = function( $content, $options = [] ) {
  return mb_strtolower( $content );
};

/**
 * Capitalize first letter
 */
$html->format_capital = function( $content, $options = [] ) use ($html) {
  // return ucfirst( $content );
  return $html->format_uppercase(
    mb_substr($content, 0, 1)
  ) . mb_substr($content, 1);
};

/**
 * Capitalize words
 */
$html->format_capital_words = function( $content, $options = [] ) use ($html) {
  // return ucwords( $content );
  return implode(' ',
    array_map(
      $html->format_capital,
      explode(' ', $content)
    )
  );
};
