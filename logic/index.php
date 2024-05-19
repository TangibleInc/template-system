<?php

namespace tangible {
  class logic {
    public static $operations;
    public static $rule_evaluators = [];
  }  
}

namespace tangible\logic {

  use tangible\logic;

  logic::$operations = [
    '==' => function ($a, $b) {
      return $a == $b;
    },
    '===' => function ($a, $b) {
      return $a === $b;
    },
    '!=' => function ($a, $b) {
      return $a != $b;
    },
    '!==' => function ($a, $b) {
      return $a !== $b;
    },
    '>' => function ($a, $b) {
      return $a > $b;
    },
    '>=' => function ($a, $b) {
      return $a >= $b;
    },
    '<' => function ($a, $b, $c = null) {
      if ($c === null) {
        return $a < $b;
      }
      return  ($a < $b) and ($b < $c) ;
    },
    '<=' => function ($a, $b, $c = null) {
      if ($c === null) {
        return  $a <= $b;
      }
      return ($a <= $b) and ($b <= $c) ;
    },
    '%' => function ($a, $b) {
      return $a % $b;
    },
    '!!' => function ($a) {
      return logic\truthy($a);
    },
    '!' => function ($a) {
      return ! logic\truthy($a);
    },
    'log' => function ($a) {
      error_log($a);
      return $a;
    },
    'var' => function () {
      $values = func_get_args();
      $data = array_pop($values);

      $a = $values[0] ?? null;
      $default = $values[1] ?? null;

      if ($a === null or $a === "") {
        return $data;
      }
      //Descending into data using dot-notation
      //This is actually safe for integer indexes, PHP treats $a["1"] exactly like $a[1]
      foreach (explode('.', $a) as $prop) {
        if ((is_array($data) || $data instanceof \ArrayAccess) && isset($data[$prop])) {
          $data = $data[$prop];
        } elseif (is_object($data) && isset($data->{$prop})) {
          $data = $data->{$prop};
        } else {
          return $default; //Trying to get a value from a primitive
        }
      }
      return $data;
    },
    'missing' => function () {
      /*
      Missing can receive many keys as many arguments, like {"missing:[1,2]}
      Missing can also receive *one* argument that is an array of keys,
      which typically happens if it's actually acting on the output of another command
      (like IF or MERGE)
      */
      $values = func_get_args();
      $data = array_pop($values);
      if (!logic\is_logic($values) and isset($values[0]) and is_array($values[0])) {
        $values = $values[0];
      }
      
      $missing = [];
      foreach ($values as $data_key) {
        $value = logic\apply(['var'=>$data_key], $data);
        if ($value === null or $value === "") {
          array_push($missing, $data_key);
        }
      }
      
      return $missing;
    },
    'missing_some' => function ($minimum, $options, $data = []) {
      $are_missing = logic\apply(['missing'=>$options], $data);
      if (count($options) - count($are_missing) >= $minimum) {
        return [];
      } else {
        return $are_missing;
      }
    },
    'in' => function ($a, $b) {
      if (is_array($b)) {
        return in_array($a, $b);
      }
      if (is_string($b)) {
        return strpos($b, $a) !== false;
      }
      return false;
    },
    'cat' => function () {
      return implode("", array_slice(func_get_args(), 0, -1));
    },
    'max' => function () {
      return max(array_slice(func_get_args(), 0, -1));
    },
    'min' => function () {
      return min(array_slice(func_get_args(), 0, -1));
    },
    '+' => function () {
      return array_sum(array_slice(func_get_args(), 0, -1));
    },
    '-' => function () {
      $args = array_slice(func_get_args(), 0, -1);
      $a = $args[0];
      $b = $args[1] ?? null;
      if ($b===null) {
        return -$a;
      } else {
        return $a - $b;
      }
    },
    '/' => function ($a, $b) {
      return $a / $b;
    },
    '*' => function () {
      return array_reduce(array_slice(func_get_args(), 0, -1), function ($a, $b) {
        return $a*$b;
      }, 1);
    },
    'merge' => function () {
      return array_reduce(array_slice(func_get_args(), 0, -1), function ($a, $b) {
        return array_merge((array)$a, (array)$b);
      }, []);
    },
    'substr' => function () {
      return call_user_func_array('substr', array_slice(func_get_args(), 0, -1));
    },
    'rule' => function ($rule, $data) {
      return logic\evaluate_rule($rule, $data);
    }
  ];

  function add_operation($name, $callable) {
    logic::$operations[$name] = $callable;
  }

  function remove_operation($name, $callable) {
    unset(logic::$operations[$name]);
  }

  function add_rule_evaluator($evaluator) {
    logic::$rule_evaluators []= $evaluator;
  }

