jQuery(function($){

  var Tangible = window.Tangible
  var wp = window.wp

  var $publish = $('#publish')

  $('.tangible-template-acf-field-input-container textarea').each(function() {

    function save() {

      if ($publish.length) {

        // Classic editor

        $publish.trigger('click')
        return
      }

      // Gutenberg

      wp.data.dispatch("core/editor").savePost()
    }

    var textarea = this
    var editor = Tangible.createCodeEditor(this, {
      language: 'html',
      viewportMargin: Infinity, // With .CodeMirror height: auto or 100%
      resizable: false,
      lineWrapping: true,

      extraKeys: {
        "Alt-F": 'findPersistent',
        'Ctrl-S': save,
        'Cmd-S': save,
        'Tab': 'emmetExpandAbbreviation',
        'Esc': 'emmetResetAbbreviation',
        'Enter': 'emmetInsertLineBreak',
        'Ctrl-Space': 'autocomplete'
      },
    })

    editor.on('change', function() {
      textarea.value = editor.getValue()
    })

    editor.setSize(null, '100%')

    // Workaround to solve styling conflict with Gutenberg
    setTimeout(() => {
      editor.refresh()
    }, 100)

  })
})
