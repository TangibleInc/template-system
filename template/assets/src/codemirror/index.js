
// Code editor with sensible defaults for HTML templates and common languages
const createCodeEditor = require('../../../codemirror') // @tangible/codemirror

const {
  CodeMirror, // Direct access to underlying CodeMirror
  commonOptions,
  languageOptions
} = createCodeEditor

Object.assign(CodeMirror, {
  commonOptions,
  languageOptions
})

window.Tangible = window.Tangible || {}
window.Tangible.CodeMirror = CodeMirror
window.Tangible.createCodeEditor = createCodeEditor
