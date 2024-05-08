import {
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  lineNumbers,
  highlightActiveLineGutter,
  EditorView,
} from '@codemirror/view'
import { type Extension, EditorState } from '@codemirror/state'
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap,
} from '@codemirror/language'
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
} from '@codemirror/autocomplete'
import { lintKeymap, lintGutter } from '@codemirror/lint'

import { indentationMarkers } from '@replit/codemirror-indentation-markers'

import { getLangExtensions } from '../languages'
import { themeBase } from './theme/base'
import { vscodeKeymap } from '../extensions/vscode-keymap'

import { TextToLink, hyperLinkStyle } from '../extensions/hyperlink'

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

  TextToLink(EditorView),
  hyperLinkStyle,

  EditorView.lineWrapping,
  // hyperLinkExtension(),

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

  /**
   * Default key map
   * @see https://codemirror.net/docs/ref/#commands.defaultKeymap
   * @see https://github.com/codemirror/commands/blob/main/src/commands.ts
   */
  ...defaultKeymap,

  ...searchKeymap, // https://codemirror.net/docs/ref/#search.searchKeymap
  ...historyKeymap,
  ...foldKeymap,
  // ...lintKeymap, // https://codemirror.net/docs/ref/#lint.lintKeymap
  // ...vscodeKeymap,
]

/**
 * Get language setup - Using async to support dynamic loading
 */
export async function getSetup(lang: string, options = {}): Promise<Extension> {
  const langExtensions = await getLangExtensions(lang)

  const setup = [
    ...commonExtensions,
    keymap.of(completionKeymap), // Before Emmet
    ...langExtensions, // Before common key maps to allow Emmet key map to take precedence
    keymap.of(commonKeyMaps),
  ]

  if (options.keymap) {
    setup.push(keymap.of(options.keymap))
  }

  return setup
}
