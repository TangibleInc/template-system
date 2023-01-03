import {
  EditorView
} from '@codemirror/view'

// https://codemirror.net/examples/styling/#themes
export const themeBase = EditorView.theme({
  '&': {
    fontSize: '16px',
  },
  '.cm-content': {
    minHeight: '200px',
  },
  '.cm-gutter': {
    minHeight: '200px',
  },
  /**
   * Align open/closed markers for fold
   * Move the open marker slightly higher
   * @codemirror/core/language/src/fold.ts
   */
  '.cm-gutterElement span[title="Fold line"]': {
    verticalAlign: 'super',
    lineHeight: '1'
  },
  '.cm-cursor': {
    borderLeftWidth: '2px',
  }
})
