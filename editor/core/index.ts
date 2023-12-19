import { EditorState, EditorSelection, StateEffect } from '@codemirror/state'
import { EditorView, keymap, showPanel, ViewUpdate } from '@codemirror/view'
import type { Text, Extension } from '@codemirror/state'

import { eventHub } from './event'
import { getSetup } from './setup'
// import { createEditorActionsPanel } from './panel'

import { dark } from './theme/dark'
// import { light as theme } from './theme/light'

export type CodeEditorOptions = {
  el: HTMLElement
  lang: string
  content: string
  onUpdate?: (updateCallbackProps: { doc: Text }) => void
  onSave?: () => void
  extensions?: Extension[],

  themes?: { [name: string]: Function },
  fonts?: any[],
  loadFont?: Function,
  format?: Function,
  editorActionsPanel?: Function,
}

export async function create({
  el,
  lang = 'html',
  content = '',
  onUpdate,
  onSave,
  extensions: userExtensions = [],
  themes = {},
  fonts = [],
  loadFont,
  format,
  editorActionsPanel,
}: CodeEditorOptions) {

  const updateListener = EditorView.updateListener.of((view: ViewUpdate) => {
    // https://discuss.codemirror.net/t/codemirror-6-proper-way-to-listen-for-changes/2395/2
    // https://codemirror.net/6/docs/ref/#view.ViewUpdate
    if (!view.docChanged) return

    // const code = view.state.doc.toString()

    onUpdate && onUpdate({
      // code
      doc: view.state.doc, // Defer toString() until necessary
    })
  })

  const setup = await getSetup(lang, {
    keymap: [
      {
        key: 'Ctrl-s',
        mac: 'Cmd-s',
        run() {
          onSave && onSave()
        },
        preventDefault: true,
      },
    ],
  })

  const editor = {
    eventHub,
    themes,
    fonts,
    loadFont,
    extensions: [
      // First extension is the theme
      dark,
      setup,
      ...(onUpdate ? [updateListener] : []),
      ...userExtensions,
    ],
  }

  const extensions = editor.extensions

  if (editorActionsPanel) {
    extensions.push(showPanel.of((view) => editorActionsPanel(view, editor)))
  }

  const state = EditorState.create({
    doc: content,
    // selection: EditorSelection.cursor(0),
    extensions,
  })

  const view = new EditorView({
    state,
    parent: el,
  })

  // Don't auto-focus because there can be multiple editors
  // view.focus()

  Object.assign(editor, {
    el,
    state,
    view,
    extensions,
    async format() {

      if (!format) return

      const content = view.state.doc.toString()
      const formattedCode = await format({
        lang,
        content,
      })

      // Replace content
      view.dispatch({
        changes: {
          from: 0,
          to: content.length,
          insert: formattedCode,
        },
      })
    },
    setTheme(theme) {
      // Dynamically switch theme
      extensions[0] = theme
      view.dispatch({
        effects: StateEffect.reconfigure.of(extensions),
      })
    },
  })

  return editor
}
