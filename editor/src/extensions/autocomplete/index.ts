import { autocompletion, snippetCompletion } from '@codemirror/autocomplete'
import { htmlCompletionSource } from '../../languages/lang-html/html'

/**
 * Autocomplete extension based on https://codemirror.net/try/?example=Custom%20completions
 */

const completions = [
  snippetCompletion('<Loop type=${1}>\n  ${2}\n</Loop>\n', { label: 'Loop' }),
  snippetCompletion('<Field ${1} />', { label: 'Field' }),
]

export function getAutocompleteExtensions() {
  return [
    autocompletion({ // https://codemirror.net/docs/ref/#autocomplete.autocompletion
      defaultKeymap: false, // Needed for vscode-keymap
      override: [
        customCompletionSource
      ]
    }),
    // htmlLanguage.data.of({ autocomplete: completions })
  ]
}

function customCompletionSource(context) {

  /**
   * Original HTML completion matches defined tags starting with "<", and
   * tag attributes. Rewrite for L&L template language.
   */
  // const result = htmlCompletionSource(context)
  // if (result) return result

  const before = context.matchBefore(/\w+/)

  // If completion wasn't explicitly started and there
  // is no word before the cursor, don't open completions.
  if (!context.explicit && !before) return null

  return {
    from: before ? before.from : context.pos,
    options: completions,
    // https://codemirror.net/docs/ref/#autocomplete.CompletionResult
    validFor: /^\w*$/
  }
}
