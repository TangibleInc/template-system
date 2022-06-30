/**
 * Template editor widget for Elementor
 * Similar to Gutenberg block in ../gutenberg/blocks/template.js
 * Widget is rendered in /integrations/elementor/template-editor-control.php
 *
 * https://developers.elementor.com/creating-a-new-control#Control_JS_file
 */

const { jQuery, wp, Tangible } = window

jQuery(document).ready(function ($) {
  const { Tangible, elementor } = window

  const { CodeMirror, createCodeEditor, moduleLoader } = Tangible

  /**
   * Keep track of preview element that corresponds to this widget panel's template editor.
   *
   * There's no action for "close editor", so the elements must be checked if they actually exist.
   *
   * https://code.elementor.com/js-hooks/#panelopen_editorelementType
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

      // Create code editor instance

      const textarea = this.$el.find(
        '.tangible-elementor-template-editor-textarea'
      )[0]
      if (!textarea) return

      const editor = createCodeEditor(textarea, {
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

      /**
       * Refresh interval should be small, since the field value needs to be updated before
       * user can click "Update" for the widget.
       *
       * Ideally, if Elementor has a *synchronous* hook for "before save" actions, it would be
       * possible to always update the field value before save.
       */
      const refreshInterval = 1000
      const refreshTimer = setInterval(() => {
        if (!shouldRefresh) return
        shouldRefresh = false

        // Update field value
        const value = editor.getValue()
        this.setValue(value)

        // Load dynamic modules for preview
        if (
          moduleLoader &&
          currentlyOpenWidget &&
          currentlyOpenWidget.view &&
          currentlyOpenWidget.view.$el
        ) {
          const previewElement = currentlyOpenWidget.view.$el.find(
            '.elementor-widget-container'
          )[0]
          if (!previewElement) return

          moduleLoader(previewElement)
        }
      }, refreshInterval)

      // Clean up
      this.unsubscribers.push(function () {
        clearInterval(refreshTimer)
      })
    },

    onBeforeDestroy: function () {
      this.unsubscribers.forEach((unsubscribe) => unsubscribe())
    },
  })

  elementor.addControlView('tangible-template-editor', templateEditorControl)
})
