<?php
$html = tangible_template();
$captured = json_encode( $html->scheduled_meta_tags ?? [] );
$html->scheduled_meta_tags = [];
return $captured;
