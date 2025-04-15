import { inspect as _inspect } from 'node:util'
import { test } from 'testra'

export const any = (a, b) =>
  is(true, b.includes(a), `${JSON.stringify(a)} in ${JSON.stringify(b)}`)

export const same = (a, b) =>
  is(true, sameMembers(a, b), `${JSON.stringify(a)} same ${JSON.stringify(b)}`)

export const inspectOptions = {
  colors: true,
  depth: Infinity,
}

export const inspect = (o) => _inspect(o, inspectOptions)

test.todo = () => {}
test.skip = () => {}
