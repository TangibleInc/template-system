import { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

/*
  Credits for color palette:

  Author:     Mattia Astorino (http://github.com/equinusocio)
  Website:    https://material-theme.site/
*/

const ivory = '#abb2bf',
  stone = '#7d8799',
  invalid = '#ffffff',
  darkBackground = '#21252b',
  highlightBackground = 'rgba(0, 0, 0, 0.5)',
  background = '#212121',
  tooltipBackground = '#353a42',
  selection = 'rgba(128, 203, 196, 0.2)',
  cursor = '#ffcc00';

/// The editor theme styles for Material Darker.
export const materialDarkerTheme = EditorView.theme(
  {
    '&': {
      color: '#eeffff',
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
      color: '#545454',
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

/// The highlighting style for code in the Material Darker theme.
export const materialDarkerHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: '#c792ea' },
  { tag: t.operator, color: '#89ddff' },
  { tag: t.special(t.variableName), color: '#eeffff' },
  { tag: t.typeName, color: '#f07178' },
  { tag: t.atom, color: '#f78c6c' },
  { tag: t.number, color: '#ff5370' },
  { tag: t.definition(t.variableName), color: '#82aaff' },
  { tag: t.string, color: '#c3e88d' },
  { tag: t.special(t.string), color: '#f07178' },
  { tag: t.comment, color: stone },
  { tag: t.variableName, color: '#f07178' },
  { tag: t.tagName, color: '#ff5370' },
  { tag: t.bracket, color: '#948989' },
  { tag: t.meta, color: '#ffcb6b' },
  { tag: t.attributeName, color: '#c792ea' },
  { tag: t.propertyName, color: '#c792ea' },
  { tag: t.className, color: '#decb6b' },
  { tag: t.invalid, color: invalid }
]);

/// Extension to enable the Material Darker theme (both the editor theme and
/// the highlight style).
export const materialDarker: Extension = [
  materialDarkerTheme,
  syntaxHighlighting(materialDarkerHighlightStyle)
];
