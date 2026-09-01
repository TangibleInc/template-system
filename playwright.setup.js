/**
 * Based on https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/playwright/global-setup.js
 */
import { request } from '@playwright/test'
import { RequestUtils } from '@wordpress/e2e-test-utils-playwright'
import { wp } from './tests/wp.js'

/**
 * @param {import('@playwright/test').FullConfig} config
 * @return {Promise<void>}
 */
async function globalSetup(config) {

  const { storageState, baseURL } = config.projects[0].use
  const storageStatePath =
    typeof storageState === 'string' ? storageState : undefined

  const requestContext = await request.newContext({
    baseURL,
  })

  const requestUtils = new RequestUtils(requestContext, {
    storageStatePath,
    baseURL,
  })

  /**
   * PHPUnit tests might set pretty permalinks without rewriting .htaccess,
   * which will returns 404 in our end-to-end tests
   *
   * @see set_permalink_structure() in tests/language/tags/url.php
   *
   * To make sure .htaccess matches the url structure, we ran the rewrite
   * command before running our end-to-end tests
   *
   * @see https://developer.wordpress.org/cli/commands/rewrite/structure/
   */
  wp('rewrite structure /%postname%/ --hard', { stdio: 'ignore' })

  // Authenticate and save the storageState to disk.
  await requestUtils.setupRest()

  await requestContext.dispose()
}

export default globalSetup
