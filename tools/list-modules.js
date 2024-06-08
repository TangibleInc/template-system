import { globby } from 'globby'

// find . -type f -iname tangible.config.js | while read file; do echo "${file%/tangible.config.js}"; done
;(async () => {
  const configFileName = 'tangible.config.js'
  const files = await globby(`**/${configFileName}`, {
    gitignore: true,
    ignore: [
      '**/.idea',
      '**/node_modules/**',
      'publish/**'
    ]
  })

  const folders = files.map((f) =>
    f.replace(configFileName, '').replace(/\/$/, '')
  )

  folders.sort()
  // console.log(folders.map(f => `- ${f}`).join('\n'))

  /**
   * Create nested list
   */

  let prev = ''

  for (const folder of folders) {

    if (folder.length===0) continue // Root folder `.`

    const parts = folder.split('/')
    const prevParts = prev.split('/')
    let indent = 0

    for (let i = 0, len = parts.length; i < len; i++) {
      if (parts[i] === prevParts[i]) {
        indent++
      } else {
        break
      }
    }

    console.log(`${' '.repeat(indent * 2)}- ${
      parts.join('/')
      // parts.slice(indent).join('/')
    }`)

    if (indent === 0 && parts.length > 1) {
      /**
       * When root-level folder has more than one path part, do this:
       *
       * - integration/beaver
       * - integration/elementor
       *
       * Instead of:
       * - integration/beaver
       *   - elementor
       */
      prev = ''
    } else {
      prev = folder
    }
  }

  console.log()
})().catch(console.error)
