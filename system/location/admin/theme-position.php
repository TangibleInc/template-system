<?php
/**
 * Theme position
 *
 * Rendered by ./fields.php
 * Applied in ../frontend/include.php
 *
 * Positions are registered by themes in ../theme/common.php
 *
 * Select2 logic is similar to /assets/src/common/Select.js
 */

// In local scope: $fields

$theme_positions       = $plugin->get_theme_positions();
$theme_position_groups = $plugin->get_theme_position_groups();

$current_theme_position = isset( $fields['theme_position'] ) ? $fields['theme_position'] : '';

?>
<br>
<h3>Theme position</h3>

<select id="theme_position" name="theme_position" autocomplete="off"
  style="display: none; width: 160px;"
>
  <option value="" <?php
    echo empty( $current_theme_position ) ? 'selected' : '';
  ?>>Content</option>

  <?php

    // Theme positions without groups

  foreach ( $theme_positions as $hook ) {
    ?><option
        value="<?php echo $hook['name']; ?>"
      <?php echo $hook['name'] === $current_theme_position ? 'selected' : ''; ?>
      >
      <?php echo $hook['label']; ?>
      </option><?php
  }

    // Theme position groups

  foreach ( $theme_position_groups as $group_name => $group ) {
    if (empty( $group['hooks'] )) continue;
    ?><optgroup label="<?php echo $group['label']; ?>"><?php
foreach ( $group['hooks'] as $hook ) {
  ?><option
            value="<?php echo $hook['name']; ?>"
  <?php echo $hook['name'] === $current_theme_position ? 'selected' : ''; ?>
          >
  <?php echo $hook['label']; ?>
          </option><?php
}
?></optgroup><?php
  }
  ?>
</select>

<p>By default, the layout is applied to the <b>Content</b> position. This replaces the theme template for the matching location, such as <code>index.php</code>, with a minimal wrapper that loads: the theme header, the layout template as main content, and the theme footer. 
</p><p>
The Document <b>Head</b> position is useful for adding meta tags, <a href="https://json-ld.org/" target="_blank">JSON-LD</a> schema, or stylesheets. The Document <b>Foot</b> position is useful for adding scripts.
</p><p>
For compatible themes, there will be a list of other positions, such as <b>Header</b>, <b>Footer</b>, or <b>Sidebar</b>.</p>

<h3>Loading theme files</h3>

<p>Use the <code>Template</code> tag with "theme" attribute to load sidebar and other theme template files. See <a href="https://loop.tangible.one/tags/template#theme">the documentation page</a> for details.</p>

<script>
jQuery(function($) {

  var $position = $('#theme_position')

  $position.tangibleSelect({
    minimumResultsForSearch: Infinity
  })
})
</script>
