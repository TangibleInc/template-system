/**
 * Compatibility layer to help with transition of CodeMirror 5 to 6
 */

declare global {
  interface Window {
    wp: any
    Tangible: {
      ajax: any
      TemplateSystem: any
      // Legacy
      createCodeEditor: typeof createTemplateEditor
    }
  }
}

export type CodeEditorLegacyInterface = {
  getValue: () => string
  focus: () => void
  refresh: () => void
  setSize: (width: string | null, height: string | null) => void
  on: (eventName: string, callback: Function) => void
  off: (eventName: string, callback: Function) => void
}

export type CodeEditorLegacyOptions = {
  language?: string
  onSave?: () => void
}

export type CodeEditorInterface = CodeEditorLegacyInterface & {
  updateTextarea: () => void
}

export async function createTemplateEditor(
  textarea: HTMLTextAreaElement,
  options: CodeEditorLegacyOptions = {}
): Promise<CodeEditorInterface> {
  const { CodeEditor } = window.Tangible.TemplateSystem || {}

  if (!CodeEditor) {
    throw new Error('CodeEditor not found')
  }

  // console.log('createTemplateEditor', textarea, CodeEditor, options)

  const { language = 'html', onSave } = options

  const listeners = {}
  
  const editor = await CodeEditor.create({
    // el,
    lang: language,
    content: textarea.value,
    onUpdate(doc) {
      if (listeners['change']) {
        api.emit('change') // Caller gets value from editor
      }
    },
    onSave() {
      if (!onSave) return
      updateTextarea()
      onSave()
    },
    editorActionsPanel: options.editorActionsPanel
  })
  
  const api = {

    // New editor
    
    codeMirror6: editor,
    updateTextarea,

    // Legacy editor

    getValue() {
      if (!editor) return ''
      return editor.view.state.doc.toString()
    },
    setValue(value) {
      if (!editor) return
      const content = editor.view.state.doc.toString()
      // Replace content
      editor.view.dispatch({
        changes: {
          from: 0,
          to: content.length,
          insert: value,
        },
      })
    },
    focus() {
      editor && editor.view.focus()
    },
    refresh() {},
    setSize(width: string | null, height: string | null) {},

    on(eventName, callback) {
      if (!listeners[eventName]) {
        listeners[eventName] = []
      }
      listeners[eventName].push(callback)
    },
    emit(eventName, ...args) {
      if (listeners[eventName]) {
        for (const listener of listeners[eventName]) {
          listener(...args)
        }
      }
    },
    off(eventName, callback) {
      if (listeners[eventName]) {
        listeners[eventName] = listeners[eventName].filter(
          (f) => f !== callback
        )
      }
    },
  }
  
  // const el = document.createElement('div')
  const containterClass = 'tangible-template-editor-container'

  if (!textarea.parentNode?.classList.contains(containterClass)) {
    // el.classList.add(containterClass)
    textarea.parentNode?.classList.add(containterClass)
  }

  function updateTextarea() {
    textarea.value = editor.view.state.doc.toString()
  }

  /**
   * Support legacy method of passing textarea instead of div container
   * @see https://codemirror.net/docs/migration/#codemirror.fromtextarea
   */
  textarea.parentNode?.insertBefore(editor.view.dom, textarea)

  if (textarea.form) {
    textarea.form.addEventListener('submit', () => updateTextarea())
  }

  return api
}
