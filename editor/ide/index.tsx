import * as FlexLayout from 'flexlayout-react'

const demoContent = {
  html: `<Loop type=post>
  <Field title />
</Loop>`,
  sass: `$bg-color: #abc;
.example {
  background-color: $bg-color;
}
`,
  javascript: `console.log('hi from block')`
}

const { jQuery } = window

jQuery(document).ready(function ($) {

  const { Tangible, wp } = window
  const React = wp.element
  const { createRoot } = React
  const { CodeEditor } = Tangible.TemplateSystem

  const ideElement = document.createElement('div')

  ideElement.id = 'tangible-template-system-ide'

  document.body.prepend(ideElement)

  const root = createRoot(ideElement)


  const layoutModel = FlexLayout.Model.fromJson({
    global: {},
    borders: [
    ],
    layout: {
      type: 'row',
      weight: 100,
      children: [
        {
          type: 'row',
          weight: 70,
          children: [

            {
              type: 'tabset',
              weight: 80,
              children: [
                {
                  type: 'tab',
                  name: 'Template',
                  component: 'button',
                  enableClose: false,
                  enableRename: false,
                  enableFloat: false
                },
                {
                  type: 'tab',
                  name: 'Style',
                  component: 'button',
                  enableClose: false,
                  enableRename: false,
                  enableFloat: false
                },
                {
                  type: 'tab',
                  name: 'Script',
                  component: 'button',
                  enableClose: false,
                  enableRename: false,
                  enableFloat: false
                },
              ]
            },
          ]
        },

        {
          type: 'row',
          weight: 30,
          children: [
            {
              type: 'tabset',
              weight: 100,
              children: [
                {
                  type: 'tab',
                  name: 'Preview',
                  component: 'button',
                  enableClose: false,
                  enableRename: false,
                  enableFloat: false
                },
                {
                  type: 'tab',
                  enableClose: false,
                  name: 'Assets',
                  component: 'grid',
                },
                {
                  type: 'tab',
                  enableClose: false,
                  name: 'Location',
                  component: 'grid',
                },
                {
                  type: 'tab',
                  enableClose: false,
                  name: 'Controls',
                  component: 'grid',
                }
              ]
            },
          ]
        }
      ]
    }
  })

  const layoutFactory = (node) => {
    const component = node.getComponent()
    if (component === 'button') {
      return <button>{node.getName()}</button>
    }
  }

  const onAction = (action: FlexLayout.Action) => {
    // console.log('onAction', action)
    return action
  }

  const onModelChange = (model: FlexLayout.Model) => {
    // console.log('onModelChange', model)
  }

  root.render(<>
    <FlexLayout.Layout model={layoutModel} factory={layoutFactory}
                onAction={onAction}
                onModelChange={onModelChange}
    />
  </>)



  return

  ;(async () => {


    // Create tabs

    const $editorTabs = [...document.getElementsByClassName('editor-tab')]
    const $editorTabTargets = [...document.getElementsByClassName('editor-tab-target')]

    let $lastActiveTab = $editorTabs[0]

    function handleTab(e) {

      const $el = this // e.target
      const { targetLang, targetArea } = $el.dataset

      if ($el.classList.contains('visible')) {
        // Clicking active tab icon will close it and go to last tab
        if (targetArea) {
          $lastActiveTab.click()
        }
        return
      }

      for (const $tab of $editorTabs) {
        if ($tab.classList.contains('visible')) {
          $lastActiveTab = $tab
        }
        if ($tab === $el) {
          $tab.classList.add('visible')
        } else {
          $tab.classList.remove('visible')
        }
      }

      for (const $target of $editorTabTargets) {

        const isTarget = targetLang
          ? $target.dataset.lang === targetLang
          : $target.dataset.area === targetArea

        if (isTarget) {
          $target.classList.add('visible')

          if ($target.editor) {
            $target.editor.view.focus()
          }
        } else {
          $target.classList.remove('visible')
        }
      }
    }

    for (const $tab of $editorTabs) {
      $tab.addEventListener('click', handleTab.bind($tab))
    }


    // Editor tabs

    for (const $target of $editorTabTargets) {

      const { lang } = $target.dataset
      const $editor = $target.getElementsByClassName('editor')[0]

      if (!lang || !$editor) continue

      // Editor

      const editor = await CodeEditor.create({
        el: $editor,
        lang,
        content: demoContent[lang]
      })

      $target.editor = editor // Hang it on DOM for access by tab event handler

      // Editor action

      const $actions = [...$target.getElementsByClassName('editor-action')]

      async function doAction(e) {

        const { action } = e.target.dataset
        const content = editor.view.state.doc.toString()

        try {

          const formattedCode = await CodeEditor.format({
            lang,
            content
          })

          /**
           * Replace content
           */
          editor.view.dispatch({
            changes: {
              from: 0,
              to: content.length,
              insert: formattedCode
            }
          })

          editor.view.focus()

        } catch (error) {
          // TODO: Map error to lint gutter
          console.error(error)
        }

      }

      for (const $action of $actions) {
        $action.addEventListener('click', doAction)
      }
    }



  })().catch(console.error)


})
