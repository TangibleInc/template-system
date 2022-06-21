/**
 * CodeMirror was forked to support a unique namespace.
 *
 * It's a small change in display/Display.js to add a class
 * .tangible-codemirror to the wrapper element (d.wrapper).
 *
 * This allows for scoping the CSS, so our editor can co-exist with
 * other instances of CodeMirror.
 *
 * If you run NPM script "copy", which copies the newest CodeMirror to
 * /lib/codemirror-src for recompilation, make sure to re-apply the change.
 *
 * @see ./lib/codemirror/display/Display.js
 * @see ./styles
 *
 * Files in /addon, /lib/codemirror, and /mode are based on version 5.63.1.
 *
 * Run the following command (including the period) in a folder to see where
 * changes were made:
 *
 * grep -rHIn TANGIBLE .
 */

const CodeMirror = require('./lib/all')

const {
  commonOptions,
  languageOptions
} = require('./options')

function createCodeMirror(el, options = {}) {

  const fn = el.tagName==='TEXTAREA' ? CodeMirror.fromTextArea : CodeMirror

  const {
    language = 'html',
    resizable = false,
    ...passOptions
  } = options

  const codeMirrorOptions = {
    ...commonOptions,
    ...languageOptions[language],
    ...passOptions,
    ...(
      // If no vertical resize - .CodeMirror height: auto or 100%
      !resizable || resizable==='horizontal' ?  { viewportMargin: Infinity }
        : {}
    )
  }

  let editor

  codeMirrorOptions.extraKeys = {
    ...codeMirrorOptions.extraKeys,
    Tab: function(cm, ctx) {

      if (CodeMirror.commands.emmetExpandAbbreviation) {
        const result = CodeMirror.commands.emmetExpandAbbreviation(cm, ctx)
        if (!result) return // Returns an object if *not* expanded
      }

      const spaces = Array(editor.getOption("indentUnit") + 1).join(" ")
      editor.replaceSelection(spaces)
    }
  }

  codeMirrorOptions.emmet = passOptions.emmet===false
    ? false
    : {
      ...codeMirrorOptions.emmet,
      ...(passOptions.emmet || {})
    }


  editor = fn(el, codeMirrorOptions)

  const $editor = editor.getWrapperElement()

  if (resizable) {
    $editor.style.resize = resizable===true ? 'vertical' : resizable // horizontal, both, none
  }

  editor.element = $editor

  /**
   * Make wrapped text line up with the base indentation of the line
   * https://codemirror.net/demo/indentwrap.html
   */

  const charWidth = editor.defaultCharWidth()
  const basePadding = 4

  editor.on("renderLine", function(cm, line, elt) {
    var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth
    elt.style.textIndent = "-" + off + "px"
    elt.style.paddingLeft = (basePadding + off) + "px"
  })
  editor.refresh()

  return editor
}

Object.assign(createCodeMirror, {
  CodeMirror, // For convenient access without calling create
  commonOptions,
  languageOptions
})

module.exports = createCodeMirror