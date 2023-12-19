import { format } from './languages/format'
import themes from './themes'
import { fonts, loadFont } from './fonts'
import { editorActionsPanel } from './extensions/editor-action-panel'
import { create } from './core/index'
import { dark } from './core/theme/dark'

Object.assign(themes, { dark })

const CodeEditor = {
  create(props) {
    const editor = create({
      themes,
      fonts,
      loadFont,
      format,
      ...props,
      editorActionsPanel,
    })
    return editor
  },
  format,
}

window.Tangible = window.Tangible || {}
window.Tangible.TemplateSystem = window.Tangible.TemplateSystem || {}
window.Tangible.TemplateSystem.CodeEditor = CodeEditor

/**
 * Previous version based on CodeMirror v5 is called:
 * Tangible.CodeMirror and createCodeEditor
 * @see /modules/codemirror-v5
 */
