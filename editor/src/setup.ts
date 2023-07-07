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

import { indentationMarkers } from '@replit/codemirror-indentation-markers'

import { vscodeKeymap } from './extensions/vscode-keymap'
import { getLangExtensions } from './languages'
import { themeBase } from './theme/base'


// Based on https://github.com/codemirror/basic-setup/blob/main/src/codemirror.ts
// https://codemirror.net/docs/extensions/
const commonExtensions = [

  EditorState.tabSize.of(2),

  lineNumbers(), // https://codemirror.net/docs/ref/#view.lineNumbers
  highlightSpecialChars(), // https://codemirror.net/docs/ref/#view.highlightSpecialChars
  history(), // https://codemirror.net/docs/ref/#commands.history
  foldGutter(), // https://codemirror.net/docs/ref/#language.foldGutter
  drawSelection(), // https://codemirror.net/docs/ref/#view.drawSelection
  dropCursor(), // https://codemirror.net/docs/ref/#view.dropCursor
  EditorState.allowMultipleSelections.of(true), // https://codemirror.net/docs/ref/#state.EditorState^allowMultipleSelections
  indentOnInput(), // https://codemirror.net/docs/ref/#language.indentOnInput

  syntaxHighlighting(defaultHighlightStyle, { fallback: true }), // https://codemirror.net/docs/ref/#language.defaultHighlightStyle

  closeBrackets(), // https://codemirror.net/docs/ref/#autocomplete.closeBrackets

  rectangularSelection(), // https://codemirror.net/docs/ref/#view.rectangularSelection
  crosshairCursor(), // https://codemirror.net/docs/ref/#view.crosshairCursor
  highlightActiveLine(), // https://codemirror.net/docs/ref/#view.highlightActiveLine
  highlightActiveLineGutter(), // https://codemirror.net/docs/ref/#view.highlightActiveLineGutter
  highlightSelectionMatches(), // https://codemirror.net/docs/ref/#search.highlightSelectionMatches

  lintGutter(),

  bracketMatching(), // TODO: Better styling // https://codemirror.net/docs/ref/#language.bracketMatching
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
  ...searchKeymap, // https://codemirror.net/docs/ref/#search.searchKeymap
  ...historyKeymap,
  ...foldKeymap,
  ...completionKeymap,
  // ...lintKeymap, // https://codemirror.net/docs/ref/#lint.lintKeymap
  ...vscodeKeymap,
]

/**
 * Get language setup - Using async to support dynamic loading
 */
export async function getSetup(lang: string): Promise<Extension> {

  const langExtensions = await getLangExtensions(lang)

  return [
    ...commonExtensions,
    keymap.of(commonKeyMaps),
    ...langExtensions,
  ]
}
