import { test, is, run, throws } from 'testra'
import { stringify } from '../stringify.js'

let src = `1 + (a * b / c % d) - 2 + -0.003 * +44000 / f.g[0] - i.j(+k == 1)(10)`
let nodes = [
  '-',
  [
    '+',
    ['-', ['+', [, 1], ['()', ['%', ['/', ['*', 'a', 'b'], 'c'], 'd']]], [, 2]],
    [
      '/',
      ['*', ['-', [, 0.003]], ['+', [, 44000]]],
      ['[]', ['.', 'f', 'g'], [, 0]],
    ],
  ],
  ['()', ['()', ['.', 'i', 'j'], ['==', ['+', 'k'], [, 1]]], [, 10]],
]

test('stringify: perf test', () => {
  is(stringify(nodes), src)
})

test('stringify: parse base', () => {
  is('a >> b', stringify(['>>', 'a', 'b']), 'a >> b')
  is('a || b', stringify(['||', 'a', 'b']), 'a || b')
  is('a && b || c', stringify(['||', ['&&', 'a', 'b'], 'c']), 'a && b || c')
  is('a && b || c', stringify(['||', ['&&', 'a', 'b'], 'c']), 'a && b || c')
  is('a >> b', stringify(['>>', 'a', 'b']), 'a >> b')
  is('a()', stringify(['()', 'a', null]), 'a()')
  is('1 + 2 + 3', stringify(['+', ['+', [, 1], [, 2]], [, 3]]), '1 + 2 + 3')
  is('a + b * c', stringify(['+', 'a', ['*', 'b', 'c']]), 'a + b * c')
  is('a * b + c', stringify(['+', ['*', 'a', 'b'], 'c']), 'a * b + c')
  is(
    'a + b * c + d',
    stringify(['+', ['+', 'a', ['*', 'b', 'c']], 'd']),
    'a + b * c + d',
  )
  is(`(a + b)`, stringify(['()', ['+', 'a', 'b']]), `(a + b)`)
  is(
    `a + (b + c)`,
    stringify(['+', 'a', ['()', ['+', 'b', 'c']]]),
    `a + (b + c)`,
  )
  is(`a + (b)`, stringify(['+', 'a', ['()', 'b']]), `a + (b)`)
  is(
    `a + (b) + c + ((d))`,
    stringify(['+', ['+', ['+', 'a', ['()', 'b']], 'c'], ['()', ['()', 'd']]]),
    `a + (b) + c + ((d))`,
  )
  is(`-b`, stringify(['-', 'b']), `-b`)
  is(`a(c).e`, stringify(['.', ['()', 'a', 'c'], 'e']), `a(c).e`)
  is(`a(a)`, stringify(['()', 'a', 'a']), `a(a)`)
  is(`a(a).b`, stringify(['.', ['()', 'a', 'a'], 'b']), `a(a).b`)
  is('a[b][c]', stringify(['[]', ['[]', 'a', 'b'], 'c']), 'a[b][c]')
  is('a.b.c', stringify(['.', ['.', 'a', 'b'], 'c']), 'a.b.c')
  is(
    'a.b.c(d).e',
    stringify(['.', ['()', ['.', ['.', 'a', 'b'], 'c'], 'd'], 'e']),
    'a.b.c(d).e',
  )
  is(`+-b`, stringify(['+', ['-', 'b']]), `+-b`)
  is(`+-a.b`, stringify(['+', ['-', ['.', 'a', 'b']]]), `+-a.b`)
  is(`a + -b`, stringify(['+', 'a', ['-', 'b']]), `a + -b`)
  is(`-a.b + a`, stringify(['+', ['-', ['.', 'a', 'b']], 'a']), `-a.b + a`)
  is(`-a - b`, stringify(['-', ['-', 'a'], 'b']), `-a - b`)
  is(
    `+-a.b + -!a`,
    stringify(['+', ['+', ['-', ['.', 'a', 'b']]], ['-', ['!', 'a']]]),
    `+-a.b + -!a`,
  )
  is(`1`, stringify([, 1]), `1`)

  // (parse(`   .1   +   -1.0 -  2.ce+1 `), stringify(['-', ['+', '.1', ['-', '1']], '2c']))
  is(`(a , b)`, stringify(['()', [',', 'a', 'b']]), `(a , b)`)
  is(`a * c / b`, stringify(['/', ['*', 'a', 'c'], 'b']), `a * c / b`)
  is('a(b)(c)', stringify(['()', ['()', 'a', 'b'], 'c']), 'a(b)(c)')
  is(
    `"abcd" + "efgh"`,
    stringify(['+', [, 'abcd'], [, 'efgh']]),
    `"abcd" + "efgh"`,
  )
  is('0 + 1 + 2', stringify(['+', ['+', [, 0], [, 1]], [, 2.0]]), '0 + 1 + 2')
  is(
    '0 * 1 * 2 / 1 / 2 * 1',
    stringify([
      '*',
      ['/', ['/', ['*', ['*', ['', 0], ['', 1]], ['', 2]], ['', 1]], ['', 2]],
      ['', 1],
    ]),
    '0 * 1 * 2 / 1 / 2 * 1',
  )

  is(
    'a()()()',
    stringify(['()', ['()', ['()', 'a', null], null], null]),
    'a()()()',
  )
  is(
    `a(ccc.d , -+1)`,
    stringify(['()', 'a', [',', ['.', 'ccc', 'd'], ['-', ['+', ['', 1]]]]]),
    `a(ccc.d , -+1)`,
  )
})
