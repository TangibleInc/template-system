import {
  keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
  rectangularSelection, crosshairCursor,
  lineNumbers, highlightActiveLineGutter,
  EditorView
} from '@codemirror/view'
import { Extension, EditorState } from '@codemirror/state'
import {
  defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching,
  foldGutter, foldKeymap
} from '@codemirror/language'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { lintKeymap, lintGutter } from '@codemirror/lint'

// https://github.com/emmetio/codemirror6-plugin
import { expandAbbreviation, abbreviationTracker } from '@emmetio/codemirror6-plugin' // ~90Kb

import { indentationMarkers } from '@replit/codemirror-indentation-markers'

import { vscodeKeymap } from './vscode-keymap'
import { themeBase } from './theme/base'

import { getLangExtensions } from './lang'

// Based on https://github.com/codemirror/basic-setup/blob/main/src/codemirror.ts

const commonExtensions = [
  lineNumbers(), // #view.lineNumbers
  highlightSpecialChars(), // #view.highlightSpecialChars
  history(), // #commands.history
  foldGutter(), // #language.foldGutter
  drawSelection(), // #view.drawSelection
  dropCursor(), // #view.dropCursor
  EditorState.allowMultipleSelections.of(true), // #state.EditorState^allowMultipleSelections
  indentOnInput(), // #language.indentOnInput
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }), // #language.defaultHighlightStyle
  closeBrackets(), // #autocomplete.closeBrackets
  autocompletion({ // #autocomplete.autocompletion
    defaultKeymap: false // Needed for vscode-keymap
  }),
  rectangularSelection(), // #view.rectangularSelection
  crosshairCursor(), // #view.crosshairCursor
  // highlightActiveLine(), // #view.highlightActiveLine
  highlightActiveLineGutter(), // #view.highlightActiveLineGutter
  highlightSelectionMatches(), // #search.highlightSelectionMatches

  lintGutter(),

  bracketMatching(), // TODO: Better styling // #language.bracketMatching
  indentationMarkers(),

  themeBase,
]

const commonKeyMaps = [
  ...closeBracketsKeymap,

  /**
 * The keymap `indentWithTab` refers to the `tab` key, not tabs vs spaces.
 * It should be loaded after Emmet to ensure its completions takes precedence.
 *
 * TODO: Inform users about ESC + Tab https://codemirror.net/examples/tab/
 */
  indentWithTab,

  // ...defaultKeymap, // https://codemirror.net/docs/ref/#commands.defaultKeymap
  ...searchKeymap, // #search.searchKeymap
  ...historyKeymap,
  ...foldKeymap,
  ...completionKeymap,
  ...lintKeymap, // #lint.lintKeymap
  ...vscodeKeymap
]

export async function getSetup(lang: string): Promise<Extension> {

  const langExtensions = await getLangExtensions(lang)
  const hasEmmet = lang === 'html'

  return [
    ...commonExtensions,
    ...langExtensions,
    ...(hasEmmet
      ? [abbreviationTracker()]
      : []),
    keymap.of([
      ...(hasEmmet
        ? [{ key: 'Tab', run: expandAbbreviation }]
        : []),
      ...commonKeyMaps,
    ])
  ]
}
