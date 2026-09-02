import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { useGuestAjax } from './utils.js'

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

describe('AJAX permission: tangible_table_data signed round-trip', () => {

  const ajax = useGuestAjax()

  const readConfig = async (pageSlug) => {

    const html = await (await ajax.get(`/?pagename=${pageSlug}`)).text()
    const raw = html.match(/data-tangible-table-config="([^"]*)"/)[1]
    const json = raw
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;/g, "'")
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
        row_loop: rowLoop ?? config.row_loop,
        column_template: config.column_template,
        column_order: config.column_order,
        column_sort_type: config.column_sort_type,
        filter_loop_keys: config.filter_loop_keys ?? [],
        filter_loop_options: config.filter_loop_options ?? {},
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

  test('rejects a loop filter value the author did not offer', async () => {

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

  test('rejects excluding a non-filter attribute (keys are signed)', async () => {

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
})
