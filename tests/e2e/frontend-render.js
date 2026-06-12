import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { execSync } from 'node:child_process'

const { describe } = test

/**
 * Frontend render scenarios: compiled templates on real pages, paginator
 * behavior in a real browser, and the Redirect tag over HTTP. These cover
 * the categories that string-parity tests cannot reach.
 */

// The e2e suite targets the tests instance (port 8889), so seed there
const wp = (command) =>
  execSync(`npx wp-env run tests-cli wp ${command}`, { encoding: 'utf8' })

const setCompileSetting = (enabled) => {
  wp(
    `eval "` +
      `$k = tangible\\template_system::$state->settings_key; ` +
      `$s = get_option($k) ?: []; ` +
      `$s['compile_php_templates'] = ${enabled ? 'true' : 'false'}; ` +
      `update_option($k, $s); echo 'ok';"`,
  )
}

describe('Frontend render', () => {
  test.beforeAll(async () => {
    /**
     * PHPUnit runs reinstall the tests-site database, deactivating plugins
     * and wiping seeds - make this suite self-sufficient.
     */
    wp('plugin activate tangible-template-system')
    wp(
      'eval-file wp-content/plugins/tangible-template-system/tests/e2e/seed.php',
    )
  })

  test.afterAll(async () => {
    setCompileSetting(false)
  })

  test('Compiled page output matches interpreted output', async ({ page }) => {
    setCompileSetting(false)
    await page.goto('/?pagename=e2e-compile-page')
    const interpreted = await page.locator('#parity-zone').innerHTML()

    expect(interpreted).toContain('Hello visitor')
    expect(interpreted).toContain('fallback works')
    expect(interpreted).toContain('x,y,')
    expect(interpreted).toContain('E2E Post A;E2E Post B;E2E Post C;')

    setCompileSetting(true)
    await page.goto('/?pagename=e2e-compile-page')
    const compiled = await page.locator('#parity-zone').innerHTML()

    expect(compiled).toBe(interpreted)

    // Second request serves the already-compiled file
    await page.goto('/?pagename=e2e-compile-page')
    const compiledCached = await page.locator('#parity-zone').innerHTML()
    expect(compiledCached).toBe(interpreted)
  })

  test('Paginator changes page content', async ({ page }) => {
    setCompileSetting(false)
    await page.goto('/?pagename=e2e-paged-page')

    const rows = page.locator('.e2e-row')
    await expect(rows).toHaveText(['E2E Post A', 'E2E Post B'])

    // Page 2 via the paginator buttons (AJAX)
    await page
      .locator('.tangible-paginator-buttons')
      .getByText('2', { exact: true })
      .click()

    await expect(rows).toHaveText(['E2E Post C'])
  })

  test('Paginator scroll_top scrolls back to the loop', async ({ page }) => {
    /**
     * Reported broken on tangibletalk.com thread #1313: scroll_top=true
     * has no effect after page change. This pins the documented behavior.
     */
    setCompileSetting(false)
    await page.goto('/?pagename=e2e-paged-page')

    /**
     * Layout: 1500px spacer, then the loop (2 rows x 800px on page one),
     * then the buttons. Scrolling to the buttons puts the viewport well
     * below the loop's top; scroll_top must bring it back there.
     */
    const targetTop = await page.evaluate(() => {
      const el = document.querySelector('.tangible-paginator-target')
      return el.getBoundingClientRect().top + window.scrollY
    })

    await page
      .locator('.tangible-paginator-buttons')
      .scrollIntoViewIfNeeded()
    const before = await page.evaluate(() => window.scrollY)
    expect(before).toBeGreaterThan(targetTop + 300)

    await page
      .locator('.tangible-paginator-buttons')
      .getByText('2', { exact: true })
      .click()
    await expect(page.locator('.e2e-row')).toHaveText(['E2E Post C'])

    // Documented: scroll_top=true returns the viewport to the loop's top
    await page.waitForTimeout(1500) // allow scroll animation
    const after = await page.evaluate(() => window.scrollY)
    expect(after).toBeLessThan(before - 300)
    expect(Math.abs(after - targetTop)).toBeLessThan(150)
  })

  test('Redirect tag redirects over HTTP', async ({ page }) => {
    setCompileSetting(false)
    await page.goto('/?pagename=e2e-redirect-page')
    await expect(page).toHaveURL(/e2e-compile-page/)
    await expect(page.locator('#parity-zone')).toContainText('Hello visitor')
  })
})
