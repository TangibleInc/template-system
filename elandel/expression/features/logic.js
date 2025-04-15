import { PREC_LOR, PREC_LAND, PREC_PREFIX, PREC_ASSIGN } from '../const.js'
import { unary, binary } from '../parse.js'
import { operator, compile } from '../compile.js'

unary('!', PREC_PREFIX),
  operator('!', (a, b) => !b && ((a = compile(a)), (ctx) => !a(ctx)))

binary('||', PREC_LOR)
operator(
  '||',
  (a, b) => ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx) || b(ctx)),
)

binary('&&', PREC_LAND)
operator(
  '&&',
  (a, b) => ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx) && b(ctx)),
)
