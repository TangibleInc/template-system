import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { useGuestAjax, SECRET_OPTION_VALUE } from './utils.js'

const { describe } = test

/**
 * tangible_template_logic_evaluate runs the JsonLogic engine over an empty data
 * context, so it computes but cannot read WordPress data. Not hash-gated.
 *
 * @see language/ajax/index.php
 * @see logic/index.php
 */
describe('AJAX permission: tangible_template_logic_evaluate', () => {

  const ajax = useGuestAjax()

  test('does not expose a site option to a guest', async () => {

    const nonce = await ajax.nonce()

    // A var lookup reads the data context, which is empty here, so it can't reach an option
    const res = await ajax.post({
      action: 'tangible_ajax_tangible_template_logic_evaluate',
      nonce,
      'data[var]': 'tangible_e2e_secret_option',
    })
    const body = await res.text()

    // It ran (success:true) and still returned no option value
    expect(body).toContain('"success":true')
    expect(body).not.toContain(SECRET_OPTION_VALUE)
  })
})
