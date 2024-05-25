<?php

$test('Frontend', function( $it ) use ( $logic ) {
  /*
  ?>
  <h4>Enqueue UI script and style</h4>
  <p>
  <pre><code>add_action('wp_enqueue_scripts', function() {
  $logic->enqueue();
  });</code></pre>
  </p>
  <?php
  */

  $logic->enqueue();

  $it( 'Enqueue can be called', true );

  // TODO: Test from JS if it was enqueued

  /*
  ?>
  <h4>Modal</h4>

  <p>Create button to open modal.</p>

  <p>
  <?php
  */
  ?>
<button data-tangible-logic="open">
  Open Conditional Logic Settings
</button>
  <?php

  $field_name = 'tangible_logic';

  // Get saved rule groups
  $field_value = get_post_meta( get_the_ID(), $field_name, true );
  if ( empty( $field_value ) ) {
    $field_value = [
      // Test HTML attribute escape
      [
        [
          'field'   => 'text',
          'operand' => 'is',
          'value'   => '\'"<>',
        ],
      ],
    ];
  }

  // Conditions config
  $config = [
  'title'       => 'Modal Title',
  'description' => 'Modal Description',
  'fields'      => [
    [
      'name'     => 'it',
      'label'    => 'It',
      'operands' => [
        [
          'name'  => 'is',
          'label' => 'is',
        ],
        [
          'name'  => 'is_not',
          'label' => 'is not',
        ],
      ],
      'values'   => [
        [
          'name'  => 'true',
          'label' => 'true',
        ],
        [
          'name'  => 'false',
          'label' => 'false',
        ],
      ],
    ],
    [
      'name'     => 'text',
      'label'    => 'text',
      'operands' => [
        [
          'name'  => 'is',
          'label' => 'is',
        ],
      ],
      'values'   => [
        [
          'type'        => 'text',
          'placeholder' => '..text',
        ],
      ],
    ],
  ],
  ];

  ?>
<input type="hidden"
  name="<?php echo $field_name; ?>"
  value='<?php echo esc_attr( json_encode( $field_value ) ); ?>'
  data-tangible-logic="input"
  data-tangible-logic-config='<?php echo esc_attr( json_encode( $config ) ); ?>'
  autocomplete="off"
/>
  <?php
  /*
  ?>
  </p>

  <p>Create hidden input field with conditions config and stored field value.</p>
  <p>It must have the same parent element as the button.</p>
  <?php
  */

});
