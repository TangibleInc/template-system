import * as React from 'react'
import { createRoot, memo, useRef, useEffect } from 'react'
import * as Layout from './Layout'
import layoutModelData from './Layout/model'

import { Editor, editorByType, typeToLang } from './Editor'
import { Preview } from './Preview'

import { Assets } from './Assets'
import { Location } from './Location'

import { Library } from './Library'
import { Support } from './Support'

import { Header } from './Header'


const { jQuery } = window

jQuery(document).ready(function ($) {

  const { CodeEditor } = window?.Tangible?.TemplateSystem

  let ideElement = document.getElementById('tangible-template-system-ide')

  if (!ideElement) {
    ideElement = document.createElement('div')
    ideElement.id = 'tangible-template-system-ide'
    document.body.prepend(ideElement) // Prepend for absolute screen position
  }


  const root = createRoot(ideElement)

  const templatePost = {
    // content, style, script, controls, ..
  }

  const layoutModel = Layout.Model.fromJson(layoutModelData)

  let selectedTabNodeId = ''

  const layoutComponents = {
    Library,
    Support,

    Editor,
    Preview,
    Assets,
    Location,
  }


  const componentByNodeId = {
    // [nodeId]: { name, node }
  }


  const getNodeId = node => node._getAttr('id') // TODO: Make this public

  const componentFactory = (node: Layout.TabNode) => {

    const component = node.getComponent()
    // const config = node.getConfig()

    const nodeId = getNodeId(node)
    const title = node.getName()
    const slug = title.toLowerCase()

    componentByNodeId[ nodeId ] = {
      name: component,
      node
    }

    // console.log('component', name, node)

    if (component === 'editor') {
      return <Editor
        type={slug}
        node={node}
        content={
          templatePost[ slug ] || ''
        }
        focusOnMount={ nodeId === selectedTabNodeId }
      />
    }

    if (layoutComponents[title]) {
      const LayoutComponent = layoutComponents[title]
      return <LayoutComponent node={node} />
    }
  }

  const onAction = (action: Layout.Action) => {

    // console.log('onAction', action)

    const { type, data } = action

    if (type === 'FlexLayout_SelectTab' && data.tabNode) {

      const nodeId = data.tabNode

      selectedTabNodeId = nodeId

      // Find component by node ID
      // const component = componentByNodeId[ nodeId ]

      // Find editor by node ID

      for (const [type, editor] of Object.entries(editorByType)) {

        if (getNodeId(editor.node) === nodeId) {

          // Focus editor on next render, after tab is selected and focused

          setTimeout(() => {
            editor.view.focus()
          })
          break
        }
      }
    }

    return action
  }

  const onModelChange = (model: Layout.Model) => {
    // console.log('onModelChange', model)
  }

  const tabsWithFormat = ['Template', 'Style', 'Script']

  const tabsetMap = {

  }
  const tabMap = {
    // name: { id }
  }

  const onRenderTabSet = (node, renderState) => {

    const tabset = node._attributes || {}
    // console.log('onRenderTabSet', tabset, node.getConfig())

    // Show actions for current visible tab

    for (const childNode of node.getChildren()) {

      // On initial render of tabset, editors are not ready yet

      const { id, name } = childNode._attributes || {}
      const type = name.toLowerCase()
      const lang = typeToLang[ type ]

      tabMap[type] = { id, lang }

      return

      if (lang && childNode._visible) {

        const { buttons } = renderState

        buttons.push(<button
          className='tab-action'
          onClick={() => {
            const editor = editorByType[ type ]
            if (!editor) return
            formatCode({
              lang,
              editor
            })
          }}
        >Format</button>)
      }

      break
    }
  }

  async function formatCode({
    lang,
    editor
  }) {

    // Note: Use editor.view.state, since editor.state.doc is empty or stale
    const content = editor.view.state.doc.toString()

    try {

      const formattedCode = await CodeEditor.format({
        lang,
        content
      })

      const cursorPosition = !formattedCode
        ? 0
        : Math.min(
          editor.view.state.selection.ranges[0].from,
          formattedCode.length - 1
        )

      /**
       * Replace content
       */
      editor.view.dispatch({
        changes: {
          from: 0,
          to: content.length,
          insert: formattedCode
        },
      })

      editor.view.focus()

      // Restore cursor
      editor.view.dispatch({
        selection: {
          anchor: cursorPosition,
          head: cursorPosition
        },
      })

    } catch (error) {
      // TODO: Map error to lint gutter
      console.error(error)
    }
  }

  root.render(<>
    <Header layoutModel={layoutModel} ideElement={ideElement} />
    <div className='ide-main'>
      <Layout.Layout
        model={layoutModel}
        factory={componentFactory}
        onAction={onAction}
        onModelChange={onModelChange}
        onRenderTabSet={onRenderTabSet}
        // https://github.com/caplin/FlexLayout#optional-props
        realtimeResize={true}
        supportsPopout={false}
      />
    </div>
  </>)

})
