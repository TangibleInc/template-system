import { test, is, ok, run } from 'testra'
import { readJson } from './common.ts'

run(async () => {
  await import('./js.ts')
  await import('./php.ts')
})
