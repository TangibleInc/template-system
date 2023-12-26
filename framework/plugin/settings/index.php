<?php
/**
 * Admin page under Settings
 */
namespace tangible\framework;
use tangible\framework;

/**
 * Register plugin settings
 * 
 * @param config - Plugin settings configuration
 * @param config.css - CSS file URL
 * @param config.title_callback - Function to display plugin title
 * @param config.tabs - { [name: string]: { title: string, callback: Function } }
 */
function register_plugin_settings($plugin, $config) {
  $is_multisite = is_multisite();
  add_action(
    $is_multisite ? 'network_admin_menu' : 'admin_menu',
    function() use ($plugin, $config, $is_multisite) {
      $url_base = $is_multisite
        ? 'settings.php'
        : 'options-general.php'
      ;
      $settings_page_slug = "{$plugin->name}-settings";
      /**
       * Submenu page under Settings
       * @see https://developer.wordpress.org/reference/functions/add_submenu_page
       */
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
        function() use ($plugin, $config, $is_multisite, $url_base, $settings_page_slug) {

          $name = $plugin->name;
          $title = $plugin->title;
          $prefix = $plugin->setting_prefix ?? str_replace('-', '_', $name);
        
          // $settings_key = "{$prefix}_settings";
          // $settings = is_multisite() ? get_network_option(null, $settings_key, []) : get_option($settings_key, []);
        
          $nonce_key = "{$prefix}_nonce";
        
          $tabs = $config['tabs'] ?? [];
          $title_callback = $config['title_callback'] ?? '';
          
          $active_tab = $_GET['tab'] ?? array_keys($tabs)[0];

          ?><style><?php require_once __DIR__ . '/settings.css'; ?></style><?php
          if (isset($config['css'])) {
            ?><link rel="stylesheet" href="<?php echo $config['css']; ?>"><?php
          }
          ?>
          <div class="wrap tangible-plugin-settings-page <?php echo $name; ?>-settings">
        
            <header>
              <div class="plugin-title">
                <h1>
                  <?php
                    if ($title_callback) {
                      $title_callback();
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
                  $url = "{$url_base}?page={$settings_page_slug}{$tab_query}";
                  $url = $is_multisite ? network_admin_url($url) : admin_url($url);

                  $classname = 'nav-tab';
                  if ($tab_slug===$active_tab) $classname .= ' nav-tab-active';

                  ?><a class="<?php echo $classname; ?>" href="<?php echo $url; ?>"><?php echo $tab['title']; ?></a><?php
                }
              ?>
            </h2>
        
            <form method="post"
              class="tangible-plugin-settings-tab <?php echo $name; ?>-settings-tab <?php echo $name; ?>-settings-tab-<?php echo $active_tab; ?>"
            >
              <?php

                // settings_fields($settings_key);
                wp_nonce_field($nonce_key, $nonce_key);
        
                if (isset($tabs[$active_tab]) && isset($tabs[$active_tab]['callback'])) {
        
                  // Render tab
                  $tabs[$active_tab]['callback']();
                }
              ?>
            </form>
          </div>
          <?php
          if (isset($config['js'])) {
            ?><script src="<?php echo $config['js']; ?>"></script><?php
          }
        } // Render settings page
      );
    }
  );
}

require_once __DIR__ . '/checkbox.php';
