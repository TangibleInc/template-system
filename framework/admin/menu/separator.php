<?php
use tangible\framework;

add_action('admin_head', function() {

  $items = framework\sort_admin_menus();

  if (empty($items)) return;

  /**
   * Determine where to put menu item separators - their positions are
   * dynamic because plugins can add new items. There's a hidden first submenu
   * "Tangible", and 1-based index for CSS nth-child.
   */

  $separator_positions = [];

  foreach ($items as $index => $item) {
    if (!isset($item['separator'])) continue;
    if ($item['separator']==='before') {
      $separator_positions []= $index + 1;
    } elseif ($item['separator']==='after') {
      $separator_positions []= $index + 2;
    }
  }

  if (count($separator_positions) > 0) {

?><style>
<?php foreach ($separator_positions as $position) { ?>
li#toplevel_page_tangible ul.wp-submenu > li:nth-child(<?php
  echo $position;
?>) {
  margin-bottom: 7px;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(240, 246, 252, 0.5); /* Slightly darker than submenu item */
}
<?php } ?>
</style><?php
  }
});
