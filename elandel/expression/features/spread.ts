import { unary } from '../parse.js'
import { PREC_PREFIX } from '../const.js'
import { operator, compile } from '../compile.js'

unary('...', PREC_PREFIX)
operator('...', (a) => ((a = compile(a)), (ctx) => Object.entries(a(ctx))))
