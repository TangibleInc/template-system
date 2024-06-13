import { test, is, ok, run } from 'testra'
import { getServer } from '../tests/common.ts'

export default run(async () => {
  const { wpx, template } = await getServer()

  let result: any, expected: any

  test('Modules', async () => {
    result = await template/* html */ `
<Async>Loaded asynchronously</Async>
`
    ok(result, 'Async')

    result = await template/* html */ `
<Chart />
`
    ok(result, 'Chart')

    result = await template/* html */ `
<Embed>http://example.com</Embed>
`
    ok(result, 'Embed')

    result = await template/* html */ `
<Markdown># Title</Markdown>
`
    is('<h1>Title</h1>', result, 'Markdown')

    result = await template/* html */ `
<If device=desktop>TRUE<Else />FALSE</If>
`
    ok(result, 'Mobile detect')

    result = await template/* html */ `
<Prism />
`
    ok(result, 'Prism')

    result = await template/* html */ `
<Slider />
`
    ok(result, 'Slider')

    /**
     * Sass
     */

    result = await wpx/* php */`return tangible_template()->sass(<<<'SCSS'
$test: 0.4;
a.latest-post__link:hover {
  box-shadow: 0 4px 8px rgba(var(--clr-text), $test);
}
SCSS);`
    expected = `a.latest-post__link:hover{box-shadow:0 4px 8px rgba(var(--clr-text), 0.4)}`

    is(expected, result, 'Sass')

    /**
     * Known issue: The handling of / is not spec compliant
     * @see https://github.com/scssphp/scssphp/issues/146
     * 
     * For CSS properties that use a slash for any purpose other than division,
     * SCSS-PHP doesn't yet support the syntax and replaces with divided value.
     * 
     * Workaround is to use unquote('..')
     */
    result = await wpx/* php */`return tangible_template()->sass(<<<'SCSS'
a {
  grid-area: unquote('1 / 1 / 2 / 2');
}
SCSS);`
    expected = `a{grid-area:1 / 1 / 2 / 2}`

    is(expected, result, 'Sass with division "/"')

    result = await wpx/* php */`return tangible_template()->sass(<<<'SCSS'
@media (min-aspect-ratio: unquote('5/8')) {
  a { color: green }
}
SCSS);`
    expected = `@media (min-aspect-ratio:5/8){a{color:green}}`

    is(expected, result, 'Sass with fraction "/"')

    /**
     * Table
     * TODO: Create posts
     */

    result = await template/* html */ `
<Table per_page=3 sort=title sort_order=desc>

<Filter>
  <div>
    <input type="text"  action="search"  columns="entry_id,user,entry_date,survey_total_score"   placeholder="Search"  >
  </div>
</Filter>

<Head>
  <Col name=entry_id sort_type=string>Entry ID</Col>
  <Col name=user sort_type=string>User</Col>
  <Col name=entry_date sort_type=string>Entry Date</Col>
  <Col name=survey_total_score sort_type=string>Survey Total Score</Col>
</Head>

<RowLoop type=post>
  <Col>
  <Field id />
  </Col>
  <Col>
  <Loop type="user" id="{Field created_by}">
    <Field full_name /><br/>
  </Loop>
  </Col>
  <Col>
  <Field date_created />
  </Col>
  <Col>
  <Field survey_score />
  </Col>
</RowLoop>

<Paginate>
  Page <Field current /> of <Field total />
</Paginate>

<Empty>
  <p>Empty</p>
</Empty>

</Table>
`

    ok(result, 'Table')
  })

  // Pager
  await import('./pager/tests/index.ts')

})
