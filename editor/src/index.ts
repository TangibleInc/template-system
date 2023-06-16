import { EditorState, EditorSelection } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import type { ViewUpdate } from '@codemirror/view'
import { getSetup } from './setup'

import { dark as theme } from './theme/dark'
// import { light as theme } from './theme/light'

export { format } from './languages/format'

export async function create({
  el,
  lang = 'html',
  content = '',
  onUpdate
}) {

  const updateListener = EditorView.updateListener.of((view: ViewUpdate) => {

    // https://discuss.codemirror.net/t/codemirror-6-proper-way-to-listen-for-changes/2395/2
    // https://codemirror.net/6/docs/ref/#view.ViewUpdate
    if (!view.docChanged) return

    // const code = view.state.doc.toString()

    onUpdate({
      // code
      doc: view.state.doc // Defer toString() until necessary
    })
  })

  const setup = await getSetup(lang)

  const state = EditorState.create({
    doc: content,
    // selection: EditorSelection.cursor(0),
    extensions: [
      setup,
      theme,
      ...(onUpdate ? [updateListener] : []),
    ],
  })

  const view = new EditorView({
    state,
    parent: el,
  })

  // view.focus()

  // Dynamically switch theme/extension
  // view.dispatch({
  //   effects: StateEffect.reconfigure.of(extensions)
  // })

  return {
    state,
    view
  }
}
