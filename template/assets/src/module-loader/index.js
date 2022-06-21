jQuery(function ($) {
  const Tangible = (window.Tangible = window.Tangible || {})
  const assets = window.TangibleModuleLoaderAssets || {}

  Tangible.moduleLoader = function (element) {
    $(element)
      .find('[data-tangible-dynamic-module]')
      .each(function () {
        const $el = $(this)
        const moduleName = $el.data('tangibleDynamicModule')

        switch (moduleName) {
          case 'slider':
            if ($.fn.tangibleSlider) {
              $el.tangibleSlider()
            }
            break
          case 'chart':
            if ($.fn.tangibleChart) {
              $el.tangibleChart()
            }
            break
          default:
            console.warn('Unknown dynamic module', moduleName)
            break
        }
      })
  }
})
