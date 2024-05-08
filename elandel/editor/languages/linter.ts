import type { Diagnostic } from '@codemirror/lint'
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

// const customLinter = linter((view) => {
//   const diagnostics: any[] = []
//   const code: string = view.state.doc.toString()
//   try {
//     // babelTranspile(code);
//   } catch (e: any) {
//     const line = view.state.doc.lineAt(e.loc.index)
//     diagnostics.push({
//       from: line.from,
//       to: line.to,
//       severity: 'error',
//       message: e.message,
//     })
//   }
//   return diagnostics
// })
