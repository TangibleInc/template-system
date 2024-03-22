<?php
namespace tangible\format;
use tangible\format;

/**
 * Camel case: helloWorld - Used for JS object keys and variable names
 *
 * @param string $string String to convert
 * @return string Converted string
 */
function camel_case($string){
  return lcfirst(format\pascal_case($string));
};

/**
 * Snake case: hello_world - Used for PHP array keys and variable names
 *
 * @param string $string String to convert
 * @return string Converted string
 */
function snake_case($string) {
  return strtolower(
    preg_replace('/\s+/', '_',
      preg_replace(['/([a-z\d])([A-Z])/', '/([^_])([A-Z][a-z])/'], '$1_$2',
        preg_replace('/[^a-zA-Z0-9]+/', ' ', $string)
      )
    )
  );
};

/**
 * Kebab case: hello-world - Used for post slugs and URL routes
 *
 * @param string $string String to convert
 * @return string Converted string
 */
function kebab_case($string) {
  return str_replace('_', '-', format\snake_case($string));
};

/**
 * Pascal case: HelloWorld - Used for PHP and JS classes
 *
 * @param string $string String to convert
 * @return string Converted string
 */
function pascal_case($string) {
  /*
   * This will take any dash or underscore turn it into a space, run ucwords against
   * it so it capitalizes the first letter in all words separated by a space then it
   * turns and deletes all spaces.
   */
  return str_replace(' ', '', ucwords(
    strtolower(preg_replace('/[^a-zA-Z0-9]+/', ' ', $string))
  ));
};


/**
 * Convert keys of an associative array recursively
 *
 * @param array $src Associative array to convert
 * @param callback $fn Conversion function
 * @return array Converted array
 */
function convert_keys($src, $fn, $options = []) {

  $dest = [];
  $skip_fields = @$options['skip_fields'];

  foreach ($src as $key => $value) {
    if ($skip_fields!==null && array_search($key, $skip_fields)!==false) {
      $dest[ $key ] = $value;
      continue;
    }
    $dest[ $fn($key) ] = is_array($value)
      ? format\convert_keys($value, $fn, $options)
      : $value;
  }
  return $dest;
};

/**
 * Convert an associative array's keys to PHP-style keys
 * Typically used on API request (from AJAX or Node.js)
 *
 * @param array $src Associative array to convert
 * @return array Converted array
 */
function js_to_php_keys($src, $options = []) {
  return format\convert_keys($src, __NAMESPACE__ . '\snake_case', $options);
};

/**
 * Convert an associative array's keys to JS-style keys
 * Typically used on API response (to AJAX or Node.js)
 *
 * @param array $src Associative array to convert
 * @return array Converted array
 */
function php_to_js_keys($src, $options = []) {
  return format\convert_keys($src, __NAMESPACE__ . '\camel_case', $options);
};

/**
 * Convert a title to create a slug, replacing whitespace and a few other characters with dashes
 * Typically used to create a post slug or settings key
 *
 * @param array $string String to convert
 * @return array Converted string
 */
function slugify($string) {
  return sanitize_title_with_dashes(remove_accents($string), null, 'save');
};

/**
 * Convert a string (comma-separated list or JSON array) into array of values
 */
function multiple_values($value) {

  if (is_array($value)) return $value;
  if (!is_string($value)) return [$value];

  if (isset($value[0]) && $value[0]==='[') {
    try {
      $values = json_decode($value);
      if (!is_array($values)) $values = [];
      return $values;
    } catch (\Throwable $th) {
      return [];
    }
  }

  $values = array_map('trim', explode(',', $value));

  return $values;
};
