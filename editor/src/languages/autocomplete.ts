import { autocompletion, snippetCompletion } from '@codemirror/autocomplete'
import { htmlLanguage, htmlCompletionSourceWith } from './html'
import type { CompletionSource } from '@codemirror/autocomplete'

/**
 * Autocomplete extension based on https://codemirror.net/try/?example=Custom%20completions
 */

const completions = [
  /* eslint-disable no-template-curly-in-string */
  snippetCompletion('<Loop type=${1}>\n  ${2}\n</Loop>\n', { label: '<Loop' }),
  snippetCompletion('<Field ${1} />', { label: '<Field' }),
]

const customCompletionSource: CompletionSource = (context) => {

  /**
   * Original HTML completion matches defined tags starting with "<", and
   * tag attributes. Rewrite for L&L template language.
   */
  // const result = htmlCompletionSourceWith({
  //   extraTags: {
  //     Loop: {

  //       /// Type used to specify tags to complete.
  //       // export interface TagSpec {
  //       attrs: {
  //         type: null
  //       }
  //       /// Define tag-specific attributes. Property names are attribute
  //       /// names, and property values can be null to indicate free-form
  //       /// attributes, or a list of strings for suggested attribute values.

  //       // attrs?: Record<string, null | readonly string[]>,

  //       /// When set to false, don't complete global attributes on this tag.
  //       // globalAttrs?: boolean,
  //       /// Can be used to specify a list of child tags that are valid
  //       /// inside this tag. The default is to allow any tag.
  //       // children?: readonly string[]

  //     }
  //   }
  // })(context)
  // // if (result)
  // return result


  const before = context.matchBefore(/</)

  // If completion wasn't explicitly started and there
  // is no word before the cursor, don't open completions.
  if (!context.explicit && !before) return null

  return {
    from: (before ? before.from : context.pos), // + 1,
    options: completions,
    // https://codemirror.net/docs/ref/#autocomplete.CompletionResult
    validFor: /^<\w*$/ // \w*
  }
}

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
