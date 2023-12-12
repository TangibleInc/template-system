<?php

namespace Tangible;

use Tangible\Carbon\Carbon;
use Tangible\Carbon\CarbonTimeZone;

class Date extends Carbon {

  public static $default_timezone;
  public static $default_timezone_string;

  public static $current_timezone;
  public static $current_timezone_string;


  // Locale support

  // Functions to call instead of format, createFromFormat, parse
  protected static $formatFunction = 'translatedFormat';
  protected static $createFromFormatFunction = 'createFromFormatWithCurrentLocale';
  protected static $parseFunction = 'parseWithCurrentLocale';

  public static function parseWithCurrentLocale($time = null, $timezone = null) {
    if (is_string($time)) {
      $time = static::translateTimeString($time, static::getLocale(), 'en');
    }

    if (is_null($timezone)) $timezone = self::getCurrentTimezone();

    return parent::rawParse($time, $timezone);
  }

  public static function createFromFormatWithCurrentLocale($format, $time = null, $timezone = null) {
    if (is_string($time)) {
      $time = static::translateTimeString($time, static::getLocale(), 'en');
    }

    if (is_null($timezone)) $timezone = self::getCurrentTimezone();

    return parent::rawCreateFromFormat($format, $time, $timezone);
  }

  // Get the language portion of the locale
  public static function getLanguageFromLocale($locale) {
    $parts = explode('_', str_replace('-', '_', $locale));
    return $parts[0];
  }


  // Timezone support

  // For the following static functions, define timezone in site settings as default

  public static function createFromTimestamp($timestamp, $timezone = null) {
    if (is_null($timezone)) $timezone = self::getCurrentTimezone();
    return parent::createFromTimestamp($timestamp, $timezone);
  }

  public static function createFromTimeString($string, $timezone = null) {
    if (is_null($timezone)) $timezone = self::getCurrentTimezone();
    return parent::createFromTimeString($string, $timezone);
  }

  public static function createFromDate($year = null, $month = null, $day = null, $timezone = null) {
    if (is_null($timezone)) $timezone = self::getCurrentTimezone();
    return parent::createFromDate($year, $month, $day, $timezone);
  }

  public static function createFromTime($year = null, $month = null, $day = null, $timezone = null) {
    if (is_null($timezone)) $timezone = self::getCurrentTimezone();
    return parent::createFromTime($hour, $minute, $second, $timezone);
  }

  public static function create($year = 0, $month = 1, $day = 1, $hour = 0, $minute = 0, $second = 0, $timezone = null) {
    if (is_null($timezone)) $timezone = self::getCurrentTimezone();
    return parent::create($year, $month, $day, $hour, $minute, $second, $timezone);
  }

  public function format($format, $timezone = null) {
    if (is_null($timezone)) $timezone = self::getCurrentTimezone();
    return parent::format($format, $timezone);
  }

  public static function now($timezone = null) {
    if (is_null($timezone)) $timezone = self::getCurrentTimezone();
    return parent::now( $timezone );
  }

  // Timezone utility methods

  public static function getDefaultTimezone() {
    return self::$default_timezone ? self::$default_timezone
      : (self::$default_timezone = new CarbonTimeZone( // Was wp_timezone()
        self::getDefaultTimezoneString()
      ))
    ;
  }

  public static function getDefaultTimezoneString() {
    return self::$default_timezone_string ? self::$default_timezone_string
      : (self::$default_timezone_string = wp_timezone_string())
    ;
  }

  public static function getCurrentTimezone() {
    return self::$current_timezone ? self::$current_timezone
      : (self::$current_timezone = self::getDefaultTimezone())
    ;
  }

  public static function getCurrentTimezoneString() {
    return self::$current_timezone_string ? self::$current_timezone_string
      : (self::$current_timezone_string = self::getDefaultTimezoneString())
    ;
  }

  public static function setCurrentTimezone($timezone_string) {

    /**
     * DateTimeZone and CarbonTimeZone can throw fatal error if timezone string
     * is not valid. Change to only emit warning notice.
     *
     * @see https://www.php.net/manual/en/datetimezone.construct.php
     */

    try {

      $current_timezone = new CarbonTimeZone( $timezone_string ); // Was DateTimeZone()

    } catch (\Throwable $th) {
      trigger_error($th->getMessage(), E_USER_WARNING);
      return;
    }

    self::$current_timezone = $current_timezone;
    self::$current_timezone_string = self::$current_timezone->getName();
  }

  public static function restoreDefaultTimezone() {
    self::$current_timezone = self::getDefaultTimezone();
    self::$current_timezone_string = self::getDefaultTimezoneString();
  }

}
