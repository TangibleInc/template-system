jQuery(function ($) {

  $(".tangible-template-acf-field-input-container textarea[name]:not([name*='[acfcloneindex]'])").tgbl_init_acf_codemirror();

  acf.addAction('append', function($el) {

    $el.find('.tangible-template-acf-field-input-container textarea').tgbl_init_acf_codemirror();
  });

})

// Extending jQuery
jQuery.fn.tgbl_init_acf_codemirror = function() {

  let Tangible = window.Tangible, wp = window.wp, $publish = jQuery('#publish')

  return this.each(function() {
    function save() {
      if ($publish.length) {
        // Classic editor

        $publish.trigger('click')
        return
      }

      // Gutenberg

      wp.data.dispatch('core/editor').savePost()
    }

    var textarea = this
    var editor = Tangible.createCodeEditor(this, {
      language: 'html',
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
  });
};

// Use the custom function
/*
$('.tangible-template-acf-field-input-container textarea').tgbl_init_acf_codemirror();
*/
