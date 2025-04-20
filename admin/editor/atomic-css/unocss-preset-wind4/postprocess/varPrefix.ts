import type { Postprocessor } from '@unocss/core'
import type { PresetWind4Options } from '..'

export function varPrefix({ variablePrefix: prefix }: PresetWind4Options): Postprocessor[] {
  const processor: Postprocessor = (obj) => {
    obj.entries.forEach((i) => {
      i[0] = i[0].replace(/^--un-/, `--${prefix}`)
        // .replaceAll(/var\(--/g, `var(--${prefix}`)

      if (typeof i[1] === 'string')
        i[1] = i[1]
      // .replace(/var\(--un-/g, `var(--${prefix}`)
      .replaceAll(/var\(--un-/g, `var(--`)
      .replaceAll(/var\(--/g, `var(--${prefix}`)
    })

  }

  return prefix !== 'un-' ? [processor] : []
}
