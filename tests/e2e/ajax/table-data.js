import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import {
  useGuestAjax,
  SECRET_USER_EMAIL,
  SECRET_OPTION_VALUE,
} from './utils.js'

const { describe } = test

/**
 * tangible_table_data is the public template-data action. These check that a
 * guest cannot use it to read users or site options (CVE-2026-16960).
 *
 * @see modules/table/ajax.php
 */

const userEmailLoop = {
  action: 'tangible_ajax_tangible_table_data',
  'data[per_page]': '100',
  'data[row_loop][tag]': 'Loop',
  'data[row_loop][attributes][type]': 'user',
  'data[row_loop][attributes][count]': '100',
  'data[column_order][0]': 'email',
  'data[column_template][email][tag]': 'Col',
  'data[column_template][email][attributes][name]': 'email',
  'data[column_template][email][children][0][tag]': 'Field',
  'data[column_template][email][children][0][attributes][keys][0]': 'email',
}

describe('AJAX permission: tangible_table_data', () => {

  const ajax = useGuestAjax()

  test('exposes a working guest nonce on a public page', async () => {
    expect(await ajax.nonce()).toMatch(/^[a-f0-9]{8,}$/)
  })

  test('does not expose arbitrary user emails to a guest', async () => {

    const nonce = await ajax.nonce()
    const res = await ajax.post({ ...userEmailLoop, nonce })
    const body = await res.text()

    // A real response (not 0/error/Bad nonce), still without the secret
    expect(body).toContain('"success"')
    expect(body).not.toContain('Bad nonce')
    expect(body).not.toContain(SECRET_USER_EMAIL)
  })

  test('does not expose arbitrary site options to a guest', async () => {

    const nonce = await ajax.nonce()
    const res = await ajax.post({
      action: 'tangible_ajax_tangible_table_data',
      nonce,
      'data[per_page]': '1',
      'data[row_loop][tag]': 'Loop',
      'data[row_loop][attributes][type]': 'user',
      'data[row_loop][attributes][count]': '1',
      'data[column_order][0]': 'leak',
      'data[column_template][leak][tag]': 'Col',
      'data[column_template][leak][attributes][name]': 'leak',
      'data[column_template][leak][children][0][tag]': 'Setting',
      'data[column_template][leak][children][0][attributes][keys][0]':
        'tangible_e2e_secret_option',
    })
    const body = await res.text()

    expect(body).toContain('"success"')
    expect(body).not.toContain('Bad nonce')
    expect(body).not.toContain(SECRET_OPTION_VALUE)
  })

  test('refuses a request with no nonce (Bad nonce)', async () => {

    const res = await ajax.post(userEmailLoop)
    const body = await res.text()

    expect(body).toContain('Bad nonce')
    expect(body).not.toContain(SECRET_USER_EMAIL)
  })
})
