<?php
namespace tangible\template_system;

use tangible\html;
use tangible\template_system;

/**
 * Language definition for documentation and editor integration
 * 
 * @see /elandel/editor/languages/html/autocomplete.ts
 * @see /elandel/editor/languages/format.ts
 */
function get_language_definition() {

  $html = template_system::$html;

  // TODO: These internal tags should define themselves as such
  $ignore_tags = [
    'a',
    'code',
    'img',
    'link',
    'script', 'style',
    'title',

    'Glide', // Local to Glider
    'Slide', // Local to Slider

    // 'PaginateButtons', 'PaginateFields', 'PaginateLoading', // Consolidate as Pager

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

      /**
       * Tag definition from registry
       * @see /language/html/tag
       */
      $tag = $html->tags[ $name ];

      if (!in_array($name, $ignore_tags)) {
        /**
         * TODO: Tag definitions should include:
         * 
         * - Description
         * - Tag attributes
         * - [x] Local tags
         */

        $result[ $name ] = $tag;

        if (isset($tag['local_tags'])) {
          $result[$name]['localTags'] = $result[$name]['local_tags'];
          unset($result[$name]['local_tags']);
        }
      }

      return $result;
    },
    []
  );

  $language = [
    'tags' => $tags,
    'closedTags' => html\get_all_closed_tag_names(),
    'rawTags' => html\get_all_raw_tag_names(),
  ];

  // \tangible\see($language);

  return $language;
}
