const createNewSession = () => ({
  id: 0,
  tests: [],
  promises: [],
  success: 0,
  fail: 0,
  total: 0,
})

const tester = {
  session: null,
  start,
}

// Export
window.Tangible = window.Tangible || {}
window.Tangible.tester = tester

/**
 * Tester
 *
 * Same interface as PHP side
 */

function start(options = {}) {
  const session = createNewSession()

  // Corresponding tester ID on server-side
  session.id = options.id || 0

  const test = createSessionTest(session)

  test.report = () => report(session)

  return test
}

/**
 * Test and assert
 */
function createSessionTest(session) {
  return function test(title, callback) {
    const result = {
      title,
      assertions: [],
      success: true,
      error: null,
    }

    const it = (assertionTitle, success = false) => {
      result.assertions.push({
        title: assertionTitle,
        success: !!success,
      })
    }

    try {
      session.promises.push(callback(it))
    } catch (error) {
      result.success = false
      result.error = error
    }

    session.tests.push(result)

    if (result.success) {
      session.success++
    } else {
      session.fail++
    }

    session.total++
  }
}

/**
 * Reporter
 */

const successIcon =
  '<span class="tangible-tester-success-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M933 316q0 22-16 38L513 758l-76 76q-16 15-38 15t-38-15l-76-76L83 556q-15-16-15-38t15-38l76-76q16-16 38-16t38 16l164 165 366-367q16-16 38-16t38 16l76 76q16 15 16 38z"/></svg></span>'

const failIcon =
  '<span class="tangible-tester-fail-icon"><svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg></span>'

function report(session) {
  const $result = document.querySelector(
    `[data-tangible-tester-id="${session.id}"]`
  )

  if (!$result) {
    console.log('Test result element not found for ID', session.id)
    return
  }

  $result.innerHTML = `
<h4>JavaScript tests</h4>
${
  // Each test
  session.tests
    .map(
      (result, index) =>
        `
<p>
  ${result.success ? successIcon : failIcon}
  &nbsp;&nbsp;${index + 1}. ${result.title}${
          result.error ? '<br>' + result.error : ''
        }
</p>
${
  // Each assertion
  !result.assertions.length
    ? ''
    : `
<p>
  ${result.assertions
    .map(
      (assert) =>
        `
  &nbsp;&nbsp;&nbsp;&nbsp;${assert.success ? successIcon : failIcon}
  &nbsp;&nbsp;${assert.title}
  ${
    assert.error
      ? `<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - ${assert.error}`
      : ''
  }`
    )
    .join('<br>')}
</p>`
}`
    )
    .join('') // Each test
}
<p>${
    // Summary
    session.fail === 0
      ? `All ${session.total} test${session.total === 1 ? '' : 's'} passed`
      : `Total of ${session.total} test${session.total === 1 ? '' : 's'}: ${
          session.success
        } passed, ${session.fail} failed`
  }
</p>
`
}
