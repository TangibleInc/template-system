;(function ($) {
  if (!window.tangibleTemplateEditorPreviewer) {
    // Common previewer for multiple instances

    var shouldRefreshPreview = false

    setInterval(function () {
      if (!shouldRefreshPreview) return
      shouldRefreshPreview = false
      if (window.FLBuilder.preview && window.FLBuilder.preview.preview) {
        window.FLBuilder.preview.preview()
      }
    }, 5000)

    window.tangibleTemplateEditorPreviewer = function () {
      shouldRefreshPreview = true
    }

    // Dynamic module loader - See /assets/src/module-loader

    if (window.Tangible.moduleLoader) {
      // @see https://docs.wpbeaverbuilder.com/beaver-builder/developer/custom-modules/cmdg-16-live-preview-reference/#javascript-events

      $('.fl-builder-content').on('fl-builder.preview-rendered', function (e) {
        $(e.target)
          .find('.fl-module[data-type="tangible-template"]')
          .each(function () {
            window.Tangible.moduleLoader(this)
          })
      })
    }
  }

  window.FLBuilder.registerModuleHelper('tangible-template', {
    init: function () {
      if (!window.FLBuilder) {
        console.warn('window.FLBuilder not found')
        return
      }

      if (!window.Tangible || !window.Tangible.createCodeEditor) {
        console.warn('window.Tangible.createCodeEditor not found')
        return
      }

      var Tangible = window.Tangible
      var createCodeEditor = Tangible.createCodeEditor
      var preview = window.tangibleTemplateEditorPreviewer
      var FLBuilder = window.FLBuilder

      $('.tangible-template-editor').each(function () {
        var textarea = this
        var $textarea = $(this)
        var $form = $textarea.closest('form')
        var formNodeId = $form.attr('data-node')
        var editor

        /**
         * Save
         *
         * Based on fl-builder.js, _saveSettingsComplete, except it
         * doesn't close the lightbox.
         */
        function triggerSave() {
          var settings = FLBuilder._getSettings($form)

          // console.log('save', formNodeId, settings)

          FLBuilder.ajax(
            {
              action: 'save_settings',
              node_id: formNodeId,
              settings,
            },
            function (response) {
              var data = FLBuilder._jsonParse(response)
              FLBuilder._renderLayout(data.layout)
            }
          )
        }

        ;(async () => {
          editor = await createCodeEditor(textarea, {
            language: 'html',
            onSave: triggerSave,

            // Legacy options

            viewportMargin: Infinity, // With .CodeMirror height: auto or 100%
            resizable: false,
            lineWrapping: true,

            extraKeys: {
              'Alt-F': 'findPersistent',
              'Ctrl-S': function (cm) {
                triggerSave()
              },
              'Cmd-S': function (cm) {
                triggerSave()
              },
              Enter: 'emmetInsertLineBreak',
              'Ctrl-Space': 'autocomplete',
            },
          })

          editor.setSize(null, '100%') // Prevent width resize, scroll instead

          editor.on('change', function () {
            $textarea.val(editor.getValue())

            preview && preview()
            $form.trigger('change')
          })

          function refresh() {
            editor.refresh()
            editor.focus()
          }

          // Workaround to solve styling conflict with Beaver
          setTimeout(refresh, 300)
        })().catch(console.error)
      })
    },
  })
})(jQuery)
