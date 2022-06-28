<?php

$tester->id = 0;
$tester->session_history = [];

$tester->new_session = [
  'title'   => 'Group title',
  'tests'   => [],
  'success' => 0,
  'fail'    => 0,
  'total'   => 0,
];

$tester->session = $tester->new_session;

$tester->start = function( $title = false ) use ( $tester ) {

  /**
   * Make warnings and errors catchable - Restored by $test->end()
   */
  set_error_handler(
    function($errno, $errstr, $errfile, $errline) {
      throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
    }
  );

  // Capture output
  ob_start();

  $tester->id++;

  $session = $tester->new_session;
  if ($title) $session['title'] = $title;

  $test = new class {

    static $tester;
    static $session;

    public $id;
    public $output = '';

    function __invoke( $title, $fn ) {

      $session = &self::$session;
      $test_result  = [
        'title'      => $title,
        'assertions' => [],
        'success'    => true,
        'error'      => null,
      ];

      try {

        if ( ! is_callable( $fn )) throw new Exception( '$tester->test() expects a function as second argument', 1 );

        $fn(function( $assertion_title, $success = false ) use ( &$test_result ) {

          $is_success = $success === true;

          if ( ! $is_success ) {
            // All assertions must be true
            $test_result['success'] = false;
          }

          $test_result['assertions'] [] = [
            'title'   => $assertion_title,
            'success' => $is_success,
          ];

          // Return success state, so test can display expected/received values on error
          return $is_success;
        });

      } catch ( \Throwable $th ) {
        $test_result['success'] = false;
        $test_result['error']   = $th->getMessage() . ' in ' . str_replace( ABSPATH, '', $th->getFile() ) . ' on line ' . $th->getLine() . "\n" . $th->getTraceAsString();
        $test_result['error'] = str_replace("\n", '<br>', $test_result['error']);
      }

      $session['tests'] [] = $test_result;

      if ( $test_result['success'] ) {
        $session['success']++;
      } else {
        $session['fail']++;
      }

      $session['total']++;
    }

    function report() {

      $this->end();

      if (self::$tester->mode==='html') {
        self::$tester->report(
          self::$session
        );
        echo $this->output;
        $this->output = '';
      }
    }

    function end() {
      restore_error_handler();
      $this->output = ob_get_clean();
      self::$tester->session_history []= self::$session;
    }
  };

  $test::$tester  = $tester;
  $test::$session = $session;
  $test->id       = $tester->id;

  return $test;
};
