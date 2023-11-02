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
  const { createCodeEditor } = Tangible

  const refreshInterval = 1000

  elementor.once('preview:loaded', function () {
    const { elementorFrontend = {} } = window

    const previewWindow = elementor?.$preview[0]?.contentWindow
    const $previewBody = elementorFrontend?.elements?.$body

    function refreshPreview() {
      const previewModuleLoader = previewWindow?.Tangible?.moduleLoader
      if (!previewModuleLoader || !$previewBody || !$previewBody.length) return

      const $modules = $previewBody.find('.tangible-dynamic-module')
      const key = '_tangibleDynamicModuleActivated'

      $modules.each(function () {
        if (this[key]) return
        this[key] = true
        previewModuleLoader(this)
      })
    }

    setInterval(refreshPreview, refreshInterval)
  })

  // Controls
  const templateEditorControl = elementor.modules.controls.BaseData.extend({
    onReady: function () {
      // this = { el, $el, model, ui, .. }

      this.unsubscribers = []

      // Create code editor instance

      const textarea = this.$el.find(
        '.tangible-elementor-template-editor-textarea'
      )[0]
      if (!textarea) return

      ;(async () => {

        const editor = await createCodeEditor(textarea, {
          language: 'html',

          // Legacy options

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

        let shouldRefresh = false

        editor.on('change', () => {
          shouldRefresh = true
          /**
           * Saving field value on every key press is too heavy, because the preview
           * is rendered server-side.
           */
          // const value = editor.getValue()
          // this.setValue( value )
        })

        const refreshTimer = setInterval(() => {
          if (!shouldRefresh) return
          shouldRefresh = false

          const value = editor.getValue()

          // Update field value
          this.setValue(value)

          shouldRefresh = false
        }, refreshInterval)

        // Clean up
        this.unsubscribers.push(function () {
          clearInterval(refreshTimer)
        })
      })().catch(console.error)
    },

    // saveValue() {
    //   this.setValue(
    //     this.codeEditor ? this.codeEditor.getValue() : this.textarea.value
    //   )
    // },

    onBeforeDestroy: function () {
      this.unsubscribers.forEach((unsubscribe) => unsubscribe())
    },
  })

  elementor.addControlView('tangible-template-editor', templateEditorControl)
})
