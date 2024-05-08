<?php
/**
 * REST endpoints
 */
namespace tangible\api;
use tangible\api;
use tangible\api\JWT;
use tangible\framework as framework;
use WP_Error;

new class {

  static $api_version = 1;
  public $plugin_name;
  public $plugin_version;
  public $namespace;

  /**
   * Store errors to display if the JWT is wrong
   * @var WP_Error
   */
  public $jwt_error = null;

  function __construct() {

    $this->plugin_name    = 'tangible';
    $this->plugin_version = framework::$state->version;
    $this->namespace      = $this->plugin_name . '/v' . self::$api_version;

    add_filter( 'rest_api_init', array( $this, 'rest_api_init' ) );
    add_filter( 'rest_pre_dispatch', array( $this, 'rest_pre_dispatch' ), 10, 2 );
    add_filter( 'determine_current_user', array( $this, 'determine_current_user' ), 99 );
  }

  /**
   * Add the endpoints to the API
   */
  function rest_api_init() {

    register_rest_route(
      $this->namespace,
      'token',
      array(
        'methods'  => 'POST',
        'callback' => array( $this, 'generate_token' ),
        'permission_callback' => '__return_true'
      )
    );

    register_rest_route(
      $this->namespace,
      'token/validate',
      array(
        'methods'  => 'POST',
        'callback' => array( $this, 'validate_token' ),
        'permission_callback' => '__return_true'
      )
    );

    register_rest_route(
      $this->namespace,
      'token/refresh',
      array(
        'methods'  => 'POST',
        'callback' => array( $this, 'refresh_token' ),
        'permission_callback' => '__return_true'
      )
    );

    register_rest_route(
      $this->namespace,
      'token/revoke',
      array(
        'methods'  => 'POST',
        'callback' => array( $this, 'revoke_token' ),
        'permission_callback' => '__return_true'
      )
    );

    register_rest_route(
      $this->namespace,
      'token/resetpassword',
      array(
        'methods'  => 'POST',
        'callback' => array( $this, 'reset_password' ),
        'permission_callback' => '__return_true'
      )
    );

    /**
     * Add CORs suppot to the request.
     */
    if ( api\get_cors() ) {
      $headers = apply_filters( 'jwt_auth_cors_allow_headers', 'Access-Control-Allow-Headers, Content-Type, Authorization' );
      header( sprintf( 'Access-Control-Allow-Headers: %s', $headers ) );
    }
  }


  /**
   * Get the user and password in the request body and generate a JWT
   *
   * @param object $request a WP REST request object
   * @return mixed Either a WP_Error or current user data.
   */
  function generate_token( $request ) {

    $secret_key = api\get_auth_key();
    $username   = $request->get_param( 'username' );
    $password   = $request->get_param( 'password' );

    if ( ! $secret_key ) {
      return new WP_Error(
        'jwt_auth_bad_config',
        __( 'JWT is not configurated properly, please contact the admin. The key is missing.', 'simple-jwt-authentication' ),
        array(
          'status' => 403,
        )
      );
    }

    if (empty($username) || empty($password)) {
      return new WP_Error(
        'jwt_auth_invalid_username',
        __( 'Username or email not specified. ' . json_encode($request->get_params()), 'simple-jwt-authentication' ),
        [
          'status' => 403,
        ]
      );      
    }

    /** Try to authenticate the user with the passed credentials*/
    $user = wp_authenticate( $username, $password );

    /** If the authentication fails return a error*/
    if ( is_wp_error( $user ) ) {
      $error_code = $user->get_error_code();
      return new WP_Error(
        '[jwt_auth] ' . $error_code,
        $user->get_error_message( $error_code ),
        array(
          'status' => 403,
        )
      );
    }

    // Valid credentials, the user exists create the according Token.
    $issued_at  = current_time( 'timestamp' );
    $not_before = apply_filters( 'jwt_auth_not_before', $issued_at );
    $expire     = apply_filters( 'jwt_auth_expire', $issued_at + ( DAY_IN_SECONDS * 7 ), $issued_at, $user );
    $uuid       = wp_generate_uuid4();

    $token = array(
      'uuid' => $uuid,
      'iss'  => get_bloginfo( 'url' ),
      'iat'  => $issued_at,
      'nbf'  => $not_before,
      'exp'  => $expire,
      'data' => array(
        'user' => array(
          'id' => $user->data->ID,
        ),
      ),
    );

    // Let the user modify the token data before the sign.
    $token = JWT::encode( apply_filters( 'jwt_auth_token_before_sign', $token, $user ), $secret_key );

    // Setup some user meta data we can use for our UI.
    $jwt_data   = get_user_meta( $user->data->ID, 'jwt_data', true ) ?: array();
    $user_ip    = api\get_ip();
    $jwt_data[] = array(
      'uuid'      => $uuid,
      'issued_at' => $issued_at,
      'expires'   => $expire,
      'ip'        => $user_ip,
      'ua'        => $_SERVER['HTTP_USER_AGENT'],
      'last_used' => current_time( 'timestamp' ),
    );
    update_user_meta( $user->data->ID, 'jwt_data', apply_filters( 'simple_jwt_auth_save_user_data', $jwt_data ) );

    // The token is signed, now create the object with no sensible user data to the client.
    $data = array(
      'token'             => $token,
      'user_id'           => $user->data->ID,
      'user_email'        => $user->data->user_email,
      'user_nicename'     => $user->data->user_nicename,
      'user_display_name' => $user->data->display_name,
      'token_expires'     => $expire,
    );

    // Let the user modify the data before send it back.
    return apply_filters( 'jwt_auth_token_before_dispatch', $data, $user );
  }

  /**
   * This is our Middleware to try to authenticate the user according to the
   * token send.
   *
   * @param (int|bool) $user Logged User ID
   * @since 1.0
   * @return (int|bool)
   */
  function determine_current_user( $user ) {

    /**
     * This hook only should run on the REST API requests to determine
     * if the user in the Token (if any) is valid, for any other
     * normal call ex. wp-admin/.* return the user.
     *
     * @since 1.2.3
     **/
    $rest_api_slug = rest_get_url_prefix();
    $valid_api_uri = strpos( $_SERVER['REQUEST_URI'], $rest_api_slug );

    if ( ! $valid_api_uri ) {
      return $user;
    }

    /*
     * if the request URI is for validate the token don't do anything,
     * this avoid double calls to the validate_token function.
     */
    $validate_uri = strpos( $_SERVER['REQUEST_URI'], 'token/validate' );
    if ( $validate_uri > 0 ) {
      return $user;
    }

    /**
     * We are using localized strings as error messages in validate_token()
     *
     * When looking for the current locale, it might call _wp_get_current_user()
     * which will apply the determine_current_user filter again (and will create an
     * infinite loop)
     */
    remove_filter( 'determine_current_user', array( $this, 'determine_current_user' ), 99 );
    $token = $this->validate_token( false );
    add_filter( 'determine_current_user', array( $this, 'determine_current_user' ), 99 );

    if ( is_wp_error( $token ) ) {
      if ( $token->get_error_code() !== 'jwt_auth_no_auth_header' ) {
        // If there is a error, store it to show it after see rest_pre_dispatch
        $this->jwt_error = $token;
        return $user;
      } else {
        return $user;
      }
    }

    // Everything is ok, return the user ID stored in the token.
    return $token->data->user->id;
  }

  /**
   * Main validation function, this function try to get the Autentication
   * headers and decoded.
   *
   * @param bool $output
   * @since 1.0
   * @return WP_Error | Object
   */
  function validate_token( $output = true ) {
    /*
     * Looking for the HTTP_AUTHORIZATION header, if not present just
     * return the user.
     */
    $header_name = defined( 'SIMPLE_JWT_AUTHENTICATION_HEADER_NAME' ) ? SIMPLE_JWT_AUTHENTICATION_HEADER_NAME : 'HTTP_AUTHORIZATION';
    $auth        = isset( $_SERVER[ $header_name ] ) ? $_SERVER[ $header_name ] : false;

    // Double check for different auth header string (server dependent)
    if ( ! $auth ) {
      $auth = isset( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ) ? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] : false;
    }

    if ( ! $auth ) {
      return new WP_Error(
        'jwt_auth_no_auth_header',
        __( 'Authorization header not found.', 'simple-jwt-authentication' ),
        array(
          'status' => 403,
        )
      );
    }

    /*
     * The HTTP_AUTHORIZATION is present verify the format
     * if the format is wrong return the user.
     */
    list( $token ) = sscanf( $auth, 'Bearer %s' );
    if ( ! $token ) {
      return new WP_Error(
        'jwt_auth_bad_auth_header',
        __( 'Authorization header malformed.', 'simple-jwt-authentication' ),
        array(
          'status' => 403,
        )
      );
    }

    // Get the Secret Key
    $secret_key = api\get_auth_key();
    if ( ! $secret_key ) {
      return new WP_Error(
        'jwt_auth_bad_config',
        __( 'JWT is not configurated properly, please contact the admin. The key is missing.', 'simple-jwt-authentication' ),
        array(
          'status' => 403,
        )
      );
    }

    // Try to decode the token
    try {
      $token = JWT::decode( $token, $secret_key, array( 'HS256' ) );
      // The Token is decoded now validate the iss
      if ( get_bloginfo( 'url' ) !== $token->iss ) {
        // The iss do not match, return error
        return new WP_Error(
          'jwt_auth_bad_iss',
          __( 'The iss do not match with this server', 'simple-jwt-authentication' ),
          array(
            'status' => 403,
          )
        );
      }
      // So far so good, validate the user id in the token.
      if ( ! isset( $token->data->user->id ) ) {
        return new WP_Error(
          'jwt_auth_bad_request',
          __( 'User ID not found in the token', 'simple-jwt-authentication' ),
          array(
            'status' => 403,
          )
        );
      }

      // Custom validation against an UUID on user meta data.
      $jwt_data = get_user_meta( $token->data->user->id, 'jwt_data', true ) ?: false;
      if ( false === $jwt_data ) {
        return new WP_Error(
          'jwt_auth_token_revoked',
          __( 'Token has been revoked.', 'simple-jwt-authentication' ),
          array(
            'status' => 403,
          )
        );
      }

      $valid_token = false;
      // Loop through and check wether we have the current token uuid in the users meta.
      foreach ( $jwt_data as $key => $token_data ) {
        if ( $token_data['uuid'] === $token->uuid ) {
          $user_ip                       = ! empty( $_SERVER['REMOTE_ADDR'] ) ? $_SERVER['REMOTE_ADDR'] : __( 'Unknown', 'simple-jwt-authentication' );
          $jwt_data[ $key ]['last_used'] = current_time( 'timestamp' );
          $jwt_data[ $key ]['ua']        = $_SERVER['HTTP_USER_AGENT'];
          $jwt_data[ $key ]['ip']        = $user_ip;
          $valid_token                   = true;
          break;
        }
      }

      // Found no valid token. Return error.
      if ( false === $valid_token ) {
        return new WP_Error(
          'jwt_auth_token_revoked',
          __( 'Token has been revoked.', 'simple-jwt-authentication' ),
          array(
            'status' => 403,
          )
        );
      }

      // Everything looks good return the decoded token if the $output is false
      if ( ! $output ) {
        return $token;
      }
      // If the output is true return an answer to the request to show it.
      return array(
        'code' => 'jwt_auth_valid_token',
        'data' => array(
          'status' => 200,
        ),
      );
    } catch ( Exception $e ) {
      // Something is wrong trying to decode the token, send back the error.
      return new WP_Error(
        'jwt_auth_invalid_token',
        $e->getMessage(),
        array(
          'status' => 403,
        )
      );
    }
  }


  /**
   * Get a JWT in the header and generate a JWT
   *
   * @return mixed Either a WP_Error or an object with a JWT token.
   */
  function refresh_token() {
    //Check if the token is valid and get user information
    $token = $this->validate_token( false );

    if ( is_wp_error( $token ) ) {
      return $token;
    }

    // Get the Secret Key
    $secret_key = api\get_auth_key();
    if ( ! $secret_key ) {
      return new WP_Error(
        'jwt_auth_bad_config',
        __( 'JWT is not configurated properly, please contact the admin. The key is missing.', 'simple-jwt-authentication' ),
        array(
          'status' => 403,
        )
      );
    }

    $user = new WP_User( $token->data->user->id );

    // The user exists create the according Token.
    $issued_at  = current_time( 'timestamp' );
    $not_before = apply_filters( 'jwt_auth_not_before', $issued_at );
    $expire     = apply_filters( 'jwt_auth_expire', $issued_at + ( DAY_IN_SECONDS * 7 ), $issued_at, $user );
    $uuid       = wp_generate_uuid4();

    $token = array(
      'uuid' => $uuid,
      'iss'  => get_bloginfo( 'url' ),
      'iat'  => $issued_at,
      'nbf'  => $not_before,
      'exp'  => $expire,
      'data' => array(
        'user' => array(
          'id' => $user->data->ID,
        ),
      ),
    );

    // Let the user modify the token data before the sign.
    $token = JWT::encode( apply_filters( 'jwt_auth_token_before_sign', $token, $user ), $secret_key );

    // Setup some user meta data we can use for our UI.
    $jwt_data   = get_user_meta( $user->data->ID, 'jwt_data', true ) ?: array();
    $user_ip    = api\get_ip();
    $jwt_data[] = array(
      'uuid'      => $uuid,
      'issued_at' => $issued_at,
      'expires'   => $expire,
      'ip'        => $user_ip,
      'ua'        => $_SERVER['HTTP_USER_AGENT'],
      'last_used' => current_time( 'timestamp' ),
    );
    update_user_meta( $user->data->ID, 'jwt_data', apply_filters( 'simple_jwt_auth_save_user_data', $jwt_data ) );

    // The token is signed, now create the object with no sensible user data to the client.
    $data = array(
      'token'             => $token,
      'user_id'           => $user->data->ID,
      'user_email'        => $user->data->user_email,
      'user_nicename'     => $user->data->user_nicename,
      'user_display_name' => $user->data->display_name,
      'token_expires'     => $expire,
    );

    // Let the user modify the data before send it back.
    return apply_filters( 'jwt_auth_token_before_dispatch', $data, $user );
  }


  /**
   * Check if we should revoke a token.
   *
   * @since 1.0
   */
  function revoke_token() {
    $token = $this->validate_token( false );

    if ( is_wp_error( $token ) ) {
      if ( $token->get_error_code() !== 'jwt_auth_no_auth_header' ) {
        // If there is a error, store it to show it after see rest_pre_dispatch.
        $this->jwt_error = $token;
        return false;
      } else {
        return false;
      }
    }

    $tokens     = get_user_meta( $token->data->user->id, 'jwt_data', true ) ?: false;
    $token_uuid = $token->uuid;

    if ( $tokens ) {
      foreach ( $tokens as $key => $token_data ) {
        if ( $token_data['uuid'] === $token_uuid ) {
          unset( $tokens[ $key ] );
          update_user_meta( $token->data->user->id, 'jwt_data', $tokens );
          return array(
            'code' => 'jwt_auth_revoked_token',
            'data' => array(
              'status' => 200,
            ),
          );
        }
      }
    }

    return array(
      'code' => 'jwt_auth_no_token_to_revoke',
      'data' => array(
        'status' => 403,
      ),
    );

  }


  /**
   * Endpoint for requesting a password reset link.
   * This is a slightly modified version of what WP core uses.
   *
   * @param object $request The request object that come in from WP Rest API.
   * @since 1.0
   */
  function reset_password( $request ) {
    $username = $request->get_param( 'username' );
    if ( empty($username) ) {
      return array(
        'code'    => 'jwt_auth_invalid_username',
        'message' => __( '<strong>Error:</strong> Username or email not specified.', 'simple-jwt-authentication' ),
        'data'    => array(
          'status' => 403,
        ),
      );
    }
    elseif ( strpos( $username, '@' ) ) {
      $user_data = get_user_by( 'email', trim( $username ) );
    } else {
      $user_data = get_user_by( 'login', trim( $username ) );
    }

    global $wpdb, $current_site;

    do_action( 'lostpassword_post' );
    if ( ! $user_data ) {
      return array(
        'code'    => 'jwt_auth_invalid_username',
        'message' => __( '<strong>Error:</strong> Invalid username.', 'simple-jwt-authentication' ),
        'data'    => array(
          'status' => 403,
        ),
      );
    }

    // redefining user_login ensures we return the right case in the email
    $user_login = $user_data->user_login;
    $user_email = $user_data->user_email;

    do_action( 'retreive_password', $user_login );  // Misspelled and deprecated
    do_action( 'retrieve_password', $user_login );

    $allow = apply_filters( 'allow_password_reset', true, $user_data->ID );

    if ( ! $allow ) {
      return array(
        'code'    => 'jwt_auth_reset_password_not_allowed',
        'message' => __( '<strong>Error:</strong> Resetting password is not allowed.', 'simple-jwt-authentication' ),
        'data'    => array(
          'status' => 403,
        ),
      );
    } elseif ( is_wp_error( $allow ) ) {
      return array(
        'code'    => 'jwt_auth_reset_password_not_allowed',
        'message' => __( '<strong>Error:</strong> Resetting password is not allowed.', 'simple-jwt-authentication' ),
        'data'    => array(
          'status' => 403,
        ),
      );
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

    return array(
      'code'    => 'jwt_auth_password_reset',
      'message' => __( '<strong>Success:</strong> an email for selecting a new password has been sent.', 'simple-jwt-authentication' ),
      'data'    => array(
        'status' => 200,
      ),
    );
  }

  /**
   * Filter to hook the rest_pre_dispatch, if the is an error in the request
   * send it, if there is no error just continue with the current request.
   *
   * @param $request
   * @since 1.0
   */
  function rest_pre_dispatch( $request ) {
    if ( is_wp_error( $this->jwt_error ) ) {
      return $this->jwt_error;
    }

    $user_id = apply_filters( 'determine_current_user', false );
    if (!empty($user_id) && !is_user_logged_in()) {
      wp_set_current_user($user_id);
    }

    return $request;
  }

};
