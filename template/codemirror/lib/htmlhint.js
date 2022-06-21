/**
 * Wrap HTMLHint library in local namespace to avoid compatibility issue
 * with different versions being loaded
 *
 * @see ./html-lint.js
 */
window.Tangible = window.Tangible || {}
window.Tangible.HTMLHint = require('htmlhint')
