import { access, binary, group } from '../parse.js'
import { operator, compile } from '../compile.js'
import { CBRACK, PREC_ACCESS } from '../const.js'

// a[b]
access('[]', PREC_ACCESS)
operator('[]', (a, b) =>
  !b ? err() : ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx)[b(ctx)]),
)

// a.b
binary('.', PREC_ACCESS)
operator(
  '.',
  (a, b) => ((a = compile(a)), (b = !b[0] ? b[1] : b), (ctx) => a(ctx)[b]),
) // a.true, a.1 → needs to work fine
