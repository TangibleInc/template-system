import { CodeEditor } from '../elandel/editor'

declare global {
  interface Window {
    Tangible: {
      TemplateSystem: {
        CodeEditor: typeof CodeEditor
      }
    }
  }
}

window.Tangible = window.Tangible || {}
window.Tangible.TemplateSystem = window.Tangible.TemplateSystem || {}
window.Tangible.TemplateSystem.CodeEditor = CodeEditor
