<?php

namespace Tangible\TemplateSystem\Compile {
  /**
   * Compiler entry points (scaffold).
   *
   * This is a minimal runtime wrapper until the real PHP compiler is implemented.
   */
  final class Compiler
  {
    private const CACHE_SUBDIR = 'tangible-template-cache';
    private const POST_CACHE_META_KEY = '_tangible_template_compile_cache_key';

    // Bump when the generated code format changes, to invalidate cached files
    private const COMPILER_VERSION = 10;

    /**
     * Filters that rewrite attributes at render time. While any of these are
     * hooked, pre-baked static markup may be stale, so compiled templates
     * containing baked content fall back to the runtime renderer.
     */
    private const ATTRIBUTE_FILTERS = [
      'tangible_template_render_attributes',
      'attribute_escape', // inside esc_attr()
    ];

    public static function hasAttributeFilters(): bool
    {
      if (!function_exists('has_filter')) {
        return false;
      }
      foreach (self::ATTRIBUTE_FILTERS as $filter) {
        if (has_filter($filter)) {
          return true;
        }
      }
      return false;
    }

    public static function getCacheDir(array $options = []): string
    {
      $base = defined('WP_CONTENT_DIR') ? WP_CONTENT_DIR : sys_get_temp_dir();
      $dir = rtrim($base, '/\\') . '/' . self::CACHE_SUBDIR;

      if (function_exists('is_multisite') && is_multisite()) {
        $blogId = function_exists('get_current_blog_id') ? get_current_blog_id() : 0;
        $dir .= '/' . $blogId;
      }

      if (!empty($options['cache_dir']) && is_string($options['cache_dir'])) {
        $dir = rtrim($options['cache_dir'], '/\\');
      }

      if (function_exists('apply_filters')) {
        $dir = apply_filters('tangible_template_compile_cache_path', $dir, $options);
      }

      return $dir;
    }

    public static function ensureCacheDir(string $dir): bool
    {
      if (!is_dir($dir)) {
        if (!wp_mkdir_p($dir)) {
          return false;
        }
      }

      $indexFile = rtrim($dir, '/\\') . '/index.php';
      if (!file_exists($indexFile)) {
        @file_put_contents($indexFile, "<?php\n");
      }

      $htaccessFile = rtrim($dir, '/\\') . '/.htaccess';
      if (!file_exists($htaccessFile)) {
        @file_put_contents($htaccessFile, "Require all denied\nDeny from all\n");
      }

      return is_dir($dir) && is_writable($dir);
    }

    public static function getCacheKey(string $template, array $options = []): string
    {
      if (!empty($options['cache_key'])) {
        return (string) $options['cache_key'];
      }

      $version = $options['version'] ?? 'v1';
      $render_method = self::getRenderMethod($options);
      $source = $options['source'] ?? '';

      if ($source === '' && !empty($options['id'])) {
        $source = 'id:' . $options['id'];
      }

      /**
       * Compiled output depends on what plugins register: dynamic tags,
       * logic rules (hoisted If conditions), and loop types. Include the
       * active plugin set so (de)activations invalidate compiled files.
       */
      $plugins = function_exists('get_option')
        ? implode(',', (array) get_option('active_plugins', []))
        : '';

      $seed = self::COMPILER_VERSION . "\n" . $version . "\n" . $plugins . "\n"
        . $render_method . "\n" . $source . "\n" . $template;
      return hash('sha256', $seed);
    }

    public static function getCacheFilePath(string $cacheKey, array $options = []): string
    {
      $cacheDir = self::getCacheDir($options);
      return rtrim($cacheDir, '/\\') . "/template-{$cacheKey}.php";
    }

    public static function compileToFile(string $template, array $options = []): string
    {
      $cacheDir = self::getCacheDir($options);
      if (!self::ensureCacheDir($cacheDir)) {
        return '';
      }

      $cacheKey = self::getCacheKey($template, $options);
      $filePath = self::getCacheFilePath($cacheKey, $options);

      if (!empty($options['force']) || !file_exists($filePath)) {
        $php = self::compile($template, $options);
        if ($php === '') {
          return '';
        }
        $tmpPath = $filePath . '.tmp';

        if (@file_put_contents($tmpPath, $php) !== false) {
          @rename($tmpPath, $filePath);
          @chmod($filePath, 0644);
        }
      }

      if (file_exists($filePath)) {
        self::maybeUpdatePostCacheMeta($options, $cacheKey);
        return $filePath;
      }

      return '';
    }

