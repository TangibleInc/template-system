import path from 'node:path'
import { test, is, ok, run } from 'testra'
import { getServer } from '../../../framework/env'

export default run(async () => {
  const { php, request, wpx } = await getServer({
    reset: true,
  })

  test('Pagination', async () => {
    const numPosts = 5
    let template, result, expected

    result = await wpx(`
$ids = [];
for ($i = 0; $i < ${numPosts}; $i++) {
  $ids []= wp_insert_post([
    'post_type' => 'post',
    'post_status' => 'publish',
    'post_title' => 'Test ' . ($i + 1),
    'post_content' => '',
    'post_excerpt' => '',
  ]);
}
return $ids;`)

    ok(result, 'create posts')
    is(numPosts, result.length, `create ${numPosts} posts`)

    const ids = result

    let i = 0
    for (const id of ids) {
      template = `<Loop type=post id=${id}><Field title /></Loop>`
      result = await wpx`return tangible_template('${template}');`
      expected = `Test ${i + 1}`
      is(expected, result, `test post ${i + 1}`)
      i++
    }

    /**
     * Setting paginator=true will return the loop content only, without the div
     * wrapper that loads the paginator module and data.
     */
    const perPage = 2
    const totalPages = Math.ceil(numPosts / perPage)

    for (let i = 1; i <= totalPages; i++) {
      template = `<Loop type=post
        id=${ids.join(',')}
        paged=${perPage} page=${i}
        paginator=true
      ><Field id /><If not last>,</If></Loop>`

      result = await wpx`return tangible_template('${template}');`

      const startIndex = (i - 1) * perPage
      const endIndex = startIndex + perPage

      expected = ids.slice(startIndex, endIndex).join(',')

      is(expected, result, `page ${i} = ${expected}`)
    }
  })
})
