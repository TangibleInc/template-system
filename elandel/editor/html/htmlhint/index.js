/**
 * - Forked HTMLHint to allow parser to recognize "raw" tags,
 * in addition to script and style, whose content should not be parsed.
 *
 * @see ./htmlhint/core/htmlparser.ts, HTMLParser.mapCdataTags
 * @see ./htmlhint/core/core.ts, HTMLHintCore.parser
 * @see template/modules/codemirror, enqueue_codemirror()
 *
 * - Wrap HTMLHint library in local namespace to prevent
 * compatibility issue with different versions being loaded.
 *
 * @see ../html-lint.js
 * @see https://github.com/htmlhint/HTMLHint/tree/master/src/core
 *
 * - Modify core/rules/tag-pair.ts to be case-sensitive for tag names
 */
import { HTMLHint } from './core/core'

window.Tangible = window.Tangible || {}
window.Tangible.HTMLHint = HTMLHint
