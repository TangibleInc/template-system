import { createGenerator } from '@unocss/core'
import createPreset from './custom-preset' // '@unocss/preset-mini'

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
      const { css } = await generator.generate(content)
      return css
        .replace('/* layer: default */\n', '')
        .replace(/\\:/g, '-')
        .replace(/\\\//g, '-')
    }
  }
}

window.Tangible = window.Tangible || {}
window.Tangible.createAtomicCssEngine = createAtomicCssEngine
