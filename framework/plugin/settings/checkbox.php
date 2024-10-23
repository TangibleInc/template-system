<?php
namespace tangible\framework;
/**
 * Render checkbox as a plugin setting field
 * 
 * This workaround is needed for plugin settings page using the classic
 * form submit in WordPress admin, because an unchecked field value doesn't
 * get passed to the POST request. The solution is to toggle a hidden input
 * field to ensure it gets saved.
 * 
 * @see https://stackoverflow.com/questions/1809494/post-unchecked-html-checkboxes#answer-25764926
 * 
 * This will become unnecessary when using the new AJAX/API/Form module, because
 * they use a smart JavaScript function to gather form fields data.
 */
function render_setting_field_checkbox($config) {

  foreach ([
    'type',
    'name',
    'value',
    'label',
    'description'
  ] as $key) {
    $$key = $config[$key] ?? '';
  }

  $checked = $value==='true';

  if (empty($type) || $type === 'checkbox'): ?>
      <label>
          <input type="hidden" name="<?php echo $name; ?>" value="<?php echo $checked ? 'true' : 'false'; ?>" autocomplete="off">
          <input type="checkbox" value="true" autocomplete="off"
              onclick="this.previousSibling.value=this.previousSibling.value==='true'?'false':'true'" 
              <?php echo $checked ? 'checked' : ''; ?> />
          <?php echo esc_html($label); ?>
      </label>
    <?php elseif ($type === 'switch'): ?>
        <div class="tangible-card">
            <label class="tangible-feature-switch" role="switch" aria-checked="<?php echo $checked ? 'true' : 'false'; ?>" tabindex="0" 
            onclick="this.querySelector('input[type=checkbox]').checked ^= 1"
            onkeydown="if (event.key === ' ' || event.key === 'Enter') { 
                const checkbox = this.querySelector('input[type=checkbox]') 
                checkbox.checked = !checkbox.checked
                checkbox.dispatchEvent(new Event('change'))
                this.setAttribute('aria-checked', checkbox.checked) 
            }">
                <input type="hidden" name="<?php echo $name; ?>" value="<?php echo $checked ? 'true' : 'false'; ?>" autocomplete="off">
                <input type="checkbox" value="true" autocomplete="off" class="tangible-checkbox" 
                    onchange="this.previousElementSibling.value = this.checked ? 'true' : 'false'; this.parentElement.setAttribute('aria-checked', this.checked);" 
                    <?php echo $checked ? 'checked' : ''; ?> style="display: none;" />
                <span class="tangible-feature-switch-label"><?php echo esc_html($label); ?></span>
                <span class="tangible-switch-track"></span>
            </label>
            <?php if (!empty($description)): ?>
                <div class="feature-description">
                    <?php
                    if (is_callable($description)) {
                        $description(
                            tangible\framework\get_plugin_feature_settings($plugin, $feature),
                            tangible\framework\get_plugin_feature_settings_key($plugin, $feature),
                            $is_enabled
                        );
                    } else {
                        echo $description;
                    }
                    ?>
                </div>
            <?php endif; ?>
      </div>
    <?php endif; 
};
