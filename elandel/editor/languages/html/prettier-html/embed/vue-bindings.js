import { formatAttributeValue } from "./utils.js";

/**
 * @typedef {import("../../document/builders.js").Doc} Doc
 */

/**
 * @returns {Promise<Doc>}
 */
function printVueBindings(text, textToDoc, { parseWithTs }) {
  return formatAttributeValue(`function _(${text}) {}`, textToDoc, {
    parser: parseWithTs ? "babel-ts" : "babel",
    __isVueBindings: true,
  });
}

function isVueEventBindingExpression(eventBindingValue) {
  // https://github.com/vuejs/vue/blob/v2.5.17/src/compiler/codegen/events.js#L3-L4
  // arrow function or anonymous function
  const fnExpRE = /^(?:[\w$]+|\([^)]*\))\s*=>|^function\s*\(/;
  // simple member expression chain (a, a.b, a['b'], a["b"], a[0], a[b])
  const simplePathRE =
    /^[$_a-z][\w$]*(?:\.[$_a-z][\w$]*|\['[^']*']|\["[^"]*"]|\[\d+]|\[[$_a-z][\w$]*])*$/i;

  // https://github.com/vuejs/vue/blob/v2.5.17/src/compiler/helpers.js#L104
  const value = eventBindingValue.trim();

  return fnExpRE.test(value) || simplePathRE.test(value);
}

export { isVueEventBindingExpression, printVueBindings };
