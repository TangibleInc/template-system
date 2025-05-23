import { lookup, next, err } from '../parse.js'
import { PERIOD, _0, _E, _e, _9 } from '../const.js'

// parse number
const num = (a, _) => [
  ,
  (a = +next(
    (c) =>
      c === PERIOD || (c >= _0 && c <= _9) || (c === _E || c === _e ? 2 : 0),
  )) != a
    ? err()
    : a,
]

// .1
lookup[PERIOD] = (a) => !a && num()

// 0-9
for (let i = _0; i <= _9; i++) lookup[i] = (a) => (a ? err() : num())
