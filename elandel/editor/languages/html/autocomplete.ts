/**
 * Autocomplete extension for the template language
 * https://codemirror.net/docs/ref/#autocomplete.autocompletion
 */

import { autocompletion, snippetCompletion } from '@codemirror/autocomplete'
// import { htmlCompletionSourceWith } from './htm/lang-html'
import {syntaxTree} from "@codemirror/language"
import { identifier, elementName, findParentElement, Tags, GlobalAttrs } from './lang-html/complete'

import type { CompletionSource, CompletionContext, CompletionResult } from '@codemirror/autocomplete'
import type { EditorState } from "@codemirror/state"
import type { SyntaxNode } from "@lezer/common"


/**
 * Language definition from server side
 * @see /editor/enqueue.php
 */
const {
  languageDefinition = { tags: {} }
} = window?.TangibleTemplateSystemEditor || {}

/* eslint-disable no-template-curly-in-string */

type TagCompletion = [string, string]

const tagCompletions: TagCompletion[] = [

  ['a', '<a href="${1}">${2}</a>'],
  ['article', '<article${1}>\n  ${2}\n</article>'],
  ['aside', '<aside${1}>\n  ${2}\n</aside>'],
  ['audio', '<audio src="${1}">${2}</audio>'],
  ['b', '<b>${1}</b>'],
  ['br', '<br>\n'],
  ['blockquote', '<blockquote>\n</blockquote>'],
  ['button', '<button${1}>${2}</button>'],
  ['canvas', '<canvas${1}></canvas>'],
  ['code', '<code${1}>${2}</code>'],
  // col, colgroup
  ['details', '<details${1}>${2}</details>'],
  ['em', '<em>${1}</em>'],
  // fieldset
  ['figure', '<figure${1}>${2}</figure>'],
  ['footer', '<footer${1}>\n  ${2}\n</footer>'],

  // ['form', '<'], // TODO: Form tag

  ['h1', '<h1>${1}</h1>'],  
  ['h2', '<h2>${1}</h2>'],  
  ['h3', '<h3>${1}</h3>'],  
  ['h4', '<h4>${1}</h4>'],  
  ['h5', '<h5>${1}</h5>'],  
  ['header', '<header${1}>\n  ${2}\n</header>'],
  ['hr', '<hr>\n'],  
  ['img', '<img src="${1}" alt="${2}">'],
  ['input', '<input type=${1}>'],
  ['label', '<label>${1}</labelli>'],  
  ['li', '<li>${1}</li>'],  
  // link
  // meta
  ['ol', '<ol${1}></ol>'],
  // optgroup, option

  ['p', '<p>${2}</p>'],
  ['pre', '<pre${1}>${2}</pre>'],
  ['section', '<section${1}>\n  ${2}\n</section>'],

  // select
  ['small', '<small>${1}</small>'],
  
  // summary
  // table, tbody, td, tfoot, th, thead
  // textarea
  // title
  ['ul', '<ul${1}></ul>'],
  
  ['video', '<video${1}>${2}</video>'],
]


for (const name of Object.keys(languageDefinition.tags)) {

  const config = languageDefinition.tags[name]

  if (config.attributes) {

    // Complete attribute name and value 

    Tags[ name ] = {
      attrs: config.attributes
    }
  }

  // Complete tag snippet

  tagCompletions.push([
    name,
    config.snippet || (
      // Create default snippet
      config.closed
        ? `<${name}\${1} />`
        : `<${name}\${1}>\${2}</${name}>`
    )
  ])
}


/**
 * When user types "<"
 */
const completions = tagCompletions
  .map(([label, snippet]) => snippetCompletion(`${
    // Remove the "<" from the snippet
    snippet.slice(1)
  }`, { label }))

/**
 * When user types the first letter of tag - TODO: Consolidate with above?
 */
const completionsWithBracket = tagCompletions
  .map(([label, snippet]) => snippetCompletion(snippet, { label }))


function completeTag(state, tree, from, to) {
  return {
    from,
    options: completions,
    validFor: identifier //^<\w*$/
  }
}

