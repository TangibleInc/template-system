/**
 * Template editor widget for Elementor
 * Similar to Gutenberg block in ../gutenberg/blocks/template.js
 * Widget is rendered in /integrations/elementor/template-editor-control.php
 *
 * https://developers.elementor.com/creating-a-new-control#Control_JS_file
 */

const { jQuery } = window

jQuery(document).ready(function ($) {

  const { Tangible, elementor } = window
  const { createCodeEditor, moduleLoader } = Tangible

  const previewLoaded = function (document) {

    const { elementorFrontend = {}, elementorCommon } = window
    const { $body } = elementorFrontend.elements || {}
    if (!moduleLoader || !$body) return

console.log('Preview loaded',
elementor.previewView.$childViewContainer 
// document.$element, document.$element.hasClass('elementor-edit-area-active')
)

const $editArea = $body.find('.elementor-edit-area')
console.log('$editArea', $editArea[0])

const $widgets = document.$element.find('.elementor-widget-container')
    console.log('$widgets', $widgets)

    $widgets.each(function () {
      console.log('preview widget', this)
      moduleLoader(this)
    })

  }

  // elementor.on('elementor:loaded', previewLoaded)
  // elementor.on('preview:loaded', previewLoaded)
  // elementor.on('document:loaded', previewLoaded)

function initPreview() {

  const { elementorFrontend = {} } = window
  
  const previewWindow = elementor?.$preview[ 0 ]?.contentWindow
  const previewModuleLoader = previewWindow?.Tangible?.moduleLoader
  const $previewBody = elementorFrontend?.elements?.$body

  if (!previewModuleLoader || !$previewBody || !$previewBody.length) return

  const $modules = $previewBody.find('.tangible-dynamic-module')    
  const key = '_tangibleDynamicModuleActivated'

  $modules.each(function() {
    if (this[key]) return
    this[key] = true
    previewModuleLoader(this)
  })

// console.log('elementorFrontend', elementorFrontend)

  // const { $body } = elementorFrontend.elements || {}
  //   if (!moduleLoader || !$body) return
  
  //   const $widgets = $body.find('.tangible-dynamic-module') // elementor-widget-container
  
  //   $widgets.each(function () {

  //     if (this._modulesLoaded) return

  //     console.log('Preview widget', this.innerHTML)
  //     moduleLoader(this)
  
  //     this._modulesLoaded = true
  //   })
}

setInterval(initPreview, 1000)


  /**
   * Keep track of preview element that corresponds to this widget panel's template editor.
   *
   * There's no action for "close editor", so the elements must be checked if they actually exist.
   *
   * https://developers.elementor.com/docs/hooks/js/#panel-open-editor-elementtype-elementname
   */
  let currentlyOpenWidget = null

  elementor.hooks.addAction(
    'panel/open_editor/widget/tangible-template-editor',
    function (panel, model, view) {
      currentlyOpenWidget = { panel, model, view }
    }
  )

  // Controls
  const templateEditorControl = elementor.modules.controls.BaseData.extend({
    onReady: function () {
      // this = { el, $el, model, ui, .. }
      // console.log('Template editor control: Ready', this)

      this.unsubscribers = []
      this.codeEditor = null
      this.textarea = null

      // Create code editor instance

      const textarea = this.textarea = this.$el.find(
        '.tangible-elementor-template-editor-textarea'
      )[0]
      if (!textarea) return

      const editor = this.codeEditor = createCodeEditor(textarea, {
        language: 'html',
        viewportMargin: Infinity, // With .CodeMirror height: auto or 100%
        resizable: false,
        lineWrapping: true,

        extraKeys: {
          'Alt-F': 'findPersistent',
          Enter: 'emmetInsertLineBreak',
          'Ctrl-Space': 'autocomplete',
        },
      })

      editor.setSize(null, '100%') // Prevent width resize, scroll instead

      // Trick to fix initial CodeMirror styling
      setTimeout(function () {
        editor.refresh()
        editor.focus()
      }, 0)

      // Preview refresh logic

      let shouldRefresh = false // Was false but now refresh on widget load

      editor.on('change', () => {

        shouldRefresh = true

        /**
         * Saving field value on every key press is too heavy, because the preview
         * is rendered server-side.
         */
        // this.setValue( editor.getValue() )
      })

      /**
       * Refresh interval should be small, since the field value needs to be updated before
       * user can click "Update" for the widget.
       *
       * Ideally, if Elementor has a *synchronous* hook for "before save" actions, it would be
       * possible to always update the field value before save.
       */
      const refreshInterval = 1000

      const previewElement = false
      const previousPreviewElement = false

      const refreshTimer = setInterval(() => {

        // console.log('Should refresh?', previewElement!==previousPreviewElement,
        // previewElement,
        // previousPreviewElement)
        if (!shouldRefresh) return

        // Update field value
        this.setValue( editor.getValue() )

        // previewLoaded()

        //         // Load dynamic modules for preview
        //         if (
        //           moduleLoader &&
        //           currentlyOpenWidget &&
        //           currentlyOpenWidget.view &&
        //           currentlyOpenWidget.view.$el
        //         ) {


        shouldRefresh = false


        //           previousPreviewElement = previewElement
        //           previewElement = currentlyOpenWidget.view.$el.find(
        //             '.elementor-widget-container'
        //           )[0]
        // console.log('previewElement', previewElement)
        //           if (!previewElement) return

        //           moduleLoader(previewElement)
        //         }
      }, refreshInterval)

      console.log('ready')

      // Clean up
      this.unsubscribers.push(function () {
        clearInterval(refreshTimer)
      })
    },

    saveValue() {
      console.log('saveValue')
      this.setValue(
        this.codeEditor ? this.codeEditor.getValue() : this.textarea.value
      )
    },

    onBeforeDestroy: function () {
      this.unsubscribers.forEach((unsubscribe) => unsubscribe())
    },
  })

  elementor.addControlView('tangible-template-editor', templateEditorControl)
})
