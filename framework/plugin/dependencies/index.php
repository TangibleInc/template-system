<?php
namespace tangible\framework;
use tangible\framework;

function check_plugin_dependencies($plugin) {

  $deps = $plugin->dependencies ?? [];
  if (empty($deps)) return;

  $missing = [];

  foreach ($deps as $dep) {
    if (
      (isset($dep['active']) && !$dep['active'])
      || (isset($dep['callback']) && !$dep['callback']())
    ) {
      $missing []= $dep;
    }
  }

  if (empty($missing)) return;

  $plugin->missing_dependencies = $missing_deps;

  // Custom notice
  if (isset($plugin->missing_dependencies_notice)) {
    framework\register_admin_notice($plugin->missing_dependencies_notice);
    return;
  }

  // Default notice
  framework\register_admin_notice(function() use ($missing_deps) {
    ?>
    <div class="notice notice-warning">
      <p><b>Missing plugin dependencies for <?php echo $plugin->title; ?></b></p>
      <p><?php echo $plugin->title; ?> won't work properly until the following plugins have been installed and activated.</p>
      <p>
      <?php
        foreach ($missing_deps as $dep) {
          if (isset($dep['url'])) {
            ?><a href="<?php echo $dep['url']; ?>" target="_blank"><?php
              echo $dep['title'];
            ?></a><?php
          } else {
            echo $dep['title'];
          }
          ?><br><?php
        }
      ?>
      </p>
    </div>
    <?php
  });
}

function has_all_dependencies($plugin) {
  return empty($plugin->missing_dependencies);
}
