import { linter, Diagnostic } from '@codemirror/lint'

const defaultHTMLHintRules = {
  'tagname-lowercase': false,
  'attr-lowercase': true,
  'attr-value-double-quotes': false,
  'doctype-first': false,
  'tag-pair': true,
  'spec-char-escape': true,
  'id-unique': true,
  'src-not-empty': true,
  'attr-no-duplication': true
}

export function createHtmlLinter() {
  return linter(view => {

    const diagnostics: Diagnostic[] = []

    if (!window.Tangible || !window.Tangible.HTMLHint) return diagnostics

    const doc = view.state.doc

    const { HTMLHint } = window.Tangible
    const content = doc.toString()

    const messages = HTMLHint.verify(content, defaultHTMLHintRules)

    for (let i = 0; i < messages.length; i++) {

      const message = messages[i]

      const pos = Math.min(
        doc.line(message.line).from + message.col - 1,
        doc.length
      )

      diagnostics.push({
        from: pos,
        to: pos,
        message: message.message,
        severity: message.type
      })
    }

    return diagnostics
  })
}
