import { test } from '@wordpress/e2e-test-utils-playwright'
import { request as playwrightRequest } from '@playwright/test'
import { wp } from '../../wp.js'

const baseURL = process.env.WP_BASE_URL || 'http://localhost:8889'
const ajaxURL = `${baseURL}/wp-admin/admin-ajax.php`

// Secret values seed.php plants, so a guest response must never contain them
const SECRET_USER_EMAIL = 'e2e-admin-secret@example.test'
const SECRET_OPTION_VALUE = 'SECRET-OPTION-VALUE-9f83a1'

/**
 * Server-issued hash the gated endpoints expect, computed the way the plugin
 * does. Takes a PHP array literal string (the tag attributes or location).
 *
 * @see language/utils/hash.php
 */
const sign = (phpArray) =>
  wp(
    `eval 'echo tangible\\template_system::$html->create_tag_attributes_hash(${phpArray});'`,
  ).trim()

let seeded = false

const seed = () => {

  if (seeded) return

  wp('plugin activate tangible-template-system')
  wp('eval-file wp-content/plugins/tangible-template-system/tests/e2e/ajax/seed.php')
  seeded = true
}

/**
 * The Tangible ajax nonce is emitted, as the current user, on any page that
 * enqueues the ajax script (here the seeded Table page).
 */
const readNonce = async (context) => {

  const res = await context.get('/?pagename=e2e-ajax-table')
  const match = (await res.text()).match(
    /TangibleAjaxConfig[\s\S]*?"nonce":"([a-f0-9]+)"/,
  )

  if (!match) throw new Error('Tangible ajax nonce not found on the seeded page')

  return match[1]
}

const context = (get) => ({
  nonce: () => readNonce(get()),
  get: (path) => get().get(path),
  post: (form) => get().post(ajaxURL, { form }),
})

/**
 * Seeds once, then opens a guest (unauthenticated) request context and returns
 * helpers to read the nonce and POST to admin-ajax.php as that guest.
 */
const useGuestAjax = () => {

  let guest

  test.beforeAll(async () => {

    seed()
    guest = await playwrightRequest.newContext({
      baseURL,
      ignoreHTTPSErrors: true,
    })
  })

  test.afterAll(async () => {
    await guest?.dispose()
  })

  return context(() => guest)
}

/**
 * Like useGuestAjax, but logged in as the given user first (a fresh context
 * with that user's session), for the authenticated permission specs.
 */
const useAuthedAjax = (login, pass) => {

  let authed

  test.beforeAll(async () => {

    seed()
    authed = await playwrightRequest.newContext({
      baseURL,
      ignoreHTTPSErrors: true,
    })

    // GET first to set wordpress_test_cookie, then POST the credentials
    await authed.get('/wp-login.php')
    await authed.post('/wp-login.php', {
      form: {
        log: login,
        pwd: pass,
        'wp-submit': 'Log In',
        testcookie: '1',
        redirect_to: `${baseURL}/wp-admin/`,
      },
    })

    // Fail loudly if login did not take, so a spec can't pass unauthenticated
    const { cookies } = await authed.storageState()
    const loggedIn = cookies.some((c) =>
      c.name.startsWith('wordpress_logged_in'),
    )

    if (!loggedIn) throw new Error(`Login failed for ${login}`)
  })

  test.afterAll(async () => {
    await authed?.dispose()
  })

  return context(() => authed)
}

export {
  useGuestAjax,
  useAuthedAjax,
  sign,
  ajaxURL,
  SECRET_USER_EMAIL,
  SECRET_OPTION_VALUE,
}
