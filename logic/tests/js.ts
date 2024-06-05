import { test, is, ok, run } from 'testra'
import { readJson } from './common.ts'
import { apply, ruleLike, addRuleEvaluator, evaluate } from '../index.ts'

run(async () => {
  const fixtures = {
    rules: await readJson('./rules.json'),
    tests: await readJson('./tests.json'),
  }

  test('js', async () => {
    ok(apply, 'exists')

    const logic = {
      '==': [1, 1],
    }

    is(true, await apply(logic), JSON.stringify(logic))

    // All rules
    for (const test of fixtures.rules) {
      if (typeof test === 'string') {
        if (test === 'EOF') break
        console.log('JS rule:', test)
        continue
      }
      const [rule, pattern, expected] = test

      is(expected, ruleLike(rule, pattern), JSON.stringify([rule, pattern]))
    }

    // All tests
    for (const test of fixtures.tests) {
      if (typeof test === 'string') {
        if (test === 'EOF') break
        console.log('JS test:', test)
        continue
      }
      const [logic, data, expected] = test

      is(expected, await apply(logic, data), JSON.stringify(logic))
    }
  })

  test('js rules', async () => {
    const exampleRule = { control: 'example', value: 1 }

    addRuleEvaluator((rule) => {
      ok(true, 'rule evaluator is called')
      is(exampleRule, rule, 'rule evaluator is called with rule')
    })

    addRuleEvaluator((rule) => {
      ok(true, 'second rule evaluator is called')
      is(exampleRule, rule, 'second rule evaluator is called with rule')
      return true
    })

    let called = false

    addRuleEvaluator((rule) => {
      called = true
    })

    apply({
      rule: exampleRule,
    })

    is(false, called, 'third rule evaluator is not called when result exists')
  })

  test('js logic evaluate', async () => {
    const data = {
      example: 1,
    }
    let called = false
    const evaluator = (rule, data) => {
      called = true
      return data[rule.control] === rule.value
    }
    let result = evaluate(
      {
        rule: { control: 'example', value: 1 },
      },
      evaluator,
      data,
    )

    is(true, called, 'evaluate calls rule evaluator')
    is(true, result, 'evaluate result true')
  })
})