    public static function compile(string $template, array $options = []): string
    {
      $nodes = \tangible\html\parse($template);

      if (empty($nodes) && trim($template) !== '') {
        return '';
      }

      $renderMethod = self::getRenderMethod($options);
      $html = \tangible_template();
      $dynamicTags = [];

      if (isset($html->tags) && is_array($html->tags)) {
        foreach ($html->tags as $tag => $_config) {
          $dynamicTags[$tag] = true;
        }
      }

      $state = [
        'counter' => 0,
        'level' => 0,
        'data' => [],
        // Baking renders static subtrees at compile time. Skip it while an
        // attribute filter is hooked, since its effects would be frozen in.
        'bake' => !self::hasAttributeFilters(),
        'baked' => false,
      ];

      $body = self::compileNodes($nodes, $dynamicTags, $state, 0);

      /**
       * The template is wrapped in a function so node data (attributes and
       * child trees) lives in a static table, materialized once per process
       * and shared by opcache, instead of being rebuilt on every render.
       */
      $fn = 'tangible_compiled_' . hash('crc32b', self::getCacheKey($template, $options));

      $lines = [];
      $lines[] = "<?php";
      $lines[] = "if (!function_exists('{$fn}')) {";
      $lines[] = "function {$fn}() {";

      if ($state['baked']) {
        // Tripwire: baked markup is only valid while no attribute filter is
        // hooked. Returning null falls back to the runtime renderer.
        $filters = array_map(
          fn($f) => "has_filter('" . $f . "')",
          self::ATTRIBUTE_FILTERS
        );
        $lines[] = '  if (' . implode(' || ', $filters) . ') { return null; }';
      }

      /**
       * Node data table, materialized once per process. Always present:
       * loop-body closures capture it unconditionally. Initialized lazily
       * because entries may contain stdClass values (pre-decoded loop
       * items), which are not valid in static constant expressions.
       */
      $lines[] = '  static $__data = null;';
      $lines[] = '  if ($__data === null) {';
      $lines[] = '    $__data = [';
      foreach ($state['data'] as $i => $value) {
        $lines[] = '      ' . var_export($value, true) . ',';
      }
      $lines[] = '    ];';
      $lines[] = '  }';

      $lines[] = '  $__html = \\tangible_template();';

      if ($renderMethod === 'render_with_catch_exit') {
        $lines[] = '  $__previous_inside = $__html->is_inside_catch_tag;';
        $lines[] = '  $__html->is_inside_catch_tag = true;';
      }

      $lines[] = '  $__out = \'\';';
      $lines = array_merge($lines, $body);

      if ($renderMethod === 'render_with_catch_exit') {
        $lines[] = '  $__html->is_inside_catch_tag = $__previous_inside;';
        $lines[] = '  $__html->exit_from_current_template = false;';
      }

      $lines[] = '  return $__out;';
      $lines[] = '}';
      $lines[] = '}';
      $lines[] = "return {$fn}();";

      return implode("\n", $lines) . "\n";
    }

    public static function render(string $template, array $context = [], array $options = []): string
    {
      $html = \tangible_template();
      $previousVariables = $html->variable_type_memory['variable'] ?? null;
      $previousInsideCatch = $html->is_inside_catch_tag ?? false;
      $renderMethod = self::getRenderMethod($options);

      self::applyContext($html, $context);

      $compiledFile = self::compileToFile($template, $options);
      $output = '';

      if (!empty($compiledFile)) {
        try {
          $output = include $compiledFile;
        } catch (\Throwable $th) {
          // Restore render state the compiled file may have left mid-change
          $html->is_inside_catch_tag = $previousInsideCatch;
          $html->exit_from_current_template = false;
          $output = null;

          if (function_exists('do_action')) {
            do_action('tangible_template_compile_render_error', $th, $compiledFile, $options);
          }
          if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log(
              'Tangible Template System: Compiled template failed, falling back to runtime render: '
              . $th->getMessage()
            );
          }
        }
      }

