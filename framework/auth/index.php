<?php
namespace Tangible\Auth;
use Tangible\JWT as jwt;

function load() {
  if (!class_exists(__NAMESPACE__ . '\\JWT')) {
    require_once __DIR__.'/jwt.php';
  }
}

function encode_jwt($data, $key = SECURE_AUTH_KEY) {
  jwt\load();
  return jwt::encode($data, $key);
};

function decode_jwt($token, $key = SECURE_AUTH_KEY) {
  jwt\load();
  return jwt::decode($token, $key);
};
