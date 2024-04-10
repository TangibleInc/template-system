import { format } from './languages/format'
import themes from './themes'
import { fonts, loadFont } from './fonts'
import { editorActionsPanel } from './extensions/editor-action-panel'
import { create } from './core/index'
import { dark } from './core/theme/dark'

Object.assign(themes, { dark })

export const CodeEditor = {
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
