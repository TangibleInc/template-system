// https://prettier.io/docs/en/browser.html
import prettier from 'prettier/standalone' // 427 KB

import parserHtml from 'prettier/parser-html' // 158 KB
import parserEspree from 'prettier/parser-espree' // 152 KB
import parserPostCSS from 'prettier/parser-postcss' // 155 KB

import { keymap } from '@codemirror/view'

// console.log('parserHtml', parserHtml)

// https://prettier.io/docs/en/options.html#parser
const prettierLanguageOptions = {
  html: {
    parser: 'html',
    plugins: [parserHtml],

    /**
     * TODO: Need to pass parser options, but prettier/parser-html does not
     * provide a way to do it.
     * @see https://github.com/prettier/prettier/blob/main/src/language-html/parser-html.js#L77
     */
    isTagNameCaseSensitive: true,
    shouldParseAsRawText: (tagName: string): boolean => {
      return tagName === 'Note'
    },
  },
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
  return !prettierLanguageOptions[lang]
    ? content
    : prettier.format(content, {
        ...prettierLanguageOptions[lang],
        ...options,
      })
}

export const createFormatKeyMap = (lang) =>
  keymap.of([
    {
      // Keyboard shortcut to format code with Prettier
      key: 'Mod-Alt-f',
      run(view) {
        const content = view.state.doc.toString()

        format({
          lang,
          content,
        })
          .then((formattedCode) => {
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
                insert: formattedCode,
              },
            })

            view.dispatch(transaction)

            // Cannot map cursor because transaction replaces entire content
            // const newSelection = selection.map(transaction.changes)

            const newSelection = {
              // Restore cursor to closest position
              anchor: Math.min(currentPosition, formattedCode.length - 1),
            }

            view.dispatch({
              selection: newSelection,
            })
          })
          .catch(console.error) // TODO: Map error to lint gutter

        return true
      },
    },
  ])
