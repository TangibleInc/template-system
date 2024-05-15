<?php
namespace tangible\template_system;
use tangible\api;
use tangible\template_system;

$settings = template_system\get_settings();

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
<h2>Settings</h2>
<form id="tangible-settings-form" class="wrap">
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

<script>
;(function() {

const {
  ajaxUrl,
  nonce,
  saveActionKey,
  token
} = <?php

// Pass data
echo json_encode([
  'ajaxUrl' => admin_url( 'admin-ajax.php' ),
  'nonce' => template_system\get_settings_nonce(),
  'saveActionKey' => template_system::$state->settings_key,
  // 'token' => api\generate_user_token( get_current_user_id() )
]);

?>;
const $form = document.getElementById('tangible-settings-form')
const $formMessage = document.getElementById('tangible-settings-form-message')

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

})()
</script>
<?php
