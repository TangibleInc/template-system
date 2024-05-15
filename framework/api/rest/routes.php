<?php
/**
 * REST endpoints
 */
namespace tangible\api;
use tangible\api;
use tangible\api\JWT;
use tangible\framework as framework;
use WP_Error;
use WP_User;

api::$state->user_revoked_tokens_key = 'tangible_api_revoked_tokens';

function generate_user_token($user_id) {
  return generate_user_token_data($user_id)['token'];
}

function generate_user_token_data($user_id) {

  $issued_at  = current_time( 'timestamp' );
  $not_before = $issued_at;
  $expire     = $issued_at + ( DAY_IN_SECONDS * 7 );
  $uuid       = wp_generate_uuid4();

  $token = [
    'uuid' => $uuid,
    'iss'  => get_bloginfo( 'url' ),
    'iat'  => $issued_at,
    'nbf'  => $not_before,
    'exp'  => $expire,
    'data' => [
      'user' => [
        'id' => $user_id,
      ],
    ],
  ];

  $token = JWT::encode( $token, api\get_auth_key() );

  $user = new WP_User( $user_id );

  $data = [
    'token'             => $token,
    'user_id'           => $user_id,
    'user_email'        => $user->data->user_email,
    'user_nicename'     => $user->data->user_nicename,
    'user_display_name' => $user->data->display_name,
    'token_expires'     => $expire,
  ];

  return $data;
}

