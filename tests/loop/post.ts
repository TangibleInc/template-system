import { test, is, ok, run } from 'testra'
import { getServer } from '../common.ts'

export default run(async () => {

  const { wpx, template } = await getServer()

  let result: any, expected: any

  test('Post', async () => {

    result = await wpx/* php */`
return wp_insert_post([
  'post_type' => 'post',
  'post_status' => 'publish',
  'post_title' => 'Parent 1',
  'post_name' => 'parent-1',
  'post_content' => '',
  'post_excerpt' => '',
]);`
    
    is('number', typeof result, 'create parent post')

    const parentPost = result
    const childPosts: number[] = []

    for (let i=1; i <= 3; i++) {
      result = await wpx/* php */`
      return wp_insert_post([
        'post_type' => 'post',
        'post_status' => 'publish',
        'post_title' => 'Child ${i}',
        'post_name' => 'child-${i}',
        'post_parent' => ${parentPost},
        'post_content' => '',
        'post_excerpt' => '',
      ]);`

      is('number', typeof result, `Create child post ${i}`)
      childPosts.push(result)
    }

    expected = `${parentPost},${childPosts.join(',')}`
    result = await template/* html */`
<Loop type=post id=${expected}><Field id /><If not last>,</If></Loop>
`
    is(expected, result, 'parent and child IDs')

    expected = `${parentPost}`
    result = await template/* html */`
<Loop type=post id=${expected} include_children=false>
  <Field id /><If not last>,</If>
</Loop>
`
    is(expected, result, 'parent only')

    expected = `${childPosts.join(',')}`
    result = await template/* html */`
<Loop type=post id=${expected} field=parent><Field id /><If not last>,</If></Loop>
`
    is(expected, result, 'children only (field=parent)')

  })

})
