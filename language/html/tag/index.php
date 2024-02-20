<?php
namespace tangible\html;
use tangible\html;

$html->tags = [
  // tag => [ callback => function, local_tags => [] ]
];

require_once __DIR__ . '/open.php';
require_once __DIR__ . '/closed.php';
require_once __DIR__ . '/raw.php';

// Tags are closed by default, like <field>
$html->add_tag = __NAMESPACE__ . '\\add_closed_tag';

$html->all_tag_names = null;

function get_all_tag_names( $include_local_tags = true ) {

  $html = html::$state;

  // Cached
  if ($html->all_tag_names !== null) return $html->all_tag_names;

  $html->all_tag_names = array_keys( $html->tags );

  foreach ( $html->tags as $tag => $config ) {
    if (empty( $config['local_tags'] )) continue;
    $html->all_tag_names = array_merge(
      $html->all_tag_names,
      array_keys( $config['local_tags'] )
    );
  }

  return $html->all_tag_names;
};