      if (!is_string($output)) {
        $renderer = '\\tangible\\html\\' . $renderMethod;
        if (is_callable($renderer)) {
          $output = $renderer($template);
        } else {
          $output = \tangible_template($template);
        }
      }

      if (is_array($previousVariables)) {
        $html->variable_type_memory['variable'] = $previousVariables;
      }

      return $output;
    }

    public static function deleteCacheFile(string $cacheKey, array $options = []): bool
    {
      if ($cacheKey === '') {
        return false;
      }

      $filePath = self::getCacheFilePath($cacheKey, $options);
      if (file_exists($filePath)) {
        return (bool) @unlink($filePath);
      }

      return false;
    }

    public static function deleteCacheForPost($postId, array $options = []): bool
    {
      if (empty($postId) || !function_exists('get_post_meta')) {
        return false;
      }

      if (!isset($options['post_id'])) {
        $options['post_id'] = $postId;
      }

      $metaKey = self::POST_CACHE_META_KEY;
      $cacheKey = get_post_meta($postId, $metaKey, true);

      if (!empty($cacheKey)) {
        self::deleteCacheFile($cacheKey, $options);
        if (function_exists('delete_post_meta')) {
          delete_post_meta($postId, $metaKey);
        }
        return true;
      }

      return false;
    }

    public static function clearCache(array $options = []): int
    {
      $cacheDir = self::getCacheDir($options);
      if (!is_dir($cacheDir)) {
        return 0;
      }

      $patterns = [
        rtrim($cacheDir, '/\\') . '/template-*.php',
        rtrim($cacheDir, '/\\') . '/template-*.php.tmp',
      ];
      $count = 0;

      foreach ($patterns as $pattern) {
        foreach (glob($pattern) ?: [] as $file) {
          if (is_file($file) && @unlink($file)) {
            $count++;
          }
        }
      }

      if (function_exists('delete_post_meta_by_key')) {
        delete_post_meta_by_key(self::POST_CACHE_META_KEY);
      }

      return $count;
    }

    private static function maybeUpdatePostCacheMeta(array $options, string $cacheKey): void
    {
      if (empty($options['post_id']) || !function_exists('update_post_meta')) {
        return;
      }

      $postId = $options['post_id'];
      $metaKey = self::POST_CACHE_META_KEY;

      if (function_exists('get_post_meta')) {
        $current = get_post_meta($postId, $metaKey, true);
        if ($current === $cacheKey) {
          return;
        }
      }

      update_post_meta($postId, $metaKey, $cacheKey);
    }

    /**
     * Without opcache, including the compiled file re-parses it on every
     * render and benchmarks slower than the runtime renderer, so the
     * template post and Load integrations require opcache.
     * @see tests/compile-php/benchmark.php
     */
    public static function isOpcacheEnabled(): bool
    {
      if (!function_exists('opcache_get_status')) {
        return false;
      }

      $ini_key = PHP_SAPI === 'cli' ? 'opcache.enable_cli' : 'opcache.enable';
      return filter_var(ini_get($ini_key), FILTER_VALIDATE_BOOLEAN);
    }

