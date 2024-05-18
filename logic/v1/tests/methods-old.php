<?php

use Tangible\Logic as logic;

?>
<p>Global namespace <code>Tangible\Logic</code> (for backward compatibility)</p>

<p><pre><code>use Tangible\Logic as logic;</code></pre></p>
<?php

$tester->test('Tangible\Logic methods (for backward compatibility)', function( $it ) use ( $logic_methods ) {

  ?><ul><?php

foreach ( $logic_methods as $key => $value ) {

  $title = "logic\\{$key}";
  $fn    = "Tangible\\Logic\\{$key}";

  ?><li><code><?php echo $title; ?></code> - <?php echo $value; ?></li><?php

  $it( $title, function_exists( $fn ) );
}

?></ul><?php
});
