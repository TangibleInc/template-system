<?php

$tester->start_group = function() use ( $tester ) {
  $tester->mode = 'json';
};

$tester->group_report = function() use ( $tester ) {

  ?><h3>Summary</h3><?php

  $summary = [
    'total' => 0,
    'success' => 0,
    'fail' => 0
  ];

  foreach ($tester->session_history as $index => $session) {
    ?><?php

    echo $tester->success_or_fail_icon( $session['fail']===0 ); ?>&nbsp;&nbsp;<?php echo $index + 1; ?>. <?php echo isset($session['title']) ? $session['title'] : 'Tests';

    $summary['total']++;
    $summary[
      $session['fail']===0 ?  'success' : 'fail'
    ]++;

    ?><br><?php
  }

  ?><p><?php

  if ( $summary['fail'] === 0 ) {

    ?><p>All <?php echo $summary['total']; ?> test<?php echo $summary['total'] === 1 ? '' : 's'; ?> passed</p><?php

  } else {
    ?><p>Total of <?php echo $summary['total']; ?> tests: <?php echo $summary['success']; ?> passed, <?php echo $summary['fail']; ?> failed</p><?php
  }

  ?></p><?php

  ?><hr><?php

  foreach ($tester->session_history as $index => $session) {
    $tester->report( $session );
    ?><hr><?php
  }

};
