<?php

namespace Tangible\TemplateSystem;

use Tangible\TemplateSystem as system;
use Tangible\TemplateSystem\API as api;

class API {
  static $state;
}

api::$state = (object) [];

require_once __DIR__.'/action.php';
require_once __DIR__.'/ajax.php';
require_once __DIR__.'/response.php';
