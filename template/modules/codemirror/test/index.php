<?php

// global $test

$html = tangible_template();

$test('CodeMirror', function( $it ) use ( $html, $tester ) {

  $it( 'tangible_template()->enqueue_codemirror', isset( $html->enqueue_codemirror ) );

  $html->enqueue_codemirror();

  $it( 'enqueues', true );

});

// JavaScript tests

// Let client-side tester know where to render report
$test_id = $test->id;

?>
<div>
  <textarea id="codemirror-test" style="display:none"></textarea>
</div>
<script>
jQuery(function($) {

  const {
    createCodeEditor,
    CodeMirror,
    tester
  } = window.Tangible

  const test = tester.start({
    id: <?php echo $test_id; ?>
  })

  test('window.Tangible', function(it) {
    it('CodeMirror exists', CodeMirror)
    it('createCodeEditor exists', createCodeEditor)
  })

  if (createCodeEditor) test('createCodeEditor', function(it) {

    const $codeMirror = document.getElementById('codemirror-test')

    it('CodeMirror test element exists', $codeMirror)

    const editor = createCodeEditor($codeMirror, {
      language: 'html'
    })

    it('runs', editor)
    it('return editor instance', editor)

    editor.setSize(null, 120)

    const message = "<Loop type=post>\n  <Field title />\n</Loop>"

    try {
      editor.setValue(message)
      it('sets value', true)
      it('gets value', editor.getValue()===message)

    } catch(e) {
      it('sets value', false)
    }

    editor.focus()

    it('focuses', true)
  })

  test.report()
})
</script>
<?php