  function remove_rule_evaluator($evaluator) {
    logic::$rule_evaluators = array_filter(
      logic::$rule_evaluators,
      function($fn) use ($evaluator) {
        return $fn !== $evaluator;
      }
    );
  }

  function evaluate_rule($rule, $data) {
    foreach (logic::$rule_evaluators as $fn) {
      $result = $fn( $rule, $data );
      if (is_bool($result)) return $result;
    }
  }

  function evaluate($logic, $evaluator = null, $data = []) {
    $prev = logic::$rule_evaluators;
    logic::$rule_evaluators = is_null($evaluator ) ? [] : (
      !is_array($evaluator) ? [$evaluator] : $evaluator
    );
    $result = logic\apply($logic, $data);
    logic::$rule_evaluators = $prev;
    return $result;
  }

  function get_operator($logic) {
    return array_keys($logic)[0];
  }

  function get_values($logic, $fix_unary = true) {
    $op = logic\get_operator($logic);
    $values = $logic[$op];
    
    //easy syntax for unary operators, like ["var" => "x"] instead of strict ["var" => ["x"]]
    if ($fix_unary and (!is_array($values) or logic\is_logic($values))) {
      $values = [ $values ];
    }
    return $values;
  }

  function is_logic($array) {
    return (
      is_array($array)
      and
      count($array) === 1
      and
      is_string(logic\get_operator($array))
    );
  }
  
  function truthy($logic) {
    if ($logic === "0") {
      return true;
    }
    return (bool)$logic;
  }
  
  function apply($logic = [], $data = []) {
  
    // Convert to array syntax
    if (is_object($logic)) {
      $logic = (array) $logic;
    }

    if (!logic\is_logic($logic)) {
      if (is_array($logic)) {
        // Array of logic statements
        return array_map(function ($l) use ($data) {
          return logic\apply($l, $data);
        }, $logic);
      } else {
        return $logic;
      }
    }

    //There can be only one operand per logic step
    $op = logic\get_operator($logic);
    $values = logic\get_values($logic);
    
    /**
    * Most rules need depth-first recursion. These rules need to manage their
    * own recursion. e.g., if you've added an operator with side-effects
    * you only want `if` to execute the minimum conditions and exactly one
    * consequent.
    */
    if ($op === 'if' || $op == '?:') {
      /* 'if' should be called with a odd number of parameters, 3 or greater
      This works on the pattern:
      if( 0 ){ 1 }else{ 2 };
      if( 0 ){ 1 }else if( 2 ){ 3 }else{ 4 };
      if( 0 ){ 1 }else if( 2 ){ 3 }else if( 4 ){ 5 }else{ 6 };
      
      The implementation is:
      For pairs of values (0,1 then 2,3 then 4,5 etc)
      If the first evaluates truthy, evaluate and return the second
      If the first evaluates falsy, jump to the next pair (e.g, 0,1 to 2,3)
      given one parameter, evaluate and return it. (it's an Else and all the If/ElseIf were false)
      given 0 parameters, return NULL (not great practice, but there was no Else)
      */
      for ($i = 0 ; $i < count($values) - 1 ; $i += 2) {
        if (logic\truthy(logic\apply($values[$i], $data))) {
          return logic\apply($values[$i+1], $data);
        }
      }
      if (count($values) === $i+1) {
        return logic\apply($values[$i], $data);
      }
      return null;
    } elseif ($op === 'and') {
      // Return the first falsy value, or the last value
      // we don't even *evaluate* values after the first falsy (short-circuit)
      foreach ($values as $value) {
        $current = logic\apply($value, $data);
        if ( ! logic\truthy($current)) {
          return $current;
        }
      }
      return $current; // Last
      
    } elseif ($op === 'or') {
      // Return the first truthy value, or the last value
      // we don't even *evaluate* values after the first truthy (short-circuit)
      foreach ($values as $value) {
        $current = logic\apply($value, $data);
        if (logic\truthy($current)) {
          return $current;
        }
      }
      return $current; // Last

    } elseif ($op === 'not') {

      // This part is the same as 'and'
      foreach ($values as $value) {
        $current = logic\apply($value, $data);
        if ( ! logic\truthy($current)) {
          break;
        }
      }

      // Negate the result
      return !$current;

    } elseif ($op === "filter") {
      $scopedData = logic\apply($values[0], $data);
      $scopedLogic = $values[1];
      
      if (!$scopedData || !is_array($scopedData)) {
        return [];
      }
      // Return only the elements from the array in the first argument,
      // that return truthy when passed to the logic in the second argument.
      // For parity with JavaScript, reindex the returned array
      return array_values(
        array_filter($scopedData, function ($datum) use ($scopedLogic) {
          return logic\truthy(logic\apply($scopedLogic, $datum));
        })
      );
    } elseif ($op === "map") {
      $scopedData = logic\apply($values[0], $data);
      $scopedLogic = $values[1];
      
      if (!$scopedData || !is_array($scopedData)) {
        return [];
      }
      
      return array_map(
        function ($datum) use ($scopedLogic) {
          return logic\apply($scopedLogic, $datum);
        },
        $scopedData
      );
    } elseif ($op === "reduce") {
      $scopedData = logic\apply($values[0], $data);
      $scopedLogic = $values[1];
      $initial = isset($values[2]) ? $values[2] : null;
      
      if (!$scopedData || !is_array($scopedData)) {
        return $initial;
      }
      
      return array_reduce(
        $scopedData,
        function ($accumulator, $current) use ($scopedLogic) {
          return logic\apply(
            $scopedLogic,
            ['current'=>$current, 'accumulator'=>$accumulator]
          );
        },
        $initial
      );
    } elseif ($op === "all") {
      $scopedData = logic\apply($values[0], $data);
      $scopedLogic = $values[1];
      
      if (!$scopedData || !is_array($scopedData)) {
        return false;
      }
      $filtered = array_filter($scopedData, function ($datum) use ($scopedLogic) {
        return logic\truthy(logic\apply($scopedLogic, $datum));
      });
      return count($filtered) === count($scopedData);
    } elseif ($op === "none") {
      $filtered = logic\apply(['filter' => $values], $data);
      return count($filtered) === 0;
    } elseif ($op === "some") {
      $filtered = logic\apply(['filter' => $values], $data);
      return count($filtered) > 0;
    }
    
    if (isset(logic::$operations[$op])) {
      $operation = logic::$operations[$op];
    } else {
      // throw new \Exception("Unrecognized operator $op");
      return false;
    }

    if ($op === "rule") {
      $values = [$values];
    } else {
      //Recursion
      $values = array_map(function ($value) use ($data) {
        return logic\apply($value, $data);
      }, $values);
    }

    // Last argument to operator is always data
    $values []= $data;

    return call_user_func_array($operation, array_values($values));
  }
  
