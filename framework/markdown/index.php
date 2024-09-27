<?php
namespace tangible\markdown;

function create_compiler( $options = [] ) {

  if ( ! class_exists( 'tangible\\markdown\\ParsedownExtra' ) ) {
    /**
     * @see https://github.com/erusev/parsedown
     * @see https://github.com/erusev/parsedown-extra
     */
    require_once __DIR__ . '/Parsedown.php';
    require_once __DIR__ . '/ParsedownExtra.php';
  }

  return new class extends ParsedownExtra {

    /**
     * Support extending HTML void elements
     */
    function setClosedTags( $tag_names = [] ) {
    $this->voidElements = array_unique(
        array_merge( $this->voidElements, $tag_names )
      );
    }

    /**
     * Checklist support
     *
     * @see https://github.com/leblanc-simon/parsedown-checkbox
     */
    public $task_list_item_class          = 'task-list-item';
    public $task_list_item_checkbox_class = 'task-list-item-checkbox';

    function blockListComplete( array $block ) {

      // From original class
      if ( isset( $block['loose'] ) ) {
        foreach ( $block['element']['elements'] as &$li ) {
          if ( end( $li['handler']['argument'] ) !== '' ) {
            $li['handler']['argument'] [] = '';
          }
        }
      }

      if ( empty( $block )
        || ! isset( $block['element'] )
        || ! isset( $block['element']['name'] )
        || $block['element']['name'] !== 'ul'
        || ! isset( $block['element']['elements'] )
      ) {
        return $block;
      }

      foreach ( $block['element']['elements'] as $index => $el ) {

        if (empty( $el )
          || ! isset( $el['name'] ) || $el['name'] !== 'li'
          || ! isset( $el['handler'] ) || ! isset( $el['handler']['argument'] )
          || ! isset( $el['handler']['argument'][0] )
        ) continue;

        $text  = $el['handler']['argument'][0];
        $start = substr( $text, 0, 4 );

        if ( $start === '[ ] ' ) {

          $block['element']['elements'][ $index ]['handler']['argument'][0] =
            '<input class="' . $this->task_list_item_checkbox_class . '" type="checkbox" /> '
            . substr( $text, 4 );

          $block['element']['elements'][ $index ]['attributes'] = [
            'class' => $this->task_list_item_class,
          ];

        } elseif ( $start === '[x] ' ) {

          $block['element']['elements'][ $index ]['handler']['argument'][0] =
            '<input class="' . $this->task_list_item_checkbox_class . '" type="checkbox" checked /> '
            . substr( $text, 4 );

          $block['element']['elements'][ $index ]['attributes'] = [
            'class' => $this->task_list_item_class,
          ];
        }
      }

      return $block;
    }
  };
};
