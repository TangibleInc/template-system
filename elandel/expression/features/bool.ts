import { token } from '../parse.js'
import { PREC_TOKEN } from '../const.js'

token('true', PREC_TOKEN, (a) => (a ? err() : [, true]))
token('false', PREC_TOKEN, (a) => (a ? err() : [, false]))
