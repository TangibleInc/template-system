import path from 'node:path'
import { test, is, ok, run } from 'testra'
import { getServer } from '../framework/env'

export default run(async () => {
  // Set up server before running tests in Framework
  const { php, request, wpx } = await getServer({
    mappings: process.env.TEST_ARCHIVE
      ? {
          'wp-content/plugins/template-system':
            '../publish/tangible-template-system',
        }
      : {},
    reset: true,
  })

  await import('../framework/tests/index.ts')

  test('Template system - Basic', async () => {
    let result = await wpx`
if (!function_exists('activate_plugin')) {
  require ABSPATH . 'wp-admin/includes/plugin.php';
}
return activate_plugin(ABSPATH . 'wp-content/plugins/template-system/plugin.php');
`

    is(null, result, 'activate plugin')

    result = await wpx`return function_exists('tangible_template_system');`
    is(true, result, 'tangible_template_system() exists')

    result = await wpx`return function_exists('tangible_template');`
    is(true, result, 'tangible_template() exists')

    let template = `Hello, world.`
    result = await wpx`return tangible_template('${template}');`
    is(template, result, 'tangible_template(string) runs')

    /**
     * Create a post and get it
     * @see https://developer.wordpress.org/reference/functions/wp_insert_post/
     */

    const postTitle = 'Test 123'
    result = await wpx(`
return wp_insert_post([
  'post_type' => 'post',
  'post_status' => 'publish',
  'post_title' => '${postTitle}',
  'post_content' => '',
  'post_excerpt' => '',  
]);`)

    is('number', typeof result, 'create post returns ID')

    template = `<Loop type=post id=${result}><Field title /></Loop>`
    result = await wpx`return tangible_template('${template}');`

    is(postTitle, result, 'get test post')
  })

})
