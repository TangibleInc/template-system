<?php
namespace tangible\template_system;

use tangible\api;
use tangible\template_system;

$settings = template_system\get_settings();
$compile_cache = null;

if (class_exists('\\Tangible\\TemplateSystem\\Compile\\Compiler')) {
  $cache_dir = \Tangible\TemplateSystem\Compile\Compiler::getCacheDir();
  $cache_exists = is_dir($cache_dir);
  $cache_writable = $cache_exists && is_writable($cache_dir);
  $cache_has_index = $cache_exists && file_exists($cache_dir . '/index.php');
  $cache_has_htaccess = $cache_exists && file_exists($cache_dir . '/.htaccess');
  $cache_url = null;
  $cache_accessible = null;

  if (defined('WP_CONTENT_DIR') && strpos($cache_dir, WP_CONTENT_DIR) === 0) {
    $relative = ltrim(str_replace(WP_CONTENT_DIR, '', $cache_dir), '/\\');
    $cache_url = content_url($relative);
  }

  if ($cache_url && $cache_exists) {
    $probe_status = null;
    $probe_body = null;
    $probe_token = null;

    if ($cache_writable) {
      $probe_token = 'tangible-cache-probe-' . bin2hex(random_bytes(6));
      $probe_name = 'probe-' . $probe_token . '.txt';
      $probe_path = $cache_dir . '/' . $probe_name;

      @file_put_contents($probe_path, $probe_token);

      if (file_exists($probe_path)) {
        $probe_url = $cache_url . '/' . $probe_name;
        $response = wp_remote_get($probe_url, [
          'timeout' => 2,
          'redirection' => 0,
        ]);
        if (!is_wp_error($response)) {
          $probe_status = wp_remote_retrieve_response_code($response);
          $probe_body = wp_remote_retrieve_body($response);
        }
      }

      @unlink($probe_path);
    }

    if ($probe_status !== null) {
      if ($probe_status < 400 && is_string($probe_body) && strpos($probe_body, $probe_token) !== false) {
        $cache_accessible = true;
      } else {
        $cache_accessible = false;
      }
    } elseif ($cache_has_index) {
      $probe_url = $cache_url . '/index.php';
      $response = wp_remote_head($probe_url, [
        'timeout' => 2,
        'redirection' => 0,
      ]);
      if (!is_wp_error($response)) {
        $status = wp_remote_retrieve_response_code($response);
        if (!empty($status)) {
          $cache_accessible = $status < 400;
        }
      }
    }
  }

  $compile_cache = [
    'dir' => $cache_dir,
    'url' => $cache_url,
    'exists' => $cache_exists,
    'writable' => $cache_writable,
    'has_index' => $cache_has_index,
    'has_htaccess' => $cache_has_htaccess,
    'accessible' => $cache_accessible,
  ];
}

$render_field = function($field) use ($settings) {

  $name = esc_attr($field['name']);
  $field_type = esc_attr($field['field_type']);
  $label = $field['label'];
  $value = $settings[ $field['name'] ] ?? $field['default_value'];

  $output_value = esc_attr(
    is_string($value) ? $value : json_encode( $value )
  );

  ?>
  <p><fieldset style="max-width:520px">
    <label for="<?php echo $name; ?>">
    <?php
      if ($field['field_type']==='checkbox') {

        // Checkbox

        ?>
        <input type="<?php echo $field_type; ?>" name="<?php echo $name; ?>"
          id="<?php echo $name; ?>" value="true"<?php
          if ($value===true) echo ' checked';
        ?> autocomplete="off"<?php
          if (!empty($field['reload'])) {
            echo ' data-reload-when-enabled="true"';
          }
        ?>>
        <?php
      } else {

        // Other input types

        ?>
        <input type="<?php echo $field_type; ?>" name="<?php echo $name; ?>"
          id="<?php echo $name; ?>" value="<?php echo $value; ?>">
        <?php
      }
    ?>
    <?php echo $label; ?>
    </label>
    </fieldset>
  </p>
  <?php
};

?>
<h1>Settings</h1>
<form id="tangible-settings-form" class="wrap" style="margin-top:2rem">
  <?php

  $fields = template_system\get_setting_fields();

  $beta = [];
  $deprecated = [];

  foreach ($fields as $key => $field) {
    if (!empty($field['beta'])) {
      $beta []= $field;
      unset($fields[ $key ]);
    } elseif (!empty($field['deprecated'])) {
      $deprecated []= $field;
      unset($fields[ $key ]);
    }
  }

  foreach ($fields as $field) {
    $render_field( $field );
  }

  if (!empty($beta)) {
    ?><h3>Features in development</h3>
    <?php
//    <p>These will be enabled by default in the next major version.</p>

  foreach ($beta as $field) {
      $render_field( $field );
    }
  }

  if (!empty($deprecated)) {
    ?><h3>Deprecated features</h3>
    <?php
//    <p>These will be removed in the next major version.</p>

    foreach ($deprecated as $field) {
      $render_field( $field );
    }
  }
  ?>
  <p style="margin-top: 1.5rem"><button type="submit" class="button button-primary">Save</button></p>
  <p id="tangible-settings-form-message"></p>
</form>

