import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

const chalky = '#e5c07b'
const coral = '#e06c75'
const cyan = '#56b6c2'
const ivory = '#abb2bf'
const stone = '#7d8799'
const malibu = '#61afef'
const sage = '#98c379'
const whiskey = '#d19a66'
const violet = '#c678dd'

const invalid = '#ffffff'
const darkBackground = '#21252b'
const highlightBackground = '#2c313a'
const background = '#282c34'
const tooltipBackground = '#353a42'
const selection = '#3E4451'
const cursor = '#528bff'

/// The colors used in the theme, as CSS color strings.
// export const color = {
//   chalky,
//   coral,
//   cyan,
//   invalid,
//   ivory,
//   stone,
//   malibu,
//   sage,
//   whiskey,
//   violet,
//   darkBackground,
//   highlightBackground,
//   background,
//   tooltipBackground,
//   selection,
//   cursor
// }

/// Editor theme
export const themeDarkTheme = EditorView.theme({
  '&': {
    color: ivory,
    backgroundColor: background
  },

  '.cm-content': {
    caretColor: cursor,
    borderLeft: '1px solid #444' // Dark mode
  },

  '.cm-cursor, .cm-dropCursor': {
    // borderLeftColor: cursor
    borderLeftColor: '#ffea00', // Dark mode
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: selection },

  '.cm-panels': { backgroundColor: darkBackground, color: ivory },
  '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
  '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

  '.cm-searchMatch': {
    backgroundColor: '#72a1ff59',
    outline: '1px solid #457dff'
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#6199ff2f'
  },

  '.cm-activeLine': { backgroundColor: '#6699ff0b' },
  '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: '#bad0f847',
    outline: '1px solid #515a6b'
  },

  '.cm-gutters': {
    backgroundColor: background,
    color: stone,
    border: 'none',
    // borderRight: '1px solid #444',
    // marginRight: '2px'
  },

  '.cm-activeLineGutter': {
    backgroundColor: highlightBackground
  },

  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ddd'
  },

  '.cm-tooltip': {
    border: 'none',
    backgroundColor: tooltipBackground
  },
  '.cm-tooltip .cm-tooltip-arrow:before': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  '.cm-tooltip .cm-tooltip-arrow:after': {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground
  },
  '.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor: highlightBackground,
      color: ivory
    }
  }
}, { dark: true })

/// Highlight style
export const themeDarkHighlightStyle = HighlightStyle.define([
  {
    tag: t.keyword,
    color: violet
  },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: coral
  },
  {
    tag: [t.function(t.variableName), t.labelName],
    color: malibu
  },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: whiskey
  },
  {
    tag: [t.definition(t.name), t.separator],
    color: ivory
  },
  {
    tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: chalky
  },
  {
    tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
    color: cyan
  },
  {
    tag: [t.meta, t.comment],
    color: stone
  },
  {
    tag: t.strong,
    fontWeight: 'bold'
  },
  {
    tag: t.emphasis,
    fontStyle: 'italic'
  },
  {
    tag: t.strikethrough,
    textDecoration: 'line-through'
  },
  {
    tag: t.link,
    color: stone,
    textDecoration: 'underline'
  },
  {
    tag: t.heading,
    fontWeight: 'bold',
    color: coral
  },
  {
    tag: [t.atom, t.bool, t.special(t.variableName)],
    color: whiskey
  },
  {
    tag: [t.processingInstruction, t.string, t.inserted],
    color: sage
  },
  {
    tag: t.invalid,
    color: invalid
  },
])

export const themeDark: Extension = [themeDarkTheme, syntaxHighlighting(themeDarkHighlightStyle)]
