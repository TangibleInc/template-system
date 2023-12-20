import path, { dirname } from 'node:path'
import { fileURLToPath } from 'url'
import { defineConfig, devices } from '@playwright/test'

const __dirname = dirname(fileURLToPath(import.meta.url))

process.env.WP_ARTIFACTS_PATH ??= path.join(process.cwd(), 'artifacts')
process.env.STORAGE_STATE_PATH ??= path.join(
  process.env.WP_ARTIFACTS_PATH,
  'storage-states/admin.json'
)

/**
 * Based on https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/playwright.config.js
 *
 * Copied to avoid having to install @wordpress/script which comes with many unnecessary dependencies.
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
    baseURL: process.env.WP_BASE_URL || 'http://localhost:8889',
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
    command: 'npm run env:start',
    port: 8889,
    timeout: 120_000, // 120 seconds.
    reuseExistingServer: true,
  },
})

export default config
