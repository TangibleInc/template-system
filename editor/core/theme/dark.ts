import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

/**
 * Tangible Dark theme - Based on Nord and One Dark
 */

// Polar Night
const base00 = '#2e3440' // black
const base01 = '#3b4252' // dark grey
const base02 = '#434c5e'
const base03 = '#4c566a' // grey
// grey between #a5a9b0

// Snow Storm
const base04 = '#d8dee9' // grey
const base05 = '#e5e9f0' // off white
const base06 = '#eceff4' // white

// Frost
const base07 = '#98c379' // '#8fbcbb' // moss green
const base08 = '#88c0d0' // ice blue
const base09 = '#81a1c1' // water blue
const base0A = '#5e81ac' // deep blue

// Aurora
const base0B = '#bf616a' // red
const base0C = '#d08770' // orange
const base0D = '#ebcb8b' // yellow
const base0E = '#a3be8c' // green
const base0F = '#c678dd' // '#b48ead' // purple

const invalid = '#d30102'
const darkBackground = '#252a33'
const highlightBackground = base03
const background = base00
const tooltipBackground = base01
const selection = base02
const cursor = '#ffea00' // base04

/// The editor theme styles
export const darkTheme = EditorView.theme(
  {
    '&': {
      color: base04,
      backgroundColor: darkBackground,
    },

    '.cm-content': {
      caretColor: cursor,
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },

    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, &.cm-focused .cm-content ::selection':
      {
        backgroundColor: `${selection} !important`
      },

    // '.cm-panels': {
    //   backgroundColor: darkBackground,
    //   color: base05,
    // },
    // '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    // '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
  
    '.cm-searchMatch': {
      backgroundColor: 'transparent',
      outline: `1px solid ${base07}`
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: base04,
      color: base00
    },

    '.cm-activeLine': {
      backgroundColor: darkBackground,
    },

    '.cm-selectionMatch': {
      backgroundColor: base02,
      color: base01
    },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: 'transparent',
      borderBottom: `1px dotted ${base05}`,
    },

    '.cm-gutters': {
      backgroundColor: background, //base00,
      color: base04, // 3
      border: 'none',
      borderRight: `1px solid ${darkBackground}`
    },

    '.cm-activeLineGutter': {
      backgroundColor: darkBackground, //highlightBackground,
      color: base04
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
        backgroundColor: highlightBackground, //darkBackground, //highlightBackground,
        color: base04
      }
    }
  },
  { dark: true }
)

/// The highlighting style
export const darkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: base0A },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: base08
  },
  { tag: [t.variableName], color: base07 },
  { tag: [t.function(t.variableName)], color: base07 },
  { tag: [t.labelName], color: base09 },


  { tag: [t.definition(t.name), t.separator], color: base0E },
  // { tag: [t.brace], color: base07 },
  {
    tag: [t.annotation],
    color: invalid
  },
  {
    tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: base0F
  },
  {
    tag: [t.typeName, t.className],
    color: base0D
  },
  // {
  //   tag: [t.operator, t.operatorKeyword],
  //   color: base0E
  // },

  {
    tag: [t.tagName],
    color: base0D
  },

  {
    tag: [t.attributeName],
    color: base0C
  },

  // {
  //   tag: [t.color, t.constant(t.name), t.standard(t.name)],
  //   color: base0A
  // },

  {
    tag: [t.propertyName,
      t.color, t.constant(t.name), t.standard(t.name)], // , , t.typeName
    color: '#60A4F1',
  },
  {
    tag: [t.angleBracket, t.operator, t.operatorKeyword, t.brace],
    color: base09 // base0C
  },

  {
    tag: [t.squareBracket],
    color: base0B
  },

  {
    tag: [t.regexp],
    color: base0A
  },
  {
    tag: [t.quote],
    color: base0F
  },
  { tag: [t.string], color: base07 },
  {
    tag: t.link,
    color: base07,
    textDecoration: 'underline',
    textUnderlinePosition: 'under'
  },
  {
    tag: [t.url, t.escape, t.special(t.string)],
    color: base07
  },
  { tag: [t.meta], color: base08 },
  { tag: [t.monospace], color: base04 }, // , fontStyle: 'italic'

  { tag: [t.comment], color: base04 },

  { tag: t.strong, fontWeight: 'bold', color: base0A },
  { tag: t.emphasis, fontStyle: 'italic', color: base0A },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.heading, fontWeight: 'bold', color: base0A },
  { tag: t.special(t.heading1), fontWeight: 'bold', color: base0A },
  { tag: t.heading1, fontWeight: 'bold', color: base0A },
  {
    tag: [t.heading2, t.heading3, t.heading4],
    fontWeight: 'bold',
    color: base0A
  },
  {
    tag: [t.heading5, t.heading6],
    color: base0A
  },
  { tag: [t.atom, t.bool, t.special(t.variableName)], color: base0C },
  {
    tag: [t.processingInstruction, t.inserted],
    color: base07
  },
  {
    tag: [t.contentSeparator],
    color: base0D
  },
  { tag: t.invalid, color: invalid, borderBottom: `1px dotted ${invalid}` }
])

/// Extension with editor theme and highlight style
export const dark: Extension = [
  darkTheme,
  syntaxHighlighting(darkHighlightStyle)
]
