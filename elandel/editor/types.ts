import type { Extension, Text } from '@codemirror/state'
import type { Language } from '../html'

export type TagDefinition = {
  callback: string | {} | Function
  closed?: boolean
  raw?: boolean
  localTags?: TagDefinitionMap
}

export type TagDefinitionMap = {
  [name: string]: TagDefinition
}

export type LanguageDefinition = {
  tags: TagDefinitionMap
}

export type CodeEditorOptions = {
  el: HTMLElement
  lang: string
  content: string
  onUpdate?: (updateCallbackProps: { doc: Text }) => void
  onSave?: () => void
  extensions?: Extension[]
  theme?: Extension
  themes?: {
    [name: string]: Extension
  }
  fonts?: any[]
  loadFont?: Function
  format?: Function
  editorActionsPanel?: Function

  editorUrl?: string
  // TODO: Merge into one or clarify difference
  languageDefinition?: Language & LanguageDefinition
}

export type { Language }
export type * from './format'