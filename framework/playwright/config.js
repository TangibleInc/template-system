/**
 * Playwright configuration
*
 * @see https://playwright.dev/docs/test-configuration
 * 
 * - Based on https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/playwright.config.js. Forked because `@wordpress/scripts` has many unnecessary dependencies
 * - Must run before importing `@wordpress/e2e-test-utils-playwright` to be able
 * to override its default port number
 */
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'url'
import { defineConfig, devices } from '@playwright/test'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function createConfig(userConfig = {}) {

  const cwd = userConfig.cwd || process.cwd()

  process.env.WP_ARTIFACTS_PATH ??= path.join(cwd, 'artifacts')
  process.env.STORAGE_STATE_PATH ??= path.join(
    process.env.WP_ARTIFACTS_PATH,
    'storage-states/admin.json',
  )

  const testSitePort = userConfig.port || 8881
  const testDir = userConfig.testDir || __dirname // path.join(cwd, 'tests/e2e')
  const testMatch = userConfig.testMatch || '**/*.js'

  /**
   * Workaround because @wordpress/e2e-test-utils-playwright
   * doesn't have an option to change the port.
   */
  if (!process.env.WP_BASE_URL) {
    const testSiteUrl = `http://localhost:${testSitePort}`
    process.env.WP_BASE_URL = testSiteUrl
  }

  const config = {
    reporter: process.env.CI ? [['github']] : [['list']],
    forbidOnly: !!process.env.CI,
    fullyParallel: false,
    workers: 1,
    retries: process.env.CI ? 2 : 0,
    timeout: parseInt(process.env.TIMEOUT || '', 10) || 100_000, // Defaults to 100 seconds.
    // Don't report slow test "files", as we will be running our tests in serial.
    reportSlowTests: null,
    outputDir: path.join(process.env.WP_ARTIFACTS_PATH, 'test-results'),
    snapshotPathTemplate:
      '{testDir}/{testFileDir}/__snapshots__/{arg}-{projectName}{ext}',
    use: {
      baseURL: process.env.WP_BASE_URL,
      headless: true,
      viewport: {
        width: 960,
        height: 700,
      },
      ignoreHTTPSErrors: true,
      locale: 'en-US',
      contextOptions: {
        reducedMotion: 'reduce',
        strictSelectors: true,
      },
      storageState: process.env.STORAGE_STATE_PATH,
      actionTimeout: 10_000, // 10 seconds
      trace: 'retain-on-failure',
      screenshot: 'only-on-failure',
      video: 'on-first-retry',
    },
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
    ],
  
    // Custom
  
    testDir,
    testMatch,
    testIgnore: [
      'playwright.*.js',
    ],
    globalSetup: path.join(__dirname, 'setup.js'),
    webServer: {
      command: `wp-now start --port ${testSitePort} --path ${testDir} --skip-browser`,
      url: process.env.WP_BASE_URL,
      timeout: 120_000, // 120 seconds.
      reuseExistingServer: true,
    },
  }

  Object.assign(config, userConfig instanceof Function
    ? userConfig(config)
    : userConfig
  )

  return defineConfig(config)  
}
