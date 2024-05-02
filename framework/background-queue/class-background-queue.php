<?php
namespace tangible;

/**
 * Background queue
 * Originally based on https://github.com/A5hleyRich/wp-background-processing
 */
class BackgroundQueue {

  public $prefix = 'tangible_background_queue';
  public $action = 'action_name';

  public $identifier;

  public $cron_hook_identifier;
  public $cron_interval_identifier;

  public $items = [];
  public $callbacks = [];

  public $start_time = 0;

  public $process_max_time = 20;
  public $lock_process_timeout = 60;
  public $cron_interval = 5 * MINUTE_IN_SECONDS;

  public function __invoke( $items ) {
    return $this->add_items( $items );
  }

  /**
   * Initiate new background process
   */
  function __construct($config) {

    $this->action = isset($config['name']) ? $config['name'] : $this->action;
    $this->items = isset($config['items']) ? $config['items'] : [];

    // Callbacks

    foreach ([
      'task',
      'complete',
      'error',
      'cancel'
    ] as $key) {
      $this->callbacks[ $key ] = isset($config[ $key ])
        ? $config[ $key ]
        : function() {} // Ensure that it can be called
      ;
    }

    // Timeout and interval options

    foreach ([
      'process_max_time',
      'lock_process_timeout',
      'cron_interval'
    ] as $key) {
      if (isset($config[ $key ])) $this->$key = $config[ $key ];
    }

    // Ensure process timeout greater than batch timeout
    if ( $this->lock_process_timeout <= $this->process_max_time ) {
      $this->lock_process_timeout = $this->process_max_time + 40;
    }

    // Actions and filters

    $this->identifier = $this->prefix . '_' . $this->action;

    add_action( 'wp_ajax_' . $this->identifier, [$this, 'maybe_handle' ] );
    add_action( 'wp_ajax_nopriv_' . $this->identifier, [$this, 'maybe_handle'] );

    $this->cron_hook_identifier     = $this->identifier . '_cron';
    $this->cron_interval_identifier = $this->identifier . '_cron_interval';

    add_action( $this->cron_hook_identifier, [$this, 'handle_cron_healthcheck'] );
    add_filter( 'cron_schedules', [$this, 'schedule_cron_healthcheck'] );

    return $this;
  }

  /**
   * Add items
   *
   * Note that this calls `dispatch`, which makes an internal AJAX request.
   * For adding items repeatedly or frequently, use `scheule_items` instead.
   */
  public function add_items( $items ) {
    $this->items = $items;
    return $this->save()->dispatch();
  }

  /**
   * Schedule items
   *
   * The dispatch method must be called manually after scheduling items.
   */
  public function schedule_items( $items ) {
    $this->items = $items;
    return $this->save();
  }

  /**
   * Schedule item
   *
   * Shortcut for adding single item per batch
   */
  public function schedule_item( $item ) {
    $this->items = [$item];
    return $this->save();
  }

  /**
   * Dispatch
   *
   * @access public
   * @return array|WP_Error
   */
  public function dispatch() {

    // Schedule the cron healthcheck.
    $this->schedule_event();

    // Perform remote post.
    $url  = add_query_arg( $this->get_query_args(), $this->get_query_url() );
    $args = $this->get_post_args();

    return wp_remote_post( esc_url_raw( $url ), $args );
  }

  /**
   * Get query args
   *
   * @return array
   */
  public function get_query_args() {
    if ( property_exists( $this, 'query_args' ) ) {
      return $this->query_args;
    }

    return [
      'action' => $this->identifier,
      'nonce'  => wp_create_nonce( $this->identifier ),
    ];
  }

  /**
   * Get query URL
   *
   * @return string
   */
  public function get_query_url() {
    if ( property_exists( $this, 'query_url' ) ) {
      return $this->query_url;
    }

    return admin_url( 'admin-ajax.php' );
  }

