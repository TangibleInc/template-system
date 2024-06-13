import { test, is, ok, run } from 'testra'
import { getServer } from '../common.ts'

export default run(async () => {
  const { wpx } = await getServer()

  test('Template post type', async () => {

    let result

    result = await wpx/* php */`return get_posts([
  'post_type' => 'tangible_template',
  'numberposts' => -1,
  'fields' => 'ids'
]);`

    is(true, Array.isArray(result), 'get templates as list')

    if (result.length) {
      for (const id of result) {
        const result = await wpx/* php */`
return wp_delete_post(${id});
`
        ok(result, `Delete existing template ${id}`)
      }
    }

    const numPosts = 3
    const postIds: number[] = []

    for (let i=1; i <= numPosts; i++) {
      const postTitle = `template-${i}`
      const postId = await wpx/* php */`
return wp_insert_post([
  'post_type' => 'tangible_template',
  'post_status' => 'publish',
  'post_title' => '${postTitle}',
  'post_content' => '',
  'post_excerpt' => '',
]);`

      is('number', typeof postId, `create ${postTitle} returns ID`)

      postIds.push(parseInt(postId, 10))
    }

    result = await wpx/* php */`return get_posts([
  'post_type' => 'tangible_template',
  'numberposts' => -1,
  'fields' => 'ids'
]);`

    is(true, Array.isArray(result), 'get templates as list')
    is(postIds.sort(), result.sort(), 'correct template IDs')

    result = await wpx/* php */`return tangible\\template_system\\get_all_templates();`
    
    is(numPosts, result.length, `get_all_templates() count ${numPosts}`)

    for (const key of [
      'id',
      'name',
      'title',
      'content',
      
      'script',
      'style',
      'assets',
      'location',

      'universal_id',

      'controls_template',
      'controls_settings',

      'theme_footer',
      'theme_header',
      'theme_position',
    ]) {
      let i = 1
      ok( result[0][key] != null , `template ${i} has property ${key}`)
    }

    let resultIds = result.reduce((ids, template) => {
      ids.push(template.id)
      return ids
    }, [])

    is(postIds, resultIds, 'template IDs are equal')

    // Deprecated methods

    result = await wpx/* php */`return tangible_template_system()->get_all_templates();`

    is(numPosts, result.length, `deprecated method tangible_template_system()->get_all_templates()`)

    resultIds = result.reduce((ids, template) => {
      ids.push(template.id)
      return ids
    }, [])
    is(postIds, resultIds, 'template IDs are equal')

  })
})
