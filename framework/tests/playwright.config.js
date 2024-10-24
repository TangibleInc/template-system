import path from 'node:path'
import { fileURLToPath } from 'url'
import { createConfig } from '../playwright/config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default createConfig({
  testDir: __dirname,
  testMatch: '**/*.js'
})
