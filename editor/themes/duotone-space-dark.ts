import { EditorView } from '@codemirror/view';
import { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

/*
    Credits for color palette:
    
    Name:   Duotone-Materialized-Space-Dark
    Author: adapted from DuoTone themes by Simurai (http://simurai.com/projects/2016/01/01/duotone-themes)

    CodeMirror theme by Bram de Haan (https://github.com/atelierbram), adapted by Ivqonnada Al Mufarrih (https://github.com/ivqosanada/)
*/

const ivory = '#abb2bf',
  stone = '#7d8799',
  invalid = '#ffffff',
  darkBackground = '#21252b',
  highlightBackground = 'rgba(0, 0, 0, 0.5)',
  background = '#24242e',
  tooltipBackground = '#353a42',
  selection = 'rgba(128, 203, 196, 0.2)',
  cursor = '#ec7336';

/// The editor theme styles for Duotone Space Dark.
export const duotoneSpaceDarkTheme = EditorView.theme(
  {
    '&': {
      color: stone,
      backgroundColor: background
    },

    '.cm-content': {
      caretColor: cursor
    },

    '&.cm-focused .cm-cursor': {
      borderLeftColor: cursor
    },

    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: selection },

    '.cm-panels': { backgroundColor: darkBackground, color: '#ffffff' },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

    '.cm-searchMatch': {
      backgroundColor: '#72a1ff59',
      outline: '1px solid #457dff'
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#6199ff2f'
    },

    '.cm-activeLine': { backgroundColor: highlightBackground },
    '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: '#bad0f847',
      outline: '1px solid #515a6b'
    },

    '.cm-gutters': {
      background: background,
      color: '#515167',
      border: 'none'
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
  },
  { dark: true }
);

/// The highlighting style for code in the Duotone Space Dark theme.
export const duotoneSpaceDarkHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#fe8c52' },
  { tag: t.operator, color: '#ec7336' },
  { tag: t.special(t.variableName), color: '#6363ee' },
  { tag: t.typeName, color: '#f07178' },
  { tag: t.atom, color: '#fe8c52' },
  { tag: t.number, color: '#fe8c52' },
  { tag: t.definition(t.variableName), color: '#ebebff' },
  { tag: t.string, color: '#f37b3f' },
  { tag: t.special(t.string), color: '#6363ee' },
  { tag: t.comment, color: '#5b5b76' },
  { tag: t.variableName, color: '#f07178' },
  { tag: t.tagName, color: '#ebebff' },
  { tag: t.bracket, color: '#5b5b76' },
  { tag: t.meta, color: '#ffcb6b' },
  { tag: t.attributeName, color: '#fe8c52' },
  { tag: t.propertyName, color: stone },
  { tag: t.className, color: '#ebebff' },
  { tag: t.invalid, color: invalid }
]);

/// Extension to enable the Duotone Space Dark theme (both the editor theme and
/// the highlight style).
export const duotoneSpaceDark: Extension = [
  duotoneSpaceDarkTheme,
  syntaxHighlighting(duotoneSpaceDarkHighlightStyle)
];