  function uses_data($logic) {
    if (is_object($logic)) {
      $logic = (array)$logic;
    }
    $collection = [];
    
    if (logic\is_logic($logic)) {
      $op = array_keys($logic)[0];
      $values = (array)$logic[$op];
      
      if ($op === "var") {
        //This doesn't cover the case where the arg to var is itself a rule.
        $collection[] = $values[0];
      } else {
        //Recursion
        foreach ($values as $value) {
          $collection = array_merge($collection, logic\uses_data($value));
        }
      }
    }
    
    return array_unique($collection);
  }
  
  
  function rule_like($rule, $pattern) {
    if (is_string($pattern) and $pattern[0] === '{') {
      $pattern = json_decode($pattern, true);
    }
    
    //echo "\nIs ". json_encode($rule) . " like " . json_encode($pattern) . "?\n";
    if ($pattern === $rule) {
      return true;
    } //TODO : Deep object equivalency?
    if ($pattern === "@") {
      return true;
    } //Wildcard!
    if ($pattern === "number") {
      return is_numeric($rule);
    }
    if ($pattern === "string") {
      return is_string($rule);
    }
    if ($pattern === "array") {
      return is_array($rule) and ! logic\is_logic($rule);
    }
    
    if (logic\is_logic($pattern)) {
      if (logic\is_logic($rule)) {
        $pattern_op = logic\get_operator($pattern);
        $rule_op = logic\get_operator($rule);
        
        if ($pattern_op === "@" || $pattern_op === $rule_op) {
          //echo "\nOperators match, go deeper\n";
          return logic\rule_like(
            logic\get_values($rule, false),
            logic\get_values($pattern, false)
          );
        }
      }
      return false; //$pattern is logic, rule isn't, can't be eq
    }

    if (is_array($pattern)) {
      if (is_array($rule)) {
        if (count($pattern) !== count($rule)) {
          return false;
        }
        /*
        Note, array order MATTERS, because we're using this array test logic to consider arguments, where order can matter. (e.g., + is commutative, but '-' or 'if' or 'var' are NOT)
        */
        for ($i = 0 ; $i < count($pattern) ; $i += 1) {
          //If any fail, we fail
          if (! logic\rule_like($rule[$i], $pattern[$i])) {
            return false;
          }
        }
        return true; //If they *all* passed, we pass
      } else {
        return false; //Pattern is array, rule isn't
      }
    }
    
    //Not logic, not array, not a === match for rule.
    return false;
  }  
}
