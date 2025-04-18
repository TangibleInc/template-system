import { err, nary, group } from '../parse.js'
import { compile, operator } from '../compile.js'
import { PREC_ACCESS, PREC_GROUP, PREC_SEQ, PREC_STATEMENT } from '../const.js'

// (a,b,c), (a)
// FIXME: try raising group precedence (it causes conflict in ?. though)
group('()', PREC_ACCESS)
operator('()', (a, b) => b === undefined && (!a && err('Empty ()'), compile(a)))

const last = (...args) => (
  (args = args.map(compile)), (ctx) => args.map((arg) => arg(ctx)).pop()
)
nary(',', PREC_SEQ), operator(',', last)
nary(';', PREC_STATEMENT, true), operator(';', last)
