import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { useGuestAjax, sign, SECRET_OPTION_VALUE } from './utils.js'
import { wp } from '../../wp.js'

const { describe } = test

/**
 * tangible_template_render renders a template node, but only after
 * verify_tag_attributes_hash() confirms a server-issued hash of its attributes.
 * A guest cannot run a template the server did not sign, but a signed one
 * renders.
 *
 * @see language/ajax/index.php
 * @see language/utils/hash.php
 */
describe('AJAX permission: tangible_template_render', () => {

  const ajax = useGuestAjax()

  test('rejects a template whose hash it did not sign', async () => {

    const nonce = await ajax.nonce()
    const res = await ajax.post({
      action: 'tangible_ajax_tangible_template_render',
      nonce,
      'data[template][tag]': 'Setting',
      'data[template][attributes][keys][0]': 'tangible_e2e_secret_option',
      'data[hash]': 'forged-invalid-hash',
    })
    const body = await res.text()

    expect(body).toContain('"success":false')
    expect(body).toContain('Invalid template hash')
    expect(body).not.toContain(SECRET_OPTION_VALUE)
  })

  test('renders a template it did sign', async () => {

    const nonce = await ajax.nonce()
    const blogname = wp('option get blogname').trim()

    // Otherwise the render check below would pass on an empty value
    expect(blogname).toBeTruthy()

    const res = await ajax.post({
      action: 'tangible_ajax_tangible_template_render',
      nonce,
      'data[template][tag]': 'Setting',
      'data[template][attributes][keys][0]': 'blogname',
      'data[hash]': sign('["keys"=>["blogname"]]'),
    })
    const body = await res.text()

    // The signed template rendered blogname into the response data
    expect(body).toContain(`"data":"${blogname}"`)
  })
})
