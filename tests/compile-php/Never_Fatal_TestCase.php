<?php
namespace Tests\CompilePhp;

/**
 * Malformed, hostile, or edge-case templates must never throw - rendering
 * degrades gracefully or produces odd output, but a template author cannot
 * fatal a production page. Covers the category behind forum thread #1315,
 * where an unresolved nested-brace expression reached mb_substr as a
 * string length and threw a TypeError on PHP 8.
 */
class Never_Fatal_TestCase extends \WP_UnitTestCase {

  function corpus() {
    return [
      'unclosed dynamic tag' => '<If variable=x value=1>never closed',
      'unopened close tag' => 'stray </If> close',
      'unclosed html in loop' => '<Loop items=\'[{"v":"a"}]\'><div><Field v /></Loop>',
      'nested braces in brace context' => '<div data-x="{Format length=\'{Get s}\'}abc{/Format}"></div>',
      'non-numeric format args' => '<Format length=oops offset=bad words=nope>abcdef</Format>',
      'non-numeric loop count' => '<Loop items=\'[{"v":"a"}]\' count=banana><Field v /></Loop>',
      'broken items json' => '<Loop items=\'[{"v":"a",]\'><Field v /></Loop>',
      'unknown loop type' => '<Loop type=does_not_exist_xyz><Field title /></Loop>',
      'bare field' => '<Field />',
      'bare get and set' => '<Get /><Set></Set>',
      'if with no condition' => '<If>just content<Else />other</If>',
      'else without if' => 'before <Else /> after',
      'switch with no check' => '<Switch><When value=1 />one<When />other</Switch>',
      'math with garbage' => '<Math>1 + </Math><Math>banana * 2</Math>',
      'date with garbage' => '<Date format="Y-m-d">not a date at all</Date>',
      'brace soup in attributes' => '<div class="{{{Field title}}}" data-y="{Unclosed">x</div>',
      'deeply nested loops' => str_repeat('<Loop items=\'[{"v":"a"}]\'>', 12) . '<Field v />' . str_repeat('</Loop>', 12),
      'format chain mismatch' => '<Format case=kebab><Format length=2>ab</Format>',
      'huge attribute value' => '<div data-big="' . str_repeat('x', 100000) . '">ok</div>',
      'null bytes and controls' => "<div>a\0b\x01c</div>",
    ];
  }

  /**
   * @group compile-php
   */
  function test_corpus_never_throws() {

    $html = tangible_template();
    $html->set_variable_type('variable', 's', '5', [ 'render' => false, 'trim' => false ]);
    $html->set_variable_type('variable', 'x', '1', [ 'render' => false, 'trim' => false ]);

    foreach ($this->corpus() as $label => $template) {

      try {
        $out = tangible_template($template);
        $this->assertTrue(true, $label . ' runtime');
      } catch (\Throwable $th) {
        $this->fail(sprintf(
          '%s: runtime render threw %s: %s @ %s:%d',
          $label, get_class($th), $th->getMessage(), basename($th->getFile()), $th->getLine()
        ));
      }

      if (!function_exists('tangible_template_compile_render')) {
        continue;
      }

      try {
        $out = tangible_template_compile_render($template, [], [
          'version' => 'never-fatal',
          'source' => 'never-fatal:' . $label,
        ]);
        $this->assertTrue(true, $label . ' compiled');
      } catch (\Throwable $th) {
        $this->fail(sprintf(
          '%s: compiled render threw %s: %s @ %s:%d',
          $label, get_class($th), $th->getMessage(), basename($th->getFile()), $th->getLine()
        ));
      }
    }
  }
}
