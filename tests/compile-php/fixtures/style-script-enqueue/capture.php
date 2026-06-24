<?php
$html = tangible_template();
$captured = json_encode([
  'styles' => $html->enqueued_inline_styles ?? [],
  'scripts' => $html->enqueued_inline_scripts ?? [],
]);
$html->enqueued_inline_styles = [];
$html->enqueued_inline_scripts = [];
return $captured;
