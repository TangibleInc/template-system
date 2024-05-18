import { test, is, ok, run } from 'testra'
import { NodePHP } from '@php-wasm/node'
import { readJson } from './common.ts'

run(async () => {
  const { php, phpx } = await createPhp()

  const fixtures = {
    rules: await readJson('./rules.json'),
    tests: await readJson('./tests.json'),
  }

  const applyLogic = async (logic, data = {}) => {
    return JSON.parse(
      await phpx(`
include '/logic/index.php';

$logic = json_decode(<<<JSON
${JSON.stringify(logic)}
JSON, true);

$data = json_decode(<<<JSON
${JSON.stringify(data)}
JSON, true);

echo json_encode(tangible\\logic\\apply($logic, $data));
`))
  }

  const ruleLike = async (rule, pattern = {}) => {
    return JSON.parse(
      await phpx(`
include '/logic/index.php';

$rule = json_decode(<<<JSON
${JSON.stringify(rule)}
JSON, true);

$pattern = json_decode(<<<JSON
${JSON.stringify(pattern)}
JSON, true);

echo json_encode(tangible\\logic\\rule_like($rule, $pattern));
`),
    )
  }

  test('php', async () => {
    ok(php, 'exists')
    is('hi', await phpx`echo 'hi';`, 'can run')
    is(
      'true',
      await phpx`
include '/logic/index.php';
echo function_exists('tangible\\logic\\apply') ? 'true' : 'false';
`,
      'function tangible\\logic\\apply',
    )

    const logic = {
      '==': [1, 1],
    }

    is(true, await applyLogic(logic), JSON.stringify(logic))

    // All rules
    for (const test of fixtures.rules) {
      if (typeof test === 'string') {
        if (test === 'EOF') break
        console.log('PHP rule:', test)
        continue
      }
      const [rule, pattern, expected] = test

      is(
        expected,
        await ruleLike(rule, pattern),
        JSON.stringify([rule, pattern]),
      )
    }

    // All tests
    for (const test of fixtures.tests) {
      if (typeof test === 'string') {
        if (test === 'EOF') break
        console.log('PHP test:', test)
        continue
      }
      const [logic, data, expected] = test

      is(expected, await applyLogic(logic, data), JSON.stringify(logic))
    }
  })

  test('php rules', async () => {
    const exampleRule = { control: 'example', value: 1 }

    let logic = {
      rule: exampleRule,
    }
    let data = {}

    let result = JSON.parse(
      await phpx(`
include '/logic/index.php';

use tangible\\logic;

$logic = json_decode(<<<'JSON'
${JSON.stringify(logic)}
JSON, true);

$data = json_decode(<<<'JSON'
${JSON.stringify(data)}
JSON, true);

$result = [
  'called' => [],
  'value' => null
];

logic\\add_rule_evaluator(function($rule) use (&$result) {
  $result['called'] []= $rule;
});

logic\\add_rule_evaluator(function($rule) use (&$result) {
  $result['called'] []= true;
  return true;
});

logic\\add_rule_evaluator(function($rule) use (&$result) {
  $result['called'] []= true;
  return false;
});

$result['value'] = logic\\apply($logic, $data);
$result['evaluators'] = count(logic::$rule_evaluators);
$result['rule'] = $logic['rule'];

echo json_encode($result);
`),
    )

    ok(result, 'result from rule evaluators')
    console.log(result)
    is(exampleRule, result.called[0], 'evaluator is called with rule')
    is(
      2,
      result.called.length,
      'third rule evaluator not called because result exists',
    )
    is(true, result.value, 'final value is true')
  })

  test('php logic evaluate', async () => {

    const logic = {
      rule: { control: 'example', value: 1 }
    }
    const data = {
      example: 1
    }

    let result = JSON.parse(
      await phpx(`
include '/logic/index.php';

$logic = json_decode(<<<JSON
${JSON.stringify(logic)}
JSON, true);

$data = json_decode(<<<JSON
${JSON.stringify(data)}
JSON, true);

$evaluator = function($rule, $data) {
  return ($data[ $rule['control'] ] ?? null) === ($rule['value'] ?? null);
};

echo json_encode(tangible\\logic\\evaluate($logic, $evaluator, $data));
`))

    is(true, result, 'evaluate result true')
  })


})

export async function createPhp(options = {}) {
  const php = await NodePHP.load('8.3')
  // php.useHostFilesystem()
  php.mount(process.cwd(), '/logic')

  const phpStart = '<?php '
  const phpStartRegex = /^<\?php /

  const phpx = async (code, ...args) => {
    if (Array.isArray(code)) {
      code = code.reduce(
        (prev, now, index) => prev + now + (args[index] ?? ''),
        '',
      )
    }

    let result
    try {
      result = await php.run({
        code: phpStart + code.replace(phpStartRegex, ''),
      })
    } catch (e) {
      result = { errors: e.message }
    }
    const { text, errors } = result
    if (errors) throw errors
    else return text
  }

  return { php, phpx }
}
