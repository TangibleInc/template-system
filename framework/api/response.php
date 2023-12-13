<?php
namespace tangible\api;
use tangible\api;

const ok = 200;
const bad_request = 400;
const not_found = 404;
const forbidden = 403;

// Response

function send($data = []) {

  status_header( api\ok ); 

  echo json_encode([ 'data' => $data ]);
  exit;
};

function error($data = []) {

  $error = is_string($data) ? [ 'message' => $data ] : $data;

  status_header( $error['code'] ?? api\bad_request ); 

  echo json_encode([ 'error' => $error ]);
  exit;
};
