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

import { autocompletion, acceptCompletion, closeCompletion,
  moveCompletionSelection, startCompletion } from '@codemirror/autocomplete'
import { createHtmlAutocomplete } from './html/autocomplete'

// https://github.com/emmetio/codemirror6-plugin
import {
  emmetConfig,
  abbreviationTracker,
  expandAbbreviation,
} from '@emmetio/codemirror6-plugin' // ~90Kb

import { createFormatKeyMap } from './format'
import { colorPicker } from './extensions/color-picker'
import { infoPanelExtension } from './html/panel'

const sharedCompletionKeymap = keymap.of([
  // {key: "Ctrl-Space", run: startCompletion},
  {key: "Escape", run: closeCompletion},
  {key: "ArrowDown", run: moveCompletionSelection(true)},
  {key: "ArrowUp", run: moveCompletionSelection(false)},
  {key: "PageDown", run: moveCompletionSelection(true, "page")},
  {key: "PageUp", run: moveCompletionSelection(false, "page")},
  {key: "Enter", run: acceptCompletion},

  { key: 'Tab', run: acceptCompletion },
  { key: 'Shift-Tab', run: expandAbbreviation },
  { key: 'Shift-Enter', run: closeCompletion },
])

/**
 * Load language extensions on demand
 */
const langExtensionsCache = {}
const langExtensionsGetters = {

  html: (options?: any) => [
    html({
      selfClosingTags: true
    }),
    createHtmlAutocomplete(options),
    createFormatKeyMap('html', options),
    // abbreviationTracker({
    //   syntax: 'html',
    // }),
    emmetConfig.of({ syntax: 'html' }),
    sharedCompletionKeymap,
    createHtmlLinter(),
    // infoPanelExtension(),
    // indentPlainTextExtension,
  ],

  css: () => [
    css(),
    colorPicker,
    // abbreviationTracker({
    //   syntax: 'css'
    // }),
    emmetConfig.of({ syntax: 'css' }),
    sharedCompletionKeymap,
    // hyperLink
  ],

  sass: () => [
    sass(),
    autocompletion({ // https://codemirror.net/docs/ref/#autocomplete.autocompletion
      defaultKeymap: false, // Needed for vscode-keymap
      // selectOnOpen: false,
      override: [
        sassCompletionSource
      ]
    }),
    // abbreviationTracker({
    //   syntax: 'scss'
    // }),
    emmetConfig.of({ syntax: 'scss' }),
    sharedCompletionKeymap,
    createSassLinter(),
    createFormatKeyMap('scss'),
    colorPicker,
  ],

  javascript: () => [
    javascript(),
    autocompletion({ // https://codemirror.net/docs/ref/#autocomplete.autocompletion
      defaultKeymap: false, // Needed for vscode-keymap
      // selectOnOpen: false,
    }),
    sharedCompletionKeymap,
    createJavaScriptLinter(),
    createFormatKeyMap('js'),
  ],
}

export async function getLangExtensions(lang, options) {
  return langExtensionsCache[lang] || (
    langExtensionsCache[lang] = langExtensionsGetters[lang]
      ? await langExtensionsGetters[lang](options)
      : []
  )
}
