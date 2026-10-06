import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { useGuestAjax, SECRET_OPTION_VALUE } from './utils.js'

const { describe } = test

/**
 * tangible_table_data only answers a request that carries a hash it signed
 * itself, so a guest can't craft an arbitrary query. These tests cover both
 * sides of that gate.
 *
 * It must accept a table's own requests, including the ways a table legitimately
 * changes them: turning the page, sorting, and switching a filter to one of the
 * values the author offered.
 *
 * It must reject anything the client changes that the signature covers: adding
 * an attribute, widening a filter's allowed values, or sending a filter value
 * the author never offered.
 *
 * What the signature does not cover (search, sort, pagination, name, id, class,
 * tag-attributes) is data: cast, restricted to known values or used as literal
 * text, and never rendered as a template.
 *
 * @see modules/table/hash.php
 */

// Flatten a config into admin-ajax bracket fields, dropping empty arrays the
// same way the browser does - this is the round-trip that loses nested [].
const flatten = (obj, prefix, out = {}) => {
  for (const [key, value] of Object.entries(obj)) {
    const field = `${prefix}[${key}]`
    if (Array.isArray(value) && value.length === 0) continue
    if (value !== null && typeof value === 'object') flatten(value, field, out)
    else out[field] = String(value)
  }
  return out
}

