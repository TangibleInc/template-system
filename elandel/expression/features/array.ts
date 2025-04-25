import { token, expr, group } from '../parse.js'
import { operator, compile } from '../compile.js'
import { PREC_TOKEN } from '../const.js'

// [a,b,c]
group('[]', PREC_TOKEN)
operator(
  '[]',
  (a, b) =>
    b === undefined &&
    ((a = !a ? [] : a[0] === ',' ? a.slice(1) : [a]),
    (a = a.map((a) =>
      a[0] === '...'
        ? ((a = compile(a[1])), (ctx) => a(ctx))
        : ((a = compile(a)), (ctx) => [a(ctx)]),
    )),
    (ctx) => a.flatMap((a) => a(ctx))),
)
