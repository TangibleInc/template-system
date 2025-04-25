import { binary } from '../parse.js'
import { compile, operator } from '../compile.js'
import { PREC_EXP } from '../const.js'

binary('**', PREC_EXP, true),
  operator(
    '**',
    (a, b) =>
      b && ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx) ** b(ctx)),
  )