  /**
   * Get post args
   *
   * @return array
   */
  public function get_post_args() {
    if ( property_exists( $this, 'post_args' ) ) {
      return $this->post_args;
    }

    return [
      'timeout'   => 0.01,
      'blocking'  => false,
      'body'      => $this->items,
      'cookies'   => $_COOKIE,
      'sslverify' => apply_filters( 'https_local_ssl_verify', false ),
    ];
  }

  /**
   * Push to queue
   *
   * @param mixed $item Data.
   *
   * @return $this
   */
  public function push_to_queue( $item ) {
    $this->items[] = $item;

    return $this;
  }

  /**
   * Save queue
   *
   * @return $this
   */
  public function save() {

    $key = $this->generate_key();

    if ( ! empty( $this->items ) ) {
      update_site_option( $key, $this->items );
    }

    return $this;
  }

  /**
   * Update queue
   *
   * @param string $key Key.
   * @param array  $items Data.
   *
   * @return $this
   */
  public function update( $key, $items ) {
    if ( ! empty( $items ) ) {
      update_site_option( $key, $items );
    }

    return $this;
  }

  /**
   * Delete queue
   *
   * @param string $key Key.
   *
   * @return $this
   */
  public function delete( $key ) {
    delete_site_option( $key );

    return $this;
  }

  /**
   * Generate key
   *
   * Generates a unique key based on microtime. Queue items are
   * given a unique key so that they can be merged upon save.
   *
   * @param int $length Length.
   *
   * @return string
   */
  public function generate_key( $length = 64 ) {
    $unique  = md5( microtime() . rand() );
    $prepend = $this->identifier . '_batch_';

    return substr( $prepend . $unique, 0, $length );
  }

  /**
   * Maybe process queue
   *
   * Checks whether data exists within the queue and that
   * the process is not already running.
   */
  public function maybe_handle() {

    // Don't lock up other requests while processing
    session_write_close();

    if ( $this->is_process_running() || $this->is_queue_empty() ) {
      wp_die();
    }

    check_ajax_referer( $this->identifier, 'nonce' );
    $this->handle();
    wp_die();
  }

  /**
   * Is queue empty
   *
   * @return bool
   */
  public function is_queue_empty() {
    return ( $this->get_batch_count() > 0 ) ? false : true;
  }

