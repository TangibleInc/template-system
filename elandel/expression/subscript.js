/**
 * Subscript dialect includes common operators / primitives for all languages
 */
import './features/number.js'
import './features/string.js'
import './features/call.js'
import './features/access.js'
import './features/group.js'
import './features/assign.js'
import './features/mult.js'
import './features/add.js'
import './features/increment.js'
import './features/bitwise.js'
import './features/logic.js'
import './features/compare.js'
import './features/shift.js'
import compile from './compile.js'
import parse from './parse.js'

export { parse, access, binary, unary, nary, group, token } from './parse.js'
export { compile, operator } from './compile.js'
export { stringify } from './stringify.js'

export default (s) => compile(parse(s))
