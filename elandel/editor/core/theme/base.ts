import {
  EditorView
} from '@codemirror/view'

// https://codemirror.net/examples/styling/#themes
export const themeBase = EditorView.theme({
  '&': {
    height: '100%',
    fontSize: '14px',
  },

  '.cm-scroller': {
    margin: '.25rem',
    lineHeight: 1.64,
    fontFamily: 'inherit'
  },

  '.cm-content, .cm-gutter': {
    minHeight: '300px',
    fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
    borderLeftWidth: '3px',
    // transitionDuration: '140ms',
  },

  '.cm-panels': {
    fontSize: '14px',
  },

  // Max height: https://discuss.codemirror.net/t/how-to-set-max-height-of-the-editor/2882/6
  // '.cm-editor': { height: '100%' },
  // '.cm-scroller': { overflow: 'auto' },
  
  '.emmet-tracker': {
    textDecoration: 'none' //`underline 1px #80bdff`,
  },

  '.cm-lint-marker-error': {
    content: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%2212%22%20fill%3D%22%23f43%22%2F%3E</svg>');`
  }
  // Original: codemirror/core/lint/src/lint.ts
})
