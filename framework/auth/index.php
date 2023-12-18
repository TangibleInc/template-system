<?php
namespace tangible {
  use tangible\framework;
  
  class auth {
    static $state;
  }
  
  auth::$state = (object) [
    'version' => framework::$state->version,
    'path' => __DIR__,
    'url' => untrailingslashit(plugins_url('/', __FILE__)),    
  ];    
}

namespace tangible\auth {
  use tangible\auth;
  use tangible\auth\JWT;

  function load_jwt() {
    if (!class_exists(__NAMESPACE__ . '\\JWT')) {
      require_once __DIR__.'/jwt.php';
    }
  }
  
  function encode_jwt($data, $key = SECURE_AUTH_KEY) {
    auth\load_jwt();
    return JWT::encode($data, $key);
  };
  
  function decode_jwt($token, $key = SECURE_AUTH_KEY) {
    auth\load_jwt();
    return JWT::decode($token, $key);
  };  
}