new class {

  static $api_version = 1;
  public $plugin_name;
  public $plugin_version;
  public $namespace;

  /**
   * Store decoded token
   */
  private $decoded_token = null;

  function __construct() {

    $this->plugin_name    = 'tangible';
    $this->plugin_version = framework::$state->version;
    $this->namespace      = $this->plugin_name . '/v' . self::$api_version;

    add_filter( 'rest_api_init', [ $this, 'rest_api_init' ] );
    add_filter( 'rest_pre_dispatch', [ $this, 'rest_pre_dispatch' ], 10, 3 );
  }

  /**
   * Add the endpoints to the API
   */
  function rest_api_init() {

    register_rest_route(
      $this->namespace,
      'token',
      [
        'methods'  => 'POST',
        'callback' => [ $this, 'generate_token' ],
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      $this->namespace,
      'token/validate',
      [
        'methods'  => 'POST',
        'callback' => [ $this, 'validate_token' ],
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      $this->namespace,
      'token/refresh',
      [
        'methods'  => 'POST',
        'callback' => [ $this, 'refresh_token' ],
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      $this->namespace,
      'token/revoke',
      [
        'methods'  => 'POST',
        'callback' => [ $this, 'revoke_token' ],
        'permission_callback' => '__return_true'
      ]
    );

    register_rest_route(
      $this->namespace,
      'token/resetpassword',
      [
        'methods'  => 'POST',
        'callback' => [ $this, 'reset_password' ],
        'permission_callback' => '__return_true'
      ]
    );

    // Add CORS header
    if ( api\get_cors() ) {
      $headers = 'Access-Control-Allow-Headers, Content-Type, Authorization';
      header( sprintf( 'Access-Control-Allow-Headers: %s', $headers ) );
    }
  }

  /**
   * Get the user and password in the request body and generate a JWT
   *
   * @param object $request a WP REST request object
   * @return mixed WP_Error or current user data
   */
  function generate_token( $request ) {

    $secret_key = api\get_auth_key();
    $username   = $request->get_param( 'username' );
    $password   = $request->get_param( 'password' );

    if ( ! $secret_key ) {
      return new WP_Error(
        'jwt_auth_bad_config',
        'JWT secret key is required.',
        [
          'status' => 403,
        ]
      );
    }

    if (empty($username) || empty($password)) {
      return new WP_Error(
        'jwt_auth_invalid_username',
        'User name or email required.',
        [
          'status' => 403,
        ]
      );      
    }

    // Authenticate user with the passed credentials
    $user = wp_authenticate( $username, $password );

    if ( is_wp_error( $user ) ) {
      $error_code = $user->get_error_code();
      return new WP_Error(
        '[jwt_auth] ' . $error_code,
        $user->get_error_message( $error_code ),
        [
          'status' => 403,
        ]
      );
    }

    // Valid credentials, the user exists create the according Token.

    $user_id = $user->data->ID;
    $data = api\generate_user_token_data( $user_id );

    return $data;
  }

  /**
   * Determine current user according to the token, if any.
   * @return (int|bool)
   */
  function determine_current_user() {

    $token = $this->decoded_token = $this->validate_token( false );

    if ( is_wp_error( $token ) ) {
      return false;
    }

    return $token->data->user->id;
  }

  /**
   * Validate the token in authorization header, if any.
   */
  function validate_token( $output = true ) {

    $header_name = 'HTTP_AUTHORIZATION';
    $auth        = isset( $_SERVER[ $header_name ] ) ? $_SERVER[ $header_name ] : false;
    if ( ! $auth ) {
      $auth = isset( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] )
        ? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
        : false
      ;
    }

    if ( ! $auth ) {
      return new WP_Error(
        'jwt_auth_no_auth_header',
        'Authorization header required.',
        [
          'status' => 403,
        ]
      );
    }

    // Verify the format
    list( $token ) = sscanf( $auth, 'Bearer %s' );
    if ( ! $token ) {
      return new WP_Error(
        'jwt_auth_bad_auth_header',
        'Bad authorization header.',
        [
          'status' => 403,
        ]
      );
    }

    // Get the Secret Key
    $secret_key = api\get_auth_key();
    if ( ! $secret_key ) {
      return new WP_Error(
        'jwt_auth_bad_config',
        'JWT secret key is required.',
        [
          'status' => 403,
        ]
      );
    }

    // Try to decode the token
    try {
      $token = JWT::decode( $token, $secret_key, [ 'HS256' ] );
      if ( get_bloginfo( 'url' ) !== $token->iss ) {
        return new WP_Error(
          'jwt_auth_bad_iss',
          'Token origin domain does not match.',
          [
            'status' => 403,
          ]
        );
      }

      
      if ( ! isset( $token->data->user->id ) ) {
        return new WP_Error(
          'jwt_auth_bad_request',
          'User ID not found in the token.',
          [
            'status' => 403,
          ]
        );
      }
        
      $user_id = $token->data->user->id;
      $valid_token = true;

      // Validate against revoked tokens
      $revoke_tokens = get_user_meta( $user_id, api::$state->user_revoked_tokens_key, true ) ?: false;
      if ($revoke_tokens===false) {
        $revoke_tokens = [];
      }

      foreach ($revoke_tokens as $token_data) {
        if ( $token_data['uuid'] === $token->uuid ) {
          return new WP_Error(
            'jwt_auth_token_revoked',
            'Token has been revoked.',
            [ 'status' => 403 ]
          );
        }
      }

      return !$output ? $token : [
        'code' => 'jwt_auth_valid_token',
        'data' => [
          'status' => 200,
        ],
      ];

    } catch ( Exception $e ) {
      return new WP_Error(
        'jwt_auth_invalid_token',
        $e->getMessage(),
        [
          'status' => 403,
        ]
      );
    }
  }

  /**
   * Refresh token.
   */
  function refresh_token() {
    $token = !empty($this->decoded_token)
      ? $this->decoded_token
      : $this->validate_token( false )
    ;

    if ( is_wp_error( $token ) ) {
      return $token;
    }

    // Get the Secret Key
    $secret_key = api\get_auth_key();
    if ( ! $secret_key ) {
      return new WP_Error(
        'jwt_auth_bad_config',
        'JWT secret key required.',
        [
          'status' => 403,
        ]
      );
    }

    $user_id = $token->data->user->id;
    $user = new WP_User( $user_id );

    $data = api\generate_user_token_data( $user_id );

    return $data;
  }

  /**
   * Revoke the token, if any.
   */
  function revoke_token() {

    $token = $this->validate_token( false );

    if ( is_wp_error( $token ) ) {
      return $token;
    }

    $user_id = $token->data->user->id;
    $uuid = $token->uuid;
    $expires = $token->exp;

    $revoke_tokens = get_user_meta( $user_id, api::$state->user_revoked_tokens_key, true ) ?: false;
    if ($revoke_tokens===false) {
      $revoke_tokens = [];
    }

    // Remove expired tokens
    $valid_revoke_tokens = [];
    $now = time();
    foreach ($revoke_tokens as $token_data) {
      if ($now < $token_data['expires']) {
        $valid_revoke_tokens []= $token_data;
      }
    }

    $valid_revoke_tokens []= [
      'uuid' => $uuid,
      'expires' => $expires,
    ];

    update_user_meta( $user_id, api::$state->user_revoked_tokens_key, $valid_revoke_tokens );

    return [
      'code' => 'jwt_auth_revoked_token',
      'data' => [
        'status' => 200,
      ],
    ];
  }

  /**
   * Endpoint for requesting a password reset link.
   * This is a slightly modified version of what WP core uses.
   *
   * @param object $request The request object that come in from WP Rest API.
   */
  function reset_password( $request ) {
    $username = $request->get_param( 'username' );
    if ( empty($username) ) {
      return [
        'code'    => 'jwt_auth_invalid_username',
        'message' => 'User name or email required.',
        'data'    => [
          'status' => 403,
        ],
      ];
    }
    elseif ( strpos( $username, '@' ) ) {
      $user_data = get_user_by( 'email', trim( $username ) );
    } else {
      $user_data = get_user_by( 'login', trim( $username ) );
    }

    global $wpdb, $current_site;

    do_action( 'lostpassword_post' );
    if ( ! $user_data ) {
      return [
        'code'    => 'jwt_auth_invalid_username',
        'message' => 'Invalid username.',
        'data'    => [
          'status' => 403,
        ],
      ];
    }

    // redefining user_login ensures we return the right case in the email
    $user_login = $user_data->user_login;
    $user_email = $user_data->user_email;

    do_action( 'retreive_password', $user_login );  // Misspelled and deprecated
    do_action( 'retrieve_password', $user_login );

    $allow = apply_filters( 'allow_password_reset', true, $user_data->ID );

    if ( ! $allow || is_wp_error( $allow ) ) {
      return [
        'code'    => 'jwt_auth_reset_password_not_allowed',
        'message' => 'Resetting password is not allowed.',
        'data'    => [
          'status' => 403,
        ],
      ];
    }

    $key = get_password_reset_key( $user_data );

    $message  = __( 'Someone requested that the password be reset for the following account:' ) . "\r\n\r\n";
    $message .= network_home_url( '/' ) . "\r\n\r\n";
    // translators: %s is the users login name.
    $message .= sprintf( __( 'Username: %s' ), $user_login ) . "\r\n\r\n";
    $message .= __( 'If this was a mistake, just ignore this email and nothing will happen.' ) . "\r\n\r\n";
    $message .= __( 'To reset your password, visit the following address:' ) . "\r\n\r\n";
    $message .= '<' . network_site_url( "wp-login.php?action=rp&key=$key&login=" . rawurlencode( $user_login ), 'login' ) . ">\r\n";

    if ( is_multisite() ) {
      $blogname = $GLOBALS['current_site']->site_name;
    } else {
      // The blogname option is escaped with esc_html on the way into the database in sanitize_option
      // we want to reverse this for the plain text arena of emails.
      $blogname = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
    }
    // translators: %s is the sites name (blogname)
    $title = sprintf( __( '[%s] Password Reset' ), $blogname );

    $title   = apply_filters( 'retrieve_password_title', $title );
    $message = apply_filters( 'retrieve_password_message', $message, $key );

    if ( $message && ! wp_mail( $user_email, $title, $message ) ) {
      wp_die( __( 'The e-mail could not be sent.' ) . "<br />\n" . __( 'Possible reason: your host may have disabled the mail() function...' ) ); // phpcs:ignore
    }

    return [
      'code'    => 'jwt_auth_password_reset',
      'message' => 'Email sent to reset password.',
      'data'    => [
        'status' => 200,
      ],
    ];
  }

  /**
   * Provide current user to the request.
   */
  function rest_pre_dispatch( $result, $server, $request ) {

    if ($request->get_route() !== '/' . $this->namespace . '/token/validate'
      && !empty($user_id = $this->determine_current_user())
      && !is_user_logged_in()
    ) {
      wp_set_current_user($user_id);
    }

    return $result;
  }

};
