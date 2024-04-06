import {ERROR_PREFIX} from './constant';

/**
 * Get all the content inside brackets
 * @param {string} stringToParse string with parenthesis. This string must start with an `(`
 * @param {number} [startingPosition] to start parsing
 * @returns {{content: string, position: number}} All the content inside parenthesis including nested properties
 *
 * @todo might worth to parse the string until a `(` is found?
 */
export default function parseParenthesisContent(stringToParse, startingPosition = 0) {
  let position = startingPosition;
  let content = '';

  const stack = [];
  while (position !== stringToParse.length) {
    const mapChracter = stringToParse[position];
    if (mapChracter === '(') {
      stack.push(position);
    } else if (mapChracter === ')') {
      stack.pop();
    }

    content += mapChracter;
    position++; // go ahead

    if (stack.length === 0) {
      break;
    }
  }

  /**
   * String should be already validated by postcss but to avoid unclear stacktrace I'll manage the error anyway.
   */
  if (stack.length !== 0) {
    throw new Error(`${ERROR_PREFIX} parenthesis not closed`);
  }

  return {content, position};
}
