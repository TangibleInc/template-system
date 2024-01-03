import { createGenerator } from '@unocss/core'
import createPreset from '@unocss/preset-wind'

function createAtomicCssEngine() {

  const generator = createGenerator(
    {
      presets: [
        createPreset({
          preflight: false,
          arbitraryVariants: false,
        }),
      ],
      
    },
    {
      // default options
    }
  )

  return {
    async parse(content) {

      const { css, matched } = await generator.generate(content, {
        extendedInfo: true
      })

      const selectors = {}

      // unocss/src/types, StringifiedUtil
      for (const [key, value] of matched.entries()) {
        const rules: (string | undefined)[][] = []
        for (const [index, selector, body, parent] of value.data) {
            rules.push([
              selector?.replace(/\$\$ /g, ''), // unocss uses $$ internally
              body,
              parent // Media query
            ])
        }
        selectors[key] = rules
      }

      return selectors
    }
  }
}

window.Tangible = window.Tangible || {}
window.Tangible.createAtomicCssEngine = createAtomicCssEngine
