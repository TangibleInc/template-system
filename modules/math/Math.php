<?php

namespace Tangible\Math;

/**
 * Math - Evaluate math expressions
 *
 * Originally based on:
 * EvalMath - PHP class to safely evaluate math expressions
 * Copyright (C) 2005 Miles Kaufmann <http://www.twmagic.com/>
 *
 * Notable changes:
 * - Return empty on variable assignment
 * - Allow setting variables with $m->vars()
 * - Use safe variable function call
 * - Extend expression syntax and interpreter
 * - Clean up, refactor
 */

require_once __DIR__ . '/Stack.php';
require_once __DIR__ . '/Functions.php';

class Math {

  /** @var string Pattern used for a valid function or variable name. Note, var and func names are case sensitive.*/
  private static $namepat = '[a-zA-Z][a-zA-Z0-9_]*';

  var $suppress_errors = true;
  var $last_error      = null;

  var $v  = []; // Variables (and constants)
  var $f  = []; // User-defined functions
  var $vb = []; // Constants

  var $fb = [  // Built-in functions
    'abs',
    'ceil',
    'exp',
    'floor',
    'ln',
    'log',
    'sqrt',

    // TODO: Reconsider
    'acos',
    'acosh',
    'arccos',
    'arccosh',
    'arcsin',
    'arcsinh',
    'arctan',
    'arctanh',
    'asin',
    'asinh',
    'atan',
    'atanh',
    'cos',
    'cosh',
    'sin',
    'sinh',
    'tan',
    'tanh',
  ];

  var $fc = [ // calc functions emulation
    'average'    => [ -1 ],
    'format'     => [ -1 ],
    'max'        => [ -1 ],
    'min'        => [ -1 ],
    'mod'        => [ 2 ],
    'pi'         => [ 0 ],
    'power'      => [ 2 ],
    'rand_float' => [ 0 ],
    'rand_int'   => [ 2 ],
    'round'      => [ 1, 2 ],
    'sum'        => [ -1 ],
  ];

  var $allowimplicitmultiplication;

  public function __construct( $allowconstants = false, $allowimplicitmultiplication = false ) {
    if ( $allowconstants ) {
        $this->v['pi'] = pi();
        $this->v['e']  = exp( 1 );
    }
      $this->allowimplicitmultiplication = $allowimplicitmultiplication;
  }

  function e( $expr ) {
      return $this->evaluate( $expr );
  }

  function evaluate( $expr ) {

    $this->last_error = null;
    $expr             = trim( $expr );

    if (substr( $expr, -1, 1 ) == ';') $expr = substr( $expr, 0, strlen( $expr ) - 1 ); // strip semicolons at the end

    // is it a variable assignment?
    if ( preg_match( '/^\s*(' . self::$namepat . ')\s*=\s*(.+)$/', $expr, $matches ) ) {

      if ( in_array( $matches[1], $this->vb ) ) { // make sure we're not assigning to a constant
        return $this->trigger( $this->get_string( 'cannotassigntoconstant', 'mathslib', $matches[1] ) );
      }

      if (( $tmp = $this->pfx( $this->nfx( $matches[2] ) ) ) === false) return false; // get the result and make sure it's good

      $this->v[ $matches[1] ] = $tmp; // if so, stick it in the variable array

      return; // don't return anything for variable assignment
      // return $this->v[$matches[1]]; // and return the resulting value

      // Is it a function assignment?
    } elseif ( preg_match(
      '/^\s*(' . self::$namepat . ')\s*\(\s*(' . self::$namepat . '(?:\s*,\s*' . self::$namepat . ')*)\s*\)\s*=\s*(.+)$/',
      $expr,
      $matches
    ) ) {

      $fnn = $matches[1]; // get the function name
      if ( in_array( $matches[1], $this->fb ) ) { // make sure it isn't built in
        return $this->trigger( $this->get_string( 'cannotredefinebuiltinfunction', 'mathslib', $matches[1] ) );
      }

      $args = explode( ',', preg_replace( '/\s+/', '', $matches[2] ) ); // get the arguments

      if (( $stack = $this->nfx( $matches[3] ) ) === false) return false; // see if it can be converted to postfix
      for ( $i = 0; $i < count( $stack ); $i++ ) { // freeze the state of the non-argument variables

        $token = $stack[ $i ];
        if ( preg_match( '/^' . self::$namepat . '$/', $token ) and ! in_array( $token, $args ) ) {

          if ( array_key_exists( $token, $this->v ) ) {
            $stack[ $i ] = $this->v[ $token ];
          } else {
            return $this->trigger( $this->get_string( 'undefinedvariableinfunctiondefinition', 'mathslib', $token ) );
          }
        }
      }
      $this->f[ $fnn ] = array(
        'args' => $args,
        'func' => $stack,
      );

      return true;

    } else {
      return $this->pfx( $this->nfx( $expr ) ); // Evaluate
    }
  }

