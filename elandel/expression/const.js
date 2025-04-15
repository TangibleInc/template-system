export const PERIOD = 46,
  OPAREN = 40,
  CPAREN = 41,
  OBRACK = 91,
  CBRACK = 93,
  OBRACE = 123,
  CBRACE = 125,
  SPACE = 32,
  COLON = 58,
  DQUOTE = 34,
  QUOTE = 39,
  _0 = 48,
  _9 = 57,
  _E = 69,
  _e = 101,
  BSLASH = 92,
  SLASH = 47,
  STAR = 42

// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence
// we mult by 10 to leave space for extensions
export const PREC_STATEMENT = 5,
  PREC_SEQ = 10,
  PREC_ASSIGN = 20,
  PREC_LOR = 30,
  PREC_LAND = 40,
  PREC_OR = 50,
  PREC_XOR = 60,
  PREC_AND = 70,
  PREC_EQ = 80,
  PREC_COMP = 90,
  PREC_SHIFT = 100,
  PREC_ADD = 110,
  PREC_MULT = 120,
  PREC_EXP = 130,
  PREC_PREFIX = 140,
  PREC_POSTFIX = 150,
  PREC_ACCESS = 170,
  PREC_GROUP = 180,
  PREC_TOKEN = 200
