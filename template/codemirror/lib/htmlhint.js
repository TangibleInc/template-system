/**
 * Wrap HTMLHint library in local namespace to avoid compatibility issue
 * with different versions being loaded
 *
 * @see ./html-lint.js
 * @see https://github.com/htmlhint/HTMLHint/tree/master/src/core
 */
import { HTMLHint } from 'htmlhint'

window.Tangible = window.Tangible || {}
window.Tangible.HTMLHint = HTMLHint
