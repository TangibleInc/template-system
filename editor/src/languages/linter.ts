import { Diagnostic } from '@codemirror/lint'
import { syntaxTree } from '@codemirror/language'

/**
 * Generic linter that shows parser error
 */
export function genericLinter(view) {

  const diagnostics: Diagnostic[] = []

  const { state } = view
  const tree = syntaxTree(state)
  const docLength = state.doc.length

  if (docLength && tree.length === docLength) {

    let pos: number | null = null

    tree.iterate({
      enter: n => {
        if (pos == null && n.type.isError) {
          pos = n.from
          return false
        }
      }
    })

    if (pos != null) {
      diagnostics.push({
        from: pos,
        to: pos + 1,
        severity: 'error',
        message: 'Syntax error'
      })
    }
  }

  return diagnostics
}