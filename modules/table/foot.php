<?php

// TODO: Foot

$html->table_foot_tag = function( $atts, $nodes ) use ( $html ) {
  return $html->render_raw_tag( 'tfoot', $atts, $nodes );
};
