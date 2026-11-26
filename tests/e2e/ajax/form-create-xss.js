import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { useGuestAjax } from './utils.js'
import { wp } from '../../wp.js'

const { describe, afterEach } = test

/**
 * Unauthenticated stored XSS through the Form "create" action.
 *
 * A guest submits the create action with the payload as a string field, as an
 * array element and nested inside an array. The create action strips tags at
 * every depth, so neither the stored meta nor the display page carries it.
 *
 * The guest reaching storage at all (the submit succeeds) is the premise of
 * the form feature, not the defect, so that step is expected to succeed.
 *
 * @see form/actions/create.php
 */
describe('Security: unauthenticated stored XSS via Form create', () => {

  const ajax = useGuestAjax()

  // Unquoted attributes, so json_encode of the array does not add backslashes
  const MARKER = 'xsspoc9f83a1'
  const PAYLOAD = `<img src=x onerror=window.${MARKER}=1>`

  // Read the guest nonce and the signed form location from the form page
  const readForm = async () => {
    const html = await (await ajax.get('/?pagename=e2e-ajax-xss-form')).text()

    const nonce = html.match(
      /TangibleAjaxConfig[\s\S]*?"nonce":"([a-f0-9]+)"/,
    )?.[1]
    const forms = html.match(
      /window\.Tangible\.forms\s*=\s*(\[[\s\S]*?\])\s*<\/script>/,
    )?.[1]

    if (!nonce) throw new Error('Tangible ajax nonce not found on the form page')
    if (!forms) throw new Error('window.Tangible.forms not found on the form page')

    const { location, hash } = JSON.parse(forms)[0]
    return { nonce, location, hash }
  }

  /**
   * Posts the create action stores, removed after each spec: they are untitled
   * posts of type "post", so left in place they shift the title-ordered pages
   * and the search results the table specs expect.
   */
  const created = []

  afterEach(() => {
    if (created.length) wp(`post delete ${created.join(' ')} --force`)
    created.length = 0
  })

  // Submit the create action as a guest: "note" as a string, "message" as an array with a nested array
  const submitPayload = async () => {
    const { nonce, location, hash } = await readForm()

    const form = {
      action: 'tangible_ajax_tangible_form_handler',
      nonce,
      'data[hash]': hash,
      'data[data][note]': PAYLOAD,
      'data[data][message][0]': PAYLOAD,
      'data[data][message][1][nested]': PAYLOAD,
    }
    for (const [key, value] of Object.entries(location)) {
      form[`data[location][${key}]`] = value
    }

    const res = await ajax.post(form)
    const result = await res.json()
    if (result.data?.id) created.push(result.data.id)
    return result
  }

  test('string, array and nested values are not stored as markup', async () => {

    const result = await submitPayload()

    // Premise: the guest create reaches storage (stays true after the fix)
    expect(result.success).toBe(true)
    expect(result.data?.id).toBeTruthy()

    // Each field is stored, and keeps no raw tag at any depth
    const meta = JSON.parse(
      wp(`post meta list ${result.data.id} --format=json`),
    )
    for (const key of ['note', 'message']) {
      const entry = meta.find((row) => row.meta_key === key)
      expect(entry).toBeTruthy()

      const stored = JSON.stringify(entry.meta_value)
      expect(stored).not.toContain('<img')
      expect(stored).not.toContain(`onerror=window.${MARKER}`)
    }
  })

  test('display page does not render the payload as live markup', async ({
    browser,
  }) => {

    await submitPayload()

    // A fresh, cookieless visitor loads the public display page
    const guest = await browser.newContext({
      storageState: { cookies: [], origins: [] },
    })
    const page = await guest.newPage()

    try {
      await page.goto('/?pagename=e2e-ajax-xss-display')

      // Source: the body must not carry the unescaped tag
      const zone = await page.locator('#xss-zone').innerHTML()
      expect(zone).not.toContain('<img src=x onerror=')

      // Execution: the onerror handler must not have run
      const fired = await page.evaluate((marker) => window[marker], MARKER)
      expect(fired).toBeFalsy()
    } finally {
      await guest.close()
    }
  })
})
