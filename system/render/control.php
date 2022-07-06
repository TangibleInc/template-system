<?php

/**
 * Template controls
 *
 * Currently, only block templates support controls - but we're planning to
 * add this feature to regular templates also.
 *
 * @see tangible-blocks/includes/block/controls/render.php
 */
$plugin->replace_control_values = function($content, $data, $context) use($plugin) {
  if (!function_exists('tangible_blocks')) return $content;
  return tangible_blocks()->replace_control_values($content, $data, $context);
};
