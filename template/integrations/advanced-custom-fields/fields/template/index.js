jQuery(function ($) {
  const { Tangible, wp, acf } = window

  const $publish = $('#publish')

  function initAcfTemplateField() {
    const textarea = this

    function save() {
      if ($publish.length) {
        // Classic editor

        $publish.trigger('click')
        return
      }

      // Gutenberg

      wp.data.dispatch('core/editor').savePost()
    }

    const editor = Tangible.createCodeEditor(textarea, {
      language: 'html',
      onSave: save,

      // Legacy editor options

      viewportMargin: Infinity, // With .CodeMirror height: auto or 100%
      resizable: false,
      lineWrapping: true,

      extraKeys: {
        'Alt-F': 'findPersistent',
        'Ctrl-S': save,
        'Cmd-S': save,
        Tab: 'emmetExpandAbbreviation',
        Esc: 'emmetResetAbbreviation',
        Enter: 'emmetInsertLineBreak',
        'Ctrl-Space': 'autocomplete',
      },
    })

    editor.on('change', function () {
      textarea.value = editor.getValue()
    })

    editor.setSize(null, '100%')

    // Workaround to solve styling conflict with Gutenberg
    setTimeout(() => {
      editor.refresh()
    }, 100)
  }

  const selector = '.tangible-template-acf-field-input-container textarea'

  $(`${selector}[name]:not([name*='[acfcloneindex]'])`).each(
    initAcfTemplateField
  )

  acf.addAction('append', function ($el) {
    $el.find(selector).each(initAcfTemplateField)
  })
})
