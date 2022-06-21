/**
 * Remove sourcemap comment from vendor libraries used for CodeMirror editor
 *
 * Sourcemaps for them are not copied into assets/vendor, because they're
 * too big (several megabytes total), and unnecessary for our purposes.
 */

const fs = require('fs')

;[
  'csslint',
  'jshint',
  'scsslint',
  'jsonlint'
]
  .forEach(function removeSourcemapComment(base) {

    const filePath = `./vendor/${base}.min.js`

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return

      const lines = data.split('\n')

      if (lines.length <= 1) return
      if (!lines[lines.length-1]) lines.pop() // Skip last empty line, if any

      const prefix = '//# sourceMappingURL='

      if (lines[lines.length-1].slice(0, prefix.length)===prefix) {
        lines.pop() // Remove the comment
        fs.writeFileSync(filePath, lines.join('\n'))
      }
    })
  })
