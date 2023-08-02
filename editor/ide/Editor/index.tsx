import * as React from 'react'
import { memo, useEffect, useRef } from 'react'

export const typeToLang = {
  template: 'html',
  style: 'sass',
  script: 'javascript',
  control: 'html',
}

export const editorByType = {}

export const Editor = memo(({ type, node, content, focusOnMount = false }) => {

  const ref = useRef()

  useEffect(() => {

    ;(async () => {

      const { CodeEditor } = window?.Tangible?.TemplateSystem

      // console.log('Mount editor', type, ref)
      const el = ref.current
      // Set container to flex so the editor can fill height 100%
      el.style = 'display: flex; flex-direction: column; height: 100%;'
  
      const editor = await CodeEditor.create({
        el,
        lang: typeToLang[ type ] || 'html',
        content
      })
  
      editorByType[type] = editor
  
      // Used to focus editor on tab select
      editor.node = node
  
      if (focusOnMount) editor.view.focus()
        
    })().catch(console.error)

  }, [ref])

  return <div ref={ref}></div>
})

