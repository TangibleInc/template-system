<?php

post_message_to_js(json_encode( 123 ));
post_message_to_js(json_encode( 'hi' ));
post_message_to_js(json_encode([
  'key' => 'value',
]));
