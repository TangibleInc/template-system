import { PREC_EQ, PREC_COMP } from '../const.js'
import { unary, binary } from '../parse.js'
import { operator, compile } from '../compile.js'

binary('==', PREC_EQ),
  operator(
    '==',
    (a, b) =>
      b && ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx) == b(ctx)),
  )
binary('!=', PREC_EQ),
  operator(
    '!=',
    (a, b) =>
      b && ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx) != b(ctx)),
  )
binary('>', PREC_COMP),
  operator(
    '>',
    (a, b) =>
      b && ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx) > b(ctx)),
  )
binary('<', PREC_COMP),
  operator(
    '<',
    (a, b) =>
      b && ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx) < b(ctx)),
  )
binary('>=', PREC_COMP),
  operator(
    '>=',
    (a, b) =>
      b && ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx) >= b(ctx)),
  )
binary('<=', PREC_COMP),
  operator(
    '<=',
    (a, b) =>
      b && ((a = compile(a)), (b = compile(b)), (ctx) => a(ctx) <= b(ctx)),
  )
