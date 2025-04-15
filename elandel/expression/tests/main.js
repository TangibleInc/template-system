import { test, is, ok, run } from 'testra'
import { parse, compile } from '../index.js'
import { any, same, inspect } from './common.js'

const context = { a: { b: 1 }, c: 5, Math }
console.log('Context:', inspect(context))

test('parser', () => {
  let expression = 'a.b + Math.sqrt(c - 1)'
  let tree = parse(expression)

  console.log('Expression:', expression)
  console.log('Parsed:', inspect(tree))

  is(
    ['+', ['.', 'a', 'b'], ['()', ['.', 'Math', 'sqrt'], ['-', 'c', [, 1]]]],
    tree,
    expression,
  )
})

test('evaluator', () => {
  let expression = 'a.b + Math.sqrt(c - 1)'
  let tree = parse(expression)
  let fn = compile(tree)
  let result = fn(context) // 3
  console.log('Result:', result)

  is(3, result, expression)

  expression = 'a.b + c'
  tree = parse(expression)

  console.log('Expression:', expression)
  console.log('Parsed:', inspect(tree))

  fn = compile(tree)

  result = fn(context)
  console.log(result)

  is(6, result, expression)
})

test('expressions', () => {
  const context = {
    a: 2,
    b: 3,
    c: 5,
    d: 2,
    f: { g: [123] },
    i: { j: (b) => (n) => (b ? n + 1 : n - 1), k: 1 },
  }
  console.log('Context:', inspect(context))

  let expression = `1 + (a * b / c % d) - 2.0 + -3e-3 * +4.4e4 / f.g[0] - i.j(+k == 1)(0)`
  let tree = parse(expression)
  console.log('Expression:', expression)
  console.log('Parsed:', inspect(tree))

  let fn = compile(tree)
  let result = fn(context)
  console.log('Result:', result)
  is('0.12682926829268304', result.toString())

  expression = `e=a+b+c; d; e`
  tree = parse(expression)
  console.log(tree)
  result = compile(tree)(context)
  console.log(result)
})
