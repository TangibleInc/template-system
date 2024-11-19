import { keymap } from '@codemirror/view'

// https://prettier.io/docs/en/browser.html
import prettier from 'prettier/standalone' // 427 KB
import parserEspree from 'prettier/parser-espree' // 152 KB
import parserPostCSS from 'prettier/parser-postcss' // 155 KB

import * as html from '../html'
import type { Language } from '../html'

// https://prettier.io/docs/en/options.html#parser
const prettierLanguageOptions = {
  // html: {
  //   parser: 'html',
  //   plugins: [htmlPlugin],
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
  html: {}
}

export type Formatter = (props: {
  content: string
  options?: any
}) => Promise<string>

export type FormatterLanguage = keyof typeof prettierLanguageOptions

export function createFormatter({
  lang = 'html',
  languageDefinition = {}
}: {
  lang: FormatterLanguage
  languageDefinition?: Language
}): Formatter {

  const formatterOptions = {}

  if (lang==='html') {

    const {
      closedTags = [],
      rawTags = [],
    } = languageDefinition

    Object.assign(formatterOptions, {
      closedTags,
      rawTags
    })

  } else if (prettierLanguageOptions[lang]) {
    Object.assign(formatterOptions, prettierLanguageOptions[lang])
  }

  return async function format({
    content,
    options = {}
  }: {
    content: string
    options?: any
  }) {
  
    try {
      return !prettierLanguageOptions[lang]
      ? lang==='html'
        ? html.formatString(content, formatterOptions)
        : content
      : await prettier.format(content, {
          ...formatterOptions,
          ...options,
        })
    } catch(e) {
      console.error('Prettier format error', e.message)
      return content
    }
  }
}

export const createFormatKeyMap = (lang: string, options: any = {}) => {

  /**
   * Formatter from getSetup()
   */
  const format = options.format || (async (content: string) => content)

  function run(view, allTextByDefault = true) {

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
    } else if (!allTextByDefault) {

      /**
       * Backward compatibility: Indent only current line for Mod-Alt-f
       */
      const startLine = view.state.doc.lineAt(selection.main.from)
      const endLine = view.state.doc.lineAt(selection.main.from)

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
    { key: 'Mod-Alt-f', run: view => run(view, false) },
  ])
}
