<?php
namespace tangible;

class DateCreator {

  function __construct() {

    $date = $this;

    if (!class_exists('Tangible\\Date')) {
      require_once __DIR__ . '/Carbon/autoload.php';
      require_once __DIR__ . '/Date.php';
    }
  }

  /**
   * Dynamic methods to static functions on Tangible\Date
   *
   * - setLocale, getLocale, parse, now, create, ..
   */
  function __call( $method = '', $args = [] ) {
    return call_user_func_array("Tangible\\Date::$method", $args);
  }

  // When object called directly
  function __invoke($date_string = '') {
    if (is_numeric($date_string)) {
      return $this->__call('createFromTimestamp', [(int) $date_string]);
    }
    return $this->__call('parse', func_get_args());
  }

  // Aliases

  // Return $this for chaining
  function setLocale() {
    $this->__call('setLocale', func_get_args());
    return $this;
  }

  function create() {

    $args = func_get_args();
    $args_count = count($args);

    /**
     * https://carbon.nesbot.com/docs/
     *
     * createFromTimestamp($timestamp, $tz)
     * createFromTimeString("$hour:$minute:$second", $tz)
     * createFromDate($year, $month, $day, $tz)
     * createFromTime($hour, $minute, $second, $tz)
     * create($year, $month, $day, $hour, $minute, $second, $tz)
     */

    $method = $args_count <= 2
      ? (is_numeric($args[0]) ? 'createFromTimestamp' : 'createFromTimeString')
      : ($args_count <= 4 ? 'createFromDate' : 'create')
    ;

    return $this->__call($method, $args);
  }

  function fromDate() {
    return $this->__call('createFromDate', func_get_args());
  }
  function fromTime() {
    return $this->__call('createFromTime', func_get_args());
  }
  function fromTimestamp() {
    return $this->__call('createFromTimestamp', func_get_args());
  }
  function fromFormat() {
    return $this->__call('createFromFormat', func_get_args());
  }
}
