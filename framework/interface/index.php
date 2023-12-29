<?php
/**
 * Interface module removed - This is for compatibility with existing
 * plugins until they remove reference to it.
 */
namespace tangible\interfaces;

function legacy() {
  static $interface;
  return $interface ? $interface : ($interface = new class {
    function enqueue($name) {
      switch ($name) {
        case 'select':
          \tangible\select\enqueue();
        break;
      }
    }
    function register_modules() {
      \tangible\select\register();
    }
    function admin_enqueue_modules() {}
    function enqueue_modules() {}
  });
}
