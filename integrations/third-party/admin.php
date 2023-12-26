<?php
use tangible\framework;

return function() use ( $plugin ) {

  $integrations_enabled = $plugin->get_settings_for_integrations_enabled();

  // Save form

  $nonce_key = $plugin->setting_prefix . '_integrations_settings';

  if ( isset( $_POST['integrations_enabled'] )
    && is_array( $_POST['integrations_enabled'] )
    && isset( $_POST['integrations_nonce'] )
    && wp_verify_nonce( $_POST['integrations_nonce'], $nonce_key )
  ) {

    foreach ( $_POST['integrations_enabled'] as $key => $value ) {
      if (empty( $key )) continue;
      $integrations_enabled[ $key ] = sanitize_text_field( $value ); // true/false as string
    }

    $settings['integrations_enabled'] = $integrations_enabled;

    $plugin->update_settings( $settings );
  }

  ?>
  <div class="wrap">

    <h1 class="wp-heading-inline">Integrations</h1>

    <form method="post" action="">

      <input type="hidden" name="integrations_nonce" value="<?php
        echo wp_create_nonce( $nonce_key );
      ?>">

      <ul style="list-style: none; padding-left: 0; font-size: 15px; font-weight: 400; line-height: 1.67">
      <?php
      foreach ( $plugin->integration_configs as $config ) {
        ?>
          <li><?php

          // Integrations are enabled by default

          $slug  = $config['slug'];
          $value = ! isset( $integrations_enabled[ $slug ] )
            || $integrations_enabled[ $slug ] === 'true';

          // @see /framework/plugin/settings.php
          echo framework\render_setting_field_checkbox([
            'name'  => 'integrations_enabled[' . $slug . ']',
            'value' => $value ? 'true' : 'false',
            'label' => $config['title']
              . ( $value && $config['active'] ? ' - <b>Active</b>' : '' ),
          ]);

              ?></li>
          <?php
      }
      ?>
      </ul>

      <?php submit_button(); ?>

    </form>
  </div>
  <?php

};
