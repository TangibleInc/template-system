<?php

$tester->success_or_fail_icon = function( $success ) use ( $tester ) {

  static $success_icon = '<span class="tangible-tester-success-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M933 316q0 22-16 38L513 758l-76 76q-16 15-38 15t-38-15l-76-76L83 556q-15-16-15-38t15-38l76-76q16-16 38-16t38 16l164 165 366-367q16-16 38-16t38 16l76 76q16 15 16 38z"/></svg></span>';

  static $fail_icon = '<span class="tangible-tester-fail-icon"><svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg></span>';

  return $success ? $success_icon : $fail_icon;
};

$tester->report = function( $session = false ) use ( $tester ) {

  if ($session === false) $session = $tester->session;

  ?><h4><?php echo $session['title']; ?></h4><?php

  foreach ( $session['tests'] as $index => $result ) {

    ?><p><?php echo $tester->success_or_fail_icon( $result['success'] ); ?>&nbsp;&nbsp;<?php echo $index + 1; ?>. <?php echo $result['title']; ?><?php
    echo isset( $result['error'] ) ? '<br>' . $result['error'] : '';
?></p><?php

  if (empty( $result['assertions'] )) continue;

?><p><?php

foreach ( $result['assertions'] as $assert ) {
  ?>&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $tester->success_or_fail_icon( $assert['success'] ); ?>&nbsp;&nbsp;<?php echo $assert['title']; ?><?php
    echo isset( $assert['error'] ) ? '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ' . $assert['error'] : '';
?><br><?php
}

?></p><?php
  }

  if ( $session['fail'] === 0 ) {

    ?><p>All <?php echo $session['total']; ?> test<?php echo $session['total'] === 1 ? '' : 's'; ?> passed</p><?php

  } else {
    ?><p>Total of <?php echo $session['total']; ?> tests: <?php echo $session['success']; ?> passed, <?php echo $session['fail']; ?> failed</p><?php
  }

  ?><div data-tangible-tester-id="<?php echo $tester->id; ?>"></div><?php

};
