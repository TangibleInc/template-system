# Logic

Build and evaluate conditional rules

## Concepts

### Rule

A "rule" is an object (associative array) that always has a single property, with the key being an operator; and the value as a list of arguments for the operator, or another rule.

```ts
export type Rule = {
  [key in Operator]: RuleValue | RuleValue[]
}
```

#### Example of logic rules

```js
{
  '==': [1, 2]
}
```

..is equivalent to the condition, `1 == 2`.

```js
{
  and: [
    { '>': [1, 2] },
    { '<': [3, 4] }
  ]
}
```

..is `(1 > 2) && (3 < 4)`.

### Operators

Here is a list of currently supported operators.

- `==`
- `===`
- `!=`
- `!==`
- `>`
- `>=`
- `<`
- `<=`
- `!!`
- `!`
- `%`
- `log`
- `in`
- `cat`
- `substr`
- `+`
- `*`
- `-`
- `/`
- `min`
- `max`
- `merge`
- `var`
- `missing`
- `missing_some`
- `rule`
- `and`
- `or`
- `not`
- `all`
- `none`
- `some`
- `filter`
- `map`
- `reduce`
- `if`


## Use

#### Typescript

Basic

```ts
import * as logic from '@tangible/logic'

logic.evaluate({
  '==': [1, 1]
}) // === true
```

Dynamic rules

```ts
const ruleEvaluator = (rule, data) => {
  return data[ rule.key ] === data[ rule.value ]
} 

const condition = {
  rule: { key: 'example', value: '123' }
}

const data = { example: '123' }

const result = logic.evaluate(condition, ruleEvaluator, data)
```

#### PHP

Basic

```php
use tangible\logic;

logic\evaluate([
  '==': [1, 1]  
]); // === true
```

Dynamic rules

```php
$rule_evaluator = function($rule, $data) {
  return $data[ rule['key'] ] === $data[ rule['value'] ];
};

$condition = {
  'rule' => [
    'key' => 'example',
    'value' => '123'
  ]
}

$data = [ 'example' => '123' ];

$result = logic/evaluate($condition, $rule_evaluator, $data);
```


## Use from WordPress plugin or module

Update `composer.json` and run `composer update`.

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "git@github.com:tangibleinc/logic"
    }
  ],
  "require": {
    "tangible/logic": "dev-main"
  },
  "minimum-stability": "dev"
}
```

Load it from plugin or module.

```php
require_once __DIR__ . '/vendor/tangible/logic/module.php';
```

It loads the newest version of this module, even when there are multiple instances loaded. Functions under the namespace `tangible\logic` are ready to use after action `plugins_loaded` priority 0.

In JavaScript, import from the entry file.

```js
import * as logic from './vendor/tangible/logic/index.ts'
```
