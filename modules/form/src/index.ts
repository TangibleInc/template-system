import getFormData from './getFormData'

const debug = false
const log = (...args) => debug && console.log(...args)

jQuery(function ($) {
  const { forms = [], ajax } = window.Tangible || {}

  if (!ajax || !forms.length) return

  forms.forEach(function handleForm(form) {
    const { id, location, hash } = form

    const $form = $('#' + id)
    if (!$form.length) return

    // Find success, error
    const $success = $form.find('.tangible-form-success-message')
    const $error = $form.find('.tangible-form-error-message')

    $form.on('submit', function (e) {
      e.preventDefault()

      const form = $form[0]
      const data = getFormData(form)

      // TODO: Custom validation
      // form.checkValidity() === false

      const request = {
        location,
        hash,
        data,
      }

      log('Submit form', request)

      ajax('tangible_form_handler', request)
        .then(function (result) {
          log('Form success', result)

          $error.hide()

          if (result.redirect) {
            window.location = result.redirect
            return
          }

          if (result.success) {
            $success.html(result.success)
          }

          $success.show()
        })
        .catch(function (result) {
          if (result.redirect) {
            window.location = result.redirect
            return
          }

          console.error('Form error', result)

          const message =
            result.error || result.message || 'There was an error.'
          if (message) {
            $error.html(message)
            $error.show()
            $success.hide()
          }
        })
    })
  })
})
