/**
 * Compatibility layer to help with transition of CodeMirror 5 to 6
 */

declare global {
  interface Window {
    wp: any,
    Tangible: {
      ajax: any,
      TemplateSystem: any,
      // Legacy
      createCodeEditor: (el: HTMLElement, options?: {}) =>
        CodeEditorLegacyInterface,
    }
  }
}

export type CodeEditorLegacyInterface = {
  getValue: () => string,
  focus: () => void,
  refresh: () => void,
  setSize: (width: string | null, height: string | null) => void
}

export type CodeEditorLegacyOptions = {
  language?: string,
  onSave?: () => void
}

export async function createTemplateEditor(
  textarea: HTMLTextAreaElement,
  options: CodeEditorLegacyOptions = {}
): Promise<CodeEditorLegacyInterface & {
  updateTextarea: () => void
}> {

  const { CodeEditor } = window.Tangible.TemplateSystem || {}

  if (!CodeEditor) {
    throw new Error('CodeEditor not found')
  }

  // console.log('createTemplateEditor', textarea, CodeEditor, options)

  const {
    language = 'html',
    onSave
  } = options

  const editor = await CodeEditor.create({
    lang: language,
    content: textarea.value,
    // onUpdate(doc) {}
    onSave() {
      if (!onSave) return
      updateTextarea()
      onSave()
    }
  })

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

  return {
    getValue() {
      return editor.view.state.doc.toString()
    },
    focus() {
      editor.view.focus()
    },
    refresh() {},
    setSize(width: string | null, height: string | null) {},

    // New editor
    updateTextarea
  }
}
