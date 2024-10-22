<?php
/**
 * Admin page under Settings
 */
namespace tangible\framework;
use tangible\framework;

function get_plugin_settings_key($plugin) {
  return "{$plugin->setting_prefix}_settings";
}

function get_plugin_settings($plugin) {
  $settings_key = framework\get_plugin_settings_key($plugin);
  return is_multisite()
    ? get_network_option(null, $settings_key, [])
    : get_option($settings_key, [])
  ;
}

/**
 * Register plugin settings
 * 
 * @param config - Plugin settings configuration
 * @param config.css - CSS file URL
 * @param config.header - { logo: string, show_title: boolean }
 * @param config.title_callback - Function to display plugin title
 * @param config.title_section - { title: string, description: boolean }
 * @param config.tabs - { [name: string]: { title: string, callback: Function } }
 */
function register_plugin_settings($plugin, $config) {

  // Backward compatibility
  if (isset($config['features'])) {
    $plugin->features = $config['features'];
    unset($config['features']);
    framework\load_plugin_features( $plugin );
  }

  $is_multisite = is_multisite();
  $url_base = $is_multisite
    ? 'settings.php'
    : 'options-general.php'
  ;
  $settings_page_slug = "{$plugin->name}-settings";
  $url = "{$url_base}?page={$settings_page_slug}";
  $settings_page_url = $is_multisite ? network_admin_url($url) : admin_url($url);

  $plugin->settings = $config;
  if (isset($config['features'])) {
    $plugin->features = $config['features'];
  }

  $settings_key = framework\get_plugin_settings_key($plugin);
  $prefix = $plugin->setting_prefix ?? str_replace('-', '_', $name);
  $nonce_key = "{$prefix}_nonce";

  /**
   * Add plugin settings page under admin menu "Settings"
   * @see https://developer.wordpress.org/reference/functions/add_submenu_page
   */
  add_action(
    $is_multisite ? 'network_admin_menu' : 'admin_menu',
    function() use (
      $plugin, $config, $is_multisite,
      $url_base, $settings_page_slug, $settings_page_url,
      $prefix, $nonce_key
    ) {
      add_submenu_page(
        $url_base,
        $plugin->title,
        $plugin->title,
        // User capability
        $is_multisite
          ? 'manage_network_plugins'
          : 'manage_options'
        ,
        $settings_page_slug,
        function() use (
          $plugin, $config, $is_multisite,
          $settings_page_slug, $settings_page_url,
          $prefix, $nonce_key
        ) {

          $name = $plugin->name;
          $title = $plugin->title;
          $logos = $plugin->plugin_logos ?? [];

          $tabs = $config['tabs'] ?? [];
          $title_callback = $config['title_callback'] ?? '';
          
          $header = $config['header'] ?? [];
          $header_logo = $header['logo'] ?? false;

          $active_tab = sanitize_key($_GET['tab'] ?? array_keys($tabs)[0] ?? '');

          ?><style><?php require_once __DIR__ . '/settings.css'; ?></style><?php
          if (isset($config['css'])) {
            ?><link rel="stylesheet" href="<?php echo esc_attr($config['css']); ?>"><?php
          }
          ?>
          <div class="wrap tangible-plugin-settings-page <?php echo esc_attr($settings_page_slug); ?>">
        
            <header>
              <div class="plugin-title">
                <h1>
                  <?php
                    if ($title_callback) {
                      $title_callback();
                    } elseif ($header_logo && isset($logos[ $header_logo ])) {
                      ?>
                    
                      <div class="plugin-title-and-logo">
                        <img class="plugin-logo<?php echo $header_logo === 'full' ? '-full' : '' ?>"
                          alt="<?php echo esc_attr($title) ?> Logo"
                          src="<?php echo esc_attr($logos[ $header_logo ]) ?>"
                        />
                        <?php
                          if (!isset($header['show_title']) || $header['show_title'] !== false) {
                            echo $title;
                          }
                        ?>
                    </div>
                  
                    <?php
                  } else {
                      ?><?php echo $title; ?><?php
                    }
                  ?>
                  <div class="tangible-plugin-store-link">
                    &nbsp;By <a href="https://tangibleplugins.com" target="_blank">Tangible Plugins</a>
                  </div>
                </h1>
              </div>
            </header>
        
            <h2 class="nav-tab-wrapper">
              <?php
                foreach ($tabs as $tab_slug => $tab) {
        
                  $tab_query = !empty($tab_slug) ? "&tab=$tab_slug" : '';
                  $url = "{$settings_page_url}{$tab_query}";

                  $classname = 'nav-tab';
                  if ($tab_slug===$active_tab) $classname .= ' nav-tab-active';

                  ?><a class="<?php echo $classname; ?>" href="<?php echo $url; ?>"><?php echo $tab['title']; ?></a><?php
                }
              ?>
            </h2>

            <div class="tangible-plugin-settings-section-wrapper">
              <?php if (!empty($title_section = $tabs[$active_tab]['title_section'] ?? null)) { ?>
                <div class="tangible-plugin-settings-title-section">
                  <h2><?php echo $title_section['title'] ?? $tabs[$active_tab]['title'] ?></h2>
                  <p><?php echo $title_section['description'] ?? '' ?></p>
                </div>
              <?php } ?>
          
              <form method="post"
                class="tangible-plugin-settings-tab <?php echo $name; ?>-settings-tab <?php echo $name; ?>-settings-tab-<?php echo $active_tab; ?>"
              >
                <?php

                  wp_nonce_field($nonce_key, $nonce_key);
          
                  if (isset($tabs[$active_tab]) && isset($tabs[$active_tab]['callback'])) {

                    // Render tab
                    $tabs[$active_tab]['callback']();
                  }
                ?>
              </form>
            </div>
            
          </div>
          <?php
          if (isset($config['js'])) {
            ?><script src="<?php echo esc_attr($config['js']); ?>"></script><?php
          }
        } // Render settings page
      );
    }
  ); // Add action admin menu


  /**
   * Update settings on form submit
   */
  $nonce_key = "{$prefix}_nonce";

  if (!empty($_POST)
    && isset($_POST[$settings_key])
    && check_admin_referer($nonce_key, $nonce_key)
  ) {

    // Merge with previous settings to support different pages to partially update
    $old_settings = framework\get_plugin_settings($plugin);
    $new_settings = $_POST[$settings_key];
    $settings = array_merge(
      empty($old_settings) ? [] : $old_settings,
      $new_settings
    );

    if (is_multisite()) {
      update_network_option(null, $settings_key, $settings);
    } else {
      update_option($settings_key, $settings);
    }
  }

  /**
   * Add "Settings" link in plugins list
   * @see https://codex.wordpress.org/Plugin_API/Filter_Reference/plugin_action_links_(plugin_file_name)
   */

  $basename = plugin_basename($plugin->file_path);

  $filter = $is_multisite
    ? "network_admin_plugin_action_links_$basename"
    : "plugin_action_links_$basename"
  ;

  add_filter($filter, function($links) use ($plugin, $config, $settings_page_url) {

    $url = $settings_page_url;
    $label = 'Settings';

    $links []= "<a href=\"$url\">$label</a>";

    // Additional links, like Support
    if (isset($plugin->action_links)) {
      foreach ($plugin->action_links as $link) {
        $links []= $link;
      }
    }

    return $links;
  }, 10, 1);
}

require_once __DIR__ . '/checkbox.php';
