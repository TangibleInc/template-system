
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
  themes?: {
    [name: string]: Function
  }
  fonts?: any[]
  loadFont?: Function
  format?: Function
  editorActionsPanel?: Function

  editorUrl?: string
  languageDefinition?: LanguageDefinition
}
