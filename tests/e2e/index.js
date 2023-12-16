import { test, expect } from '@wordpress/e2e-test-utils-playwright'

test.describe('Hello World', () => {
  test('Should load properly', async ({ admin, page }) => {
    await admin.visitAdminPage('/')
    await expect(
      page.getByRole('heading', { name: 'Welcome to WordPress', level: 2 })
    ).toBeVisible()
  })
})

test.describe('Plugin', () => {
  test.beforeAll(async ({ requestUtils }) => {
    // await requestUtils.activateTheme('twentytwentyone')
  })

  test.afterAll(async ({ requestUtils }) => {})

  test('Admin screen can be accessed', async ({ admin, page, request }) => {
    await admin.visitAdminPage('index.php')
    const bodyClasses = await page.evaluate(() => {
      return [...document.body.classList]
    })
    await expect(bodyClasses.includes('wp-admin')).toEqual(true)
  })

  test('Template System installed', async ({ admin, page, requestUtils }) => {

    // const plugins = await requestUtils.rest({
    //   path: 'wp/v2/plugins',
    // })
    // console.log('plugins', plugins)

    const plugin = await requestUtils.rest({
      path: 'wp/v2/plugins/template-system/plugin',
    })

    // console.log('plugin', plugin)

    expect(plugin.plugin).toBe('template-system/plugin')
  })

  test('Activate plugin', async ({ admin, page, request, requestUtils }) => {
    await admin.visitAdminPage('plugins.php')

    // See if plugin is active or not
    const pluginClasses = await page.evaluate(() => {
      const $row = document.querySelector(
        '[data-plugin="template-system/plugin.php"]'
      )
      return [...$row.classList]
    })

    if (!pluginClasses.includes('active')) {
      await expect(pluginClasses).toContain('inactive')

      // Find the Activate link

      const activateLink = await page.evaluate(() => {
        const $row = document.querySelector(
          '[data-plugin="template-system/plugin.php"]'
        )
        const $activate = $row.querySelector('a.edit')
        return $activate?.href
      })

      await expect(activateLink).toBeTruthy()

      await request.post(activateLink)
    }

    const plugin = await requestUtils.rest({
      path: 'wp/v2/plugins/template-system/plugin',
    })

    expect(plugin.status).toBe('active')
  })

  test('Admin menu Tangbile exists', async ({ admin, page, request, requestUtils }) => {

    await admin.visitAdminPage('edit.php?post_type=tangible_template')

    const adminmenuNames = await page.evaluate(() => {
      return [...document.querySelectorAll(
        'ul#adminmenu > li .wp-menu-name'
      )].map(el => el.innerText)
    })

    expect(adminmenuNames).toContain('Tangible')

    const tangibleMenuNames = await page.evaluate(() => {
      return [...document.querySelectorAll(
        'ul#adminmenu li#toplevel_page_tangible .wp-submenu a'
      )].map(el => el.innerText)
    })

    // console.log('tangibleMenuNames', tangibleMenuNames)

    expect(tangibleMenuNames).toContain('Templates')
    expect(tangibleMenuNames).toContain('Layouts')
    expect(tangibleMenuNames).toContain('Styles')
    expect(tangibleMenuNames).toContain('Scripts')
    expect(tangibleMenuNames).toContain('Categories')
    expect(tangibleMenuNames).toContain('Import & Export')
    expect(tangibleMenuNames).toContain('Settings')
  })

})
