import { html } from './html'
import { createHtmlLinter } from './html/linter-htmlhint'

import { css } from '@codemirror/lang-css'
import { sass, sassCompletionSource } from '@codemirror/lang-sass'
import { createSassLinter } from './sass/linter'

import { javascript, localCompletionSource } from '@codemirror/lang-javascript'
import { createJavaScriptLinter } from './javascript/linter'

// import { json, jsonParseLinter } from '@codemirror/lang-json'
// import { markdown } from '@codemirror/lang-markdown'
// import { php } from '@codemirror/lang-php'

import { keymap } from '@codemirror/view'

import { autocompletion, acceptCompletion } from '@codemirror/autocomplete'
import { getHTMLAutocomplete } from './html/autocomplete'

// https://github.com/emmetio/codemirror6-plugin
import {
  abbreviationTracker,
  expandAbbreviation,
} from '@emmetio/codemirror6-plugin' // ~90Kb

import { createFormatKeyMap } from './format'

import { colorPicker } from '@replit/codemirror-css-color-picker'
// import { hyperLink } from '../extensions/hyperlink'
import { infoPanelExtension } from './html/panel'
import {indentService} from "@codemirror/language"

const indentPlainTextExtension = indentService.of((context, pos) => {
  const previousLine = context.lineAt(pos, -1)
  return previousLine.text.match(/^(\s)*/)[0].length
})

/**
 * Load language extensions on demand
 */
const langExtensionsCache = {}
const langExtensionsGetters = {

  html: () => [
    html({
      selfClosingTags: true
    }),
    createFormatKeyMap('html'),
    abbreviationTracker({
      syntax: 'html'
    }),
    keymap.of([
      { key: 'Tab', run: expandAbbreviation },
    ]),
    createHtmlLinter(),
    getHTMLAutocomplete(),
    // hyperLink,
    // infoPanelExtension(),
    // indentPlainTextExtension,
  ],

  css: () => [
    css(),
    colorPicker,
    abbreviationTracker({
      syntax: 'css'
    }),
    keymap.of([
      { key: 'Tab', run: expandAbbreviation }
    ]),
    // hyperLink
  ],

  sass: () => [
    sass(),
    autocompletion({ // https://codemirror.net/docs/ref/#autocomplete.autocompletion
      defaultKeymap: false, // Needed for vscode-keymap
      override: [
        sassCompletionSource
      ]
    }),
    abbreviationTracker({
      syntax: 'scss'
    }),
    keymap.of([
      { key: 'Tab', run: expandAbbreviation }
    ]),
    createSassLinter(),
    createFormatKeyMap('scss'),
    colorPicker,
    // hyperLink
  ],

  javascript: () => [
    javascript(),
    autocompletion({ // https://codemirror.net/docs/ref/#autocomplete.autocompletion
      defaultKeymap: false, // Needed for vscode-keymap
    }),
    createJavaScriptLinter(),
    createFormatKeyMap('js'),
    // hyperLink
  ],
}

export async function getLangExtensions(lang) {
  return langExtensionsCache[lang] || (
    langExtensionsCache[lang] = langExtensionsGetters[lang]
      ? await langExtensionsGetters[lang]()
      : []
  )
}
