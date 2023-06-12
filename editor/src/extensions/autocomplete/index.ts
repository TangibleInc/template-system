import { autocompletion } from '@codemirror/autocomplete'

/**
 * Autocomplete extension based on https://codemirror.net/try/?example=Custom%20completions
 */

export function getAutocompleteExtensions() {
  return [
    autocompletion({ // #autocomplete.autocompletion
      defaultKeymap: false, // Needed for vscode-keymap
      override: [customCompletion]
    }),
  ]
}

const completions = [
  { label: 'panic', type: 'keyword' },
  { label: 'password', type: 'variable' },
  { label: 'park', type: 'constant', info: 'Test completion' },
]

function customCompletion(context) {
  const before = context.matchBefore(/\w+/)
  // If completion wasn't explicitly started and there
  // is no word before the cursor, don't open completions.
  if (!context.explicit && !before) return null
  return {
    from: before ? before.from : context.pos,
    options: completions,
    validFor: /^\w*$/
  }
}
