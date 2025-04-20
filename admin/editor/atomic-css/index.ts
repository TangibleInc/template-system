import {
  createGenerator,
  type UnoGenerator,
  type PresetOrFactoryAwaitable,
} from './unocss' //'@unocss/core'
import createPreset from './unocss-preset-wind4' // '@unocss/preset-wind4'

function createAtomicCssEngine() {
  let generator: Promise<UnoGenerator<object>> | UnoGenerator<object> =
    createGenerator(
      {

        presets: [createPreset({
          reset: false,
          themePreflight: 'on-demand',
          arbitraryVariants: false,
          variablePrefix: 't-'
        }) as PresetOrFactoryAwaitable],
      },
      {
        // default options
      },
    )

  return {
    async parse(content: string): Promise<{
      variables: [key: string, value: string][]
      selectors: {
        [key: string]: string
      }
    }> {
      // Defer resolving promise to keep the creator function sync
      if (generator instanceof Promise) {
        generator = await generator
      }

      const { css, layers, matched, getLayer, getLayers } = await generator.generate(content, {
        extendedInfo: true,
      })

      const selectors = {}

      // unocss/src/types, StringifiedUtil
      for (const [key, value] of matched.entries()) {

        const rules: (string | undefined)[][] = []
        for (const [index, selector, body, parent] of value.data) {
          if (selector?.startsWith('@property')) continue
          rules.push([
            selector?.replace(/\$\$ /g, ''), // unocss uses $$ internally
            body,
            parent, // Media query
          ])
        }
        selectors[key] = rules
      }

      /**
       * Extract variable declarations
       * Necessary because generated `css` contains unused rules such as @property
       */
      const themeCss = getLayer('theme') || ''
      const variables: [key: string, value: string][] = themeCss.split('\n').map(s => s.trim()).filter(s => s.startsWith('--')).map(s => {
        const [key, value] = s.split(': ')
        return [key, value.replace(';', '').trim()]
      })

      if (variables.length) {
        // Supply missing vars - TODO: Why UnoCSS is not generating them
        variables.unshift(['--t-opacity', '100%'])
        variables.unshift(['--t-text-opacity', '100%'])
        variables.unshift(['--t-bg-opacity', '100%'])
      }

      return { variables, selectors }
    },
  }
}

window.Tangible = window.Tangible || {}
window.Tangible.createAtomicCssEngine = createAtomicCssEngine
