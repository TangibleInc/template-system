import { linter, type Diagnostic } from '@codemirror/lint'
import { syntaxTree } from '@codemirror/language'

// https://jshint.com/docs/options/
const defaultJSHintOptions = {
  asi: true
}

declare global {
  interface Window {
    JSHINT: any
  }
}

export function createJavaScriptLinter() {
  return linter(view => {

    const diagnostics: Diagnostic[] = []

    const { JSHINT } = window as unknown as {
      JSHINT: any
    }
    // TODO: Rename to Tangible.JSHINT
    if (!JSHINT) return diagnostics

    const doc = view.state.doc
    const content = doc.toString()

    JSHINT(content, defaultJSHintOptions)
    const errors = JSHINT.data().errors || []

    for (const error of errors) {

      // "Missing semicolon."
      if (error.code === 'E058') continue

      const start = error.character - 1
      let end = start + 1

      if (error.evidence) {
        const index = error.evidence.substring(start).search(/.\b/)
        if (index > -1) {
          end += index
        }
      }

      // Convert to diagnostics format

      const from = Math.min(
        doc.line(error.line).from + start - 1,
        doc.length
      )
      const to = Math.min(
        doc.line(error.line).from + end - 1,
        doc.length
      )

      const diagnostic: Diagnostic = {
        from,
        to,
        message: error.reason,
        severity: error.code ? (error.code.startsWith('W') ? 'warning' : 'error') : 'error',
      }

      diagnostics.push(diagnostic)
    }

    return diagnostics
  })
}


