<?php
use tangible\format;
use tangible\hjson;

$html->load_file = function( $file ) use ( $html ) {
  return $html->load_asset( $file );
};

/**
 * Give each template partial a context
 *
 * This is used to resolve relative import by <Load> inside the template.
 */
$html->load_template_with_context = function( $file, $before = false, $after = false ) {

  ob_start();

  ?><PushContext
    path="<?php echo dirname( $file ); ?>"
    file="<?php echo basename( $file ); ?>"
  /><?php

  if ($before) echo $before;
  @include $file;
  if ($after) echo $after;

  ?><PopContext /><?php

  return ob_get_clean();
};

$html->load_asset = function( $asset_type, $asset = '', $options = [] ) use ( $html ) {

  if ( empty( $asset ) ) {
    $asset      = $asset_type;
    $asset_type = 'file';
  }

  $file_parts     = explode( '.', $asset );
  $file_extension = isset( $file_parts[1] ) ? end( $file_parts ) : '';

  /**
   * Get current path from context
   */
  $current_path = $html->get_current_context( 'path' );

  $is_external_url = substr( $asset, 0, 2 ) === '//'
    || strpos( $asset, '://' ) !== false;

  if ( $is_external_url ) {

    // If it's a site internal URL, convert to path

    $original_asset = $asset;
    $asset          = str_replace( $html->get_url( 'site' ), $html->get_path( 'site' ), $asset );

    $is_external_url = $asset !== $original_asset;

  } elseif ( $asset[0] === '/' ) {

    if ( strpos( $asset, ABSPATH ) === 0 ) {

      // Absolute path within site - Unmodified

    } else {

      // From views root path - @see tangible-views/includes/views.php
      $root_path = $html->get_current_context( 'views_root_path' );

      /**
       * Views root path can be empty if we're inside AJAX/REST request;
       * in that case, get it from "path" variable.
       *
       * Otherwise, leave empty to support situation with inline PHP in
       * a template file in a symlinked directory, where it's using the
       * __DIR__ constant.
       */
      if ( empty( $root_path ) && ( wp_doing_ajax() || wp_is_json_request() ) ) {
        $root_path = $html->get_variable_type( 'path', 'views' );
      }

      $asset = untrailingslashit( $root_path ) . $asset;
    }
  } elseif ( preg_match( '#^[a-zA-Z]:\\\\#', $asset ) ) {

    // Absolute path on Windows - Unmodified

  } elseif ( ! empty( $current_path ) ) {

    // Relative path
    $asset = trailingslashit( $current_path ) . $asset;
  }

  $asset_url = str_replace( ABSPATH, trailingslashit( site_url() ), $asset );

  if ( isset( $options['version'] ) ) {
    $asset_url .= ( strpos( $asset_url, '?' ) === false ? '?' : '' ) . 'version=' . $options['version'];
  }

  if ( $is_external_url || ! file_exists( $asset ) ) {
    trigger_error( "File not found: $asset", E_USER_WARNING );
    return;
  }

  switch ( $asset_type ) {
    case 'template':
      // TODO: From post type tangible_template

        break;
    case 'file':
      switch ( $file_extension ) {
        case 'html':
        case 'php':
          // Local variable scope - @see /tags/get-set/local.php
          $html->push_local_variable_scope();

        $content = $html->render(
            /**
             * Support Exit tag by wrapping template with Catch tag
             *
             * Can't use $html->render_with_catch_exit() here because
             * PopContext tag must be called even after exit.
             */
            $html->load_template_with_context( $asset,
              '<Catch>', '</Catch>'
            )
          );

          // End local variable scope
          $html->pop_local_variable_scope();

            return $content;
        case 'svg':
            return file_get_contents( $asset );

        // Markdown
        case 'md':
            return $html->render(
            $html->load_template_with_context( $asset,
              "<Markdown>\n", '</Markdown>'
            )
          );
        case 'scss':
          $html->enqueue_sass_file( $asset );
            break;
        case 'css':
          $html->enqueue_style_file( $asset_url, $options );
            break;
        case 'js':
          $html->enqueue_script_file( $asset_url, $options );
            break;
        case 'json':
        case 'hjson':
          $content = file_get_contents( $asset );

          if ( isset( $options['json'] ) ) {

            /**
             * JSON decode options
             *
             * @see https://www.php.net/manual/en/function.json-decode
             */
            $json_options = 0;

            if ( isset( $atts['array'] ) ) {
              $json_options = $json_options | JSON_OBJECT_AS_ARRAY;
            }

            $result = json_decode( $content, true, 512, $json_options );

            if ( json_last_error() ) {
              $message                           = json_last_error_msg();
              if ( ! empty( $message )) $message = ': ' . $message;
              trigger_error( "JSON error \"{$message}\" in $asset", E_USER_WARNING );
              $result = [];
            }

            return $result;
          }

          /**
           * Human JSON https://hjson.github.io/
           */

          try {
            return hjson\parse( $content, $options + [
              'throw' => true,
            ] );
          } catch ( \Throwable $th ) {
            $message                           = $th->getMessage();
            if ( ! empty( $message )) $message = ': ' . $message;
            trigger_error( "JSON error \"{$message}\" in $asset", E_USER_WARNING );
            return [];
          }

            break;
        default:
          trigger_error( "Unknown file type: $asset", E_USER_WARNING );
            return;
      }
        break;
  }
};

/**
 * <Load> file, template, library, ..
 */
$html->load_content_tag = function( $atts, $content = '' ) use ( $html ) {

  $asset      = '';
  $asset_type = '';

  foreach ( [
    'template',
    'file',
  ] as $key ) {
    if ( isset( $atts[ $key ] ) ) {
      $asset      = $atts[ $key ];
      $asset_type = $key;

      // Support multiple
      if ( strpos( $asset, ',' ) !== false
        || (isset($asset[0]) && $asset[0]==='[')
      ) {
        $assets = format\multiple_values($asset);
        $result = '';
        foreach ( $assets as $each_asset ) {
        $result .= $html->load_content_tag(array_merge($atts, [
            $key => $each_asset,
          ]));
        }
        return $result;
      }

      break;
    }
  }

  // Alias for backward compatibility
  if ( isset( $atts['from'] ) ) $atts['path'] = $atts['from'];
  if ( isset( $atts['path'] ) ) {
    $path = $html->get_path( $atts['path'] );
    if ( ! empty( $path ) ) {
      $asset = trailingslashit( $path ) . ltrim( $asset, '/' );
    }
  }

  if (empty($asset)) return;

  if ( in_array( 'render', $atts['keys'] ) ) {
    $atts['render'] = true;
  }

  return $html->load_asset( $asset_type, $asset, $atts );
};

return $html->load_content_tag;