function completeTagAttributeName(state, tree, from, to) {

  let el = findParentElement(tree)
  let tagName = el ? elementName(state.doc, el) : null

  const attrs = Object.keys(
    (tagName && Tags[tagName] && Tags[tagName].attrs) || {}
  )

  return {
    from,
    options: attrs.map(label => ({ label, type: 'property' })),
    validFor: identifier
  }
}

function completeTagAttributeValue(state: EditorState, tree: SyntaxNode, from: number, to: number) {
  let nameNode = tree.parent?.getChild("AttributeName")
  let options = [], token = undefined
  if (nameNode) {
    let attrName = state.sliceDoc(nameNode.from, nameNode.to)
    let attrs: readonly string[] | null | undefined = GlobalAttrs[attrName]
    if (!attrs) {
      let elt = findParentElement(tree), info = elt ? Tags[elementName(state.doc, elt)] : null
      attrs = info?.attrs && info.attrs[attrName]
    }
    if (attrs) {
      let base = state.sliceDoc(from, to).toLowerCase(), quoteStart = '"', quoteEnd = '"'
      if (/^['"]/.test(base)) {
        token = base[0] == '"' ? /^[^"]*$/ : /^[^']*$/
        quoteStart = ""
        quoteEnd = state.sliceDoc(to, to + 1) == base[0] ? "" : base[0]
        base = base.slice(1)
        from++
      } else {
        token = /^[^\s<>='"]*$/
      }
      for (let value of attrs)
        options.push({label: value, apply: quoteStart + value + quoteEnd, type: "constant"})
    }
  }
  return {from, to, options, validFor: token}
}


export const templateTagCompletionSource: CompletionSource = (context: CompletionContext) => {
  // Original HTML completion
  // return htmlCompletionSourceWith()(context)
  
  // Reference: lang-html/complete.ts, htmlCompletionFor()
  
  let {state, pos} = context
  let around = syntaxTree(state).resolveInner(pos)
  let tree = around.resolve(pos, -1)

  for (let scan = pos, before; around == tree && (before = tree.childBefore(scan));) {
    let last = before.lastChild
    if (!last || !last.type.isError || last.from < last.to) break
    around = tree = before
    scan = last.from
  }

  if (tree.name == "TagName") {

    if (tree.parent && /CloseTag$/.test(tree.parent.name)) {
      // Complete close tag - Not necessary thanks to auto-close-tag extension
      return null
    }
    return completeTag(state, tree, tree.from, pos)
  }
  if (tree.name == "StartTag") {
    return completeTag(state, tree, pos, pos)
  }
  if (tree.name == "StartCloseTag" || tree.name == "IncompleteCloseTag") {
      // Complete close tag - Not necessary thanks to auto-close-tag extension
      return null
  }
  if (context.explicit && (tree.name == "OpenTag" || tree.name == "SelfClosingTag") || tree.name == "AttributeName") {

    return completeTagAttributeName(state, tree,
      tree.name == "AttributeName" ? tree.from : pos,
      pos
    )

  }
  if (tree.name == "Is" || tree.name == "AttributeValue" || tree.name == "UnquotedAttributeValue") {

    return completeTagAttributeValue(state, tree,
      tree.name == "Is" ? pos : tree.from,
      pos
    )

  }
  if (context.explicit && (around.name == "Element" || around.name == "Text" || around.name == "Document")) {

    // console.log('Complete start tag') // pos
    return {
      from: context.pos,
      options: completionsWithBracket,
      validFor: /^\w*$/
    }

  }

  // Based on example: https://codemirror.net/try/?example=Custom%20completions

  const before = context.matchBefore(/\w+/)

  // If completion wasn't explicitly started and there
  // is no word before the cursor, don't open completions.
  if (!context.explicit && !before) return null

  return {
    from: (before ? before.from : context.pos),
    options: completionsWithBracket,
    validFor: /^\w*$/
  }
}

export function getHTMLAutocomplete() {
  return autocompletion({
      // defaultKeymap: false, // Needed for vscode-keymap
      // selectOnOpen: false, // https://github.com/codemirror/autocomplete/blob/ffe365dfcaaff9fc4218e0452fb8da55eebaa865/src/config.ts#L4
      override: [
        templateTagCompletionSource
      ]
    })
    // htmlLanguage.data.of({ autocomplete: completions })
}
