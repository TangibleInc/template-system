<?php

$html->add_raw_tag('Markdown', function( $atts, $content ) use ( $html ) {
  return $html->render(
    $html->markdown( $content, $atts )
  );
});
