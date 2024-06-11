import { CodeEditor } from '../elandel/editor/index.ts'
import { editorActionsPanel } from './action-panel'
import type { CodeEditorOptions, LanguageDefinition } from '../elandel/editor'

declare global {
  interface Window {
    Tangible: {
      TemplateSystem: {
        CodeEditor: CodeEditorType
      }
    }
    TangibleTemplateSystemEditor: {
      editorUrl: string
      languageDefinition: LanguageDefinition
      // TODO: Translate local_tags to localTags
    }
  }
}

type CodeEditorType = typeof CodeEditor

const TemplateEditor: CodeEditorType = {
  ...CodeEditor,
  /**
   * Create editor and pass settings from server-side
   * @see ./enqueue.php
   */
  create(props: CodeEditorOptions) {
    const { editorUrl, languageDefinition = {} } =
      window.TangibleTemplateSystemEditor

    const editorConfig = {
      editorUrl,
      editorActionsPanel,
      languageDefinition,
      ...props,
    }

    if (props.lang === 'html') {

      /**
       * Support template types like Control or Content without default HTML tags
       * @see /admin/editor/template-editor/editors.ts
       * @see /admin/editor/template-editor-bridge/index.ts
       */
      if (props.htmlTags === false) {
        languageDefinition.htmlTags = false
      }

      if (props.controlTags === true && languageDefinition.controlTags) {
        languageDefinition.tags = Object.assign(
          /**
           * Keep these regular tags
           * @see ./enqueue.php
           */
          ['If', 'Logic', 'Loop'].reduce((obj, key) => {
            if (languageDefinition.tags[key]) {
              obj[key] = languageDefinition.tags[key]
            }
            return obj
          }, {}),
          languageDefinition.controlTags,
        )
      }
    }

    return CodeEditor.create(editorConfig)
  },
}

window.Tangible = window.Tangible || {}
window.Tangible.TemplateSystem = window.Tangible.TemplateSystem || {}
window.Tangible.TemplateSystem.CodeEditor = TemplateEditor
