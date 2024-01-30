// https://prettier.io/docs/en/browser.html
import prettier from 'prettier/standalone' // 427 KB

// import parserHtml from 'prettier/parser-html' // 158 KB
import parserEspree from 'prettier/parser-espree' // 152 KB
import parserPostCSS from 'prettier/parser-postcss' // 155 KB

import { keymap } from '@codemirror/view'

import * as HtmlBeautify from './html/html-beautify'

// console.log('parserHtml', parserHtml)

// https://prettier.io/docs/en/options.html#parser
const prettierLanguageOptions = {
  // html: {
  //   parser: 'html',
  //   plugins: [parserHtml],

  //   /**
  //    * TODO: Need to pass parser options, but prettier/parser-html does not
  //    * provide a way to do it.
  //    * @see https://github.com/prettier/prettier/blob/main/src/language-html/parser-html.js#L77
  //    */
  //   isTagNameCaseSensitive: true,
  //   shouldParseAsRawText: (tagName: string): boolean => {
  //     return tagName === 'Note'
  //   },
  // },
  sass: {
    parser: 'scss',
    plugins: [parserPostCSS],
  },
  javascript: {
    parser: 'espree',
    plugins: [parserEspree],
    singleQuote: true,
    semi: false,
    useTabs: false,
    tabWidth: 2,
  },
  json: {
    parser: 'json-stringify',
  },
}

export async function format({ lang = 'html', content, options = {} }) {
  if (lang === 'html') {
    console.log('format', content)
    return HtmlBeautify.format(content)
  }

  return !prettierLanguageOptions[lang]
    ? content
    : prettier.format(content, {
        ...prettierLanguageOptions[lang],
        ...options,
      })
}

export const createFormatKeyMap = (lang) => {
  function run(view) {

    const selection = view.state.selection
    const isSelected = !selection.main.empty

    let content: string
    let startPos: number
    let endPos: number

    if (isSelected) {

      /**
       * Selected text
       * 
       * From current line of selection start to last line at selection end
       */
      const startLine = view.state.doc.lineAt(selection.main.from)
      const endLine = view.state.doc.lineAt(selection.main.to)

      startPos = startLine.from
      endPos = endLine.to

      content = view.state.sliceDoc(startPos, endPos)

    } else {
      // All text
      content = view.state.doc.toString()
      startPos = 0
      endPos = view.state.doc.length
    }

    format({
      lang,
      content,
    })
      .then((formattedCode) => {

        const currentPosition = startPos

        /**
         * Replace content
         */
        const transaction = view.state.update({
          changes: {
            from: startPos,
            to: endPos,
            insert: formattedCode,
          },
        })

        view.dispatch(transaction)

        // Cannot map cursor because transaction replaces entire content
        // const newSelection = selection.map(transaction.changes)

        const newSelection = {
          // Restore cursor to closest position
          anchor: Math.min(
            currentPosition,
            endPos // formattedCode.length - 1
          ),
        }

        view.dispatch({
          selection: newSelection,
        })
      })
      .catch(console.error) // TODO: Map error to lint gutter

    return true
  }
  // Keyboard shortcut to format code
  return keymap.of([
    { key: 'Mod-Enter', run }, // Ctrl or Command and Enter
    { key: 'Mod-Alt-f', run }, // Backward compatibility
  ])
}
