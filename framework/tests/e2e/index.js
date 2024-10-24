import { describe, test, expect } from '../../playwright/index.js'

/**
 * Tests to exercise the frontend and admin features.
 *
 * To interact with pages, locate elements by user-visible locators like
 * accessible role, instead of CSS selectors which can change.
 *
 * @see https://playwright.dev/docs/locators#locating-elements
 * @see https://playwright.dev/docs/locators#locate-by-role
 * @see https://www.w3.org/TR/html-aria/#docconformance
 */

describe('Admin', () => {
  test('Dashboard', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    const heading = page.getByRole('heading', {
      name: 'Welcome to WordPress',
      level: 2,
    })
    await expect(heading).toBeVisible()
  })

  const plugins = [
    ['Tangible Framework', 'tangible-framework/plugin'],
    ['E2E', 'tangible-e2e-plugin/index'],
  ]

  for (const [pluginTitle, pluginBasename] of plugins) {

    test(`${pluginTitle} installed`, async ({ admin, page, requestUtils }) => {
      await admin.visitAdminPage('/')

      // const plugins = await requestUtils.rest({
      //   path: 'wp/v2/plugins',
      // })
      // expect(plugins).toContain(pluginBasename)
      // console.log('plugins', plugins)
      try {
        const result = await requestUtils.rest({
          path: `wp/v2/plugins/${pluginBasename}`,
        })
        // console.log('plugin', result)

        expect(result.plugin).toBe(pluginBasename)
      } catch (e) {
        if (e.code === 'rest_plugin_not_found') {
          console.log(`Optional plugin ${pluginTitle} is not installed`)
        } else {
          console.error(e)
        }
      }
    })

    test(`Activate ${pluginTitle}`, async ({
      admin,
      page,
      request,
      requestUtils,
    }) => {
      await admin.visitAdminPage('plugins.php')

      // See if plugin is active or not
      const pluginClasses = await page.evaluate(
        ({ pluginBasename }) => {
          const $row = document.querySelector(
            `[data-plugin="${pluginBasename}.php"]`,
          )
          if (!$row) return []
          return [...$row?.classList]
        },
        { pluginBasename },
      )

      if (pluginTitle !== 'Template System' && !pluginClasses.length) {
        return
      }

      if (!pluginClasses.includes('active')) {
        await expect(pluginClasses).toContain('inactive')

        // Find the Activate link

        const activateLink = await page.evaluate(
          ({ pluginBasename }) => {
            const $row = document.querySelector(
              `[data-plugin="${pluginBasename}.php"]`,
            )
            const $activate = $row.querySelector('a.edit')
            return $activate?.href
          },
          { pluginBasename },
        )

        await expect(activateLink).toBeTruthy()

        // Make a POST request

        await request.post(activateLink)
      }

      const plugin = await requestUtils.rest({
        path: `wp/v2/plugins/${pluginBasename}`,
      })

      expect(plugin.status).toBe('active')
    })
  }
})

describe('Admin menu', () => {
  test('Exists', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    expect(page.getByRole('navigation', { name: 'Main menu' })).toHaveCount(1)
  })

  // test('Tangbile', async ({ admin, page }) => {
  //   await admin.visitAdminPage('/')
  //   expect(
  //     page
  //       .getByRole('navigation', { name: 'Main menu' })
  //       .getByRole('link', { name: 'Tangible' })
  //       .first(),
  //   ).toHaveCount(1)
  // })

  // test('Tangbile -> Fields Example', async ({ admin, page }) => {
  //   await admin.visitAdminPage('/')
  //   expect(
  //     page
  //       .getByRole('link', { name: 'Tangible' })
  //       .locator('xpath=..')
  //       .getByRole('link')
  //       .filter({ hasText: 'Fields Example' }),
  //   ).toHaveCount(1)
  // })
})
