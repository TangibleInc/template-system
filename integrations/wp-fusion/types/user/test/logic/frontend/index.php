<?php

use tangible\ajax;

$test('tangible_logic()', function( $it ) {

  $it( 'exists', function_exists( 'tangible_logic' ) );

  $logic = tangible_logic();

  $it( 'has method enqueue', isset( $logic->enqueue ) );

  try {
    $logic->enqueue();
    $it( 'enqueues', true );
  } catch ( \Throwable $th ) {
    $it( 'enqueues', false );
  }
});


// Test ID to let client-side tester know where to render report
$test_id = $test->id;

// Rules definition

// Conditional rules config - See https://docs.tangible.one/modules/logic/
$config = [
  'title'  => 'Modal title',
  'fields' => $logic->get_fields_by_category( 'core' ),
];

// Saved rule groups

$input_field_name = 'tangible_logic';

// Get saved rule groups
// $saved_rule_groups = get_post_meta(get_the_ID(), $input_field_name, true);
// if (empty($saved_rule_groups)) $saved_rule_groups = [];

$saved_rule_groups = [
  [
    [
      'field'   => 'user_field',
      'field_2' => 'wp_fusion_tags',
      'operand' => 'exists',
    ],
  ],
  [
    [
      'field'   => 'user_field',
      'field_2' => 'wp_fusion_access',
      'operand' => 'exists',
    ],
  ],
];

// Button to open the UI

?>
<p>Feel free to build and save rule groups, to see how they evaluate.
The rules are saved in the input field only, not in the database.</p>

<button type="button" class="btn btn-primary" data-tangible-logic="open">
  Open Conditional Logic Settings
</button>

<p class="mt-3">
  <b>Saved rule groups</b>
  <pre><code id="logic-ui-result"></code></pre>
</p>
<?php

// Field where user defined rule groups are loaded and saved
?>
<input type="hidden"
  name="<?= $input_field_name ?>"
  value='<?= esc_attr( json_encode( $saved_rule_groups ) ) ?>'
  data-tangible-logic="input"
  data-tangible-logic-config='<?= esc_attr( json_encode( $config ) ) ?>'
/>

<?php
/*
<button type="button" class="btn btn-secondary" data-tangible-logic-test="evaluate">
  Evaluate
</button>
&nbsp;&nbsp;&nbsp;
*/
?>
Evaluated: <b data-tangible-logic-test="evaluateResult"></b>

<hr>
<?php

// JavaScript tests

$tester->enqueue();
ajax\enqueue();

// Ensure frontend test runs *after* Logic module's script

add_action('wp_footer', function() use ( $test_id, $input_field_name ) {

  ?><script> jQuery(function($) { <?php

  include __DIR__ . '/test.js';

?> }) </script> <?php
}, 99);
