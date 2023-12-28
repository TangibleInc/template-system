// import type { EditorView, Panel, ViewUpdate } from '@codemirror/view'
import { memory, setMemory } from './memory'

export async function createEditors({
  $,
  save,
  $editors,
  editorInstances,
  createCodeEditor,
  templateMeta,
  Tangible,
}) {
  const sharedEditorOptions = {
    // New editor
    onSave: save,

    // Legacy editor

    viewportMargin: Infinity, // With .CodeMirror height: auto or 100%
    resizable: false,
    lineWrapping: true,

    extraKeys: {
      'Alt-F': 'findPersistent',
      'Ctrl-S': save,
      'Cmd-S': save,
      Tab: 'emmetExpandAbbreviation',
      Esc: 'emmetResetAbbreviation',
      Enter: 'emmetInsertLineBreak',
      'Ctrl-Space': 'autocomplete',
    },
  }

  /**
   * Create editors
   */

  async function create(el) {

    const $editor = $(el)
    const fieldName = $editor.attr('name')
    const type = $editor.data('tangibleTemplateEditorType') // html, sass, javascript, json

    const editorOptions: {
      [key: string]: any
    } = {
      ...sharedEditorOptions,
      language: type,
    }

    if (type === 'html') {
      editorOptions.emmet = {
        preview: false,
      }
    }

    const editor = (editorInstances[fieldName] = await createCodeEditor(
      el,
      editorOptions
    ))

    editor.setSize(null, '100%')

    // Focus on content if editing existing post
    if (fieldName === 'post_content' && !templateMeta.isNewPost) editor.focus()

    // Provide public method to save
    el.editor = editor
    editor.save = save

    if (!editor.codeMirror6) return

    // New editor

    // console.log('Editor', editor)

    // Tangible.codeEditors.push({
    //   editor,
    //   $editor,
    //   fieldName,
    //   type,
    // })
  }

  const promises: Promise<void>[] = []

  $editors.each(function() {
    promises.push(create(this))
  })

  await Promise.all(promises)

  // await loadFonts()
}
