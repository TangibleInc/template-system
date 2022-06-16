const {
  tester,
  ajax
} = window.Tangible

const testId = '<?= $test_id ?>'
const inputFieldName = '<?= $input_field_name ?>'

const $input = $('input[name="' + inputFieldName + '"]')
const test = tester.start({
  id: testId
})

const $button = $('[data-tangible-logic="open"]')
const $logic = $('#tangible-logic-root')
const $result = $('#logic-ui-result')

test('Logic UI', function(it) {

  it('button element exists', $button && $button.length!==0)
  it('modal UI element exists', $logic && $logic.length!==0)

  $button.click()

  return new Promise((resolve, reject) => {

    it('modal opens when button is clicked', $logic.hasClass('tangible-logic-open'))

    const $close = $logic.find('[data-tangible-logic="close"]')

    it('has close button', $close && $close.length!==0)

    $close.click()

    it('modal closes when close button is clicked', ! $logic.hasClass('tangible-logic-open'))

    resolve()
  })
})

test.report()

// Evaluate via AJAX

const $evaluateButton = $('[data-tangible-logic-test="evaluate"]')
const $evaluateResult = $('[data-tangible-logic-test="evaluateResult"]')

function evaluateResult(ruleGroups) {

  console.log('evaluate', ruleGroups)

  if (typeof ruleGroups==='string') {
    try {
      ruleGroups = JSON.parse(ruleGroups)
    } catch (error) {
      console.log('parse error', error)
      return
    }
  }

  // Action defined in vendor/tangible/template/ajax

  ajax('tangible_template_logic_evaluate', ruleGroups)
    .then(function(result) {
      console.log('evaluate success', result)
      $evaluateResult.text( result ? 'true' : 'false' )
    })
    .catch(function(error) {
      console.log('evaluate error', error)
      $evaluateResult.text(error.message)
    })
}

function renderResult(resultString) {

  const ruleGroups = JSON.parse(resultString)

  $result.text(JSON.stringify(ruleGroups, null, 2))
  evaluateResult(resultString)
}

$input.on('change', function(e) {
  renderResult(e.target.value)
})

renderResult($input.val())

$evaluateButton.on('click', function() {
  evaluateResult( $input.val() )
})
