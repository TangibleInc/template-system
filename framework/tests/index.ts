import url from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'
import { test, is, ok, run } from 'testra'
import { getServer } from '../env/index.js'

export default run(async () => {
  const { php, request, phpx, wpx, onMessage, console } = await getServer({
    phpVersion: process.env.PHP_VERSION || '7.4',
    reset: true,
  })

  test('Test site', async () => {
    ok(true, 'starts')

    let result = await request({
      route: '/',
      format: 'text',
    })

    ok(Boolean(result), 'responds')
    is('<!doc', result.slice(0, 5).toLowerCase(), 'responds with HTML document')

    // Activate Framework as plugin if needed

    result = await wpx/* php */ `
$result = class_exists('tangible\\framework');
if (!$result) {
  if (!function_exists('activate_plugin')) {
    require ABSPATH . 'wp-admin/includes/plugin.php';
  }
  $result = activate_plugin(ABSPATH . 'wp-content/plugins/framework/plugin.php');
}

$has_framework = !is_wp_error($result);

// Clear log
file_put_contents('wp-content/log.txt', '');

return [
  'framework' => $has_framework,
  'permalink' => get_option( 'permalink_structure' ),
];`

    ok(Boolean(result), 'PHP setup success')

    is(true, result.framework, 'framework loaded')
    is('/%postname%/', result.permalink, 'pretty permalink enabled')

    result = await wpx/* php */ `return switch_theme('empty-block-theme');`
    is(null, result, 'activate empty block theme')
  })

  test('Post message from PHP to JS', async () => {
    let called = false
    let unsubscribe

    // Subscribe event callback
    unsubscribe = onMessage((e) => {
      called = e
    })

    const testPost = {
      post_id: 15,
      post_title: 'This is a blog post!',
    }

    await phpx`post_message_to_js(json_encode([
  ${Object.keys(testPost)
    .map((key) => `'${key}' => ${JSON.stringify(testPost[key])},`)
    .join('\n')}
]));`

    is(true, called !== false, 'listener called')
    is(testPost, called, 'listener called with JSON message')

    unsubscribe()

    called = false
    await phpx`post_message_to_js('1');`
    is(false, called, 'listener not called after unsubscribe')

    // New event callback
    let messages: any[] = []
    unsubscribe = onMessage((e) => {
      messages.push(e)
    })

    await wpx`require( tangible\\framework::$state->path . '/tests/basic-messages.php' );`

    is(
      [123, 'hi', { key: 'value' }],
      messages,
      'multiple messages from running PHP file',
    )
    // messages.splice(0)
    unsubscribe()

    // Support general-purpose assertions: [expected, actual, title]
    type AssertArgs = [expected: any, actual: any, title?: any]
    const asserts: AssertArgs[] = []
    unsubscribe = onMessage((e) => {
      asserts.push(e)
    })

    const prelude = `function is($expected, $actual, $title = null) {
      post_message_to_js(json_encode([$expected, $actual, $title]));
  }`

    await wpx`${prelude}
require( tangible\\framework::$state->path . '/tests/basic-assertions.php' );`
    // unsubscribe()

    for (const [expected, actual, title] of asserts) {
      is(
        expected,
        actual,
        `assert from PHP: ${typeof title === 'string' ? title : JSON.stringify(title != null ? title : expected)}`,
      )
    }
    asserts.splice(0)
  })

  await import('../api/tests/index.ts')

  test('Log', async () => {
    const log = (
      await php.run({
        code: /* php */ `<?php
echo file_get_contents('wp-content/log.txt');
  `,
      })
    ).text

    if (log) console.log(log)
  })
})
