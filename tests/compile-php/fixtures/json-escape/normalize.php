<?php
// Lets the template use line breaks and indentation for readability
return function ( $output ) {
  $lines = array_map( 'trim', explode( "\n", $output ) );
  return implode(
    "\n",
    array_filter(
      $lines,
      fn( $line ) => $line !== ''
    )
  );
};
