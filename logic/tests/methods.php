<?php
/*
?>
<h3 class="my-3">Methods</h3>
<?php
*/

$logic_methods = [
  'enqueue'                => 'Enqueue',
  'evaluate_rule_groups'   => 'Evaluate rule groups',
  'extend_logic_tag_rules' => 'Extend logic tag with rules config and evaluator',
  'get_logic_tag_rules'    => 'Get registered logic rules',
];

/*
?>
<p>Global function <code>tangible_logic</code></p>
<p><pre><code>$logic = tangible_logic();</code></pre></p>
<?php
*/

$test('tangible_logic() methods', function( $it ) use ( $logic, $logic_methods ) {

  $it( '$logic exists', ! empty( $logic ) );
  /*
  ?><ul><?php
  */

  foreach ( $logic_methods as $key => $value ) {

    $title = "\$logic->{$key}";
    /*
    ?><li><code><?php echo $title; ?></code> - <?php echo $value; ?></li><?php
    */

    $it( $title, is_callable( $logic->$key ) );
  }
  /*
  ?></ul><?php
  */

});