    /**
     * Compile <If> to a native branch. The condition is still evaluated by
     * the runtime (render_attributes_to_array + evaluate_if_tag_attributes,
     * exactly what the If tag callback does), so condition semantics are
     * never reimplemented - only the dispatch and branch interpretation are.
     * The Else split is deterministic node manipulation, done at compile
     * time via the same runtime helper.
     *
     * Bails (returns null) for keyword forms like <If loop exists> or
     * <If not ...> (keys present) and for branches still containing Else
     * nodes at any depth, which rely on If's local-tag context.
     */
    private static function compileIfTag(
      array $atts,
      array $children,
      array $dynamicTags,
      array &$state,
      int $level
    ): ?array {
      if (($atts['keys'] ?? null) !== []) {
        return null;
      }

      $html = \tangible_template();
      if (!isset($html->get_true_false_branches)) {
        return null;
      }

      $branches = $html->get_true_false_branches($children);
      if (
        self::containsTag($branches['true'], 'Else')
        || self::containsTag($branches['false'], 'Else')
      ) {
        return null;
      }

      $skipKeys = $html->tags['If']['skip_render_keys'] ?? [];

      $indent = str_repeat('  ', $level);

      /**
       * For brace-free static attributes, parsing the condition into logic
       * rule groups is deterministic, so it runs once at compile time and
       * only evaluate_logic_token_rule_groups runs per render. Rule
       * registration depends on active plugins, which are part of the cache
       * key. Conditions with {...} attribute values parse per render.
       */
      $hoistParse = !isset($atts['debug'])
        && self::hasStaticAttributes([ 'attributes' => $atts ])
        && isset($html->parse_if_tag_logic);

      $lines = [];
      $lines[] = $indent . 'if (empty($__html->tag_context[\'local_tags\'][\'If\'])) {';

      if ($hoistParse) {
        $rendered = $atts;
        if (!isset($rendered['keys'])) {
          $rendered['keys'] = [];
        }
        $parsedRules = $html->parse_if_tag_logic($rendered);

        $lines[] = $indent . '  if (($__html->evaluate_logic_token_rule_groups)('
          . self::dataRef($parsedRules, $state)
          . ', '
          . self::dataRef($rendered, $state)
          . ')) {';
      } else {
        $attsVar = '$__ifatts' . (++$state['counter']);
        $lines[] = $indent . "  {$attsVar} = \\tangible\\html\\render_attributes_to_array("
          . self::dataRef($atts, $state)
          . ', [\'render_attributes\' => true, \'skip_render_keys\' => '
          . self::dataRef($skipKeys, $state)
          . ']);';
        $lines[] = $indent . "  if ((\$__html->evaluate_if_tag_attributes)({$attsVar})) {";
      }
      if (!empty($branches['true'])) {
        $lines = array_merge(
          $lines,
          self::compileNodes($branches['true'], $dynamicTags, $state, $level + 2)
        );
      }
      $lines[] = $indent . '  } else {';
      if (!empty($branches['false'])) {
        $lines = array_merge(
          $lines,
          self::compileNodes($branches['false'], $dynamicTags, $state, $level + 2)
        );
      }
      $lines[] = $indent . '  }';
      $lines[] = $indent . '} else {';
      $lines[] = $indent . '  $__value = \\tangible\\html\\render_tag(\'If\', '
        . self::dataRef($atts, $state) . ', ' . self::dataRef($children, $state)
        . ', [\'render_attributes\' => true]);';
      $lines[] = $indent . '  if ($__value !== null) {';
      $lines[] = $indent . '    if (!is_string($__value)) { $__value = json_encode($__value); }';
      $lines[] = $indent . '    $__out .= $__value;';
      $lines[] = $indent . '  }';
      $lines[] = $indent . '}';

      return $lines;
    }

    private static function containsTag($nodes, string $tag): bool
    {
      if (!is_array($nodes)) {
        return false;
      }
      foreach ($nodes as $node) {
        if (!is_array($node)) {
          continue;
        }
        if (($node['tag'] ?? null) === $tag) {
          return true;
        }
        if (self::containsTag($node['children'] ?? [], $tag)) {
          return true;
        }
      }
      return false;
    }

    /**
     * Pre-decode a static items attribute at compile time, using the same
     * format\multiple_values the runtime uses (it returns arrays untouched,
     * so the decoded value passes through unchanged). Skipped when the
     * value would be template-rendered at runtime ({...} expressions
     * outside JSON form) or when the loop attributes filter is hooked,
     * since a filter could expect the original string.
     */
    private static function hoistLoopItems(array $atts): array
    {
      if (
        !isset($atts['items'])
        || !is_string($atts['items'])
        || (function_exists('has_filter') && has_filter('tangible_loop_tag_attributes'))
      ) {
        return $atts;
      }

      $items = $atts['items'];
      $would_render = \tangible\html\should_render_attribute('items', $items)
        && strpbrk($items, '{}') !== false;

      if ($would_render) {
        return $atts;
      }

      $atts['items'] = \tangible\format\multiple_values($items);
      return $atts;
    }

