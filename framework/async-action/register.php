<?php

return function($config) {

  $request = new class {

    protected $prefix = 'tangible_async_action';
    protected $action = 'action_name';
    protected $nonce_key = 'tangible_async_action_nonce';
    protected $identifier;
    protected $data = [];

    protected $callback;
    protected $error_callback;

    public function __invoke( $data ) {
      return $this->dispatch( $data );
    }

    /**
     * Register async request
     */
    public function init($config) {

      $this->action = $config['name'];
      $this->callback = $config['action'];
      $this->error_callback = isset($config['error']) ? $config['error'] : null;
      $this->identifier = $this->prefix . '_' . $this->action;

      add_action( 'wp_ajax_' . $this->identifier, array( $this, 'maybe_handle' ) );
      add_action( 'wp_ajax_nopriv_' . $this->identifier, array( $this, 'maybe_handle' ) );

      return $this;
    }

    /**
     * Dispatch the async request
     *
     * @return array|WP_Error
     */
    public function dispatch( $data ) {

      $this->data = $this->escape_data( $data );

      $url  = add_query_arg( $this->get_query_args(), $this->get_query_url() );
      $args = $this->get_post_args();

      return wp_remote_post( esc_url_raw( $url ), $args );
    }

    public function get_reserved_field_names() {
      return ['action', $this->nonce_key];
    }

    public function escape_data($data) {
      // Add prefix to reserved field names
      foreach ($this->get_reserved_field_names() as $key) {
        if (isset($data[ $key ])) {
          $data[ "__{$key}" ] = $data[ $key ];
          unset($data[ $key ]);
        }
      }

      return $data;
    }

    public function unescape_data($data) {
      // Remove prefix from reserved field names
      foreach ($this->get_reserved_field_names() as $key) {
        $escaped = "__{$key}";
        if (isset($data[ $escaped ])) {
          $data[ $key ] = $data[ $escaped ];
          unset($data[ $escaped ]);
        }
      }

      return $data;
    }

    /**
     * Get query args
     *
     * @return array
     */
    protected function get_query_args() {
      if ( property_exists( $this, 'query_args' ) ) {
        return $this->query_args;
      }

      return array(
        'action' => $this->identifier,
        $this->nonce_key => $this->create_nonce(),
      );
    }

    /**
     * Get query URL
     *
     * @return string
     */
    protected function get_query_url() {
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
    protected function get_post_args() {
      if ( property_exists( $this, 'post_args' ) ) {
        return $this->post_args;
      }

      return array(
        'blocking'  => false,

        'timeout'   => 0.01,
        'body'      => [
          'data_string' => json_encode($this->data),
        ],

        'cookies'   => $_COOKIE,
        'sslverify' => apply_filters( 'https_local_ssl_verify', false ),
      );
    }

    /**
     * Maybe handle
     *
     * Check for correct nonce and pass to handler.
     */
    public function maybe_handle() {
      // Don't lock up other requests while processing
      session_write_close();

      /**
       * wp_verify_nonce fails in some edge cases when the action was dispatched with
       * a newly registered user, and was received before being logged in.
       *
       * We forked the functions to use a different mechanism to verify nonces,
       * independent of currently logged-in user.
       *
       * Was: check_ajax_referer( $this->identifier, $this->nonce_key )
       */

      if ( $this->verify_nonce() ) {
        $this->handle();
      } else {
        if (!empty($this->error_callback)) $this->error_callback(
          new \Exception('Nonce check failed')
        );
      }

      wp_die();
    }

    private function create_nonce() {
      $token = wp_get_session_token();
      $i     = wp_nonce_tick();
      return substr( wp_hash( $i . '|' . $this->identifier . '|' . $token, $this->nonce_key ), -12, 10 );
    }


    private function verify_nonce() {

      $nonce = isset($_REQUEST[ $this->nonce_key ]) ? $_REQUEST[ $this->nonce_key ] : '';
      if (empty($nonce)) return false;

      $token = wp_get_session_token();
      $i     = wp_nonce_tick();

      // Nonce generated 0-12 hours ago
      $expected = substr( wp_hash( $i . '|' . $this->identifier . '|' . $token, $this->nonce_key ), -12, 10 );
      if ( hash_equals( $expected, $nonce ) ) {
        return 1;
      }

      // Nonce generated 12-24 hours ago
      $expected = substr( wp_hash( ( $i - 1 ) . '|' . $this->identifier . '|' . $token, $this->nonce_key ), -12, 10 );
      if ( hash_equals( $expected, $nonce ) ) {
        return 2;
      }

      return false;
    }

    /**
     * Handle
     */
    protected function handle() {
      $fn = $this->callback;
      try {
        $data = $this->unescape_data(
          isset($_POST['data_string']) ? json_decode(stripslashes_deep($_POST['data_string']), true) : []
        );
        $fn($data);
      } catch (\Exception $th) {
        if (!empty($this->error_callback)) $this->error_callback($th);
      }
    }

  };

  return $request->init($config);
};
