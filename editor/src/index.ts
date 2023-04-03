import { EditorState, EditorSelection } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import type { ViewUpdate } from '@codemirror/view'
import { getSetup } from './setup'
import { themeDark as theme } from './theme/dark'
// import { themeLight as theme } from './theme/light'

export async function createEditor({
  el,
  lang = 'html',
  // theme = 'light', // or dark
  content = '',
  onUpdate
}) {

  const updateListener = EditorView.updateListener.of((v: ViewUpdate) => {
    // https://discuss.codemirror.net/t/codemirror-6-proper-way-to-listen-for-changes/2395/2
    // https://codemirror.net/6/docs/ref/#view.ViewUpdate
    if (!v.docChanged) return

    const code = v.state.doc.toString()
    onUpdate({
      code
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

  // Switch theme/extension
  // view.dispatch({
  //   effects: StateEffect.reconfigure.of(extensions)
  // })

  return {
    state,
    view
  }
}
