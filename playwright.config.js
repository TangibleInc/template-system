import path, { dirname } from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'url'
import { defineConfig, devices } from '@playwright/test'

const __dirname = dirname(fileURLToPath(import.meta.url))
const cwd = process.cwd()

process.env.WP_ARTIFACTS_PATH ??= path.join(cwd, 'artifacts')
process.env.STORAGE_STATE_PATH ??= path.join(
  process.env.WP_ARTIFACTS_PATH,
  'storage-states/admin.json'
)


/**
 * Get port for test site
*/
const testSitePort = (function getTestSitePort() {
  for (const file of [
    '.wp-env.override.json',
    '.wp-env.json'
  ]) {
  try {
    const config = JSON.parse(readFileSync(
      path.join(cwd, file), 'utf-8'
      ))
      if (config.testsPort) {
        return config.testsPort
      }
    } catch(e) { /* OK */ }
  }
  return 8889 // Default port for wp-env's test site
})()
    
/**
 * Necessary because @wordpress/e2e-test-utils-playwright
 * doesn't have an option to change the port
 */
if (!process.env.WP_BASE_URL) {
  const testSiteUrl = `http://localhost:${testSitePort}`
  process.env.WP_BASE_URL = testSiteUrl
}

// console.log(`Playwright test site at ${process.env.WP_BASE_URL}`)

/**
 * Based on https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/playwright.config.js
 *
 * Copied to avoid having to install @wordpress/script which comes with many
 * unnecessary dependencies.
 */
const config = defineConfig({
  reporter: process.env.CI ? [['github']] : [['list']],
  forbidOnly: !!process.env.CI,
  // fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  timeout: parseInt(process.env.TIMEOUT || '', 10) || 100_000, // Defaults to 100 seconds.
  // Don't report slow test "files", as we will be running our tests in serial.
  reportSlowTests: null,
  // testDir: './specs',
  outputDir: path.join(process.env.WP_ARTIFACTS_PATH, 'test-results'),
  snapshotPathTemplate:
    '{testDir}/{testFileDir}/__snapshots__/{arg}-{projectName}{ext}',
  // globalSetup: require.resolve('./playwright/global-setup.js'),
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

  testDir: 'tests/e2e',
  testMatch: '**/*.js',
  testIgnore: 'playwright.setup.js',
  globalSetup: path.join(__dirname, 'tests/e2e/playwright.setup.js'),
  webServer: {
    command: 'npm run start',
    timeout: 120_000, // 120 seconds.
    reuseExistingServer: true,
    port: testSitePort,
  },
})

export default config
