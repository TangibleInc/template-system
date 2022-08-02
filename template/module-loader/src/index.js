import assetLoader from './assetLoader'

const $ = jQuery
const Tangible = window.Tangible = window.Tangible || {}

function moduleLoader(element) {

  const modules = Tangible.modules || {}

  let moduleIndex = 0

  $(element)
    .find('[data-tangible-dynamic-module]')
    .each(function () {
      const el = this
      const $el = $(el)
      const moduleName = $el.data('tangibleDynamicModule')
      const moduleOptions = $el.data('tangibleDynamicModuleOptions') || {}

      if (!modules[ moduleName ]) {
        console.warn('Unknown dynamic module', moduleName)
        return
      }

      moduleIndex++

      assetLoader( modules[ moduleName ].assets || [] )
        .then(function() {
          switch (moduleName) {

            // TODO: glider, embed, pagination, table, ..

            case 'chart':
              if ($.fn.tangibleChart) {
                $el.tangibleChart()
              }
              break
            case 'mermaid':
              if (el._mermaidRendered) return
              el._mermaidRendered = true
              const code = $el.find('code').text()
              try {
                Tangible.mermaid.render(
                  'tangible-mermaid-'+moduleIndex,
                  code,
                  function(svg) {
                    el.innerHTML = svg
                    el.style.display = 'block'
                  }
                )
              } catch(e) {
                console.error('Tangible.mermaid', e.message)
                // el.innerText = e.message
                // el.style.display = 'block'
              }
              break
            case 'slider':
              if ($.fn.tangibleSlider) {
                $el.tangibleSlider()
              }
              break
            default:
              console.log('No initializer for module', moduleName)
              break
          }
        })
        .catch(function(e) {
          console.error('Tangible.moduleLoader', e)
        })
    })
}

function registerModule(name, config) {
  modules[name] = config // { assets, callback }
}

Object.assign(Tangible, {
  moduleLoader,
  registerModule
})
