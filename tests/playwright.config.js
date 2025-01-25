import path, { dirname } from 'node:path'
import { fileURLToPath } from 'url'
import { createConfig } from '@tangible/env/playwright/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default createConfig({
  testDir: __dirname,
  testMatch: 'e2e/**/*.js',
})
