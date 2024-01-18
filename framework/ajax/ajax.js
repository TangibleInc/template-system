;(function () {
  const { jQuery: $ } = window

  const Tangible = (window.Tangible = window.Tangible || {})
  const ajaxConfig = Tangible.ajaxConfig || window.TangibleAjaxConfig || {}

  const { url, nonce } = ajaxConfig
  function ajax(action, data = {}) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url,
        data: {
          action: 'tangible_ajax_' + action,
          nonce,
          data,
        },
        beforeSend: '',
        success: '',
        error: '',
      })
        .done(function (res) {
          if (res === '1' || res === 1) res = { success: true }

          if (typeof res === 'object' && typeof res.success !== 'undefined') {
            ;(res.success ? resolve : reject)(res.data)
          } else {
            reject(res)
          }
        })
        .fail(function (res) {
          reject({
            code: res.status,
            message: res.statusText,
          })
        })
    })
  }

  Tangible.ajax = ajax

  // Backward compatibility
  Tangible.ajaxConfig = ajaxConfig
})()