  function vars( $key = '', $value = '' ) {

      // Set all variables
      if ( is_array( $key ) ) $this->v = $key;

      // Set specific variable
      elseif ( ! empty( $key ) ) $this->v[ $key ] = $value;

      // Return all variables
    else return $this->v;
  }

  function funcs() {
      $output       = array();
      foreach ($this->f as $fnn => $dat)
          $output[] = $fnn . '(' . implode( ',', $dat['args'] ) . ')';
      return $output;
  }

  /**
   * @param string $name
   * @return boolean Is this a valid var or function name?
   */
  public static function is_valid_var_or_func_name( $name ) {
      return preg_match( '/' . self::$namepat . '$/iA', $name );
  }

  // ===================== HERE BE INTERNAL METHODS ====================\\

  // Convert infix to postfix notation
  function nfx( $expr ) {

    $index  = 0;
    $stack  = new Stack;
    $output = array(); // postfix form of expression, to be passed to pfx()
    $expr   = trim( $expr ); // Was strtolower

    $ops   = array( '+', '-', '*', '/', '^', '_', '%' );
    $ops_r = array(
      '+' => 0,
      '-' => 0,
      '*' => 0,
      '/' => 0,
      '^' => 1,
      '%' => 0,
    ); // right-associative operator?
    $ops_p = array(
      '+' => 0,
      '-' => 0,
      '*' => 1,
      '/' => 1,
      '_' => 1,
      '^' => 2,
      '%' => 2,
    ); // operator precedence

    $expecting_op = false; // we use this in syntax-checking the expression
                            // and determining when a - is a negation

    if ( preg_match( '/[^\w\s+*^\/()\.,\-%]/', $expr, $matches ) ) {

      // make sure the characters are all good
      return $this->trigger( $this->get_string( 'illegalcharactergeneral', 'mathslib', $matches[0] ) );
    }

    while ( 1 ) {

      $op = substr( $expr, $index, 1 ); // get the first character at the current index

      // find out if we're currently at the beginning of a number/variable/function/parenthesis/operand
      $ex = preg_match( '/^(' . self::$namepat . '\(?|\d+(?:\.\d*)?(?:(e[+-]?)\d*)?|\.\d+|\()/', substr( $expr, $index ), $match );

      if ( $op == '-' and ! $expecting_op ) { // is it a negation instead of a minus?

        $stack->push( '_' ); // put a negation on the stack
        $index++;

      } elseif ( $op == '_' ) { // we have to explicitly deny this, because it's legal on the stack

        return $this->trigger( $this->get_string( 'illegalcharacterunderscore', 'mathslib' ) ); // but not in the input expression

      } elseif ( ( in_array( $op, $ops ) or $ex ) and $expecting_op ) { // are we putting an operator on the stack?

        if ( $ex ) { // are we expecting an operator but have a number/variable/function/opening parethesis?
          if ( ! $this->allowimplicitmultiplication ) {
            return $this->trigger( $this->get_string( 'implicitmultiplicationnotallowed', 'mathslib' ) );
          } else { // it's an implicit multiplication
              $op = '*';
              $index--;
          }
        }

        // Heart of the algorithm:
        while ( $stack->count > 0
          && ( $o2 = $stack->last() )
          && in_array( $o2, $ops )
          && ( $ops_r[ $op ] ? $ops_p[ $op ] < $ops_p[ $o2 ] : $ops_p[ $op ] <= $ops_p[ $o2 ] )
        ) {
          $output[] = $stack->pop(); // pop stuff off the stack into the output
        }

        // many thanks: http://en.wikipedia.org/wiki/Reverse_Polish_notation#The_algorithm_in_detail
        $stack->push( $op ); // finally put OUR operator onto the stack
        $index++;
        $expecting_op = false;

      } elseif ( $op == ')' and $expecting_op ) { // ready to close a parenthesis?

        while ( ( $o2 = $stack->pop() ) != '(' ) { // pop off the stack back to the last (
            if (is_null( $o2 )) return $this->trigger( $this->get_string( 'unexpectedclosingbracket', 'mathslib' ) );
          else $output[] = $o2;
        }

        if ( preg_match( '/^(' . self::$namepat . ')\($/', $stack->last( 2 ), $matches ) ) { // did we just close a function?

          $fnn       = $matches[1]; // get the function name
          $arg_count = $stack->pop(); // see how many arguments there were (cleverly stored on the stack, thank you)
          $fn        = $stack->pop();

          $output[] = array(
            'fn'       => $fn,
            'fnn'      => $fnn,
            'argcount' => $arg_count,
          ); // send function to output

          if ( in_array( $fnn, $this->fb ) ) { // check the argument count
            if ( $arg_count > 1 ) {
              $a           = new stdClass();
              $a->expected = 1;
              $a->given    = $arg_count;
              return $this->trigger( $this->get_string( 'wrongnumberofarguments', 'mathslib', $a ) );
            }
          } elseif ( array_key_exists( $fnn, $this->fc ) ) {

            $counts = $this->fc[ $fnn ];

            if ( in_array( -1, $counts ) and $arg_count > 0 ) {

            } elseif ( ! in_array( $arg_count, $counts ) ) {
              $a           = new stdClass();
              $a->expected = implode( '/', $this->fc[ $fnn ] );
              $a->given    = $arg_count;
              return $this->trigger( $this->get_string( 'wrongnumberofarguments', 'mathslib', $a ) );
            }
          } elseif ( array_key_exists( $fnn, $this->f ) ) {
            if ( $arg_count != count( $this->f[ $fnn ]['args'] ) ) {
              $a           = new stdClass();
              $a->expected = count( $this->f[ $fnn ]['args'] );
              $a->given    = $arg_count;
              return $this->trigger( $this->get_string( 'wrongnumberofarguments', 'mathslib', $a ) );
            }
          } else { // did we somehow push a non-function on the stack? this should never happen
              return $this->trigger( $this->get_string( 'internalerror', 'mathslib' ) );
          }
        }

        $index++;

        // Did we just finish a function argument?
      } elseif ( $op == ',' and $expecting_op ) {

        while ( ( $o2 = $stack->pop() ) != '(' ) {
          if (is_null( $o2 )) return $this->trigger( $this->get_string( 'unexpectedcomma', 'mathslib' ) ); // oops, never had a (
          else $output[] = $o2; // pop the argument expression stuff and push onto the output
        }

        // make sure there was a function
        if ( ! preg_match( '/^(' . self::$namepat . ')\($/', $stack->last( 2 ), $matches ))
            return $this->trigger( $this->get_string( 'unexpectedcomma', 'mathslib' ) );
        $stack->push( $stack->pop() + 1 ); // increment the argument count
        $stack->push( '(' ); // put the ( back on, we'll need to pop back to it again
        $index++;
        $expecting_op = false;

      } elseif ( $op == '(' and ! $expecting_op ) {

        $stack->push( '(' );
        $index++;
        $allow_neg = true;

        // Do we now have a function/variable/number?
      } elseif ( $ex and ! $expecting_op ) {

        $expecting_op = true;
        $val          = $match[1];

        if ( preg_match( '/^(' . self::$namepat . ')\($/', $val, $matches ) ) {

          // may be func, or variable w/ implicit multiplication against parentheses...

          if ( in_array( $matches[1], $this->fb )
            || array_key_exists( $matches[1], $this->f )
            || array_key_exists( $matches[1], $this->fc )
          ) { // it's a func
            $stack->push( $val );
            $stack->push( 1 );
            $stack->push( '(' );
            $expecting_op = false;
          } else { // it's a var w/ implicit multiplication
              $val      = $matches[1];
              $output[] = $val;
          }
        } else { // it's a plain old var or num
          $output[] = $val;
        }

        $index += strlen( $val );

      } elseif ( $op == ')' ) {

        // It could be only custom function with no params or general error

        if ($stack->last() != '(' or $stack->last( 2 ) != 1) return $this->trigger( $this->get_string( 'unexpectedclosingbracket', 'mathslib' ) );

        // Did we just close a function?
        if ( preg_match( '/^(' . self::$namepat . ')\($/', $stack->last( 3 ), $matches ) ) {

          $stack->pop();// (
          $stack->pop();// 1
          $fn     = $stack->pop();
          $fnn    = $matches[1]; // get the function name
          $counts = $this->fc[ $fnn ];

          if ( ! in_array( 0, $counts ) ) {
            $a           = new stdClass();
            $a->expected = $this->fc[ $fnn ];
            $a->given    = 0;
            return $this->trigger( $this->get_string( 'wrongnumberofarguments', 'mathslib', $a ) );
          }

          // Push function to output
          $output[] = array(
            'fn'       => $fn,
            'fnn'      => $fnn,
            'argcount' => 0,
          );
          $index++;
          $expecting_op = true;

        } else {
            return $this->trigger( $this->get_string( 'unexpectedclosingbracket', 'mathslib' ) );
        }

        // Miscellaneous error checking
      } elseif ( in_array( $op, $ops ) and ! $expecting_op ) {

        return $this->trigger( $this->get_string( 'unexpectedoperator', 'mathslib', $op ) );

      } else {
        return $this->trigger( $this->get_string( 'anunexpectederroroccured', 'mathslib' ) );
      }

      if ( $index == strlen( $expr ) ) {
        if ( in_array( $op, $ops ) ) {
          // did we end with an operator? bad.
          return $this->trigger( $this->get_string( 'operatorlacksoperand', 'mathslib', $op ) );
        } else {
          break;
        }
      }

      // step the index past whitespace (pretty much turns whitespace
      // into implicit multiplication if no operator is there)
      while ( substr( $expr, $index, 1 ) == ' ' ) {
        $index++;
      }
    }

    // Pop everything off the stack and push onto output

    while ( ! is_null( $op = $stack->pop() ) ) {

      // If there are (s on the stack, ()s were unbalanced
      if ($op == '(') return $this->trigger( $this->get_string( 'expectingaclosingbracket', 'mathslib' ) );
      $output[] = $op;
    }

    return $output;
  }

