
export const fonts = [
  ['Anonymous Pro', 'anonymous-pro', 'anonymous-pro.woff'],
  ['Cascadia Mono', 'cascadia-mono', 'CascadiaMono.woff2'],
  ['Cousine', 'cousine', 'cousine-regular.woff'],
  ['Droid Sans Mono', 'droid-sans-mono', 'droid-sans-mono.woff2'],
  ['Fira Code', 'fira-code', 'FiraCode-Regular.woff2'],
  ['JetBrains Mono', 'jetbrains-mono', 'JetBrainsMono-Regular.woff2'],
  ['Menlo', 'menlo', 'menlo-regular.woff2'],
  ['Monaspace Neon', 'monaspace-neon', 'MonaspaceNeon-Regular.woff'],
  ['Monaspace Xenon', 'monaspace-xenon', 'MonaspaceXenon-Regular.woff'],
  ['MonoLisa', 'monolisa', 'monolisa-regular.woff2'],
  ['Noto Mono', 'noto-mono', 'noto-mono.woff2'],
  ['Office Code Pro', 'office-code-pro', 'office-code-pro.woff'],
  ['Operator Mono', 'operator-mono', 'operator-mono-medium.woff2'],
  // ['Roboto Mono', 'roboto-mono', ''],
  ['SF Mono', 'sf-mono', 'sf-mono-regular.woff2'],
  ['Source Code Pro', 'source-code-pro', 'SourceCodePro-Regular.woff2'],
]

const fontsLoaded = {}

export async function loadFont(fontName: string, fontsUrl: string) {

  if (fontsLoaded[fontName]) {
    if (fontsLoaded[fontName] instanceof Promise) {
      await fontsLoaded[fontName] // Being loaded
    }
    return
  }

  fontsLoaded[fontName] = (async () => {

    for (const [label, value, file] of fonts) {
      if (fontName !== value) continue

      const url = `${fontsUrl}/${file}`
      const font = new FontFace(value, `url(${url})`)

      await font.load()
      document.fonts.add(font)

      fontsLoaded[fontName] = true
      break
    }

    // console.log('Font loaded', fontName)
  })()

  await fontsLoaded[fontName]
}