describe('AJAX signing: tangible_table_data', () => {

  const ajax = useGuestAjax()

  const readConfig = async (pageSlug) => {

    const html = await (await ajax.get(`/?pagename=${pageSlug}`)).text()
    const raw = html.match(/data-tangible-table-config="([^"]*)"/)[1]
    const json = raw
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
    return JSON.parse(json)
  }

  const signedRequest = (config, rowLoop, overrides = {}) => ({
    action: 'tangible_ajax_tangible_table_data',
    'data[hash]': config.hash,
    'data[page]': '1',
    'data[per_page]': String(config.per_page ?? -1),
    ...flatten(
      {
        row_loop            : rowLoop ?? config.row_loop,
        column_template     : config.column_template,
        column_order        : config.column_order,
        column_sort_type    : config.column_sort_type,
        filter_loop_keys    : config.filter_loop_keys ?? [],
        filter_loop_options : config.filter_loop_options ?? {},
        ...overrides,
      },
      'data',
    ),
  })

  test("accepts a table's own signed request", async () => {

    const config = await readConfig('e2e-ajax-table')
    const nonce = await ajax.nonce()
    const res = await ajax.post({ nonce, ...signedRequest(config) })
    const body = await res.text()

    expect(body).not.toContain('Not allowed')
    expect(body).toContain('"success":true')
  })

  test('honors a loop filter changing the query', async () => {

    const config = await readConfig('e2e-ajax-filter')
    const nonce = await ajax.nonce()

    // The orderby filter switches to date - the client mutates row_loop
    const filtered = {
      ...config.row_loop,
      attributes: { ...config.row_loop.attributes, orderby: 'date' },
    }
    const res = await ajax.post({ nonce, ...signedRequest(config, filtered) })
    const body = await res.text()

    expect(body).not.toContain('Not allowed')
    expect(body).toContain('"success":true')
  })

  test('rejects a loop filter value not offered', async () => {

    const config = await readConfig('e2e-ajax-filter')
    const nonce = await ajax.nonce()

    // menu_order is a valid orderby but not in the filter's options
    const filtered = {
      ...config.row_loop,
      attributes: { ...config.row_loop.attributes, orderby: 'menu_order' },
    }
    const res = await ajax.post({ nonce, ...signedRequest(config, filtered) })
    const body = await res.text()

    expect(body).toContain('Not allowed')
  })

  test('rejects a widened option set (options are signed)', async () => {

    const config = await readConfig('e2e-ajax-filter')
    const nonce = await ajax.nonce()

    // Add menu_order to orderby's options and use it - the signed options differ
    const filtered = {
      ...config.row_loop,
      attributes: { ...config.row_loop.attributes, orderby: 'menu_order' },
    }
    const res = await ajax.post({
      nonce,
      ...signedRequest(config, filtered, {
        filter_loop_options: { orderby: ['title', 'date', 'menu_order'] },
      }),
    })
    const body = await res.text()

    expect(body).toContain('Not allowed')
  })

  test('rejects excluding a non-filter attribute', async () => {

    const config = await readConfig('e2e-ajax-filter')
    const nonce = await ajax.nonce()

    // Claim type is a loop filter to change it off the signature - keys differ
    const tampered = {
      ...config.row_loop,
      attributes: { ...config.row_loop.attributes, type: 'page' },
    }
    const res = await ajax.post({
      nonce,
      ...signedRequest(config, tampered, {
        filter_loop_keys: ['orderby', 'type'],
      }),
    })
    const body = await res.text()

    expect(body).toContain('Not allowed')
  })

  test('paginates a table beyond page one', async () => {

    const config = await readConfig('e2e-ajax-paged')
    const nonce = await ajax.nonce()

    const page = async (n) => {
      const res = await ajax.post({
        nonce,
        ...signedRequest(config),
        'data[page]': String(n),
      })
      const body = await res.text()
      expect(body).not.toContain('Not allowed')
      return JSON.parse(body).data.rows
    }

    const first = await page(1)
    const second = await page(2)

    // A different page returns different rows, not a static first page
    expect(first.length).toBeGreaterThan(0)
    expect(second.length).toBeGreaterThan(0)
    expect(JSON.stringify(second)).not.toEqual(JSON.stringify(first))
  })

  test('accepts a numeric row_loop attribute', async () => {

    const config = await readConfig('e2e-ajax-paged')
    const nonce = await ajax.nonce()

    // count is numeric in the template but the parser and round-trip keep it a
    // string - if that ever changes, the hash breaks and this fails
    expect(config.row_loop.attributes.count).toBe('50')

    const res = await ajax.post({ nonce, ...signedRequest(config) })
    const body = await res.text()

    expect(body).not.toContain('Not allowed')
    expect(body).toContain('"success":true')
  })

  test('returns the rows the page rendered', async () => {

    const config = await readConfig('e2e-ajax-dynamic')
    const nonce = await ajax.nonce()

    const res = await ajax.post({ nonce, ...signedRequest(config) })
    const body = await res.text()

    expect(body).not.toContain('Not allowed')

    const { rows } = JSON.parse(body).data

    // Attributes written in the column templates are rendered, like in the page
    expect(rows[0].title).toContain('data-title="E2E Pager A"')
    expect(rows[0].link).toContain('title="E2E Pager A"')
    expect(rows[1].state__display).toContain('class="other-e2e-pager-b"')

    expect(rows).toEqual(config.rows)
  })

  test('sorts, filters and searches on dynamic attributes', async () => {

    const config = await readConfig('e2e-ajax-dynamic')
    const nonce = await ajax.nonce()

    const rows = async (extra) => {
      const res = await ajax.post({ nonce, ...signedRequest(config), ...extra })
      return JSON.parse(await res.text()).data.rows
    }

    // The state column sorts on its dynamic value attribute
    const sorted = await rows({
      'data[sort_column]': 'state',
      'data[sort_order]': 'desc',
    })
    expect(sorted.map((row) => row.state)).toEqual([
      'e2e-pager-c',
      'e2e-pager-b',
      'e2e-pager-a',
    ])

    /**
     * The filter and the search target the first row: when the matches don't
     * start at the first row, the loop returns no rows at all
     *
     * @see BaseLoop::filter() in loop/types/base/index.php
     */

    // A filter compares with the cell as rendered, dynamic attribute included
    const filtered = await rows({
      'data[filter_by_column_values][title][value]': config.rows[0].title,
    })
    expect(filtered).toEqual([config.rows[0]])

    // A search sees the rendered link, not its template
    const searched = await rows({
      'data[search]': 'e2e-pager-a/',
      'data[search_columns][0]': 'link',
    })
    expect(searched).toEqual([config.rows[0]])

    // A search sees a nested loop sorted by its dynamic attribute, like the page
    const nested = await rows({
      'data[search]': 'Pager A, E2E Pager B',
      'data[search_columns][0]': 'list',
    })
    expect(nested).toEqual(config.rows)
  })

  test('honors dynamic attributes of the Table tag', async () => {

    const slug = 'e2e-ajax-attributes'
    const config = await readConfig(slug)
    const nonce = await ajax.nonce()

    // Rendered with the page: one row per page, sorted by title descending
    expect(await (await ajax.get(`/?pagename=${slug}`)).text()).toContain(
      'table-desc',
    )
    expect(config.per_page).toBe(1)
    expect(config.sort_order).toBe('desc')
    expect(config.rows).toEqual([{ title: 'E2E Pager C' }])

    // The client sends the rendered values back, the endpoint follows them
    const page = async (n) => {
      const res = await ajax.post({
        nonce,
        ...signedRequest(config),
        'data[page]': String(n),
        'data[sort_column]': config.sort_column,
        'data[sort_order]': config.sort_order,
        'data[sort_type]': config.sort_type,
      })
      return JSON.parse(await res.text()).data
    }

    expect((await page(1)).rows).toEqual(config.rows)
    expect((await page(2)).rows).toEqual([{ title: 'E2E Pager B' }])
    expect((await page(1)).total_pages).toBe(3)
  })

  test('accepts a column template with HTML entities', async () => {

    const config = await readConfig('e2e-ajax-entities')
    const nonce = await ajax.nonce()

    // The browser decodes entities in the attribute, the column template must
    // still match what the server signed
    const res = await ajax.post({ nonce, ...signedRequest(config) })
    const body = await res.text()

    expect(body).not.toContain('Not allowed')
    expect(JSON.parse(body).data.rows[0].title).toContain('&amp; &nbsp; &copy; &lt;b&gt;')
  })

  test('honors an unsigned sort change', async () => {

    const config = await readConfig('e2e-ajax-paged')
    const nonce = await ajax.nonce()

    // Sort params are not signed, so changing them must not break the hash
    const res = await ajax.post({
      nonce,
      ...signedRequest(config),
      'data[sort_column]': 'title',
      'data[sort_order]': 'desc',
      'data[sort_type]': 'string',
    })
    const body = await res.text()

    expect(body).not.toContain('Not allowed')
    expect(JSON.parse(body).data.rows.length).toBeGreaterThan(0)
  })

  test('searches and sorts with the unsigned values', async () => {

    const config  = await readConfig('e2e-ajax-table')
    const nonce   = await ajax.nonce()

    const titles = async (values) => {
      const res = await ajax.post({
        nonce,
        ...signedRequest(config),
        ...flatten(values, 'data'),
      })
      return JSON.parse(await res.text()).data.rows.map((row) => row.title)
    }

    const found = await titles({
      search: 'pager',
      search_columns: ['title'],
    })
    const ascending   = await titles({ sort_column: 'title', sort_order: 'asc' })
    const descending  = await titles({ sort_column: 'title', sort_order: 'desc' })

    expect(found).toEqual(['E2E Pager A', 'E2E Pager B', 'E2E Pager C'])
    expect(ascending.length).toBeGreaterThan(1)
    expect(descending).toEqual([...ascending].reverse())
  })

  /**
   * The seeded table has a "rendered" column showing a variable no template
   * sets. Each value starts with a {Set} tag setting it, so the column only
   * has a value if the request value was rendered.
   *
   * The rest of each value is a valid one, so the rows still come back when
   * the template renders to nothing.
   */
  const SET_RENDERED = '{Set name=e2e_unsigned_rendered}RENDERED{/Set}'

  const unsignedValues = {
    search          : { search: `${SET_RENDERED}Pager`, search_columns: 'title' },
    search_columns  : { search: 'Pager', search_columns: `${SET_RENDERED}title` },
    sort_column     : { sort_column: `${SET_RENDERED}title` },
    sort_order      : { sort_column: 'title', sort_order: `${SET_RENDERED}asc` },
    sort_type       : { sort_column: 'title', sort_type: `${SET_RENDERED}string` },
    page            : { page: `${SET_RENDERED}1` },
    per_page        : { per_page: `${SET_RENDERED}1` },
    paged           : { per_page: undefined, paged: `${SET_RENDERED}1` },
    name            : { name: `${SET_RENDERED}e2e` },
    id              : { id: `${SET_RENDERED}e2e` },
    class           : { class: `${SET_RENDERED}e2e` },
    'tag-attributes': { 'tag-attributes': `${SET_RENDERED}class=e2e` },

    // Not a Table attribute, but any key of the request reaches the tag
    'an unknown key': { e2e_unknown: `${SET_RENDERED}e2e` },
  }

  const unsignedRequest = (config, values) => {

    const request = signedRequest(config)

    for (const [key, value] of Object.entries(values)) {
      if (value === undefined) delete request[`data[${key}]`]
      else request[`data[${key}]`] = value
    }

    return request
  }

  for (const [name, values] of Object.entries(unsignedValues)) {

    test(`does not render a template in ${name}`, async () => {

      const config  = await readConfig('e2e-ajax-unsigned')
      const nonce   = await ajax.nonce()
      const res     = await ajax.post({ nonce, ...unsignedRequest(config, values) })
      const body    = await res.text()

      // The request must pass the hash check, or nothing is tested
      expect(body).not.toContain('Not allowed')
      expect(body).toContain('"success":true')

      const rendered = JSON.parse(body).data.rows.map((row) => row.rendered)

      expect(rendered.join('')).not.toContain('RENDERED')
    })
  }

  test('does not expose a site option through an unsigned value', async () => {

    const config  = await readConfig('e2e-ajax-unsigned')
    const nonce   = await ajax.nonce()

    // A rendered value can read anything a template can, here into the column
    const res = await ajax.post({
      nonce,
      ...unsignedRequest(config, {
        class:
          '{Set name=e2e_unsigned_rendered}{Setting tangible_e2e_secret_option}{/Set}',
      }),
    })
    const body = await res.text()

    expect(body).not.toContain('Not allowed')
    expect(body).toContain('"success":true')
    expect(body).not.toContain(SECRET_OPTION_VALUE)
  })
})
