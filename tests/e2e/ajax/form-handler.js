import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { useGuestAjax, sign } from './utils.js'

const { describe } = test

/**
 * tangible_form_handler processes a form submission, but only after
 * verify_tag_attributes_hash() confirms the location hash; it then renders the
 * referenced published template server-side, never request-supplied markup.
 *
 * @see form/ajax.php
 * @see form/process.php
 */
describe('AJAX permission: tangible_form_handler', () => {

  const ajax = useGuestAjax()

  test('rejects a location whose hash it did not sign', async () => {

    const nonce = await ajax.nonce()
    const res = await ajax.post({
      action: 'tangible_ajax_tangible_form_handler',
      nonce,
      'data[location][template_id]': '1',
      'data[hash]': 'forged-invalid-hash',
      'data[data]': '',
    })
    const body = await res.text()

    expect(body).toContain('"success":false')
    expect(body).toContain('Invalid form location')
  })

  test('accepts a location it did sign', async () => {

    const nonce = await ajax.nonce()
    const res = await ajax.post({
      action: 'tangible_ajax_tangible_form_handler',
      nonce,
      'data[location][template_id]': '0',
      // Sign the location the server rebuilds from the POST fields
      'data[hash]': sign('["template_id"=>"0"]'),
      'data[data]': '',
    })
    const body = await res.text()

    // Past the hash gate, so it moves on to the next required field
    expect(body).not.toContain('Invalid form location')
    expect(body).toContain('Action is required')
  })
})
