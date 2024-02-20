<?php
namespace tangible\html;
use tangible\html;

require_once __DIR__.'/tag.php';
require_once __DIR__.'/attributes.php';

/**
 * Render tree of nodes to string
 * @param @nodes HTML string or parsed node(s)
 * @return string
 */
function render($nodes, $options = []) {

  $html = html::$state;

  // Support Exit tag
  if ($html->exit_from_current_template) return;

  // Inherit options from tag context
  if (isset($html->tag_context['options'])) {
    $options = array_merge($options, $html->tag_context['options']);
  }

  if (is_string($nodes)) {
    $nodes = html\parse($nodes);
  } elseif (is_array($nodes)) {
    if (isset($nodes['tag'])) {
      // Single tag - render_nodes expects an array of tags
      $nodes = [ $nodes ];
    }
  } else {
    // Unknown type
    $nodes = [];
  }

  $rendered = html\render_nodes( $nodes, $options );

  return $rendered;
};

function render_nodes($nodes, $options = []) {

  $html = html::$state;

  // Support Exit tag
  if ($html->exit_from_current_template) return;

  $result = '';

  foreach ($nodes as $node) {
    $value = isset($node['tag'])
      // Dynamic or static HTML tag
      ? html\render_tag(

        $node['tag'],

        /**
         * A node may have missing properties, such as when they're crafted manually
         * or sent through AJAX request.
         */

        isset($node['attributes']) ? $node['attributes'] : [ 'keys' => [] ],
        isset($node['children']) ? $node['children'] : [],

        $options + [
          'render_attributes' => (!isset($options['render_raw']) || !$options['render_raw'])
        ]
      )
      // Text node - Encode angle brackets
      : (isset($node['text'])
        ? str_replace(['<', '>'], ['&lt;', '&gt;'], $node['text'])
        // Comment node
        : (isset($node['comment'])
          ? "<!--{$node['comment']}-->"
          : (isset($node['raw'])
            ? $node['raw'] // Special tags
            // String or unknown
            : (is_string($node) ? $node : NULL)
          )
        )
      )
    ;

    if (is_null($value)) continue;
    if (!is_string($value)) {
      $value = json_encode($value);
    }
    $result .= $value;

    // If Exit tag was called, exit from render nodes loop
    if ($html->exit_from_current_template) break;
  }

  return $result;
};


/**
 * Render to string, treating dynamic tags as "raw"
 */
function render_raw($nodes = [], $options = []) {

  return html\render($nodes, $options+[
    'render_raw' => true,
  ]);
};


/**
 * Flag to support Exit tag
 *
 * @see vendor/tangible/template/tags/exit.php
 */
$html->exit_from_current_template = false;
