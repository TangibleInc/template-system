<?php
namespace tangible\template_system\editor;

use tangible\template_system;
use tangible\template_system\editor;

function enqueue_editor() {

  // $linters = editor\enqueue_linters();

  $url = editor::$state->url;
  $version = editor::$state->version;

  // Code Editor

  wp_enqueue_script(
    'tangible-template-system-editor',
    $url . '/build/editor.min.js',
    [],
    $version,
    true
  );

  wp_enqueue_style(
    'tangible-template-system-editor',
    $url . '/build/editor.min.css',
    [],
    $version
  );

  $language_definition = template_system\get_language_definition();

  /**
   * Content tags
   * @see /content/tags
   */

  $info = template_system\get_admin_route_info();
  $is_content_template_edit_screen =
    $info['type']==='tangible_content'
    && $info['edit'] // Single post edit screen
  ;

  if ($is_content_template_edit_screen) {

    $tags = []; // &$language_definition['tags'];

    foreach ([
      'LocationRule',
    ] as $key) {
      $tags[ $key ] = [ 'closed' => true ];
    }

    foreach ([
      'ContentType',
      'FieldGroup',
      'Field',
      'Key',
      'LocationRuleGroup',
      'Layout',
      'Taxonomy'
    ] as $key) {
      $tags[ $key ] = [ 'closed' => false ];
    }

    // Keep these regular tags
    foreach ([
      'If', 'Logic', 'Loop'
    ] as $key) {
      $tags[ $key ] = $language_definition['tags'][$key];
    }

    // Remove other tags
    $language_definition['tags'] = $tags;
    $language_definition['htmlTags'] = false;
  }

  /**
   * Control tags - For now in Tangible Blocks plugin
   * @see tangible-blocks/includes/block/control/template
   * @see /editor/index.ts
   */
  $language_definition['controlTags'] = [
    'Tab' => [ 'closed' => false ],
    'Section' => [ 'closed' => false ],
    'Control' => [ 'closed' => true ],  
  ];

  // Gather closed tags for code formatter
  $language_definition['closedTags'] = [];
  $all_tags = array_merge($language_definition['tags'], $language_definition['controlTags']);
  foreach ($all_tags as $name => $definition) {
    if ($definition['closed'] ?? false) {
      $language_definition['closedTags'] []= $name;
    }
  }

  wp_localize_script(
    'tangible-template-system-editor',
    'TangibleTemplateSystemEditor',
    [
      /**
       * Editor URL for themes and fonts
       * @see /editor/editor-action-panel
       */
      'editorUrl' => str_replace('/editor', '/elandel/editor', editor::$state->url),
      /**
       * Language definition
       * @see /elandel/editor/languages/html/autocomplete.ts
       * @see /language/definition.php
       */
      'languageDefinition' => $language_definition,
    ]
    
  );

}
