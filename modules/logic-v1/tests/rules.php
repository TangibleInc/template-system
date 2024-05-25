
<h3 class="my-3">Registered Rules</h3>

<table class="table table-sm">
  <thead>
    <th>Field</th>
    <th>Operators</th>
    <th>Value</th>
  </thead>
  <tbody>

<?php

  $rule_definitions = $logic->get_logic_tag_rules();

foreach ( $rule_definitions as $field_name => $defs ) {

  ?>
<tr>
  <td><?php echo $field_name; ?></td>
  <td><?php

  foreach ( $defs as $def_index => $def ) {

    // Some conditions have no operands
    if ( ! isset( $def['operands'] )) continue;

    if ($def_index > 0) echo '<hr>';
    echo implode(', ', array_map(function( $op ) {
      return $op['name'];
    }, $def['operands']));
  }

  ?></td>
  <td><?php

  foreach ( $defs as $def_index => $def ) {

    // Some conditions have no values
    if ( ! isset( $def['values'] )) continue;

    if ($def_index > 0) echo '<hr>';
    echo implode(', ', array_map(function( $v ) {
      return isset( $v['name'] ) ? $v['name'] : '(' . (
        isset( $v['type'] ) ? $v['type'] : 'unknown'
      ) . ')';
    }, $def['values']));
  }

  ?></td>
</tr>
  <?php

}

?>
  </tbody>
</table>
