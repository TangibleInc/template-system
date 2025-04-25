import {METHOD, ERROR_PREFIX} from './constant';

import parseParenthesisContent from './parse-parenthesis-content';

/**
 * @param {string} mapString SASS map string without opening parenthesis
 * @param {string} keyParameter the key to extract from the map
 * @returns {?string} retrieved `keyParameter` value from the map
 */
function getKeyFromMapString(mapString, keyParameter) {
  // remove all whitespace character from the key
  const keyValue = keyParameter.replace(/\s/g, '');
  // remove open and close parenthesis from the map string
  mapString = mapString.slice(1, -1);
  // remove all line breaks from the map string
  mapString = mapString.replace(/(\r\n|\n|\r)/gm, '');

  let isParsingKey = true;
  let hasFinishedParsingValue = false;

  let key = '';
  let value = '';

  for (let position = 0; position < mapString.length; position++) {
    const currentCharacter = mapString[position];

    // process the key (add all characters until find a `:`)
    if (isParsingKey) {
      if (currentCharacter === ':') {
        isParsingKey = false;
      } else {
        key += currentCharacter;
      }

      continue;
    }

    if (currentCharacter === '(') {
      // if value contains a `(` that means that is map so parse the string until the `(` is closed
      const output = parseParenthesisContent(mapString, position);
      value += output.content;
      position = output.position;

      hasFinishedParsingValue = true;
    } else {
      // simple map with property / value pairs
      const isLastCharacter = position === mapString.length - 1;
      if (currentCharacter === ',' || isLastCharacter) { // map with only one property or end of the string
        if (isLastCharacter) {
          value += currentCharacter;
        }

        hasFinishedParsingValue = true;
      } else {
        value += currentCharacter;
      }
    }

    if (hasFinishedParsingValue) {
      // remove whitespace from parsed key
      key = key.replace(/\s/g, '');
      if (key === keyValue) {
        return value.trim();
      }

      // value declaration is complete return to check key and reset both variables
      isParsingKey = true;
      hasFinishedParsingValue = false;
      key = '';
      value = '';
    }
  }

  throw new Error(`${ERROR_PREFIX} unable to find “${keyValue}“ key inside map “(${mapString})“`);
}

/**
 * @param {string} value CSS property value including map-get invocation
 * @returns {string} value of css property resolved by map-get
 */
export default function (value) {
  let resolvedValue = value;
  // start to resolve map-get more nested
  let indexOfMethod = resolvedValue.indexOf(METHOD);
  while (indexOfMethod > -1) {
    const startPosition = indexOfMethod;
    let position = (startPosition + METHOD.length) - 1;

    let mapString = '';

    // resolve map content
    const output = parseParenthesisContent(resolvedValue, position);
    mapString += output.content;
    position = output.position;

    // resolve the desired requested key
    let keyString = '';

    // indicates if we found the come which separate map and requested key:
    // map-get((...) !default, bar)
    //                       ↑
    let hasFoundComa = false;

    for (; position < resolvedValue.length; position++) {
      const currentCharacter = resolvedValue[position];

      if (currentCharacter === ',') {
        hasFoundComa = true;
      } else if (currentCharacter === ')') {
        break;
      } else if (hasFoundComa) {
        keyString += currentCharacter;
      }
    }

    // get the original invocation string
    position++; // Include last closing parenthesis
    const currentDeclaration = resolvedValue.slice(startPosition, position);

    const mapResolvedValue = getKeyFromMapString(mapString, keyString);

    // replace the value string with the resolved value
    resolvedValue = resolvedValue.replace(currentDeclaration, mapResolvedValue);

    // check if property value contains another map-get invocation
    indexOfMethod = resolvedValue.indexOf(METHOD);
  }

  return resolvedValue;
}
