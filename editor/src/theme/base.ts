import {
  EditorView
} from '@codemirror/view'

// https://codemirror.net/examples/styling/#themes
export const themeBase = EditorView.theme({
  '&': {
    fontFamily: 'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
    fontSize: '14px',
  },
  '.cm-content, .cm-gutter': {
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
  },

  '.cm-lint-marker-error': {
    content: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%2212%22%20fill%3D%22%23f43%22%2F%3E</svg>');`
  }
  // Original: r="15" fill="#f87" stroke="#f43" stroke-width="6"
  // codemirror/core/lint/src/lint.ts
  // url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%2215%22%20fill%3D%22%23f87%22%20stroke%3D%22%23f43%22%20stroke-width%3D%226%22%2F%3E</svg>');
})
