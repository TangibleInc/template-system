
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'

// Based on https://github.com/codemirror/lang-html
import { html } from './html/html'
import { sass } from './sass' // ~40Kb

// import { colorPicker } from '../color-picker' // TODO: Support Sass

// import { json, jsonParseLinter } from '@codemirror/lang-json'
// import { markdown } from '@codemirror/lang-markdown'
// import { php } from '@codemirror/lang-php'
// import { linter, lintKeymap, lintGutter } from '@codemirror/lint'

/**
 * Load language extensions on demand
 */
const langExtensionsCache = {}
const langExtensionsGetters = {
  html: () => [
    html(),
  ],
  css: () => [
    css(),
    // ...colorPicker
  ],
  sass: () => [
    sass(),
    // ...colorPicker
  ],
  javascript: () => [javascript()],
}

export async function getLangExtensions(lang) {
  return langExtensionsCache[lang] || (
    langExtensionsCache[lang] = langExtensionsGetters[lang]
      ? await langExtensionsGetters[lang]()
      : []
  )
}

// const customLinter = linter((view) => {
//   const diagnostics: any[] = []
//   const code: string = view.state.doc.toString()
//   try {
//     // babelTranspile(code);
//   } catch (e: any) {
//     const line = view.state.doc.lineAt(e.loc.index)
//     diagnostics.push({
//       from: line.from,
//       to: line.to,
//       severity: 'error',
//       message: e.message,
//     })
//   }
//   return diagnostics
// })
