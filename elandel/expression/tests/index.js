import { test, is, ok, run } from 'testra'
import { parse, compile } from '../index.js'
import { any, same, inspect } from './common.js'

run(async () => {
  let testName = process.argv.slice(2)[0]
  if (testName) {
    await import(`./${testName}.js`)
    return
  }

  await import('./all.js')
  await import('./main.js')
})
