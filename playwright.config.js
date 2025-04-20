/**
 * Playwright configuration
 * Based on https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/playwright.config.js
 * @see https://playwright.dev/docs/test-configuration
 */
import path, { dirname } from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'url'
import { defineConfig, devices } from '@playwright/test'

const __dirname = dirname(fileURLToPath(import.meta.url))
const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'))

export default (function createConfig() {
  const cwd = process.cwd()
  const testDir = path.join(cwd, 'tests')
  const testMatch = 'e2e/**/*.js'
  const timeout = parseInt(process.env.TIMEOUT || '', 10) || 100_000 // Defaults to 100 seconds
  const artifactsPath = (process.env.WP_ARTIFACTS_PATH ??= path.join(
    cwd,
    'artifacts',
  ))
  const storageStatePath = (process.env.STORAGE_STATE_PATH ??= path.join(
    artifactsPath,
    'storage-states',
    'admin.json',
  ))

  // https://playwright.dev/docs/test-global-setup-teardown
  const globalSetup = path.join(__dirname, 'playwright.setup.js')

  let testSitePort = readJson('.wp-env.json').testsPort || 8889
  try {
    testSitePort = readJson('.wp-env.override.json').testsPort || testSitePort
  } catch (e) {}

  // Env variable used by @wordpress/e2e-test-utils-playwright
  let testSiteUrl =
    process.env.WP_BASE_URL ||
    (process.env.WP_BASE_URL = `http://localhost:${testSitePort}`)

  const config = {
    reporter: process.env.CI ? [['github']] : [['list']],
    forbidOnly: !!process.env.CI,
    fullyParallel: false,
    workers: 1,
    retries: process.env.CI ? 2 : 0,
    timeout,
    // Don't report slow test "files", as we will be running our tests in serial.
    reportSlowTests: null,
    outputDir: path.join(artifactsPath, 'test-results'),
    snapshotPathTemplate:
      '{testDir}/{testFileDir}/__snapshots__/{arg}-{projectName}{ext}',
    use: {
      baseURL: testSiteUrl,
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
      storageState: storageStatePath,
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
    testIgnore: ['playwright.*.js'],
    globalSetup,
    webServer: {
      command: `wp-env start`,
      url: testSiteUrl,
      timeout: 120_000, // 120 seconds.
      reuseExistingServer: true,
    },
  }

  return defineConfig(config)
})()
