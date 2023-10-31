import assetLoader from './assetLoader'

const $ = window.jQuery
const Tangible = (window.Tangible = window.Tangible || {})
const modules = (Tangible.modules = Tangible.modules || {})

function moduleLoader(element) {

  let moduleIndex = 0
  const $el = $(element)
  const $modules = $el.hasClass('tangible-dynamic-module')
    ? $el
    : $el.find('.tangible-dynamic-module')

  $modules.each(function () {
    const el = this
    const $el = $(el)
    const moduleName = $el.data('tangibleDynamicModule')
    const options = $el.data('tangibleDynamicModuleOptions') || {}

    if (!modules[moduleName]) {
      console.warn('Unknown dynamic module', moduleName)
      console.log(modules)
      return
    }

    const { assets = [], callback } = modules[moduleName]

    moduleIndex++

    assetLoader(assets)
      .then(function () {
        if (callback) {
          callback(el, options)
          return
        }

        switch (moduleName) {
          case 'chart':
            $.fn.tangibleChart && $el.tangibleChart()
            break
          case 'embed-dynamic': // TODO:
            break
          case 'glider':
            $.fn.tangibleGlider && $el.tangibleGlider()
            break
          case 'mermaid':
            Tangible.mermaid && Tangible.mermaid.activateElement(el, options)
            break
          case 'paginator': // TODO:
            break
          case 'prism':
            Prism && Prism.highlightAllUnder && Prism.highlightAllUnder(el)
            break
          case 'slider':
            $.fn.tangibleSlider && $el.tangibleSlider()
            break
          case 'table': // TODO:
            break
          default:
            console.warn('No initializer for module', moduleName)
            break
        }
      })
      .catch(function (e) {
        console.error('Tangible.moduleLoader', e)
      })
  })
}

function registerModule(name, config) {
  if (!modules[name]) {
    modules[name] = {
      assets: [],
      // callback
    }
  }
  Object.assign(modules[name], config)
}

Object.assign(Tangible, {
  assetLoader,
  moduleLoader,
  registerModule,
})

/*
$(document).ready(function() {
  moduleLoader(document.body)
})
*/