    /**
     * Loop attributes that change how the tag uses its children (wrapping
     * them, extracting variables, passing them to the paginator) - those
     * forms keep node children instead of a compiled closure.
     */
    private static function canCompileLoopBody(array $atts): bool
    {
      foreach (['logic', 'query', 'instance', 'paginator', 'page', 'paged', 'variable_types'] as $key) {
        if (array_key_exists($key, $atts)) {
          return false;
        }
        if (in_array($key, $atts['keys'] ?? [], true)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Native-PHP codegen for a strict whitelist of simple tag shapes.
     * Returns null for anything outside the whitelist, deferring to the
     * runtime render_tag call. Each shape's semantics are pinned by parity
     * fixtures (get-set-variable, get-set-local, get-variable-array).
     */
    private static function compileInlineTag(
      string $tag,
      array $atts,
      array $children,
      string $indent,
      array &$state
    ): ?array {
      if ($tag === 'Field') {
        return self::compileInlineField($atts, $children, $indent, $state);
      }
      if ($tag !== 'Get' || !empty($children)) {
        return null;
      }

      // Exactly <Get variable=NAME /> or <Get local=NAME />, nothing else
      if (($atts['keys'] ?? null) !== []) {
        return null;
      }
      $rest = $atts;
      unset($rest['keys']);
      if (count($rest) !== 1) {
        return null;
      }

      $type = array_key_first($rest);
      $name = $rest[$type];
      if (
        ($type !== 'variable' && $type !== 'local')
        || !is_string($name) || $name === '' || strpbrk($name, '{}') !== false
      ) {
        return null;
      }

      $exported = var_export($name, true);
      $lines = [];

      if ($type === 'variable') {
        // @see language/tags/get-set/variable.php 'get'
        $lines[] = $indent . "\$__value = \$__html->variable_type_memory['variable'][{$exported}] ?? '';";
      } else {
        // @see language/tags/get-set/local.php 'get': scope chain, null when absent
        $lines[] = $indent . '$__value = null;';
        $lines[] = $indent . 'foreach ($__html->local_variable_scopes as $__scope) {';
        $lines[] = $indent . "  if (isset(\$__scope[{$exported}])) { \$__value = \$__scope[{$exported}]; break; }";
        $lines[] = $indent . '}';
        $lines[] = $indent . "if (\$__value === null) { \$__value = ''; }";
      }

      // Closed-tag handling in render_tag: non-string values are JSON-encoded
      $lines[] = $indent . 'if (!is_string($__value)) { $__value = json_encode($__value); }';
      $lines[] = $indent . '$__out .= $__value;';

      return $lines;
    }

    /**
     * Field delegates wholesale to the runtime field_tag closure - all
     * resolution, format, and integration semantics stay runtime - and only
     * the render_tag dispatch is skipped. field_tag reads no tag context.
     * Requires brace-free static attributes, since render_attributes_to_array
     * is a no-op for those (verified: values pass through unchanged and only
     * a 'keys' default is added).
     */
    private static function compileInlineField(
      array $atts,
      array $children,
      string $indent,
      array &$state
    ): ?array {
      if (!empty($children)) {
        return null;
      }
      if (!self::hasStaticAttributes([ 'attributes' => $atts ])) {
        return null;
      }

      $rendered = $atts;
      if (!isset($rendered['keys'])) {
        $rendered['keys'] = [];
      }

      $renderedRef = self::dataRef($rendered, $state);
      $attsRef = self::dataRef($atts, $state);

      $lines = [];
      $lines[] = $indent . 'if (empty($__html->tag_context[\'local_tags\'][\'Field\'])) {';
      $lines[] = $indent . "  \$__value = (\$__html->field_tag)({$renderedRef});";
      $lines[] = $indent . '} else {';
      $lines[] = $indent . '  $__value = \\tangible\\html\\render_tag(\'Field\', '
        . $attsRef . ', [], [\'render_attributes\' => true]);';
      $lines[] = $indent . '}';
      $lines[] = $indent . 'if ($__value !== null) {';
      $lines[] = $indent . '  if (!is_string($__value)) { $__value = json_encode($__value); }';
      $lines[] = $indent . '  $__out .= $__value;';
      $lines[] = $indent . '}';

      return $lines;
    }

    private static function dataRef($value, array &$state): string
    {
      $index = count($state['data']);
      $state['data'][] = $value;
      return '$__data[' . $index . ']';
    }

    private static function getRenderMethod(array $options): string
    {
      $renderMethod = $options['render_method'] ?? 'render_with_catch_exit';
      if (!in_array($renderMethod, ['render', 'render_with_catch_exit'], true)) {
        $renderMethod = 'render_with_catch_exit';
      }
      return $renderMethod;
    }

    private static function applyContext($html, array $context): void
    {
      if (empty($context)) {
        return;
      }

      foreach ($context as $key => $value) {
        if (!is_string($key) || $key === '') {
          continue;
        }

        $html->set_variable_type('variable', $key, $value, [
          'render' => false,
          'trim' => false,
        ]);
      }
    }

    private static function compileNodes(
      array $nodes,
      array $dynamicTags,
      array &$state,
      int $level
    ): array {
      $lines = [];
      $indent = str_repeat('  ', $level + 1);
      $exitVar = '$__exit' . $level;

      $lines[] = $indent . "{$exitVar} = false;";

      // Consecutive static nodes are rendered once at compile time and
      // emitted as a single string literal. Static markup cannot trigger
      // Exit, so one exit-flag check guards the whole run.
      $staticRun = [];
      $flush = function () use (&$staticRun, &$lines, &$state, $indent, $exitVar) {
        if (empty($staticRun)) {
          return;
        }
        $rendered = self::renderStatic($staticRun);
        $staticRun = [];
        if ($rendered === '') {
          return;
        }
        $state['baked'] = true;
        $lines[] = $indent . "if (!{$exitVar}) {";
        $lines[] = $indent . '  $__out .= ' . var_export($rendered, true) . ';';
        $lines[] = $indent . "}";
      };

      foreach ($nodes as $node) {
        if ($state['bake'] && self::isStaticNode($node, $dynamicTags)) {
          $staticRun[] = $node;
          continue;
        }
        $flush();
        $lines[] = $indent . "if (!{$exitVar}) {";
        $lines = array_merge(
          $lines,
          self::compileNode($node, $dynamicTags, $state, $level + 2)
        );
        $lines[] = $indent . "}";
      }
      $flush();

      return $lines;
    }

    /**
     * A node is static when rendering it cannot depend on render-time
     * state: not a registered dynamic tag, no tag-attributes, no {...}
     * expressions in attribute values, and all children static.
     */
    private static function isStaticNode($node, array $dynamicTags): bool
    {
      if (is_string($node)) {
        return true;
      }
      if (!is_array($node)) {
        return false;
      }
      if (isset($node['text']) || isset($node['comment']) || isset($node['raw'])) {
        return true;
      }
      if (!isset($node['tag'])) {
        return false;
      }
      if (isset($dynamicTags[$node['tag']])) {
        return false;
      }

      if (!self::hasStaticAttributes($node)) {
        return false;
      }

      foreach (($node['children'] ?? []) as $child) {
        if (!self::isStaticNode($child, $dynamicTags)) {
          return false;
        }
      }

      return true;
    }

    private static function hasStaticAttributes(array $node): bool
    {
      foreach (($node['attributes'] ?? []) as $key => $value) {
        if ($key === 'tag-attributes') {
          return false;
        }
        if ($key === 'keys') {
          foreach ((array) $value as $name) {
            if (!is_string($name) || $name === 'tag-attributes' || strpbrk($name, '{}') !== false) {
              return false;
            }
          }
          continue;
        }
        if (!is_string($value) || strpbrk($value, '{}') !== false) {
          return false;
        }
      }
      return true;
    }

    /**
     * Render static nodes through the real runtime renderer at compile time,
     * in a neutral context, so baked output is byte-identical to runtime.
     */
    private static function renderStatic(array $nodes): string
    {
      $html = \tangible_template();
      $previousContext = $html->tag_context;
      $previousExit = $html->exit_from_current_template;

      $html->tag_context = [ 'local_tags' => [], 'path' => '' ];
      $html->exit_from_current_template = false;

      $out = \tangible\html\render_nodes($nodes);

      $html->tag_context = $previousContext;
      $html->exit_from_current_template = $previousExit;

      return is_string($out) ? $out : '';
    }

    private static function compileNode(
      $node,
      array $dynamicTags,
      array &$state,
      int $level
    ): array {
      $lines = [];
      $indent = str_repeat('  ', $level);
      $exitVar = '$__exit' . ($level - 2);

      if (is_string($node)) {
        $lines[] = $indent . '$__out .= ' . var_export($node, true) . ';';
      } elseif (is_array($node)) {
        if (isset($node['text'])) {
          $text = str_replace(['<', '>'], ['&lt;', '&gt;'], $node['text']);
          $lines[] = $indent . '$__out .= ' . var_export($text, true) . ';';
        } elseif (isset($node['comment'])) {
          $lines[] = $indent . '$__out .= ' . var_export('<!--' . $node['comment'] . '-->', true) . ';';
        } elseif (isset($node['raw'])) {
          $lines[] = $indent . '$__out .= ' . var_export($node['raw'], true) . ';';
        } elseif (isset($node['tag'])) {
          $tag = $node['tag'];
          $atts = $node['attributes'] ?? [ 'keys' => [] ];
          $children = $node['children'] ?? [];

          if (isset($dynamicTags[$tag])) {
            $inlined = self::compileInlineTag($tag, $atts, $children, $indent, $state);
            if ($inlined !== null) {
              $lines = array_merge($lines, $inlined);
            } elseif (
              $tag === 'If'
              && ($ifLines = self::compileIfTag($atts, $children, $dynamicTags, $state, $level)) !== null
            ) {
              $lines = array_merge($lines, $ifLines);
            } elseif ($tag === 'Loop' && !empty($children) && self::canCompileLoopBody($atts)) {
              /**
               * Loop bodies compile to closures: the runtime Loop tag keeps
               * all of its semantics (context, queries, pagination gates)
               * and html\render() executes the closure once per item instead
               * of interpreting the child nodes. Local tag overrides of Loop
               * may inspect children, so they receive the node tree instead.
               */
              $attsRef = self::dataRef(self::hoistLoopItems($atts), $state);
              $childrenRef = self::dataRef($children, $state);

              $lines[] = $indent . 'if (empty($__html->tag_context[\'local_tags\'][\'Loop\'])) {';
              $lines[] = $indent . '  $__value = \\tangible\\html\\render_tag(\'Loop\', '
                . $attsRef . ', function () use ($__html, $__data) {';
              $lines[] = $indent . "    if (\$__html->exit_from_current_template) { return ''; }";
              $lines[] = $indent . '    $__out = \'\';';
              $lines = array_merge(
                $lines,
                self::compileNodes($children, $dynamicTags, $state, $level + 2)
              );
              $lines[] = $indent . '    return $__out;';
              $lines[] = $indent . '  }, [\'render_attributes\' => true]);';
              $lines[] = $indent . '} else {';
              $lines[] = $indent . '  $__value = \\tangible\\html\\render_tag(\'Loop\', '
                . $attsRef . ', ' . $childrenRef . ', [\'render_attributes\' => true]);';
              $lines[] = $indent . '}';
              $lines[] = $indent . 'if ($__value !== null) {';
              $lines[] = $indent . '  if (!is_string($__value)) {';
              $lines[] = $indent . '    $__value = json_encode($__value);';
              $lines[] = $indent . '  }';
              $lines[] = $indent . '  $__out .= $__value;';
              $lines[] = $indent . '}';
            } else {
              $lines[] = $indent . '$__value = \\tangible\\html\\render_tag('
                . var_export($tag, true)
                . ', '
                . self::dataRef($atts, $state)
                . ', '
                . self::dataRef($children, $state)
                . ', [\'render_attributes\' => true]'
                . ');';
              $lines[] = $indent . 'if ($__value !== null) {';
              $lines[] = $indent . '  if (!is_string($__value)) {';
              $lines[] = $indent . '    $__value = json_encode($__value);';
              $lines[] = $indent . '  }';
              $lines[] = $indent . '  $__out .= $__value;';
              $lines[] = $indent . '}';
            }
          } elseif ($state['bake'] && self::hasStaticAttributes($node)) {
            /**
             * Static-attribute HTML wrapper around dynamic children: bake
             * the opening and closing strings at compile time. Skipping the
             * tag-context update is unobservable here - dynamic children
             * overwrite the context's tag for themselves, and the only other
             * reader is the attributes filter, covered by the tripwire.
             */
            $state['baked'] = true;

            $attrString = trim((string) \tangible\html\render_attributes($atts));
            $open = '<' . $tag . ($attrString !== '' ? ' ' . $attrString : '');

            if (\tangible\html\is_closed_tag($tag)) {
              $lines[] = $indent . '$__out .= ' . var_export($open . ' />', true) . ';';
            } else {
              $lines[] = $indent . '$__out .= ' . var_export($open . '>', true) . ';';
              if (!empty($children)) {
                $lines = array_merge(
                  $lines,
                  self::compileNodes($children, $dynamicTags, $state, $level)
                );
              }
              $lines[] = $indent . '$__out .= ' . var_export('</' . $tag . '>', true) . ';';
            }
          } else {
            $contextVar = '$__context' . (++$state['counter']);
            $attrsVar = '$__attrs' . (++$state['counter']);
            $attrStrVar = '$__attr_str' . (++$state['counter']);

            $lines[] = $indent . "{$contextVar} = \$__html->tag_context;";
            $lines[] = $indent . '$__html->tag_context = array_merge('
              . $contextVar
              . ', [\'tag\' => '
              . var_export($tag, true)
              . ', \'local_tags\' => ('
              . $contextVar
              . '[\'local_tags\'] ?? []), \'options\' => [], \'path\' => ('
              . $contextVar
              . '[\'path\'] ?? \'\')]);';
            $lines[] = $indent . '$__out .= ' . var_export('<' . $tag, true) . ';';
            $lines[] = $indent . "{$attrsVar} = " . self::dataRef($atts, $state) . ';';
            $lines[] = $indent . "{$attrStrVar} = \\tangible\\html\\render_attributes({$attrsVar});";
            $lines[] = $indent . "if ({$attrStrVar} !== '') {";
            $lines[] = $indent . "  \$__out .= ' ' . {$attrStrVar};";
            $lines[] = $indent . "}";

            $lines[] = $indent . 'if (\\tangible\\html\\is_closed_tag('
              . var_export($tag, true)
              . ')) {';
            $lines[] = $indent . "  \$__out .= ' />';";
            $lines[] = $indent . '} else {';
            $lines[] = $indent . "  \$__out .= '>';";
            if (!empty($children)) {
              $lines = array_merge(
                $lines,
                self::compileNodes($children, $dynamicTags, $state, $level)
              );
            }
            $lines[] = $indent . "  \$__out .= " . var_export('</' . $tag . '>', true) . ';';
            $lines[] = $indent . '}';
            $lines[] = $indent . '$__html->tag_context = ' . $contextVar . ';';
          }
        }
      }

      $lines[] = $indent . "if (\$__html->exit_from_current_template) { {$exitVar} = true; }";

      return $lines;
    }
  }
}

namespace {
  if (!function_exists('tangible_template_compile')) {
    function tangible_template_compile(string $template, array $options = []): string
    {
      return \Tangible\TemplateSystem\Compile\Compiler::compile($template, $options);
    }
  }

  if (!function_exists('tangible_template_compile_render')) {
    function tangible_template_compile_render(
      string $template,
      array $context = [],
      array $options = []
    ): string {
      return \Tangible\TemplateSystem\Compile\Compiler::render($template, $context, $options);
    }
  }
}
