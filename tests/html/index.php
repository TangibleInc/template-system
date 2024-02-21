<?php
namespace tangible\tests\html;

require_once __DIR__ . '/common.php';

/**
 * Prepare HTML engine
 */

$html_engine = 'v1'; // TODO: Command-line option

switch ($html_engine) {
  case 'v1':
  default:
    $html = require_once __DIR__ . '/html-engine-v1.php';  
    $html_parse = 'tangible\\html\\parse';
    $html_render = 'tangible\\html\\render';
  break;
}

/**
 * Run command
 */

switch ($argv[1] ?? '') {

  case 'profile':
    require_once __DIR__ . '/profile.php';
  break;
  case 'snapshot':
    require_once __DIR__ . '/snapshot.php';
  break;
  case 'help':
  default:
?>
Usage: npm run html [command]

Commands:

profile         Run profiler
snapshot        Create snapshots of correctly parsed and rendered HTML

<?php
}
