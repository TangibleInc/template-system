<?php
namespace tangible;

/**
 * Register background queue
 *
 * Queue must be registered to process the tasks
 *
 * @param object    config
 * @param string    config.name       Name of queue
 * @param function  config.callback   Task callback for each item
 * @param function  config.complete   Complete callback when queue is done
 * @param function  config.error      Error callback when a task callback failed
 *
 * @return $queue   Call $queue->add_items([ ... ]) to push items to queue
 */
function register_background_queue($config) {

  if (!class_exists('tangible\\BackgroundQueue')) {
    require_once __DIR__.'/class-background-queue.php';
  }

  return new Tangible\BackgroundQueue( $config );
};
