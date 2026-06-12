import { test, is, ok, run } from 'testra'
import { getServer } from '../common.ts'
import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

type Fixture = {
  slug: string
  template: string
  expected: string
  context: Record<string, unknown>
  setup?: string
  capture?: string
  normalize?: string
}

// Under the roller bundler import.meta.url points at the eval context,
// so fall back to the working directory when that path doesn't exist.
const fixturesDirFromUrl = fileURLToPath(new URL('./fixtures', import.meta.url))
const fixturesDir = existsSync(fixturesDirFromUrl)
  ? fixturesDirFromUrl
  : path.join(process.cwd(), 'tests', 'compile-php', 'fixtures')

async function loadFixtures(): Promise<Fixture[]> {
  const entries = await readdir(fixturesDir, { withFileTypes: true })
  const dirs = entries.filter((entry) => entry.isDirectory())
  const fixtures: Fixture[] = []

  for (const dir of dirs) {
    const slug = dir.name
    const base = `${fixturesDir}/${slug}`
    const template = await readFile(`${base}/template.ll.html`, 'utf8')
    const expected = await readFile(`${base}/expected.html`, 'utf8')
    const context = JSON.parse(
      await readFile(`${base}/context.json`, 'utf8')
    ) as Record<string, unknown>

    // Optional idempotent DB setup, run via wpx before each render pass.
    // Cross-fixture chaining via require __DIR__ . '/../<slug>/setup.php'
    // is inlined, since the code executes in an eval without a real __DIR__.
    const loadSetup = async (dir: string, seen: Set<string> = new Set()): Promise<string> => {
      const file = `${dir}/setup.php`
      if (!existsSync(file) || seen.has(file)) return ''
      seen.add(file)
      let code = (await readFile(file, 'utf8')).replace(/^<\?php\s*/, '')
      const requirePattern = /require\s+__DIR__\s*\.\s*'\/\.\.\/([\w-]+)\/setup\.php'\s*;/g
      const matches = [...code.matchAll(requirePattern)]
      for (const match of matches) {
        const inlined = await loadSetup(`${fixturesDir}/${match[1]}`, seen)
        code = code.replace(match[0], inlined)
      }
      return code
    }
    const setup = (await loadSetup(base)) || undefined

    // Optional side-effect capture, appended to output after each pass
    let capture: string | undefined
    if (existsSync(`${base}/capture.php`)) {
      capture = (await readFile(`${base}/capture.php`, 'utf8'))
        .replace(/^<\?php\s*/, '')
    }

    // Optional normalization for environment-dependent values
    let normalize: string | undefined
    if (existsSync(`${base}/normalize.php`)) {
      normalize = (await readFile(`${base}/normalize.php`, 'utf8'))
        .replace(/^<\?php\s*/, '')
    }

    fixtures.push({
      slug,
      template: template.trim(),
      expected: expected.trim(),
      context,
      setup,
      capture,
      normalize,
    })
  }

  return fixtures
}


// Expected files may be checked out with CRLF depending on git autocrlf
const normalizeEol = (value: string) =>
  value.replace(/\r\n?/g, '\n').trim()

export default run(async () => {
  if (!process.env.TEST_COMPILE_PHP) {
    test('Compile-to-PHP parity (skipped)', async () => {
      ok(true, 'Set TEST_COMPILE_PHP=1 to enable')
    })
    return
  }

  const { wpx } = await getServer()
  const compileAvailable = await wpx`return function_exists('tangible_template_compile');`
  const renderCompiledAvailable = await wpx`return function_exists('tangible_template_compile_render');`

  if (!compileAvailable) {
    test('Compile-to-PHP parity (skipped: compiler missing)', async () => {
      ok(true, 'Compiler entry point not available')
    })
    return
  }

  const fixtures = await loadFixtures()
  const shortcodeBootstrap = `
add_shortcode('compile_mode', function($atts = [], $content = '') {
  $content = (string) $content;
  if (strpos($content, '<Get') !== false) {
    return 'raw:' . $content;
  }
  return 'rendered:' . $content;
});
`

  for (const fixture of fixtures) {
    test(`Compile-to-PHP parity: ${fixture.slug}`, async () => {
      const contextJson = JSON.stringify(fixture.context)
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
      const runtime = await wpx/* php */`
${shortcodeBootstrap}
${fixture.setup ?? ''}
$context = json_decode('${contextJson}', true);
if (is_array($context)) {
  $html = tangible_template();
  foreach ($context as $key => $value) {
    if (!is_string($key) || $key === '') continue;
    $html->set_variable_type('variable', $key, $value, [
      'render' => false,
      'trim' => false,
    ]);
  }
}
$__parity_out = tangible_template(<<<'HTML'
${fixture.template}
HTML);
${fixture.capture ? `$__parity_out .= "\n" . call_user_func(function () { ${fixture.capture} });` : ''}
${fixture.normalize ? `$__parity_out = call_user_func(call_user_func(function () { ${fixture.normalize} }), $__parity_out);` : ''}
return $__parity_out;
`
      is(normalizeEol(fixture.expected), normalizeEol(String(runtime)), 'runtime output matches expected')

      if (!renderCompiledAvailable) {
        ok(true, 'Compiled render entry point not available yet')
        return
      }

      const compiled = await wpx/* php */`
${shortcodeBootstrap}
${fixture.setup ?? ''}
$__parity_out = tangible_template_compile_render(<<<'HTML'
${fixture.template}
HTML, json_decode('${contextJson}', true));
${fixture.capture ? `$__parity_out .= "\n" . call_user_func(function () { ${fixture.capture} });` : ''}
${fixture.normalize ? `$__parity_out = call_user_func(call_user_func(function () { ${fixture.normalize} }), $__parity_out);` : ''}
return $__parity_out;
`
      is(normalizeEol(fixture.expected), normalizeEol(String(compiled)), 'compiled output matches expected')
    })
  }
})
