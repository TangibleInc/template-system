<?php

$html->table_empty_tag = function( $atts, $nodes ) use ( $html ) {

  $current_table = &$html->current_table;

  $current_table['empty_table_template'] = $html->render( $nodes );
};
