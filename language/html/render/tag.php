<?php
namespace tangible\html;
use tangible\html;

$html->tag_context = [
  'local_tags' => [],
  'path' => ''
];

function render_tag($tag, $atts, $children = [], $options = []) {

  $html = html::$state;

  // Create tag context

  $parent_context = $html->tag_context;

  $local_tags = array_merge(
    isset($options['local_tags']) ? $options['local_tags'] : [],
    isset($parent_context['local_tags']) ? $parent_context['local_tags'] : []
  );

  $html->tag_context = array_merge($parent_context, [
    'tag' => $tag,
    'local_tags' => $local_tags,
    'options' => $options,
    // Passed from $html->render, can be changed by <load>
    'path' => isset($options['path']) ? $options['path'] : ''
  ]);

  $is_render_raw = isset($options['render_raw']) && $options['render_raw'];
  $is_render_raw_tag = isset($options['render_raw_tag']) && $options['render_raw_tag'];

  if (!$is_render_raw && !$is_render_raw_tag && !empty(

    // Local or global tag

    $tag_config = isset($local_tags[ $tag ]) ? $local_tags[ $tag ]
      : (isset($html->tags[ $tag ]) ? $html->tags[ $tag ] : false)

  )) {

    if (!is_array($tag_config)) $tag_config = [
      'callback' => $tag_config
    ];

    $html->tag_context = array_merge($html->tag_context, $tag_config, [
      // Inherit local tags
      'local_tags' => array_merge(
        $html->tag_context['local_tags'],
        isset($tag_config['local_tags']) ? $tag_config['local_tags'] : []
      ),
    ]);

    $callback = $tag_config['callback'];

    if ( isset($tag_config['raw']) && $tag_config['raw'] ) {

      // Raw tag - Pass unrendered content

      $content = isset($children[0]) && isset($children[0]['text'])
        ? $children[0]['text']
        : ''
      ;
      $content = $callback( $atts, $content, $html->tag_context );

    } else {

      // Dynamic tag

      /**
       * Exception to not render specific attributes
       */
      $key = 'skip_render_keys';
      if (isset($tag_config[$key])) {
        $options[$key] = $tag_config[$key];        
      }

      $attributes = html\render_attributes_to_array($atts, $options);
      $content = $callback( $attributes, $children, $html->tag_context );

      // If closed tag - supports local tags of different type (open/closed)
      if (isset($tag_config['closed']) && $tag_config['closed']) {
        if (is_null($content)) $content = '';
        elseif (!is_string($content)) $content = json_encode($content);
        $content .= html\render_nodes( $children );
      }
    }

  } else {

    // Default tag - render as HTML string

    $content = "<{$tag}";

    $attributes = trim( html\render_attributes($atts, $options) );
    if (!empty($attributes)) $content .= ' '.$attributes;

    if (html\is_closed_tag($tag)) {

      $content .= " />";

    } else {

      $inner_content = empty($children) ? ''
        : (is_array($children)
          ? html\render_nodes(
              $children,
              // Render children of raw tag?
              array_merge($options, [
                'render_raw_tag' => $is_render_raw
              ])
            )
          : (is_string($children) ? $children : '')
        )
      ;

      $content .= ">$inner_content</$tag>";
    }
  }

  // Restore context
  $html->tag_context = $parent_context;

  return $content;
};

function render_raw_tag($tag, $atts, $children = [], $options = []) {

  return html\render_tag($tag, $atts, $children, $options+[
    'render_raw_tag' => true,
  ]);
};
