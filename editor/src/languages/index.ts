
import { css } from '@codemirror/lang-css'
import { sass } from '@codemirror/lang-sass'
import { javascript } from '@codemirror/lang-javascript'

import { keymap } from '@codemirror/view'

import { colorPicker } from '@replit/codemirror-css-color-picker'

// Based on https://github.com/codemirror/lang-html
import { html } from './lang-html/html'
import { createHtmlLinter } from './html-linter'

// import { json, jsonParseLinter } from '@codemirror/lang-json'
// import { markdown } from '@codemirror/lang-markdown'
// import { php } from '@codemirror/lang-php'


// https://github.com/emmetio/codemirror6-plugin
import { expandAbbreviation, abbreviationTracker } from '@emmetio/codemirror6-plugin' // ~90Kb

import { getAutocompleteExtensions } from '../extensions/autocomplete'
import { format } from './format'
import { hyperLink } from '../extensions/hyperlink'

const createKeyMapFormatter = (lang) => keymap.of([
  {
    // Keyboard shortcut to format code with Prettier
    key: 'Mod-Alt-f',
    run(view) {

      const content = view.state.doc.toString()

      format({
        lang,
        content
      }).then(formattedCode => {

        const selection = view.state.selection
        const currentPosition = selection.main.from || 0

        /**
         * Replace content
         */
        const lastPos = content.length
        const transaction = view.state.update({
          changes: {
            from: 0,
            to: lastPos,
            insert: formattedCode
          },
        })

        view.dispatch(transaction)

        // Cannot map cursor because transaction replaces entire content
        // const newSelection = selection.map(transaction.changes)

        const newSelection = {
          // Restore cursor to closest position
          anchor: Math.min(currentPosition, lastPos - 1)
        }

        view.dispatch({
          selection: newSelection
        })

        // TODO: Restore cursor position

      })
        .catch(console.error)

      return true
    }
  },
])

/**
 * Load language extensions on demand
 */
const langExtensionsCache = {}
const langExtensionsGetters = {
  html: () => [
    html({
      selfClosingTags: true
    }),
    createHtmlLinter(),
    ...getAutocompleteExtensions(),
    abbreviationTracker(),
    keymap.of([
      { key: 'Tab', run: expandAbbreviation }
    ]),
    createKeyMapFormatter('html'),
    hyperLink
  ],
  css: () => [
    css(),
    colorPicker,
    hyperLink
  ],
  sass: () => [
    sass(),
    createKeyMapFormatter('scss'),
    colorPicker,
    hyperLink
  ],
  javascript: () => [
    javascript(),
    createKeyMapFormatter('js'),
    hyperLink
  ],
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
