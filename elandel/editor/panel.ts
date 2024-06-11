import { Text } from '@codemirror/state'
import { showPanel } from '@codemirror/view'
import { syntaxTree } from '@codemirror/language'

import type { EditorView, Panel, ViewUpdate } from '@codemirror/view'

export function createEditorActionsPanel(editor, editorActionsPanel) {
  return showPanel.of((view) => editorActionsPanel(view, editor))
}
