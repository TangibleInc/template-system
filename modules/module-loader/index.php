<?php
/**
 * Module loader
 *
 * Supports dynamically loading module assets (scripts and styles),
 * for example when page builders fetch and insert HTML for preview.
 *
 * Dynamic modules are expected to:
 * - Render an element with
 *   - class="tangible-dynamic-module"
 *   - data-tangible-dynamic-module="$module-name"
 * - Register script and style under tangible-{$module-name}
 */

namespace tangible\template_system\module_loader;
use tangible\framework;
use tangible\template_system;
use tangible\template_system\module_loader;

function register() {
  $url = template_system::$state->url . '/modules/module-loader';
  $version = template_system::$state->version;
  
  wp_register_script(
    'tangible-module-loader',
    "{$url}/build/module-loader.min.js",
    [ 'jquery' ],
    $version,
    true
  );
}

function enqueue() {
  wp_enqueue_script('tangible-module-loader');
}

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\register', 0 );
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\register', 0 );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\register', 0 );

$html->module_loader_script_registered = false;

$html->register_module_loader_script = function() use ( $html ) {

  $html->module_loader_script_registered = true;

  $url = framework\module_url( __FILE__ ) . '/build';
  $version = template_system::$state->version;

  wp_register_script(
    'tangible-module-loader',
    "{$url}/module-loader.min.js",
    [ 'jquery' ],
    $version
  );
};

add_action( 'wp_enqueue_scripts', $html->register_module_loader_script, 0 );
add_action( 'admin_enqueue_scripts', $html->register_module_loader_script, 0 );
add_action( 'enqueue_block_assets', $html->register_module_loader_script, 0 );
add_action( 'enqueue_block_editor_assets', $html->register_module_loader_script, 0 );

$html->dynamic_modules = [
  // name: { assets: string | string[], depend?: [] }
];

$html->register_dynamic_module = function($name, $config) use ( $html ) {
  $html->dynamic_modules[ $name ] = $config;
};

// Enqueue

$html->module_loader_enqueued = false;

$html->enqueue_module_loader = function() use ( $html ) {

  if ($html->module_loader_enqueued) return;
  $html->module_loader_enqueued = true;
  if (!$html->module_loader_script_registered) {
    $html->register_module_loader_script();
  }

  wp_enqueue_script('tangible-module-loader');
};

$html->module_loader_data_enqueued = false;

function register_default_dynamic_modules() {

  $html = template_system::$html;

  // Automatically register Tangible modules

  global $wp_scripts, $wp_styles;

  foreach ($wp_scripts->registered as $slug => $script) {

    if (substr($slug, 0, 9)!=='tangible-') continue;
    $module_name = substr($slug, 9);

    if (isset($html->dynamic_modules[ $module_name ])
      || $module_name==='module-loader' // Ignore self
    ) continue;

    $html->dynamic_modules[ $module_name ] = [
      'assets' => [
        $script->src
      ],
      'version' => $script->ver,
      'deps' => $script->deps
    ];
  }

  foreach ($wp_styles->registered as $slug => $style) {
    if (substr($slug, 0, 9)!=='tangible-') continue;
    $module_name = substr($slug, 9);
    // tangible\see( $module_name, $script );
    $asset = [
      'assets' => [ $style->src ],
      'version' => $style->ver
    ];
    if (isset($html->dynamic_modules[ $module_name ])) {
      // Style have higher priority than script
      array_unshift( $html->dynamic_modules[ $module_name ]['assets'], $style->src );
    } else {
      $html->dynamic_modules[ $module_name ] = $asset;
    }
  }

  // Dependencies

  foreach ($html->dynamic_modules as $key => &$module) {
    if (!isset($module['deps'])) continue;
    $deps = $module['deps'];
    unset($module['deps']);

    $module['depend'] = [];

    foreach ($deps as $dep) {
      if ($dep==='jquery') continue;
      if (substr($dep, 0, 9)!=='tangible-') continue;
      $dep_name = substr($dep, 9);
      if (isset($html->dynamic_modules[ $dep_name ])) {
        foreach ($html->dynamic_modules[ $dep_name ]['assets'] as $asset) {
          $module['depend'] []= $asset;
        }
      }
    }
  }

  return $html->dynamic_modules;
}

$html->enqueue_module_loader_data = function() use ( $html ) {

  if ($html->module_loader_data_enqueued) return;
  $html->module_loader_data_enqueued = true;

  $dynamic_modules = module_loader\register_default_dynamic_modules();

  // tangible\see($html->dynamic_modules);

  wp_add_inline_script(
    'tangible-module-loader',
    'window.Tangible = window.Tangible || {}; window.Tangible.modules = ' . json_encode( $dynamic_modules ),
    'before'
  );
};

add_action( 'wp_enqueue_scripts', $html->enqueue_module_loader_data, 99 );
add_action( 'admin_enqueue_scripts', $html->enqueue_module_loader_data, 99 );
add_action( 'enqueue_block_assets', $html->enqueue_module_loader_data, 99 );
add_action( 'enqueue_block_editor_assets', $html->enqueue_module_loader_data, 99 );
