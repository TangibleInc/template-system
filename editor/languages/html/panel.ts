import { Text } from '@codemirror/state'
import { showPanel } from '@codemirror/view'
import { syntaxTree } from '@codemirror/language'

import type { EditorView, Panel, ViewUpdate } from '@codemirror/view'

function updateInfoPanel(el, view: EditorView | ViewUpdate) {

  const { state } = view

  const pos = state.selection.main.from

  const line = state.doc.lineAt(pos)
  const lineNumber = line.number
  const column = (pos - line.from) + 1

  const tree = syntaxTree(state)
  const node = tree.resolve(pos, 1)

  // console.log('node', node)

  const nodeName = node && node.type && node.type.name

  el.style.padding = '.125rem .5rem'
  el.innerHTML = `<div style="float:left">
    Line ${lineNumber} Column ${column}
  </div><div style="float:right">${
    nodeName ? nodeName : ''
  }</div>`
}

function infoPanel(view: EditorView): Panel {

  const el = document.createElement('div')

  updateInfoPanel(el, view)

  return {
    dom: el,
    update(update: ViewUpdate) {
      if (update.docChanged || update.selectionSet)
        updateInfoPanel(el, update)
      }
  }
}

export function infoPanelExtension() {
  return showPanel.of(infoPanel)
}
