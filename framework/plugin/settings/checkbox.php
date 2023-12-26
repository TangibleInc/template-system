<?php
namespace tangible\framework;
/**
 * Render checkbox as a plugin setting field
 * 
 * The workaround is needed for plugin settings page using the classic
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
    'name',
    'value',
    'label'
  ] as $key) {
    $$key = $config[$key];
  }

  $checked = $value==='true';

  ?>
  <label>
    <input type="hidden" name="<?php echo $name; ?>" value="<?php
      echo $checked ? 'true' : 'false';
    ?>" autocomplete="off">
    <input type="checkbox"
      value="true" autocomplete="off"
      onclick="this.previousSibling.value=this.previousSibling.value==='true'?'false':'true'"
      <?php echo $checked ? 'checked="checked"' : ''; ?>
    />
    <?php echo esc_html($label); ?>
  </label>
  <?php
};
