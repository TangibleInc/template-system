<?php
/**
 * Force a dataset for HyperDB queries.
 */

/** Sample 1: Simple usage **/
/*
    HyperDB_Force_Dataset::force( 'reporting' );
    // Heavy reporting queries go here
    HyperDB_Force_Dataset::reset();
*/

/** Sample 2: Use with callback **/
/*
    HyperDB_Force_Dataset::force( 'reporting', function() {
        // Heavy reporting queries go here
    } );
*/

/** Sample 3: Force writes to dataset **/
/*
    HyperDB_Force_Dataset::force( 'reporting', function() {
        // Heavy reporting queries go here
        // All writes will also be forced to the reporting dataset
    }, true );
*/

class HyperDB_Force_Dataset {
    /**
     * The dataset to be forced.
     *
     * @var string|null
     */
  public static $dataset = null;

    /**
     * Force dataset on write queries too.
     *
     * @var bool
     */
  public static $force_writes = false;

    /**
     * Initialize
     *
     * @global $wpdb
     * @static $init
     */
  public static function init() {
      global $wpdb;
      static $init = null;

    if ( $init ) {
        return;
    }

      $init = true;

    if ( get_class( $wpdb ) !== 'hyperdb' ) {
        trigger_error( '$wpdb does not look like a hyperdb instance, forcing dataset is defunct', E_USER_WARNING );
        return;
    }

      $wpdb->add_callback( [ __CLASS__, 'dataset' ] );
  }

    /**
     * The hyperdb dataset callback
     *
     * @param string $query The SQL query that needs a database connection.
     * @param object $hyperdb The hyperdb object.
     *
     * @return null|string Forced dataset on null.
     */
  public static function dataset( $query, $hyperdb ) {
    if ( is_null( self::$dataset ) ) {
        return null;
    }

      // Do not force if we have a write query and not forcing writes.
    if ( ! self::$force_writes && $hyperdb->is_write_query( $query ) ) {
        return null;
    }

      return self::$dataset;
  }

    /**
     * Force a HyperDB dataset
     *
     * @param string        $dataset The dataset to force
     * @param callable|null $callback An optional callback to run with a forced dataset
     * @param bool          $force_writes Set to true to force same dataset on write queries
     */
  public static function force( $dataset, $callback = null, $force_writes = false ) {
      self::init();
      self::$dataset      = $dataset;
      self::$force_writes = $force_writes;

    if ( is_callable( $callback ) ) {
      try {
        $callback();
      } finally {
          self::reset();
      }
    }
  }

    /**
     * Reset the dataset
     */
  public static function reset() {
      self::$dataset      = null;
      self::$force_writes = null;
  }
}
