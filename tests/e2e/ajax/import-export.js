import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { useAuthedAjax } from './utils.js'

const { describe } = test

const EXPORT = 'tangible_ajax_tangible_template_import_export__export'

/**
 * import-export export is an authenticated action gated on
 * current_user_can('manage_options'): a subscriber is refused, an administrator
 * gets through to the action.
 *
 * @see admin/import-export/ajax/index.php
 */
describe('AJAX permission: import-export export', () => {

  const admin = useAuthedAjax('admin', 'password')
  const subscriber = useAuthedAjax('e2e_subscriber', 'e2e-sub-pass')

  test('refuses a subscriber', async () => {

    const nonce = await subscriber.nonce()
    const res = await subscriber.post({ action: EXPORT, nonce })
    const body = await res.text()

    expect(body).toContain('"success":false')
    expect(body).toContain('Must be admin user')
  })

  test('allows an administrator through the capability gate', async () => {

    const nonce = await admin.nonce()
    const res = await admin.post({ action: EXPORT, nonce })
    const body = await res.text()

    // Reached the action (it asks for export_rules), so the admin passed the gate
    expect(body).toContain('export_rules')
    expect(body).not.toContain('Must be admin user')
    expect(body).not.toContain('Bad nonce')
  })
})