  // Evaluate postfix notation

  function pfx( $tokens, $vars = array() ) {

    if ($tokens == false) return false;

    $stack = new Stack;

    foreach ( $tokens as $token ) {

      if ( is_array( $token ) ) {

        // If the token is a function, pop arguments off the stack, hand them to the function, and push the result back on

        $fnn   = $token['fnn'];
        $count = $token['argcount'];

        if ( in_array( $fnn, $this->fb ) ) {

          // Built-in function

          if (is_null( $op1 = $stack->pop() )) return $this->trigger( $this->get_string( 'internalerror', 'mathslib' ) );

          $fnn = preg_replace( '/^arc/', 'a', $fnn ); // for the 'arc' trig synonyms

          if ($fnn == 'ln') $fnn = 'log';

          // eval('$stack->push(' . $fnn . '($op1));'); // perfectly safe eval()
          $stack->push( $fnn( $op1 ) ); // perfectly safe variable function call

        } elseif ( array_key_exists( $fnn, $this->fc ) ) {

          // Calc emulation function

          $args = array();
          for ( $i = $count - 1; $i >= 0; $i-- ) {
            if (is_null( $args[] = $stack->pop() )) return $this->trigger( $this->get_string( 'internalerror', 'mathslib' ) );
          }

          $res = call_user_func_array( array( '\Tangible\Math\Functions', $fnn ), array_reverse( $args ) );

          if ( $res === false ) {
            return $this->trigger( $this->get_string( 'internalerror', 'mathslib' ) );
          }
          $stack->push( $res );

        } elseif ( array_key_exists( $fnn, $this->f ) ) {

          // User function

          $args = array();
          for ( $i = count( $this->f[ $fnn ]['args'] ) - 1; $i >= 0; $i-- ) {
            if (is_null( $args[ $this->f[ $fnn ]['args'][ $i ] ] = $stack->pop() )) return $this->trigger( $this->get_string( 'internalerror', 'mathslib' ) );
          }
          $stack->push( $this->pfx( $this->f[ $fnn ]['func'], $args ) ); // yay... recursion!!!!
        }
      } elseif ( in_array( $token, array( '+', '-', '*', '/', '^', '%' ), true ) ) {

        // If the token is a binary operator, pop two values off the stack, do the operation, and push the result back on
        if (is_null( $op2 = $stack->pop() )) return $this->trigger( $this->get_string( 'internalerror', 'mathslib' ) );
        if (is_null( $op1 = $stack->pop() )) return $this->trigger( $this->get_string( 'internalerror', 'mathslib' ) );

        switch ( $token ) {
          case '+':
            $stack->push( $op1 + $op2 );
              break;
          case '-':
            $stack->push( $op1 - $op2 );
              break;
          case '*':
            $stack->push( $op1 * $op2 );
              break;
          case '/':
            if ($op2 == 0) return $this->trigger( $this->get_string( 'divisionbyzero', 'mathslib' ) );
            $stack->push( $op1 / $op2 );
              break;
          case '^':
            $stack->push( pow( $op1, $op2 ) );
              break;
          case '%':
            $stack->push( $op1 % $op2 );
              break;
        }
      } elseif ( $token == '_' ) {

        // If the token is a unary operator, pop one value off the stack, do the operation, and push it back on

        $stack->push( -1 * $stack->pop() );

      } else {

        // If the token is a number or variable, push it on the stack

        if ( is_numeric( $token ) ) {
          $stack->push( $token );
        } elseif ( array_key_exists( $token, $this->v ) ) {
          $stack->push( $this->v[ $token ] );
        } elseif ( array_key_exists( $token, $vars ) ) {
          $stack->push( $vars[ $token ] );
        } else {

          // return $this->trigger($this->get_string('undefinedvariable', 'mathslib', $token));

          // If variable is undefined, create it with value 0
          $this->v[ $token ] = 0;
          $stack->push( $this->v[ $token ] );
        }
      }
    } // For each

    // When we're out of tokens, the stack should have a single element, the final result
    if ($stack->count != 1) return $this->trigger( $this->get_string( 'internalerror', 'mathslib' ) );

    return $stack->pop();
  }

  // Trigger an error, but nicely, if need be
  function trigger( $msg ) {
    $this->last_error = $msg;
    if ( ! $this->suppress_errors) trigger_error( $msg, E_USER_WARNING );
    return false;
  }

  function get_string( $msg, $lib, $value = '' ) {
    return $msg;
  }

}
