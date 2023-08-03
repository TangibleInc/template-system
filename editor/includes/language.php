<?php

namespace Tangible\TemplateSystem\Editor;

use Tangible\TemplateSystem\Editor as editor;

function get_language_definition() {

  $html = editor::$html;

  // TODO: These internal tags should define themselves as such
  $ignore_tags = [
    'a',
    'code',
    'img',
    'link',
    'script', 'style',
    'title',

    'Glide', // TODO: Local to Glider
    'Slide', // TODO: Local to Slider

    'PaginateButtons', 'PaginateFields', 'PaginateLoading', // TODO: Consolidate as Paginate

    'PopContext',
    'PushContext',
    'Raw',
    'Path',
  ];

  $tagNames = array_keys($html->tags);
  sort($tagNames);

  $tags = array_reduce(
    $tagNames,
    function($result, $name) use ($html, $ignore_tags) {

      $tag = $html->tags[ $name ];

      if (!in_array($name, $ignore_tags)) {
        /**
         * TODO: Tag definitions should include:
         * 
         * - Description
         * - Tag attributes
         * - Local tags
         */
        $result[ $name ] = $tag;
      }

      return $result;
    },
    []
  );

  $language = [
    'tags' => $tags,
  ];

  // tangible()->see($language);

  return $language;
}