  /**
   * Get batch count
   *
   * @return int
   */
  public function get_batch_count() {

    global $wpdb;

    $table  = $wpdb->options;
    $column = 'option_name';

    if ( is_multisite() ) {
      $table  = $wpdb->sitemeta;
      $column = 'meta_key';
    }

    $key = $wpdb->esc_like( $this->identifier . '_batch_' ) . '%';

    $count = $wpdb->get_var( $wpdb->prepare( "
      SELECT COUNT(*)
      FROM {$table}
      WHERE {$column} LIKE %s
    ", $key ) );

    return $count;
  }

  /**
   * Is process running
   *
   * Check whether the current process is already running
   * in a background process.
   */
  public function is_process_running() {
    if ( get_site_transient( $this->identifier . '_process_lock' ) ) {
      // Process already running.
      return true;
    }
    return false;
  }

  /**
   * Lock process
   *
   * Lock the process so that multiple instances can't run simultaneously.
   * Override if applicable, but the duration should be greater than that
   * defined in the time_exceeded() method.
   */
  public function lock_process() {

    $this->start_time = time(); // Set start time of current process.

    $lock_duration = apply_filters( $this->identifier . '_lock_process_timeout', $this->lock_process_timeout );

    set_site_transient( $this->identifier . '_process_lock', microtime(), $lock_duration );
  }

  /**
   * Unlock process
   *
   * Unlock the process so that other instances can spawn.
   *
   * @return $this
   */
  public function unlock_process() {
    delete_site_transient( $this->identifier . '_process_lock' );

    return $this;
  }

  /**
   * Get first batch from the queue
   *
   * @return stdClass Batch instance
   */
  public function get_batch() {
    global $wpdb;

    $table        = $wpdb->options;
    $column       = 'option_name';
    $key_column   = 'option_id';
    $value_column = 'option_value';

    if ( is_multisite() ) {
      $table        = $wpdb->sitemeta;
      $column       = 'meta_key';
      $key_column   = 'meta_id';
      $value_column = 'meta_value';
    }

    $key = $wpdb->esc_like( $this->identifier . '_batch_' ) . '%';

    $query = $wpdb->get_row( $wpdb->prepare( "
      SELECT *
      FROM {$table}
      WHERE {$column} LIKE %s
      ORDER BY {$key_column} ASC
      LIMIT 1
    ", $key ) );

    $batch       = new \stdClass();
    $batch->key  = $query->$column;
    $batch->items = maybe_unserialize( $query->$value_column );

    return $batch;
  }

  /**
   * Get unfinished batches
   *
   * @return stdClass[] Batch instances
   */
  public function get_batches() {
    global $wpdb;

    $table        = $wpdb->options;
    $column       = 'option_name';
    $key_column   = 'option_id';
    $value_column = 'option_value';

    if ( is_multisite() ) {
      $table        = $wpdb->sitemeta;
      $column       = 'meta_key';
      $key_column   = 'meta_id';
      $value_column = 'meta_value';
    }

    $key = $wpdb->esc_like( $this->identifier . '_batch_' ) . '%';

    $results = $wpdb->get_results( $wpdb->prepare( "
      SELECT *
      FROM {$table}
      WHERE {$column} LIKE %s
      ORDER BY {$key_column} ASC
    ", $key ) );

    $batches = [];

    foreach ($results as $key => $result) {

      $batch       = new \stdClass();
      $batch->key  = $result->$column;
      $batch->items = maybe_unserialize( $result->$value_column );

      $batches []= $batch;
    }

    return $batches;
  }


  /**
   * Handle
   *
   * Pass each queue item to the task handler, while remaining
   * within server memory and time limit constraints.
   */
  public function handle() {

    $this->lock_process();

    do {

      $batch = $this->get_batch();

      foreach ( $batch->items as $key => $value ) {

        try {

          $task = $this->task( $value );

          if ( !empty($task) ) {
            $batch->items[ $key ] = $task;
          } else {
            unset( $batch->items[ $key ] );
          }

        } catch (\Throwable $e) {

          // If a task throws error, cancel whole queue

          unset( $batch->items[ $key ] );

          $this->cancel_process( true );
          $this->callbacks['error']( $e );

          wp_die();
          return;
        }

        if ( $this->time_exceeded() || $this->memory_exceeded() ) {
          // Batch limits reached.
          break;
        }
      }

      // Update or delete current batch.
      if ( ! empty( $batch->items ) ) {
        $this->update( $batch->key, $batch->items );
      } else {
        $this->delete( $batch->key );
      }

    } while ( ! $this->time_exceeded() && ! $this->memory_exceeded() && ! $this->is_queue_empty() );

    $this->unlock_process();

    // Start next batch or complete process.
    if ( ! $this->is_queue_empty() ) {
      $this->dispatch();
    } else {
      $this->complete();
    }

    wp_die();
  }

  /**
   * Cancel Process
   *
   * Stop processing queue items, clear cronjob and delete batches.
   */
  public function cancel_process( $internal = false ) {

    if ( ! $this->is_queue_empty() ) {

      // Ensure no more task handlers are called
      if ( ! $internal ) $this->lock_process();

      $batches = $this->get_batches();

      foreach ($batches as $index => $batch) {
        $this->delete( $batch->key );
      }
    }

    // Ensure that queue can resumed
    $this->unlock_process();

    wp_clear_scheduled_hook( $this->cron_hook_identifier );

    if ( ! $internal ) {
      $this->callbacks['cancel']();
    }
  }

  /**
   * Memory exceeded
   *
   * Ensures the batch process never exceeds 90%
   * of the maximum WordPress memory.
   *
   * @return bool
   */
  public function memory_exceeded() {
    $memory_limit   = $this->get_memory_limit() * 0.9; // 90% of max memory
    $current_memory = memory_get_usage( true );
    $return         = false;

    if ( $current_memory >= $memory_limit ) {
      $return = true;
    }

    return apply_filters( $this->identifier . '_memory_exceeded', $return );
  }

  /**
   * Get memory limit
   *
   * @return int
   */
  public function get_memory_limit() {
    if ( function_exists( 'ini_get' ) ) {
      $memory_limit = ini_get( 'memory_limit' );
    } else {
      // Sensible default.
      $memory_limit = '128M';
    }

    if ( ! $memory_limit || -1 === intval( $memory_limit ) ) {
      // Unlimited, set to 32GB.
      $memory_limit = '32000M';
    }

    return intval( $memory_limit ) * 1024 * 1024;
  }

  /**
   * Time exceeded.
   *
   * Ensures the batch never exceeds a sensible time limit.
   * A timeout limit of 30s is common on shared hosting.
   *
   * @return bool
   */
  public function time_exceeded() {

    $finish = $this->start_time
      + apply_filters( $this->identifier . '_process_max_time', $this->process_max_time )
    ;
    $return = false;

    if ( time() >= $finish ) {
      $return = true;
    }

    return apply_filters( $this->identifier . '_time_exceeded', $return );
  }

  /**
   * Complete.
   *
   * Override if applicable, but ensure that the below actions are
   * performed, or, call parent::complete().
   */
  public function complete() {
    // Unschedule the cron healthcheck.
    $this->clear_scheduled_event();

    $this->callbacks['complete']();
  }

  /**
   * Schedule cron healthcheck
   *
   * @access public
   * @param mixed $schedules Schedules.
   * @return mixed
   */
  public function schedule_cron_healthcheck( $schedules ) {

    $interval = apply_filters( $this->cron_interval_identifier , $this->cron_interval );

    $schedules[ $this->cron_interval_identifier ] = [
      'interval' => $interval,
      'display'  => sprintf( __( 'Every %d Seconds' ), $interval ),
    ];

    return $schedules;
  }

  /**
   * Handle cron healthcheck
   *
   * Restart the background process if not already running
   * and data exists in the queue.
   */
  public function handle_cron_healthcheck() {

    // Background process already running
    if ( $this->is_process_running() ) exit;

    if ( $this->is_queue_empty() ) {
      // No data to process.
      $this->clear_scheduled_event();
      exit;
    }

    $this->handle();

    exit;
  }

  /**
   * Schedule event
   */
  public function schedule_event() {
    if ( ! wp_next_scheduled( $this->cron_hook_identifier ) ) {
      wp_schedule_event( time(), $this->cron_interval_identifier, $this->cron_hook_identifier );
    }
  }

  /**
   * Clear scheduled event
   */
  public function clear_scheduled_event() {
    $timestamp = wp_next_scheduled( $this->cron_hook_identifier );
    if ( $timestamp ) {
      wp_unschedule_event( $timestamp, $this->cron_hook_identifier );
    }
  }

  /**
   * Task
   *
   * Perform any actions required on each queue item. Return a modified item
   * for further processing in the next pass through. Otherwise, the item is
   * removed from the queue.
   *
   * @param mixed $item Queue item to iterate over.
   *
   * @return mixed
   */
  public function task( $item ) {
    return $this->callbacks['task']( $item );
  }

  // Utility methods

  /**
   * Get unfinished items
   *
   * @return Array Items from all unfinished batches
   */
  public function get_items() {

    $batches = $this->get_batches();
    $items = [];

    foreach ($batches as $batch) {
      $items = array_merge($items, $batch->items);
    }

    return $items;
  }

  /**
   * Get unfinished item count
   *
   * @return int Number of unfinished items
   */
  public function get_item_count() {
    return count($this->get_items());
  }

  /**
   * Save queue state
   *
   * Any data for keeping track of queue state.
   */
  public function save_state($state, $expiration = 0) {
    return set_site_transient( $this->identifier . '_queue_state', $state, $expiration );
  }

  /**
   * Get queue state
   */
  public function get_state() {
    return get_site_transient( $this->identifier . '_queue_state' );
  }

}
