/**
 * Async render for templates
 */

const {
  jQuery: $,
  Tangible: { ajax },
} = window

function activateAsyncRender() {
  $('.tangible-async-render').each(function () {
    // Render once only - Support multiple calls to activateAsyncRender()
    if (this.tangibleAsyncRenderDone) return
    this.tangibleAsyncRenderDone = true

    const $el = $(this)
    const templateData = $el.data('template-data')

    // @see /ajax/index.php
    ajax('tangible_template_render', templateData)
      .then((result) => {
        $el.html(result)
      })
      .catch((error) => {
        console.error('Async render error', error)
        console.log('Template data', templateData)
      })
  })
}

$(activateAsyncRender)

// Export so it can be called by ../module-loader
window.Tangible.activateAsyncRender = activateAsyncRender
