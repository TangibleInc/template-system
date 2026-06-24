<?php
// Hashes are salted via wp_hash and differ per environment
return function ( $output ) {
  return preg_replace( '/&quot;[a-f0-9]{32}&quot;/', '&quot;HASH&quot;', $output );
};
