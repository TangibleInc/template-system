<?php
// Paginator instances embed a uniqid and wp_hash-salted hashes
return function ( $output ) {
  $output = preg_replace( '/[a-f0-9]{32}/', 'HASH', $output );
  $output = preg_replace( '/[a-f0-9]{13}/', 'UID', $output );
  return $output;
};