<?php if ($compile_cache): ?>
  <h2>Compiled Template Cache</h2>
  <p><strong>Path:</strong> <code><?php echo esc_html($compile_cache['dir']); ?></code></p>
  <?php if (!empty($compile_cache['url'])): ?>
    <p><strong>URL:</strong> <code><?php echo esc_html($compile_cache['url']); ?></code></p>
  <?php endif; ?>
  <p>
    <strong>Status:</strong>
    <?php
    if (!$compile_cache['exists']) {
      echo 'Not created yet';
    } elseif (!$compile_cache['writable']) {
      echo 'Not writable';
    } else {
      echo 'Ready';
    }
    ?>
  </p>
  <?php if (!empty($compile_cache['exists']) && !$compile_cache['has_index']): ?>
    <p><strong>Warning:</strong> Missing <code>index.php</code> in cache directory.</p>
  <?php endif; ?>
  <?php if (!empty($compile_cache['exists']) && !$compile_cache['has_htaccess']): ?>
    <p><strong>Warning:</strong> Missing <code>.htaccess</code>. Ensure server rules deny access to this directory.</p>
  <?php endif; ?>
  <?php if ($compile_cache['accessible'] === true): ?>
    <p><strong>Warning:</strong> Cache directory appears to be web-accessible. Block HTTP access to <code>/wp-content/tangible-template-cache</code>.</p>
  <?php elseif ($compile_cache['accessible'] === false): ?>
    <p>Web access check: blocked.</p>
  <?php endif; ?>
  <p>
    <button type="button" class="button" id="tangible-compile-cache-clear">Clear compiled cache</button>
    <span id="tangible-compile-cache-message" style="margin-left:.5rem"></span>
  </p>
<?php endif; ?>

<script>
;(function() {

const {
  ajaxUrl,
  nonce,
  saveActionKey,
  token,
  clearCacheAction
} = <?php

// Pass data
echo json_encode([
  'ajaxUrl' => admin_url( 'admin-ajax.php' ),
  'nonce' => template_system\get_settings_nonce(),
  'saveActionKey' => template_system::$state->settings_key,
  'clearCacheAction' => 'tangible_template_compile_clear_cache',
  // 'token' => api\generate_user_token( get_current_user_id() )
]);

?>;
const $form = document.getElementById('tangible-settings-form')
const $formMessage = document.getElementById('tangible-settings-form-message')
const $cacheButton = document.getElementById('tangible-compile-cache-clear')
const $cacheMessage = document.getElementById('tangible-compile-cache-message')

const inputFields = {
  input: true,
  select: true,
  textarea: true
}

function getFormData($form) {

  // TODO: Use utility method from new Form module

  const data = {}

  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements
  const $inputs = $form.elements

  for (let index = 0; index < $inputs.length; index++) {

    const $input = $inputs[index]
    const { nodeName, type, name } = $input

    // Filter out fieldset, button, etc.
    if (!inputFields[ nodeName.toLowerCase() ]) continue

    const value = type==='checkbox'
      ? $input.checked // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
      : $input.value

    data[name] = value
  }

  return data
}

// Message

const minimumMessageTime = 1000
let lastMessageTime = 0
let messageTimer 

function setFormMessage(message) {
    $formMessage.innerText = message
  }

function scheduleFormMessage(message) {

  const now = Date.now()
  let diff

  if (lastMessageTime && (
    diff = lastMessageTime ? now - lastMessageTime : 0
  ) < minimumMessageTime) {

    // Wait a bit so user can read the last message

    messageTimer = setTimeout(function() {
      setFormMessage(message)
    }, minimumMessageTime - diff) 

  } else {
    clearTimeout( messageTimer )
    setFormMessage(message)
  }

  lastMessageTime = now
}

const originalFields = getFormData($form)

// Form submit

$form.addEventListener('submit', function(e) {

  e.preventDefault()

  scheduleFormMessage('Saving..')

  const data = new FormData()

  const fields = getFormData($form)

  data.append('action', saveActionKey)
  data.append('nonce', nonce)
  data.append('data', JSON.stringify(
    fields
  ))

  /**
   * Types of API errors
   * 
   * - Thrown by fetch(), such as failed to reach server at URL
   * - Server response status, such as 500 Internal Server Error, PHP error, API error like Bad Request or Not Found
   * - API actions can return error in response, such as user permission fail
   */

  fetch(ajaxUrl, {
    method: 'POST',
    credentials: 'same-origin',
    body: data
  })
    .then(response => {
      if ( response.status >= 200 && response.status < 300 ) {
        return response.json()
      } else {
        throw new Error( response.statusText )
      }
    })
    .then(result => {

      if (result.error) throw result.error // { message }

      // console.log('Response', result)

      scheduleFormMessage('Saved')

      for (const el of [...$form.querySelectorAll('[data-reload-when-enabled="true"]')]) {
        // Reload page if setting field changed
        if (
          originalFields[ el.name ] !== fields[ el.name ]
        ) {
          window.location.reload(false)
        }
      }

    })
    .catch(error => {

      // console.error('Error', error)

      scheduleFormMessage(
        'Save failed' + (error.message ? `: ${error.message}` : '')
      )
    })
})

if ($cacheButton) {
  $cacheButton.addEventListener('click', function() {
    if ($cacheMessage) $cacheMessage.innerText = 'Clearing..'

    const data = new FormData()
    data.append('action', clearCacheAction)
    data.append('nonce', nonce)

    fetch(ajaxUrl, {
      method: 'POST',
      credentials: 'same-origin',
      body: data
    })
      .then(response => {
        if ( response.status >= 200 && response.status < 300 ) {
          return response.json()
        } else {
          throw new Error( response.statusText )
        }
      })
      .then(result => {
        if (result.error) throw result.error
        if ($cacheMessage) {
          const cleared = result?.count ?? 0
          $cacheMessage.innerText = `Cleared ${cleared} file${cleared===1?'':'s'}`
        }
      })
      .catch(error => {
        if ($cacheMessage) {
          $cacheMessage.innerText = 'Clear failed' + (error.message ? `: ${error.message}` : '')
        }
      })
  })
}

})()
</script>
<?php
