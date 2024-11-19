import { EditorView } from '@codemirror/view'
import { type Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

// Colors

const blue = '#0000ff' // boolean, number
const violet = '#a100b9' // function, parameter, plain
const grayish = '#969896' 
const green = '#4dbb00' // attribute value
const yellow = '#f7af1f' // attribute name
const orange = '#fd971f'
const sky = '#0079bf'
const slateGray = '#708090' // comment

export const config = {
  name: 'light',
  dark: false,
  background: '#fff',
  foreground: '#444d56',
  selection: '#0366d625',
  cursor: '#044289',
  dropdownBackground: '#fff',
  dropdownBorder: '#e1e4e8',
  activeLine: '#f6f8fa',
  matchingBracket: '#34d05840',

  keyword: '#d73a49',
  storage: '#d73a49',
  variable: '#e36209',
  parameter: '#24292e',
  function: '#005cc5',
  string: '#032f62',
  constant: '#005cc5',
  type: '#005cc5',
  class: '#6f42c1',
  number: '#005cc5',
  comment: '#6a737d',
  heading: '#005cc5',
  invalid: '#cb2431',
  regexp: '#032f62',
}

export const theme = EditorView.theme({
  '&': {
    color: config.foreground,
    backgroundColor: config.background,
    // border: '1px solid #c0c0c0',
  },

  '.cm-content': {
    caretColor: config.cursor,
  },

  '&.cm-focused .cm-cursor': {
    borderLeftColor: config.cursor
  },

  '&.cm-focused  .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: `${config.selection} !important`
  },

  '.cm-searchMatch': {
    backgroundColor: config.dropdownBackground,
    outline: `1px solid ${config.dropdownBorder}`
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: config.selection
  },

  // '.cm-activeLine': { backgroundColor: config.activeLine },


  '.cm-selectionMatch': { backgroundColor: config.selection },

  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: config.matchingBracket,
    outline: 'none'
  },

  '.cm-gutters': {
    backgroundColor: config.background,
    color: config.foreground,
    // border: 'none'
    borderRight: `1px solid ${config.activeLine}`, // Light mode
  },
  '.cm-activeLineGutter': { backgroundColor: config.activeLine },

  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: config.foreground
  },

  '.cm-tooltip': {
    border: `1px solid ${config.dropdownBorder}`,
    backgroundColor: config.dropdownBackground,
    color: config.foreground
  },
  '.cm-tooltip .cm-tooltip-arrow:before': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  '.cm-tooltip .cm-tooltip-arrow:after': {
    borderTopColor: config.foreground,
    borderBottomColor: config.foreground,
  },
  '.cm-tooltip.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      background: config.selection,
      color: config.foreground
    }
  },
}, { dark: config.dark })

export const highlightStyle = HighlightStyle.define([

  { tag: t.keyword, color: config.keyword },
  { tag: [t.name, t.deleted, t.character, t.macroName], color: config.variable },
  { tag: [t.propertyName], color: config.function },
  { tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)], color: config.string },
  { tag: [t.function(t.variableName), t.labelName], color: config.function },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: config.constant },
  { tag: [t.definition(t.name), t.separator], color: config.variable },
  { tag: [t.className], color: config.class },
  { tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: config.number },
  { tag: [t.typeName], color: config.type, fontStyle: config.type },
  { tag: [t.operator, t.operatorKeyword], color: config.keyword },
  { tag: [t.url, t.escape, t.regexp, t.link], color: config.regexp },
  { tag: [t.meta, t.comment], color: config.comment },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: config.heading },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: config.variable },
  { tag: t.invalid, color: config.invalid },
  { tag: t.strikethrough, textDecoration: 'line-through' },

  // Default colors from @codemirror/language/hightlight.ts
  { tag: t.meta, color: '#7a757a' },
  { tag: t.link, textDecoration: 'underline' },
  { tag: t.heading, textDecoration: 'underline', fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.keyword, color: '#708' },
  { tag: [t.atom, t.bool, t.url, t.contentSeparator, t.labelName], color: '#219' },
  { tag: [t.literal, t.inserted], color: '#164' },
  { tag: [t.string, t.deleted], color: '#a11' },
  { tag: [t.regexp, t.escape, t.special(t.string)], color: '#e40' },
  { tag: t.definition(t.variableName), color: '#00f' },
  { tag: t.local(t.variableName), color: '#30a' },
  { tag: [t.typeName, t.namespace], color: '#085' },
  { tag: t.className, color: '#167' },
  { tag: [t.special(t.variableName), t.macroName], color: '#256' },
  { tag: t.definition(t.propertyName), color: '#00c' },
  { tag: t.comment, color: '#940' },
  { tag: t.invalid, color: '#f00' }
])

export const light: Extension = [
  theme,
  syntaxHighlighting(highlightStyle),
]
