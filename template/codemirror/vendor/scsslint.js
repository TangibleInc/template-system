/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var gonzales = __webpack_require__(8);

var helpers = {};

helpers.log = function log(input) {
  console.log(input);
  //  console.log(util.inspect(input, false, null));
};

helpers.propertySearch = function (haystack, needle, property) {
  var length = haystack.length,
      i;

  for (i = 0; i < length; i++) {
    if (haystack[i][property] === needle) {
      return i;
    }
  }
  return -1;
};

helpers.isEqual = function (a, b) {
  var startLine = a.start.line === b.start.line ? true : false,
      endLine = a.end.line === b.end.line ? true : false,
      type = a.type === b.type ? true : false,
      length = a.content.length === b.content.length ? true : false;

  if (startLine && endLine && type && length) {
    return true;
  } else {
    return false;
  }
};

helpers.isUnique = function (results, item) {
  var search = this.propertySearch(results, item.line, 'line');

  if (search === -1) {
    return true;
  } else if (results[search].column === item.column && results[search].message === item.message) {
    return false;
  } else {
    return true;
  }
};

helpers.addUnique = function (results, item) {
  if (this.isUnique(results, item)) {
    results.push(item);
  }
  return results;
};

helpers.sortDetects = function (a, b) {
  if (a.line < b.line) {
    return -1;
  }
  if (a.line > b.line) {
    return 1;
  }
  if (a.line === b.line) {
    if (a.column < b.column) {
      return -1;
    }
    if (a.column > b.column) {
      return 1;
    }
    return 0;
  }
  return 0;
};

helpers.isNumber = function (val) {
  if (isNaN(parseInt(val, 10))) {
    return false;
  }
  return true;
};

helpers.isUpperCase = function (str) {
  var pieces = str.split(''),
      i,
      result = 0;

  for (i = 0; i < pieces.length; i++) {
    if (!helpers.isNumber(pieces[i])) {
      if (pieces[i] === pieces[i].toUpperCase() && pieces[i] !== pieces[i].toLowerCase()) {
        result++;
      } else {
        return false;
      }
    }
  }
  if (result) {
    return true;
  }
  return false;
};

helpers.isLowerCase = function (str) {
  var pieces = str.split(''),
      i,
      result = 0;

  for (i = 0; i < pieces.length; i++) {
    if (!helpers.isNumber(pieces[i])) {
      if (pieces[i] === pieces[i].toLowerCase() && pieces[i] !== pieces[i].toUpperCase()) {
        result++;
      } else {
        return false;
      }
    }
  }
  if (result) {
    return true;
  }
  return false;
};

/**
 * Determines if a given string adheres to camel-case format
 * @param   {string}  str String to test
 * @returns {boolean}     Whether str adheres to camel-case format
 */
helpers.isCamelCase = function (str) {
  return (/^[a-z][a-zA-Z0-9]*$/.test(str)
  );
};

/**
 * Determines if a given string adheres to pascal-case format
 * @param   {string}  str String to test
 * @returns {boolean}     Whether str adheres to pascal-case format
 */
helpers.isPascalCase = function (str) {
  return (/^[A-Z][a-zA-Z0-9]*$/.test(str)
  );
};

/**
 * Determines if a given string adheres to hyphenated-lowercase format
 * @param   {string}  str String to test
 * @returns {boolean}     Whether str adheres to hyphenated-lowercase format
 */
helpers.isHyphenatedLowercase = function (str) {
  return !/[^\-a-z0-9]/.test(str);
};

/**
 * Determines if a given string adheres to snake-case format
 * @param   {string}  str String to test
 * @returns {boolean}     Whether str adheres to snake-case format
 */
helpers.isSnakeCase = function (str) {
  return !/[^_a-z0-9]/.test(str);
};

/**
 * Determines if a given string adheres to strict-BEM format
 * @param   {string}  str String to test
 * @returns {boolean}     Whether str adheres to strict-BEM format
 */
helpers.isStrictBEM = function (str) {
  return (/^[a-z](\-?[a-z0-9]+)*(__[a-z0-9](\-?[a-z0-9]+)*)?((_[a-z0-9](\-?[a-z0-9]+)*){0,2})?$/.test(str)
  );
};

/**
 * Determines if a given string adheres to hyphenated-BEM format
 * @param   {string}  str String to test
 * @returns {boolean}     Whether str adheres to hyphenated-BEM format
 */
helpers.isHyphenatedBEM = function (str) {
  return !/[A-Z]|-{3}|_{3}|[^_]_[^_]/.test(str);
};

helpers.isValidHex = function (str) {
  if (str.match(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
    return true;
  }
  return false;
};

/**
 * Check if a node is a newline character or not
 *
 * @param {Object} node - The node to test
 * @returns {boolean} Whether the node is a newline or not
 */
helpers.isNewLine = function (node) {
  // using type === instead of is just in case node happens to be a string
  return !!(node && node.type === 'space' && node.content.match('\n'));
};

/**
 * Check if a node is a non newline space character or not
 *
 * @param {Object} node - The node to test
 * @returns {boolean} Whether the node is a non newline space or not
 */
helpers.isSpace = function (node) {
  return !!(node && node.type === 'space' && !node.content.match('\n'));
};

helpers.hasEOL = function (str) {
  return (/\r\n|\n/.test(str)
  );
};

helpers.isEmptyLine = function (str) {
  return (/(\r\n|\n){2}/.test(str)
  );
};

helpers.stripQuotes = function (str) {
  return str.substring(1, str.length - 1);
};

/**
 * Strips vendor prefixes from a string
 *
 * @param {string} str - The string we wish to remove vendor prefixes from
 * @returns {string} The string without vendor prefixes
 */
helpers.stripPrefix = function (str) {
  var modPropertyArr = str.split('-'),
      modProperty = '',
      prefLength = modPropertyArr[2] === 'osx' ? 2 : 1;

  modPropertyArr.splice(1, prefLength);

  modPropertyArr.forEach(function (item, index) {
    modProperty = modProperty + item;
    if (index > 0 && index < modPropertyArr.length - 1) {
      modProperty = modProperty + '-';
    }
  });

  return modProperty;
};

/**
 * Removes the trailing space from a string
 * @param {string} curSelector - the current selector string
 * @returns {string} curSelector - the current selector minus any trailing space.
 */

helpers.stripLastSpace = function (selector) {

  if (selector.charAt(selector.length - 1) === ' ') {
    return selector.substr(0, selector.length - 1);
  }

  return selector;
};

/**
 * Checks the current selector value against the previous selector value and assesses whether they are
 * a) currently an enforced selector type for nesting (user specified - all true by default)
 * b) whether they should be nested
 * @param {object} currentVal - the current node / part of our selector
 * @param {object} previousVal - the previous node / part of our selector
 * @param {array} elements - a complete array of nestable selector types
 * @param {array} nestable - an array of the types of selector to nest
 * @returns {object} Returns whether we or we should nest and the previous val
 */
helpers.isNestable = function (currentVal, previousVal, elements, nestable) {
  // check if they are nestable by checking the previous element against one
  // of the user specified selector types
  if (elements.indexOf(previousVal) !== -1 && nestable.indexOf(currentVal) !== -1) {
    return true;
  }

  return false;
};

/**
 * Tries to traverse the AST, following a specified path
 * @param   {object}  node           Starting node
 * @param   {array}   traversalPath  Array of Node types to traverse, starting from the first element
 * @returns {array}                  Nodes at the end of the path. Empty array if the traversal failed
 */
helpers.attemptTraversal = function (node, traversalPath) {
  var i,
      nextNodeList,
      currentNodeList = [],
      processChildNode = function processChildNode(child) {
    child.forEach(traversalPath[i], function (n) {
      nextNodeList.push(n);
    });
  };

  node.forEach(traversalPath[0], function (n) {
    currentNodeList.push(n);
  });

  for (i = 1; i < traversalPath.length; i++) {
    if (currentNodeList.length === 0) {
      return [];
    }

    nextNodeList = [];
    currentNodeList.forEach(processChildNode);
    currentNodeList = nextNodeList;
  }
  return currentNodeList;
};

/**
 * Collects all suffix extensions for a selector
 * @param   {object}  ruleset      ASTNode of type ruleset, containing a selector with nested suffix extensions
 * @param   {string}  selectorType Node type of the selector (e.g. class, id)
 * @returns {array}                Array of Nodes with the content property replaced by the complete selector
 *                                       (without '.', '#', etc) resulting from suffix extensions
 */
helpers.collectSuffixExtensions = function (ruleset, selectorType) {
  var parentSelectors = helpers.attemptTraversal(ruleset, ['selector', selectorType, 'ident']),
      childSuffixes = helpers.attemptTraversal(ruleset, ['block', 'ruleset']),
      selectorList = [];

  if (parentSelectors.length === 0) {
    return [];
  }

  // Goes recursively through all nodes that look like suffix extensions. There may be multiple parents that are
  // extended, so lots of looping is required.
  var processChildSuffix = function processChildSuffix(child, parents) {
    var currentParents = [],
        selectors = helpers.attemptTraversal(child, ['selector', 'parentSelectorExtension', 'ident']),
        nestedChildSuffixes = helpers.attemptTraversal(child, ['block', 'ruleset']);

    selectors.forEach(function (childSuffixNode) {
      // append suffix extension to all parent selectors
      parents.forEach(function (parent) {
        // clone so we don't modify the actual AST
        var clonedChildSuffixNode = gonzales.createNode(childSuffixNode);
        clonedChildSuffixNode.content = parent.content + clonedChildSuffixNode.content;

        currentParents.push(clonedChildSuffixNode);
      });
    });

    selectorList = selectorList.concat(currentParents);

    nestedChildSuffixes.forEach(function (childSuffix) {
      processChildSuffix(childSuffix, currentParents);
    });
  };

  childSuffixes.forEach(function (childSuffix) {
    processChildSuffix(childSuffix, parentSelectors);
  });

  return parentSelectors.concat(selectorList);
};

/**
 * Check for the partial match of a string in an array
 *
 * @param {string} needle - The value to match
 * @param {Array} haystack - The array of values to try and match to
 * @returns {Boolean} Whether there is a partial match or not
 */
helpers.isPartialStringMatch = function (needle, haystack) {
  for (var i = 0; i < haystack.length; i++) {
    if (haystack[i].indexOf(needle) >= 0) {
      return true;
    }
  }

  return false;
};

/**
 *  A copy of the the stripBom module from https://github.com/sindresorhus/strip-bom/blob/master/index.js
 *  The module requires node > 4 whereas we support earlier versions.
 *  This function strips the BOM marker from the beginning of a file
 *
 * @param {string} str - The string we wish to strip the BOM marker from
 * @returns {string} The string without a BOM marker
 */
helpers.stripBom = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string, got ' + (typeof str === 'undefined' ? 'undefined' : _typeof(str)));
  }

  if (str.charCodeAt(0) === 0xFEFF) {
    return str.slice(1);
  }

  return str;
};

module.exports = helpers;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ==============================================================================
//  Helpers
// ==============================================================================

var simpleIdents = ['ident', 'number', 'operator', 'combinator', 'string', 'parentSelector', 'delimiter', 'typeSelector', 'attributeMatch'];

var subSelectors = ['parentSelectorExtension', 'attributeName', 'attributeValue', 'dimension', 'selector', 'function'];

/**
 * Adds grammar around our content blocks to construct selectors with
 * more readable formats.
 *
 * @param {object} val - The current value node
 * @param {string} prefix - The grammar to prefix the value with
 * @param {string} suffix - The grammar to add after the value
 * @returns {string} The correct readable format
 */
var addGrammar = function addGrammar(val, prefix, suffix) {
  return prefix + val.content + suffix;
};

/**
 * Adds grammar around our content blocks to construct selectors with
 * more readable formats and loops the content as they're within sub blocks.
 *
 * @param {object} val - The current value node
 * @param {string} prefix - The grammar to prefix the value with
 * @param {string} suffix - The grammar to add after the value
 * @param {function} constructSelector - The callback we wish to use which means constructSelector in this instance
 * @returns {string} The correct readable format
 */
var constructSubSelector = function constructSubSelector(val, prefix, suffix, constructSelector) {
  var content = prefix;
  val.forEach(function (subItem) {
    content += constructSelector(subItem);
  });

  return content + suffix;
};

// ==============================================================================
//  Public Methods
// ==============================================================================

/**
 * Constructs a syntax complete selector for our selector matching and warning output
 *
 * @param {object} val - The current node / part of our selector
 * @returns {string} - Content: The current node with correct syntax e.g. class my-class = '.my-class'
 */
var constructSelector = function constructSelector(val) {
  var content = null;

  if (val.is('arguments')) {
    content = constructSubSelector(val, '(', ')', constructSelector);
  } else if (val.is('atkeyword')) {
    content = constructSubSelector(val, '@', '', constructSelector);
  } else if (val.is('attributeSelector')) {
    content = constructSubSelector(val, '[', ']', constructSelector);
  } else if (val.is('class')) {
    content = addGrammar(val, '.', '');
  } else if (val.is('id')) {
    content = addGrammar(val, '#', '');
  } else if (val.is('interpolation')) {
    content = constructSubSelector(val, '#{', '}', constructSelector);
  } else if (val.is('nth')) {
    content = addGrammar(val, '(', ')');
  } else if (val.is('nthSelector')) {
    content = constructSubSelector(val, ':', '', constructSelector);
  } else if (val.is('parentheses')) {
    content = constructSubSelector(val, '(', ')', constructSelector);
  } else if (val.is('placeholder')) {
    content = constructSubSelector(val, '%', '', constructSelector);
  } else if (val.is('pseudoClass')) {
    content = constructSubSelector(val, ':', '', constructSelector);
  } else if (val.is('pseudoElement')) {
    content = addGrammar(val, '::', '');
  } else if (val.is('space')) {
    content = ' ';
  } else if (val.is('variable')) {
    content = constructSubSelector(val, '$', '', constructSelector);
  } else if (simpleIdents.indexOf(val.type) !== -1) {
    content = val.content;
  } else if (subSelectors.indexOf(val.type) !== -1) {
    content = constructSubSelector(val, '', '', constructSelector);
  }

  return content;
};

module.exports = {
  constructSelector: constructSelector
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = [
	"additive-symbols",
	"align-content",
	"align-items",
	"align-self",
	"alignment-adjust",
	"alignment-baseline",
	"all",
	"anchor-point",
	"animation",
	"animation-delay",
	"animation-direction",
	"animation-duration",
	"animation-fill-mode",
	"animation-iteration-count",
	"animation-name",
	"animation-play-state",
	"animation-timing-function",
	"app-region",
	"appearance",
	"aspect-ratio",
	"azimuth",
	"backface-visibility",
	"background",
	"background-attachment",
	"background-blend-mode",
	"background-clip",
	"background-color",
	"background-composite",
	"background-image",
	"background-origin",
	"background-position",
	"background-position-x",
	"background-position-y",
	"background-repeat",
	"background-repeat-x",
	"background-repeat-y",
	"background-size",
	"baseline-shift",
	"binding",
	"bleed",
	"block-size",
	"bookmark-label",
	"bookmark-level",
	"bookmark-state",
	"border",
	"border-after",
	"border-after-color",
	"border-after-style",
	"border-after-width",
	"border-before",
	"border-before-color",
	"border-before-style",
	"border-before-width",
	"border-block-end",
	"border-block-end-color",
	"border-block-end-style",
	"border-block-end-width",
	"border-block-start",
	"border-block-start-color",
	"border-block-start-style",
	"border-block-start-width",
	"border-bottom",
	"border-bottom-color",
	"border-bottom-left-radius",
	"border-bottom-right-radius",
	"border-bottom-style",
	"border-bottom-width",
	"border-collapse",
	"border-color",
	"border-end",
	"border-end-color",
	"border-end-style",
	"border-end-width",
	"border-fit",
	"border-horizontal-spacing",
	"border-image",
	"border-image-outset",
	"border-image-repeat",
	"border-image-slice",
	"border-image-source",
	"border-image-width",
	"border-inline-end",
	"border-inline-end-color",
	"border-inline-end-style",
	"border-inline-end-width",
	"border-inline-start",
	"border-inline-start-color",
	"border-inline-start-style",
	"border-inline-start-width",
	"border-left",
	"border-left-color",
	"border-left-style",
	"border-left-width",
	"border-radius",
	"border-right",
	"border-right-color",
	"border-right-style",
	"border-right-width",
	"border-spacing",
	"border-start",
	"border-start-color",
	"border-start-style",
	"border-start-width",
	"border-style",
	"border-top",
	"border-top-color",
	"border-top-left-radius",
	"border-top-right-radius",
	"border-top-style",
	"border-top-width",
	"border-vertical-spacing",
	"border-width",
	"bottom",
	"box-align",
	"box-decoration-break",
	"box-direction",
	"box-flex",
	"box-flex-group",
	"box-lines",
	"box-ordinal-group",
	"box-orient",
	"box-pack",
	"box-reflect",
	"box-shadow",
	"box-sizing",
	"box-snap",
	"box-suppress",
	"break-after",
	"break-before",
	"break-inside",
	"buffered-rendering",
	"caption-side",
	"chains",
	"clear",
	"clip",
	"clip-path",
	"clip-rule",
	"color",
	"color-interpolation",
	"color-interpolation-filters",
	"color-profile",
	"color-rendering",
	"column-axis",
	"column-break-after",
	"column-break-before",
	"column-break-inside",
	"column-count",
	"column-fill",
	"column-gap",
	"column-progression",
	"column-rule",
	"column-rule-color",
	"column-rule-style",
	"column-rule-width",
	"column-span",
	"column-width",
	"columns",
	"contain",
	"content",
	"counter-increment",
	"counter-reset",
	"counter-set",
	"crop",
	"cue",
	"cue-after",
	"cue-before",
	"cursor",
	"direction",
	"display",
	"display-inside",
	"display-list",
	"display-outside",
	"dominant-baseline",
	"drop-initial-after-adjust",
	"drop-initial-after-align",
	"drop-initial-before-adjust",
	"drop-initial-before-align",
	"drop-initial-size",
	"drop-initial-value",
	"elevation",
	"empty-cells",
	"enable-background",
	"fallback",
	"fill",
	"fill-opacity",
	"fill-rule",
	"filter",
	"fit",
	"fit-position",
	"flex",
	"flex-basis",
	"flex-direction",
	"flex-flow",
	"flex-grow",
	"flex-shrink",
	"flex-wrap",
	"float",
	"float-offset",
	"flood-color",
	"flood-opacity",
	"flow-from",
	"flow-into",
	"font",
	"font-family",
	"font-feature-settings",
	"font-kerning",
	"font-language-override",
	"font-size",
	"font-size-adjust",
	"font-size-delta",
	"font-smoothing",
	"font-stretch",
	"font-style",
	"font-synthesis",
	"font-variant",
	"font-variant-alternates",
	"font-variant-caps",
	"font-variant-east-asian",
	"font-variant-ligatures",
	"font-variant-numeric",
	"font-variant-position",
	"font-weight",
	"glyph-orientation-horizontal",
	"glyph-orientation-vertical",
	"grid",
	"grid-after",
	"grid-area",
	"grid-auto-columns",
	"grid-auto-flow",
	"grid-auto-position",
	"grid-auto-rows",
	"grid-before",
	"grid-column",
	"grid-column-start",
	"grid-column-end",
	"grid-columns",
	"grid-end",
	"grid-row",
	"grid-row-start",
	"grid-row-end",
	"grid-rows",
	"grid-start",
	"grid-template",
	"grid-template-areas",
	"grid-template-rows",
	"grid-template-columns",
	"hanging-punctuation",
	"height",
	"highlight",
	"hyphenate-after",
	"hyphenate-before",
	"hyphenate-character",
	"hyphenate-limit-after",
	"hyphenate-limit-before",
	"hyphenate-limit-lines",
	"hyphenate-lines",
	"hyphenate-resource",
	"hyphens",
	"icon",
	"image-orientation",
	"image-rendering",
	"image-resolution",
	"ime-mode",
	"initial-letters",
	"inline-box-align",
	"inline-size",
	"isolation",
	"justify-content",
	"justify-items",
	"justify-self",
	"kerning",
	"@keyframes",
	"keyframes",
	"left",
	"letter-spacing",
	"lighting-color",
	"line-align",
	"line-box-contain",
	"line-break",
	"line-clamp",
	"line-grid",
	"line-height",
	"line-snap",
	"line-stacking",
	"line-stacking-ruby",
	"line-stacking-shift",
	"line-stacking-strategy",
	"list-style",
	"list-style-image",
	"list-style-position",
	"list-style-type",
	"locale",
	"logical-height",
	"logical-width",
	"margin",
	"margin-after",
	"margin-after-collapse",
	"margin-before",
	"margin-before-collapse",
	"margin-block-end",
	"margin-block-start",
	"margin-bottom",
	"margin-bottom-collapse",
	"margin-collapse",
	"margin-end",
	"margin-inline-end",
	"margin-inline-start",
	"margin-left",
	"margin-right",
	"margin-start",
	"margin-top",
	"margin-top-collapse",
	"mark",
	"mark-after",
	"mark-before",
	"marker",
	"marker-end",
	"marker-mid",
	"marker-offset",
	"marker-side",
	"marker-start",
	"marks",
	"marquee",
	"marquee-direction",
	"marquee-increment",
	"marquee-play-count",
	"marquee-repetition",
	"marquee-speed",
	"marquee-style",
	"mask",
	"mask-box",
	"mask-box-image",
	"mask-box-image-outset",
	"mask-box-image-repeat",
	"mask-box-image-slice",
	"mask-box-image-source",
	"mask-box-image-width",
	"mask-box-outset",
	"mask-box-repeat",
	"mask-box-slice",
	"mask-box-source",
	"mask-box-width",
	"mask-clip",
	"mask-composite",
	"mask-image",
	"mask-origin",
	"mask-position",
	"mask-position-x",
	"mask-position-y",
	"mask-repeat",
	"mask-repeat-x",
	"mask-repeat-y",
	"mask-size",
	"mask-source-type",
	"mask-type",
	"max-block-size",
	"max-height",
	"max-inline-size",
	"max-logical-height",
	"max-logical-width",
	"max-lines",
	"max-width",
	"max-zoom",
	"min-block-size",
	"min-height",
	"min-inline-size",
	"min-logical-height",
	"min-logical-width",
	"min-width",
	"min-zoom",
	"mix-blend-mode",
	"move-to",
	"nav-down",
	"nav-index",
	"nav-left",
	"nav-right",
	"nav-up",
	"negative",
	"object-fit",
	"object-position",
	"offset-block-end",
	"offset-block-start",
	"offset-inline-end",
	"offset-inline-start",
	"opacity",
	"order",
	"orientation",
	"orphans",
	"outline",
	"outline-color",
	"outline-offset",
	"outline-style",
	"outline-width",
	"overflow",
	"overflow-style",
	"overflow-wrap",
	"overflow-x",
	"overflow-y",
	"pad",
	"padding",
	"padding-after",
	"padding-before",
	"padding-block-end",
	"padding-block-start",
	"padding-bottom",
	"padding-end",
	"padding-inline-end",
	"padding-inline-start",
	"padding-left",
	"padding-right",
	"padding-start",
	"padding-top",
	"page",
	"page-break-after",
	"page-break-before",
	"page-break-inside",
	"page-policy",
	"paint-order",
	"pause",
	"pause-after",
	"pause-before",
	"perspective",
	"perspective-origin",
	"perspective-origin-x",
	"perspective-origin-y",
	"pitch",
	"pitch-range",
	"phonemes",
	"play-during",
	"pointer-events",
	"position",
	"prefix",
	"presentation-level",
	"print-color-adjust",
	"punctuation-trim",
	"quotes",
	"range",
	"region-break-after",
	"region-break-before",
	"region-break-inside",
	"region-fragment",
	"region-overflow",
	"rendering-intent",
	"resize",
	"rest",
	"rest-after",
	"rest-before",
	"richness",
	"right",
	"rotation",
	"rotation-point",
	"row-gap",
	"rtl-ordering",
	"ruby-align",
	"ruby-merge",
	"ruby-overhang",
	"ruby-position",
	"ruby-span",
	"scroll-behavior",
	"scroll-snap-coordinate",
	"scroll-snap-destination",
	"scroll-snap-points-x",
	"scroll-snap-points-y",
	"scroll-snap-type",
	"scroll-snap-type-x",
	"scroll-snap-type-y",
	"shape-image-threshold",
	"shape-inside",
	"shape-margin",
	"shape-outside",
	"shape-padding",
	"shape-rendering",
	"size",
	"speak",
	"speak-as",
	"speak-header",
	"speak-numeral",
	"speak-punctuation",
	"speech-rate",
	"src",
	"stop-color",
	"stop-opacity",
	"stress",
	"string-set",
	"stroke",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"stroke-opacity",
	"stroke-width",
	"suffix",
	"symbols",
	"system",
	"svg-shadow",
	"table-layout",
	"tab-size",
	"tap-highlight-color",
	"target",
	"target-name",
	"target-new",
	"target-position",
	"text-align",
	"text-align-last",
	"text-anchor",
	"text-combine",
	"text-combine-upright",
	"text-decoration",
	"text-decoration-color",
	"text-decoration-line",
	"text-decoration-skip",
	"text-decoration-style",
	"text-decorations-in-effect",
	"text-emphasis",
	"text-emphasis-color",
	"text-emphasis-position",
	"text-emphasis-style",
	"text-fill-color",
	"text-height",
	"text-indent",
	"text-justify",
	"text-line-through-color",
	"text-line-through-mode",
	"text-line-through-style",
	"text-line-through-width",
	"text-orientation",
	"text-outline",
	"text-overflow",
	"text-overline-color",
	"text-overline-mode",
	"text-overline-style",
	"text-overline-width",
	"text-rendering",
	"text-rendering",
	"text-security",
	"text-shadow",
	"text-size-adjust",
	"text-shadow",
	"text-space-collapse",
	"text-stroke",
	"text-stroke-color",
	"text-stroke-width",
	"text-transform",
	"text-underline-color",
	"text-underline-mode",
	"text-underline-position",
	"text-underline-style",
	"text-underline-width",
	"text-wrap",
	"top",
	"touch-action",
	"touch-action-delay",
	"transform",
	"transform-box",
	"transform-origin",
	"transform-origin-x",
	"transform-origin-y",
	"transform-origin-z",
	"transform-style",
	"transition",
	"transition-delay",
	"transition-duration",
	"transition-property",
	"transition-timing-function",
	"unicode-bidi",
	"unicode-range",
	"user-drag",
	"user-modify",
	"user-select",
	"user-zoom",
	"vector-effect",
	"vertical-align",
	"visibility",
	"voice-balance",
	"voice-duration",
	"voice-family",
	"voice-pitch",
	"voice-pitch-range",
	"voice-range",
	"voice-rate",
	"voice-stress",
	"voice-volume",
	"volume",
	"white-space",
	"widows",
	"width",
	"will-change",
	"word-break",
	"word-spacing",
	"word-wrap",
	"wrap-flow",
	"wrap-through",
	"writing-mode",
	"z-index",
	"zoom"
];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = capitalize;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
  rsUpper + '+' + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = kebabCase;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = [
	"aliceblue",
	"f0f8ff",
	"antiquewhite",
	"faebd7",
	"aqua",
	"00ffff",
	"aquamarine",
	"7fffd4",
	"azure",
	"f0ffff",
	"beige",
	"f5f5dc",
	"bisque",
	"ffe4c4",
	"black",
	"000000",
	"blanchedalmond",
	"ffebcd",
	"blue",
	"0000ff",
	"blueviolet",
	"8a2be2",
	"brown",
	"a52a2a",
	"burlywood",
	"deb887",
	"cadetblue",
	"5f9ea0",
	"chartreuse",
	"7fff00",
	"chocolate",
	"d2691e",
	"coral",
	"ff7f50",
	"cornflowerblue",
	"6495ed",
	"cornsilk",
	"fff8dc",
	"crimson",
	"dc143c",
	"cyan",
	"00ffff",
	"darkblue",
	"00008b",
	"darkcyan",
	"008b8b",
	"darkgoldenrod",
	"b8860b",
	"darkgray",
	"a9a9a9",
	"darkgrey",
	"a9a9a9",
	"darkgreen",
	"006400",
	"darkkhaki",
	"bdb76b",
	"darkmagenta",
	"8b008b",
	"darkolivegreen",
	"556b2f",
	"darkorange",
	"ff8c00",
	"darkorchid",
	"9932cc",
	"darkred",
	"8b0000",
	"darksalmon",
	"e9967a",
	"darkseagreen",
	"8fbc8f",
	"darkslateblue",
	"483d8b",
	"darkslategray",
	"2f4f4f",
	"darkslategrey",
	"2f4f4f",
	"darkturquoise",
	"00ced1",
	"darkviolet",
	"9400d3",
	"deeppink",
	"ff1493",
	"deepskyblue",
	"00bfff",
	"dimgray",
	"696969",
	"dimgrey",
	"696969",
	"dodgerblue",
	"1e90ff",
	"firebrick",
	"b22222",
	"floralwhite",
	"fffaf0",
	"forestgreen",
	"228b22",
	"fuchsia",
	"ff00ff",
	"gainsboro",
	"dcdcdc",
	"ghostwhite",
	"f8f8ff",
	"gold",
	"ffd700",
	"goldenrod",
	"daa520",
	"gray",
	"808080",
	"grey",
	"808080",
	"green",
	"008000",
	"greenyellow",
	"adff2f",
	"honeydew",
	"f0fff0",
	"hotpink",
	"ff69b4",
	"indianred",
	"cd5c5c",
	"indigo",
	"4b0082",
	"ivory",
	"fffff0",
	"khaki",
	"f0e68c",
	"lavender",
	"e6e6fa",
	"lavenderblush",
	"fff0f5",
	"lawngreen",
	"7cfc00",
	"lemonchiffon",
	"fffacd",
	"lightblue",
	"add8e6",
	"lightcoral",
	"f08080",
	"lightcyan",
	"e0ffff",
	"lightgoldenrodyellow",
	"fafad2",
	"lightgray",
	"d3d3d3",
	"lightgrey",
	"d3d3d3",
	"lightgreen",
	"90ee90",
	"lightpink",
	"ffb6c1",
	"lightsalmon",
	"ffa07a",
	"lightseagreen",
	"20b2aa",
	"lightskyblue",
	"87cefa",
	"lightslategray",
	"778899",
	"lightslategrey",
	"778899",
	"lightsteelblue",
	"b0c4de",
	"lightyellow",
	"ffffe0",
	"lime",
	"00ff00",
	"limegreen",
	"32cd32",
	"linen",
	"faf0e6",
	"magenta",
	"ff00ff",
	"maroon",
	"800000",
	"mediumaquamarine",
	"66cdaa",
	"mediumblue",
	"0000cd",
	"mediumorchid",
	"ba55d3",
	"mediumpurple",
	"9370d8",
	"mediumseagreen",
	"3cb371",
	"mediumslateblue",
	"7b68ee",
	"mediumspringgreen",
	"00fa9a",
	"mediumturquoise",
	"48d1cc",
	"mediumvioletred",
	"c71585",
	"midnightblue",
	"191970",
	"mintcream",
	"f5fffa",
	"mistyrose",
	"ffe4e1",
	"moccasin",
	"ffe4b5",
	"navajowhite",
	"ffdead",
	"navy",
	"000080",
	"oldlace",
	"fdf5e6",
	"olive",
	"808000",
	"olivedrab",
	"6b8e23",
	"orange",
	"ffa500",
	"orangered",
	"ff4500",
	"orchid",
	"da70d6",
	"palegoldenrod",
	"eee8aa",
	"palegreen",
	"98fb98",
	"paleturquoise",
	"afeeee",
	"palevioletred",
	"d87093",
	"papayawhip",
	"ffefd5",
	"peachpuff",
	"ffdab9",
	"peru",
	"cd853f",
	"pink",
	"ffc0cb",
	"plum",
	"dda0dd",
	"powderblue",
	"b0e0e6",
	"purple",
	"800080",
	"rebeccapurple",
	"663399",
	"red",
	"ff0000",
	"rosybrown",
	"bc8f8f",
	"royalblue",
	"4169e1",
	"saddlebrown",
	"8b4513",
	"salmon",
	"fa8072",
	"sandybrown",
	"f4a460",
	"seagreen",
	"2e8b57",
	"seashell",
	"fff5ee",
	"sienna",
	"a0522d",
	"silver",
	"c0c0c0",
	"skyblue",
	"87ceeb",
	"slateblue",
	"6a5acd",
	"slategray",
	"708090",
	"slategrey",
	"708090",
	"snow",
	"fffafa",
	"springgreen",
	"00ff7f",
	"steelblue",
	"4682b4",
	"tan",
	"d2b48c",
	"teal",
	"008080",
	"thistle",
	"d8bfd8",
	"tomato",
	"ff6347",
	"turquoise",
	"40e0d0",
	"violet",
	"ee82ee",
	"wheat",
	"f5deb3",
	"white",
	"ffffff",
	"whitesmoke",
	"f5f5f5",
	"yellow",
	"ffff00",
	"yellowgreen",
	"9acd32"
];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gonzales"] = factory();
	else
		root["gonzales"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Node = __webpack_require__(1);
	var parse = __webpack_require__(7);

	module.exports = {
	  createNode: function (options) {
	    return new Node(options);
	  },
	  parse: parse
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @param {string} type
	 * @param {array|string} content
	 * @param {number} line
	 * @param {number} column
	 * @constructor
	 */

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Node = (function () {
	  function Node(options) {
	    _classCallCheck(this, Node);

	    this.type = options.type;
	    this.content = options.content;
	    this.syntax = options.syntax;

	    if (options.start) this.start = options.start;
	    if (options.end) this.end = options.end;
	  }

	  /**
	   * @param {String} type Node type
	   * @return {Boolean} Whether there is a child node of given type
	   */

	  Node.prototype.contains = function contains(type) {
	    return this.content.some(function (node) {
	      return node.type === type;
	    });
	  };

	  /**
	   * @param {String} type Node type
	   * @param {Function} callback Function to call for every found node
	   */

	  Node.prototype.eachFor = function eachFor(type, callback) {
	    if (!Array.isArray(this.content)) return;

	    if (typeof type !== 'string') {
	      callback = type;
	      type = null;
	    }

	    var l = this.content.length;
	    var breakLoop;

	    for (var i = l; i--;) {
	      if (breakLoop === null) break;

	      if (!type || this.content[i] && this.content[i].type === type) breakLoop = callback(this.content[i], i, this);
	    }

	    if (breakLoop === null) return null;
	  };

	  /**
	   * @param {String} type
	   * @return {?Node} First child node or `null` if nothing's been found.
	   */

	  Node.prototype.first = function first(type) {
	    if (!Array.isArray(this.content)) return null;

	    if (!type) return this.content[0];

	    var i = 0;
	    var l = this.content.length;

	    for (; i < l; i++) {
	      if (this.content[i].type === type) return this.content[i];
	    }

	    return null;
	  };

	  /**
	   * @param {String} type Node type
	   * @param {Function} callback Function to call for every found node
	   */

	  Node.prototype.forEach = function forEach(type, callback) {
	    if (!Array.isArray(this.content)) return;

	    if (typeof type !== 'string') {
	      callback = type;
	      type = null;
	    }

	    var i = 0;
	    var l = this.content.length;
	    var breakLoop;

	    for (; i < l; i++) {
	      if (breakLoop === null) break;

	      if (!type || this.content[i] && this.content[i].type === type) breakLoop = callback(this.content[i], i, this);
	    }

	    if (breakLoop === null) return null;
	  };

	  /**
	   * @param {Number} index
	   * @return {?Node}
	   */

	  Node.prototype.get = function get(index) {
	    if (!Array.isArray(this.content)) return null;

	    var node = this.content[index];
	    return node ? node : null;
	  };

	  /**
	   * @param {Number} index
	   * @param {Node} node
	   */

	  Node.prototype.insert = function insert(index, node) {
	    if (!Array.isArray(this.content)) return;

	    this.content.splice(index, 0, node);
	  };

	  /**
	   * @param {String} type
	   * @return {Boolean} Whether the node is of given type
	   */

	  Node.prototype.is = function is(type) {
	    return this.type === type;
	  };

	  /**
	   * @param {String} type
	   * @return {?Node} Last child node or `null` if nothing's been found.
	   */

	  Node.prototype.last = function last(type) {
	    if (!Array.isArray(this.content)) return null;

	    var i = this.content.length;
	    if (!type) return this.content[i - 1];

	    for (; i--;) {
	      if (this.content[i].type === type) return this.content[i];
	    }

	    return null;
	  };

	  /**
	   * Number of child nodes.
	   * @type {number}
	   */

	  /**
	   * @param {Number} index
	   * @return {Node}
	   */

	  Node.prototype.removeChild = function removeChild(index) {
	    if (!Array.isArray(this.content)) return;

	    var removedChild = this.content.splice(index, 1);

	    return removedChild;
	  };

	  Node.prototype.toJson = function toJson() {
	    return JSON.stringify(this, false, 2);
	  };

	  Node.prototype.toString = function toString() {
	    var stringify = undefined;

	    try {
	      stringify = __webpack_require__(2)("./" + this.syntax + '/stringify');
	    } catch (e) {
	      var message = 'Syntax "' + this.syntax + '" is not supported yet, sorry';
	      return console.error(message);
	    }

	    return stringify(this);
	  };

	  /**
	   * @param {Function} callback
	   */

	  Node.prototype.traverse = function traverse(callback, index) {
	    var level = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	    var parent = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	    var breakLoop;
	    var x;

	    level++;

	    callback(this, index, parent, level);

	    if (!Array.isArray(this.content)) return;

	    for (var i = 0, l = this.content.length; i < l; i++) {
	      breakLoop = this.content[i].traverse(callback, i, level, this);
	      if (breakLoop === null) break;

	      // If some nodes were removed or added:
	      if (x = this.content.length - l) {
	        l += x;
	        i += x;
	      }
	    }

	    if (breakLoop === null) return null;
	  };

	  Node.prototype.traverseByType = function traverseByType(type, callback) {
	    this.traverse(function (node) {
	      if (node.type === type) callback.apply(node, arguments);
	    });
	  };

	  Node.prototype.traverseByTypes = function traverseByTypes(types, callback) {
	    this.traverse(function (node) {
	      if (types.indexOf(node.type) !== -1) callback.apply(node, arguments);
	    });
	  };

	  _createClass(Node, [{
	    key: 'length',
	    get: function () {
	      if (!Array.isArray(this.content)) return 0;
	      return this.content.length;
	    }
	  }]);

	  return Node;
	})();

	module.exports = Node;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./css/stringify": 3,
		"./less/stringify": 4,
		"./sass/stringify": 5,
		"./scss/stringify": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function stringify(tree) {
	  // TODO: Better error message
	  if (!tree) throw new Error('We need tree to translate');

	  function _t(tree) {
	    var type = tree.type;
	    if (_unique[type]) return _unique[type](tree);
	    if (typeof tree.content === 'string') return tree.content;
	    if (Array.isArray(tree.content)) return _composite(tree.content);
	    return '';
	  }

	  function _composite(t, i) {
	    if (!t) return '';

	    var s = '';
	    i = i || 0;
	    for (; i < t.length; i++) s += _t(t[i]);
	    return s;
	  }

	  var _unique = {
	    'arguments': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'atkeyword': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'attributeSelector': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'block': function (t) {
	      return '{' + _composite(t.content) + '}';
	    },
	    'brackets': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'class': function (t) {
	      return '.' + _composite(t.content);
	    },
	    'color': function (t) {
	      return '#' + t.content;
	    },
	    'expression': function (t) {
	      return 'expression(' + t.content + ')';
	    },
	    'id': function (t) {
	      return '#' + _composite(t.content);
	    },
	    'multilineComment': function (t) {
	      return '/*' + t.content + '*/';
	    },
	    'nthSelector': function (t) {
	      return ':' + _t(t.content[0]) + '(' + _composite(t.content.slice(1)) + ')';
	    },
	    'parentheses': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'percentage': function (t) {
	      return _composite(t.content) + '%';
	    },
	    'pseudoClass': function (t) {
	      return ':' + _composite(t.content);
	    },
	    'pseudoElement': function (t) {
	      return '::' + _composite(t.content);
	    },
	    'uri': function (t) {
	      return 'url(' + _composite(t.content) + ')';
	    }
	  };

	  return _t(tree);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function stringify(tree) {
	  // TODO: Better error message
	  if (!tree) throw new Error('We need tree to translate');

	  function _t(tree) {
	    var type = tree.type;
	    if (_unique[type]) return _unique[type](tree);
	    if (typeof tree.content === 'string') return tree.content;
	    if (Array.isArray(tree.content)) return _composite(tree.content);
	    return '';
	  }

	  function _composite(t, i) {
	    if (!t) return '';

	    var s = '';
	    i = i || 0;
	    for (; i < t.length; i++) s += _t(t[i]);
	    return s;
	  }

	  var _unique = {
	    'arguments': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'atkeyword': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'attributeSelector': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'block': function (t) {
	      return '{' + _composite(t.content) + '}';
	    },
	    'brackets': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'class': function (t) {
	      return '.' + _composite(t.content);
	    },
	    'color': function (t) {
	      return '#' + t.content;
	    },
	    'escapedString': function (t) {
	      return '~' + t.content;
	    },
	    'expression': function (t) {
	      return 'expression(' + t.content + ')';
	    },
	    'id': function (t) {
	      return '#' + _composite(t.content);
	    },
	    'interpolatedVariable': function (t) {
	      return '@{' + _composite(t.content) + '}';
	    },
	    'multilineComment': function (t) {
	      return '/*' + t.content + '*/';
	    },
	    'nthSelector': function (t) {
	      return ':' + _t(t.content[0]) + '(' + _composite(t.content.slice(1)) + ')';
	    },
	    'parentheses': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'percentage': function (t) {
	      return _composite(t.content) + '%';
	    },
	    'pseudoClass': function (t) {
	      return ':' + _composite(t.content);
	    },
	    'pseudoElement': function (t) {
	      return '::' + _composite(t.content);
	    },
	    'singlelineComment': function (t) {
	      return '/' + '/' + t.content;
	    },
	    'uri': function (t) {
	      return 'url(' + _composite(t.content) + ')';
	    },
	    'variable': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'variablesList': function (t) {
	      return _composite(t.content) + '...';
	    }
	  };

	  return _t(tree);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function stringify(tree) {
	  // TODO: Better error message
	  if (!tree) throw new Error('We need tree to translate');

	  function _t(tree) {
	    var type = tree.type;
	    if (_unique[type]) return _unique[type](tree);
	    if (typeof tree.content === 'string') return tree.content;
	    if (Array.isArray(tree.content)) return _composite(tree.content);
	    return '';
	  }

	  function _composite(t, i) {
	    if (!t) return '';

	    var s = '';
	    i = i || 0;
	    for (; i < t.length; i++) s += _t(t[i]);
	    return s;
	  }

	  var _unique = {
	    'arguments': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'atkeyword': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'attributeSelector': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'block': function (t) {
	      return _composite(t.content);
	    },
	    'brackets': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'class': function (t) {
	      return '.' + _composite(t.content);
	    },
	    'color': function (t) {
	      return '#' + t.content;
	    },
	    'expression': function (t) {
	      return 'expression(' + t.content + ')';
	    },
	    'id': function (t) {
	      return '#' + _composite(t.content);
	    },
	    'interpolation': function (t) {
	      return '#{' + _composite(t.content) + '}';
	    },
	    'multilineComment': function (t) {
	      return '/*' + t.content;
	    },
	    'nthSelector': function (t) {
	      return ':' + _t(t.content[0]) + '(' + _composite(t.content.slice(1)) + ')';
	    },
	    'parentheses': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'percentage': function (t) {
	      return _composite(t.content) + '%';
	    },
	    'placeholder': function (t) {
	      return '%' + _composite(t.content);
	    },
	    'pseudoClass': function (t) {
	      return ':' + _composite(t.content);
	    },
	    'pseudoElement': function (t) {
	      return '::' + _composite(t.content);
	    },
	    'singlelineComment': function (t) {
	      return '/' + '/' + t.content;
	    },
	    'uri': function (t) {
	      return 'url(' + _composite(t.content) + ')';
	    },
	    'variable': function (t) {
	      return '$' + _composite(t.content);
	    },
	    'variablesList': function (t) {
	      return _composite(t.content) + '...';
	    }
	  };

	  return _t(tree);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function stringify(tree) {
	  // TODO: Better error message
	  if (!tree) throw new Error('We need tree to translate');

	  function _t(tree) {
	    var type = tree.type;
	    if (_unique[type]) return _unique[type](tree);
	    if (typeof tree.content === 'string') return tree.content;
	    if (Array.isArray(tree.content)) return _composite(tree.content);
	    return '';
	  }

	  function _composite(t, i) {
	    if (!t) return '';

	    var s = '';
	    i = i || 0;
	    for (; i < t.length; i++) s += _t(t[i]);
	    return s;
	  }

	  var _unique = {
	    'arguments': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'atkeyword': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'attributeSelector': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'block': function (t) {
	      return '{' + _composite(t.content) + '}';
	    },
	    'brackets': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'class': function (t) {
	      return '.' + _composite(t.content);
	    },
	    'color': function (t) {
	      return '#' + t.content;
	    },
	    'expression': function (t) {
	      return 'expression(' + t.content + ')';
	    },
	    'id': function (t) {
	      return '#' + _composite(t.content);
	    },
	    'interpolation': function (t) {
	      return '#{' + _composite(t.content) + '}';
	    },
	    'multilineComment': function (t) {
	      return '/*' + t.content + '*/';
	    },
	    'nthSelector': function (t) {
	      return ':' + _t(t.content[0]) + '(' + _composite(t.content.slice(1)) + ')';
	    },
	    'parentheses': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'percentage': function (t) {
	      return _composite(t.content) + '%';
	    },
	    'placeholder': function (t) {
	      return '%' + _composite(t.content);
	    },
	    'pseudoClass': function (t) {
	      return ':' + _composite(t.content);
	    },
	    'pseudoElement': function (t) {
	      return '::' + _composite(t.content);
	    },
	    'singlelineComment': function (t) {
	      return '/' + '/' + t.content;
	    },
	    'uri': function (t) {
	      return 'url(' + _composite(t.content) + ')';
	    },
	    'variable': function (t) {
	      return '$' + _composite(t.content);
	    },
	    'variablesList': function (t) {
	      return _composite(t.content) + '...';
	    }
	  };

	  return _t(tree);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ParsingError = __webpack_require__(8);
	var syntaxes = __webpack_require__(10);

	var isInteger = Number.isInteger || function (value) {
	  return typeof value === 'number' && Math.floor(value) === value;
	};

	/**
	 * @param {String} css
	 * @param {Object} options
	 * @return {Object} AST
	 */
	function parser(css, options) {
	  if (typeof css !== 'string') throw new Error('Please, pass a string to parse');else if (!css) return __webpack_require__(29)();

	  var syntax = options && options.syntax || 'css';
	  var context = options && options.context || 'stylesheet';
	  var tabSize = options && options.tabSize;
	  if (!isInteger(tabSize) || tabSize < 1) tabSize = 1;

	  var syntaxParser = syntaxes[syntax];

	  if (!syntaxParser) {
	    var message = 'Syntax "' + syntax + '" is not supported yet, sorry';
	    return console.error(message);
	  }

	  var getTokens = syntaxParser.tokenizer;
	  var mark = syntaxParser.mark;
	  var parse = syntaxParser.parse;

	  var tokens = getTokens(css, tabSize);
	  mark(tokens);

	  var ast;
	  try {
	    ast = parse(tokens, context);
	  } catch (e) {
	    if (!e.syntax) throw e;
	    throw new ParsingError(e, css);
	  }

	  return ast;
	}

	module.exports = parser;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var parserPackage = __webpack_require__(9);

	/**
	 * @param {Error} e
	 * @param {String} css
	 */
	function ParsingError(e, css) {
	  this.line = e.line;
	  this.syntax = e.syntax;
	  this.css_ = css;
	}

	ParsingError.prototype = Object.defineProperties({
	  /**
	   * @type {String}
	   * @private
	   */
	  customMessage_: '',

	  /**
	   * @type {Number}
	   */
	  line: null,

	  /**
	   * @type {String}
	   */
	  name: 'Parsing error',

	  /**
	   * @type {String}
	   */
	  syntax: null,

	  /**
	   * @type {String}
	   */
	  version: parserPackage.version,

	  /**
	   * @return {String}
	   */
	  toString: function () {
	    return [this.name + ': ' + this.message, '', this.context, '', 'Syntax: ' + this.syntax, 'Gonzales PE version: ' + this.version].join('\n');
	  }
	}, {
	  context: { /**
	              * @type {String}
	              */

	    get: function () {
	      var LINES_AROUND = 2;

	      var result = [];
	      var currentLineNumber = this.line;
	      var start = currentLineNumber - 1 - LINES_AROUND;
	      var end = currentLineNumber + LINES_AROUND;
	      var lines = this.css_.split(/\r\n|\r|\n/);

	      for (var i = start; i < end; i++) {
	        var line = lines[i];
	        if (!line) continue;
	        var ln = i + 1;
	        var mark = ln === currentLineNumber ? '*' : ' ';
	        result.push(ln + mark + '| ' + line);
	      }

	      return result.join('\n');
	    },
	    configurable: true,
	    enumerable: true
	  },
	  message: {

	    /**
	     * @type {String}
	     */

	    get: function () {
	      if (this.customMessage_) {
	        return this.customMessage_;
	      } else {
	        var message = 'Please check validity of the block';
	        if (typeof this.line === 'number') message += ' starting from line #' + this.line;
	        return message;
	      }
	    },
	    set: function (message) {
	      this.customMessage_ = message;
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	module.exports = ParsingError;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
		"name": "gonzales-pe",
		"description": "Gonzales Preprocessor Edition (fast CSS parser)",
		"version": "3.4.7",
		"homepage": "http://github.com/tonyganch/gonzales-pe",
		"bugs": "http://github.com/tonyganch/gonzales-pe/issues",
		"license": "MIT",
		"author": {
			"name": "Tony Ganch",
			"email": "tonyganch+github@gmail.com",
			"url": "http://tonyganch.com"
		},
		"main": "./lib/gonzales",
		"repository": {
			"type": "git",
			"url": "http://github.com/tonyganch/gonzales-pe.git"
		},
		"scripts": {
			"autofix-tests": "bash ./scripts/build.sh && bash ./scripts/autofix-tests.sh",
			"build": "bash ./scripts/build.sh",
			"init": "bash ./scripts/init.sh",
			"lint": "bash ./scripts/lint.sh",
			"log": "bash ./scripts/log.sh",
			"prepublish": "bash ./scripts/prepublish.sh",
			"postpublish": "bash ./scripts/postpublish.sh",
			"test": "bash ./scripts/test.sh",
			"watch": "bash ./scripts/watch.sh"
		},
		"bin": {
			"gonzales": "./bin/gonzales.js"
		},
		"dependencies": {
			"minimist": "1.1.x"
		},
		"devDependencies": {
			"babel-loader": "^5.3.2",
			"coffee-script": "~1.7.1",
			"eslint": "^3.0.0",
			"jscs": "2.1.0",
			"jshint": "2.8.0",
			"json-loader": "^0.5.3",
			"mocha": "2.2.x",
			"webpack": "^1.12.2",
			"webpack-closure-compiler": "^2.0.2"
		},
		"engines": {
			"node": ">=0.6.0"
		}
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  css: __webpack_require__(11),
	  less: __webpack_require__(17),
	  sass: __webpack_require__(21),
	  scss: __webpack_require__(25)
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
	  mark: __webpack_require__(12),
	  parse: __webpack_require__(14),
	  stringify: __webpack_require__(3),
	  tokenizer: __webpack_require__(16)
	};
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TokenType = __webpack_require__(13);

	/**
	 * Mark whitespaces and comments
	 * @param {Array} tokens
	 */
	function markSpacesAndComments(tokens) {
	  var tokensLength = tokens.length;
	  var spaces = [-1, -1];
	  var type; // Current token's type

	  // For every token in the token list, mark spaces and line breaks
	  // as spaces (set both `ws` and `sc` flags). Mark multiline comments
	  // with `sc` flag.
	  // If there are several spaces or tabs or line breaks or multiline
	  // comments in a row, group them: take the last one's index number
	  // and save it to the first token in the group as a reference:
	  // e.g., `ws_last = 7` for a group of whitespaces or `sc_last = 9`
	  // for a group of whitespaces and comments.
	  for (var i = 0; i < tokensLength; i++) {
	    type = tokens[i].type;

	    if (type === TokenType.Space || type === TokenType.Tab || type === TokenType.Newline) {
	      markSpace(tokens, i, spaces);
	    } else if (type === TokenType.CommentML) {
	      markComment(tokens, i, spaces);
	    } else {
	      markEndOfSpacesAndComments(tokens, i, spaces);
	    }
	  }

	  markEndOfSpacesAndComments(tokens, i, spaces);
	}

	function markSpace(tokens, i, spaces) {
	  var token = tokens[i];
	  token.ws = true;
	  token.sc = true;

	  if (spaces[0] === -1) spaces[0] = i;
	  if (spaces[1] === -1) spaces[1] = i;
	}

	function markComment(tokens, i, spaces) {
	  var ws = spaces[0];
	  tokens[i].sc = true;

	  if (ws !== -1) {
	    tokens[ws].ws_last = i - 1;
	    spaces[0] = -1;
	  }
	}

	function markEndOfSpacesAndComments(tokens, i, spaces) {
	  var ws = spaces[0];
	  var sc = spaces[1];
	  if (ws !== -1) {
	    tokens[ws].ws_last = i - 1;
	    spaces[0] = -1;
	  }
	  if (sc !== -1) {
	    tokens[sc].sc_last = i - 1;
	    spaces[1] = -1;
	  }
	}

	/**
	 * Pair brackets
	 * @param {Array} tokens
	 */
	function markBrackets(tokens) {
	  var tokensLength = tokens.length;
	  var ps = []; // Parentheses
	  var sbs = []; // Square brackets
	  var cbs = []; // Curly brackets
	  var t = undefined; // Current token

	  // For every token in the token list, if we meet an opening (left)
	  // bracket, push its index number to a corresponding array.
	  // If we then meet a closing (right) bracket, look at the corresponding
	  // array. If there are any elements (records about previously met
	  // left brackets), take a token of the last left bracket (take
	  // the last index number from the array and find a token with
	  // this index number) and save right bracket's index as a reference:
	  for (var i = 0; i < tokensLength; i++) {
	    t = tokens[i];
	    var type = t.type;

	    if (type === TokenType.LeftParenthesis) {
	      ps.push(i);
	    } else if (type === TokenType.RightParenthesis) {
	      if (ps.length) {
	        t.left = ps.pop();
	        tokens[t.left].right = i;
	      }
	    } else if (type === TokenType.LeftSquareBracket) {
	      sbs.push(i);
	    } else if (type === TokenType.RightSquareBracket) {
	      if (sbs.length) {
	        t.left = sbs.pop();
	        tokens[t.left].right = i;
	      }
	    } else if (type === TokenType.LeftCurlyBracket) {
	      cbs.push(i);
	    } else if (type === TokenType.RightCurlyBracket) {
	      if (cbs.length) {
	        t.left = cbs.pop();
	        tokens[t.left].right = i;
	      }
	    }
	  }
	}

	/**
	 * @param {Array} tokens
	 */
	function markTokens(tokens) {
	  // Mark paired brackets:
	  markBrackets(tokens);
	  // Mark whitespaces and comments:
	  markSpacesAndComments(tokens);
	}

	module.exports = markTokens;

/***/ },
/* 13 */
/***/ function(module, exports) {

	// jscs:disable

	'use strict';

	module.exports = {
	    StringSQ: 'StringSQ',
	    StringDQ: 'StringDQ',
	    CommentML: 'CommentML',
	    CommentSL: 'CommentSL',

	    Newline: 'Newline',
	    Space: 'Space',
	    Tab: 'Tab',

	    ExclamationMark: 'ExclamationMark', // !
	    QuotationMark: 'QuotationMark', // "
	    NumberSign: 'NumberSign', // #
	    DollarSign: 'DollarSign', // $
	    PercentSign: 'PercentSign', // %
	    Ampersand: 'Ampersand', // &
	    Apostrophe: 'Apostrophe', // '
	    LeftParenthesis: 'LeftParenthesis', // (
	    RightParenthesis: 'RightParenthesis', // )
	    Asterisk: 'Asterisk', // *
	    PlusSign: 'PlusSign', // +
	    Comma: 'Comma', // ,
	    HyphenMinus: 'HyphenMinus', // -
	    FullStop: 'FullStop', // .
	    Solidus: 'Solidus', // /
	    Colon: 'Colon', // :
	    Semicolon: 'Semicolon', // ;
	    LessThanSign: 'LessThanSign', // <
	    EqualsSign: 'EqualsSign', // =
	    EqualitySign: 'EqualitySign', // ==
	    InequalitySign: 'InequalitySign', // !=
	    GreaterThanSign: 'GreaterThanSign', // >
	    QuestionMark: 'QuestionMark', // ?
	    CommercialAt: 'CommercialAt', // @
	    LeftSquareBracket: 'LeftSquareBracket', // [
	    ReverseSolidus: 'ReverseSolidus', // \
	    RightSquareBracket: 'RightSquareBracket', // ]
	    CircumflexAccent: 'CircumflexAccent', // ^
	    LowLine: 'LowLine', // _
	    LeftCurlyBracket: 'LeftCurlyBracket', // {
	    VerticalLine: 'VerticalLine', // |
	    RightCurlyBracket: 'RightCurlyBracket', // }
	    Tilde: 'Tilde', // ~

	    Identifier: 'Identifier',
	    DecimalNumber: 'DecimalNumber'
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Node = __webpack_require__(1);
	var NodeType = __webpack_require__(15);
	var TokenType = __webpack_require__(13);

	/**
	 * @type {Array}
	 */
	var tokens;

	/**
	 * @type {Number}
	 */
	var tokensLength;

	/**
	 * @type {Number}
	 */
	var pos;

	var contexts = {
	  'atkeyword': function () {
	    return checkAtkeyword(pos) && getAtkeyword();
	  },
	  'atrule': function () {
	    return checkAtrule(pos) && getAtrule();
	  },
	  'block': function () {
	    return checkBlock(pos) && getBlock();
	  },
	  'brackets': function () {
	    return checkBrackets(pos) && getBrackets();
	  },
	  'class': function () {
	    return checkClass(pos) && getClass();
	  },
	  'combinator': function () {
	    return checkCombinator(pos) && getCombinator();
	  },
	  'commentML': function () {
	    return checkCommentML(pos) && getCommentML();
	  },
	  'declaration': function () {
	    return checkDeclaration(pos) && getDeclaration();
	  },
	  'declDelim': function () {
	    return checkDeclDelim(pos) && getDeclDelim();
	  },
	  'delim': function () {
	    return checkDelim(pos) && getDelim();
	  },
	  'dimension': function () {
	    return checkDimension(pos) && getDimension();
	  },
	  'expression': function () {
	    return checkExpression(pos) && getExpression();
	  },
	  'function': function () {
	    return checkFunction(pos) && getFunction();
	  },
	  'ident': function () {
	    return checkIdent(pos) && getIdent();
	  },
	  'important': function () {
	    return checkImportant(pos) && getImportant();
	  },
	  'namespace': function () {
	    return checkNamespace(pos) && getNamespace();
	  },
	  'number': function () {
	    return checkNumber(pos) && getNumber();
	  },
	  'operator': function () {
	    return checkOperator(pos) && getOperator();
	  },
	  'parentheses': function () {
	    return checkParentheses(pos) && getParentheses();
	  },
	  'percentage': function () {
	    return checkPercentage(pos) && getPercentage();
	  },
	  'progid': function () {
	    return checkProgid(pos) && getProgid();
	  },
	  'property': function () {
	    return checkProperty(pos) && getProperty();
	  },
	  'propertyDelim': function () {
	    return checkPropertyDelim(pos) && getPropertyDelim();
	  },
	  'pseudoc': function () {
	    return checkPseudoc(pos) && getPseudoc();
	  },
	  'pseudoe': function () {
	    return checkPseudoe(pos) && getPseudoe();
	  },
	  'ruleset': function () {
	    return checkRuleset(pos) && getRuleset();
	  },
	  's': function () {
	    return checkS(pos) && getS();
	  },
	  'selector': function () {
	    return checkSelector(pos) && getSelector();
	  },
	  'shash': function () {
	    return checkShash(pos) && getShash();
	  },
	  'string': function () {
	    return checkString(pos) && getString();
	  },
	  'stylesheet': function () {
	    return checkStylesheet(pos) && getStylesheet();
	  },
	  'unary': function () {
	    return checkUnary(pos) && getUnary();
	  },
	  'unicodeRange': function () {
	    return checkUnicodeRange(pos) && getUnicodeRange();
	  },
	  'urange': function () {
	    return checkUrange(pos) && getUrange();
	  },
	  'uri': function () {
	    return checkUri(pos) && getUri();
	  },
	  'value': function () {
	    return checkValue(pos) && getValue();
	  },
	  'vhash': function () {
	    return checkVhash(pos) && getVhash();
	  }
	};

	/**
	 * Stop parsing and display error.
	 * @param {Number=} i Token's index number
	 */
	function throwError(i) {
	  var ln = tokens[i].ln;

	  throw { line: ln, syntax: 'css' };
	}

	/**
	 * @param {Object} exclude
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkExcluding(exclude, i) {
	  var start = i;

	  while (i < tokensLength) {
	    if (exclude[tokens[i++].type]) break;
	  }

	  return i - start - 2;
	}

	/**
	 * @param {Number} start
	 * @param {Number} finish
	 * @return {String}
	 */
	function joinValues(start, finish) {
	  var s = '';

	  for (var i = start; i < finish + 1; i++) {
	    s += tokens[i].value;
	  }

	  return s;
	}

	/**
	 * @param {Number} start
	 * @param {Number} num
	 * @return {String}
	 */
	function joinValues2(start, num) {
	  if (start + num - 1 >= tokensLength) return;

	  var s = '';

	  for (var i = 0; i < num; i++) {
	    s += tokens[start + i].value;
	  }

	  return s;
	}

	function getLastPosition(content, line, column, colOffset) {
	  return typeof content === 'string' ? getLastPositionForString(content, line, column, colOffset) : getLastPositionForArray(content, line, column, colOffset);
	}

	function getLastPositionForString(content, line, column, colOffset) {
	  var position = [];

	  if (!content) {
	    position = [line, column];
	    if (colOffset) position[1] += colOffset - 1;
	    return position;
	  }

	  var lastLinebreak = content.lastIndexOf('\n');
	  var endsWithLinebreak = lastLinebreak === content.length - 1;
	  var splitContent = content.split('\n');
	  var linebreaksCount = splitContent.length - 1;
	  var prevLinebreak = linebreaksCount === 0 || linebreaksCount === 1 ? -1 : content.length - splitContent[linebreaksCount - 1].length - 2;

	  // Line:
	  var offset = endsWithLinebreak ? linebreaksCount - 1 : linebreaksCount;
	  position[0] = line + offset;

	  // Column:
	  if (endsWithLinebreak) {
	    offset = prevLinebreak !== -1 ? content.length - prevLinebreak : content.length - 1;
	  } else {
	    offset = linebreaksCount !== 0 ? content.length - lastLinebreak - column - 1 : content.length - 1;
	  }
	  position[1] = column + offset;

	  if (!colOffset) return position;

	  if (endsWithLinebreak) {
	    position[0]++;
	    position[1] = colOffset;
	  } else {
	    position[1] += colOffset;
	  }

	  return position;
	}

	function getLastPositionForArray(content, line, column, colOffset) {
	  var position;

	  if (content.length === 0) {
	    position = [line, column];
	  } else {
	    var c = content[content.length - 1];
	    if (c.hasOwnProperty('end')) {
	      position = [c.end.line, c.end.column];
	    } else {
	      position = getLastPosition(c.content, line, column);
	    }
	  }

	  if (!colOffset) return position;

	  if (tokens[pos - 1].type !== 'Newline') {
	    position[1] += colOffset;
	  } else {
	    position[0]++;
	    position[1] = 1;
	  }

	  return position;
	}

	function newNode(type, content, line, column, end) {
	  if (!end) end = getLastPosition(content, line, column);
	  return new Node({
	    type: type,
	    content: content,
	    start: {
	      line: line,
	      column: column
	    },
	    end: {
	      line: end[0],
	      column: end[1]
	    },
	    syntax: 'css'
	  });
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkAny(i) {
	  var l;

	  if (l = checkBrackets(i)) tokens[i].any_child = 1;else if (l = checkParentheses(i)) tokens[i].any_child = 2;else if (l = checkString(i)) tokens[i].any_child = 3;else if (l = checkPercentage(i)) tokens[i].any_child = 4;else if (l = checkDimension(i)) tokens[i].any_child = 5;else if (l = checkUnicodeRange(i)) tokens[i].any_child = 13;else if (l = checkNumber(i)) tokens[i].any_child = 6;else if (l = checkUri(i)) tokens[i].any_child = 7;else if (l = checkExpression(i)) tokens[i].any_child = 8;else if (l = checkFunction(i)) tokens[i].any_child = 9;else if (l = checkIdent(i)) tokens[i].any_child = 10;else if (l = checkClass(i)) tokens[i].any_child = 11;else if (l = checkUnary(i)) tokens[i].any_child = 12;

	  return l;
	}

	/**
	 * @return {Node}
	 */
	function getAny() {
	  var childType = tokens[pos].any_child;

	  if (childType === 1) return getBrackets();else if (childType === 2) return getParentheses();else if (childType === 3) return getString();else if (childType === 4) return getPercentage();else if (childType === 5) return getDimension();else if (childType === 13) return getUnicodeRange();else if (childType === 6) return getNumber();else if (childType === 7) return getUri();else if (childType === 8) return getExpression();else if (childType === 9) return getFunction();else if (childType === 10) return getIdent();else if (childType === 11) return getClass();else if (childType === 12) return getUnary();
	}

	/**
	 * Check if token is part of an @-word (e.g. `@import`, `@include`)
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkAtkeyword(i) {
	  var l;

	  // Check that token is `@`:
	  if (i >= tokensLength || tokens[i++].type !== TokenType.CommercialAt) return 0;

	  return (l = checkIdent(i)) ? l + 1 : 0;
	}

	/**
	 * Get node with @-word
	 * @return {Node}
	 */
	function getAtkeyword() {
	  var type = NodeType.AtkeywordType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  pos++;

	  content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a part of an @-rule
	 * @param {Number} i Token's index number
	 * @return {Number} Length of @-rule
	 */
	function checkAtrule(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  // If token already has a record of being part of an @-rule,
	  // return the @-rule's length:
	  if (tokens[i].atrule_l !== undefined) return tokens[i].atrule_l;

	  // If token is part of an @-rule, save the rule's type to token.
	  // @keyframes:
	  if (l = checkKeyframesRule(i)) tokens[i].atrule_type = 4;
	  // @-rule with ruleset:
	  else if (l = checkAtruler(i)) tokens[i].atrule_type = 1;
	    // Block @-rule:
	    else if (l = checkAtruleb(i)) tokens[i].atrule_type = 2;
	      // Single-line @-rule:
	      else if (l = checkAtrules(i)) tokens[i].atrule_type = 3;else return 0;

	  // If token is part of an @-rule, save the rule's length to token:
	  tokens[i].atrule_l = l;

	  return l;
	}

	/**
	 * Get node with @-rule
	 * @return {Node}
	 */
	function getAtrule() {
	  switch (tokens[pos].atrule_type) {
	    case 1:
	      return getAtruler(); // @-rule with ruleset
	    case 2:
	      return getAtruleb(); // Block @-rule
	    case 3:
	      return getAtrules(); // Single-line @-rule
	    case 4:
	      return getKeyframesRule();
	  }
	}

	/**
	 * Check if token is part of a block @-rule
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @-rule
	 */
	function checkAtruleb(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a block @-rule
	 * @return {Node}
	 */
	function getAtruleb() {
	  var type = NodeType.AtruleType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getAtkeyword()].concat(getTsets()).concat([getBlock()]);

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of an @-rule with ruleset
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @-rule
	 */
	function checkAtruler(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  if (i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket) i++;else return 0;

	  if (l = checkAtrulers(i)) i += l;

	  if (i < tokensLength && tokens[i].type === TokenType.RightCurlyBracket) i++;else return 0;

	  return i - start;
	}

	/**
	 * Get node with an @-rule with ruleset
	 * @return {Node}
	 */
	function getAtruler() {
	  var type = NodeType.AtruleType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getAtkeyword()];

	  content = content.concat(getTsets());

	  content.push(getAtrulers());

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkAtrulers(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSC(i)) i += l;

	  while (i < tokensLength) {
	    if (l = checkSC(i)) tokens[i].atrulers_child = 1;else if (l = checkAtrule(i)) tokens[i].atrulers_child = 2;else if (l = checkRuleset(i)) tokens[i].atrulers_child = 3;else break;
	    i += l;
	  }

	  tokens[i].atrulers_end = 1;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getAtrulers() {
	  var type = NodeType.BlockType;
	  var token = tokens[pos++];
	  var line = token.ln;
	  var column = token.col;
	  var content = getSC();

	  while (!tokens[pos].atrulers_end) {
	    var childType = tokens[pos].atrulers_child;
	    if (childType === 1) content = content.concat(getSC());else if (childType === 2) content.push(getAtrule());else if (childType === 3) content.push(getRuleset());
	  }

	  content = content.concat(getSC());

	  var end = getLastPosition(content, line, column, 1);
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkAtrules(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getAtrules() {
	  var type = NodeType.AtruleType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getAtkeyword()].concat(getTsets());

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of a block (e.g. `{...}`).
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the block
	 */
	function checkBlock(i) {
	  return i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket ? tokens[i].right - i + 1 : 0;
	}

	/**
	 * Get node with a block
	 * @return {Node}
	 */
	function getBlock() {
	  var type = NodeType.BlockType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var end = tokens[pos++].right;
	  var content = [];

	  while (pos < end) {
	    if (checkBlockdecl(pos)) content = content.concat(getBlockdecl());else throwError(pos);
	  }

	  var end_ = getLastPosition(content, line, column, 1);
	  pos = end + 1;

	  return newNode(type, content, line, column, end_);
	}

	/**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the declaration
	 */
	function checkBlockdecl(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkBlockdecl1(i)) tokens[i].bd_type = 1;else if (l = checkBlockdecl2(i)) tokens[i].bd_type = 2;else if (l = checkBlockdecl3(i)) tokens[i].bd_type = 3;else if (l = checkBlockdecl4(i)) tokens[i].bd_type = 4;else return 0;

	  return l;
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl() {
	  switch (tokens[pos].bd_type) {
	    case 1:
	      return getBlockdecl1();
	    case 2:
	      return getBlockdecl2();
	    case 3:
	      return getBlockdecl3();
	    case 4:
	      return getBlockdecl4();
	  }
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBlockdecl1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkDeclaration(i)) tokens[i].bd_kind = 1;else if (l = checkAtrule(i)) tokens[i].bd_kind = 2;else return 0;

	  i += l;

	  if (l = checkSC(i)) i += l;

	  if (i < tokensLength && (l = checkDeclDelim(i))) i += l;else return 0;

	  if (l = checkSC(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl1() {
	  var sc = getSC();
	  var x = undefined;

	  switch (tokens[pos].bd_kind) {
	    case 1:
	      x = getDeclaration();
	      break;
	    case 2:
	      x = getAtrule();
	      break;
	  }

	  return sc.concat([x]).concat(getSC()).concat([getDeclDelim()]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBlockdecl2(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkDeclaration(i)) tokens[i].bd_kind = 1;else if (l = checkAtrule(i)) tokens[i].bd_kind = 2;else return 0;

	  i += l;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl2() {
	  var sc = getSC();
	  var x = undefined;

	  switch (tokens[pos].bd_kind) {
	    case 1:
	      x = getDeclaration();
	      break;
	    case 2:
	      x = getAtrule();
	      break;
	  }

	  return sc.concat([x]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBlockdecl3(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkDeclDelim(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl3() {
	  return getSC().concat([getDeclDelim()]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBlockdecl4(i) {
	  return checkSC(i);
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl4() {
	  return getSC();
	}

	/**
	 * Check if token is part of text inside square brackets, e.g. `[1]`
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBrackets(i) {
	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftSquareBracket) return 0;

	  return tokens[i].right - i + 1;
	}

	/**
	 * Get node with text inside square brackets, e.g. `[1]`
	 * @return {Node}
	 */
	function getBrackets() {
	  var type = NodeType.BracketsType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;

	  pos++;

	  var tsets = getTsets();
	  var end = getLastPosition(tsets, line, column, 1);
	  pos++;

	  return newNode(type, tsets, line, column, end);
	}

	/**
	 * Check if token is part of a class selector (e.g. `.abc`)
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the class selector
	 */
	function checkClass(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].class_l) return tokens[i].class_l;

	  if (tokens[i++].type === TokenType.FullStop && (l = checkIdent(i))) {
	    tokens[i].class_l = l + 1;
	    return l + 1;
	  }

	  return 0;
	}

	/**
	 * Get node with a class selector
	 * @return {Node}
	 */
	function getClass() {
	  var type = NodeType.ClassType;
	  var token = tokens[pos++];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getIdent()];

	  return newNode(type, content, line, column);
	}

	function checkCombinator(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  if (l = checkCombinator1(i)) tokens[i].combinatorType = 1;else if (l = checkCombinator2(i)) tokens[i].combinatorType = 2;else if (l = checkCombinator3(i)) tokens[i].combinatorType = 3;

	  return l;
	}

	function getCombinator() {
	  var type = tokens[pos].combinatorType;
	  if (type === 1) return getCombinator1();
	  if (type === 2) return getCombinator2();
	  if (type === 3) return getCombinator3();
	}
	/**
	 * (1) `||`
	 */
	function checkCombinator1(i) {
	  if (tokens[i].type === TokenType.VerticalLine && tokens[i + 1].type === TokenType.VerticalLine) return 2;else return 0;
	}

	function getCombinator1() {
	  var type = NodeType.CombinatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '||';

	  pos += 2;
	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `>`
	 * (2) `+`
	 * (3) `~`
	 */
	function checkCombinator2(i) {
	  var type = tokens[i].type;
	  if (type === TokenType.PlusSign || type === TokenType.GreaterThanSign || type === TokenType.Tilde) return 1;else return 0;
	}

	function getCombinator2() {
	  var type = NodeType.CombinatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = tokens[pos++].value;

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `/panda/`
	 */
	function checkCombinator3(i) {
	  var start = i;

	  if (tokens[i].type === TokenType.Solidus) i++;else return 0;

	  var l = undefined;
	  if (l = checkIdent(i)) i += l;else return 0;

	  if (tokens[i].type === TokenType.Solidus) i++;else return 0;

	  return i - start;
	}

	function getCombinator3() {
	  var type = NodeType.CombinatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;

	  // Skip `/`.
	  pos++;
	  var ident = getIdent();

	  // Skip `/`.
	  pos++;

	  var content = '/' + ident.content + '/';

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a multiline comment.
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is a multiline comment, otherwise `0`
	 */
	function checkCommentML(i) {
	  return i < tokensLength && tokens[i].type === TokenType.CommentML ? 1 : 0;
	}

	/**
	 * Get node with a multiline comment
	 * @return {Node}
	 */
	function getCommentML() {
	  var type = NodeType.CommentMLType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = tokens[pos].value.substring(2);
	  var l = content.length;

	  if (content.charAt(l - 2) === '*' && content.charAt(l - 1) === '/') content = content.substring(0, l - 2);

	  var end = getLastPosition(content, line, column, 2);
	  if (end[0] === line) end[1] += 2;
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the declaration
	 */
	function checkDeclaration(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkProperty(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkPropertyDelim(i)) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkValue(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a declaration
	 * @return {Node}
	 */
	function getDeclaration() {
	  var type = NodeType.DeclarationType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;

	  var content = [getProperty()].concat(getSC()).concat([getPropertyDelim()]).concat(getSC()).concat([getValue()]);

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a semicolon
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is a semicolon, otherwise `0`
	 */
	function checkDeclDelim(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Semicolon ? 1 : 0;
	}

	/**
	 * Get node with a semicolon
	 * @return {Node}
	 */
	function getDeclDelim() {
	  var type = NodeType.DeclDelimType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = ';';

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a comma
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is a comma, otherwise `0`
	 */
	function checkDelim(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Comma ? 1 : 0;
	}

	/**
	 * Get node with a comma
	 * @return {Node}
	 */
	function getDelim() {
	  var type = NodeType.DelimType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = ',';

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of a number with dimension unit (e.g. `10px`)
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkDimension(i) {
	  var ln = checkNumber(i);
	  var li = undefined;

	  if (i >= tokensLength || !ln || i + ln >= tokensLength) return 0;

	  return (li = checkUnit(i + ln)) ? ln + li : 0;
	}

	/**
	 * Get node of a number with dimension unit
	 * @return {Node}
	 */
	function getDimension() {
	  var type = NodeType.DimensionType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getNumber(), getUnit()];

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is unit
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkUnit(i) {
	  var units = ['em', 'ex', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'px', 'mm', 'q', 'cm', 'in', 'pt', 'pc', 'deg', 'grad', 'rad', 'turn', 's', 'ms', 'Hz', 'kHz', 'dpi', 'dpcm', 'dppx'];

	  return units.indexOf(tokens[i].value) !== -1 ? 1 : 0;
	}

	/**
	 * Get unit node of type ident
	 * @return {Node} An ident node containing the unit value
	 */
	function getUnit() {
	  var type = NodeType.IdentType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = token.value;

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkExpression(i) {
	  var start = i;

	  if (i >= tokensLength || tokens[i++].value !== 'expression' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) {
	    return 0;
	  }

	  return tokens[i].right - start + 1;
	}

	/**
	 * @return {Node}
	 */
	function getExpression() {
	  var type = NodeType.ExpressionType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;

	  pos++;

	  var content = joinValues(pos + 1, tokens[pos].right - 1);
	  var end = getLastPosition(content, line, column, 1);
	  if (end[0] === line) end[1] += 11;
	  pos = tokens[pos].right + 1;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkFunction(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i < tokensLength && tokens[i].type === TokenType.LeftParenthesis ? tokens[i].right - start + 1 : 0;
	}

	/**
	 * @return {Node}
	 */
	function getFunction() {
	  var type = NodeType.FunctionType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var ident = getIdent();
	  var content = [ident];

	  content.push(getArguments());

	  return newNode(type, content, line, column);
	}

	/**
	 * @return {Node}
	 */
	function getArguments() {
	  var type = NodeType.ArgumentsType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];
	  var body = undefined;

	  pos++;

	  while (pos < tokensLength && tokens[pos].type !== TokenType.RightParenthesis) {
	    if (checkDeclaration(pos)) content.push(getDeclaration());else if (checkArgument(pos)) {
	      body = getArgument();
	      if (typeof body.content === 'string') content.push(body);else content = content.concat(body);
	    } else if (checkClass(pos)) content.push(getClass());else throwError(pos);
	  }

	  var end = getLastPosition(content, line, column, 1);
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkArgument(i) {
	  var l;

	  if (l = checkVhash(i)) tokens[i].argument_child = 1;else if (l = checkAny(i)) tokens[i].argument_child = 2;else if (l = checkSC(i)) tokens[i].argument_child = 3;else if (l = checkOperator(i)) tokens[i].argument_child = 4;

	  return l;
	}

	/**
	 * @return {Node}
	 */
	function getArgument() {
	  var childType = tokens[pos].argument_child;
	  if (childType === 1) return getVhash();else if (childType === 2) return getAny();else if (childType === 3) return getSC();else if (childType === 4) return getOperator();
	}

	/**
	 * Check if token is part of an identifierю
	 * Grammar from CSS spec:
	 *   h         [0-9a-f]
	 *   nonascii  [\240-\377]
	 *   unicode   \\{h}{1,6}(\r\n|[ \t\r\n\f])?
	 *   escape    {unicode}|\\[^\r\n\f0-9a-f]
	 *   nmstart   [_a-z]|{nonascii}|{escape}
	 *   nmchar    [_a-z0-9-]|{nonascii}|{escape}
	 *   ident     -?{nmstart}{nmchar}*
	 *
	 * @param {number} i Token's index number
	 * @return {number} Length of the identifier
	 */
	function checkIdent(i) {
	  var start = i;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].type === TokenType.HyphenMinus) i++;

	  if (tokens[i].type === TokenType.LowLine || tokens[i].type === TokenType.Identifier) i++;else return 0;

	  for (; i < tokensLength; i++) {
	    if (tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.LowLine && tokens[i].type !== TokenType.Identifier && tokens[i].type !== TokenType.DecimalNumber) break;
	  }

	  tokens[start].ident_last = i - 1;

	  return i - start;
	}

	/**
	 * Get node with an identifier
	 * @return {Node}
	 */
	function getIdent() {
	  var type = NodeType.IdentType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = joinValues(pos, tokens[pos].ident_last);

	  pos = tokens[pos].ident_last + 1;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of `!important` word
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkImportant(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark) return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].value === 'important') {
	    tokens[start].importantEnd = i;
	    return i - start + 1;
	  } else {
	    return 0;
	  }
	}

	/**
	 * Get node with `!important` word
	 * @return {Node}
	 */
	function getImportant() {
	  var type = NodeType.ImportantType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = joinValues(pos, token.importantEnd);

	  pos = token.importantEnd + 1;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check a single keyframe block - `5% {}`
	 * @param {Number} i
	 * @returns {Number}
	 */
	function checkKeyframesBlock(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkKeyframesSelectorsGroup(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get a single keyframe block - `5% {}`
	 * @returns {Node}
	 */
	function getKeyframesBlock() {
	  var type = NodeType.RulesetType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [].concat(getKeyframesSelectorsGroup(), getSC(), [getBlock()]);

	  return newNode(type, content, line, column);
	}

	/**
	 * Check all keyframe blocks - `5% {} 100% {}`
	 * @param {Number} i
	 * @returns {Number}
	 */
	function checkKeyframesBlocks(i) {
	  var start = i;
	  var l = undefined;

	  if (i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkKeyframesBlock(i)) i += l;else return 0;

	  while (tokens[i].type !== TokenType.RightCurlyBracket) {
	    if (l = checkSC(i)) i += l;else if (l = checkKeyframesBlock(i)) i += l;else break;
	  }

	  if (i < tokensLength && tokens[i].type === TokenType.RightCurlyBracket) i++;else return 0;

	  return i - start;
	}

	/**
	 * Get all keyframe blocks - `5% {} 100% {}`
	 * @returns {Node}
	 */
	function getKeyframesBlocks() {
	  var type = NodeType.BlockType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];
	  var keyframesBlocksEnd = token.right;

	  // Skip `{`.
	  pos++;

	  while (pos < keyframesBlocksEnd) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkKeyframesBlock(pos)) content.push(getKeyframesBlock());
	  }

	  var end = getLastPosition(content, line, column, 1);

	  // Skip `}`.
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * Check if token is part of a @keyframes rule.
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @keyframes rule
	 */
	function checkKeyframesRule(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  var atruleName = joinValues2(i - l, l);
	  if (atruleName.indexOf('keyframes') === -1) return 0;

	  if (l = checkSC(i)) i += l;else return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkKeyframesBlocks(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getKeyframesRule() {
	  var type = NodeType.AtruleType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [].concat([getAtkeyword()], getSC(), [getIdent()], getSC(), [getKeyframesBlocks()]);

	  return newNode(type, content, line, column);
	}

	/**
	 * Check a single keyframe selector - `5%`, `from` etc
	 * @param {Number} i
	 * @returns {Number}
	 */
	function checkKeyframesSelector(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) {
	    // Valid selectors are only `from` and `to`.
	    var selector = joinValues2(i, l);
	    if (selector !== 'from' && selector !== 'to') return 0;

	    i += l;
	    tokens[start].keyframesSelectorType = 1;
	  } else if (l = checkPercentage(i)) {
	    i += l;
	    tokens[start].keyframesSelectorType = 2;
	  } else {
	    return 0;
	  }

	  return i - start;
	}

	/**
	 * Get a single keyframe selector
	 * @returns {Node}
	 */
	function getKeyframesSelector() {
	  var keyframesSelectorType = NodeType.KeyframesSelectorType;
	  var selectorType = NodeType.SelectorType;

	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (token.keyframesSelectorType === 1) {
	    content.push(getIdent());
	  } else {
	    content.push(getPercentage());
	  }

	  var keyframesSelector = newNode(keyframesSelectorType, content, line, column);
	  return newNode(selectorType, [keyframesSelector], line, column);
	}

	/**
	 * Check the keyframe's selector groups
	 * @param {Number} i
	 * @returns {Number}
	 */
	function checkKeyframesSelectorsGroup(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkKeyframesSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var sb = checkSC(i);
	    var c = checkDelim(i + sb);
	    if (!c) break;
	    var sa = checkSC(i + sb + c);
	    if (l = checkKeyframesSelector(i + sb + c + sa)) i += sb + c + sa + l;else break;
	  }

	  tokens[start].selectorsGroupEnd = i;

	  return i - start;
	}

	/**
	 * Get the keyframe's selector groups
	 * @returns {Array} An array of keyframe selectors
	 */
	function getKeyframesSelectorsGroup() {
	  var selectorsGroup = [];
	  var selectorsGroupEnd = tokens[pos].selectorsGroupEnd;

	  selectorsGroup.push(getKeyframesSelector());

	  while (pos < selectorsGroupEnd) {
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getDelim());
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getKeyframesSelector());
	  }

	  return selectorsGroup;
	}

	/**
	 * Check if token is a namespace sign (`|`)
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is `|`, `0` if not
	 */
	function checkNamespace(i) {
	  return i < tokensLength && tokens[i].type === TokenType.VerticalLine ? 1 : 0;
	}

	/**
	 * Get node with a namespace sign
	 * @return {Node}
	 */
	function getNamespace() {
	  var type = NodeType.NamespaceType;
	  var token = tokens[pos++];
	  var line = token.ln;
	  var column = token.col;
	  var content = '|';

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkNmName2(i) {
	  if (tokens[i].type === TokenType.Identifier) return 1;else if (tokens[i].type !== TokenType.DecimalNumber) return 0;

	  i++;

	  return i < tokensLength && tokens[i].type === TokenType.Identifier ? 2 : 1;
	}

	/**
	 * @return {String}
	 */
	function getNmName2() {
	  var s = tokens[pos].value;

	  if (tokens[pos++].type === TokenType.DecimalNumber && pos < tokensLength && tokens[pos].type === TokenType.Identifier) s += tokens[pos++].value;

	  return s;
	}

	/**
	 * Check if token is part of a number
	 * @param {Number} i Token's index number
	 * @return {Number} Length of number
	 */
	function checkNumber(i) {
	  if (i >= tokensLength) return 0;

	  if (tokens[i].number_l) return tokens[i].number_l;

	  // `10`:
	  if (i < tokensLength && tokens[i].type === TokenType.DecimalNumber && (!tokens[i + 1] || tokens[i + 1] && tokens[i + 1].type !== TokenType.FullStop)) {
	    tokens[i].number_l = 1;
	    return 1;
	  }

	  // `10.`:
	  if (i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && (!tokens[i + 2] || tokens[i + 2].type !== TokenType.DecimalNumber)) {
	    tokens[i].number_l = 2;
	    return 2;
	  }

	  // `.10`:
	  if (i < tokensLength && tokens[i].type === TokenType.FullStop && tokens[i + 1].type === TokenType.DecimalNumber) {
	    tokens[i].number_l = 2;
	    return 2;
	  }

	  // `10.10`:
	  if (i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && tokens[i + 2] && tokens[i + 2].type === TokenType.DecimalNumber) {
	    tokens[i].number_l = 3;
	    return 3;
	  }

	  return 0;
	}

	/**
	 * Get node with number
	 * @return {Node}
	 */
	function getNumber() {
	  var type = NodeType.NumberType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '';
	  var l = tokens[pos].number_l;

	  for (var j = 0; j < l; j++) {
	    content += tokens[pos + j].value;
	  }

	  pos += l;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is an operator (`/`, `,`, `:` or `=`).
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is an operator, otherwise `0`
	 */
	function checkOperator(i) {
	  if (i >= tokensLength) return 0;

	  switch (tokens[i].type) {
	    case TokenType.Solidus:
	    case TokenType.Comma:
	    case TokenType.Colon:
	    case TokenType.EqualsSign:
	      return 1;
	  }

	  return 0;
	}

	/**
	 * Get node with an operator
	 * @return {Node}
	 */
	function getOperator() {
	  var type = NodeType.OperatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = token.value;

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of text inside parentheses, e.g. `(1)`
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkParentheses(i) {
	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  return tokens[i].right - i + 1;
	}

	/**
	 * Get node with text inside parentheses, e.g. `(1)`
	 * @return {Node}
	 */
	function getParentheses() {
	  var type = NodeType.ParenthesesType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;

	  pos++;

	  var tsets = getTsets();
	  var end = getLastPosition(tsets, line, column, 1);
	  pos++;

	  return newNode(type, tsets, line, column, end);
	}

	/**
	 * Check if token is part of a number with percent sign (e.g. `10%`)
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkPercentage(i) {
	  var x;

	  if (i >= tokensLength) return 0;

	  x = checkNumber(i);

	  if (!x || i + x >= tokensLength) return 0;

	  return tokens[i + x].type === TokenType.PercentSign ? x + 1 : 0;
	}

	/**
	 * Get node of number with percent sign
	 * @return {Node}
	 */
	function getPercentage() {
	  var type = NodeType.PercentageType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getNumber()];

	  var end = getLastPosition(content, line, column, 1);
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkProgid(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (joinValues2(i, 6) === 'progid:DXImageTransform.Microsoft.') i += 6;else return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === TokenType.LeftParenthesis) {
	    tokens[start].progid_end = tokens[i].right;
	    i = tokens[i].right + 1;
	  } else return 0;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getProgid() {
	  var type = NodeType.ProgidType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var progid_end = token.progid_end;
	  var content = joinValues(pos, progid_end);

	  pos = progid_end + 1;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of a property
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the property
	 */
	function checkProperty(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a property
	 * @return {Node}
	 */
	function getProperty() {
	  var type = NodeType.PropertyType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getIdent()];

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a colon
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is a colon, otherwise `0`
	 */
	function checkPropertyDelim(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Colon ? 1 : 0;
	}

	/**
	 * Get node with a colon
	 * @return {Node}
	 */
	function getPropertyDelim() {
	  var type = NodeType.PropertyDelimType;
	  var token = tokens[pos++];
	  var line = token.ln;
	  var column = token.col;
	  var content = ':';

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkPseudo(i) {
	  return checkPseudoe(i) || checkPseudoc(i);
	}

	/**
	 * @return {Node}
	 */
	function getPseudo() {
	  if (checkPseudoe(pos)) return getPseudoe();
	  if (checkPseudoc(pos)) return getPseudoc();
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkPseudoe(i) {
	  var l;

	  if (i >= tokensLength || tokens[i++].type !== TokenType.Colon || i >= tokensLength || tokens[i++].type !== TokenType.Colon) return 0;

	  return (l = checkIdent(i)) ? l + 2 : 0;
	}

	/**
	 * @return {Node}
	 */
	function getPseudoe() {
	  var type = NodeType.PseudoeType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  pos += 2;

	  content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkPseudoc(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.Colon) return 0;

	  if (l = checkPseudoClass1(i)) tokens[i].pseudoClassType = 1;else if (l = checkPseudoClass2(i)) tokens[i].pseudoClassType = 2;else if (l = checkPseudoClass3(i)) tokens[i].pseudoClassType = 3;else if (l = checkPseudoClass4(i)) tokens[i].pseudoClassType = 4;else if (l = checkPseudoClass5(i)) tokens[i].pseudoClassType = 5;else if (l = checkPseudoClass6(i)) tokens[i].pseudoClassType = 6;else return 0;

	  return l;
	}

	/**
	 * @return {Node}
	 */
	function getPseudoc() {
	  var childType = tokens[pos].pseudoClassType;
	  if (childType === 1) return getPseudoClass1();
	  if (childType === 2) return getPseudoClass2();
	  if (childType === 3) return getPseudoClass3();
	  if (childType === 4) return getPseudoClass4();
	  if (childType === 5) return getPseudoClass5();
	  if (childType === 6) return getPseudoClass6();
	}

	/**
	 * (1) `:panda(selector)`
	 * (2) `:panda(selector, selector)`
	 */
	function checkPseudoClass1(i) {
	  var start = i;

	  // Skip `:`.
	  i++;

	  var l = undefined;
	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSelectorsGroup(i)) i += l;else return 0;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	/**
	 * (-) `:not(panda)`
	 */
	function getPseudoClass1() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  content.push(getIdent());

	  {
	    var _type = NodeType.ArgumentsType;
	    var _token = tokens[pos];
	    var _line = _token.ln;
	    var _column = _token.col;

	    // Skip `(`.
	    pos++;

	    var selectors = getSelectorsGroup();
	    var end = getLastPosition(selectors, _line, _column, 1);
	    var args = newNode(_type, selectors, _line, _column, end);
	    content.push(args);

	    // Skip `)`.
	    pos++;
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `:nth-child(odd)`
	 * (2) `:nth-child(even)`
	 * (3) `:lang(de-DE)`
	 */
	function checkPseudoClass2(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass2() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  value = value.concat(getSC());
	  value.push(getIdent());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(-3n + 2)`
	 */
	function checkPseudoClass3(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (i >= tokensLength) return 0;
	  if (tokens[i].type === TokenType.DecimalNumber) i++;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].value === 'n') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].value === '+' || tokens[i].value === '-') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === TokenType.DecimalNumber) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass3() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  // Skip `(`.
	  pos++;

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());

	  {
	    var _l = tokens[pos].ln;
	    var _c = tokens[pos].col;
	    var _content = tokens[pos].value;
	    var _ident = newNode(NodeType.IdentType, _content, _l, _c);
	    value.push(_ident);
	    pos++;
	  }

	  value = value.concat(getSC());
	  if (checkUnary(pos)) value.push(getUnary());
	  value = value.concat(getSC());
	  if (checkNumber(pos)) value.push(getNumber());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(-3n)`
	 */
	function checkPseudoClass4(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (tokens[i].type === TokenType.DecimalNumber) i++;

	  if (tokens[i].value === 'n') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass4() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());
	  if (checkIdent(pos)) value.push(getIdent());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(+8)`
	 */
	function checkPseudoClass5(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (tokens[i].type === TokenType.DecimalNumber) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass5() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:checked`
	 */
	function checkPseudoClass6(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getPseudoClass6() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkRuleset(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSelectorsGroup(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getRuleset() {
	  var type = NodeType.RulesetType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  content = content.concat(getSelectorsGroup());
	  content = content.concat(getSC());
	  content.push(getBlock());

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is marked as a space (if it's a space or a tab
	 *      or a line break).
	 * @param {Number} i
	 * @return {Number} Number of spaces in a row starting with the given token.
	 */
	function checkS(i) {
	  return i < tokensLength && tokens[i].ws ? tokens[i].ws_last - i + 1 : 0;
	}

	/**
	 * Get node with spaces
	 * @return {Node}
	 */
	function getS() {
	  var type = NodeType.SType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = joinValues(pos, tokens[pos].ws_last);

	  pos = tokens[pos].ws_last + 1;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a space or a comment.
	 * @param {Number} i Token's index number
	 * @return {Number} Number of similar (space or comment) tokens
	 *      in a row starting with the given token.
	 */
	function checkSC(i) {
	  var l = undefined;
	  var lsc = 0;

	  while (i < tokensLength) {
	    if (l = checkS(i)) tokens[i].sc_child = 1;else if (l = checkCommentML(i)) tokens[i].sc_child = 2;else break;
	    i += l;
	    lsc += l;
	  }

	  return lsc || 0;
	}

	/**
	 * Get node with spaces and comments
	 * @return {Array}
	 */
	function getSC() {
	  var sc = [];

	  if (pos >= tokensLength) return sc;

	  while (pos < tokensLength) {
	    var childType = tokens[pos].sc_child;
	    if (childType === 1) sc.push(getS());else if (childType === 2) sc.push(getCommentML());else break;
	  }

	  return sc;
	}

	/**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      a simple selector
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkShash(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.NumberSign) return 0;

	  return (l = checkIdent(i + 1)) ? l + 1 : 0;
	}

	/**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside a simple
	 *      selector
	 * @return {Node}
	 */
	function getShash() {
	  var type = NodeType.ShashType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of a string (text wrapped in quotes)
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is part of a string, `0` if not
	 */
	function checkString(i) {
	  if (i >= tokensLength) {
	    return 0;
	  }

	  if (tokens[i].type === TokenType.StringSQ || tokens[i].type === TokenType.StringDQ) {
	    return 1;
	  }

	  return 0;
	}

	/**
	 * Get string's node
	 * @return {Array} `['string', x]` where `x` is a string (including
	 *      quotes).
	 */
	function getString() {
	  var type = NodeType.StringType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = token.value;

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Validate stylesheet: it should consist of any number (0 or more) of
	 * rulesets (sets of rules with selectors), @-rules, whitespaces or
	 * comments.
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkStylesheet(i) {
	  var start = i;
	  var l = undefined;

	  // Check every token:
	  while (i < tokensLength) {
	    if (l = checkSC(i)) tokens[i].stylesheet_child = 1;else if (l = checkRuleset(i)) tokens[i].stylesheet_child = 2;else if (l = checkAtrule(i)) tokens[i].stylesheet_child = 3;else if (l = checkDeclDelim(i)) tokens[i].stylesheet_child = 4;else throwError(i);

	    i += l;
	  }

	  return i - start;
	}

	/**
	 * @return {Array} `['stylesheet', x]` where `x` is all stylesheet's
	 *      nodes.
	 */
	function getStylesheet() {
	  var type = NodeType.StylesheetType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];
	  var childType = undefined;

	  while (pos < tokensLength) {
	    childType = tokens[pos].stylesheet_child;
	    if (childType === 1) content = content.concat(getSC());else if (childType === 2) content.push(getRuleset());else if (childType === 3) content.push(getAtrule());else if (childType === 4) content.push(getDeclDelim());
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkTset(i) {
	  var l;

	  if (l = checkVhash(i)) tokens[i].tset_child = 1;else if (l = checkAny(i)) tokens[i].tset_child = 2;else if (l = checkSC(i)) tokens[i].tset_child = 3;else if (l = checkOperator(i)) tokens[i].tset_child = 4;

	  return l;
	}

	/**
	 * @return {Array}
	 */
	function getTset() {
	  var childType = tokens[pos].tset_child;
	  if (childType === 1) return getVhash();else if (childType === 2) return getAny();else if (childType === 3) return getSC();else if (childType === 4) return getOperator();
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkTsets(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  while (l = checkTset(i)) {
	    i += l;
	  }

	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getTsets() {
	  var x = [];
	  var t = undefined;

	  while (checkTset(pos)) {
	    t = getTset();
	    if (typeof t.content === 'string') x.push(t);else x = x.concat(t);
	  }

	  return x;
	}

	/**
	 * Check if token is an unary (arithmetical) sign (`+` or `-`)
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is an unary sign, `0` if not
	 */
	function checkUnary(i) {
	  if (i >= tokensLength) {
	    return 0;
	  }

	  if (tokens[i].type === TokenType.HyphenMinus || tokens[i].type === TokenType.PlusSign) {
	    return 1;
	  }

	  return 0;
	}

	/**
	 * Get node with an unary (arithmetical) sign (`+` or `-`)
	 * @return {Array} `['unary', x]` where `x` is an unary sign
	 *      converted to string.
	 */
	function getUnary() {
	  var type = NodeType.OperatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = token.value;

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a unicode range (single or multiple <urange> nodes)
	 * @param {number} i Token's index
	 * @return {number} Unicode range node's length
	 */
	function checkUnicodeRange(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkUrange(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var spaceBefore = checkSC(i);
	    var comma = checkDelim(i + spaceBefore);
	    if (!comma) break;

	    var spaceAfter = checkSC(i + spaceBefore + comma);
	    if (l = checkUrange(i + spaceBefore + comma + spaceAfter)) {
	      i += spaceBefore + comma + spaceAfter + l;
	    } else break;
	  }

	  return i - start;
	}

	/**
	 * Get a unicode range node
	 * @return {Node}
	 */
	function getUnicodeRange() {
	  var type = NodeType.UnicodeRangeType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  while (pos < tokensLength) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkDelim(pos)) content.push(getDelim());else if (checkUrange(pos)) content.push(getUrange());else break;
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a u-range (part of a unicode-range)
	 * (1) `U+416`
	 * (2) `U+400-4ff`
	 * (3) `U+4??`
	 * @param {number} i Token's index
	 * @return {number} Urange node's length
	 */
	function checkUrange(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  // Check for unicode prefix (u+ or U+)
	  if (tokens[i].value === 'U' || tokens[i].value === 'u') i += 1;else return 0;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].value === '+') i += 1;else return 0;

	  while (i < tokensLength) {
	    if (l = checkIdent(i)) i += l;else if (l = checkNumber(i)) i += l;else if (l = checkUnary(i)) i += l;else if (l = _checkUnicodeWildcard(i)) i += l;else break;
	  }

	  tokens[start].urangeEnd = i - 1;

	  return i - start;
	}

	/**
	 * Get a u-range node (part of a unicode-range)
	 * @return {Node}
	 */
	function getUrange() {
	  var startPos = pos;
	  var type = NodeType.UrangeType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  content = joinValues(startPos, tokens[startPos].urangeEnd);
	  pos = tokens[startPos].urangeEnd + 1;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check for unicode wildcard characters `?`
	 * @param {number} i Token's index
	 * @return {number} Wildcard length
	 */
	function _checkUnicodeWildcard(i) {
	  var start = i;

	  if (i >= tokensLength) return 0;

	  while (i < tokensLength) {
	    if (tokens[i].type === TokenType.QuestionMark) i += 1;else break;
	  }

	  return i - start;
	}

	/**
	 * Check if token is part of URI (e.g. `url('/css/styles.css')`)
	 * @param {Number} i Token's index number
	 * @return {Number} Length of URI
	 */
	function checkUri(i) {
	  var start = i;

	  if (i >= tokensLength || tokens[i].value !== 'url') return 0;
	  i += 1;
	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  return tokens[i].right - start + 1;
	}

	/**
	 * Get node with URI
	 * @return {Array} `['uri', x]` where `x` is URI's nodes (without `url`
	 *      and braces, e.g. `['string', ''/css/styles.css'']`).
	 */
	function getUri() {
	  var startPos = pos;
	  var uriExcluding = {};
	  var uri = undefined;
	  var l = undefined;
	  var raw = undefined;

	  var rawContent = undefined;
	  var t = undefined;

	  pos += 2;

	  uriExcluding[TokenType.Space] = 1;
	  uriExcluding[TokenType.Tab] = 1;
	  uriExcluding[TokenType.Newline] = 1;
	  uriExcluding[TokenType.LeftParenthesis] = 1;
	  uriExcluding[TokenType.RightParenthesis] = 1;

	  if (checkUri1(pos)) {
	    uri = [].concat(getSC()).concat([getString()]).concat(getSC());
	  } else {
	    uri = checkSC(pos) ? getSC() : [];
	    l = checkExcluding(uriExcluding, pos);
	    rawContent = joinValues(pos, pos + l);
	    t = tokens[pos];
	    raw = newNode(NodeType.RawType, rawContent, t.ln, t.col);

	    uri.push(raw);

	    pos += l + 1;

	    if (checkSC(pos)) uri = uri.concat(getSC());
	  }

	  t = tokens[startPos];
	  var line = t.ln;
	  var column = t.col;
	  var end = getLastPosition(uri, line, column, 1);
	  pos++;

	  return newNode(NodeType.UriType, uri, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkUri1(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type !== TokenType.StringDQ && tokens[i].type !== TokenType.StringSQ) return 0;

	  i++;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * Check if token is part of a value
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the value
	 */
	function checkValue(i) {
	  var start = i;
	  var l = undefined;
	  var s = undefined;
	  var _i = undefined;

	  while (i < tokensLength) {
	    s = checkSC(i);
	    _i = i + s;

	    if (l = _checkValue(_i)) i += l + s;else break;
	  }

	  tokens[start].value_end = i;
	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getValue() {
	  var startPos = pos;
	  var end = tokens[pos].value_end;
	  var x = [];

	  while (pos < end) {
	    if (tokens[pos].value_child) x.push(_getValue());else x = x.concat(getSC());
	  }

	  var t = tokens[startPos];
	  return newNode(NodeType.ValueType, x, t.ln, t.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function _checkValue(i) {
	  var l;

	  if (l = checkProgid(i)) tokens[i].value_child = 1;else if (l = checkVhash(i)) tokens[i].value_child = 2;else if (l = checkAny(i)) tokens[i].value_child = 3;else if (l = checkOperator(i)) tokens[i].value_child = 4;else if (l = checkImportant(i)) tokens[i].value_child = 5;

	  return l;
	}

	/**
	 * @return {Array}
	 */
	function _getValue() {
	  var childType = tokens[pos].value_child;
	  if (childType === 1) return getProgid();else if (childType === 2) return getVhash();else if (childType === 3) return getAny();else if (childType === 4) return getOperator();else if (childType === 5) return getImportant();
	}

	/**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      some value
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkVhash(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.NumberSign) return 0;

	  return (l = checkNmName2(i + 1)) ? l + 1 : 0;
	}

	/**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside some value
	 * @return {Array} `['vhash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `'fff'`).
	 */
	function getVhash() {
	  var type = NodeType.VhashType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = undefined;

	  pos++;

	  content = getNmName2();
	  var end = getLastPosition(content, line, column + 1);
	  return newNode(type, content, line, column, end);
	}

	module.exports = function (_tokens, context) {
	  tokens = _tokens;
	  tokensLength = tokens.length;
	  pos = 0;

	  return contexts[context]();
	};

	function checkSelectorsGroup(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var sb = checkSC(i);
	    var c = checkDelim(i + sb);
	    if (!c) break;
	    var sa = checkSC(i + sb + c);
	    if (l = checkSelector(i + sb + c + sa)) i += sb + c + sa + l;else break;
	  }

	  tokens[start].selectorsGroupEnd = i;
	  return i - start;
	}

	function getSelectorsGroup() {
	  var selectorsGroup = [];
	  var selectorsGroupEnd = tokens[pos].selectorsGroupEnd;

	  selectorsGroup.push(getSelector());

	  while (pos < selectorsGroupEnd) {
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getDelim());
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getSelector());
	  }

	  return selectorsGroup;
	}

	function checkSelector(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkCompoundSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var sb = checkSC(i);
	    var c = checkCombinator(i + sb);
	    if (!sb && !c) break;
	    var sa = checkSC(i + sb + c);
	    if (l = checkCompoundSelector(i + sb + c + sa)) i += sb + c + sa + l;else break;
	  }

	  tokens[start].selectorEnd = i;
	  return i - start;
	}

	function getSelector() {
	  var type = NodeType.SelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var selectorEnd = token.selectorEnd;
	  var content = undefined;

	  content = getCompoundSelector();

	  while (pos < selectorEnd) {
	    content = content.concat(getSC());
	    if (checkCombinator(pos)) content.push(getCombinator());
	    content = content.concat(getSC());
	    content = content.concat(getCompoundSelector());
	  }

	  return newNode(type, content, line, column);
	}

	function checkCompoundSelector(i) {
	  var l = undefined;

	  if (l = checkCompoundSelector1(i)) {
	    tokens[i].compoundSelectorType = 1;
	  } else if (l = checkCompoundSelector2(i)) {
	    tokens[i].compoundSelectorType = 2;
	  }

	  return l;
	}

	function getCompoundSelector() {
	  var type = tokens[pos].compoundSelectorType;
	  if (type === 1) return getCompoundSelector1();
	  if (type === 2) return getCompoundSelector2();
	}

	function checkCompoundSelector1(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;

	  var l = undefined;
	  if (l = checkTypeSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var _l2 = checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i);
	    if (_l2) i += _l2;else break;
	  }

	  tokens[start].compoundSelectorEnd = i;

	  return i - start;
	}

	function getCompoundSelector1() {
	  var sequence = [];
	  var compoundSelectorEnd = tokens[pos].compoundSelectorEnd;

	  sequence.push(getTypeSelector());

	  while (pos < compoundSelectorEnd) {
	    if (checkShash(pos)) sequence.push(getShash());else if (checkClass(pos)) sequence.push(getClass());else if (checkAttributeSelector(pos)) sequence.push(getAttributeSelector());else if (checkPseudo(pos)) sequence.push(getPseudo());
	  }

	  return sequence;
	}

	function checkCompoundSelector2(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;

	  while (i < tokensLength) {
	    var l = checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i);
	    if (l) i += l;else break;
	  }

	  tokens[start].compoundSelectorEnd = i;

	  return i - start;
	}

	function getCompoundSelector2() {
	  var sequence = [];
	  var compoundSelectorEnd = tokens[pos].compoundSelectorEnd;

	  while (pos < compoundSelectorEnd) {
	    if (checkShash(pos)) sequence.push(getShash());else if (checkClass(pos)) sequence.push(getClass());else if (checkAttributeSelector(pos)) sequence.push(getAttributeSelector());else if (checkPseudo(pos)) sequence.push(getPseudo());
	  }

	  return sequence;
	}

	function checkTypeSelector(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkNamePrefix(i)) i += l;

	  if (tokens[i].type === TokenType.Asterisk) i++;else if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getTypeSelector() {
	  var type = NodeType.TypeSelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (checkNamePrefix(pos)) content.push(getNamePrefix());

	  token = tokens[pos];
	  if (token.type === TokenType.Asterisk) {
	    var asteriskNode = newNode(NodeType.IdentType, '*', token.ln, token.col);
	    content.push(asteriskNode);
	    pos++;
	  } else if (checkIdent(pos)) content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeSelector(i) {
	  var l = undefined;
	  if (l = checkAttributeSelector1(i)) tokens[i].attributeSelectorType = 1;else if (l = checkAttributeSelector2(i)) tokens[i].attributeSelectorType = 2;

	  return l;
	}

	function getAttributeSelector() {
	  var type = tokens[pos].attributeSelectorType;
	  if (type === 1) return getAttributeSelector1();else return getAttributeSelector2();
	}

	/**
	 * (1) `[panda=nani]`
	 * (2) `[panda='nani']`
	 * (3) `[panda='nani' i]`
	 *
	 */
	function checkAttributeSelector1(i) {
	  var start = i;

	  if (tokens[i].type === TokenType.LeftSquareBracket) i++;else return 0;

	  var l = undefined;
	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeName(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeMatch(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeValue(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeFlags(i)) {
	    i += l;
	    if (l = checkSC(i)) i += l;
	  }

	  if (tokens[i].type === TokenType.RightSquareBracket) i++;else return 0;

	  return i - start;
	}

	function getAttributeSelector1() {
	  var type = NodeType.AttributeSelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `[`.
	  pos++;

	  content = content.concat(getSC());
	  content.push(getAttributeName());
	  content = content.concat(getSC());
	  content.push(getAttributeMatch());
	  content = content.concat(getSC());
	  content.push(getAttributeValue());
	  content = content.concat(getSC());

	  if (checkAttributeFlags(pos)) {
	    content.push(getAttributeFlags());
	    content = content.concat(getSC());
	  }

	  // Skip `]`.
	  pos++;

	  var end = getLastPosition(content, line, column, 1);
	  return newNode(type, content, line, column, end);
	}

	/**
	 * (1) `[panda]`
	 */
	function checkAttributeSelector2(i) {
	  var start = i;

	  if (tokens[i].type === TokenType.LeftSquareBracket) i++;else return 0;

	  var l = undefined;
	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeName(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === TokenType.RightSquareBracket) i++;else return 0;

	  return i - start;
	}

	function getAttributeSelector2() {
	  var type = NodeType.AttributeSelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `[`.
	  pos++;

	  content = content.concat(getSC());
	  content.push(getAttributeName());
	  content = content.concat(getSC());

	  // Skip `]`.
	  pos++;

	  var end = getLastPosition(content, line, column, 1);
	  return newNode(type, content, line, column, end);
	}

	function checkAttributeName(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkNamePrefix(i)) i += l;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getAttributeName() {
	  var type = NodeType.AttributeNameType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (checkNamePrefix(pos)) content.push(getNamePrefix());
	  content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeMatch(i) {
	  var l = undefined;
	  if (l = checkAttributeMatch1(i)) tokens[i].attributeMatchType = 1;else if (l = checkAttributeMatch2(i)) tokens[i].attributeMatchType = 2;

	  return l;
	}

	function getAttributeMatch() {
	  var type = tokens[pos].attributeMatchType;
	  if (type === 1) return getAttributeMatch1();else return getAttributeMatch2();
	}

	function checkAttributeMatch1(i) {
	  var start = i;

	  var type = tokens[i].type;
	  if (type === TokenType.Tilde || type === TokenType.VerticalLine || type === TokenType.CircumflexAccent || type === TokenType.DollarSign || type === TokenType.Asterisk) i++;else return 0;

	  if (tokens[i].type === TokenType.EqualsSign) i++;else return 0;

	  return i - start;
	}

	function getAttributeMatch1() {
	  var type = NodeType.AttributeMatchType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = tokens[pos].value + tokens[pos + 1].value;
	  pos += 2;

	  return newNode(type, content, line, column);
	}

	function checkAttributeMatch2(i) {
	  if (tokens[i].type === TokenType.EqualsSign) return 1;else return 0;
	}

	function getAttributeMatch2() {
	  var type = NodeType.AttributeMatchType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '=';

	  pos++;
	  return newNode(type, content, line, column);
	}

	function checkAttributeValue(i) {
	  return checkString(i) || checkIdent(i);
	}

	function getAttributeValue() {
	  var type = NodeType.AttributeValueType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (checkString(pos)) content.push(getString());else content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeFlags(i) {
	  return checkIdent(i);
	}

	function getAttributeFlags() {
	  var type = NodeType.AttributeFlagsType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getIdent()];

	  return newNode(type, content, line, column);
	}

	function checkNamePrefix(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  if (l = checkNamePrefix1(i)) tokens[i].namePrefixType = 1;else if (l = checkNamePrefix2(i)) tokens[i].namePrefixType = 2;

	  return l;
	}

	function getNamePrefix() {
	  var type = tokens[pos].namePrefixType;
	  if (type === 1) return getNamePrefix1();else return getNamePrefix2();
	}

	/**
	 * (1) `panda|`
	 * (2) `panda<comment>|`
	 */
	function checkNamePrefix1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkNamespacePrefix(i)) i += l;else return 0;

	  if (l = checkCommentML(i)) i += l;

	  if (l = checkNamespaceSeparator(i)) i += l;else return 0;

	  return i - start;
	}

	function getNamePrefix1() {
	  var type = NodeType.NamePrefixType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  content.push(getNamespacePrefix());

	  if (checkCommentML(pos)) content.push(getCommentML());

	  content.push(getNamespaceSeparator());

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `|`
	 */
	function checkNamePrefix2(i) {
	  return checkNamespaceSeparator(i);
	}

	function getNamePrefix2() {
	  var type = NodeType.NamePrefixType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getNamespaceSeparator()];

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `*`
	 * (2) `panda`
	 */
	function checkNamespacePrefix(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;

	  if (tokens[i].type === TokenType.Asterisk) return 1;else if (l = checkIdent(i)) return l;else return 0;
	}

	function getNamespacePrefix() {
	  var type = NodeType.NamespacePrefixType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (tokens[pos].type === TokenType.Asterisk) {
	    var asteriskNode = newNode(NodeType.IdentType, '*', line, column);
	    content.push(asteriskNode);
	    pos++;
	  } else if (checkIdent(pos)) content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `|`
	 */
	function checkNamespaceSeparator(i) {
	  if (i >= tokensLength) return 0;

	  if (tokens[i].type !== TokenType.VerticalLine) return 0;

	  // Return false if `|=` - [attr|=value]
	  if (tokens[i + 1] && tokens[i + 1].type === TokenType.EqualsSign) return 0;

	  return 1;
	}

	function getNamespaceSeparator() {
	  var type = NodeType.NamespaceSeparatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '|';

	  pos++;
	  return newNode(type, content, line, column);
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  ArgumentsType: 'arguments',
	  AtkeywordType: 'atkeyword',
	  AtruleType: 'atrule',
	  AttributeSelectorType: 'attributeSelector',
	  AttributeNameType: 'attributeName',
	  AttributeFlagsType: 'attributeFlags',
	  AttributeMatchType: 'attributeMatch',
	  AttributeValueType: 'attributeValue',
	  BlockType: 'block',
	  BracketsType: 'brackets',
	  ClassType: 'class',
	  CombinatorType: 'combinator',
	  CommentMLType: 'multilineComment',
	  CommentSLType: 'singlelineComment',
	  ConditionType: 'condition',
	  ConditionalStatementType: 'conditionalStatement',
	  DeclarationType: 'declaration',
	  DeclDelimType: 'declarationDelimiter',
	  DefaultType: 'default',
	  DelimType: 'delimiter',
	  DimensionType: 'dimension',
	  EscapedStringType: 'escapedString',
	  ExtendType: 'extend',
	  ExpressionType: 'expression',
	  FunctionType: 'function',
	  GlobalType: 'global',
	  IdentType: 'ident',
	  ImportantType: 'important',
	  IncludeType: 'include',
	  InterpolationType: 'interpolation',
	  InterpolatedVariableType: 'interpolatedVariable',
	  KeyframesSelectorType: 'keyframesSelector',
	  LoopType: 'loop',
	  MixinType: 'mixin',
	  NamePrefixType: 'namePrefix',
	  NamespacePrefixType: 'namespacePrefix',
	  NamespaceSeparatorType: 'namespaceSeparator',
	  NumberType: 'number',
	  OperatorType: 'operator',
	  OptionalType: 'optional',
	  ParenthesesType: 'parentheses',
	  ParentSelectorType: 'parentSelector',
	  ParentSelectorExtensionType: 'parentSelectorExtension',
	  PercentageType: 'percentage',
	  PlaceholderType: 'placeholder',
	  ProgidType: 'progid',
	  PropertyType: 'property',
	  PropertyDelimType: 'propertyDelimiter',
	  PseudocType: 'pseudoClass',
	  PseudoeType: 'pseudoElement',
	  RawType: 'raw',
	  RulesetType: 'ruleset',
	  SType: 'space',
	  SelectorType: 'selector',
	  ShashType: 'id',
	  StringType: 'string',
	  StylesheetType: 'stylesheet',
	  TypeSelectorType: 'typeSelector',
	  UnicodeRangeType: 'unicodeRange',
	  UriType: 'uri',
	  UrangeType: 'urange',
	  ValueType: 'value',
	  VariableType: 'variable',
	  VariablesListType: 'variablesList',
	  VhashType: 'color'
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (css, tabSize) {
	  var TokenType = __webpack_require__(13);

	  var tokens = [];
	  var urlMode = false;
	  var blockMode = 0;
	  var pos = 0;
	  var tn = 0;
	  var ln = 1;
	  var col = 1;
	  var cssLength = 0;

	  var Punctuation = {
	    ' ': TokenType.Space,
	    '\n': TokenType.Newline,
	    '\r': TokenType.Newline,
	    '\t': TokenType.Tab,
	    '!': TokenType.ExclamationMark,
	    '"': TokenType.QuotationMark,
	    '#': TokenType.NumberSign,
	    '$': TokenType.DollarSign,
	    '%': TokenType.PercentSign,
	    '&': TokenType.Ampersand,
	    '\'': TokenType.Apostrophe,
	    '(': TokenType.LeftParenthesis,
	    ')': TokenType.RightParenthesis,
	    '*': TokenType.Asterisk,
	    '+': TokenType.PlusSign,
	    ',': TokenType.Comma,
	    '-': TokenType.HyphenMinus,
	    '.': TokenType.FullStop,
	    '/': TokenType.Solidus,
	    ':': TokenType.Colon,
	    ';': TokenType.Semicolon,
	    '<': TokenType.LessThanSign,
	    '=': TokenType.EqualsSign,
	    '>': TokenType.GreaterThanSign,
	    '?': TokenType.QuestionMark,
	    '@': TokenType.CommercialAt,
	    '[': TokenType.LeftSquareBracket,
	    ']': TokenType.RightSquareBracket,
	    '^': TokenType.CircumflexAccent,
	    '_': TokenType.LowLine,
	    '{': TokenType.LeftCurlyBracket,
	    '|': TokenType.VerticalLine,
	    '}': TokenType.RightCurlyBracket,
	    '~': TokenType.Tilde
	  };

	  /**
	   * Add a token to the token list
	   * @param {string} type
	   * @param {string} value
	   */
	  function pushToken(type, value, column) {
	    tokens.push({
	      tn: tn++,
	      ln: ln,
	      col: column,
	      type: type,
	      value: value
	    });
	  }

	  /**
	   * Check if a character is a decimal digit
	   * @param {string} c Character
	   * @returns {boolean}
	   */
	  function isDecimalDigit(c) {
	    return '0123456789'.indexOf(c) >= 0;
	  }

	  /**
	   * Parse spaces
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseSpaces(css) {
	    var start = pos;

	    // Read the string until we meet a non-space character:
	    for (; pos < cssLength; pos++) {
	      if (css.charAt(pos) !== ' ') break;
	    }

	    // Add a substring containing only spaces to tokens:
	    pushToken(TokenType.Space, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse a string within quotes
	   * @param {string} css Unparsed part of CSS string
	   * @param {string} q Quote (either `'` or `"`)
	   */
	  function parseString(css, q) {
	    var start = pos;

	    // Read the string until we meet a matching quote:
	    for (pos++; pos < cssLength; pos++) {
	      // Skip escaped quotes:
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) === q) break;
	    }

	    // Add the string (including quotes) to tokens:
	    pushToken(q === '"' ? TokenType.StringDQ : TokenType.StringSQ, css.substring(start, pos + 1), col);
	    col += pos - start;
	  }

	  /**
	   * Parse numbers
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseDecimalNumber(css) {
	    var start = pos;

	    // Read the string until we meet a character that's not a digit:
	    for (; pos < cssLength; pos++) {
	      if (!isDecimalDigit(css.charAt(pos))) break;
	    }

	    // Add the number to tokens:
	    pushToken(TokenType.DecimalNumber, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse identifier
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseIdentifier(css) {
	    var start = pos;

	    // Skip all opening slashes:
	    while (css.charAt(pos) === '/') pos++;

	    // Read the string until we meet a punctuation mark:
	    for (; pos < cssLength; pos++) {
	      // Skip all '\':
	      if (css.charAt(pos) === '\\') pos++;else if (Punctuation[css.charAt(pos)]) break;
	    }

	    var ident = css.substring(start, pos--);

	    // Enter url mode if parsed substring is `url`:
	    urlMode = urlMode || ident === 'url';

	    // Add identifier to tokens:
	    pushToken(TokenType.Identifier, ident, col);
	    col += pos - start;
	  }

	  /**
	  * Parse a multiline comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseMLComment(css) {
	    var start = pos;

	    // Read the string until we meet `*/`.
	    // Since we already know first 2 characters (`/*`), start reading
	    // from `pos + 2`:
	    for (pos = pos + 2; pos < cssLength; pos++) {
	      if (css.charAt(pos) === '*' && css.charAt(pos + 1) === '/') {
	        pos++;
	        break;
	      }
	    }

	    // Add full comment (including `/*` and `*/`) to the list of tokens:
	    var comment = css.substring(start, pos + 1);
	    pushToken(TokenType.CommentML, comment, col);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  function parseSLComment(css) {
	    var start = pos;

	    // Read the string until we meet line break.
	    // Since we already know first 2 characters (`//`), start reading
	    // from `pos + 2`:
	    for (pos += 2; pos < cssLength; pos++) {
	      if (css.charAt(pos) === '\n' || css.charAt(pos) === '\r') {
	        break;
	      }
	    }

	    // Add comment (including `//` and line break) to the list of tokens:
	    pushToken(TokenType.CommentSL, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Convert a CSS string to a list of tokens
	   * @param {string} css CSS string
	   * @returns {Array} List of tokens
	   * @private
	   */
	  function getTokens(css) {
	    var c; // Current character
	    var cn; // Next character

	    cssLength = css.length;

	    // Parse string, character by character:
	    for (pos = 0; pos < cssLength; col++, pos++) {
	      c = css.charAt(pos);
	      cn = css.charAt(pos + 1);

	      // If we meet `/*`, it's a start of a multiline comment.
	      // Parse following characters as a multiline comment:
	      if (c === '/' && cn === '*') {
	        parseMLComment(css);
	      }

	      // If we meet `//` and it is not a part of url:
	      else if (!urlMode && c === '/' && cn === '/') {
	          // If we're currently inside a block, treat `//` as a start
	          // of identifier. Else treat `//` as a start of a single-line
	          // comment:
	          if (blockMode > 0) parseIdentifier(css);else parseSLComment(css);
	        }

	        // If current character is a double or single quote, it's a start
	        // of a string:
	        else if (c === '"' || c === "'") {
	            parseString(css, c);
	          }

	          // If current character is a space:
	          else if (c === ' ') {
	              parseSpaces(css);
	            }

	            // If current character is a punctuation mark:
	            else if (Punctuation[c]) {
	                // Add it to the list of tokens:
	                pushToken(Punctuation[c], c, col);
	                if (c === '\n' || c === '\r') {
	                  ln++;
	                  col = 0;
	                } // Go to next line
	                else if (c === ')') urlMode = false; // Exit url mode
	                  else if (c === '{') blockMode++; // Enter a block
	                    else if (c === '}') blockMode--; // Exit a block
	                      else if (c === '\t' && tabSize > 1) col += tabSize - 1;
	              }

	              // If current character is a decimal digit:
	              else if (isDecimalDigit(c)) {
	                  parseDecimalNumber(css);
	                }

	                // If current character is anything else:
	                else {
	                    parseIdentifier(css);
	                  }
	    }

	    return tokens;
	  }

	  return getTokens(css);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
	  mark: __webpack_require__(18),
	  parse: __webpack_require__(19),
	  stringify: __webpack_require__(4),
	  tokenizer: __webpack_require__(20)
	};
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TokenType = __webpack_require__(13);

	module.exports = (function () {
	  /**
	  * Mark whitespaces and comments
	  */
	  function markSC(tokens) {
	    var tokensLength = tokens.length;
	    var ws = -1; // Flag for whitespaces
	    var sc = -1; // Flag for whitespaces and comments
	    var t = undefined; // Current token

	    // For every token in the token list, mark spaces and line breaks
	    // as spaces (set both `ws` and `sc` flags). Mark multiline comments
	    // with `sc` flag.
	    // If there are several spaces or tabs or line breaks or multiline
	    // comments in a row, group them: take the last one's index number
	    // and save it to the first token in the group as a reference:
	    // e.g., `ws_last = 7` for a group of whitespaces or `sc_last = 9`
	    // for a group of whitespaces and comments.
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.Space:
	        case TokenType.Tab:
	        case TokenType.Newline:
	          t.ws = true;
	          t.sc = true;

	          if (ws === -1) ws = i;
	          if (sc === -1) sc = i;

	          break;
	        case TokenType.CommentML:
	        case TokenType.CommentSL:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          t.sc = true;

	          break;
	        default:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          if (sc !== -1) {
	            tokens[sc].sc_last = i - 1;
	            sc = -1;
	          }
	      }
	    }

	    if (ws !== -1) tokens[ws].ws_last = i - 1;
	    if (sc !== -1) tokens[sc].sc_last = i - 1;
	  }

	  /**
	  * Pair brackets
	  */
	  function markBrackets(tokens) {
	    var tokensLength = tokens.length;
	    var ps = []; // Parentheses
	    var sbs = []; // Square brackets
	    var cbs = []; // Curly brackets
	    var t = undefined; // Current token

	    // For every token in the token list, if we meet an opening (left)
	    // bracket, push its index number to a corresponding array.
	    // If we then meet a closing (right) bracket, look at the corresponding
	    // array. If there are any elements (records about previously met
	    // left brackets), take a token of the last left bracket (take
	    // the last index number from the array and find a token with
	    // this index number) and save right bracket's index as a reference:
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.LeftParenthesis:
	          ps.push(i);
	          break;
	        case TokenType.RightParenthesis:
	          if (ps.length) {
	            t.left = ps.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftSquareBracket:
	          sbs.push(i);
	          break;
	        case TokenType.RightSquareBracket:
	          if (sbs.length) {
	            t.left = sbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftCurlyBracket:
	          cbs.push(i);
	          break;
	        case TokenType.RightCurlyBracket:
	          if (cbs.length) {
	            t.left = cbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	      }
	    }
	  }

	  return function (tokens) {
	    markBrackets(tokens);
	    markSC(tokens);
	  };
	})();

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Node = __webpack_require__(1);
	var NodeType = __webpack_require__(15);
	var TokenType = __webpack_require__(13);

	var tokens = undefined;
	var tokensLength = undefined;
	var pos = undefined;

	var contexts = {
	  'arguments': function () {
	    return checkArguments(pos) && getArguments();
	  },
	  'atkeyword': function () {
	    return checkAtkeyword(pos) && getAtkeyword();
	  },
	  'atrule': function () {
	    return checkAtrule(pos) && getAtrule();
	  },
	  'block': function () {
	    return checkBlock(pos) && getBlock();
	  },
	  'brackets': function () {
	    return checkBrackets(pos) && getBrackets();
	  },
	  'class': function () {
	    return checkClass(pos) && getClass();
	  },
	  'combinator': function () {
	    return checkCombinator(pos) && getCombinator();
	  },
	  'commentML': function () {
	    return checkCommentML(pos) && getCommentML();
	  },
	  'commentSL': function () {
	    return checkCommentSL(pos) && getCommentSL();
	  },
	  'condition': function () {
	    return checkCondition(pos) && getCondition();
	  },
	  'declaration': function () {
	    return checkDeclaration(pos) && getDeclaration();
	  },
	  'declDelim': function () {
	    return checkDeclDelim(pos) && getDeclDelim();
	  },
	  'delim': function () {
	    return checkDelim(pos) && getDelim();
	  },
	  'dimension': function () {
	    return checkDimension(pos) && getDimension();
	  },
	  'escapedString': function () {
	    return checkEscapedString(pos) && getEscapedString();
	  },
	  'expression': function () {
	    return checkExpression(pos) && getExpression();
	  },
	  'extend': function () {
	    return checkExtend(pos) && getExtend();
	  },
	  'function': function () {
	    return checkFunction(pos) && getFunction();
	  },
	  'ident': function () {
	    return checkIdent(pos) && getIdent();
	  },
	  'important': function () {
	    return checkImportant(pos) && getImportant();
	  },
	  'include': function () {
	    return checkInclude(pos) && getInclude();
	  },
	  'interpolatedVariable': function () {
	    return checkInterpolatedVariable(pos) && getInterpolatedVariable();
	  },
	  'mixin': function () {
	    return checkMixin(pos) && getMixin();
	  },
	  'namespace': function () {
	    return checkNamespace(pos) && getNamespace();
	  },
	  'number': function () {
	    return checkNumber(pos) && getNumber();
	  },
	  'operator': function () {
	    return checkOperator(pos) && getOperator();
	  },
	  'parentheses': function () {
	    return checkParentheses(pos) && getParentheses();
	  },
	  'parentselector': function () {
	    return checkParentSelector(pos) && getParentSelector();
	  },
	  'percentage': function () {
	    return checkPercentage(pos) && getPercentage();
	  },
	  'progid': function () {
	    return checkProgid(pos) && getProgid();
	  },
	  'property': function () {
	    return checkProperty(pos) && getProperty();
	  },
	  'propertyDelim': function () {
	    return checkPropertyDelim(pos) && getPropertyDelim();
	  },
	  'pseudoc': function () {
	    return checkPseudoc(pos) && getPseudoc();
	  },
	  'pseudoe': function () {
	    return checkPseudoe(pos) && getPseudoe();
	  },
	  'ruleset': function () {
	    return checkRuleset(pos) && getRuleset();
	  },
	  's': function () {
	    return checkS(pos) && getS();
	  },
	  'selector': function () {
	    return checkSelector(pos) && getSelector();
	  },
	  'shash': function () {
	    return checkShash(pos) && getShash();
	  },
	  'string': function () {
	    return checkString(pos) && getString();
	  },
	  'stylesheet': function () {
	    return checkStylesheet(pos) && getStylesheet();
	  },
	  'unary': function () {
	    return checkUnary(pos) && getUnary();
	  },
	  'unicodeRange': function () {
	    return checkUnicodeRange(pos) && getUnicodeRange();
	  },
	  'urange': function () {
	    return checkUrange(pos) && getUrange();
	  },
	  'uri': function () {
	    return checkUri(pos) && getUri();
	  },
	  'value': function () {
	    return checkValue(pos) && getValue();
	  },
	  'variable': function () {
	    return checkVariable(pos) && getVariable();
	  },
	  'variableslist': function () {
	    return checkVariablesList(pos) && getVariablesList();
	  },
	  'vhash': function () {
	    return checkVhash(pos) && getVhash();
	  }
	};

	/**
	 * Stop parsing and display error
	 * @param {Number=} i Token's index number
	 */
	function throwError(i) {
	  var ln = tokens[i].ln;

	  throw { line: ln, syntax: 'less' };
	}

	/**
	 * @param {Object} exclude
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkExcluding(exclude, i) {
	  var start = i;

	  while (i < tokensLength) {
	    if (exclude[tokens[i++].type]) break;
	  }

	  return i - start - 2;
	}

	/**
	 * @param {Number} start
	 * @param {Number} finish
	 * @returns {String}
	 */
	function joinValues(start, finish) {
	  var s = '';

	  for (var i = start; i < finish + 1; i++) {
	    s += tokens[i].value;
	  }

	  return s;
	}

	/**
	 * @param {Number} start
	 * @param {Number} num
	 * @returns {String}
	 */
	function joinValues2(start, num) {
	  if (start + num - 1 >= tokensLength) return;

	  var s = '';

	  for (var i = 0; i < num; i++) {
	    s += tokens[start + i].value;
	  }

	  return s;
	}

	function getLastPosition(content, line, column, colOffset) {
	  return typeof content === 'string' ? getLastPositionForString(content, line, column, colOffset) : getLastPositionForArray(content, line, column, colOffset);
	}

	function getLastPositionForString(content, line, column, colOffset) {
	  var position = [];

	  if (!content) {
	    position = [line, column];
	    if (colOffset) position[1] += colOffset - 1;
	    return position;
	  }

	  var lastLinebreak = content.lastIndexOf('\n');
	  var endsWithLinebreak = lastLinebreak === content.length - 1;
	  var splitContent = content.split('\n');
	  var linebreaksCount = splitContent.length - 1;
	  var prevLinebreak = linebreaksCount === 0 || linebreaksCount === 1 ? -1 : content.length - splitContent[linebreaksCount - 1].length - 2;

	  // Line:
	  var offset = endsWithLinebreak ? linebreaksCount - 1 : linebreaksCount;
	  position[0] = line + offset;

	  // Column:
	  if (endsWithLinebreak) {
	    offset = prevLinebreak !== -1 ? content.length - prevLinebreak : content.length - 1;
	  } else {
	    offset = linebreaksCount !== 0 ? content.length - lastLinebreak - column - 1 : content.length - 1;
	  }
	  position[1] = column + offset;

	  if (!colOffset) return position;

	  if (endsWithLinebreak) {
	    position[0]++;
	    position[1] = colOffset;
	  } else {
	    position[1] += colOffset;
	  }

	  return position;
	}

	function getLastPositionForArray(content, line, column, colOffset) {
	  var position;

	  if (content.length === 0) {
	    position = [line, column];
	  } else {
	    var c = content[content.length - 1];
	    if (c.hasOwnProperty('end')) {
	      position = [c.end.line, c.end.column];
	    } else {
	      position = getLastPosition(c.content, line, column);
	    }
	  }

	  if (!colOffset) return position;

	  if (tokens[pos - 1].type !== 'Newline') {
	    position[1] += colOffset;
	  } else {
	    position[0]++;
	    position[1] = 1;
	  }

	  return position;
	}

	function newNode(type, content, line, column, end) {
	  if (!end) end = getLastPosition(content, line, column);
	  return new Node({
	    type: type,
	    content: content,
	    start: {
	      line: line,
	      column: column
	    },
	    end: {
	      line: end[0],
	      column: end[1]
	    },
	    syntax: 'less'
	  });
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkAny(i) {
	  var l;

	  if (l = checkBrackets(i)) tokens[i].any_child = 1;else if (l = checkParentheses(i)) tokens[i].any_child = 2;else if (l = checkString(i)) tokens[i].any_child = 3;else if (l = checkVariablesList(i)) tokens[i].any_child = 4;else if (l = checkVariable(i)) tokens[i].any_child = 5;else if (l = checkPercentage(i)) tokens[i].any_child = 6;else if (l = checkDimension(i)) tokens[i].any_child = 7;else if (l = checkUnicodeRange(i)) tokens[i].any_child = 15;else if (l = checkNumber(i)) tokens[i].any_child = 8;else if (l = checkUri(i)) tokens[i].any_child = 9;else if (l = checkExpression(i)) tokens[i].any_child = 10;else if (l = checkFunction(i)) tokens[i].any_child = 11;else if (l = checkIdent(i)) tokens[i].any_child = 12;else if (l = checkClass(i)) tokens[i].any_child = 13;else if (l = checkUnary(i)) tokens[i].any_child = 14;

	  return l;
	}

	/**
	 * @returns {Array}
	 */
	function getAny() {
	  var childType = tokens[pos].any_child;

	  if (childType === 1) return getBrackets();
	  if (childType === 2) return getParentheses();
	  if (childType === 3) return getString();
	  if (childType === 4) return getVariablesList();
	  if (childType === 5) return getVariable();
	  if (childType === 6) return getPercentage();
	  if (childType === 7) return getDimension();
	  if (childType === 15) return getUnicodeRange();
	  if (childType === 8) return getNumber();
	  if (childType === 9) return getUri();
	  if (childType === 10) return getExpression();
	  if (childType === 11) return getFunction();
	  if (childType === 12) return getIdent();
	  if (childType === 13) return getClass();
	  if (childType === 14) return getUnary();
	}

	/**
	 * Check if token is part of mixin's arguments.
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkArguments(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength || tokens[i++].type !== TokenType.LeftParenthesis) return 0;

	  while (i < tokens[start].right) {
	    if (l = checkArgument(i)) i += l;else return 0;
	  }

	  return tokens[start].right - start + 1;
	}

	/**
	 * Check if token is valid to be part of arguments list.
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkArgument(i) {
	  var l;

	  if (l = checkEscapedString(i)) tokens[i].argument_child = 1;else if (l = checkDeclaration(i)) tokens[i].argument_child = 2;else if (l = checkVariablesList(i)) tokens[i].argument_child = 3;else if (l = checkVariable(i)) tokens[i].argument_child = 4;else if (l = checkSC(i)) tokens[i].argument_child = 5;else if (l = checkUnary(i)) tokens[i].argument_child = 6;else if (l = checkOperator(i)) tokens[i].argument_child = 7;else if (l = checkDelim(i)) tokens[i].argument_child = 8;else if (l = checkDeclDelim(i)) tokens[i].argument_child = 9;else if (l = checkString(i)) tokens[i].argument_child = 10;else if (l = checkPercentage(i)) tokens[i].argument_child = 11;else if (l = checkDimension(i)) tokens[i].argument_child = 12;else if (l = checkNumber(i)) tokens[i].argument_child = 13;else if (l = checkUri(i)) tokens[i].argument_child = 14;else if (l = checkFunction(i)) tokens[i].argument_child = 15;else if (l = checkIdent(i)) tokens[i].argument_child = 16;else if (l = checkVhash(i)) tokens[i].argument_child = 17;else if (l = checkBlock(i)) tokens[i].argument_child = 18;else if (l = checkParentheses(i)) tokens[i].argument_child = 19;

	  return l;
	}

	/**
	 * @returns {Array} Node that is part of arguments list.
	 */
	function getArgument() {
	  var childType = tokens[pos].argument_child;

	  if (childType === 1) return getEscapedString();
	  if (childType === 2) return getDeclaration();
	  if (childType === 3) return getVariablesList();
	  if (childType === 4) return getVariable();
	  if (childType === 5) return getSC();
	  if (childType === 6) return getUnary();
	  if (childType === 7) return getOperator();
	  if (childType === 8) return getDelim();
	  if (childType === 9) return getDeclDelim();
	  if (childType === 10) return getString();
	  if (childType === 11) return getPercentage();
	  if (childType === 12) return getDimension();
	  if (childType === 13) return getNumber();
	  if (childType === 14) return getUri();
	  if (childType === 15) return getFunction();
	  if (childType === 16) return getIdent();
	  if (childType === 17) return getVhash();
	  if (childType === 18) return getBlock();
	  if (childType === 19) return getParentheses();
	}

	/**
	 * Check if token is part of an @-word (e.g. `@import`, `@include`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkAtkeyword(i) {
	  var l;

	  // Check that token is `@`:
	  if (i >= tokensLength || tokens[i++].type !== TokenType.CommercialAt) return 0;

	  return (l = checkIdent(i)) ? l + 1 : 0;
	}

	/**
	 * Get node with @-word
	 * @returns {Array} `['atkeyword', ['ident', x]]` where `x` is
	 *      an identifier without
	 *      `@` (e.g. `import`, `include`)
	 */
	function getAtkeyword() {
	  var token = tokens[pos++];
	  var content = [getIdent()];

	  return newNode(NodeType.AtkeywordType, content, token.ln, token.col);
	}

	/**
	 * Check if token is a part of an @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of @-rule
	 */
	function checkAtrule(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  // If token already has a record of being part of an @-rule,
	  // return the @-rule's length:
	  if (tokens[i].atrule_l !== undefined) return tokens[i].atrule_l;

	  // If token is part of an @-rule, save the rule's type to token.
	  if (l = checkKeyframesRule(i)) tokens[i].atrule_type = 4;
	  // @-rule with ruleset:
	  else if (l = checkAtruler(i)) tokens[i].atrule_type = 1;
	    // Block @-rule:
	    else if (l = checkAtruleb(i)) tokens[i].atrule_type = 2;
	      // Single-line @-rule:
	      else if (l = checkAtrules(i)) tokens[i].atrule_type = 3;else return 0;

	  // If token is part of an @-rule, save the rule's length to token:
	  tokens[i].atrule_l = l;

	  return l;
	}

	/**
	 * Get node with @-rule
	 * @returns {Array}
	 */
	function getAtrule() {
	  switch (tokens[pos].atrule_type) {
	    case 1:
	      return getAtruler(); // @-rule with ruleset
	    case 2:
	      return getAtruleb(); // Block @-rule
	    case 3:
	      return getAtrules(); // Single-line @-rule
	    case 4:
	      return getKeyframesRule();
	  }
	}

	/**
	 * Check if token is part of a block @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */
	function checkAtruleb(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a block @-rule
	 * @returns {Array} `['atruleb', ['atkeyword', x], y, ['block', z]]`
	 */
	function getAtruleb() {
	  var startPos = pos;
	  var content = [getAtkeyword()].concat(getTsets()).concat([getBlock()]);

	  var token = tokens[startPos];
	  return newNode(NodeType.AtruleType, content, token.ln, token.col);
	}

	/**
	 * Check if token is part of an @-rule with ruleset
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */
	function checkAtruler(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  if (i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket) i++;else return 0;

	  if (l = checkAtrulers(i)) i += l;

	  if (i < tokensLength && tokens[i].type === TokenType.RightCurlyBracket) i++;else return 0;

	  return i - start;
	}

	/**
	 * Get node with an @-rule with ruleset
	 * @returns {Array} ['atruler', ['atkeyword', x], y, z]
	 */
	function getAtruler() {
	  var startPos = pos;
	  var content = [getAtkeyword()];
	  content = content.concat(getTsets());
	  content.push(getAtrulers());

	  var token = tokens[startPos];
	  return newNode(NodeType.AtruleType, content, token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkAtrulers(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSC(i)) i += l;

	  while (i < tokensLength) {
	    if (l = checkSC(i)) tokens[i].atrulers_child = 1;else if (l = checkAtrule(i)) tokens[i].atrulers_child = 2;else if (l = checkRuleset(i)) tokens[i].atrulers_child = 3;else break;
	    i += l;
	  }

	  tokens[i].atrulers_end = 1;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array} `['atrulers', x]`
	 */
	function getAtrulers() {
	  var token = tokens[pos++];
	  var line = token.ln;
	  var column = token.col;
	  var content = getSC();

	  while (!tokens[pos].atrulers_end) {
	    var childType = tokens[pos].atrulers_child;
	    if (childType === 1) content = content.concat(getSC());else if (childType === 2) content.push(getAtrule());else if (childType === 3) content.push(getRuleset());
	  }

	  content = content.concat(getSC());

	  var end = getLastPosition(content, line, column, 1);
	  pos++;

	  return newNode(NodeType.BlockType, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkAtrules(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array} `['atrules', ['atkeyword', x], y]`
	 */
	function getAtrules() {
	  var startPos = pos;
	  var content = [getAtkeyword()].concat(getTsets());

	  var token = tokens[startPos];
	  return newNode(NodeType.AtruleType, content, token.ln, token.col);
	}

	/**
	 * Check if token is part of a block (e.g. `{...}`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the block
	 */
	function checkBlock(i) {
	  return i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket ? tokens[i].right - i + 1 : 0;
	}

	/**
	 * Get node with a block
	 * @returns {Array} `['block', x]`
	 */
	function getBlock() {
	  var startPos = pos;
	  var end = tokens[pos++].right;
	  var content = [];
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  while (pos < end) {
	    if (checkBlockdecl(pos)) content = content.concat(getBlockdecl());else throwError(pos);
	  }

	  var end_ = getLastPosition(content, line, column, 1);
	  pos = end + 1;

	  return newNode(NodeType.BlockType, content, line, column, end_);
	}

	/**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */
	function checkBlockdecl(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkBlockdecl1(i)) tokens[i].bd_type = 1;else if (l = checkBlockdecl2(i)) tokens[i].bd_type = 2;else if (l = checkBlockdecl3(i)) tokens[i].bd_type = 3;else if (l = checkBlockdecl4(i)) tokens[i].bd_type = 4;else return 0;

	  return l;
	}

	/**
	 * @returns {Array}
	 */
	function getBlockdecl() {
	  switch (tokens[pos].bd_type) {
	    case 1:
	      return getBlockdecl1();
	    case 2:
	      return getBlockdecl2();
	    case 3:
	      return getBlockdecl3();
	    case 4:
	      return getBlockdecl4();
	  }
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBlockdecl1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkCondition(i)) tokens[i].bd_kind = 1;else if (l = checkExtend(i)) tokens[i].bd_kind = 6;else if (l = checkRuleset(i)) tokens[i].bd_kind = 2;else if (l = checkDeclaration(i)) tokens[i].bd_kind = 3;else if (l = checkAtrule(i)) tokens[i].bd_kind = 4;else if (l = checkInclude(i)) tokens[i].bd_kind = 5;else return 0;

	  i += l;

	  if (i < tokensLength && (l = checkDeclDelim(i))) i += l;else return 0;

	  if (l = checkSC(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @returns {Array}
	 */
	function getBlockdecl1() {
	  var sc = getSC();
	  var x = undefined;

	  switch (tokens[pos].bd_kind) {
	    case 1:
	      x = getCondition();
	      break;
	    case 2:
	      x = getRuleset();
	      break;
	    case 3:
	      x = getDeclaration();
	      break;
	    case 4:
	      x = getAtrule();
	      break;
	    case 5:
	      x = getInclude();
	      break;
	    case 6:
	      x = getExtend();
	      break;
	  }

	  return sc.concat([x]).concat([getDeclDelim()]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBlockdecl2(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkCondition(i)) tokens[i].bd_kind = 1;else if (l = checkExtend(i)) tokens[i].bd_kind = 3;else if (l = checkRuleset(i)) tokens[i].bd_kind = 6;else if (l = checkDeclaration(i)) tokens[i].bd_kind = 4;else if (l = checkAtrule(i)) tokens[i].bd_kind = 5;else if (l = checkInclude(i)) tokens[i].bd_kind = 2;else return 0;

	  i += l;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array}
	 */
	function getBlockdecl2() {
	  var sc = getSC();
	  var x = undefined;

	  switch (tokens[pos].bd_kind) {
	    case 1:
	      x = getCondition();
	      break;
	    case 2:
	      x = getInclude();
	      break;
	    case 3:
	      x = getExtend();
	      break;
	    case 4:
	      x = getDeclaration();
	      break;
	    case 5:
	      x = getAtrule();
	      break;
	    case 6:
	      x = getRuleset();
	      break;
	  }

	  return sc.concat([x]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBlockdecl3(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkDeclDelim(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array} `[s0, ['declDelim'], s1]` where `s0` and `s1` are
	 *      are optional whitespaces.
	 */
	function getBlockdecl3() {
	  return getSC().concat([getDeclDelim()]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBlockdecl4(i) {
	  return checkSC(i);
	}

	/**
	 * @returns {Array}
	 */
	function getBlockdecl4() {
	  return getSC();
	}

	/**
	 * Check if token is part of text inside square brackets, e.g. `[1]`
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBrackets(i) {
	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftSquareBracket) return 0;

	  return tokens[i].right - i + 1;
	}

	/**
	 * Get node with text inside square brackets, e.g. `[1]`
	 * @returns {Node}
	 */
	function getBrackets() {
	  var startPos = pos++;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;
	  var tsets = getTsets();

	  var end = getLastPosition(tsets, line, column, 1);
	  pos++;

	  return newNode(NodeType.BracketsType, tsets, line, column, end);
	}

	/**
	 * Check if token is part of a class selector (e.g. `.abc`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the class selector
	 */
	function checkClass(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].class_l) return tokens[i].class_l;

	  if (tokens[i++].type === TokenType.FullStop) {
	    if (l = checkInterpolatedVariable(i)) tokens[i].class_child = 1;else if (l = checkIdent(i)) tokens[i].class_child = 2;else return 0;

	    tokens[i].class_l = l + 1;
	    return l + 1;
	  }

	  return 0;
	}

	/**
	 * Get node with a class selector
	 * @returns {Array} `['class', ['ident', x]]` where x is a class's
	 *      identifier (without `.`, e.g. `abc`).
	 */
	function getClass() {
	  var startPos = pos++;
	  var content = [];

	  var childType = tokens[pos].class_child;
	  if (childType === 1) content.push(getInterpolatedVariable());else content.push(getIdent());

	  var token = tokens[startPos];
	  return newNode(NodeType.ClassType, content, token.ln, token.col);
	}

	function checkCombinator(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  if (l = checkCombinator1(i)) tokens[i].combinatorType = 1;else if (l = checkCombinator2(i)) tokens[i].combinatorType = 2;else if (l = checkCombinator3(i)) tokens[i].combinatorType = 3;

	  return l;
	}

	function getCombinator() {
	  var type = tokens[pos].combinatorType;
	  if (type === 1) return getCombinator1();
	  if (type === 2) return getCombinator2();
	  if (type === 3) return getCombinator3();
	}
	/**
	 * (1) `||`
	 */
	function checkCombinator1(i) {
	  if (tokens[i].type === TokenType.VerticalLine && tokens[i + 1].type === TokenType.VerticalLine) return 2;else return 0;
	}

	function getCombinator1() {
	  var type = NodeType.CombinatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '||';

	  pos += 2;
	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `>`
	 * (2) `+`
	 * (3) `~`
	 */
	function checkCombinator2(i) {
	  var type = tokens[i].type;
	  if (type === TokenType.PlusSign || type === TokenType.GreaterThanSign || type === TokenType.Tilde) return 1;else return 0;
	}

	function getCombinator2() {
	  var type = NodeType.CombinatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = tokens[pos++].value;

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `/panda/`
	 */
	function checkCombinator3(i) {
	  var start = i;

	  if (tokens[i].type === TokenType.Solidus) i++;else return 0;

	  var l = undefined;
	  if (l = checkIdent(i)) i += l;else return 0;

	  if (tokens[i].type === TokenType.Solidus) i++;else return 0;

	  return i - start;
	}

	function getCombinator3() {
	  var type = NodeType.CombinatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;

	  // Skip `/`.
	  pos++;
	  var ident = getIdent();

	  // Skip `/`.
	  pos++;

	  var content = '/' + ident.content + '/';

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a multiline comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a multiline comment, otherwise `0`
	 */
	function checkCommentML(i) {
	  return i < tokensLength && tokens[i].type === TokenType.CommentML ? 1 : 0;
	}

	/**
	 * Get node with a multiline comment
	 * @returns {Array} `['commentML', x]` where `x`
	 *      is the comment's text (without `/*` and `* /`).
	 */
	function getCommentML() {
	  var startPos = pos;
	  var s = tokens[pos].value.substring(2);
	  var l = s.length;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  if (s.charAt(l - 2) === '*' && s.charAt(l - 1) === '/') s = s.substring(0, l - 2);

	  var end = getLastPosition(s, line, column, 2);
	  if (end[0] === line) end[1] += 2;
	  pos++;

	  return newNode(NodeType.CommentMLType, s, line, column, end);
	}

	/**
	 * Check if token is part of a single-line comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a single-line comment, otherwise `0`
	 */
	function checkCommentSL(i) {
	  return i < tokensLength && tokens[i].type === TokenType.CommentSL ? 1 : 0;
	}

	/**
	 * Get node with a single-line comment.
	 * @returns {Array}
	 */
	function getCommentSL() {
	  var startPos = pos;
	  var x = tokens[pos++].value.substring(2);
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  var end = getLastPosition(x, line, column + 2);
	  return newNode(NodeType.CommentSLType, x, line, column, end);
	}

	/**
	 * Check if token is part of a condition.
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the condition
	 */
	function checkCondition(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if ((l = checkIdent(i)) && tokens[i].value === 'when') i += l;else return 0;

	  while (i < tokensLength) {
	    if (l = checkBlock(i)) {
	      tokens[i].condition_child = 0;
	      break;
	    } else if (l = checkFunction(i)) tokens[i].condition_child = 1;else if (l = checkBrackets(i)) tokens[i].condition_child = 2;else if (l = checkParentheses(i)) tokens[i].condition_child = 3;else if (l = checkVariable(i)) tokens[i].condition_child = 4;else if (l = checkIdent(i)) tokens[i].condition_child = 5;else if (l = checkNumber(i)) tokens[i].condition_child = 6;else if (l = checkDelim(i)) tokens[i].condition_child = 7;else if (l = checkOperator(i)) tokens[i].condition_child = 8;else if (l = checkCombinator(i)) tokens[i].condition_child = 9;else if (l = checkSC(i)) tokens[i].condition_child = 10;else if (l = checkString(i)) tokens[i].condition_child = 11;else return 0;

	    i += l;
	  }

	  return i - start;
	}

	/**
	 * Get node with a condition.
	 * @returns {Array} `['condition', x]`
	 */
	function getCondition() {
	  var startPos = pos;
	  var x = [];

	  x.push(getIdent());

	  while (pos < tokensLength) {
	    var childType = tokens[pos].condition_child;

	    if (childType === 0) break;else if (childType === 1) x.push(getFunction());else if (childType === 2) x.push(getBrackets());else if (childType === 3) x.push(getParentheses());else if (childType === 4) x.push(getVariable());else if (childType === 5) x.push(getIdent());else if (childType === 6) x.push(getNumber());else if (childType === 7) x.push(getDelim());else if (childType === 8) x.push(getOperator());else if (childType === 9) x.push(getCombinator());else if (childType === 10) x = x.concat(getSC());else if (childType === 11) x.push(getString());
	  }

	  var token = tokens[startPos];
	  return newNode(NodeType.ConditionType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */
	function checkDeclaration(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkProperty(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkPropertyDelim(i)) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkValue(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a declaration
	 * @returns {Array} `['declaration', ['property', x], ['propertyDelim'],
	 *       ['value', y]]`
	 */
	function getDeclaration() {
	  var startPos = pos;
	  var x = [getProperty()].concat(getSC()).concat([getPropertyDelim()]).concat(getSC()).concat([getValue()]);

	  var token = tokens[startPos];
	  return newNode(NodeType.DeclarationType, x, token.ln, token.col);
	}

	/**
	 * Check if token is a semicolon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a semicolon, otherwise `0`
	 */
	function checkDeclDelim(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Semicolon ? 1 : 0;
	}

	/**
	 * Get node with a semicolon
	 * @returns {Array} `['declDelim']`
	 */
	function getDeclDelim() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.DeclDelimType, ';', token.ln, token.col);
	}

	/**
	 * Check if token is a comma
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a comma, otherwise `0`
	 */
	function checkDelim(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Comma ? 1 : 0;
	}

	/**
	 * Get node with a comma
	 * @returns {Array} `['delim']`
	 */
	function getDelim() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.DelimType, ',', token.ln, token.col);
	}

	/**
	 * Check if token is part of a number with dimension unit (e.g. `10px`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkDimension(i) {
	  var ln = checkNumber(i);
	  var li = undefined;

	  if (i >= tokensLength || !ln || i + ln >= tokensLength) return 0;

	  return (li = checkNmName2(i + ln)) ? ln + li : 0;
	}

	/**
	 * Get node of a number with dimension unit
	 * @returns {Array} `['dimension', ['number', x], ['ident', y]]` where
	 *      `x` is a number converted to string (e.g. `'10'`) and `y` is
	 *      a dimension unit (e.g. `'px'`).
	 */
	function getDimension() {
	  var startPos = pos;
	  var x = [getNumber()];
	  var token = tokens[pos];
	  var ident = newNode(NodeType.IdentType, getNmName2(), token.ln, token.col);

	  x.push(ident);

	  token = tokens[startPos];
	  return newNode(NodeType.DimensionType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of an escaped string (e.g. `~"ms:something"`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the string (including `~` and quotes)
	 */
	function checkEscapedString(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].type === TokenType.Tilde && (l = checkString(i + 1))) return i + l - start;else return 0;
	}

	/**
	 * Get node with an escaped string
	 * @returns {Array} `['escapedString', ['string', x]]` where `x` is a string
	 *      without `~` but with quotes
	 */
	function getEscapedString() {
	  var startPos = pos++;
	  var x = tokens[pos++].value;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  var end = getLastPosition(x, line, column + 1);
	  return newNode(NodeType.EscapedStringType, x, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkExpression(i) {
	  var start = i;

	  if (i >= tokensLength || tokens[i++].value !== 'expression' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) {
	    return 0;
	  }

	  return tokens[i].right - start + 1;
	}

	/**
	 * @returns {Array}
	 */
	function getExpression() {
	  var startPos = pos++;
	  var x = undefined;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  x = joinValues(pos + 1, tokens[pos].right - 1);
	  var end = getLastPosition(x, line, column, 1);
	  if (end[0] === line) end[1] += 11;
	  pos = tokens[pos].right + 1;

	  return newNode(NodeType.ExpressionType, x, token.ln, token.col, end);
	}

	function checkExtend(i) {
	  if (i >= tokensLength) return 0;

	  var l;
	  if (l = checkExtend1(i)) tokens[i].extendType = 1;else if (l = checkExtend2(i)) tokens[i].extendType = 2;else return 0;

	  return l;
	}

	function getExtend() {
	  var childType = tokens[pos].extendType;
	  if (childType === 1) return getExtend1();
	  if (childType === 2) return getExtend2();
	}

	/**
	 * (1) `selector:extend(selector) {...}`
	 */
	function checkExtend1(i) {
	  var start = i;
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkExtendSelector(i)) i += l;else return 0;

	  if (tokens[i + 1] && tokens[i + 1].value === 'extend' && (l = checkPseudoc(i))) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	function getExtend1() {
	  var startPos = pos;
	  var x = [].concat(getExtendSelector(), [getPseudoc()], getSC(), [getBlock()]);

	  var token = tokens[startPos];
	  return newNode(NodeType.ExtendType, x, token.ln, token.col);
	}

	/**
	 * (1) `selector:extend(selector)`
	 */
	function checkExtend2(i) {
	  var start = i;
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkExtendSelector(i)) i += l;else return 0;

	  if (tokens[i + 1] && tokens[i + 1].value === 'extend' && (l = checkPseudoc(i))) i += l;else return 0;

	  return i - start;
	}

	function getExtend2() {
	  var startPos = pos;
	  var x = [].concat(getExtendSelector(), [getPseudoc()]);

	  var token = tokens[startPos];
	  return newNode(NodeType.ExtendType, x, token.ln, token.col);
	}

	function checkExtendSelector(i) {
	  var l;

	  if (l = checkParentSelectorWithExtension(i)) tokens[i].extend_type = 1;else if (l = checkIdent(i)) tokens[i].extend_type = 2;else if (l = checkClass(i)) tokens[i].extend_type = 3;else if (l = checkShash(i)) tokens[i].extend_type = 4;

	  return l;
	}

	function getExtendSelector() {
	  var childType = tokens[pos].extend_type;

	  if (childType === 1) return getParentSelectorWithExtension();
	  if (childType === 2) return [getIdent()];
	  if (childType === 3) return [getClass()];
	  if (childType === 4) return [getShash()];
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkFunction(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i < tokensLength && tokens[i].type === TokenType.LeftParenthesis ? tokens[i].right - start + 1 : 0;
	}

	/**
	 * @returns {Array}
	 */
	function getFunction() {
	  var token = tokens[pos];
	  var ident = getIdent();
	  var x = [ident];
	  var body;

	  body = getArguments();

	  x.push(body);

	  return newNode(NodeType.FunctionType, x, token.ln, token.col);
	}

	/**
	 * @returns {Array}
	 */
	function getArguments() {
	  var startPos = pos;
	  var x = [];
	  var body = undefined;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  pos++;

	  while (pos < tokensLength && tokens[pos].type !== TokenType.RightParenthesis) {
	    if (checkDeclaration(pos)) x.push(getDeclaration());else if (checkArgument(pos)) {
	      body = getArgument();
	      if (typeof body.content === 'string') x.push(body);else x = x.concat(body);
	    } else if (checkClass(pos)) x.push(getClass());else throwError(pos);
	  }

	  var end = getLastPosition(x, line, column, 1);
	  pos++;

	  return newNode(NodeType.ArgumentsType, x, line, column, end);
	}

	/**
	 * Check if token is part of an identifier
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the identifier
	 */
	function checkIdent(i) {
	  var start = i;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].type === TokenType.HyphenMinus) i++;

	  if (tokens[i].type === TokenType.LowLine || tokens[i].type === TokenType.Identifier) i++;else return 0;

	  for (; i < tokensLength; i++) {
	    if (tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.LowLine && tokens[i].type !== TokenType.Identifier && tokens[i].type !== TokenType.DecimalNumber) break;
	  }

	  tokens[start].ident_last = i - 1;

	  return i - start;
	}

	/**
	 * Get node with an identifier
	 * @returns {Array} `['ident', x]` where `x` is identifier's name
	 */
	function getIdent() {
	  var startPos = pos;
	  var x = joinValues(pos, tokens[pos].ident_last);

	  pos = tokens[pos].ident_last + 1;

	  var token = tokens[startPos];
	  return newNode(NodeType.IdentType, x, token.ln, token.col);
	}

	/**
	 * @param {number} i Token's index number
	 * @returns {number} Length of the identifier
	 */
	function checkPartialIdent(i) {
	  var start = i;

	  if (i >= tokensLength) return 0;

	  for (; i < tokensLength; i++) {
	    if (tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.LowLine && tokens[i].type !== TokenType.Identifier && tokens[i].type !== TokenType.DecimalNumber) break;
	  }

	  tokens[start].ident_last = i - 1;

	  return i - start;
	}

	/**
	 * Check if token is part of `!important` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkImportant(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark) return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].value === 'important') {
	    tokens[start].importantEnd = i;
	    return i - start + 1;
	  } else {
	    return 0;
	  }
	}

	/**
	 * Get node with `!important` word
	 * @returns {Array} `['important', sc]` where `sc` is optional whitespace
	 */
	function getImportant() {
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = joinValues(pos, token.importantEnd);

	  pos = token.importantEnd + 1;

	  return newNode(NodeType.ImportantType, content, line, column);
	}

	/**
	 * Check if token is part of an include (`@include` or `@extend` directive).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkInclude(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkInclude1(i)) tokens[i].include_type = 1;else if (l = checkInclude2(i)) tokens[i].include_type = 2;

	  return l;
	}

	/**
	 * Get node with included mixin
	 * @returns {Array} `['include', x]`
	 */
	function getInclude() {
	  switch (tokens[pos].include_type) {
	    case 1:
	      return getInclude1();
	    case 2:
	      return getInclude2();
	  }
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkInclude1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkClass(i) || checkShash(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    if (l = checkClass(i) || checkShash(i) || checkSC(i)) i += l;else if (tokens[i].type === TokenType.GreaterThanSign) i++;else break;
	  }

	  if (l = checkArguments(i)) i += l;else return 0;

	  if (i < tokensLength && (l = checkSC(i))) i += l;

	  if (i < tokensLength && (l = checkImportant(i))) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array} `['include', x]`
	 */
	function getInclude1() {
	  var startPos = pos;
	  var x = [];

	  x.push(checkClass(pos) ? getClass() : getShash());

	  while (pos < tokensLength) {
	    if (checkClass(pos)) x.push(getClass());else if (checkShash(pos)) x.push(getShash());else if (checkSC(pos)) x = x.concat(getSC());else if (checkOperator(pos)) x.push(getOperator());else break;
	  }

	  x.push(getArguments());

	  x = x.concat(getSC());

	  if (checkImportant(pos)) x.push(getImportant());

	  var token = tokens[startPos];
	  return newNode(NodeType.IncludeType, x, token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkInclude2(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkClass(i) || checkShash(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    if (l = checkClass(i) || checkShash(i) || checkSC(i)) i += l;else if (tokens[i].type === TokenType.GreaterThanSign) i++;else break;
	  }

	  return i - start;
	}

	/**
	 * @returns {Array} `['include', x]`
	 */
	function getInclude2() {
	  var startPos = pos;
	  var x = [];

	  x.push(checkClass(pos) ? getClass() : getShash());

	  while (pos < tokensLength) {
	    if (checkClass(pos)) x.push(getClass());else if (checkShash(pos)) x.push(getShash());else if (checkSC(pos)) x = x.concat(getSC());else if (checkOperator(pos)) x.push(getOperator());else break;
	  }

	  var token = tokens[startPos];
	  return newNode(NodeType.IncludeType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of LESS interpolated variable
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkInterpolatedVariable(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].type !== TokenType.CommercialAt || !tokens[i + 1] || tokens[i + 1].type !== TokenType.LeftCurlyBracket) {
	    return 0;
	  }

	  i += 2;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return tokens[i].type === TokenType.RightCurlyBracket ? i - start + 1 : 0;
	}

	/**
	 * Get node with LESS interpolated variable
	 * @returns {Array} `['interpolatedVariable', x]`
	 */
	function getInterpolatedVariable() {
	  var startPos = pos;
	  var x = [];
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  // Skip `@{`:
	  pos += 2;

	  x.push(getIdent());

	  // Skip `}`:
	  var end = getLastPosition(x, line, column, 1);
	  pos++;

	  return newNode(NodeType.InterpolatedVariableType, x, line, column, end);
	}

	function checkKeyframesBlock(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkKeyframesSelector(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	function getKeyframesBlock() {
	  var type = NodeType.RulesetType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [].concat([getKeyframesSelector()], getSC(), [getBlock()]);

	  return newNode(type, content, line, column);
	}

	function checkKeyframesBlocks(i) {
	  var start = i;
	  var l = undefined;

	  if (i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkKeyframesBlock(i)) i += l;else return 0;

	  while (tokens[i].type !== TokenType.RightCurlyBracket) {
	    if (l = checkSC(i)) i += l;else if (l = checkKeyframesBlock(i)) i += l;else break;
	  }

	  if (i < tokensLength && tokens[i].type === TokenType.RightCurlyBracket) i++;else return 0;

	  return i - start;
	}

	function getKeyframesBlocks() {
	  var type = NodeType.BlockType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];
	  var keyframesBlocksEnd = token.right;

	  // Skip `{`.
	  pos++;

	  while (pos < keyframesBlocksEnd) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkKeyframesBlock(pos)) content.push(getKeyframesBlock());
	  }

	  var end = getLastPosition(content, line, column, 1);

	  // Skip `}`.
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * Check if token is part of a @keyframes rule.
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @keyframes rule
	 */
	function checkKeyframesRule(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  var atruleName = joinValues2(i - l, l);
	  if (atruleName.indexOf('keyframes') === -1) return 0;

	  if (l = checkSC(i)) i += l;else return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkKeyframesBlocks(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getKeyframesRule() {
	  var type = NodeType.AtruleType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [].concat([getAtkeyword()], getSC(), [getIdent()], getSC(), [getKeyframesBlocks()]);

	  return newNode(type, content, line, column);
	}

	function checkKeyframesSelector(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) {
	    // Valid selectors are only `from` and `to`.
	    var selector = joinValues2(i, l);
	    if (selector !== 'from' && selector !== 'to') return 0;

	    i += l;
	    tokens[start].keyframesSelectorType = 1;
	  } else if (l = checkPercentage(i)) {
	    i += l;
	    tokens[start].keyframesSelectorType = 2;
	  } else {
	    return 0;
	  }

	  return i - start;
	}

	function getKeyframesSelector() {
	  var keyframesSelectorType = NodeType.KeyframesSelectorType;
	  var selectorType = NodeType.SelectorType;

	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (token.keyframesSelectorType === 1) {
	    content.push(getIdent());
	  } else {
	    content.push(getPercentage());
	  }

	  var keyframesSelector = newNode(keyframesSelectorType, content, line, column);
	  return newNode(selectorType, [keyframesSelector], line, column);
	}

	/**
	 * Check if token is part of a LESS mixin
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */
	function checkMixin(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkMixin1(i)) tokens[i].mixin_type = 1;else if (l = checkMixin2(i)) tokens[i].mixin_type = 2;else return 0;

	  return l;
	}

	/**
	 * @returns {Array}
	 */
	function getMixin() {
	  switch (tokens[pos].mixin_type) {
	    case 1:
	      return getMixin1();
	    case 2:
	      return getMixin2();
	  }
	}

	function checkMixin1(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkClass(i) || checkShash(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkArguments(i)) i += l;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a mixin
	 * @returns {Array} `['mixin', x]`
	 */
	function getMixin1() {
	  var startPos = pos;
	  var x = [];

	  x.push(checkClass(pos) ? getClass() : getShash());

	  x = x.concat(getSC());

	  if (checkArguments(pos)) x.push(getArguments());

	  x = x.concat(getSC());

	  if (checkBlock(pos)) x.push(getBlock());

	  var token = tokens[startPos];
	  return newNode(NodeType.MixinType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a LESS mixin
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */
	function checkMixin2(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkClass(i) || checkShash(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkArguments(i)) i += l;

	  return i - start;
	}

	/**
	 * Get node with a mixin
	 * @returns {Array} `['mixin', x]`
	 */
	function getMixin2() {
	  var startPos = pos;
	  var x = [];

	  x.push(checkClass(pos) ? getClass() : getShash());

	  x = x.concat(getSC());

	  if (checkArguments(pos)) x.push(getArguments());

	  var token = tokens[startPos];
	  return newNode(NodeType.MixinType, x, token.ln, token.col);
	}

	/**
	 * Check if token is a namespace sign (`|`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is `|`, `0` if not
	 */
	function checkNamespace(i) {
	  return i < tokensLength && tokens[i].type === TokenType.VerticalLine ? 1 : 0;
	}

	/**
	 * Get node with a namespace sign
	 * @returns {Array} `['namespace']`
	 */
	function getNamespace() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.NamespaceType, '|', token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkNmName2(i) {
	  if (tokens[i].type === TokenType.Identifier) return 1;else if (tokens[i].type !== TokenType.DecimalNumber) return 0;

	  i++;

	  return i < tokensLength && tokens[i].type === TokenType.Identifier ? 2 : 1;
	}

	/**
	 * @returns {String}
	 */
	function getNmName2() {
	  var s = tokens[pos].value;

	  if (tokens[pos++].type === TokenType.DecimalNumber && pos < tokensLength && tokens[pos].type === TokenType.Identifier) s += tokens[pos++].value;

	  return s;
	}

	/**
	 * Check if token is part of a number
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of number
	 */
	function checkNumber(i) {
	  if (i >= tokensLength) return 0;

	  if (tokens[i].number_l) return tokens[i].number_l;

	  // `10`:
	  if (i < tokensLength && tokens[i].type === TokenType.DecimalNumber && (!tokens[i + 1] || tokens[i + 1] && tokens[i + 1].type !== TokenType.FullStop)) {
	    tokens[i].number_l = 1;
	    return 1;
	  }

	  // `10.`:
	  if (i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && (!tokens[i + 2] || tokens[i + 2].type !== TokenType.DecimalNumber)) {
	    tokens[i].number_l = 2;
	    return 2;
	  }

	  // `.10`:
	  if (i < tokensLength && tokens[i].type === TokenType.FullStop && tokens[i + 1].type === TokenType.DecimalNumber) {
	    tokens[i].number_l = 2;
	    return 2;
	  }

	  // `10.10`:
	  if (i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && tokens[i + 2] && tokens[i + 2].type === TokenType.DecimalNumber) {
	    tokens[i].number_l = 3;
	    return 3;
	  }

	  return 0;
	}

	/**
	 * Get node with number
	 * @returns {Array} `['number', x]` where `x` is a number converted
	 *      to string.
	 */
	function getNumber() {
	  var x = '';
	  var startPos = pos;
	  var l = tokens[pos].number_l;

	  for (var j = 0; j < l; j++) {
	    x += tokens[pos + j].value;
	  }

	  pos += l;

	  var token = tokens[startPos];
	  return newNode(NodeType.NumberType, x, token.ln, token.col);
	}

	/**
	 * Check if token is an operator (`/`, `,`, `:`, `=`, `>`, `<` or `*`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an operator, otherwise `0`
	 */
	function checkOperator(i) {
	  if (i >= tokensLength) return 0;

	  switch (tokens[i].type) {
	    case TokenType.Solidus:
	    case TokenType.Comma:
	    case TokenType.Colon:
	    case TokenType.EqualsSign:
	    case TokenType.LessThanSign:
	    case TokenType.GreaterThanSign:
	    case TokenType.Asterisk:
	      return 1;
	  }

	  return 0;
	}

	/**
	 * Get node with an operator
	 * @returns {Array} `['operator', x]` where `x` is an operator converted
	 *      to string.
	 */
	function getOperator() {
	  var startPos = pos;
	  var x = tokens[pos++].value;

	  var token = tokens[startPos];
	  return newNode(NodeType.OperatorType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of text inside parentheses, e.g. `(1)`
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkParentheses(i) {
	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  return tokens[i].right - i + 1;
	}

	/**
	 * Get node with text inside parentheses, e.g. `(1)`
	 * @return {Node}
	 */
	function getParentheses() {
	  var type = NodeType.ParenthesesType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;

	  pos++;

	  var tsets = getTsets();

	  var end = getLastPosition(tsets, line, column, 1);
	  pos++;

	  return newNode(type, tsets, line, column, end);
	}

	/**
	 * Check if token is a parent selector (`&`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkParentSelector(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Ampersand ? 1 : 0;
	}

	/**
	 * Get node with a parent selector
	 * @returns {Array} `['parentSelector']`
	 */
	function getParentSelector() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.ParentSelectorType, '&', token.ln, token.col);
	}

	function checkParentSelectorExtension(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  while (i < tokensLength) {
	    if (l = checkNumber(i) || checkPartialIdent(i)) i += l;else break;
	  }

	  return i - start;
	}

	function getParentSelectorExtension() {
	  var type = NodeType.ParentSelectorExtensionType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  while (pos < tokensLength) {
	    if (checkNumber(pos)) content.push(getNumber());else if (checkPartialIdent(pos)) content.push(getIdent());else break;
	  }

	  return newNode(type, content, line, column);
	}

	function checkParentSelectorWithExtension(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkParentSelector(i)) i += l;else return 0;

	  if (l = checkParentSelectorExtension(i)) i += l;

	  return i - start;
	}

	function getParentSelectorWithExtension() {
	  var content = [getParentSelector()];

	  if (checkParentSelectorExtension(pos)) content.push(getParentSelectorExtension());

	  return content;
	}

	/**
	 * Check if token is part of a number with percent sign (e.g. `10%`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkPercentage(i) {
	  var x;

	  if (i >= tokensLength) return 0;

	  x = checkNumber(i);

	  if (!x || i + x >= tokensLength) return 0;

	  return tokens[i + x].type === TokenType.PercentSign ? x + 1 : 0;
	}

	/**
	 * Get node of number with percent sign
	 * @returns {Array} `['percentage', ['number', x]]` where `x` is a number
	 *      (without percent sign) converted to string.
	 */
	function getPercentage() {
	  var startPos = pos;
	  var x = [getNumber()];
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  var end = getLastPosition(x, line, column, 1);
	  pos++;

	  return newNode(NodeType.PercentageType, x, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkProgid(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (joinValues2(i, 6) === 'progid:DXImageTransform.Microsoft.') i += 6;else return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === TokenType.LeftParenthesis) {
	    tokens[start].progid_end = tokens[i].right;
	    i = tokens[i].right + 1;
	  } else return 0;

	  return i - start;
	}

	/**
	 * @returns {Array}
	 */
	function getProgid() {
	  var startPos = pos;
	  var progid_end = tokens[pos].progid_end;
	  var x = joinValues(pos, progid_end);

	  pos = progid_end + 1;
	  var token = tokens[startPos];
	  return newNode(NodeType.ProgidType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a property
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the property
	 */
	function checkProperty(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkVariable(i) || checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a property
	 * @returns {Array} `['property', x]`
	 */
	function getProperty() {
	  var startPos = pos;
	  var x = [];

	  if (checkVariable(pos)) x.push(getVariable());else x.push(getIdent());

	  var token = tokens[startPos];
	  return newNode(NodeType.PropertyType, x, token.ln, token.col);
	}

	/**
	 * Check if token is a colon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a colon, otherwise `0`
	 */
	function checkPropertyDelim(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Colon ? 1 : 0;
	}

	/**
	 * Get node with a colon
	 * @returns {Array} `['propertyDelim']`
	 */
	function getPropertyDelim() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.PropertyDelimType, ':', token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkPseudo(i) {
	  return checkPseudoe(i) || checkPseudoc(i);
	}

	/**
	 * @returns {Array}
	 */
	function getPseudo() {
	  if (checkPseudoe(pos)) return getPseudoe();
	  if (checkPseudoc(pos)) return getPseudoc();
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkPseudoe(i) {
	  var l;

	  if (i >= tokensLength || tokens[i++].type !== TokenType.Colon || i >= tokensLength || tokens[i++].type !== TokenType.Colon) return 0;

	  return (l = checkInterpolatedVariable(i) || checkIdent(i)) ? l + 2 : 0;
	}

	/**
	 * @returns {Array}
	 */
	function getPseudoe() {
	  var startPos = pos;
	  var x = [];

	  pos += 2;

	  if (checkInterpolatedVariable(pos)) {
	    x.push(getInterpolatedVariable());
	  } else {
	    x.push(getIdent());
	  }

	  var token = tokens[startPos];
	  return newNode(NodeType.PseudoeType, x, token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkPseudoc(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.Colon) return 0;

	  if (l = checkPseudoClass3(i)) tokens[i].pseudoClassType = 3;else if (l = checkPseudoClass4(i)) tokens[i].pseudoClassType = 4;else if (l = checkPseudoClass5(i)) tokens[i].pseudoClassType = 5;else if (l = checkPseudoClass1(i)) tokens[i].pseudoClassType = 1;else if (l = checkPseudoClass2(i)) tokens[i].pseudoClassType = 2;else if (l = checkPseudoClass6(i)) tokens[i].pseudoClassType = 6;else return 0;

	  return l;
	}

	function getPseudoc() {
	  var childType = tokens[pos].pseudoClassType;
	  if (childType === 1) return getPseudoClass1();
	  if (childType === 2) return getPseudoClass2();
	  if (childType === 3) return getPseudoClass3();
	  if (childType === 4) return getPseudoClass4();
	  if (childType === 5) return getPseudoClass5();
	  if (childType === 6) return getPseudoClass6();
	}

	/**
	 * (1) `:not(selector)`
	 * (2) `:extend(selector, selector)`
	 */
	function checkPseudoClass1(i) {
	  var start = i;

	  // Skip `:`.
	  i++;

	  var l = undefined;
	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSelectorsGroup(i)) i += l;else return 0;

	  if (i !== right) return 0;

	  return right - start + 1;
	}

	/**
	 * (-) `:not(panda)`
	 */
	function getPseudoClass1() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  content.push(getIdent());

	  {
	    var _type = NodeType.ArgumentsType;
	    var _token = tokens[pos];
	    var _line = _token.ln;
	    var _column = _token.col;

	    // Skip `(`.
	    pos++;

	    var selectors = getSelectorsGroup();
	    var end = getLastPosition(selectors, _line, _column, 1);
	    var args = newNode(_type, selectors, _line, _column, end);
	    content.push(args);

	    // Skip `)`.
	    pos++;
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `:nth-child(odd)`
	 * (2) `:nth-child(even)`
	 * (3) `:lang(de-DE)`
	 */
	function checkPseudoClass2(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass2() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  {
	    // Skip `(`.
	    pos++;

	    var l = tokens[pos].ln;
	    var c = tokens[pos].col;
	    var value = [];

	    value = value.concat(getSC());
	    value.push(getIdent());
	    value = value.concat(getSC());

	    var end = getLastPosition(value, l, c, 1);
	    var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	    content.push(args);

	    // Skip `)`.
	    pos++;
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(-3n + 2)`
	 */
	function checkPseudoClass3(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (i >= tokensLength) return 0;
	  if (tokens[i].type === TokenType.DecimalNumber) i++;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].value === 'n') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].value === '+' || tokens[i].value === '-') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === TokenType.DecimalNumber) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass3() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  // Skip `(`.
	  pos++;

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());

	  {
	    var _l = tokens[pos].ln;
	    var _c = tokens[pos].col;
	    var _content = tokens[pos].value;
	    var _ident = newNode(NodeType.IdentType, _content, _l, _c);
	    value.push(_ident);
	    pos++;
	  }

	  value = value.concat(getSC());
	  if (checkUnary(pos)) value.push(getUnary());
	  value = value.concat(getSC());
	  if (checkNumber(pos)) value.push(getNumber());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(-3n)`
	 */
	function checkPseudoClass4(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (tokens[i].type === TokenType.DecimalNumber) i++;

	  if (tokens[i].value === 'n') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass4() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());
	  if (checkIdent(pos)) value.push(getIdent());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(+8)`
	 */
	function checkPseudoClass5(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (tokens[i].type === TokenType.DecimalNumber) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass5() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:checked`
	 */
	function checkPseudoClass6(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkInterpolatedVariable(i)) i += l;else if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getPseudoClass6() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = checkInterpolatedVariable(pos) ? getInterpolatedVariable() : getIdent();
	  content.push(ident);

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkRuleset(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSelectorsGroup(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	function getRuleset() {
	  var type = NodeType.RulesetType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  content = content.concat(getSelectorsGroup());
	  content = content.concat(getSC());
	  content.push(getBlock());

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is marked as a space (if it's a space or a tab
	 *      or a line break).
	 * @param {Number} i
	 * @returns {Number} Number of spaces in a row starting with the given token.
	 */
	function checkS(i) {
	  return i < tokensLength && tokens[i].ws ? tokens[i].ws_last - i + 1 : 0;
	}

	/**
	 * Get node with spaces
	 * @returns {Array} `['s', x]` where `x` is a string containing spaces
	 */
	function getS() {
	  var startPos = pos;
	  var x = joinValues(pos, tokens[pos].ws_last);

	  pos = tokens[pos].ws_last + 1;

	  var token = tokens[startPos];
	  return newNode(NodeType.SType, x, token.ln, token.col);
	}

	/**
	 * Check if token is a space or a comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} Number of similar (space or comment) tokens
	 *      in a row starting with the given token.
	 */
	function checkSC(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  var lsc = 0;

	  while (i < tokensLength) {
	    if (!(l = checkS(i)) && !(l = checkCommentML(i)) && !(l = checkCommentSL(i))) break;
	    i += l;
	    lsc += l;
	  }

	  return lsc || 0;
	}

	/**
	 * Get node with spaces and comments
	 * @returns {Array} Array containing nodes with spaces (if there are any)
	 *      and nodes with comments (if there are any):
	 *      `[['s', x]*, ['comment', y]*]` where `x` is a string of spaces
	 *      and `y` is a comment's text (without `/*` and `* /`).
	 */
	function getSC() {
	  var sc = [];

	  if (pos >= tokensLength) return sc;

	  while (pos < tokensLength) {
	    if (checkS(pos)) sc.push(getS());else if (checkCommentML(pos)) sc.push(getCommentML());else if (checkCommentSL(pos)) sc.push(getCommentSL());else break;
	  }

	  return sc;
	}

	/**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      a simple selector
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkShash(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.NumberSign) return 0;

	  if (l = checkInterpolatedVariable(i + 1) || checkIdent(i + 1)) return l + 1;else return 0;
	}

	/**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside a simple
	 *      selector
	 * @returns {Array} `['shash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `fff`)
	 */
	function getShash() {
	  var startPos = pos;
	  var x = [];

	  pos++;

	  if (checkInterpolatedVariable(pos)) x.push(getInterpolatedVariable());else x.push(getIdent());

	  var token = tokens[startPos];
	  return newNode(NodeType.ShashType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a string (text wrapped in quotes)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is part of a string, `0` if not
	 */
	function checkString(i) {
	  if (i >= tokensLength) {
	    return 0;
	  }

	  if (tokens[i].type === TokenType.StringSQ || tokens[i].type === TokenType.StringDQ) {
	    return 1;
	  }

	  return 0;
	}

	/**
	 * Get string's node
	 * @returns {Array} `['string', x]` where `x` is a string (including
	 *      quotes).
	 */
	function getString() {
	  var startPos = pos;
	  var x = tokens[pos++].value;

	  var token = tokens[startPos];
	  return newNode(NodeType.StringType, x, token.ln, token.col);
	}

	/**
	 * Validate stylesheet: it should consist of any number (0 or more) of
	 * rulesets (sets of rules with selectors), @-rules, whitespaces or
	 * comments.
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkStylesheet(i) {
	  var start = i;
	  var l = undefined;

	  // Check every token:
	  while (i < tokensLength) {
	    if (l = checkSC(i) || checkAtrule(i) || checkRuleset(i) || checkMixin(i) || checkDeclaration(i) || checkDeclDelim(i)) i += l;else throwError(i);
	  }

	  return i - start;
	}

	/**
	 * @returns {Array} `['stylesheet', x]` where `x` is all stylesheet's
	 *      nodes.
	 */
	function getStylesheet() {
	  var startPos = pos;
	  var x = [];

	  while (pos < tokensLength) {
	    if (checkSC(pos)) x = x.concat(getSC());else if (checkAtrule(pos)) x.push(getAtrule());else if (checkRuleset(pos)) x.push(getRuleset());else if (checkMixin(pos)) x.push(getMixin());else if (checkDeclaration(pos)) x.push(getDeclaration());else if (checkDeclDelim(pos)) x.push(getDeclDelim());else throwError(pos);
	  }

	  var token = tokens[startPos];
	  return newNode(NodeType.StylesheetType, x, token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkTset(i) {
	  var l;

	  if (l = checkVhash(i)) tokens[i].tset_child = 1;else if (l = checkAny(i)) tokens[i].tset_child = 2;else if (l = checkSC(i)) tokens[i].tset_child = 3;else if (l = checkOperator(i)) tokens[i].tset_child = 4;

	  return l;
	}

	/**
	 * @returns {Array}
	 */
	function getTset() {
	  var childType = tokens[pos].tset_child;
	  if (childType === 1) return getVhash();else if (childType === 2) return getAny();else if (childType === 3) return getSC();else if (childType === 4) return getOperator();
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkTsets(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  while (l = checkTset(i)) {
	    i += l;
	  }

	  return i - start;
	}

	/**
	 * @returns {Array}
	 */
	function getTsets() {
	  var x = [];
	  var t = undefined;

	  while (checkTset(pos)) {
	    t = getTset();
	    if (typeof t.content === 'string') x.push(t);else x = x.concat(t);
	  }

	  return x;
	}

	/**
	 * Check if token is an unary (arithmetical) sign (`+` or `-`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an unary sign, `0` if not
	 */
	function checkUnary(i) {
	  if (i >= tokensLength) {
	    return 0;
	  }

	  if (tokens[i].type === TokenType.HyphenMinus || tokens[i].type === TokenType.PlusSign) {
	    return 1;
	  }

	  return 0;
	}

	/**
	 * Get node with an unary (arithmetical) sign (`+` or `-`)
	 * @returns {Array} `['unary', x]` where `x` is an unary sign
	 *      converted to string.
	 */
	function getUnary() {
	  var startPos = pos;
	  var x = tokens[pos++].value;

	  var token = tokens[startPos];
	  return newNode(NodeType.OperatorType, x, token.ln, token.col);
	}

	/**
	 * Check if token is a unicode range (single or multiple <urange> nodes)
	 * @param {number} i Token's index
	 * @return {number} Unicode range node's length
	 */
	function checkUnicodeRange(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkUrange(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var spaceBefore = checkSC(i);
	    var comma = checkDelim(i + spaceBefore);
	    if (!comma) break;

	    var spaceAfter = checkSC(i + spaceBefore + comma);
	    if (l = checkUrange(i + spaceBefore + comma + spaceAfter)) {
	      i += spaceBefore + comma + spaceAfter + l;
	    } else break;
	  }

	  return i - start;
	}

	/**
	 * Get a unicode range node
	 * @return {Node}
	 */
	function getUnicodeRange() {
	  var type = NodeType.UnicodeRangeType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  while (pos < tokensLength) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkDelim(pos)) content.push(getDelim());else if (checkUrange(pos)) content.push(getUrange());else break;
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a u-range (part of a unicode-range)
	 * (1) `U+416`
	 * (2) `U+400-4ff`
	 * (3) `U+4??`
	 * @param {number} i Token's index
	 * @return {number} Urange node's length
	 */
	function checkUrange(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  // Check for unicode prefix (u+ or U+)
	  if (tokens[i].value === 'U' || tokens[i].value === 'u') i += 1;else return 0;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].value === '+') i += 1;else return 0;

	  while (i < tokensLength) {
	    if (l = checkIdent(i)) i += l;else if (l = checkNumber(i)) i += l;else if (l = checkUnary(i)) i += l;else if (l = _checkUnicodeWildcard(i)) i += l;else break;
	  }

	  tokens[start].urangeEnd = i - 1;

	  return i - start;
	}

	/**
	 * Get a u-range node (part of a unicode-range)
	 * @return {Node}
	 */
	function getUrange() {
	  var startPos = pos;
	  var type = NodeType.UrangeType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  content = joinValues(startPos, tokens[startPos].urangeEnd);
	  pos = tokens[startPos].urangeEnd + 1;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check for unicode wildcard characters `?`
	 * @param {number} i Token's index
	 * @return {number} Wildcard length
	 */
	function _checkUnicodeWildcard(i) {
	  var start = i;

	  if (i >= tokensLength) return 0;

	  while (i < tokensLength) {
	    if (tokens[i].type === TokenType.QuestionMark) i += 1;else break;
	  }

	  return i - start;
	}

	/**
	 * Check if token is part of URI (e.g. `url('/css/styles.css')`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of URI
	 */
	function checkUri(i) {
	  var start = i;

	  if (i >= tokensLength || tokens[i++].value !== 'url' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  return tokens[i].right - start + 1;
	}

	/**
	 * Get node with URI
	 * @returns {Array} `['uri', x]` where `x` is URI's nodes (without `url`
	 *      and braces, e.g. `['string', ''/css/styles.css'']`).
	 */
	function getUri() {
	  var startPos = pos;
	  var uriExcluding = {};
	  var uri = undefined;
	  var token = undefined;
	  var l = undefined;
	  var raw = undefined;

	  pos += 2;

	  uriExcluding[TokenType.Space] = 1;
	  uriExcluding[TokenType.Tab] = 1;
	  uriExcluding[TokenType.Newline] = 1;
	  uriExcluding[TokenType.LeftParenthesis] = 1;
	  uriExcluding[TokenType.RightParenthesis] = 1;

	  if (checkUri1(pos)) {
	    uri = [].concat(getSC()).concat([getString()]).concat(getSC());
	  } else {
	    uri = getSC();
	    l = checkExcluding(uriExcluding, pos);
	    token = tokens[pos];
	    raw = newNode(NodeType.RawType, joinValues(pos, pos + l), token.ln, token.col);

	    uri.push(raw);

	    pos += l + 1;

	    uri = uri.concat(getSC());
	  }

	  token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;
	  var end = getLastPosition(uri, line, column, 1);
	  pos++;
	  return newNode(NodeType.UriType, uri, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkUri1(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type !== TokenType.StringDQ && tokens[i].type !== TokenType.StringSQ) {
	    return 0;
	  }

	  i++;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * Check if token is part of a value
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the value
	 */
	function checkValue(i) {
	  var start = i;
	  var l = undefined;
	  var s = undefined;
	  var _i = undefined;

	  while (i < tokensLength) {
	    s = checkSC(i);
	    _i = i + s;

	    if (l = _checkValue(_i)) i += l + s;
	    if (!l || checkBlock(_i)) break;
	  }

	  return i - start;
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function _checkValue(i) {
	  return checkEscapedString(i) || checkInterpolatedVariable(i) || checkVariable(i) || checkVhash(i) || checkBlock(i) || checkProgid(i) || checkAny(i) || checkAtkeyword(i) || checkOperator(i) || checkImportant(i);
	}

	/**
	 * @returns {Array}
	 */
	function getValue() {
	  var startPos = pos;
	  var x = [];
	  var s = undefined;
	  var _pos = undefined;

	  while (pos < tokensLength) {
	    s = checkSC(pos);
	    _pos = pos + s;

	    if (!_checkValue(_pos)) break;

	    if (s) x = x.concat(getSC());
	    x.push(_getValue());
	  }

	  var token = tokens[startPos];
	  return newNode(NodeType.ValueType, x, token.ln, token.col);
	}

	/**
	 * @returns {Array}
	 */
	function _getValue() {
	  if (checkEscapedString(pos)) return getEscapedString();else if (checkInterpolatedVariable(pos)) return getInterpolatedVariable();else if (checkVariable(pos)) return getVariable();else if (checkVhash(pos)) return getVhash();else if (checkBlock(pos)) return getBlock();else if (checkProgid(pos)) return getProgid();else if (checkAny(pos)) return getAny();else if (checkAtkeyword(pos)) return getAtkeyword();else if (checkOperator(pos)) return getOperator();else if (checkImportant(pos)) return getImportant();
	}

	/**
	 * Check if token is part of LESS variable
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the variable
	 */
	function checkVariable(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.CommercialAt) return 0;

	  if (tokens[i - 1] && tokens[i - 1].type === TokenType.CommercialAt && tokens[i - 2] && tokens[i - 2].type === TokenType.CommercialAt) return 0;

	  return (l = checkVariable(i + 1) || checkIdent(i + 1)) ? l + 1 : 0;
	}

	/**
	 * Get node with a variable
	 * @returns {Array} `['variable', ['ident', x]]` where `x` is
	 *      a variable name.
	 */
	function getVariable() {
	  var startPos = pos;
	  var x = [];

	  pos++;

	  if (checkVariable(pos)) x.push(getVariable());else x.push(getIdent());

	  var token = tokens[startPos];
	  return newNode(NodeType.VariableType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a variables list (e.g. `@rest...`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkVariablesList(i) {
	  var d = 0; // Number of dots
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkVariable(i)) i += l;else return 0;

	  while (tokens[i] && tokens[i].type === TokenType.FullStop) {
	    d++;
	    i++;
	  }

	  return d === 3 ? l + d : 0;
	}

	/**
	 * Get node with a variables list
	 * @returns {Array} `['variableslist', ['variable', ['ident', x]]]` where
	 *      `x` is a variable name.
	 */
	function getVariablesList() {
	  var startPos = pos;
	  var x = [getVariable()];
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  var end = getLastPosition(x, line, column, 3);
	  pos += 3;

	  return newNode(NodeType.VariablesListType, x, line, column, end);
	}

	/**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      some value
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkVhash(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.NumberSign) return 0;

	  return (l = checkNmName2(i + 1)) ? l + 1 : 0;
	}

	/**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside some value
	 * @returns {Array} `['vhash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `'fff'`).
	 */
	function getVhash() {
	  var startPos = pos;
	  var x = undefined;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  pos++;

	  x = getNmName2();
	  var end = getLastPosition(x, line, column + 1);
	  return newNode(NodeType.VhashType, x, line, column, end);
	}

	module.exports = function (_tokens, context) {
	  tokens = _tokens;
	  tokensLength = tokens.length;
	  pos = 0;

	  return contexts[context]();
	};

	function checkSelectorsGroup(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var sb = checkSC(i);
	    var c = checkDelim(i + sb);
	    if (!c) break;
	    var sa = checkSC(i + sb + c);
	    if (l = checkSelector(i + sb + c + sa)) i += sb + c + sa + l;else break;
	  }

	  tokens[start].selectorsGroupEnd = i;
	  return i - start;
	}

	function getSelectorsGroup() {
	  var selectorsGroup = [];
	  var selectorsGroupEnd = tokens[pos].selectorsGroupEnd;

	  selectorsGroup.push(getSelector());

	  while (pos < selectorsGroupEnd) {
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getDelim());
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getSelector());
	  }

	  return selectorsGroup;
	}

	function checkSelector(i) {
	  var l;

	  if (l = checkSelector1(i)) tokens[i].selectorType = 1;else if (l = checkSelector2(i)) tokens[i].selectorType = 2;

	  return l;
	}

	function getSelector() {
	  var selectorType = tokens[pos].selectorType;
	  if (selectorType === 1) return getSelector1();else return getSelector2();
	}

	/**
	 * Checks for selector which starts with a compound selector.
	 */
	function checkSelector1(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkCompoundSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var s = checkSC(i);
	    var c = checkCombinator(i + s);
	    if (!s && !c) break;
	    if (c) {
	      i += s + c;
	      s = checkSC(i);
	    }

	    if (l = checkCompoundSelector(i + s)) i += s + l;else break;
	  }

	  tokens[start].selectorEnd = i;
	  return i - start;
	}

	function getSelector1() {
	  var type = NodeType.SelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var selectorEnd = token.selectorEnd;
	  var content = getCompoundSelector();

	  while (pos < selectorEnd) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkCombinator(pos)) content.push(getCombinator());else if (checkCompoundSelector(pos)) content = content.concat(getCompoundSelector());
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * Checks for a selector that starts with a combinator.
	 */
	function checkSelector2(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkCombinator(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var sb = checkSC(i);
	    if (l = checkCompoundSelector(i + sb)) i += sb + l;else break;

	    var sa = checkSC(i);
	    var c = checkCombinator(i + sa);
	    if (!sa && !c) break;
	    if (c) {
	      i += sa + c;
	    }
	  }

	  tokens[start].selectorEnd = i;
	  return i - start;
	}

	function getSelector2() {
	  var type = NodeType.SelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var selectorEnd = token.selectorEnd;
	  var content = [getCombinator()];

	  while (pos < selectorEnd) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkCombinator(pos)) content.push(getCombinator());else if (checkCompoundSelector(pos)) content = content.concat(getCompoundSelector());
	  }

	  return newNode(type, content, line, column);
	}

	function checkCompoundSelector(i) {
	  var l = undefined;

	  if (l = checkCompoundSelector1(i)) {
	    tokens[i].compoundSelectorType = 1;
	  } else if (l = checkCompoundSelector2(i)) {
	    tokens[i].compoundSelectorType = 2;
	  }

	  return l;
	}

	function getCompoundSelector() {
	  var type = tokens[pos].compoundSelectorType;
	  if (type === 1) return getCompoundSelector1();
	  if (type === 2) return getCompoundSelector2();
	}

	function checkCompoundSelector1(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;

	  var l = undefined;
	  if (l = checkTypeSelector(i) || checkParentSelectorWithExtension(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var _l2 = checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i);
	    if (_l2) i += _l2;else break;
	  }

	  tokens[start].compoundSelectorEnd = i;

	  return i - start;
	}

	function getCompoundSelector1() {
	  var sequence = [];
	  var compoundSelectorEnd = tokens[pos].compoundSelectorEnd;

	  if (checkTypeSelector(pos)) sequence.push(getTypeSelector());else if (checkParentSelectorWithExtension(pos)) sequence = sequence.concat(getParentSelectorWithExtension());

	  while (pos < compoundSelectorEnd) {
	    if (checkShash(pos)) sequence.push(getShash());else if (checkClass(pos)) sequence.push(getClass());else if (checkAttributeSelector(pos)) sequence.push(getAttributeSelector());else if (checkPseudo(pos)) sequence.push(getPseudo());
	  }

	  return sequence;
	}

	function checkCompoundSelector2(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;

	  while (i < tokensLength) {
	    var l = checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i);
	    if (l) i += l;else break;
	  }

	  tokens[start].compoundSelectorEnd = i;

	  return i - start;
	}

	function getCompoundSelector2() {
	  var sequence = [];
	  var compoundSelectorEnd = tokens[pos].compoundSelectorEnd;

	  while (pos < compoundSelectorEnd) {
	    if (checkShash(pos)) sequence.push(getShash());else if (checkClass(pos)) sequence.push(getClass());else if (checkAttributeSelector(pos)) sequence.push(getAttributeSelector());else if (checkPseudo(pos)) sequence.push(getPseudo());
	  }

	  return sequence;
	}

	function checkTypeSelector(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkNamePrefix(i)) i += l;

	  if (tokens[i].type === TokenType.Asterisk) i++;else if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getTypeSelector() {
	  var type = NodeType.TypeSelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (checkNamePrefix(pos)) content.push(getNamePrefix());

	  token = tokens[pos];
	  if (token.type === TokenType.Asterisk) {
	    var asteriskNode = newNode(NodeType.IdentType, '*', token.ln, token.col);
	    content.push(asteriskNode);
	    pos++;
	  } else if (checkIdent(pos)) content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeSelector(i) {
	  var l = undefined;
	  if (l = checkAttributeSelector1(i)) tokens[i].attributeSelectorType = 1;else if (l = checkAttributeSelector2(i)) tokens[i].attributeSelectorType = 2;

	  return l;
	}

	function getAttributeSelector() {
	  var type = tokens[pos].attributeSelectorType;
	  if (type === 1) return getAttributeSelector1();else return getAttributeSelector2();
	}

	/**
	 * (1) `[panda=nani]`
	 * (2) `[panda='nani']`
	 * (3) `[panda='nani' i]`
	 *
	 */
	function checkAttributeSelector1(i) {
	  var start = i;

	  if (tokens[i].type === TokenType.LeftSquareBracket) i++;else return 0;

	  var l = undefined;
	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeName(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeMatch(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeValue(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeFlags(i)) {
	    i += l;
	    if (l = checkSC(i)) i += l;
	  }

	  if (tokens[i].type === TokenType.RightSquareBracket) i++;else return 0;

	  return i - start;
	}

	function getAttributeSelector1() {
	  var type = NodeType.AttributeSelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `[`.
	  pos++;

	  content = content.concat(getSC());
	  content.push(getAttributeName());
	  content = content.concat(getSC());
	  content.push(getAttributeMatch());
	  content = content.concat(getSC());
	  content.push(getAttributeValue());
	  content = content.concat(getSC());

	  if (checkAttributeFlags(pos)) {
	    content.push(getAttributeFlags());
	    content = content.concat(getSC());
	  }

	  // Skip `]`.
	  pos++;

	  var end = getLastPosition(content, line, column, 1);
	  return newNode(type, content, line, column, end);
	}

	/**
	 * (1) `[panda]`
	 */
	function checkAttributeSelector2(i) {
	  var start = i;

	  if (tokens[i].type === TokenType.LeftSquareBracket) i++;else return 0;

	  var l = undefined;
	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeName(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === TokenType.RightSquareBracket) i++;else return 0;

	  return i - start;
	}

	function getAttributeSelector2() {
	  var type = NodeType.AttributeSelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `[`.
	  pos++;

	  content = content.concat(getSC());
	  content.push(getAttributeName());
	  content = content.concat(getSC());

	  // Skip `]`.
	  pos++;

	  var end = getLastPosition(content, line, column, 1);
	  return newNode(type, content, line, column, end);
	}

	function checkAttributeName(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkNamePrefix(i)) i += l;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getAttributeName() {
	  var type = NodeType.AttributeNameType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (checkNamePrefix(pos)) content.push(getNamePrefix());
	  content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeMatch(i) {
	  var l = undefined;
	  if (l = checkAttributeMatch1(i)) tokens[i].attributeMatchType = 1;else if (l = checkAttributeMatch2(i)) tokens[i].attributeMatchType = 2;

	  return l;
	}

	function getAttributeMatch() {
	  var type = tokens[pos].attributeMatchType;
	  if (type === 1) return getAttributeMatch1();else return getAttributeMatch2();
	}

	function checkAttributeMatch1(i) {
	  var start = i;

	  var type = tokens[i].type;
	  if (type === TokenType.Tilde || type === TokenType.VerticalLine || type === TokenType.CircumflexAccent || type === TokenType.DollarSign || type === TokenType.Asterisk) i++;else return 0;

	  if (tokens[i].type === TokenType.EqualsSign) i++;else return 0;

	  return i - start;
	}

	function getAttributeMatch1() {
	  var type = NodeType.AttributeMatchType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = tokens[pos].value + tokens[pos + 1].value;
	  pos += 2;

	  return newNode(type, content, line, column);
	}

	function checkAttributeMatch2(i) {
	  if (tokens[i].type === TokenType.EqualsSign) return 1;else return 0;
	}

	function getAttributeMatch2() {
	  var type = NodeType.AttributeMatchType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '=';

	  pos++;
	  return newNode(type, content, line, column);
	}

	function checkAttributeValue(i) {
	  return checkString(i) || checkIdent(i);
	}

	function getAttributeValue() {
	  var type = NodeType.AttributeValueType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (checkString(pos)) content.push(getString());else content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeFlags(i) {
	  return checkIdent(i);
	}

	function getAttributeFlags() {
	  var type = NodeType.AttributeFlagsType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getIdent()];

	  return newNode(type, content, line, column);
	}

	function checkNamePrefix(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  if (l = checkNamePrefix1(i)) tokens[i].namePrefixType = 1;else if (l = checkNamePrefix2(i)) tokens[i].namePrefixType = 2;

	  return l;
	}

	function getNamePrefix() {
	  var type = tokens[pos].namePrefixType;
	  if (type === 1) return getNamePrefix1();else return getNamePrefix2();
	}

	/**
	 * (1) `panda|`
	 * (2) `panda<comment>|`
	 */
	function checkNamePrefix1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkNamespacePrefix(i)) i += l;else return 0;

	  if (l = checkCommentML(i)) i += l;

	  if (l = checkNamespaceSeparator(i)) i += l;else return 0;

	  return i - start;
	}

	function getNamePrefix1() {
	  var type = NodeType.NamePrefixType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  content.push(getNamespacePrefix());

	  if (checkCommentML(pos)) content.push(getCommentML());

	  content.push(getNamespaceSeparator());

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `|`
	 */
	function checkNamePrefix2(i) {
	  return checkNamespaceSeparator(i);
	}

	function getNamePrefix2() {
	  var type = NodeType.NamePrefixType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getNamespaceSeparator()];

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `*`
	 * (2) `panda`
	 */
	function checkNamespacePrefix(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;

	  if (tokens[i].type === TokenType.Asterisk) return 1;else if (l = checkIdent(i)) return l;else return 0;
	}

	function getNamespacePrefix() {
	  var type = NodeType.NamespacePrefixType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (tokens[pos].type === TokenType.Asterisk) {
	    var asteriskNode = newNode(NodeType.IdentType, '*', line, column);
	    content.push(asteriskNode);
	    pos++;
	  } else if (checkIdent(pos)) content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `|`
	 */
	function checkNamespaceSeparator(i) {
	  if (i >= tokensLength) return 0;

	  if (tokens[i].type === TokenType.VerticalLine) return 1;else return 0;
	}

	function getNamespaceSeparator() {
	  var type = NodeType.NamespaceSeparatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '|';

	  pos++;
	  return newNode(type, content, line, column);
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (css, tabSize) {
	  var TokenType = __webpack_require__(13);

	  var tokens = [];
	  var urlMode = false;
	  var c = undefined; // Current character
	  var cn = undefined; // Next character
	  var pos = 0;
	  var tn = 0;
	  var ln = 1;
	  var col = 1;

	  var Punctuation = {
	    ' ': TokenType.Space,
	    '\n': TokenType.Newline,
	    '\r': TokenType.Newline,
	    '\t': TokenType.Tab,
	    '!': TokenType.ExclamationMark,
	    '"': TokenType.QuotationMark,
	    '#': TokenType.NumberSign,
	    '$': TokenType.DollarSign,
	    '%': TokenType.PercentSign,
	    '&': TokenType.Ampersand,
	    '\'': TokenType.Apostrophe,
	    '(': TokenType.LeftParenthesis,
	    ')': TokenType.RightParenthesis,
	    '*': TokenType.Asterisk,
	    '+': TokenType.PlusSign,
	    ',': TokenType.Comma,
	    '-': TokenType.HyphenMinus,
	    '.': TokenType.FullStop,
	    '/': TokenType.Solidus,
	    ':': TokenType.Colon,
	    ';': TokenType.Semicolon,
	    '<': TokenType.LessThanSign,
	    '=': TokenType.EqualsSign,
	    '>': TokenType.GreaterThanSign,
	    '?': TokenType.QuestionMark,
	    '@': TokenType.CommercialAt,
	    '[': TokenType.LeftSquareBracket,
	    ']': TokenType.RightSquareBracket,
	    '^': TokenType.CircumflexAccent,
	    '_': TokenType.LowLine,
	    '{': TokenType.LeftCurlyBracket,
	    '|': TokenType.VerticalLine,
	    '}': TokenType.RightCurlyBracket,
	    '~': TokenType.Tilde
	  };

	  /**
	   * Add a token to the token list
	   * @param {string} type
	   * @param {string} value
	   */
	  function pushToken(type, value, column) {
	    tokens.push({
	      tn: tn++,
	      ln: ln,
	      col: column,
	      type: type,
	      value: value
	    });
	  }

	  /**
	   * Check if a character is a decimal digit
	   * @param {string} c Character
	   * @returns {boolean}
	   */
	  function isDecimalDigit(c) {
	    return '0123456789'.indexOf(c) >= 0;
	  }

	  /**
	   * Parse spaces
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseSpaces(css) {
	    var start = pos;

	    // Read the string until we meet a non-space character:
	    for (; pos < css.length; pos++) {
	      if (css.charAt(pos) !== ' ') break;
	    }

	    // Add a substring containing only spaces to tokens:
	    pushToken(TokenType.Space, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse a string within quotes
	   * @param {string} css Unparsed part of CSS string
	   * @param {string} q Quote (either `'` or `"`)
	   */
	  function parseString(css, q) {
	    var start = pos;

	    // Read the string until we meet a matching quote:
	    for (pos++; pos < css.length; pos++) {
	      // Skip escaped quotes:
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) === q) break;
	    }

	    // Add the string (including quotes) to tokens:
	    var type = q === '"' ? TokenType.StringDQ : TokenType.StringSQ;
	    pushToken(type, css.substring(start, pos + 1), col);
	    col += pos - start;
	  }

	  /**
	   * Parse numbers
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseDecimalNumber(css) {
	    var start = pos;

	    // Read the string until we meet a character that's not a digit:
	    for (; pos < css.length; pos++) {
	      if (!isDecimalDigit(css.charAt(pos))) break;
	    }

	    // Add the number to tokens:
	    pushToken(TokenType.DecimalNumber, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse identifier
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseIdentifier(css) {
	    var start = pos;

	    // Skip all opening slashes:
	    while (css.charAt(pos) === '/') pos++;

	    // Read the string until we meet a punctuation mark:
	    for (; pos < css.length; pos++) {
	      // Skip all '\':
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) in Punctuation) break;
	    }

	    var ident = css.substring(start, pos--);

	    // Enter url mode if parsed substring is `url`:
	    if (!urlMode && ident === 'url' && css.charAt(pos + 1) === '(') {
	      urlMode = true;
	    }

	    // Add identifier to tokens:
	    pushToken(TokenType.Identifier, ident, col);
	    col += pos - start;
	  }

	  /**
	  * Parse a multiline comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseMLComment(css) {
	    var start = pos;

	    // Read the string until we meet `*/`.
	    // Since we already know first 2 characters (`/*`), start reading
	    // from `pos + 2`:
	    for (pos = pos + 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '*' && css.charAt(pos + 1) === '/') {
	        pos++;
	        break;
	      }
	    }

	    // Add full comment (including `/*` and `*/`) to the list of tokens:
	    var comment = css.substring(start, pos + 1);
	    pushToken(TokenType.CommentML, comment, col);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  /**
	  * Parse a single line comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseSLComment(css) {
	    var start = pos;

	    // Read the string until we meet line break.
	    // Since we already know first 2 characters (`//`), start reading
	    // from `pos + 2`:
	    for (pos += 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '\n' || css.charAt(pos) === '\r') {
	        break;
	      }
	    }

	    // Add comment (including `//` and line break) to the list of tokens:
	    pushToken(TokenType.CommentSL, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Convert a CSS string to a list of tokens
	   * @param {string} css CSS string
	   * @returns {Array} List of tokens
	   * @private
	   */
	  function getTokens(css) {
	    // Parse string, character by character:
	    for (pos = 0; pos < css.length; col++, pos++) {
	      c = css.charAt(pos);
	      cn = css.charAt(pos + 1);

	      // If we meet `/*`, it's a start of a multiline comment.
	      // Parse following characters as a multiline comment:
	      if (c === '/' && cn === '*') {
	        parseMLComment(css);
	      }

	      // If we meet `//` and it is not a part of url:
	      else if (!urlMode && c === '/' && cn === '/') {
	          // If we're currently inside a block, treat `//` as a start
	          // of identifier. Else treat `//` as a start of a single-line
	          // comment:
	          parseSLComment(css);
	        }

	        // If current character is a double or single quote, it's a start
	        // of a string:
	        else if (c === '"' || c === "'") {
	            parseString(css, c);
	          }

	          // If current character is a space:
	          else if (c === ' ') {
	              parseSpaces(css);
	            }

	            // If current character is a punctuation mark:
	            else if (c in Punctuation) {
	                // Add it to the list of tokens:
	                pushToken(Punctuation[c], c, col);
	                if (c === '\n' || c === '\r') {
	                  ln++;
	                  col = 0;
	                } // Go to next line
	                if (c === ')') urlMode = false; // Exit url mode
	                else if (c === '\t' && tabSize > 1) col += tabSize - 1;
	              }

	              // If current character is a decimal digit:
	              else if (isDecimalDigit(c)) {
	                  parseDecimalNumber(css);
	                }

	                // If current character is anything else:
	                else {
	                    parseIdentifier(css);
	                  }
	    }

	    return tokens;
	  }

	  return getTokens(css);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
	  mark: __webpack_require__(22),
	  parse: __webpack_require__(23),
	  stringify: __webpack_require__(5),
	  tokenizer: __webpack_require__(24)
	};
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TokenType = __webpack_require__(13);

	module.exports = (function () {
	  /**
	  * Mark whitespaces and comments
	  */
	  function markSC(tokens) {
	    var tokensLength = tokens.length;
	    var ws = -1; // Flag for whitespaces
	    var sc = -1; // Flag for whitespaces and comments
	    var t = undefined; // Current token

	    // For every token in the token list, mark spaces and line breaks
	    // as spaces (set both `ws` and `sc` flags). Mark multiline comments
	    // with `sc` flag.
	    // If there are several spaces or tabs or line breaks or multiline
	    // comments in a row, group them: take the last one's index number
	    // and save it to the first token in the group as a reference:
	    // e.g., `ws_last = 7` for a group of whitespaces or `sc_last = 9`
	    // for a group of whitespaces and comments.
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.Space:
	        case TokenType.Tab:
	          t.ws = true;
	          t.sc = true;

	          if (ws === -1) ws = i;
	          if (sc === -1) sc = i;

	          break;
	        case TokenType.Newline:
	          t.ws = true;
	          t.sc = true;

	          ws = ws === -1 ? i : ws;
	          sc = sc === -1 ? i : ws;

	          tokens[ws].ws_last = i - 1;
	          tokens[sc].sc_last = i - 1;
	          tokens[i].ws_last = i;
	          tokens[i].sc_last = i;

	          ws = -1;
	          sc = -1;

	          break;
	        case TokenType.CommentML:
	        case TokenType.CommentSL:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          t.sc = true;

	          break;
	        default:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          if (sc !== -1) {
	            tokens[sc].sc_last = i - 1;
	            sc = -1;
	          }
	      }
	    }

	    if (ws !== -1) tokens[ws].ws_last = i - 1;
	    if (sc !== -1) tokens[sc].sc_last = i - 1;
	  }

	  /**
	  * Pair brackets
	  */
	  function markBrackets(tokens) {
	    var tokensLength = tokens.length;
	    var ps = []; // Parentheses
	    var sbs = []; // Square brackets
	    var cbs = []; // Curly brackets
	    var t = undefined; // Current token

	    // For every token in the token list, if we meet an opening (left)
	    // bracket, push its index number to a corresponding array.
	    // If we then meet a closing (right) bracket, look at the corresponding
	    // array. If there are any elements (records about previously met
	    // left brackets), take a token of the last left bracket (take
	    // the last index number from the array and find a token with
	    // this index number) and save right bracket's index as a reference:
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.LeftParenthesis:
	          ps.push(i);
	          break;
	        case TokenType.RightParenthesis:
	          if (ps.length) {
	            t.left = ps.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftSquareBracket:
	          sbs.push(i);
	          break;
	        case TokenType.RightSquareBracket:
	          if (sbs.length) {
	            t.left = sbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftCurlyBracket:
	          cbs.push(i);
	          break;
	        case TokenType.RightCurlyBracket:
	          if (cbs.length) {
	            t.left = cbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	      }
	    }
	  }

	  function markBlocks(tokens) {
	    var blocks = {};
	    var currentIL = 0;
	    var i = 0;
	    var l = tokens.length;
	    var iw = undefined;

	    for (; i !== l; i++) {
	      if (!tokens[i - 1]) continue;

	      // Skip all tokens on current line:
	      if (tokens[i].type !== TokenType.Newline) continue;

	      var end = getBlockEnd(tokens, i + 1, currentIL, iw);
	      if (!iw) iw = end.iw;

	      if (end.indent && end.indent === currentIL) continue;

	      // Not found nested block.
	      if (end.end !== null) {
	        markBlocksWithIndent(tokens, blocks, end);

	        for (var z = end.end + 1; z < l; z++) {
	          if (tokens[z].type === TokenType.Space || tokens[z].type === TokenType.Tab || tokens[z].type === TokenType.CommentSL || tokens[z].type === TokenType.CommentML) continue;
	          if (tokens[z].type === TokenType.Newline) i = z;
	          break;
	        }
	      }

	      if (!blocks[end.indent]) blocks[end.indent] = [];
	      blocks[end.indent].push(i + 1);
	      currentIL = end.indent;
	    }

	    markBlocksWithIndent(tokens, blocks, { end: i - 1, indent: 0 });
	  }

	  function getBlockEnd(tokens, i, indent, iw, maybeEnd) {
	    var spaces = '';
	    if (!maybeEnd) maybeEnd = i - 1;

	    if (!tokens[i]) return { end: maybeEnd, indent: 0 };

	    for (var l = tokens.length; i < l; i++) {
	      if (tokens[i].type === TokenType.Space || tokens[i].type === TokenType.Tab || tokens[i].type === TokenType.CommentML || tokens[i].type === TokenType.CommentSL || tokens[i].type === TokenType.Newline) {
	        spaces += tokens[i].value;
	        continue;
	      }

	      // Got all spaces.
	      // Find trailing spaces.
	      var lastNewline = spaces.lastIndexOf('\n');
	      spaces = spaces.slice(lastNewline + 1);

	      // Mark previous node as block end.
	      if (!spaces) return { end: maybeEnd, indent: 0 };

	      if (!iw) iw = spaces.length;
	      var newIndent = spaces.length / iw;

	      if (newIndent < indent) return { end: maybeEnd, indent: newIndent, iw: iw };

	      if (newIndent === indent) {
	        // Look for line end
	        for (; i < l; i++) {
	          if (tokens[i].type !== TokenType.Newline) continue;
	          var end = getBlockEnd(tokens, i + 1, indent, iw, maybeEnd);
	          return { end: end.end, indent: indent, iw: iw };
	        }

	        return { end: i - 1, indent: newIndent, iw: iw };
	      } else {
	        // If newIndent > indent
	        return { end: null, indent: newIndent, iw: iw };
	      }
	    }

	    return { end: i - 1 };
	  }

	  function markBlocksWithIndent(tokens, blocks, end) {
	    for (var indent in blocks) {
	      if (indent < end.indent + 1) continue;
	      var block = blocks[indent];
	      if (!block) continue;

	      for (var x = 0; x < block.length; x++) {
	        var y = block[x];
	        tokens[y].block_end = end.end;
	      }
	      blocks[indent] = null;
	    }
	  }

	  return function (tokens) {
	    markBrackets(tokens);
	    markSC(tokens);
	    markBlocks(tokens);
	  };
	})();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var Node=__webpack_require__(1);var NodeType=__webpack_require__(15);var TokenType=__webpack_require__(13);var tokens=undefined;var tokensLength=undefined;var pos=undefined;var contexts={'arguments':function(){return checkArguments(pos) && getArguments();},'atkeyword':function(){return checkAtkeyword(pos) && getAtkeyword();},'atrule':function(){return checkAtrule(pos) && getAtrule();},'block':function(){return checkBlock(pos) && getBlock();},'brackets':function(){return checkBrackets(pos) && getBrackets();},'class':function(){return checkClass(pos) && getClass();},'combinator':function(){return checkCombinator(pos) && getCombinator();},'commentML':function(){return checkCommentML(pos) && getCommentML();},'commentSL':function(){return checkCommentSL(pos) && getCommentSL();},'condition':function(){return checkCondition(pos) && getCondition();},'conditionalStatement':function(){return checkConditionalStatement(pos) && getConditionalStatement();},'declaration':function(){return checkDeclaration(pos) && getDeclaration();},'declDelim':function(){return checkDeclDelim(pos) && getDeclDelim();},'default':function(){return checkDefault(pos) && getDefault();},'delim':function(){return checkDelim(pos) && getDelim();},'dimension':function(){return checkDimension(pos) && getDimension();},'expression':function(){return checkExpression(pos) && getExpression();},'extend':function(){return checkExtend(pos) && getExtend();},'function':function(){return checkFunction(pos) && getFunction();},'global':function(){return checkGlobal(pos) && getGlobal();},'ident':function(){return checkIdent(pos) && getIdent();},'important':function(){return checkImportant(pos) && getImportant();},'include':function(){return checkInclude(pos) && getInclude();},'interpolation':function(){return checkInterpolation(pos) && getInterpolation();},'loop':function(){return checkLoop(pos) && getLoop();},'mixin':function(){return checkMixin(pos) && getMixin();},'namespace':function(){return checkNamespace(pos) && getNamespace();},'number':function(){return checkNumber(pos) && getNumber();},'operator':function(){return checkOperator(pos) && getOperator();},'optional':function(){return checkOptional(pos) && getOptional();},'parentheses':function(){return checkParentheses(pos) && getParentheses();},'parentselector':function(){return checkParentSelector(pos) && getParentSelector();},'percentage':function(){return checkPercentage(pos) && getPercentage();},'placeholder':function(){return checkPlaceholder(pos) && getPlaceholder();},'progid':function(){return checkProgid(pos) && getProgid();},'property':function(){return checkProperty(pos) && getProperty();},'propertyDelim':function(){return checkPropertyDelim(pos) && getPropertyDelim();},'pseudoc':function(){return checkPseudoc(pos) && getPseudoc();},'pseudoe':function(){return checkPseudoe(pos) && getPseudoe();},'ruleset':function(){return checkRuleset(pos) && getRuleset();},'s':function(){return checkS(pos) && getS();},'selector':function(){return checkSelector(pos) && getSelector();},'shash':function(){return checkShash(pos) && getShash();},'string':function(){return checkString(pos) && getString();},'stylesheet':function(){return checkStylesheet(pos) && getStylesheet();},'unary':function(){return checkUnary(pos) && getUnary();},'unicodeRange':function(){return checkUnicodeRange(pos) && getUnicodeRange();},'urange':function(){return checkUrange(pos) && getUrange();},'uri':function(){return checkUri(pos) && getUri();},'value':function(){return checkValue(pos) && getValue();},'variable':function(){return checkVariable(pos) && getVariable();},'variableslist':function(){return checkVariablesList(pos) && getVariablesList();},'vhash':function(){return checkVhash(pos) && getVhash();}}; /**
	 * Stops parsing and display error.
	 *
	 * @param {number=} opt_i Token's index number
	 */function throwError(opt_i){var ln=opt_i?tokens[opt_i].ln:tokens[pos].ln;throw {line:ln,syntax:'sass'};} /**
	 * @param {!Object} exclude
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkExcluding(exclude,i){var start=i;while(i < tokensLength) {if(exclude[tokens[i++].type])break;}return i - start - 2;} /**
	 * @param {number} start
	 * @param {number} finish
	 * @return {string}
	 */function joinValues(start,finish){var s='';for(var i=start;i < finish + 1;i++) {s += tokens[i].value;}return s;} /**
	 * @param {number} start
	 * @param {number} num
	 * @return {string}
	 */function joinValues2(start,num){if(start + num - 1 >= tokensLength)return;var s='';for(var i=0;i < num;i++) {s += tokens[start + i].value;}return s;} /**
	 * @param {string|!Array} content
	 * @param {number} line
	 * @param {number} column
	 * @param {number} colOffset
	 */function getLastPosition(content,line,column,colOffset){return typeof content === 'string'?getLastPositionForString(content,line,column,colOffset):getLastPositionForArray(content,line,column,colOffset);} /**
	 * @param {string} content
	 * @param {number} line
	 * @param {number} column
	 * @param {number} colOffset
	 */function getLastPositionForString(content,line,column,colOffset){var position=[];if(!content){position = [line,column];if(colOffset)position[1] += colOffset - 1;return position;}var lastLinebreak=content.lastIndexOf('\n');var endsWithLinebreak=lastLinebreak === content.length - 1;var splitContent=content.split('\n');var linebreaksCount=splitContent.length - 1;var prevLinebreak=linebreaksCount === 0 || linebreaksCount === 1?-1:content.length - splitContent[linebreaksCount - 1].length - 2; // Line:
	var offset=endsWithLinebreak?linebreaksCount - 1:linebreaksCount;position[0] = line + offset; // Column:
	if(endsWithLinebreak){offset = prevLinebreak !== -1?content.length - prevLinebreak:content.length - 1;}else {offset = linebreaksCount !== 0?content.length - lastLinebreak - column - 1:content.length - 1;}position[1] = column + offset;if(!colOffset)return position;if(endsWithLinebreak){position[0]++;position[1] = colOffset;}else {position[1] += colOffset;}return position;} /**
	 * @param {!Array} content
	 * @param {number} line
	 * @param {number} column
	 * @param {number} colOffset
	 */function getLastPositionForArray(content,line,column,colOffset){var position;if(content.length === 0){position = [line,column];}else {var c=content[content.length - 1];if(c.hasOwnProperty('end')){position = [c.end.line,c.end.column];}else {position = getLastPosition(c.content,line,column);}}if(!colOffset)return position;if(tokens[pos - 1].type !== 'Newline'){position[1] += colOffset;}else {position[0]++;position[1] = 1;}return position;} /**
	 * @param {string} type
	 * @param {string|!Array} content
	 * @param {number} line
	 * @param {number} column
	 * @param {!Array} end
	 */function newNode(type,content,line,column,end){if(!end)end = getLastPosition(content,line,column);return new Node({type:type,content:content,start:{line:line,column:column},end:{line:end[0],column:end[1]},syntax:'sass'});} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkAny(i){var l;if(l = checkBrackets(i))tokens[i].any_child = 1;else if(l = checkParentheses(i))tokens[i].any_child = 2;else if(l = checkString(i))tokens[i].any_child = 3;else if(l = checkVariablesList(i))tokens[i].any_child = 4;else if(l = checkVariable(i))tokens[i].any_child = 5;else if(l = checkPlaceholder(i))tokens[i].any_child = 6;else if(l = checkPercentage(i))tokens[i].any_child = 7;else if(l = checkDimension(i))tokens[i].any_child = 8;else if(l = checkUnicodeRange(i))tokens[i].any_child = 17;else if(l = checkNumber(i))tokens[i].any_child = 9;else if(l = checkUri(i))tokens[i].any_child = 10;else if(l = checkExpression(i))tokens[i].any_child = 11;else if(l = checkFunction(i))tokens[i].any_child = 12;else if(l = checkInterpolation(i))tokens[i].any_child = 13;else if(l = checkIdent(i))tokens[i].any_child = 14;else if(l = checkClass(i))tokens[i].any_child = 15;else if(l = checkUnary(i))tokens[i].any_child = 16;return l;} /**
	 * @return {!Node}
	 */function getAny(){var childType=tokens[pos].any_child;if(childType === 1)return getBrackets();else if(childType === 2)return getParentheses();else if(childType === 3)return getString();else if(childType === 4)return getVariablesList();else if(childType === 5)return getVariable();else if(childType === 6)return getPlaceholder();else if(childType === 7)return getPercentage();else if(childType === 8)return getDimension();else if(childType === 17)return getUnicodeRange();else if(childType === 9)return getNumber();else if(childType === 10)return getUri();else if(childType === 11)return getExpression();else if(childType === 12)return getFunction();else if(childType === 13)return getInterpolation();else if(childType === 14)return getIdent();else if(childType === 15)return getClass();else if(childType === 16)return getUnary();} /**
	 * Checks if token is part of mixin's arguments.
	 *
	 * @param {number} i Token's index number
	 * @return {number} Length of arguments
	 */function checkArguments(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;i++;while(i < tokens[start].right) {if(l = checkArgument(i))i += l;else return 0;}return tokens[start].right - start + 1;} /**
	 * Checks if token is valid to be part of arguments list
	 *
	 * @param {number} i Token's index number
	 * @return {number} Length of argument
	 */function checkArgument(i){var l;if(l = checkBrackets(i))tokens[i].argument_child = 1;else if(l = checkParentheses(i))tokens[i].argument_child = 2;else if(l = checkDeclaration(i))tokens[i].argument_child = 3;else if(l = checkFunction(i))tokens[i].argument_child = 4;else if(l = checkVariablesList(i))tokens[i].argument_child = 5;else if(l = checkVariable(i))tokens[i].argument_child = 6;else if(l = checkSC(i))tokens[i].argument_child = 7;else if(l = checkDelim(i))tokens[i].argument_child = 8;else if(l = checkDeclDelim(i))tokens[i].argument_child = 9;else if(l = checkString(i))tokens[i].argument_child = 10;else if(l = checkPercentage(i))tokens[i].argument_child = 11;else if(l = checkDimension(i))tokens[i].argument_child = 12;else if(l = checkNumber(i))tokens[i].argument_child = 13;else if(l = checkUri(i))tokens[i].argument_child = 14;else if(l = checkInterpolation(i))tokens[i].argument_child = 15;else if(l = checkIdent(i))tokens[i].argument_child = 16;else if(l = checkVhash(i))tokens[i].argument_child = 17;else if(l = checkOperator(i))tokens[i].argument_child = 18;else if(l = checkUnary(i))tokens[i].argument_child = 19;else if(l = checkParentSelector(i))tokens[i].argument_child = 20;else if(l = checkImportant(i))tokens[i].argument_child = 21;return l;} /**
	 * @return {!Node}
	 */function getArgument(){var childType=tokens[pos].argument_child;if(childType === 1)return getBrackets();else if(childType === 2)return getParentheses();else if(childType === 3)return getDeclaration();else if(childType === 4)return getFunction();else if(childType === 5)return getVariablesList();else if(childType === 6)return getVariable();else if(childType === 7)return getSC();else if(childType === 8)return getDelim();else if(childType === 9)return getDeclDelim();else if(childType === 10)return getString();else if(childType === 11)return getPercentage();else if(childType === 12)return getDimension();else if(childType === 13)return getNumber();else if(childType === 14)return getUri();else if(childType === 15)return getInterpolation();else if(childType === 16)return getIdent();else if(childType === 17)return getVhash();else if(childType === 18)return getOperator();else if(childType === 19)return getUnary();else if(childType === 20)return getParentSelector();else if(childType === 21)return getImportant();} /**
	 * Checks if token is part of an @-word (e.g. `@import`, `@include`).
	 *
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkAtkeyword(i){var l; // Check that token is `@`:
	if(i >= tokensLength || tokens[i++].type !== TokenType.CommercialAt)return 0;return (l = checkIdentOrInterpolation(i))?l + 1:0;} /**
	 * Gets node with @-word.
	 *
	 * @return {!Node}
	 */function getAtkeyword(){var startPos=pos++;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.AtkeywordType,x,token.ln,token.col);} /**
	 * Checks if token is a part of an @-rule.
	 *
	 * @param {number} i Token's index number
	 * @return {number} Length of @-rule
	 */function checkAtrule(i){var l;if(i >= tokensLength)return 0; // If token already has a record of being part of an @-rule,
	// return the @-rule's length:
	if(tokens[i].atrule_l !== undefined)return tokens[i].atrule_l; // If token is part of an @-rule, save the rule's type to token.
	// @keyframes:
	if(l = checkKeyframesRule(i))tokens[i].atrule_type = 4; // @-rule with ruleset:
	else if(l = checkAtruler(i))tokens[i].atrule_type = 1; // Block @-rule:
	else if(l = checkAtruleb(i))tokens[i].atrule_type = 2; // Single-line @-rule:
	else if(l = checkAtrules(i))tokens[i].atrule_type = 3;else return 0; // If token is part of an @-rule, save the rule's length to token:
	tokens[i].atrule_l = l;return l;} /**
	 * Gets node with @-rule.
	 *
	 * @return {!Node}
	 */function getAtrule(){switch(tokens[pos].atrule_type){case 1:return getAtruler(); // @-rule with ruleset
	case 2:return getAtruleb(); // Block @-rule
	case 3:return getAtrules(); // Single-line @-rule
	case 4:return getKeyframesRule();}} /**
	 * Checks if token is part of a block @-rule.
	 *
	 * @param {number} i Token's index number
	 * @return {number} Length of the @-rule
	 */function checkAtruleb(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Gets node with a block @-rule.
	 *
	 * @return {!Node}
	 */function getAtruleb(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets()).concat([getBlock()]);var token=tokens[startPos];return newNode(NodeType.AtruleType,x,token.ln,token.col);} /**
	 * Checks if token is part of an @-rule with ruleset.
	 *
	 * @param {number} i Token's index number
	 * @return {number} Length of the @-rule
	 */function checkAtruler(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;if(l = checkAtrulers(i))i += l;else return 0;return i - start;} /**
	 * Gets node with an @-rule with ruleset.
	 *
	 * @return {!Node}
	 */function getAtruler(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets());x.push(getAtrulers());var token=tokens[startPos];return newNode(NodeType.AtruleType,x,token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkAtrulers(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(!tokens[i].block_end)return 0;if(l = checkSC(i))i += l;if(l = checkRuleset(i) || checkAtrule(i))i += l;else return 0;while(l = checkRuleset(i) || checkAtrule(i) || checkSC(i)) {i += l;}if(i < tokensLength)tokens[i].atrulers_end = 1;return i - start;} /**
	 * @return {!Node}
	 */function getAtrulers(){var startPos=pos;var token=tokens[startPos];var line=token.ln;var column=token.col;var x=getSC();while(pos < tokensLength && !tokens[pos].atrulers_end) {if(checkSC(pos))x = x.concat(getSC());else if(checkAtrule(pos))x.push(getAtrule());else if(checkRuleset(pos))x.push(getRuleset());}var end=getLastPosition(x,line,column);return newNode(NodeType.BlockType,x,token.ln,token.col,end);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkAtrules(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;return i - start;} /**
	 * @return {!Node}
	 */function getAtrules(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets());var token=tokens[startPos];return newNode(NodeType.AtruleType,x,token.ln,token.col);} /**
	 * Checks if token is part of a block (e.g. `{...}`).
	 *
	 * @param {number} i Token's index number
	 * @return {number} Length of the block
	 */function checkBlock(i){return i < tokensLength && tokens[i].block_end?tokens[i].block_end - i + 1:0;} /**
	 * Gets node with a block.
	 *
	 * @return {!Node}
	 */function getBlock(){var startPos=pos;var end=tokens[pos].block_end;var x=[];var token=tokens[startPos];while(pos < end) {if(checkBlockdecl(pos))x = x.concat(getBlockdecl());else throwError();}return newNode(NodeType.BlockType,x,token.ln,token.col);} /**
	 * Checks if token is part of a declaration (property-value pair).
	 *
	 * @param {number} i Token's index number
	 * @return {number} Length of the declaration
	 */function checkBlockdecl(i){var l;if(i >= tokensLength)return 0;if(l = checkBlockdecl7(i))tokens[i].bd_type = 7;else if(l = checkBlockdecl5(i))tokens[i].bd_type = 5;else if(l = checkBlockdecl6(i))tokens[i].bd_type = 6;else if(l = checkBlockdecl1(i))tokens[i].bd_type = 1;else if(l = checkBlockdecl2(i))tokens[i].bd_type = 2;else if(l = checkBlockdecl3(i))tokens[i].bd_type = 3;else if(l = checkBlockdecl4(i))tokens[i].bd_type = 4;else return 0;return l;} /**
	 * @return {!Array}
	 */function getBlockdecl(){switch(tokens[pos].bd_type){case 1:return getBlockdecl1();case 2:return getBlockdecl2();case 3:return getBlockdecl3();case 4:return getBlockdecl4();case 5:return getBlockdecl5();case 6:return getBlockdecl6();case 7:return getBlockdecl7();}} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkBlockdecl1(i){var start=i;var l=undefined;if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else return 0;i += l;if(tokens[start].bd_kind === 2 && [2,4,6,8].indexOf(tokens[start].include_type) === -1)return 0;if(tokens[start].bd_kind === 6 && tokens[start].atrule_type === 3)return 0;while(i < tokensLength) {if(l = checkDeclDelim(i))return i + l - start;if(l = checkS(i))i += l;else if(l = checkCommentSL(i))i += l;else break;}return 0;} /**
	 * @return {!Array}
	 */function getBlockdecl1(){var x=[];var _x=[];var kind=tokens[pos].bd_kind;switch(kind){case 2:x.push(getInclude());break;case 5:x.push(getDeclaration());break;case 6:x.push(getAtrule());break;}while(pos < tokensLength) {var _pos=pos;if(checkDeclDelim(pos)){_x.push(getDeclDelim());x = x.concat(_x);break;}if(checkS(pos))_x.push(getS());else if(checkCommentSL(pos))_x.push(getCommentSL());else {pos = _pos;break;}}return x;} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkBlockdecl2(i){var start=i;var l=undefined;if(l = checkConditionalStatement(i))tokens[i].bd_kind = 1;else if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkExtend(i))tokens[i].bd_kind = 4;else if(l = checkMixin(i))tokens[i].bd_kind = 8;else if(l = checkLoop(i))tokens[i].bd_kind = 3;else if(l = checkRuleset(i))tokens[i].bd_kind = 7;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else return 0;i += l;while(i < tokensLength) {if(l = checkS(i))i += l;else if(l = checkCommentSL(i))i += l;else break;}return i - start;} /**
	 * @return {!Array}
	 */function getBlockdecl2(){var x=[];switch(tokens[pos].bd_kind){case 1:x.push(getConditionalStatement());break;case 2:x.push(getInclude());break;case 3:x.push(getLoop());break;case 4:x.push(getExtend());break;case 5:x.push(getDeclaration());break;case 6:x.push(getAtrule());break;case 7:x.push(getRuleset());break;case 8:x.push(getMixin());break;}while(pos < tokensLength) {if(checkS(pos))x.push(getS());else if(checkCommentSL(pos))x.push(getCommentSL());else break;}return x;} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkBlockdecl3(i){var start=i;var l=undefined;if(l = checkConditionalStatement(i))tokens[i].bd_kind = 1;else if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkExtend(i))tokens[i].bd_kind = 4;else if(l = checkLoop(i))tokens[i].bd_kind = 3;else if(l = checkRuleset(i))tokens[i].bd_kind = 7;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else return 0;i += l;return i - start;} /**
	 * @return {!Array}
	 */function getBlockdecl3(){var x=undefined;switch(tokens[pos].bd_kind){case 1:x = getConditionalStatement();break;case 2:x = getInclude();break;case 3:x = getLoop();break;case 4:x = getExtend();break;case 5:x = getDeclaration();break;case 6:x = getAtrule();break;case 7:x = getRuleset();break;}return [x];} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkBlockdecl4(i){return checkSC(i);} /**
	 * @return {!Array}
	 */function getBlockdecl4(){return getSC();} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkBlockdecl5(i){var start=i;var l=undefined;if(l = checkInclude(i))i += l;else if(l = checkRuleset(i))i += l;else return 0;while(i < tokensLength) {if(l = checkS(i))i += l;else if(l = checkCommentSL(i))i += l;else break;}return i - start;} /**
	 * @return {!Array}
	 */function getBlockdecl5(){var x=[];if(checkInclude(pos))x.push(getInclude());else x.push(getRuleset());while(pos < tokensLength) {if(checkS(pos))x.push(getS());else if(checkCommentSL(pos))x.push(getCommentSL());else break;}return x;} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkBlockdecl6(i){var start=i;var l=undefined;if(l = checkInclude(i))i += l;else if(l = checkRuleset(i))i += l;else return 0;return i - start;} /**
	 * @return {!Array}
	 */function getBlockdecl6(){var x=undefined;if(checkInclude(pos))x = getInclude();else x = getRuleset();return [x];} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkBlockdecl7(i){var start=i;var l=undefined;if(l = checkInclude(i))i += l;else return 0;if([2,4,6,8].indexOf(tokens[start].include_type) === -1)return 0;while(i < tokensLength) {if(l = checkDeclDelim(i))return i + l - start;if(l = checkS(i))i += l;else if(l = checkCommentSL(i))i += l;else break;}return 0;} /**
	 * @return {!Array}
	 */function getBlockdecl7(){var x=[];var _x=[];x.push(getInclude());while(pos < tokensLength) {var _pos=pos;if(checkDeclDelim(pos)){_x.push(getDeclDelim());x = x.concat(_x);break;}if(checkS(pos))_x.push(getS());else if(checkCommentSL(pos))_x.push(getCommentSL());else {pos = _pos;break;}}return x;} /**
	 * Checks if token is part of text inside square brackets, e.g. `[1]`.
	 *
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkBrackets(i){if(i >= tokensLength || tokens[i].type !== TokenType.LeftSquareBracket)return 0;return tokens[i].right - i + 1;} /**
	 * Gets node with text inside square brackets, e.g. `[1]`.
	 *
	 * @return {!Node}
	 */function getBrackets(){var startPos=pos;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;var tsets=getTsets();var end=getLastPosition(tsets,line,column,1);pos++;return newNode(NodeType.BracketsType,tsets,token.ln,token.col,end);} /**
	 * Checks if token is part of a class selector (e.g. `.abc`).
	 *
	 * @param {number} i Token's index number
	 * @return {number} Length of the class selector
	 */function checkClass(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].class_l)return tokens[i].class_l;if(tokens[i++].type !== TokenType.FullStop)return 0; // Check for `-` at beginning
	if(tokens[i].type === TokenType.HyphenMinus)i += 1;if(l = checkIdentOrInterpolation(i))i += l;else return 0;while(i < tokensLength) {if(l = checkIdentOrInterpolation(i) || checkNumber(i))i += l;else if(tokens[i].type === TokenType.HyphenMinus)i += 1;else break;}tokens[start].classEnd = i;return i - start;} /**
	 * Gets node with a class selector.
	 *
	 * @return {!Node}
	 */function getClass(){var startPos=pos;var type=NodeType.ClassType;var token=tokens[startPos];var line=token.ln;var column=token.col;var content=[];var end=token.classEnd; // Skip `.`
	pos++;while(pos < end) {if(checkIdentOrInterpolation(pos)){content = content.concat(getIdentOrInterpolation());}else if(checkNumber(pos)){content = content.concat(getNumber());}else if(tokens[pos].type === TokenType.HyphenMinus){content.push(newNode(NodeType.IdentType,tokens[pos].value,tokens[pos].ln,tokens[pos].col));pos++;}else break;}return newNode(type,content,line,column);} /**
	 * @param {number} i
	 * @return {number}
	 */function checkCombinator(i){if(i >= tokensLength)return 0;var l=undefined;if(l = checkCombinator1(i))tokens[i].combinatorType = 1;else if(l = checkCombinator2(i))tokens[i].combinatorType = 2;else if(l = checkCombinator3(i))tokens[i].combinatorType = 3;return l;} /**
	 * @return {!Node}
	 */function getCombinator(){var type=tokens[pos].combinatorType;if(type === 1)return getCombinator1();if(type === 2)return getCombinator2();if(type === 3)return getCombinator3();} /**
	 * (1) `||`
	 *
	 * @param {number} i
	 * @return {number}
	 */function checkCombinator1(i){if(tokens[i].type === TokenType.VerticalLine && tokens[i + 1].type === TokenType.VerticalLine)return 2;else return 0;} /**
	 * @return {!Node}
	 */function getCombinator1(){var type=NodeType.CombinatorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content='||';pos += 2;return newNode(type,content,line,column);} /**
	 * (1) `>`
	 * (2) `+`
	 * (3) `~`
	 *
	 * @param {number} i
	 * @return {number}
	 */function checkCombinator2(i){var type=tokens[i].type;if(type === TokenType.PlusSign || type === TokenType.GreaterThanSign || type === TokenType.Tilde)return 1;else return 0;}function getCombinator2(){var type=NodeType.CombinatorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=tokens[pos++].value;return newNode(type,content,line,column);} /**
	 * (1) `/panda/`
	 */function checkCombinator3(i){var start=i;if(tokens[i].type === TokenType.Solidus)i++;else return 0;var l=undefined;if(l = checkIdent(i))i += l;else return 0;if(tokens[i].type === TokenType.Solidus)i++;else return 0;return i - start;}function getCombinator3(){var type=NodeType.CombinatorType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `/`.
	pos++;var ident=getIdent(); // Skip `/`.
	pos++;var content='/' + ident.content + '/';return newNode(type,content,line,column);} /**
	 * Check if token is a multiline comment.
	 * @param {number} i Token's index number
	 * @return {number} `1` if token is a multiline comment, otherwise `0`
	 */function checkCommentML(i){return i < tokensLength && tokens[i].type === TokenType.CommentML?1:0;} /**
	 * Get node with a multiline comment
	 * @return {Array} `['commentML', x]` where `x`
	 *      is the comment's text (without `/*` and `* /`).
	 */function getCommentML(){var startPos=pos;var x=tokens[pos].value.substring(2);var token=tokens[startPos];var line=token.ln;var column=token.col;var end=getLastPosition(x,line,column + 2);pos++;return newNode(NodeType.CommentMLType,x,token.ln,token.col,end);} /**
	 * Check if token is part of a single-line comment.
	 * @param {number} i Token's index number
	 * @return {number} `1` if token is a single-line comment, otherwise `0`
	 */function checkCommentSL(i){return i < tokensLength && tokens[i].type === TokenType.CommentSL?1:0;} /**
	 * Get node with a single-line comment.
	 * @return {Array} `['commentSL', x]` where `x` is comment's message
	 *      (without `//`)
	 */function getCommentSL(){var startPos=pos;var token=tokens[startPos];var line=token.ln;var column=token.col;var x=tokens[pos++].value.substring(2);var end=!x?[line,column + 1]:getLastPosition(x,line,column + 2);return newNode(NodeType.CommentSLType,x,token.ln,token.col,end);} /**
	 * Check if token is part of a condition
	 * (e.g. `@if ...`, `@else if ...` or `@else ...`).
	 * @param {number} i Token's index number
	 * @return {number} Length of the condition
	 */function checkCondition(i){var start=i;var l=undefined;var _i=undefined;var s=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(['if','else'].indexOf(tokens[start + 1].value) < 0)return 0;while(i < tokensLength) {if(l = checkBlock(i))break;s = checkSC(i);_i = i + s;if(l = _checkCondition(_i))i += l + s;else break;}return i - start;}function _checkCondition(i){return checkVariable(i) || checkNumber(i) || checkInterpolation(i) || checkIdent(i) || checkOperator(i) || checkCombinator(i) || checkString(i);} /**
	 * Get node with a condition.
	 * @return {Array} `['condition', x]`
	 */function getCondition(){var startPos=pos;var x=[getAtkeyword()];while(pos < tokensLength) {if(checkBlock(pos))break;var s=checkSC(pos);var _pos=pos + s;if(!_checkCondition(_pos))break;if(s)x = x.concat(getSC());x.push(_getCondition());}var token=tokens[startPos];return newNode(NodeType.ConditionType,x,token.ln,token.col);}function _getCondition(){if(checkVariable(pos))return getVariable();if(checkNumber(pos))return getNumber();if(checkInterpolation(pos))return getInterpolation();if(checkIdent(pos))return getIdent();if(checkOperator(pos))return getOperator();if(checkCombinator(pos))return getCombinator();if(checkString(pos))return getString();} /**
	 * Check if token is part of a conditional statement
	 * (e.g. `@if ... {} @else if ... {} @else ... {}`).
	 * @param {number} i Token's index number
	 * @return {number} Length of the condition
	 */function checkConditionalStatement(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkCondition(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with a condition.
	 * @return {Array} `['condition', x]`
	 */function getConditionalStatement(){var startPos=pos;var x=[];x.push(getCondition());x = x.concat(getSC());x.push(getBlock());var token=tokens[startPos];return newNode(NodeType.ConditionalStatementType,x,token.ln,token.col);} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {number} i Token's index number
	 * @return {number} Length of the declaration
	 */function checkDeclaration(i){return checkDeclaration1(i) || checkDeclaration2(i);} /**
	 * Get node with a declaration
	 * @return {Array} `['declaration', ['property', x], ['propertyDelim'],
	 *       ['value', y]]`
	 */function getDeclaration(){return checkDeclaration1(pos)?getDeclaration1():getDeclaration2();} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {number} i Token's index number
	 * @return {number} Length of the declaration
	 */function checkDeclaration1(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkProperty(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkPropertyDelim(i))i++;else return 0;if(l = checkValue(i))return i + l - start;if(l = checkS(i))i += l;if(l = checkValue(i))i += l;else return 0;return i - start;} /**
	 * Get node with a declaration
	 * @return {Array} `['declaration', ['property', x], ['propertyDelim'],
	 *       ['value', y]]`
	 */function getDeclaration1(){var startPos=pos;var x=[];x.push(getProperty());if(checkS(pos))x.push(getS());x.push(getPropertyDelim());if(checkS(pos))x.push(getS());x.push(getValue());var token=tokens[startPos];return newNode(NodeType.DeclarationType,x,token.ln,token.col);} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {number} i Token's index number
	 * @return {number} Length of the declaration
	 */function checkDeclaration2(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkPropertyDelim(i))i++;else return 0;if(l = checkProperty(i))i += l;else return 0;if(l = checkValue(i))return i + l - start;if(l = checkSC(i))i += l;if(l = checkValue(i))i += l;else return 0;return i - start;} /**
	 * Get node with a declaration
	 * @return {Array} `['declaration', ['propertyDelim'], ['property', x],
	 *       ['value', y]]`
	 */function getDeclaration2(){var startPos=pos;var x=[];x.push(getPropertyDelim());x.push(getProperty());x = x.concat(getSC());x.push(getValue());var token=tokens[startPos];return newNode(NodeType.DeclarationType,x,token.ln,token.col);} /**
	 * Check if token is a semicolon
	 * @param {number} i Token's index number
	 * @return {number} `1` if token is a semicolon, otherwise `0`
	 */function checkDeclDelim(i){if(i >= tokensLength)return 0;return tokens[i].type === TokenType.Newline || tokens[i].type === TokenType.Semicolon?1:0;} /**
	 * Get node with a semicolon
	 * @return {Array} `['declDelim']`
	 */function getDeclDelim(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.DeclDelimType,'\n',token.ln,token.col);} /**
	 * Check if token if part of `!default` word.
	 * @param {number} i Token's index number
	 * @return {number} Length of the `!default` word
	 */function checkDefault(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'default'){tokens[start].defaultEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with a `!default` word
	 * @return {Array} `['default', sc]` where `sc` is optional whitespace
	 */function getDefault(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.defaultEnd);pos = token.defaultEnd + 1;return newNode(NodeType.DefaultType,content,line,column);} /**
	 * Check if token is a comma
	 * @param {number} i Token's index number
	 * @return {number} `1` if token is a comma, otherwise `0`
	 */function checkDelim(i){return i < tokensLength && tokens[i].type === TokenType.Comma?1:0;} /**
	 * Get node with a comma
	 * @return {Array} `['delim']`
	 */function getDelim(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.DelimType,',',token.ln,token.col);} /**
	 * Check if token is part of a number with dimension unit (e.g. `10px`)
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */function checkDimension(i){var ln=checkNumber(i);var li=undefined;if(i >= tokensLength || !ln || i + ln >= tokensLength)return 0;return (li = checkUnit(i + ln))?ln + li:0;} /**
	 * Get node of a number with dimension unit
	 * @return {Node}
	 */function getDimension(){var type=NodeType.DimensionType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[getNumber(),getUnit()];return newNode(type,content,line,column);} /**
	 * Check if token is unit
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */function checkUnit(i){var units=['em','ex','ch','rem','vh','vw','vmin','vmax','px','mm','q','cm','in','pt','pc','deg','grad','rad','turn','s','ms','Hz','kHz','dpi','dpcm','dppx'];return units.indexOf(tokens[i].value) !== -1?1:0;} /**
	 * Get unit node of type ident
	 * @return {Node} An ident node containing the unit value
	 */function getUnit(){var type=NodeType.IdentType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=token.value;pos++;return newNode(type,content,line,column);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkExpression(i){var start=i;if(i >= tokensLength || tokens[i++].value !== 'expression' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis){return 0;}return tokens[i].right - start + 1;} /**
	 * @return {Array}
	 */function getExpression(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;x = joinValues(pos + 1,tokens[pos].right - 1);var end=getLastPosition(x,line,column,1);if(end[0] === line)end[1] += 11;pos = tokens[pos].right + 1;return newNode(NodeType.ExpressionType,x,token.ln,token.col,end);}function checkExtend(i){var l=0;if(l = checkExtend1(i))tokens[i].extend_child = 1;else if(l = checkExtend2(i))tokens[i].extend_child = 2;return l;}function getExtend(){var type=tokens[pos].extend_child;if(type === 1)return getExtend1();else if(type === 2)return getExtend2();} /**
	 * Checks if token is part of an extend with `!optional` flag.
	 * @param {number} i
	 */function checkExtend1(i){var start=i;var l;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'extend')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkOptional(i))i += l;else return 0;return i - start;}function getExtend1(){var startPos=pos;var x=[].concat([getAtkeyword()],getSC(),getSelectorsGroup(),getSC(),getOptional());var token=tokens[startPos];return newNode(NodeType.ExtendType,x,token.ln,token.col);} /**
	 * Checks if token is part of an extend without `!optional` flag.
	 * @param {number} i
	 */function checkExtend2(i){var start=i;var l;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'extend')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;return i - start;}function getExtend2(){var startPos=pos;var x=[].concat([getAtkeyword()],getSC(),getSelectorsGroup());var token=tokens[startPos];return newNode(NodeType.ExtendType,x,token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkFunction(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i < tokensLength && tokens[i].type === TokenType.LeftParenthesis?tokens[i].right - start + 1:0;} /**
	 * @return {Array}
	 */function getFunction(){var startPos=pos;var x=getIdentOrInterpolation();var body=undefined;body = getArguments();x.push(body);var token=tokens[startPos];return newNode(NodeType.FunctionType,x,token.ln,token.col);} /**
	 * @return {Array}
	 */function getArguments(){var startPos=pos;var x=[];var body=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;while(pos < tokensLength && tokens[pos].type !== TokenType.RightParenthesis) {if(checkDeclaration(pos))x.push(getDeclaration());else if(checkArgument(pos)){body = getArgument();if(typeof body.content === 'string')x.push(body);else x = x.concat(body);}else if(checkClass(pos))x.push(getClass());else throwError();}var end=getLastPosition(x,line,column,1);pos++;return newNode(NodeType.ArgumentsType,x,token.ln,token.col,end);} /**
	 * Check if token is part of `!global` word
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkGlobal(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'global'){tokens[start].globalEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!global` word
	 */function getGlobal(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.globalEnd);pos = token.globalEnd + 1;return newNode(NodeType.GlobalType,content,line,column);} /**
	 * Check if token is part of an identifier
	 * @param {number} i Token's index number
	 * @return {number} Length of the identifier
	 */function checkIdent(i){var start=i;if(i >= tokensLength)return 0;if(tokens[i].type === TokenType.HyphenMinus && tokens[i + 1].type === TokenType.DecimalNumber)return 0;if(tokens[i].type === TokenType.HyphenMinus)i++;if(tokens[i].type === TokenType.LowLine || tokens[i].type === TokenType.Identifier)i++;else return 0;for(;i < tokensLength;i++) {if(tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.LowLine && tokens[i].type !== TokenType.Identifier && tokens[i].type !== TokenType.DecimalNumber)break;}tokens[start].ident_last = i - 1;return i - start;} /**
	 * Get node with an identifier
	 * @return {Array} `['ident', x]` where `x` is identifier's name
	 */function getIdent(){var startPos=pos;var x=joinValues(pos,tokens[pos].ident_last);pos = tokens[pos].ident_last + 1;var token=tokens[startPos];return newNode(NodeType.IdentType,x,token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @returns {number} Length of the identifier
	 */function checkPartialIdent(i){var start=i;if(i >= tokensLength)return 0;for(;i < tokensLength;i++) {if(tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.LowLine && tokens[i].type !== TokenType.Identifier && tokens[i].type !== TokenType.DecimalNumber)break;}tokens[start].ident_last = i - 1;return i - start;}function checkIdentOrInterpolation(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkInterpolation(i) || checkIdent(i))i += l;else break;}return i - start;}function getIdentOrInterpolation(){var x=[];while(pos < tokensLength) {if(checkInterpolation(pos))x.push(getInterpolation());else if(checkIdent(pos))x.push(getIdent());else break;}return x;} /**
	 * Check if token is part of `!important` word
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkImportant(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'important'){tokens[start].importantEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!important` word
	 * @return {Array} `['important', sc]` where `sc` is optional whitespace
	 */function getImportant(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.importantEnd);pos = token.importantEnd + 1;return newNode(NodeType.ImportantType,content,line,column);} /**
	 * Check if token is part of an included mixin (`@include` or `@extend`
	 *      directive).
	 * @param {number} i Token's index number
	 * @return {number} Length of the included mixin
	 */function checkInclude(i){var l;if(i >= tokensLength)return 0;if(l = checkInclude1(i))tokens[i].include_type = 1;else if(l = checkInclude2(i))tokens[i].include_type = 2;else if(l = checkInclude3(i))tokens[i].include_type = 3;else if(l = checkInclude4(i))tokens[i].include_type = 4;else if(l = checkInclude5(i))tokens[i].include_type = 5;else if(l = checkInclude6(i))tokens[i].include_type = 6;else if(l = checkInclude7(i))tokens[i].include_type = 7;else if(l = checkInclude8(i))tokens[i].include_type = 8;return l;} /**
	 * Get node with included mixin
	 * @return {Array} `['include', x]`
	 */function getInclude(){switch(tokens[pos].include_type){case 1:return getInclude1();case 2:return getInclude2();case 3:return getInclude3();case 4:return getInclude4();case 5:return getInclude5();case 6:return getInclude6();case 7:return getInclude7();case 8:return getInclude8();}} /**
	 * Check if token is part of an included mixin like `@include nani(foo) {...}`
	 * @param {number} i Token's index number
	 * @return {number} Length of the include
	 */function checkInclude1(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `@include nani(foo) {...}`
	 * @return {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc, ['block', q], sc` where `x` is `include` or
	 *      `extend`, `y` is mixin's identifier (selector), `z` are arguments
	 *      passed to the mixin, `q` is block passed to the mixin and `sc`
	 *      are optional whitespaces
	 */function getInclude1(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin like `@include nani(foo)`
	 * @param {number} i Token's index number
	 * @return {number} Length of the include
	 */function checkInclude2(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `@include nani(foo)`
	 * @return {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc]` where `x` is `include` or `extend`, `y` is
	 *      mixin's identifier (selector), `z` are arguments passed to the
	 *      mixin and `sc` are optional whitespaces
	 */function getInclude2(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin with a content block passed
	 *      as an argument (e.g. `@include nani {...}`)
	 * @param {number} i Token's index number
	 * @return {number} Length of the mixin
	 */function checkInclude3(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with an included mixin with a content block passed
	 *      as an argument (e.g. `@include nani {...}`)
	 * @return {Array} `['include', x]`
	 */function getInclude3(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkInclude4(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * @return {Array} `['include', x]`
	 */function getInclude4(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin like `+nani(foo) {...}`
	 * @param {number} i Token's index number
	 * @return {number} Length of the include
	 */function checkInclude5(i){var start=i;var l=undefined;if(tokens[i].type === TokenType.PlusSign)i++;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `+nani(foo) {...}`
	 * @return {Array} `['include', ['operator', '+'], ['selector', x], sc,
	 *      ['arguments', y], sc, ['block', z], sc` where `x` is
	 *      mixin's identifier (selector), `y` are arguments passed to the
	 *      mixin, `z` is block passed to mixin and `sc` are optional whitespaces
	 */function getInclude5(){var startPos=pos;var x=[].concat(getOperator(),getIdentOrInterpolation(),getSC(),getArguments(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin like `+nani(foo)`
	 * @param {number} i Token's index number
	 * @return {number} Length of the include
	 */function checkInclude6(i){var start=i;var l=undefined;if(tokens[i].type === TokenType.PlusSign)i++;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `+nani(foo)`
	 * @return {Array} `['include', ['operator', '+'], ['selector', y], sc,
	 *      ['arguments', z], sc]` where `y` is
	 *      mixin's identifier (selector), `z` are arguments passed to the
	 *      mixin and `sc` are optional whitespaces
	 */function getInclude6(){var startPos=pos;var x=[].concat(getOperator(),getIdentOrInterpolation(),getSC(),getArguments());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin with a content block passed
	 *      as an argument (e.g. `+nani {...}`)
	 * @param {number} i Token's index number
	 * @return {number} Length of the mixin
	 */function checkInclude7(i){var start=i;var l=undefined;if(tokens[i].type === TokenType.PlusSign)i++;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with an included mixin with a content block passed
	 *      as an argument (e.g. `+nani {...}`)
	 * @return {Array} `['include', x]`
	 */function getInclude7(){var startPos=pos;var x=[].concat(getOperator(),getIdentOrInterpolation(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkInclude8(i){var start=i;var l=undefined;if(tokens[i].type === TokenType.PlusSign)i++;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * @return {Array} `['include', x]`
	 */function getInclude8(){var startPos=pos;var x=[].concat(getOperator(),getIdentOrInterpolation());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an interpolated variable (e.g. `#{$nani}`).
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkInterpolation(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.NumberSign || !tokens[i + 1] || tokens[i + 1].type !== TokenType.LeftCurlyBracket)return 0;i += 2;while(tokens[i].type !== TokenType.RightCurlyBracket) {if(l = checkArgument(i))i += l;else return 0;}return tokens[i].type === TokenType.RightCurlyBracket?i - start + 1:0;} /**
	 * Get node with an interpolated variable
	 * @return {Array} `['interpolation', x]`
	 */function getInterpolation(){var startPos=pos;var x=[];var token=tokens[startPos];var line=token.ln;var column=token.col; // Skip `#{`:
	pos += 2;while(pos < tokensLength && tokens[pos].type !== TokenType.RightCurlyBracket) {var body=getArgument();if(typeof body.content === 'string')x.push(body);else x = x.concat(body);}var end=getLastPosition(x,line,column,1); // Skip `}`:
	pos++;return newNode(NodeType.InterpolationType,x,token.ln,token.col,end);} /**
	 * Check a single keyframe block - `5% {}`
	 * @param {number} i
	 * @return {number}
	 */function checkKeyframesBlock(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkKeyframesSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get a single keyframe block - `5% {}`
	 * @return {Node}
	 */function getKeyframesBlock(){var type=NodeType.RulesetType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[].concat(getKeyframesSelectorsGroup(),getSC(),[getBlock()]);return newNode(type,content,line,column);} /**
	 * Check all keyframe blocks - `5% {} 100% {}`
	 * @param {number} i
	 * @return {number}
	 */function checkKeyframesBlocks(i){return i < tokensLength && tokens[i].block_end?tokens[i].block_end - i + 1:0;} /**
	 * Get all keyframe blocks - `5% {} 100% {}`
	 * @return {Node}
	 */function getKeyframesBlocks(){var type=NodeType.BlockType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];var keyframesBlocksEnd=token.block_end;while(pos < keyframesBlocksEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkKeyframesBlock(pos))content.push(getKeyframesBlock());else if(checkAtrule(pos))content.push(getAtrule()); // @content
	else break;}return newNode(type,content,line,column);} /**
	 * Check if token is part of a @keyframes rule.
	 * @param {number} i Token's index number
	 * @return {number} Length of the @keyframes rule
	 */function checkKeyframesRule(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;var atruleName=joinValues2(i - l,l);if(atruleName.indexOf('keyframes') === -1)return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkKeyframesBlocks(i))i += l;else return 0;return i - start;} /**
	 * @return {Node}
	 */function getKeyframesRule(){var type=NodeType.AtruleType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[].concat([getAtkeyword()],getSC(),getIdentOrInterpolation(),getSC(),[getKeyframesBlocks()]);return newNode(type,content,line,column);} /**
	 * Check a single keyframe selector - `5%`, `from` etc
	 * @param {number} i
	 * @return {number}
	 */function checkKeyframesSelector(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkIdent(i)){ // Valid selectors are only `from` and `to`.
	var selector=joinValues2(i,l);if(selector !== 'from' && selector !== 'to')return 0;i += l;tokens[start].keyframesSelectorType = 1;}else if(l = checkPercentage(i)){i += l;tokens[start].keyframesSelectorType = 2;}else if(l = checkInterpolation(i)){i += l;tokens[start].keyframesSelectorType = 3;}else {return 0;}return i - start;} /**
	 * Get a single keyframe selector
	 * @return {Node}
	 */function getKeyframesSelector(){var keyframesSelectorType=NodeType.KeyframesSelectorType;var selectorType=NodeType.SelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(token.keyframesSelectorType === 1){content.push(getIdent());}else if(token.keyframesSelectorType === 2){content.push(getPercentage());}else if(token.keyframesSelectorType === 3){content.push(getInterpolation());}var keyframesSelector=newNode(keyframesSelectorType,content,line,column);return newNode(selectorType,[keyframesSelector],line,column);} /**
	 * Check the keyframe's selector groups
	 * @param {number} i
	 * @return {number}
	 */function checkKeyframesSelectorsGroup(i){var start=i;var l=undefined;if(l = checkKeyframesSelector(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);var c=checkDelim(i + sb);if(!c)break;var sa=checkSC(i + sb + c);if(l = checkKeyframesSelector(i + sb + c + sa))i += sb + c + sa + l;else break;}tokens[start].selectorsGroupEnd = i;return i - start;} /**
	 * Get the keyframe's selector groups
	 * @return {Array} An array of keyframe selectors
	 */function getKeyframesSelectorsGroup(){var selectorsGroup=[];var selectorsGroupEnd=tokens[pos].selectorsGroupEnd;selectorsGroup.push(getKeyframesSelector());while(pos < selectorsGroupEnd) {selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getDelim());selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getKeyframesSelector());}return selectorsGroup;} /**
	 * Check if token is part of a loop.
	 * @param {number} i Token's index number
	 * @return {number} Length of the loop
	 */function checkLoop(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(['for','each','while'].indexOf(tokens[start + 1].value) < 0)return 0;while(i < tokensLength) {if(l = checkBlock(i)){i += l;break;}else if(l = checkVariable(i) || checkNumber(i) || checkInterpolation(i) || checkIdent(i) || checkSC(i) || checkOperator(i) || checkCombinator(i) || checkString(i))i += l;else return 0;}return i - start;} /**
	 * Get node with a loop.
	 * @return {Array} `['loop', x]`
	 */function getLoop(){var startPos=pos;var x=[];x.push(getAtkeyword());while(pos < tokensLength) {if(checkBlock(pos)){x.push(getBlock());break;}else if(checkVariable(pos))x.push(getVariable());else if(checkNumber(pos))x.push(getNumber());else if(checkInterpolation(pos))x.push(getInterpolation());else if(checkIdent(pos))x.push(getIdent());else if(checkOperator(pos))x.push(getOperator());else if(checkCombinator(pos))x.push(getCombinator());else if(checkSC(pos))x = x.concat(getSC());else if(checkString(pos))x.push(getString());}var token=tokens[startPos];return newNode(NodeType.LoopType,x,token.ln,token.col);} /**
	 * Check if token is part of a mixin
	 * @param {number} i Token's index number
	 * @return {number} Length of the mixin
	 */function checkMixin(i){return checkMixin1(i) || checkMixin2(i);} /**
	 * Get node with a mixin
	 * @return {Array} `['mixin', x]`
	 */function getMixin(){return checkMixin1(pos)?getMixin1():getMixin2();} /**
	 * Check if token is part of a mixin
	 * @param {number} i Token's index number
	 * @return {number} Length of the mixin
	 */function checkMixin1(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if((l = checkAtkeyword(i)) && tokens[i + 1].value === 'mixin')i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else {if(l = checkArguments(i))i += l;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;}return i - start;} /**
	 * Get node with a mixin
	 * @return {Array} `['mixin', x]`
	 */function getMixin1(){var startPos=pos;var x=[getAtkeyword()];x = x.concat(getSC());if(checkIdentOrInterpolation(pos))x = x.concat(getIdentOrInterpolation());x = x.concat(getSC());if(checkBlock(pos))x.push(getBlock());else {if(checkArguments(pos))x.push(getArguments());x = x.concat(getSC());x.push(getBlock());}var token=tokens[startPos];return newNode(NodeType.MixinType,x,token.ln,token.col);} /**
	 * Check if token is part of a mixin
	 * @param {number} i Token's index number
	 * @return {number} Length of the mixin
	 */function checkMixin2(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].type === TokenType.EqualsSign)i++;else return 0;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else {if(l = checkArguments(i))i += l;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;}return i - start;} /**
	* Get node with a mixin
	* @return {Array} `['mixin', x]`
	*/function getMixin2(){var startPos=pos;var x=[getOperator()];x = x.concat(getSC());if(checkIdentOrInterpolation(pos))x = x.concat(getIdentOrInterpolation());x = x.concat(getSC());if(checkBlock(pos))x.push(getBlock());else {if(checkArguments(pos))x.push(getArguments());x = x.concat(getSC());x.push(getBlock());}var token=tokens[startPos];return newNode(NodeType.MixinType,x,token.ln,token.col);} /**
	 * Check if token is a namespace sign (`|`)
	 * @param {number} i Token's index number
	 * @return {number} `1` if token is `|`, `0` if not
	 */function checkNamespace(i){return i < tokensLength && tokens[i].type === TokenType.VerticalLine?1:0;} /**
	 * Get node with a namespace sign
	 * @return {Array} `['namespace']`
	 */function getNamespace(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.NamespaceType,'|',token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkNmName2(i){if(tokens[i].type === TokenType.Identifier)return 1;else if(tokens[i].type !== TokenType.DecimalNumber)return 0;i++;return i < tokensLength && tokens[i].type === TokenType.Identifier?2:1;} /**
	 * @return {string}
	 */function getNmName2(){var s=tokens[pos].value;if(tokens[pos++].type === TokenType.DecimalNumber && pos < tokensLength && tokens[pos].type === TokenType.Identifier)s += tokens[pos++].value;return s;} /**
	 * Check if token is part of a number
	 * @param {number} i Token's index number
	 * @return {number} Length of number
	 */function checkNumber(i){if(i >= tokensLength)return 0;if(tokens[i].number_l)return tokens[i].number_l; // `10`:
	if(i < tokensLength && tokens[i].type === TokenType.DecimalNumber && (!tokens[i + 1] || tokens[i + 1] && tokens[i + 1].type !== TokenType.FullStop)){tokens[i].number_l = 1;return 1;} // `10.`:
	if(i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && (!tokens[i + 2] || tokens[i + 2].type !== TokenType.DecimalNumber)){tokens[i].number_l = 2;return 2;} // `.10`:
	if(i < tokensLength && tokens[i].type === TokenType.FullStop && tokens[i + 1].type === TokenType.DecimalNumber){tokens[i].number_l = 2;return 2;} // `10.10`:
	if(i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && tokens[i + 2] && tokens[i + 2].type === TokenType.DecimalNumber){tokens[i].number_l = 3;return 3;}return 0;} /**
	 * Get node with number
	 * @return {Array} `['number', x]` where `x` is a number converted
	 *      to string.
	 */function getNumber(){var s='';var startPos=pos;var l=tokens[pos].number_l;for(var j=0;j < l;j++) {s += tokens[pos + j].value;}pos += l;var token=tokens[startPos];return newNode(NodeType.NumberType,s,token.ln,token.col);} /**
	 * Check if token is an operator (`/`, `%`, `,`, `:` or `=`).
	 * @param {number} i Token's index number
	 * @return {number} `1` if token is an operator, otherwise `0`
	 */function checkOperator(i){if(i >= tokensLength)return 0;switch(tokens[i].type){case TokenType.Solidus:case TokenType.PercentSign:case TokenType.Comma:case TokenType.Colon:case TokenType.EqualsSign:case TokenType.EqualitySign:case TokenType.InequalitySign:case TokenType.LessThanSign:case TokenType.GreaterThanSign:case TokenType.Asterisk:return 1;}return 0;} /**
	 * Get node with an operator
	 * @return {Array} `['operator', x]` where `x` is an operator converted
	 *      to string.
	 */function getOperator(){var startPos=pos;var x=tokens[pos++].value;var token=tokens[startPos];return newNode(NodeType.OperatorType,x,token.ln,token.col);} /**
	 * Check if token is part of `!optional` word
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkOptional(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'optional'){tokens[start].optionalEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!optional` word
	 */function getOptional(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.optionalEnd);pos = token.optionalEnd + 1;return newNode(NodeType.OptionalType,content,line,column);} /**
	 * Check if token is part of text inside parentheses, e.g. `(1)`
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkParentheses(i){if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;return tokens[i].right - i + 1;} /**
	 * Get node with text inside parentheses, e.g. `(1)`
	 * @return {Node}
	 */function getParentheses(){var type=NodeType.ParenthesesType;var token=tokens[pos];var line=token.ln;var column=token.col;pos++;var tsets=getTsets();var end=getLastPosition(tsets,line,column,1);pos++;return newNode(type,tsets,line,column,end);} /**
	 * Check if token is a parent selector, e.g. `&`
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkParentSelector(i){return i < tokensLength && tokens[i].type === TokenType.Ampersand?1:0;} /**
	 * Get node with a parent selector
	 * @return {Node}
	 */function getParentSelector(){var startPos=pos;var token=tokens[startPos];pos++;return newNode(NodeType.ParentSelectorType,'&',token.ln,token.col);} /**
	 * Check if token is a parent selector extension, e.g. `&--foo-bar`
	 * @param {number} i Token's index number
	 * @returns {number} Length of the parent selector extension
	 */function checkParentSelectorExtension(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;while(i < tokensLength) {if(l = checkNumber(i) || checkPartialIdent(i) || checkIdentOrInterpolation(i))i += l;else break;}return i - start;} /**
	 * Get parent selector extension node
	 * @return {Node}
	 */function getParentSelectorExtension(){var type=NodeType.ParentSelectorExtensionType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];while(pos < tokensLength) {if(checkNumber(pos)){content.push(getNumber());}else if(checkPartialIdent(pos)){content.push(getIdent());}else if(checkIdentOrInterpolation(pos)){content = content.concat(getIdentOrInterpolation());}else break;}return newNode(type,content,line,column);} /**
	 * Check if token is a parent selector with an extension or not
	 * @param {number} i Token's index number
	 * @return {number} Length of the parent selector and extension if applicable
	 */function checkParentSelectorWithExtension(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkParentSelector(i))i += l;else return 0;if(l = checkParentSelectorExtension(i))i += l;return i - start;} /**
	 * Get parent selector node and extension node if applicable
	 * @return {Array}
	 */function getParentSelectorWithExtension(){var content=[getParentSelector()];if(checkParentSelectorExtension(pos))content.push(getParentSelectorExtension());return content;} /**
	 * Check if token is part of a number or an interpolation with a percent sign
	 * (e.g. `10%`).
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkPercentage(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkNumberOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.PercentSign)return 0;return i - start + 1;} /**
	 * Get a percentage node that contains either a number or an interpolation
	 * @return {Object} The percentage node
	 */function getPercentage(){var startPos=pos;var token=tokens[startPos];var line=token.ln;var column=token.col;var content=getNumberOrInterpolation();var end=getLastPosition(content,line,column,1); // Skip %
	pos++;return newNode(NodeType.PercentageType,content,token.ln,token.col,end);} /**
	 * Check if token is a number or an interpolation
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkNumberOrInterpolation(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkInterpolation(i) || checkNumber(i))i += l;else break;}return i - start;} /**
	 * Get a number and/or interpolation node
	 * @return {Array} An array containing a single or multiple nodes
	 */function getNumberOrInterpolation(){var content=[];while(pos < tokensLength) {if(checkInterpolation(pos))content.push(getInterpolation());else if(checkNumber(pos))content.push(getNumber());else break;}return content;} /**
	 * Check if token is part of a placeholder selector (e.g. `%abc`).
	 * @param {number} i Token's index number
	 * @return {number} Length of the selector
	 */function checkPlaceholder(i){var l;if(i >= tokensLength)return 0;if(tokens[i].placeholder_l)return tokens[i].placeholder_l;if(tokens[i].type !== TokenType.PercentSign){return 0;}if(l = checkIdentOrInterpolation(i + 1)){tokens[i].placeholder_l = l + 1;return l + 1;}return 0;} /**
	 * Get node with a placeholder selector
	 * @return {Array} `['placeholder', ['ident', x]]` where x is a placeholder's
	 *      identifier (without `%`, e.g. `abc`).
	 */function getPlaceholder(){var startPos=pos;pos++;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.PlaceholderType,x,token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkProgid(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(joinValues2(i,6) === 'progid:DXImageTransform.Microsoft.')i += 6;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === TokenType.LeftParenthesis){tokens[start].progid_end = tokens[i].right;i = tokens[i].right + 1;}else return 0;return i - start;} /**
	 * @return {Array}
	 */function getProgid(){var startPos=pos;var progid_end=tokens[pos].progid_end;var x=joinValues(pos,progid_end);pos = progid_end + 1;var token=tokens[startPos];return newNode(NodeType.ProgidType,x,token.ln,token.col);} /**
	 * Check if token is part of a property
	 * @param {number} i Token's index number
	 * @return {number} Length of the property
	 */function checkProperty(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkVariable(i) || checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * Get node with a property
	 * @return {Array} `['property', x]`
	 */function getProperty(){var startPos=pos;var x=[];if(checkVariable(pos)){x.push(getVariable());}else {x = x.concat(getIdentOrInterpolation());}var token=tokens[startPos];return newNode(NodeType.PropertyType,x,token.ln,token.col);} /**
	 * Check if token is a colon
	 * @param {number} i Token's index number
	 * @return {number} `1` if token is a colon, otherwise `0`
	 */function checkPropertyDelim(i){return i < tokensLength && tokens[i].type === TokenType.Colon?1:0;} /**
	 * Get node with a colon
	 * @return {Array} `['propertyDelim']`
	 */function getPropertyDelim(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.PropertyDelimType,':',token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkPseudo(i){return checkPseudoe(i) || checkPseudoc(i);} /**
	 * @return {Array}
	 */function getPseudo(){if(checkPseudoe(pos))return getPseudoe();if(checkPseudoc(pos))return getPseudoc();} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkPseudoe(i){var l;if(i >= tokensLength || tokens[i++].type !== TokenType.Colon || i >= tokensLength || tokens[i++].type !== TokenType.Colon)return 0;return (l = checkIdentOrInterpolation(i))?l + 2:0;} /**
	 * @return {Array}
	 */function getPseudoe(){var startPos=pos;pos += 2;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.PseudoeType,x,token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkPseudoc(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.Colon)return 0;if(l = checkPseudoClass3(i))tokens[i].pseudoClassType = 3;else if(l = checkPseudoClass4(i))tokens[i].pseudoClassType = 4;else if(l = checkPseudoClass5(i))tokens[i].pseudoClassType = 5;else if(l = checkPseudoClass1(i))tokens[i].pseudoClassType = 1;else if(l = checkPseudoClass2(i))tokens[i].pseudoClassType = 2;else if(l = checkPseudoClass6(i))tokens[i].pseudoClassType = 6;else return 0;return l;} /**
	 * @return {Array}
	 */function getPseudoc(){var childType=tokens[pos].pseudoClassType;if(childType === 1)return getPseudoClass1();if(childType === 2)return getPseudoClass2();if(childType === 3)return getPseudoClass3();if(childType === 4)return getPseudoClass4();if(childType === 5)return getPseudoClass5();if(childType === 6)return getPseudoClass6();} /**
	 * (-) `:not(panda)`
	 */function checkPseudoClass1(i){var start=i; // Skip `:`.
	i++;if(i >= tokensLength)return 0;var l=undefined;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSelectorsGroup(i))i += l;else return 0;if(i !== right)return 0;return right - start + 1;} /**
	 * (-) `:not(panda)`
	 */function getPseudoClass1(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `:`.
	pos++;content = content.concat(getIdentOrInterpolation());{var _type=NodeType.ArgumentsType;var _token=tokens[pos];var _line=_token.ln;var _column=_token.col; // Skip `(`.
	pos++;var selectors=getSelectorsGroup();var end=getLastPosition(selectors,_line,_column,1);var args=newNode(_type,selectors,_line,_column,end);content.push(args); // Skip `)`.
	pos++;}return newNode(type,content,line,column);} /**
	 * (1) `:nth-child(odd)`
	 * (2) `:nth-child(even)`
	 * (3) `:lang(de-DE)`
	 */function checkPseudoClass2(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass2(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `:`.
	pos++;content = content.concat(getIdentOrInterpolation());var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;value = value.concat(getSC()).concat(getIdentOrInterpolation()).concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(-3n + 2)`
	 */function checkPseudoClass3(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(l = checkNumberOrInterpolation(i))i += l;if(i >= tokensLength)return 0;if(tokens[i].value === 'n')i++;else return 0;if(l = checkSC(i))i += l;if(i >= tokensLength)return 0;if(tokens[i].type === TokenType.PlusSign || tokens[i].type === TokenType.HyphenMinus)i++;else return 0;if(l = checkSC(i))i += l;if(l = checkNumberOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass3(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkNumberOrInterpolation(pos))value = value.concat(getNumberOrInterpolation());{var _l=tokens[pos].ln;var _c=tokens[pos].col;var _content=tokens[pos].value;var ident=newNode(NodeType.IdentType,_content,_l,_c);value.push(ident);pos++;}value = value.concat(getSC());if(checkUnary(pos))value.push(getUnary());value = value.concat(getSC());if(checkNumberOrInterpolation(pos))value = value.concat(getNumberOrInterpolation());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(-3n)`
	 */function checkPseudoClass4(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(l = checkInterpolation(i))i += l;if(tokens[i].type === TokenType.DecimalNumber)i++;if(tokens[i].value === 'n')i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass4(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkInterpolation(pos))value.push(getInterpolation());if(checkNumber(pos))value.push(getNumber());if(checkIdent(pos))value.push(getIdent());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(+8)`
	 */function checkPseudoClass5(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(tokens[i].type === TokenType.DecimalNumber)i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass5(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkNumber(pos))value.push(getNumber());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:checked`
	 */function checkPseudoClass6(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getPseudoClass6(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();return newNode(type,content,line,column);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkRuleset(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i)){i += l;}else if(l = checkSC(i)){i += l;if(l = checkBlock(i))i += l;else return 0;}else return 0;return i - start;}function getRuleset(){var type=NodeType.RulesetType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];content = content.concat(getSelectorsGroup());content = content.concat(getSC());if(checkBlock(pos)){content.push(getBlock());}else {content = content.concat(getSC(),getBlock());}return newNode(type,content,line,column);} /**
	 * Check if token is marked as a space (if it's a space or a tab
	 *      or a line break).
	 * @param {number} i
	 * @return {number} Number of spaces in a row starting with the given token.
	 */function checkS(i){return i < tokensLength && tokens[i].ws?tokens[i].ws_last - i + 1:0;} /**
	 * Get node with spaces
	 * @return {Array} `['s', x]` where `x` is a string containing spaces
	 */function getS(){var startPos=pos;var x=joinValues(pos,tokens[pos].ws_last);pos = tokens[pos].ws_last + 1;var token=tokens[startPos];return newNode(NodeType.SType,x,token.ln,token.col);} /**
	 * Check if token is a space or a comment.
	 * @param {number} i Token's index number
	 * @return {number} Number of similar (space or comment) tokens
	 *      in a row starting with the given token.
	 */function checkSC(i){if(!tokens[i])return 0;var l=undefined;var lsc=0;var ln=tokens[i].ln;while(i < tokensLength) {if(tokens[i].ln !== ln)break;if(!(l = checkS(i)) && !(l = checkCommentML(i)) && !(l = checkCommentSL(i)))break;i += l;lsc += l;if(tokens[i] && tokens[i].type === TokenType.Newline)break;}return lsc || 0;} /**
	 * Get node with spaces and comments
	 * @return {Array} Array containing nodes with spaces (if there are any)
	 *      and nodes with comments (if there are any):
	 *      `[['s', x]*, ['comment', y]*]` where `x` is a string of spaces
	 *      and `y` is a comment's text (without `/*` and `* /`).
	 */function getSC(){var sc=[];var ln=undefined;if(pos >= tokensLength)return sc;ln = tokens[pos].ln;while(pos < tokensLength) {if(tokens[pos].ln !== ln)break;else if(checkS(pos))sc.push(getS());else if(checkCommentML(pos))sc.push(getCommentML());else if(checkCommentSL(pos))sc.push(getCommentSL());else break;if(tokens[pos] && tokens[pos].type === TokenType.Newline)break;}return sc;} /**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      a simple selector
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkShash(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.NumberSign)return 0;return (l = checkIdentOrInterpolation(i + 1))?l + 1:0;} /**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside a simple
	 *      selector
	 * @return {Array} `['shash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `fff`)
	 */function getShash(){var startPos=pos;var token=tokens[startPos];pos++;var x=getIdentOrInterpolation();return newNode(NodeType.ShashType,x,token.ln,token.col);} /**
	 * Check if token is part of a string (text wrapped in quotes)
	 * @param {number} i Token's index number
	 * @return {number} `1` if token is part of a string, `0` if not
	 */function checkString(i){if(i >= tokensLength){return 0;}if(tokens[i].type === TokenType.StringSQ || tokens[i].type === TokenType.StringDQ){return 1;}return 0;} /**
	 * Get string's node
	 * @return {Array} `['string', x]` where `x` is a string (including
	 *      quotes).
	 */function getString(){var startPos=pos;var x=tokens[pos++].value;var token=tokens[startPos];return newNode(NodeType.StringType,x,token.ln,token.col);} /**
	 * Validate stylesheet: it should consist of any number (0 or more) of
	 * rulesets (sets of rules with selectors), @-rules, whitespaces or
	 * comments.
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkStylesheet(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkSC(i) || checkDeclaration(i) || checkDeclDelim(i) || checkInclude(i) || checkExtend(i) || checkMixin(i) || checkLoop(i) || checkConditionalStatement(i) || checkAtrule(i) || checkRuleset(i))i += l;else throwError(i);}return i - start;} /**
	 * @return {Array} `['stylesheet', x]` where `x` is all stylesheet's
	 *      nodes.
	 */function getStylesheet(){var startPos=pos;var x=[];var node;var wasDeclaration=false;while(pos < tokensLength) {if(wasDeclaration && checkDeclDelim(pos))node = getDeclDelim();else if(checkSC(pos))node = getSC();else if(checkRuleset(pos))node = getRuleset();else if(checkInclude(pos))node = getInclude();else if(checkExtend(pos))node = getExtend();else if(checkMixin(pos))node = getMixin();else if(checkLoop(pos))node = getLoop();else if(checkConditionalStatement(pos))node = getConditionalStatement();else if(checkAtrule(pos))node = getAtrule();else if(checkDeclaration(pos))node = getDeclaration();else throwError();wasDeclaration = node.type === NodeType.DeclarationType;if(Array.isArray(node))x = x.concat(node);else x.push(node);}var token=tokens[startPos];return newNode(NodeType.StylesheetType,x,token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkTset(i){return checkVhash(i) || checkOperator(i) || checkAny(i) || checkSC(i) || checkInterpolation(i);} /**
	 * @return {Array}
	 */function getTset(){if(checkVhash(pos))return getVhash();else if(checkOperator(pos))return getOperator();else if(checkAny(pos))return getAny();else if(checkSC(pos))return getSC();else if(checkInterpolation(pos))return getInterpolation();} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkTsets(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;while(tokens[i - 1].type !== TokenType.Newline && (l = checkTset(i))) {i += l;}return i - start;} /**
	 * @return {Array}
	 */function getTsets(){var x=[];var t=undefined;while(tokens[pos - 1].type !== TokenType.Newline && (t = getTset())) {if(typeof t.content === 'string')x.push(t);else x = x.concat(t);}return x;} /**
	 * Check if token is an unary (arithmetical) sign (`+` or `-`)
	 * @param {number} i Token's index number
	 * @return {number} `1` if token is an unary sign, `0` if not
	 */function checkUnary(i){if(i >= tokensLength){return 0;}if(tokens[i].type === TokenType.HyphenMinus || tokens[i].type === TokenType.PlusSign){return 1;}return 0;} /**
	 * Get node with an unary (arithmetical) sign (`+` or `-`)
	 * @return {Array} `['unary', x]` where `x` is an unary sign
	 *      converted to string.
	 */function getUnary(){var startPos=pos;var x=tokens[pos++].value;var token=tokens[startPos];return newNode(NodeType.OperatorType,x,token.ln,token.col);} /**
	 * Check if token is a unicode range (single or multiple <urange> nodes)
	 * @param {number} i Token's index
	 * @return {number} Unicode range node's length
	 */function checkUnicodeRange(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkUrange(i))i += l;else return 0;while(i < tokensLength) {var spaceBefore=checkSC(i);var comma=checkDelim(i + spaceBefore);if(!comma)break;var spaceAfter=checkSC(i + spaceBefore + comma);if(l = checkUrange(i + spaceBefore + comma + spaceAfter)){i += spaceBefore + comma + spaceAfter + l;}else break;}return i - start;} /**
	 * Get a unicode range node
	 * @return {Node}
	 */function getUnicodeRange(){var type=NodeType.UnicodeRangeType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];while(pos < tokensLength) {if(checkSC(pos))content = content.concat(getSC());else if(checkDelim(pos))content.push(getDelim());else if(checkUrange(pos))content.push(getUrange());else break;}return newNode(type,content,line,column);} /**
	 * Check if token is a u-range (part of a unicode-range)
	 * (1) `U+416`
	 * (2) `U+400-4ff`
	 * (3) `U+4??`
	 * @param {number} i Token's index
	 * @return {number} Urange node's length
	 */function checkUrange(i){var start=i;var l=undefined;if(i >= tokensLength)return 0; // Check for unicode prefix (u+ or U+)
	if(tokens[i].value === 'U' || tokens[i].value === 'u')i += 1;else return 0;if(i >= tokensLength)return 0;if(tokens[i].value === '+')i += 1;else return 0;while(i < tokensLength) {if(l = checkIdent(i))i += l;else if(l = checkNumber(i))i += l;else if(l = checkUnary(i))i += l;else if(l = _checkUnicodeWildcard(i))i += l;else break;}tokens[start].urangeEnd = i - 1;return i - start;} /**
	 * Get a u-range node (part of a unicode-range)
	 * @return {Node}
	 */function getUrange(){var startPos=pos;var type=NodeType.UrangeType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];content = joinValues(startPos,tokens[startPos].urangeEnd);pos = tokens[startPos].urangeEnd + 1;return newNode(type,content,line,column);} /**
	 * Check for unicode wildcard characters `?`
	 * @param {number} i Token's index
	 * @return {number} Wildcard length
	 */function _checkUnicodeWildcard(i){var start=i;if(i >= tokensLength)return 0;while(i < tokensLength) {if(tokens[i].type === TokenType.QuestionMark)i += 1;else break;}return i - start;} /**
	 * Check if token is part of URI (e.g. `url('/css/styles.css')`)
	 * @param {number} i Token's index number
	 * @return {number} Length of URI
	 */function checkUri(i){var start=i;if(i >= tokensLength || tokens[i++].value !== 'url' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;return tokens[i].right - start + 1;} /**
	 * Get node with URI
	 * @return {Array} `['uri', x]` where `x` is URI's nodes (without `url`
	 *      and braces, e.g. `['string', ''/css/styles.css'']`).
	 */function getUri(){var startPos=pos;var uriExcluding={};var uri=undefined;var token=undefined;var l=undefined;var raw=undefined;pos += 2;uriExcluding[TokenType.Space] = 1;uriExcluding[TokenType.Tab] = 1;uriExcluding[TokenType.Newline] = 1;uriExcluding[TokenType.LeftParenthesis] = 1;uriExcluding[TokenType.RightParenthesis] = 1;if(checkUriContent(pos)){uri = [].concat(getSC()).concat(getUriContent()).concat(getSC());}else {uri = [].concat(getSC());l = checkExcluding(uriExcluding,pos);token = tokens[pos];raw = newNode(NodeType.RawType,joinValues(pos,pos + l),token.ln,token.col);uri.push(raw);pos += l + 1;uri = uri.concat(getSC());}token = tokens[startPos];var line=token.ln;var column=token.col;var end=getLastPosition(uri,line,column,1);pos++;return newNode(NodeType.UriType,uri,token.ln,token.col,end);} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkUriContent(i){return checkUri1(i) || checkFunction(i);} /**
	 * @return {Array}
	 */function getUriContent(){if(checkUri1(pos))return getString();else if(checkFunction(pos))return getFunction();} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkUri1(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkSC(i))i += l;if(tokens[i].type !== TokenType.StringDQ && tokens[i].type !== TokenType.StringSQ)return 0;i++;if(l = checkSC(i))i += l;return i - start;} /**
	 * Check if token is part of a value
	 * @param {number} i Token's index number
	 * @return {number} Length of the value
	 */function checkValue(i){var start=i;var l=undefined;var s=undefined;var _i=undefined;while(i < tokensLength) {if(checkDeclDelim(i))break;if(l = checkBlock(i)){i += l;break;}s = checkS(i);_i = i + s;if(l = _checkValue(_i))i += l + s;if(!l || checkBlock(i - l))break;}return i - start;} /**
	 * @param {number} i Token's index number
	 * @return {number}
	 */function _checkValue(i){return checkVhash(i) || checkOperator(i) || checkImportant(i) || checkGlobal(i) || checkDefault(i) || checkProgid(i) || checkAny(i) || checkInterpolation(i) || checkParentSelector(i);} /**
	 * @return {Array}
	 */function getValue(){var startPos=pos;var x=[];var _pos=undefined;var s=undefined;while(pos < tokensLength) {if(checkDeclDelim(pos))break;s = checkS(pos);_pos = pos + s;if(checkDeclDelim(_pos))break;if(checkBlock(pos)){x.push(getBlock());break;}if(!_checkValue(_pos))break;if(s)x.push(getS());x.push(_getValue());if(checkBlock(_pos))break;}var token=tokens[startPos];return newNode(NodeType.ValueType,x,token.ln,token.col);} /**
	 * @return {Array}
	 */function _getValue(){if(checkVhash(pos))return getVhash();if(checkOperator(pos))return getOperator();if(checkImportant(pos))return getImportant();if(checkGlobal(pos))return getGlobal();if(checkDefault(pos))return getDefault();if(checkProgid(pos))return getProgid();if(checkAny(pos))return getAny();if(checkInterpolation(pos))return getInterpolation();if(checkParentSelector(pos))return getParentSelector();} /**
	 * Check if token is part of a variable
	 * @param {number} i Token's index number
	 * @return {number} Length of the variable
	 */function checkVariable(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.DollarSign)return 0;return (l = checkIdent(i + 1))?l + 1:0;} /**
	 * Get node with a variable
	 * @return {Array} `['variable', ['ident', x]]` where `x` is
	 *      a variable name.
	 */function getVariable(){var startPos=pos;var x=[];pos++;x.push(getIdent());var token=tokens[startPos];return newNode(NodeType.VariableType,x,token.ln,token.col);} /**
	 * Check if token is part of a variables list (e.g. `$values...`).
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkVariablesList(i){var d=0; // Number of dots
	var l=undefined;if(i >= tokensLength)return 0;if(l = checkVariable(i))i += l;else return 0;while(i < tokensLength && tokens[i].type === TokenType.FullStop) {d++;i++;}return d === 3?l + d:0;} /**
	 * Get node with a variables list
	 * @return {Array} `['variableslist', ['variable', ['ident', x]]]` where
	 *      `x` is a variable name.
	 */function getVariablesList(){var startPos=pos;var x=[getVariable()];var token=tokens[startPos];var line=token.ln;var column=token.col;var end=getLastPosition(x,line,column,3);pos += 3;return newNode(NodeType.VariablesListType,x,token.ln,token.col,end);} /**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      some value
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkVhash(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.NumberSign)return 0;return (l = checkNmName2(i + 1))?l + 1:0;} /**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside some value
	 * @return {Array} `['vhash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `'fff'`).
	 */function getVhash(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;x = getNmName2();var end=getLastPosition(x,line,column + 1);return newNode(NodeType.VhashType,x,token.ln,token.col,end);}module.exports = function(_tokens,context){tokens = _tokens;tokensLength = tokens.length;pos = 0;return contexts[context]();};function checkSelectorsGroup(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkSelector(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);var c=checkDelim(i + sb);if(!c)break;var sa=checkSC(i + sb + c);var saa=sa?checkSC(i + sb + c + sa):0;if(l = checkSelector(i + sb + c + sa + saa))i += sb + c + sa + saa + l;else break;}tokens[start].selectorsGroupEnd = i;return i - start;}function getSelectorsGroup(){var selectorsGroup=[];var selectorsGroupEnd=tokens[pos].selectorsGroupEnd;selectorsGroup.push(getSelector());while(pos < selectorsGroupEnd) {selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getDelim());selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getSelector());}return selectorsGroup;}function checkSelector(i){var l;if(l = checkSelector1(i))tokens[i].selectorType = 1;else if(l = checkSelector2(i))tokens[i].selectorType = 2;return l;}function getSelector(){var selectorType=tokens[pos].selectorType;if(selectorType === 1)return getSelector1();else return getSelector2();} /**
	 * Checks for selector which starts with a compound selector.
	 */function checkSelector1(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkCompoundSelector(i))i += l;else return 0;while(i < tokensLength) {var s=checkSC(i);var c=checkCombinator(i + s);if(!s && !c)break;if(c){i += s + c;s = checkSC(i);}if(l = checkCompoundSelector(i + s))i += s + l;else break;}tokens[start].selectorEnd = i;return i - start;}function getSelector1(){var type=NodeType.SelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var selectorEnd=token.selectorEnd;var content=getCompoundSelector();while(pos < selectorEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkCombinator(pos))content.push(getCombinator());else if(checkCompoundSelector(pos))content = content.concat(getCompoundSelector());}return newNode(type,content,line,column);} /**
	 * Checks for a selector that starts with a combinator.
	 */function checkSelector2(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkCombinator(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);if(l = checkCompoundSelector(i + sb))i += sb + l;else break;var sa=checkSC(i);var c=checkCombinator(i + sa);if(!sa && !c)break;if(c){i += sa + c;}}tokens[start].selectorEnd = i;return i - start;}function getSelector2(){var type=NodeType.SelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var selectorEnd=token.selectorEnd;var content=[getCombinator()];while(pos < selectorEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkCombinator(pos))content.push(getCombinator());else if(checkCompoundSelector(pos))content = content.concat(getCompoundSelector());}return newNode(type,content,line,column);}function checkCompoundSelector(i){var l=undefined;if(l = checkCompoundSelector1(i)){tokens[i].compoundSelectorType = 1;}else if(l = checkCompoundSelector2(i)){tokens[i].compoundSelectorType = 2;}return l;}function getCompoundSelector(){var type=tokens[pos].compoundSelectorType;if(type === 1)return getCompoundSelector1();if(type === 2)return getCompoundSelector2();} /**
	 * Check for compound selectors that start with either a type selector,
	 * placeholder or parent selector with extension
	 * (1) `foo.bar`
	 * (2) `foo[attr=val]`
	 * (3) `foo:first-of-type`
	 * (4) `foo%bar`
	 * @param {number} i Token's index
	 * @return {number} Compound selector's length
	 */function checkCompoundSelector1(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkTypeSelector(i) || checkPlaceholder(i) || checkParentSelectorWithExtension(i))i += l;else return 0;while(i < tokensLength) {var _l2=checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i) || checkPlaceholder(i);if(_l2)i += _l2;else break;}tokens[start].compoundSelectorEnd = i;return i - start;} /**
	 * @return {Array} An array of nodes that make up the compound selector
	 */function getCompoundSelector1(){var sequence=[];var compoundSelectorEnd=tokens[pos].compoundSelectorEnd;if(checkTypeSelector(pos))sequence.push(getTypeSelector());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());else if(checkParentSelectorWithExtension(pos))sequence = sequence.concat(getParentSelectorWithExtension());while(pos < compoundSelectorEnd) {if(checkShash(pos))sequence.push(getShash());else if(checkClass(pos))sequence.push(getClass());else if(checkAttributeSelector(pos))sequence.push(getAttributeSelector());else if(checkPseudo(pos))sequence.push(getPseudo());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());else break;}return sequence;} /**
	 * Check for all other compound selectors
	 * (1) `.foo.bar`
	 * (2) `.foo[attr=val]`
	 * (3) `.foo:first-of-type`
	 * (4) `.foo%bar`
	 * (5) `.foo#{$bar}`
	 * @param {number} i Token's index
	 * @return {number} Compound selector's length
	 */function checkCompoundSelector2(i){if(i >= tokensLength)return 0;var start=i;while(i < tokensLength) {var l=checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i) || checkPlaceholder(i) || checkInterpolation(i);if(l)i += l;else break;}tokens[start].compoundSelectorEnd = i;return i - start;} /**
	 * @return {Array} An array of nodes that make up the compound selector
	 */function getCompoundSelector2(){var sequence=[];var compoundSelectorEnd=tokens[pos].compoundSelectorEnd;while(pos < compoundSelectorEnd) {if(checkShash(pos))sequence.push(getShash());else if(checkClass(pos))sequence.push(getClass());else if(checkAttributeSelector(pos))sequence.push(getAttributeSelector());else if(checkPseudo(pos))sequence.push(getPseudo());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());else if(checkInterpolation(pos))sequence.push(getInterpolation());else break;}return sequence;}function checkTypeSelector(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkNamePrefix(i))i += l;if(tokens[i].type === TokenType.Asterisk)i++;else if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getTypeSelector(){var type=NodeType.TypeSelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkNamePrefix(pos))content.push(getNamePrefix());token = tokens[pos];if(token.type === TokenType.Asterisk){var asteriskNode=newNode(NodeType.IdentType,'*',token.ln,token.col);content.push(asteriskNode);pos++;}else if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeSelector(i){var l=undefined;if(l = checkAttributeSelector1(i))tokens[i].attributeSelectorType = 1;else if(l = checkAttributeSelector2(i))tokens[i].attributeSelectorType = 2;return l;}function getAttributeSelector(){var type=tokens[pos].attributeSelectorType;if(type === 1)return getAttributeSelector1();else return getAttributeSelector2();} /**
	 * (1) `[panda=nani]`
	 * (2) `[panda='nani']`
	 * (3) `[panda='nani' i]`
	 *
	 */function checkAttributeSelector1(i){var start=i;if(tokens[i].type === TokenType.LeftSquareBracket)i++;else return 0;var l=undefined;if(l = checkSC(i))i += l;if(l = checkAttributeName(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeMatch(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeValue(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeFlags(i)){i += l;if(l = checkSC(i))i += l;}if(tokens[i].type === TokenType.RightSquareBracket)i++;else return 0;return i - start;}function getAttributeSelector1(){var type=NodeType.AttributeSelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `[`.
	pos++;content = content.concat(getSC());content.push(getAttributeName());content = content.concat(getSC());content.push(getAttributeMatch());content = content.concat(getSC());content.push(getAttributeValue());content = content.concat(getSC());if(checkAttributeFlags(pos)){content.push(getAttributeFlags());content = content.concat(getSC());} // Skip `]`.
	pos++;var end=getLastPosition(content,line,column,1);return newNode(type,content,line,column,end);} /**
	 * (1) `[panda]`
	 */function checkAttributeSelector2(i){var start=i;if(tokens[i].type === TokenType.LeftSquareBracket)i++;else return 0;var l=undefined;if(l = checkSC(i))i += l;if(l = checkAttributeName(i))i += l;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === TokenType.RightSquareBracket)i++;else return 0;return i - start;}function getAttributeSelector2(){var type=NodeType.AttributeSelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `[`.
	pos++;content = content.concat(getSC());content.push(getAttributeName());content = content.concat(getSC()); // Skip `]`.
	pos++;var end=getLastPosition(content,line,column,1);return newNode(type,content,line,column,end);}function checkAttributeName(i){var start=i;var l=undefined;if(l = checkNamePrefix(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getAttributeName(){var type=NodeType.AttributeNameType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkNamePrefix(pos))content.push(getNamePrefix());content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeMatch(i){var l=undefined;if(l = checkAttributeMatch1(i))tokens[i].attributeMatchType = 1;else if(l = checkAttributeMatch2(i))tokens[i].attributeMatchType = 2;return l;}function getAttributeMatch(){var type=tokens[pos].attributeMatchType;if(type === 1)return getAttributeMatch1();else return getAttributeMatch2();}function checkAttributeMatch1(i){var start=i;var type=tokens[i].type;if(type === TokenType.Tilde || type === TokenType.VerticalLine || type === TokenType.CircumflexAccent || type === TokenType.DollarSign || type === TokenType.Asterisk)i++;else return 0;if(tokens[i].type === TokenType.EqualsSign)i++;else return 0;return i - start;}function getAttributeMatch1(){var type=NodeType.AttributeMatchType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=tokens[pos].value + tokens[pos + 1].value;pos += 2;return newNode(type,content,line,column);}function checkAttributeMatch2(i){if(tokens[i].type === TokenType.EqualsSign)return 1;else return 0;}function getAttributeMatch2(){var type=NodeType.AttributeMatchType;var token=tokens[pos];var line=token.ln;var column=token.col;var content='=';pos++;return newNode(type,content,line,column);}function checkAttributeValue(i){return checkString(i) || checkIdentOrInterpolation(i);}function getAttributeValue(){var type=NodeType.AttributeValueType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkString(pos))content.push(getString());else content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeFlags(i){return checkIdentOrInterpolation(i);}function getAttributeFlags(){var type=NodeType.AttributeFlagsType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=getIdentOrInterpolation();return newNode(type,content,line,column);}function checkNamePrefix(i){if(i >= tokensLength)return 0;var l=undefined;if(l = checkNamePrefix1(i))tokens[i].namePrefixType = 1;else if(l = checkNamePrefix2(i))tokens[i].namePrefixType = 2;return l;}function getNamePrefix(){var type=tokens[pos].namePrefixType;if(type === 1)return getNamePrefix1();else return getNamePrefix2();} /**
	 * (1) `panda|`
	 * (2) `panda<comment>|`
	 */function checkNamePrefix1(i){var start=i;var l=undefined;if(l = checkNamespacePrefix(i))i += l;else return 0;if(l = checkCommentML(i))i += l;if(l = checkNamespaceSeparator(i))i += l;else return 0;return i - start;}function getNamePrefix1(){var type=NodeType.NamePrefixType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];content.push(getNamespacePrefix());if(checkCommentML(pos))content.push(getCommentML());content.push(getNamespaceSeparator());return newNode(type,content,line,column);} /**
	 * (1) `|`
	 */function checkNamePrefix2(i){return checkNamespaceSeparator(i);}function getNamePrefix2(){var type=NodeType.NamePrefixType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[getNamespaceSeparator()];return newNode(type,content,line,column);} /**
	 * (1) `*`
	 * (2) `panda`
	 */function checkNamespacePrefix(i){if(i >= tokensLength)return 0;var l=undefined;if(tokens[i].type === TokenType.Asterisk)return 1;else if(l = checkIdentOrInterpolation(i))return l;else return 0;}function getNamespacePrefix(){var type=NodeType.NamespacePrefixType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(token.type === TokenType.Asterisk){var asteriskNode=newNode(NodeType.IdentType,'*',token.ln,token.col);content.push(asteriskNode);pos++;}else if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);} /**
	 * (1) `|`
	 */function checkNamespaceSeparator(i){if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.VerticalLine)return 0; // Return false if `|=` - [attr|=value]
	if(tokens[i + 1] && tokens[i + 1].type === TokenType.EqualsSign)return 0;return 1;}function getNamespaceSeparator(){var type=NodeType.NamespaceSeparatorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content='|';pos++;return newNode(type,content,line,column);}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (css, tabSize) {
	  var TokenType = __webpack_require__(13);

	  var tokens = [];
	  var urlMode = false;
	  var c = undefined; // Current character
	  var cn = undefined; // Next character
	  var pos = 0;
	  var tn = 0;
	  var ln = 1;
	  var col = 1;

	  var Punctuation = {
	    ' ': TokenType.Space,
	    '\n': TokenType.Newline,
	    '\r': TokenType.Newline,
	    '\t': TokenType.Tab,
	    '!': TokenType.ExclamationMark,
	    '"': TokenType.QuotationMark,
	    '#': TokenType.NumberSign,
	    '$': TokenType.DollarSign,
	    '%': TokenType.PercentSign,
	    '&': TokenType.Ampersand,
	    '\'': TokenType.Apostrophe,
	    '(': TokenType.LeftParenthesis,
	    ')': TokenType.RightParenthesis,
	    '*': TokenType.Asterisk,
	    '+': TokenType.PlusSign,
	    ',': TokenType.Comma,
	    '-': TokenType.HyphenMinus,
	    '.': TokenType.FullStop,
	    '/': TokenType.Solidus,
	    ':': TokenType.Colon,
	    ';': TokenType.Semicolon,
	    '<': TokenType.LessThanSign,
	    '=': TokenType.EqualsSign,
	    '==': TokenType.EqualitySign,
	    '!=': TokenType.InequalitySign,
	    '>': TokenType.GreaterThanSign,
	    '?': TokenType.QuestionMark,
	    '@': TokenType.CommercialAt,
	    '[': TokenType.LeftSquareBracket,
	    ']': TokenType.RightSquareBracket,
	    '^': TokenType.CircumflexAccent,
	    '_': TokenType.LowLine,
	    '{': TokenType.LeftCurlyBracket,
	    '|': TokenType.VerticalLine,
	    '}': TokenType.RightCurlyBracket,
	    '~': TokenType.Tilde
	  };

	  /**
	   * Add a token to the token list
	   * @param {string} type
	   * @param {string} value
	   */
	  function pushToken(type, value, column) {
	    tokens.push({
	      tn: tn++,
	      ln: ln,
	      col: column,
	      type: type,
	      value: value
	    });
	  }

	  /**
	   * Check if a character is a decimal digit
	   * @param {string} c Character
	   * @returns {boolean}
	   */
	  function isDecimalDigit(c) {
	    return '0123456789'.indexOf(c) >= 0;
	  }

	  /**
	   * Parse spaces
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseSpaces(css) {
	    var start = pos;

	    // Read the string until we meet a non-space character:
	    for (; pos < css.length; pos++) {
	      if (css.charAt(pos) !== ' ') break;
	    }

	    // Add a substring containing only spaces to tokens:
	    pushToken(TokenType.Space, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse a string within quotes
	   * @param {string} css Unparsed part of CSS string
	   * @param {string} q Quote (either `'` or `"`)
	   */
	  function parseString(css, q) {
	    var start = pos;

	    // Read the string until we meet a matching quote:
	    for (pos++; pos < css.length; pos++) {
	      // Skip escaped quotes:
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) === q) break;
	    }

	    // Add the string (including quotes) to tokens:
	    var type = q === '"' ? TokenType.StringDQ : TokenType.StringSQ;
	    pushToken(type, css.substring(start, pos + 1), col);
	    col += pos - start;
	  }

	  /**
	   * Parse numbers
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseDecimalNumber(css) {
	    var start = pos;

	    // Read the string until we meet a character that's not a digit:
	    for (; pos < css.length; pos++) {
	      if (!isDecimalDigit(css.charAt(pos))) break;
	    }

	    // Add the number to tokens:
	    pushToken(TokenType.DecimalNumber, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse identifier
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseIdentifier(css) {
	    var start = pos;

	    // Skip all opening slashes:
	    while (css.charAt(pos) === '/') pos++;

	    // Read the string until we meet a punctuation mark:
	    for (; pos < css.length; pos++) {
	      // Skip all '\':
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) in Punctuation) break;
	    }

	    var ident = css.substring(start, pos--);

	    // Enter url mode if parsed substring is `url`:
	    if (!urlMode && ident === 'url' && css.charAt(pos + 1) === '(') {
	      urlMode = true;
	    }

	    // Add identifier to tokens:
	    pushToken(TokenType.Identifier, ident, col);
	    col += pos - start;
	  }

	  /**
	   * Parse equality sign
	   */
	  function parseEquality() {
	    pushToken(TokenType.EqualitySign, '==', col);
	    pos++;
	    col++;
	  }

	  /**
	   * Parse inequality sign
	   */
	  function parseInequality() {
	    pushToken(TokenType.InequalitySign, '!=', col);
	    pos++;
	    col++;
	  }

	  /**
	  * Parse a multiline comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseMLComment(css) {
	    var start = pos;
	    var col_ = col;

	    // Get current indent level:
	    var il = 0;
	    for (var _pos = pos - 1; _pos > -1; _pos--) {
	      // TODO: Can be tabs:
	      if (css.charAt(_pos) === ' ') il++;else break;
	    }

	    for (pos += 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '\n') {
	        var _pos = undefined;
	        // Get new line's indent level:
	        var _il = 0;
	        for (_pos = pos + 1; _pos < css.length; _pos++) {
	          if (css.charAt(_pos) === ' ') _il++;else break;
	        }

	        if (_il > il) {
	          col = 0;
	          pos += _pos - pos;
	        } else {
	          pos--;
	          break;
	        }
	      }
	    }

	    // If CRLF is used, we need to adjust pos
	    if (css.charAt(pos) === '\r') pos--;

	    // Add full comment (including `/*`) to the list of tokens:
	    var comment = css.substring(start, pos + 1);
	    pushToken(TokenType.CommentML, comment, col_);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  /**
	  * Parse a single line comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseSLComment(css) {
	    var start = pos;
	    var col_ = col;
	    var _pos;

	    // Check if comment is the only token on the line, and if so,
	    // get current indent level:
	    var il = 0;
	    var onlyToken = false;
	    for (_pos = pos - 1; _pos > -1; _pos--) {
	      // TODO: Can be tabs:
	      if (css.charAt(_pos) === ' ') il++;else if (css.charAt(_pos) === '\n') {
	        onlyToken = true;
	        break;
	      } else break;
	    }
	    if (_pos === -1) onlyToken = true;

	    // Read the string until we meet comment end.
	    // Since we already know first 2 characters (`//`), start reading
	    // from `pos + 2`:
	    if (!onlyToken) {
	      for (pos += 2; pos < css.length; pos++) {
	        if (css.charAt(pos) === '\n' || css.charAt(pos) === '\r') {
	          break;
	        }
	      }
	    } else {
	      for (pos += 2; pos < css.length; pos++) {
	        if (css.charAt(pos) === '\n') {
	          // Get new line's indent level:
	          var _il = 0;
	          for (_pos = pos + 1; _pos < css.length; _pos++) {
	            if (css.charAt(_pos) === ' ') _il++;else break;
	          }

	          if (_il > il) {
	            col = 0;
	            pos += _pos - pos;
	          } else {
	            break;
	          }
	        }
	      }
	    }

	    // If CRLF is used, we need to adjust pos
	    if (css.charAt(pos - 1) === '\r') pos--;

	    // Add comment (including `//` and line break) to the list of tokens:
	    var comment = css.substring(start, pos--);
	    pushToken(TokenType.CommentSL, comment, col_);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  /**
	   * Convert a CSS string to a list of tokens
	   * @param {string} css CSS string
	   * @returns {Array} List of tokens
	   * @private
	   */
	  function getTokens(css) {
	    // Parse string, character by character:
	    for (pos = 0; pos < css.length; col++, pos++) {
	      c = css.charAt(pos);
	      cn = css.charAt(pos + 1);

	      // If we meet `/*`, it's a start of a multiline comment.
	      // Parse following characters as a multiline comment:
	      if (c === '/' && cn === '*') {
	        parseMLComment(css);
	      }

	      // If we meet `//` and it is not a part of url:
	      else if (!urlMode && c === '/' && cn === '/') {
	          // If we're currently inside a block, treat `//` as a start
	          // of identifier. Else treat `//` as a start of a single-line
	          // comment:
	          parseSLComment(css);
	        }

	        // If current character is a double or single quote, it's a start
	        // of a string:
	        else if (c === '"' || c === "'") {
	            parseString(css, c);
	          }

	          // If current character is a space:
	          else if (c === ' ') {
	              parseSpaces(css);
	            }

	            // If current character is `=`, it must be combined with next `=`
	            else if (c === '=' && cn === '=') {
	                parseEquality(css);
	              }

	              // If we meet `!=`, this must be inequality
	              else if (c === '!' && cn === '=') {
	                  parseInequality(css);
	                }

	                // If current character is a punctuation mark:
	                else if (c in Punctuation) {
	                    // Check for CRLF here or just LF
	                    if (c === '\r' && cn === '\n' || c === '\n') {
	                      // If \r we know the next character is \n due to statement above
	                      // so we push a CRLF token type to the token list and importantly
	                      // skip the next character so as not to double count newlines or
	                      // columns etc
	                      if (c === '\r') {
	                        pushToken(TokenType.Newline, '\r\n', col);
	                        pos++; // If CRLF skip the next character and push crlf token
	                      } else if (c === '\n') {
	                          // If just a LF newline and not part of CRLF newline we can just
	                          // push punctuation as usual
	                          pushToken(Punctuation[c], c, col);
	                        }

	                      ln++; // Go to next line
	                      col = 0; // Reset the column count
	                    } else if (c !== '\r' && c !== '\n') {
	                        // Handle all other punctuation and add to list of tokens
	                        pushToken(Punctuation[c], c, col);
	                      } // Go to next line
	                    if (c === ')') urlMode = false; // Exit url mode
	                    else if (c === '\t' && tabSize > 1) col += tabSize - 1;
	                  }

	                  // If current character is a decimal digit:
	                  else if (isDecimalDigit(c)) {
	                      parseDecimalNumber(css);
	                    }

	                    // If current character is anything else:
	                    else {
	                        parseIdentifier(css);
	                      }
	    }

	    return tokens;
	  }

	  return getTokens(css);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
	  mark: __webpack_require__(26),
	  parse: __webpack_require__(27),
	  stringify: __webpack_require__(6),
	  tokenizer: __webpack_require__(28)
	};
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TokenType = __webpack_require__(13);

	module.exports = (function () {
	  /**
	  * Mark whitespaces and comments
	  */
	  function markSC(tokens) {
	    var tokensLength = tokens.length;
	    var ws = -1; // Flag for whitespaces
	    var sc = -1; // Flag for whitespaces and comments
	    var t = undefined; // Current token

	    // For every token in the token list, mark spaces and line breaks
	    // as spaces (set both `ws` and `sc` flags). Mark multiline comments
	    // with `sc` flag.
	    // If there are several spaces or tabs or line breaks or multiline
	    // comments in a row, group them: take the last one's index number
	    // and save it to the first token in the group as a reference:
	    // e.g., `ws_last = 7` for a group of whitespaces or `sc_last = 9`
	    // for a group of whitespaces and comments.
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.Space:
	        case TokenType.Tab:
	        case TokenType.Newline:
	          t.ws = true;
	          t.sc = true;

	          if (ws === -1) ws = i;
	          if (sc === -1) sc = i;

	          break;
	        case TokenType.CommentML:
	        case TokenType.CommentSL:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          t.sc = true;

	          break;
	        default:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          if (sc !== -1) {
	            tokens[sc].sc_last = i - 1;
	            sc = -1;
	          }
	      }
	    }

	    if (ws !== -1) tokens[ws].ws_last = i - 1;
	    if (sc !== -1) tokens[sc].sc_last = i - 1;
	  }

	  /**
	  * Pair brackets
	  */
	  function markBrackets(tokens) {
	    var tokensLength = tokens.length;
	    var ps = []; // Parentheses
	    var sbs = []; // Square brackets
	    var cbs = []; // Curly brackets
	    var t = undefined; // Current token

	    // For every token in the token list, if we meet an opening (left)
	    // bracket, push its index number to a corresponding array.
	    // If we then meet a closing (right) bracket, look at the corresponding
	    // array. If there are any elements (records about previously met
	    // left brackets), take a token of the last left bracket (take
	    // the last index number from the array and find a token with
	    // this index number) and save right bracket's index as a reference:
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.LeftParenthesis:
	          ps.push(i);
	          break;
	        case TokenType.RightParenthesis:
	          if (ps.length) {
	            t.left = ps.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftSquareBracket:
	          sbs.push(i);
	          break;
	        case TokenType.RightSquareBracket:
	          if (sbs.length) {
	            t.left = sbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftCurlyBracket:
	          cbs.push(i);
	          break;
	        case TokenType.RightCurlyBracket:
	          if (cbs.length) {
	            t.left = cbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	      }
	    }
	  }

	  return function (tokens) {
	    markBrackets(tokens);
	    markSC(tokens);
	  };
	})();

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var Node=__webpack_require__(1);var NodeType=__webpack_require__(15);var TokenType=__webpack_require__(13);var tokens=undefined;var tokensLength=undefined;var pos=undefined;var contexts={'arguments':function(){return checkArguments(pos) && getArguments();},'atkeyword':function(){return checkAtkeyword(pos) && getAtkeyword();},'atrule':function(){return checkAtrule(pos) && getAtrule();},'block':function(){return checkBlock(pos) && getBlock();},'brackets':function(){return checkBrackets(pos) && getBrackets();},'class':function(){return checkClass(pos) && getClass();},'combinator':function(){return checkCombinator(pos) && getCombinator();},'commentML':function(){return checkCommentML(pos) && getCommentML();},'commentSL':function(){return checkCommentSL(pos) && getCommentSL();},'condition':function(){return checkCondition(pos) && getCondition();},'conditionalStatement':function(){return checkConditionalStatement(pos) && getConditionalStatement();},'declaration':function(){return checkDeclaration(pos) && getDeclaration();},'declDelim':function(){return checkDeclDelim(pos) && getDeclDelim();},'default':function(){return checkDefault(pos) && getDefault();},'delim':function(){return checkDelim(pos) && getDelim();},'dimension':function(){return checkDimension(pos) && getDimension();},'expression':function(){return checkExpression(pos) && getExpression();},'extend':function(){return checkExtend(pos) && getExtend();},'function':function(){return checkFunction(pos) && getFunction();},'global':function(){return checkGlobal(pos) && getGlobal();},'ident':function(){return checkIdent(pos) && getIdent();},'important':function(){return checkImportant(pos) && getImportant();},'include':function(){return checkInclude(pos) && getInclude();},'interpolation':function(){return checkInterpolation(pos) && getInterpolation();},'loop':function(){return checkLoop(pos) && getLoop();},'mixin':function(){return checkMixin(pos) && getMixin();},'namespace':function(){return checkNamespace(pos) && getNamespace();},'number':function(){return checkNumber(pos) && getNumber();},'operator':function(){return checkOperator(pos) && getOperator();},'optional':function(){return checkOptional(pos) && getOptional();},'parentheses':function(){return checkParentheses(pos) && getParentheses();},'parentselector':function(){return checkParentSelector(pos) && getParentSelector();},'percentage':function(){return checkPercentage(pos) && getPercentage();},'placeholder':function(){return checkPlaceholder(pos) && getPlaceholder();},'progid':function(){return checkProgid(pos) && getProgid();},'property':function(){return checkProperty(pos) && getProperty();},'propertyDelim':function(){return checkPropertyDelim(pos) && getPropertyDelim();},'pseudoc':function(){return checkPseudoc(pos) && getPseudoc();},'pseudoe':function(){return checkPseudoe(pos) && getPseudoe();},'ruleset':function(){return checkRuleset(pos) && getRuleset();},'s':function(){return checkS(pos) && getS();},'selector':function(){return checkSelector(pos) && getSelector();},'shash':function(){return checkShash(pos) && getShash();},'string':function(){return checkString(pos) && getString();},'stylesheet':function(){return checkStylesheet(pos) && getStylesheet();},'unary':function(){return checkUnary(pos) && getUnary();},'unicodeRange':function(){return checkUnicodeRange(pos) && getUnicodeRange();},'urange':function(){return checkUrange(pos) && getUrange();},'uri':function(){return checkUri(pos) && getUri();},'value':function(){return checkValue(pos) && getValue();},'variable':function(){return checkVariable(pos) && getVariable();},'variableslist':function(){return checkVariablesList(pos) && getVariablesList();},'vhash':function(){return checkVhash(pos) && getVhash();}}; /**
	 * Stop parsing and display error
	 * @param {Number=} i Token's index number
	 */function throwError(i){var ln=i?tokens[i].ln:tokens[pos].ln;throw {line:ln,syntax:'scss'};} /**
	 * @param {Object} exclude
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkExcluding(exclude,i){var start=i;while(i < tokensLength) {if(exclude[tokens[i++].type])break;}return i - start - 2;} /**
	 * @param {Number} start
	 * @param {Number} finish
	 * @returns {String}
	 */function joinValues(start,finish){var s='';for(var i=start;i < finish + 1;i++) {s += tokens[i].value;}return s;} /**
	 * @param {Number} start
	 * @param {Number} num
	 * @returns {String}
	 */function joinValues2(start,num){if(start + num - 1 >= tokensLength)return;var s='';for(var i=0;i < num;i++) {s += tokens[start + i].value;}return s;}function getLastPosition(content,line,column,colOffset){return typeof content === 'string'?getLastPositionForString(content,line,column,colOffset):getLastPositionForArray(content,line,column,colOffset);}function getLastPositionForString(content,line,column,colOffset){var position=[];if(!content){position = [line,column];if(colOffset)position[1] += colOffset - 1;return position;}var lastLinebreak=content.lastIndexOf('\n');var endsWithLinebreak=lastLinebreak === content.length - 1;var splitContent=content.split('\n');var linebreaksCount=splitContent.length - 1;var prevLinebreak=linebreaksCount === 0 || linebreaksCount === 1?-1:content.length - splitContent[linebreaksCount - 1].length - 2; // Line:
	var offset=endsWithLinebreak?linebreaksCount - 1:linebreaksCount;position[0] = line + offset; // Column:
	if(endsWithLinebreak){offset = prevLinebreak !== -1?content.length - prevLinebreak:content.length - 1;}else {offset = linebreaksCount !== 0?content.length - lastLinebreak - column - 1:content.length - 1;}position[1] = column + offset;if(!colOffset)return position;if(endsWithLinebreak){position[0]++;position[1] = colOffset;}else {position[1] += colOffset;}return position;}function getLastPositionForArray(content,line,column,colOffset){var position;if(content.length === 0){position = [line,column];}else {var c=content[content.length - 1];if(c.hasOwnProperty('end')){position = [c.end.line,c.end.column];}else {position = getLastPosition(c.content,line,column);}}if(!colOffset)return position;if(tokens[pos - 1].type !== 'Newline'){position[1] += colOffset;}else {position[0]++;position[1] = 1;}return position;}function newNode(type,content,line,column,end){if(!end)end = getLastPosition(content,line,column);return new Node({type:type,content:content,start:{line:line,column:column},end:{line:end[0],column:end[1]},syntax:'scss'});} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAny(i){return checkBrackets(i) || checkParentheses(i) || checkString(i) || checkVariablesList(i) || checkVariable(i) || checkPlaceholder(i) || checkPercentage(i) || checkDimension(i) || checkUnicodeRange(i) || checkNumber(i) || checkUri(i) || checkExpression(i) || checkFunction(i) || checkInterpolation(i) || checkIdent(i) || checkClass(i) || checkUnary(i);} /**
	 * @returns {Array}
	 */function getAny(){if(checkBrackets(pos))return getBrackets();else if(checkParentheses(pos))return getParentheses();else if(checkString(pos))return getString();else if(checkVariablesList(pos))return getVariablesList();else if(checkVariable(pos))return getVariable();else if(checkPlaceholder(pos))return getPlaceholder();else if(checkPercentage(pos))return getPercentage();else if(checkDimension(pos))return getDimension();else if(checkUnicodeRange(pos))return getUnicodeRange();else if(checkNumber(pos))return getNumber();else if(checkUri(pos))return getUri();else if(checkExpression(pos))return getExpression();else if(checkFunction(pos))return getFunction();else if(checkInterpolation(pos))return getInterpolation();else if(checkIdent(pos))return getIdent();else if(checkClass(pos))return getClass();else if(checkUnary(pos))return getUnary();} /**
	 * Check if token is part of mixin's arguments.
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of arguments
	 */function checkArguments(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;i++;while(i < tokens[start].right) {if(l = checkArgument(i))i += l;else return 0;}return tokens[start].right - start + 1;} /**
	 * Check if token is valid to be part of arguments list
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of argument
	 */function checkArgument(i){return checkBrackets(i) || checkParentheses(i) || checkDeclaration(i) || checkFunction(i) || checkVariablesList(i) || checkVariable(i) || checkSC(i) || checkDelim(i) || checkDeclDelim(i) || checkString(i) || checkPercentage(i) || checkDimension(i) || checkNumber(i) || checkUri(i) || checkInterpolation(i) || checkIdent(i) || checkVhash(i) || checkOperator(i) || checkUnary(i) || checkImportant(i) || checkParentSelector(i);} /**
	 * @returns {Array} Node that is part of arguments list
	 */function getArgument(){if(checkBrackets(pos))return getBrackets();else if(checkParentheses(pos))return getParentheses();else if(checkDeclaration(pos))return getDeclaration();else if(checkFunction(pos))return getFunction();else if(checkVariablesList(pos))return getVariablesList();else if(checkVariable(pos))return getVariable();else if(checkSC(pos))return getSC();else if(checkDelim(pos))return getDelim();else if(checkDeclDelim(pos))return getDeclDelim();else if(checkString(pos))return getString();else if(checkPercentage(pos))return getPercentage();else if(checkDimension(pos))return getDimension();else if(checkNumber(pos))return getNumber();else if(checkUri(pos))return getUri();else if(checkInterpolation(pos))return getInterpolation();else if(checkIdent(pos))return getIdent();else if(checkVhash(pos))return getVhash();else if(checkOperator(pos))return getOperator();else if(checkUnary(pos))return getUnary();else if(checkImportant(pos))return getImportant();else if(checkParentSelector(pos))return getParentSelector();} /**
	 * Check if token is part of an @-word (e.g. `@import`, `@include`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAtkeyword(i){var l; // Check that token is `@`:
	if(i >= tokensLength || tokens[i++].type !== TokenType.CommercialAt)return 0;return (l = checkIdentOrInterpolation(i))?l + 1:0;} /**
	 * Get node with @-word
	 * @returns {Array} `['atkeyword', ['ident', x]]` where `x` is
	 *      an identifier without
	 *      `@` (e.g. `import`, `include`)
	 */function getAtkeyword(){var startPos=pos;var x=undefined;pos++;x = getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.AtkeywordType,x,token.ln,token.col);} /**
	 * Check if token is a part of an @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of @-rule
	 */function checkAtrule(i){var l;if(i >= tokensLength)return 0; // If token already has a record of being part of an @-rule,
	// return the @-rule's length:
	if(tokens[i].atrule_l !== undefined)return tokens[i].atrule_l; // If token is part of an @-rule, save the rule's type to token.
	// @keyframes:
	if(l = checkKeyframesRule(i))tokens[i].atrule_type = 4; // @-rule with ruleset:
	else if(l = checkAtruler(i))tokens[i].atrule_type = 1; // Block @-rule:
	else if(l = checkAtruleb(i))tokens[i].atrule_type = 2; // Single-line @-rule:
	else if(l = checkAtrules(i))tokens[i].atrule_type = 3;else return 0; // If token is part of an @-rule, save the rule's length to token:
	tokens[i].atrule_l = l;return l;} /**
	 * Get node with @-rule
	 * @returns {Array}
	 */function getAtrule(){switch(tokens[pos].atrule_type){case 1:return getAtruler(); // @-rule with ruleset
	case 2:return getAtruleb(); // Block @-rule
	case 3:return getAtrules(); // Single-line @-rule
	case 4:return getKeyframesRule();}} /**
	 * Check if token is part of a block @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */function checkAtruleb(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with a block @-rule
	 * @returns {Array} `['atruleb', ['atkeyword', x], y, ['block', z]]`
	 */function getAtruleb(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets()).concat([getBlock()]);var token=tokens[startPos];return newNode(NodeType.AtruleType,x,token.ln,token.col);} /**
	 * Check if token is part of an @-rule with ruleset
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */function checkAtruler(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;if(i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket)i++;else return 0;if(l = checkAtrulers(i))i += l;if(i < tokensLength && tokens[i].type === TokenType.RightCurlyBracket)i++;else return 0;return i - start;} /**
	 * Get node with an @-rule with ruleset
	 * @returns {Array} ['atruler', ['atkeyword', x], y, z]
	 */function getAtruler(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets());x.push(getAtrulers());var token=tokens[startPos];return newNode(NodeType.AtruleType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAtrulers(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;while(l = checkRuleset(i) || checkAtrule(i) || checkSC(i)) {i += l;}if(i < tokensLength)tokens[i].atrulers_end = 1;return i - start;} /**
	 * @returns {Array} `['atrulers', x]`
	 */function getAtrulers(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;x = getSC();while(!tokens[pos].atrulers_end) {if(checkSC(pos))x = x.concat(getSC());else if(checkAtrule(pos))x.push(getAtrule());else if(checkRuleset(pos))x.push(getRuleset());}x = x.concat(getSC());var end=getLastPosition(x,line,column,1);pos++;return newNode(NodeType.BlockType,x,token.ln,token.col,end);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAtrules(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;return i - start;} /**
	 * @returns {Array} `['atrules', ['atkeyword', x], y]`
	 */function getAtrules(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets());var token=tokens[startPos];return newNode(NodeType.AtruleType,x,token.ln,token.col);} /**
	 * Check if token is part of a block (e.g. `{...}`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the block
	 */function checkBlock(i){return i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket?tokens[i].right - i + 1:0;} /**
	 * Get node with a block
	 * @returns {Array} `['block', x]`
	 */function getBlock(){var startPos=pos;var end=tokens[pos].right;var x=[];var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;while(pos < end) {if(checkBlockdecl(pos))x = x.concat(getBlockdecl());else throwError();}var end_=getLastPosition(x,line,column,1);pos = end + 1;return newNode(NodeType.BlockType,x,token.ln,token.col,end_);} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */function checkBlockdecl(i){var l;if(i >= tokensLength)return 0;if(l = checkBlockdecl1(i))tokens[i].bd_type = 1;else if(l = checkBlockdecl2(i))tokens[i].bd_type = 2;else if(l = checkBlockdecl3(i))tokens[i].bd_type = 3;else if(l = checkBlockdecl4(i))tokens[i].bd_type = 4;else return 0;return l;} /**
	 * @returns {Array}
	 */function getBlockdecl(){switch(tokens[pos].bd_type){case 1:return getBlockdecl1();case 2:return getBlockdecl2();case 3:return getBlockdecl3();case 4:return getBlockdecl4();}} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl1(i){var start=i;var l=undefined;if(l = checkSC(i))i += l;if(l = checkConditionalStatement(i))tokens[i].bd_kind = 1;else if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkExtend(i))tokens[i].bd_kind = 4;else if(l = checkLoop(i))tokens[i].bd_kind = 3;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else if(l = checkRuleset(i))tokens[i].bd_kind = 7;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else return 0;i += l;if(i < tokensLength && (l = checkDeclDelim(i)))i += l;else return 0;if(l = checkSC(i))i += l;return i - start;} /**
	 * @returns {Array}
	 */function getBlockdecl1(){var sc=getSC();var x=undefined;switch(tokens[pos].bd_kind){case 1:x = getConditionalStatement();break;case 2:x = getInclude();break;case 3:x = getLoop();break;case 4:x = getExtend();break;case 5:x = getDeclaration();break;case 6:x = getAtrule();break;case 7:x = getRuleset();break;}return sc.concat([x]).concat([getDeclDelim()]).concat(getSC());} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl2(i){var start=i;var l=undefined;if(l = checkSC(i))i += l;if(l = checkConditionalStatement(i))tokens[i].bd_kind = 1;else if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkExtend(i))tokens[i].bd_kind = 4;else if(l = checkMixin(i))tokens[i].bd_kind = 8;else if(l = checkLoop(i))tokens[i].bd_kind = 3;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else if(l = checkRuleset(i))tokens[i].bd_kind = 7;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else return 0;i += l;if(l = checkSC(i))i += l;return i - start;} /**
	 * @returns {Array}
	 */function getBlockdecl2(){var sc=getSC();var x=undefined;switch(tokens[pos].bd_kind){case 1:x = getConditionalStatement();break;case 2:x = getInclude();break;case 3:x = getLoop();break;case 4:x = getExtend();break;case 5:x = getDeclaration();break;case 6:x = getAtrule();break;case 7:x = getRuleset();break;case 8:x = getMixin();break;}return sc.concat([x]).concat(getSC());} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl3(i){var start=i;var l=undefined;if(l = checkSC(i))i += l;if(l = checkDeclDelim(i))i += l;else return 0;if(l = checkSC(i))i += l;return i - start;} /**
	 * @returns {Array} `[s0, ['declDelim'], s1]` where `s0` and `s1` are
	 *      are optional whitespaces.
	 */function getBlockdecl3(){return getSC().concat([getDeclDelim()]).concat(getSC());} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl4(i){return checkSC(i);} /**
	 * @returns {Array}
	 */function getBlockdecl4(){return getSC();} /**
	 * Check if token is part of text inside square brackets, e.g. `[1]`
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBrackets(i){if(i >= tokensLength || tokens[i].type !== TokenType.LeftSquareBracket)return 0;return tokens[i].right - i + 1;} /**
	 * Get node with text inside parentheses or square brackets (e.g. `(1)`)
	 * @return {Node}
	 */function getBrackets(){var startPos=pos;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;var tsets=getTsets();var end=getLastPosition(tsets,line,column,1);pos++;return newNode(NodeType.BracketsType,tsets,token.ln,token.col,end);} /**
	 * Check if token is part of a class selector (e.g. `.abc`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the class selector
	 */function checkClass(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].class_l)return tokens[i].class_l;if(tokens[i++].type !== TokenType.FullStop)return 0; // Check for `-` at beginning.
	if(tokens[i].type === TokenType.HyphenMinus)i += 1;if(l = checkIdentOrInterpolation(i))i += l;else return 0;while(i < tokensLength) {if(l = checkIdentOrInterpolation(i) || checkNumber(i))i += l;else if(tokens[i].type === TokenType.HyphenMinus)i += 1;else break;}tokens[start].classEnd = i;return i - start;} /**
	 * Get node with a class selector
	 * @returns {Array} `['class', ['ident', x]]` where x is a class's
	 *      identifier (without `.`, e.g. `abc`).
	 */function getClass(){var startPos=pos;var type=NodeType.ClassType;var token=tokens[startPos];var line=token.ln;var column=token.col;var content=[];var end=token.classEnd; // Skip `.`
	pos++;while(pos < end) {if(checkIdentOrInterpolation(pos)){content = content.concat(getIdentOrInterpolation());}else if(checkNumber(pos)){content = content.concat(getNumber());}else if(tokens[pos].type === TokenType.HyphenMinus){content.push(newNode(NodeType.IdentType,tokens[pos].value,tokens[pos].ln,tokens[pos].col));pos++;}else break;}return newNode(type,content,line,column);}function checkCombinator(i){if(i >= tokensLength)return 0;var l=undefined;if(l = checkCombinator1(i))tokens[i].combinatorType = 1;else if(l = checkCombinator2(i))tokens[i].combinatorType = 2;else if(l = checkCombinator3(i))tokens[i].combinatorType = 3;return l;}function getCombinator(){var type=tokens[pos].combinatorType;if(type === 1)return getCombinator1();if(type === 2)return getCombinator2();if(type === 3)return getCombinator3();} /**
	 * (1) `||`
	 */function checkCombinator1(i){if(tokens[i].type === TokenType.VerticalLine && tokens[i + 1].type === TokenType.VerticalLine)return 2;else return 0;}function getCombinator1(){var type=NodeType.CombinatorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content='||';pos += 2;return newNode(type,content,line,column);} /**
	 * (1) `>`
	 * (2) `+`
	 * (3) `~`
	 */function checkCombinator2(i){var type=tokens[i].type;if(type === TokenType.PlusSign || type === TokenType.GreaterThanSign || type === TokenType.Tilde)return 1;else return 0;}function getCombinator2(){var type=NodeType.CombinatorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=tokens[pos++].value;return newNode(type,content,line,column);} /**
	 * (1) `/panda/`
	 */function checkCombinator3(i){var start=i;if(tokens[i].type === TokenType.Solidus)i++;else return 0;var l=undefined;if(l = checkIdent(i))i += l;else return 0;if(tokens[i].type === TokenType.Solidus)i++;else return 0;return i - start;}function getCombinator3(){var type=NodeType.CombinatorType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `/`.
	pos++;var ident=getIdent(); // Skip `/`.
	pos++;var content='/' + ident.content + '/';return newNode(type,content,line,column);} /**
	 * Check if token is a multiline comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a multiline comment, otherwise `0`
	 */function checkCommentML(i){return i < tokensLength && tokens[i].type === TokenType.CommentML?1:0;} /**
	 * Get node with a multiline comment
	 * @returns {Array} `['commentML', x]` where `x`
	 *      is the comment's text (without `/*` and `* /`).
	 */function getCommentML(){var startPos=pos;var s=tokens[pos].value.substring(2);var l=s.length;var token=tokens[startPos];var line=token.ln;var column=token.col;if(s.charAt(l - 2) === '*' && s.charAt(l - 1) === '/')s = s.substring(0,l - 2);var end=getLastPosition(s,line,column,2);if(end[0] === line)end[1] += 2;pos++;return newNode(NodeType.CommentMLType,s,token.ln,token.col,end);} /**
	 * Check if token is part of a single-line comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a single-line comment, otherwise `0`
	 */function checkCommentSL(i){return i < tokensLength && tokens[i].type === TokenType.CommentSL?1:0;} /**
	 * Get node with a single-line comment.
	 * @returns {Array} `['commentSL', x]` where `x` is comment's message
	 *      (without `//`)
	 */function getCommentSL(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;x = tokens[pos++].value.substring(2);var end=getLastPosition(x,line,column + 2);return newNode(NodeType.CommentSLType,x,token.ln,token.col,end);} /**
	 * Check if token is part of a condition
	 * (e.g. `@if ...`, `@else if ...` or `@else ...`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the condition
	 */function checkCondition(i){var start=i;var l=undefined;var _i=undefined;var s=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(['if','else'].indexOf(tokens[start + 1].value) < 0)return 0;while(i < tokensLength) {if(l = checkBlock(i))break;s = checkSC(i);_i = i + s;if(l = _checkCondition(_i))i += l + s;else break;}return i - start;}function _checkCondition(i){return checkVariable(i) || checkNumber(i) || checkInterpolation(i) || checkIdent(i) || checkOperator(i) || checkCombinator(i) || checkString(i);} /**
	 * Get node with a condition.
	 * @returns {Array} `['condition', x]`
	 */function getCondition(){var startPos=pos;var x=[];var s;var _pos;x.push(getAtkeyword());while(pos < tokensLength) {if(checkBlock(pos))break;s = checkSC(pos);_pos = pos + s;if(!_checkCondition(_pos))break;if(s)x = x.concat(getSC());x.push(_getCondition());}var token=tokens[startPos];return newNode(NodeType.ConditionType,x,token.ln,token.col);}function _getCondition(){if(checkVariable(pos))return getVariable();if(checkNumber(pos))return getNumber();if(checkInterpolation(pos))return getInterpolation();if(checkIdent(pos))return getIdent();if(checkOperator(pos))return getOperator();if(checkCombinator(pos))return getCombinator();if(checkString(pos))return getString();} /**
	 * Check if token is part of a conditional statement
	 * (e.g. `@if ... {} @else if ... {} @else ... {}`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the condition
	 */function checkConditionalStatement(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkCondition(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with a condition.
	 * @returns {Array} `['condition', x]`
	 */function getConditionalStatement(){var startPos=pos;var x=[];x.push(getCondition());x = x.concat(getSC());x.push(getBlock());var token=tokens[startPos];return newNode(NodeType.ConditionalStatementType,x,token.ln,token.col);} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */function checkDeclaration(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkProperty(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkPropertyDelim(i))i++;else return 0;if(l = checkSC(i))i += l;if(l = checkValue(i))i += l;else return 0;return i - start;} /**
	 * Get node with a declaration
	 * @returns {Array} `['declaration', ['property', x], ['propertyDelim'],
	 *       ['value', y]]`
	 */function getDeclaration(){var startPos=pos;var x=[];x.push(getProperty());x = x.concat(getSC());x.push(getPropertyDelim());x = x.concat(getSC());x.push(getValue());var token=tokens[startPos];return newNode(NodeType.DeclarationType,x,token.ln,token.col);} /**
	 * Check if token is a semicolon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a semicolon, otherwise `0`
	 */function checkDeclDelim(i){return i < tokensLength && tokens[i].type === TokenType.Semicolon?1:0;} /**
	 * Get node with a semicolon
	 * @returns {Array} `['declDelim']`
	 */function getDeclDelim(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.DeclDelimType,';',token.ln,token.col);} /**
	 * Check if token if part of `!default` word.
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the `!default` word
	 */function checkDefault(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'default'){tokens[start].defaultEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with a `!default` word
	 * @returns {Array} `['default', sc]` where `sc` is optional whitespace
	 */function getDefault(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.defaultEnd);pos = token.defaultEnd + 1;return newNode(NodeType.DefaultType,content,line,column);} /**
	 * Check if token is a comma
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a comma, otherwise `0`
	 */function checkDelim(i){return i < tokensLength && tokens[i].type === TokenType.Comma?1:0;} /**
	 * Get node with a comma
	 * @returns {Array} `['delim']`
	 */function getDelim(){var startPos=pos;pos++;var token=tokens[startPos];return newNode(NodeType.DelimType,',',token.ln,token.col);} /**
	 * Check if token is part of a number with dimension unit (e.g. `10px`)
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */function checkDimension(i){var ln=checkNumber(i);var li=undefined;if(i >= tokensLength || !ln || i + ln >= tokensLength)return 0;return (li = checkUnit(i + ln))?ln + li:0;} /**
	 * Get node of a number with dimension unit
	 * @return {Node}
	 */function getDimension(){var type=NodeType.DimensionType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[getNumber(),getUnit()];return newNode(type,content,line,column);} /**
	 * Check if token is unit
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */function checkUnit(i){var units=['em','ex','ch','rem','vh','vw','vmin','vmax','px','mm','q','cm','in','pt','pc','deg','grad','rad','turn','s','ms','Hz','kHz','dpi','dpcm','dppx'];return units.indexOf(tokens[i].value) !== -1?1:0;} /**
	 * Get unit node of type ident
	 * @return {Node} An ident node containing the unit value
	 */function getUnit(){var type=NodeType.IdentType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=token.value;pos++;return newNode(type,content,line,column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkExpression(i){var start=i;if(i >= tokensLength || tokens[i++].value !== 'expression' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;return tokens[i].right - start + 1;} /**
	 * @returns {Array}
	 */function getExpression(){var startPos=pos;var e;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;e = joinValues(pos + 1,tokens[pos].right - 1);var end=getLastPosition(e,line,column,1);if(end[0] === line)end[1] += 11;pos = tokens[pos].right + 1;return newNode(NodeType.ExpressionType,e,token.ln,token.col,end);}function checkExtend(i){var l=0;if(l = checkExtend1(i))tokens[i].extend_child = 1;else if(l = checkExtend2(i))tokens[i].extend_child = 2;return l;}function getExtend(){var type=tokens[pos].extend_child;if(type === 1)return getExtend1();else if(type === 2)return getExtend2();} /**
	 * Checks if token is part of an extend with `!optional` flag.
	 * @param {Number} i
	 */function checkExtend1(i){var start=i;var l;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'extend')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkOptional(i))i += l;else return 0;return i - start;}function getExtend1(){var startPos=pos;var x=[].concat([getAtkeyword()],getSC(),getSelectorsGroup(),getSC(),[getOptional()]);var token=tokens[startPos];return newNode(NodeType.ExtendType,x,token.ln,token.col);} /**
	 * Checks if token is part of an extend without `!optional` flag.
	 * @param {Number} i
	 */function checkExtend2(i){var start=i;var l;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'extend')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;return i - start;}function getExtend2(){var startPos=pos;var x=[].concat([getAtkeyword()],getSC(),getSelectorsGroup());var token=tokens[startPos];return newNode(NodeType.ExtendType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkFunction(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i < tokensLength && tokens[i].type === TokenType.LeftParenthesis?tokens[i].right - start + 1:0;} /**
	 * @returns {Array}
	 */function getFunction(){var startPos=pos;var x=getIdentOrInterpolation();var body=undefined;body = getArguments();x.push(body);var token=tokens[startPos];return newNode(NodeType.FunctionType,x,token.ln,token.col);} /**
	 * @returns {Array}
	 */function getArguments(){var startPos=pos;var x=[];var body=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;while(pos < tokensLength && tokens[pos].type !== TokenType.RightParenthesis) {if(checkDeclaration(pos))x.push(getDeclaration());else if(checkArgument(pos)){body = getArgument();if(typeof body.content === 'string')x.push(body);else x = x.concat(body);}else if(checkClass(pos))x.push(getClass());else throwError();}var end=getLastPosition(x,line,column,1);pos++;return newNode(NodeType.ArgumentsType,x,token.ln,token.col,end);} /**
	 * Check if token is part of an identifier
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the identifier
	 */function checkIdent(i){var start=i;if(i >= tokensLength)return 0; // Check if token is part of a negative number
	if(tokens[i].type === TokenType.HyphenMinus && tokens[i + 1].type === TokenType.DecimalNumber)return 0;if(tokens[i].type === TokenType.HyphenMinus)i++;if(tokens[i].type === TokenType.LowLine || tokens[i].type === TokenType.Identifier)i++;else return 0;for(;i < tokensLength;i++) {if(tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.LowLine && tokens[i].type !== TokenType.Identifier && tokens[i].type !== TokenType.DecimalNumber)break;}tokens[start].ident_last = i - 1;return i - start;} /**
	 * Get node with an identifier
	 * @returns {Array} `['ident', x]` where `x` is identifier's name
	 */function getIdent(){var startPos=pos;var x=joinValues(pos,tokens[pos].ident_last);pos = tokens[pos].ident_last + 1;var token=tokens[startPos];return newNode(NodeType.IdentType,x,token.ln,token.col);} /**
	 * @param {number} i Token's index number
	 * @returns {number} Length of the identifier
	 */function checkPartialIdent(i){var start=i;if(i >= tokensLength)return 0;for(;i < tokensLength;i++) {if(tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.LowLine && tokens[i].type !== TokenType.Identifier && tokens[i].type !== TokenType.DecimalNumber)break;}tokens[start].ident_last = i - 1;return i - start;}function checkIdentOrInterpolation(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkInterpolation(i) || checkIdent(i))i += l;else break;}return i - start;}function getIdentOrInterpolation(){var x=[];while(pos < tokensLength) {if(checkInterpolation(pos))x.push(getInterpolation());else if(checkIdent(pos))x.push(getIdent());else break;}return x;} /**
	 * Check if token is part of `!important` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkImportant(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'important'){tokens[start].importantEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!important` word
	 * @returns {Array} `['important', sc]` where `sc` is optional whitespace
	 */function getImportant(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.importantEnd);pos = token.importantEnd + 1;return newNode(NodeType.ImportantType,content,line,column);} /**
	 * Check if token is part of an included mixin (`@include` or `@extend`
	 *      directive).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the included mixin
	 */function checkInclude(i){var l;if(i >= tokensLength)return 0;if(l = checkInclude1(i))tokens[i].include_type = 1;else if(l = checkInclude2(i))tokens[i].include_type = 2;else if(l = checkInclude3(i))tokens[i].include_type = 3;else if(l = checkInclude4(i))tokens[i].include_type = 4;else if(l = checkInclude5(i))tokens[i].include_type = 5;return l;} /**
	 * Check if token is part of `!global` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkGlobal(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'global'){tokens[start].globalEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!global` word
	 */function getGlobal(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.globalEnd);pos = token.globalEnd + 1;return newNode(NodeType.GlobalType,content,line,column);} /**
	 * Get node with included mixin
	 * @returns {Array} `['include', x]`
	 */function getInclude(){switch(tokens[pos].include_type){case 1:return getInclude1();case 2:return getInclude2();case 3:return getInclude3();case 4:return getInclude4();case 5:return getInclude5();}} /**
	 * Get node with included mixin with keyfames selector like
	 * `@include nani(foo) { 0% {}}`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude1(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkKeyframesBlocks(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin with keyfames selector like
	 * `@include nani(foo) { 0% {}}`
	 * @returns {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc, ['block', q], sc` where `x` is `include` or
	 *      `extend`, `y` is mixin's identifier (selector), `z` are arguments
	 *      passed to the mixin, `q` is block passed to the mixin containing a
	 *      ruleset > selector > keyframesSelector, and `sc` are optional
	 *      whitespaces
	 */function getInclude1(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments(),getSC(),getKeyframesBlocks());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin like `@include nani(foo) {...}`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude2(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `@include nani(foo) {...}`
	 * @returns {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc, ['block', q], sc` where `x` is `include` or
	 *      `extend`, `y` is mixin's identifier (selector), `z` are arguments
	 *      passed to the mixin, `q` is block passed to the mixin and `sc`
	 *      are optional whitespaces
	 */function getInclude2(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin like `@include nani(foo)`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude3(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `@include nani(foo)`
	 * @returns {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc]` where `x` is `include` or `extend`, `y` is
	 *      mixin's identifier (selector), `z` are arguments passed to the
	 *      mixin and `sc` are optional whitespaces
	 */function getInclude3(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin with a content block passed
	 *      as an argument (e.g. `@include nani {...}`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */function checkInclude4(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with an included mixin with a content block passed
	 *      as an argument (e.g. `@include nani {...}`)
	 * @returns {Array} `['include', x]`
	 */function getInclude4(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkInclude5(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * @returns {Array} `['include', x]`
	 */function getInclude5(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an interpolated variable (e.g. `#{$nani}`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkInterpolation(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.NumberSign || !tokens[i + 1] || tokens[i + 1].type !== TokenType.LeftCurlyBracket)return 0;i += 2;while(tokens[i].type !== TokenType.RightCurlyBracket) {if(l = checkArgument(i))i += l;else return 0;}return tokens[i].type === TokenType.RightCurlyBracket?i - start + 1:0;} /**
	 * Get node with an interpolated variable
	 * @returns {Array} `['interpolation', x]`
	 */function getInterpolation(){var startPos=pos;var x=[];var token=tokens[startPos];var line=token.ln;var column=token.col; // Skip `#{`:
	pos += 2;while(pos < tokensLength && tokens[pos].type !== TokenType.RightCurlyBracket) {var body=getArgument();if(typeof body.content === 'string')x.push(body);else x = x.concat(body);}var end=getLastPosition(x,line,column,1); // Skip `}`:
	pos++;return newNode(NodeType.InterpolationType,x,token.ln,token.col,end);} /**
	 * Check a single keyframe block - `5% {}`
	 * @param {Number} i
	 * @returns {Number}
	 */function checkKeyframesBlock(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkKeyframesSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get a single keyframe block - `5% {}`
	 * @returns {Node}
	 */function getKeyframesBlock(){var type=NodeType.RulesetType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[].concat(getKeyframesSelectorsGroup(),getSC(),[getBlock()]);return newNode(type,content,line,column);} /**
	 * Check all keyframe blocks - `5% {} 100% {}`
	 * @param {Number} i
	 * @returns {Number}
	 */function checkKeyframesBlocks(i){var start=i;var l=undefined;if(i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket)i++;else return 0;if(l = checkSC(i))i += l;if(l = checkKeyframesBlock(i))i += l;else return 0;while(tokens[i].type !== TokenType.RightCurlyBracket) {if(l = checkSC(i))i += l;else if(l = checkKeyframesBlock(i))i += l;else break;}if(i < tokensLength && tokens[i].type === TokenType.RightCurlyBracket)i++;else return 0;return i - start;} /**
	 * Get all keyframe blocks - `5% {} 100% {}`
	 * @returns {Node}
	 */function getKeyframesBlocks(){var type=NodeType.BlockType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];var keyframesBlocksEnd=token.right; // Skip `{`.
	pos++;while(pos < keyframesBlocksEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkKeyframesBlock(pos))content.push(getKeyframesBlock());else if(checkAtrule(pos))content.push(getAtrule()); // @content
	else break;}var end=getLastPosition(content,line,column,1); // Skip `}`.
	pos++;return newNode(type,content,line,column,end);} /**
	 * Check if token is part of a @keyframes rule.
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @keyframes rule
	 */function checkKeyframesRule(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;var atruleName=joinValues2(i - l,l);if(atruleName.indexOf('keyframes') === -1)return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkKeyframesBlocks(i))i += l;else return 0;return i - start;} /**
	 * @return {Node}
	 */function getKeyframesRule(){var type=NodeType.AtruleType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[].concat([getAtkeyword()],getSC(),getIdentOrInterpolation(),getSC(),[getKeyframesBlocks()]);return newNode(type,content,line,column);} /**
	 * Check a single keyframe selector - `5%`, `from` etc
	 * @param {Number} i
	 * @returns {Number}
	 */function checkKeyframesSelector(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkIdent(i)){ // Valid selectors are only `from` and `to`.
	var selector=joinValues2(i,l);if(selector !== 'from' && selector !== 'to')return 0;i += l;tokens[start].keyframesSelectorType = 1;}else if(l = checkPercentage(i)){i += l;tokens[start].keyframesSelectorType = 2;}else if(l = checkInterpolation(i)){i += l;tokens[start].keyframesSelectorType = 3;}else {return 0;}return i - start;} /**
	 * Get a single keyframe selector
	 * @returns {Node}
	 */function getKeyframesSelector(){var keyframesSelectorType=NodeType.KeyframesSelectorType;var selectorType=NodeType.SelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(token.keyframesSelectorType === 1){content.push(getIdent());}else if(token.keyframesSelectorType === 2){content.push(getPercentage());}else if(token.keyframesSelectorType === 3){content.push(getInterpolation());}var keyframesSelector=newNode(keyframesSelectorType,content,line,column);return newNode(selectorType,[keyframesSelector],line,column);} /**
	 * Check the keyframe's selector groups
	 * @param {Number} i
	 * @returns {Number}
	 */function checkKeyframesSelectorsGroup(i){var start=i;var l=undefined;if(l = checkKeyframesSelector(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);var c=checkDelim(i + sb);if(!c)break;var sa=checkSC(i + sb + c);if(l = checkKeyframesSelector(i + sb + c + sa))i += sb + c + sa + l;else break;}tokens[start].selectorsGroupEnd = i;return i - start;} /**
	 * Get the keyframe's selector groups
	 * @returns {Array} An array of keyframe selectors
	 */function getKeyframesSelectorsGroup(){var selectorsGroup=[];var selectorsGroupEnd=tokens[pos].selectorsGroupEnd;selectorsGroup.push(getKeyframesSelector());while(pos < selectorsGroupEnd) {selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getDelim());selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getKeyframesSelector());}return selectorsGroup;} /**
	 * Check if token is part of a loop.
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the loop
	 */function checkLoop(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(['for','each','while'].indexOf(tokens[start + 1].value) < 0)return 0;while(i < tokensLength) {if(l = checkBlock(i)){i += l;break;}else if(l = checkVariable(i) || checkNumber(i) || checkInterpolation(i) || checkIdent(i) || checkSC(i) || checkOperator(i) || checkCombinator(i) || checkString(i))i += l;else return 0;}return i - start;} /**
	 * Get node with a loop.
	 * @returns {Array} `['loop', x]`
	 */function getLoop(){var startPos=pos;var x=[];x.push(getAtkeyword());while(pos < tokensLength) {if(checkBlock(pos)){x.push(getBlock());break;}else if(checkVariable(pos))x.push(getVariable());else if(checkNumber(pos))x.push(getNumber());else if(checkInterpolation(pos))x.push(getInterpolation());else if(checkIdent(pos))x.push(getIdent());else if(checkOperator(pos))x.push(getOperator());else if(checkCombinator(pos))x.push(getCombinator());else if(checkSC(pos))x = x.concat(getSC());else if(checkString(pos))x.push(getString());}var token=tokens[startPos];return newNode(NodeType.LoopType,x,token.ln,token.col);} /**
	 * Check if token is part of a mixin
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */function checkMixin(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if((l = checkAtkeyword(i)) && tokens[i + 1].value === 'mixin')i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with a mixin
	 * @returns {Array} `['mixin', x]`
	 */function getMixin(){var startPos=pos;var x=[getAtkeyword()];x = x.concat(getSC());if(checkIdentOrInterpolation(pos))x = x.concat(getIdentOrInterpolation());x = x.concat(getSC());if(checkArguments(pos))x.push(getArguments());x = x.concat(getSC());if(checkBlock(pos))x.push(getBlock());var token=tokens[startPos];return newNode(NodeType.MixinType,x,token.ln,token.col);} /**
	 * Check if token is a namespace sign (`|`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is `|`, `0` if not
	 */function checkNamespace(i){return i < tokensLength && tokens[i].type === TokenType.VerticalLine?1:0;} /**
	 * Get node with a namespace sign
	 * @returns {Array} `['namespace']`
	 */function getNamespace(){var startPos=pos;pos++;var token=tokens[startPos];return newNode(NodeType.NamespaceType,'|',token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkNmName2(i){if(tokens[i].type === TokenType.Identifier)return 1;else if(tokens[i].type !== TokenType.DecimalNumber)return 0;i++;return i < tokensLength && tokens[i].type === TokenType.Identifier?2:1;} /**
	 * @returns {String}
	 */function getNmName2(){var s=tokens[pos].value;if(tokens[pos++].type === TokenType.DecimalNumber && pos < tokensLength && tokens[pos].type === TokenType.Identifier)s += tokens[pos++].value;return s;} /**
	 * Check if token is part of a number
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of number
	 */function checkNumber(i){if(i >= tokensLength)return 0;if(tokens[i].number_l)return tokens[i].number_l; // `10`:
	if(i < tokensLength && tokens[i].type === TokenType.DecimalNumber && (!tokens[i + 1] || tokens[i + 1] && tokens[i + 1].type !== TokenType.FullStop)){tokens[i].number_l = 1;return 1;} // `10.`:
	if(i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && (!tokens[i + 2] || tokens[i + 2].type !== TokenType.DecimalNumber)){tokens[i].number_l = 2;return 2;} // `.10`:
	if(i < tokensLength && tokens[i].type === TokenType.FullStop && tokens[i + 1].type === TokenType.DecimalNumber){tokens[i].number_l = 2;return 2;} // `10.10`:
	if(i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && tokens[i + 2] && tokens[i + 2].type === TokenType.DecimalNumber){tokens[i].number_l = 3;return 3;}return 0;} /**
	 * Get node with number
	 * @returns {Array} `['number', x]` where `x` is a number converted
	 *      to string.
	 */function getNumber(){var s='';var startPos=pos;var l=tokens[pos].number_l;for(var j=0;j < l;j++) {s += tokens[pos + j].value;}pos += l;var token=tokens[startPos];return newNode(NodeType.NumberType,s,token.ln,token.col);} /**
	 * Check if token is an operator (`/`, `%`, `,`, `:` or `=`).
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an operator, otherwise `0`
	 */function checkOperator(i){if(i >= tokensLength)return 0;switch(tokens[i].type){case TokenType.Solidus:case TokenType.PercentSign:case TokenType.Comma:case TokenType.Colon:case TokenType.EqualsSign:case TokenType.EqualitySign:case TokenType.InequalitySign:case TokenType.LessThanSign:case TokenType.GreaterThanSign:case TokenType.Asterisk:return 1;}return 0;} /**
	 * Get node with an operator
	 * @returns {Array} `['operator', x]` where `x` is an operator converted
	 *      to string.
	 */function getOperator(){var startPos=pos;var x=tokens[pos++].value;var token=tokens[startPos];return newNode(NodeType.OperatorType,x,token.ln,token.col);} /**
	 * Check if token is part of `!optional` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkOptional(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'optional'){tokens[start].optionalEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!optional` word
	 */function getOptional(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.optionalEnd);pos = token.optionalEnd + 1;return newNode(NodeType.OptionalType,content,line,column);} /**
	 * Check if token is part of text inside parentheses, e.g. `(1)`
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */function checkParentheses(i){if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;return tokens[i].right - i + 1;} /**
	 * Get node with text inside parentheses, e.g. `(1)`
	 * @return {Node}
	 */function getParentheses(){var type=NodeType.ParenthesesType;var token=tokens[pos];var line=token.ln;var column=token.col;pos++;var tsets=getTsets();var end=getLastPosition(tsets,line,column,1);pos++;return newNode(type,tsets,line,column,end);} /**
	 * Check if token is a parent selector, e.g. `&`
	 * @param {number} i Token's index number
	 * @return {number}
	 */function checkParentSelector(i){return i < tokensLength && tokens[i].type === TokenType.Ampersand?1:0;} /**
	 * Get node with a parent selector
	 * @return {Node}
	 */function getParentSelector(){var startPos=pos;var token=tokens[startPos];pos++;return newNode(NodeType.ParentSelectorType,'&',token.ln,token.col);} /**
	 * Check if token is a parent selector extension, e.g. `&--foo-bar`
	 * @param {number} i Token's index number
	 * @returns {number} Length of the parent selector extension
	 */function checkParentSelectorExtension(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;while(i < tokensLength) {if(l = checkNumber(i) || checkPartialIdent(i) || checkIdentOrInterpolation(i))i += l;else break;}return i - start;} /**
	 * Get parent selector extension node
	 * @return {Node}
	 */function getParentSelectorExtension(){var type=NodeType.ParentSelectorExtensionType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];while(pos < tokensLength) {if(checkNumber(pos)){content.push(getNumber());}else if(checkPartialIdent(pos)){content.push(getIdent());}else if(checkIdentOrInterpolation(pos)){content = content.concat(getIdentOrInterpolation());}else break;}return newNode(type,content,line,column);} /**
	 * Check if token is a parent selector with an extension or not
	 * @param {number} i Token's index number
	 * @return {number} Length of the parent selector and extension if applicable
	 */function checkParentSelectorWithExtension(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkParentSelector(i))i += l;else return 0;if(l = checkParentSelectorExtension(i))i += l;return i - start;} /**
	 * Get parent selector node and extension node if applicable
	 * @return {Array}
	 */function getParentSelectorWithExtension(){var content=[getParentSelector()];if(checkParentSelectorExtension(pos))content.push(getParentSelectorExtension());return content;} /**
	 * Check if token is part of a number or an interpolation with a percent sign
	 * (e.g. `10%`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPercentage(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkNumberOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.PercentSign)return 0;return i - start + 1;} /**
	 * Get a percentage node that contains either a number or an interpolation
	 * @returns {Object} The percentage node
	 */function getPercentage(){var startPos=pos;var token=tokens[startPos];var line=token.ln;var column=token.col;var content=getNumberOrInterpolation();var end=getLastPosition(content,line,column,1); // Skip %
	pos++;return newNode(NodeType.PercentageType,content,token.ln,token.col,end);} /**
	 * Check if token is a number or an interpolation
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkNumberOrInterpolation(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkInterpolation(i) || checkNumber(i))i += l;else break;}return i - start;} /**
	 * Get a number and/or interpolation node
	 * @returns {Array} An array containing a single or multiple nodes
	 */function getNumberOrInterpolation(){var content=[];while(pos < tokensLength) {if(checkInterpolation(pos))content.push(getInterpolation());else if(checkNumber(pos))content.push(getNumber());else break;}return content;} /**
	 * Check if token is part of a placeholder selector (e.g. `%abc`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the selector
	 */function checkPlaceholder(i){var l;if(i >= tokensLength)return 0;if(tokens[i].placeholder_l)return tokens[i].placeholder_l;if(tokens[i].type !== TokenType.PercentSign)return 0;if(l = checkIdentOrInterpolation(i + 1)){tokens[i].placeholder_l = l + 1;return l + 1;}else return 0;} /**
	 * Get node with a placeholder selector
	 * @returns {Array} `['placeholder', ['ident', x]]` where x is a placeholder's
	 *      identifier (without `%`, e.g. `abc`).
	 */function getPlaceholder(){var startPos=pos;pos++;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.PlaceholderType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkProgid(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(joinValues2(i,6) === 'progid:DXImageTransform.Microsoft.')i += 6;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === TokenType.LeftParenthesis){tokens[start].progid_end = tokens[i].right;i = tokens[i].right + 1;}else return 0;return i - start;} /**
	 * @returns {Array}
	 */function getProgid(){var startPos=pos;var progid_end=tokens[pos].progid_end;var x=joinValues(pos,progid_end);pos = progid_end + 1;var token=tokens[startPos];return newNode(NodeType.ProgidType,x,token.ln,token.col);} /**
	 * Check if token is part of a property
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the property
	 */function checkProperty(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkVariable(i) || checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * Get node with a property
	 * @returns {Array} `['property', x]`
	 */function getProperty(){var startPos=pos;var x=[];if(checkVariable(pos)){x.push(getVariable());}else {x = x.concat(getIdentOrInterpolation());}var token=tokens[startPos];return newNode(NodeType.PropertyType,x,token.ln,token.col);} /**
	 * Check if token is a colon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a colon, otherwise `0`
	 */function checkPropertyDelim(i){return i < tokensLength && tokens[i].type === TokenType.Colon?1:0;} /**
	 * Get node with a colon
	 * @returns {Array} `['propertyDelim']`
	 */function getPropertyDelim(){var startPos=pos;pos++;var token=tokens[startPos];return newNode(NodeType.PropertyDelimType,':',token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPseudo(i){return checkPseudoe(i) || checkPseudoc(i);} /**
	 * @returns {Array}
	 */function getPseudo(){if(checkPseudoe(pos))return getPseudoe();if(checkPseudoc(pos))return getPseudoc();} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPseudoe(i){var l;if(i >= tokensLength || tokens[i++].type !== TokenType.Colon || i >= tokensLength || tokens[i++].type !== TokenType.Colon)return 0;return (l = checkIdentOrInterpolation(i))?l + 2:0;} /**
	 * @returns {Array}
	 */function getPseudoe(){var startPos=pos;pos += 2;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.PseudoeType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPseudoc(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.Colon)return 0;if(l = checkPseudoClass3(i))tokens[i].pseudoClassType = 3;else if(l = checkPseudoClass4(i))tokens[i].pseudoClassType = 4;else if(l = checkPseudoClass5(i))tokens[i].pseudoClassType = 5;else if(l = checkPseudoClass1(i))tokens[i].pseudoClassType = 1;else if(l = checkPseudoClass2(i))tokens[i].pseudoClassType = 2;else if(l = checkPseudoClass6(i))tokens[i].pseudoClassType = 6;else return 0;return l;} /**
	 * @returns {Array}
	 */function getPseudoc(){var childType=tokens[pos].pseudoClassType;if(childType === 1)return getPseudoClass1();if(childType === 2)return getPseudoClass2();if(childType === 3)return getPseudoClass3();if(childType === 4)return getPseudoClass4();if(childType === 5)return getPseudoClass5();if(childType === 6)return getPseudoClass6();} /**
	 * (-) `:not(panda)`
	 */function checkPseudoClass1(i){var start=i; // Skip `:`.
	i++;if(i >= tokensLength)return 0;var l=undefined;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSelectorsGroup(i))i += l;else return 0;if(i !== right)return 0;return right - start + 1;} /**
	 * (-) `:not(panda)`
	 */function getPseudoClass1(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `:`.
	pos++;content = content.concat(getIdentOrInterpolation());{var _type=NodeType.ArgumentsType;var _token=tokens[pos];var _line=_token.ln;var _column=_token.col; // Skip `(`.
	pos++;var selectors=getSelectorsGroup();var end=getLastPosition(selectors,_line,_column,1);var args=newNode(_type,selectors,_line,_column,end);content.push(args); // Skip `)`.
	pos++;}return newNode(type,content,line,column);} /**
	 * (1) `:nth-child(odd)`
	 * (2) `:nth-child(even)`
	 * (3) `:lang(de-DE)`
	 */function checkPseudoClass2(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass2(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `:`.
	pos++;content = content.concat(getIdentOrInterpolation());var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;value = value.concat(getSC()).concat(getIdentOrInterpolation()).concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(-3n + 2)`
	 */function checkPseudoClass3(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(l = checkNumberOrInterpolation(i))i += l;if(i >= tokensLength)return 0;if(tokens[i].value === 'n')i++;else return 0;if(l = checkSC(i))i += l;if(i >= tokensLength)return 0;if(tokens[i].type === TokenType.PlusSign || tokens[i].type === TokenType.HyphenMinus)i++;else return 0;if(l = checkSC(i))i += l;if(l = checkNumberOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass3(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkNumberOrInterpolation(pos))value = value.concat(getNumberOrInterpolation());{var _l=tokens[pos].ln;var _c=tokens[pos].col;var _content=tokens[pos].value;var ident=newNode(NodeType.IdentType,_content,_l,_c);value.push(ident);pos++;}value = value.concat(getSC());if(checkUnary(pos))value.push(getUnary());value = value.concat(getSC());if(checkNumberOrInterpolation(pos))value = value.concat(getNumberOrInterpolation());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(-3n)`
	 */function checkPseudoClass4(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l; // Check for leading unary `-`
	if(l = checkUnary(i))i += l; // Check for interpolation `#{i}`
	if(l = checkInterpolation(i))i += l;if(tokens[i].type === TokenType.DecimalNumber)i++;if(tokens[i].value === 'n')i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass4(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;value = value.concat(getSC());if(checkUnary(pos))value.push(getUnary());if(checkInterpolation(pos))value.push(getInterpolation());if(checkNumber(pos))value.push(getNumber());if(checkIdent(pos))value.push(getIdent());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(+8)`
	 */function checkPseudoClass5(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(tokens[i].type === TokenType.DecimalNumber)i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass5(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkNumber(pos))value.push(getNumber());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:checked`
	 */function checkPseudoClass6(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getPseudoClass6(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();return newNode(type,content,line,column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkRuleset(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;}function getRuleset(){var type=NodeType.RulesetType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];content = content.concat(getSelectorsGroup());content = content.concat(getSC());content.push(getBlock());return newNode(type,content,line,column);} /**
	 * Check if token is marked as a space (if it's a space or a tab
	 *      or a line break).
	 * @param {Number} i
	 * @returns {Number} Number of spaces in a row starting with the given token.
	 */function checkS(i){return i < tokensLength && tokens[i].ws?tokens[i].ws_last - i + 1:0;} /**
	 * Get node with spaces
	 * @returns {Array} `['s', x]` where `x` is a string containing spaces
	 */function getS(){var startPos=pos;var x=joinValues(pos,tokens[pos].ws_last);pos = tokens[pos].ws_last + 1;var token=tokens[startPos];return newNode(NodeType.SType,x,token.ln,token.col);} /**
	 * Check if token is a space or a comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} Number of similar (space or comment) tokens
	 *      in a row starting with the given token.
	 */function checkSC(i){if(i >= tokensLength)return 0;var l=undefined;var lsc=0;while(i < tokensLength) {if(!(l = checkS(i)) && !(l = checkCommentML(i)) && !(l = checkCommentSL(i)))break;i += l;lsc += l;}return lsc || 0;} /**
	 * Get node with spaces and comments
	 * @returns {Array} Array containing nodes with spaces (if there are any)
	 *      and nodes with comments (if there are any):
	 *      `[['s', x]*, ['comment', y]*]` where `x` is a string of spaces
	 *      and `y` is a comment's text (without `/*` and `* /`).
	 */function getSC(){var sc=[];if(pos >= tokensLength)return sc;while(pos < tokensLength) {if(checkS(pos))sc.push(getS());else if(checkCommentML(pos))sc.push(getCommentML());else if(checkCommentSL(pos))sc.push(getCommentSL());else break;}return sc;} /**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      a simple selector
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkShash(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.NumberSign)return 0;return (l = checkIdentOrInterpolation(i + 1))?l + 1:0;} /**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside a simple
	 *      selector
	 * @returns {Array} `['shash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `fff`)
	 */function getShash(){var startPos=pos;var token=tokens[startPos];pos++;var x=getIdentOrInterpolation();return newNode(NodeType.ShashType,x,token.ln,token.col);} /**
	 * Check if token is part of a string (text wrapped in quotes)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is part of a string, `0` if not
	 */function checkString(i){if(i >= tokensLength)return 0;if(tokens[i].type === TokenType.StringSQ || tokens[i].type === TokenType.StringDQ){return 1;}return 0;} /**
	 * Get string's node
	 * @returns {Array} `['string', x]` where `x` is a string (including
	 *      quotes).
	 */function getString(){var startPos=pos;var x=tokens[pos++].value;var token=tokens[startPos];return newNode(NodeType.StringType,x,token.ln,token.col);} /**
	 * Validate stylesheet: it should consist of any number (0 or more) of
	 * rulesets (sets of rules with selectors), @-rules, whitespaces or
	 * comments.
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkStylesheet(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkSC(i) || checkDeclaration(i) || checkDeclDelim(i) || checkInclude(i) || checkExtend(i) || checkMixin(i) || checkLoop(i) || checkConditionalStatement(i) || checkAtrule(i) || checkRuleset(i))i += l;else throwError(i);}return i - start;} /**
	 * @returns {Array} `['stylesheet', x]` where `x` is all stylesheet's
	 *      nodes.
	 */function getStylesheet(){var startPos=pos;var x=[];while(pos < tokensLength) {if(checkSC(pos))x = x.concat(getSC());else if(checkRuleset(pos))x.push(getRuleset());else if(checkInclude(pos))x.push(getInclude());else if(checkExtend(pos))x.push(getExtend());else if(checkMixin(pos))x.push(getMixin());else if(checkLoop(pos))x.push(getLoop());else if(checkConditionalStatement(pos))x.push(getConditionalStatement());else if(checkAtrule(pos))x.push(getAtrule());else if(checkDeclaration(pos))x.push(getDeclaration());else if(checkDeclDelim(pos))x.push(getDeclDelim());else throwError();}var token=tokens[startPos];return newNode(NodeType.StylesheetType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkTset(i){return checkVhash(i) || checkOperator(i) || checkAny(i) || checkSC(i) || checkInterpolation(i);} /**
	 * @returns {Array}
	 */function getTset(){if(checkVhash(pos))return getVhash();else if(checkOperator(pos))return getOperator();else if(checkAny(pos))return getAny();else if(checkSC(pos))return getSC();else if(checkInterpolation(pos))return getInterpolation();} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkTsets(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;while(l = checkTset(i)) {i += l;}return i - start;} /**
	 * @returns {Array}
	 */function getTsets(){var x=[];var t=undefined;while(t = getTset()) {if(typeof t.content === 'string')x.push(t);else x = x.concat(t);}return x;} /**
	 * Check if token is an unary (arithmetical) sign (`+` or `-`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an unary sign, `0` if not
	 */function checkUnary(i){if(i >= tokensLength){return 0;}if(tokens[i].type === TokenType.HyphenMinus || tokens[i].type === TokenType.PlusSign){return 1;}return 0;} /**
	 * Get node with an unary (arithmetical) sign (`+` or `-`)
	 * @returns {Array} `['unary', x]` where `x` is an unary sign
	 *      converted to string.
	 */function getUnary(){var startPos=pos;var x=tokens[pos++].value;var token=tokens[startPos];return newNode(NodeType.OperatorType,x,token.ln,token.col);} /**
	 * Check if token is a unicode range (single or multiple <urange> nodes)
	 * @param {number} i Token's index
	 * @return {number} Unicode range node's length
	 */function checkUnicodeRange(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkUrange(i))i += l;else return 0;while(i < tokensLength) {var spaceBefore=checkSC(i);var comma=checkDelim(i + spaceBefore);if(!comma)break;var spaceAfter=checkSC(i + spaceBefore + comma);if(l = checkUrange(i + spaceBefore + comma + spaceAfter)){i += spaceBefore + comma + spaceAfter + l;}else break;}return i - start;} /**
	 * Get a unicode range node
	 * @return {Node}
	 */function getUnicodeRange(){var type=NodeType.UnicodeRangeType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];while(pos < tokensLength) {if(checkSC(pos))content = content.concat(getSC());else if(checkDelim(pos))content.push(getDelim());else if(checkUrange(pos))content.push(getUrange());else break;}return newNode(type,content,line,column);} /**
	 * Check if token is a u-range (part of a unicode-range)
	 * (1) `U+416`
	 * (2) `U+400-4ff`
	 * (3) `U+4??`
	 * @param {number} i Token's index
	 * @return {number} Urange node's length
	 */function checkUrange(i){var start=i;var l=undefined;if(i >= tokensLength)return 0; // Check for unicode prefix (u+ or U+)
	if(tokens[i].value === 'U' || tokens[i].value === 'u')i += 1;else return 0;if(i >= tokensLength)return 0;if(tokens[i].value === '+')i += 1;else return 0;while(i < tokensLength) {if(l = checkIdent(i))i += l;else if(l = checkNumber(i))i += l;else if(l = checkUnary(i))i += l;else if(l = _checkUnicodeWildcard(i))i += l;else break;}tokens[start].urangeEnd = i - 1;return i - start;} /**
	 * Get a u-range node (part of a unicode-range)
	 * @return {Node}
	 */function getUrange(){var startPos=pos;var type=NodeType.UrangeType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];content = joinValues(startPos,tokens[startPos].urangeEnd);pos = tokens[startPos].urangeEnd + 1;return newNode(type,content,line,column);} /**
	 * Check for unicode wildcard characters `?`
	 * @param {number} i Token's index
	 * @return {number} Wildcard length
	 */function _checkUnicodeWildcard(i){var start=i;if(i >= tokensLength)return 0;while(i < tokensLength) {if(tokens[i].type === TokenType.QuestionMark)i += 1;else break;}return i - start;} /**
	 * Check if token is part of URI (e.g. `url('/css/styles.css')`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of URI
	 */function checkUri(i){var start=i;if(i >= tokensLength || tokens[i++].value !== 'url' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;return tokens[i].right - start + 1;} /**
	 * Get node with URI
	 * @returns {Array} `['uri', x]` where `x` is URI's nodes (without `url`
	 *      and braces, e.g. `['string', ''/css/styles.css'']`).
	 */function getUri(){var startPos=pos;var uriExcluding={};var uri=undefined;var token=undefined;var l=undefined;var raw=undefined;pos += 2;uriExcluding[TokenType.Space] = 1;uriExcluding[TokenType.Tab] = 1;uriExcluding[TokenType.Newline] = 1;uriExcluding[TokenType.LeftParenthesis] = 1;uriExcluding[TokenType.RightParenthesis] = 1;if(checkUriContent(pos)){uri = [].concat(getSC()).concat(getUriContent()).concat(getSC());}else {uri = [].concat(getSC());l = checkExcluding(uriExcluding,pos);token = tokens[pos];raw = newNode(NodeType.RawType,joinValues(pos,pos + l),token.ln,token.col);uri.push(raw);pos += l + 1;uri = uri.concat(getSC());}token = tokens[startPos];var line=token.ln;var column=token.col;var end=getLastPosition(uri,line,column,1);pos++;return newNode(NodeType.UriType,uri,token.ln,token.col,end);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkUriContent(i){return checkUri1(i) || checkFunction(i);} /**
	 * @returns {Array}
	 */function getUriContent(){if(checkUri1(pos))return getString();else if(checkFunction(pos))return getFunction();} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkUri1(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkSC(i))i += l;if(tokens[i].type !== TokenType.StringDQ && tokens[i].type !== TokenType.StringSQ)return 0;i++;if(l = checkSC(i))i += l;return i - start;} /**
	 * Check if token is part of a value
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the value
	 */function checkValue(i){var start=i;var l=undefined;var s=undefined;var _i=undefined;while(i < tokensLength) {if(checkDeclDelim(i))break;s = checkSC(i);_i = i + s;if(l = _checkValue(_i))i += l + s;if(!l || checkBlock(i - l))break;}return i - start;} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function _checkValue(i){return checkInterpolation(i) || checkVariable(i) || checkVhash(i) || checkBlock(i) || checkAtkeyword(i) || checkOperator(i) || checkImportant(i) || checkGlobal(i) || checkDefault(i) || checkProgid(i) || checkAny(i) || checkParentSelector(i);} /**
	 * @returns {Array}
	 */function getValue(){var startPos=pos;var x=[];var _pos=undefined;var s=undefined;while(pos < tokensLength) {s = checkSC(pos);_pos = pos + s;if(checkDeclDelim(_pos))break;if(!_checkValue(_pos))break;if(s)x = x.concat(getSC());x.push(_getValue());if(checkBlock(_pos))break;}var token=tokens[startPos];return newNode(NodeType.ValueType,x,token.ln,token.col);} /**
	 * @returns {Array}
	 */function _getValue(){if(checkInterpolation(pos))return getInterpolation();else if(checkVariable(pos))return getVariable();else if(checkVhash(pos))return getVhash();else if(checkBlock(pos))return getBlock();else if(checkAtkeyword(pos))return getAtkeyword();else if(checkOperator(pos))return getOperator();else if(checkImportant(pos))return getImportant();else if(checkGlobal(pos))return getGlobal();else if(checkDefault(pos))return getDefault();else if(checkProgid(pos))return getProgid();else if(checkAny(pos))return getAny();else if(checkParentSelector(pos))return getParentSelector();} /**
	 * Check if token is part of a variable
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the variable
	 */function checkVariable(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.DollarSign)return 0;return (l = checkIdent(i + 1))?l + 1:0;} /**
	 * Get node with a variable
	 * @returns {Array} `['variable', ['ident', x]]` where `x` is
	 *      a variable name.
	 */function getVariable(){var startPos=pos;var x=[];pos++;x.push(getIdent());var token=tokens[startPos];return newNode(NodeType.VariableType,x,token.ln,token.col);} /**
	 * Check if token is part of a variables list (e.g. `$values...`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkVariablesList(i){var d=0; // Number of dots
	var l=undefined;if(i >= tokensLength)return 0;if(l = checkVariable(i))i += l;else return 0;while(i < tokensLength && tokens[i].type === TokenType.FullStop) {d++;i++;}return d === 3?l + d:0;} /**
	 * Get node with a variables list
	 * @returns {Array} `['variableslist', ['variable', ['ident', x]]]` where
	 *      `x` is a variable name.
	 */function getVariablesList(){var startPos=pos;var x=getVariable();var token=tokens[startPos];var line=token.ln;var column=token.col;var end=getLastPosition([x],line,column,3);pos += 3;return newNode(NodeType.VariablesListType,[x],token.ln,token.col,end);} /**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      some value
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkVhash(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.NumberSign)return 0;return (l = checkNmName2(i + 1))?l + 1:0;} /**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside some value
	 * @returns {Array} `['vhash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `'fff'`).
	 */function getVhash(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;x = getNmName2();var end=getLastPosition(x,line,column + 1);return newNode(NodeType.VhashType,x,token.ln,token.col,end);}module.exports = function(_tokens,context){tokens = _tokens;tokensLength = tokens.length;pos = 0;return contexts[context]();};function checkSelectorsGroup(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkSelector(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);var c=checkDelim(i + sb);if(!c)break;var sa=checkSC(i + sb + c);if(l = checkSelector(i + sb + c + sa))i += sb + c + sa + l;else break;}tokens[start].selectorsGroupEnd = i;return i - start;}function getSelectorsGroup(){var selectorsGroup=[];var selectorsGroupEnd=tokens[pos].selectorsGroupEnd;selectorsGroup.push(getSelector());while(pos < selectorsGroupEnd) {selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getDelim());selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getSelector());}return selectorsGroup;}function checkSelector(i){var l;if(l = checkSelector1(i))tokens[i].selectorType = 1;else if(l = checkSelector2(i))tokens[i].selectorType = 2;return l;}function getSelector(){var selectorType=tokens[pos].selectorType;if(selectorType === 1)return getSelector1();else return getSelector2();} /**
	 * Checks for selector which starts with a compound selector.
	 */function checkSelector1(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkCompoundSelector(i))i += l;else return 0;while(i < tokensLength) {var s=checkSC(i);var c=checkCombinator(i + s);if(!s && !c)break;if(c){i += s + c;s = checkSC(i);}if(l = checkCompoundSelector(i + s))i += s + l;else break;}tokens[start].selectorEnd = i;return i - start;}function getSelector1(){var type=NodeType.SelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var selectorEnd=token.selectorEnd;var content=getCompoundSelector();while(pos < selectorEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkCombinator(pos))content.push(getCombinator());else if(checkCompoundSelector(pos))content = content.concat(getCompoundSelector());}return newNode(type,content,line,column);} /**
	 * Checks for a selector that starts with a combinator.
	 */function checkSelector2(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkCombinator(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);if(l = checkCompoundSelector(i + sb))i += sb + l;else break;var sa=checkSC(i);var c=checkCombinator(i + sa);if(!sa && !c)break;if(c){i += sa + c;}}tokens[start].selectorEnd = i;return i - start;}function getSelector2(){var type=NodeType.SelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var selectorEnd=token.selectorEnd;var content=[getCombinator()];while(pos < selectorEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkCombinator(pos))content.push(getCombinator());else if(checkCompoundSelector(pos))content = content.concat(getCompoundSelector());}return newNode(type,content,line,column);}function checkCompoundSelector(i){var l=undefined;if(l = checkCompoundSelector1(i)){tokens[i].compoundSelectorType = 1;}else if(l = checkCompoundSelector2(i)){tokens[i].compoundSelectorType = 2;}return l;}function getCompoundSelector(){var type=tokens[pos].compoundSelectorType;if(type === 1)return getCompoundSelector1();if(type === 2)return getCompoundSelector2();} /**
	 * Check for compound selectors that start with either a type selector,
	 * placeholder or parent selector with extension
	 * (1) `foo.bar`
	 * (2) `foo[attr=val]`
	 * (3) `foo:first-of-type`
	 * (4) `foo%bar`
	 * @param {number} i Token's index
	 * @return {number} Compound selector's length
	 */function checkCompoundSelector1(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkTypeSelector(i) || checkPlaceholder(i) || checkParentSelectorWithExtension(i))i += l;else return 0;while(i < tokensLength) {var _l2=checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i) || checkPlaceholder(i);if(_l2)i += _l2;else break;}tokens[start].compoundSelectorEnd = i;return i - start;} /**
	 * @return {Array} An array of nodes that make up the compound selector
	 */function getCompoundSelector1(){var sequence=[];var compoundSelectorEnd=tokens[pos].compoundSelectorEnd;if(checkTypeSelector(pos))sequence.push(getTypeSelector());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());else if(checkParentSelectorWithExtension(pos))sequence = sequence.concat(getParentSelectorWithExtension());while(pos < compoundSelectorEnd) {if(checkShash(pos))sequence.push(getShash());else if(checkClass(pos))sequence.push(getClass());else if(checkAttributeSelector(pos))sequence.push(getAttributeSelector());else if(checkPseudo(pos))sequence.push(getPseudo());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());else break;}return sequence;} /**
	 * Check for all other compound selectors
	 * (1) `.foo.bar`
	 * (2) `.foo[attr=val]`
	 * (3) `.foo:first-of-type`
	 * (4) `.foo%bar`
	 * (5) `.foo#{$bar}`
	 * @param {number} i Token's index
	 * @return {number} Compound selector's length
	 */function checkCompoundSelector2(i){if(i >= tokensLength)return 0;var start=i;while(i < tokensLength) {var l=checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i) || checkPlaceholder(i) || checkInterpolation(i);if(l)i += l;else break;}tokens[start].compoundSelectorEnd = i;return i - start;} /**
	 * @return {Array} An array of nodes that make up the compound selector
	 */function getCompoundSelector2(){var sequence=[];var compoundSelectorEnd=tokens[pos].compoundSelectorEnd;while(pos < compoundSelectorEnd) {if(checkShash(pos))sequence.push(getShash());else if(checkClass(pos))sequence.push(getClass());else if(checkAttributeSelector(pos))sequence.push(getAttributeSelector());else if(checkPseudo(pos))sequence.push(getPseudo());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());else if(checkInterpolation(pos))sequence.push(getInterpolation());else break;}return sequence;}function checkTypeSelector(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkNamePrefix(i))i += l;if(tokens[i].type === TokenType.Asterisk)i++;else if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getTypeSelector(){var type=NodeType.TypeSelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkNamePrefix(pos))content.push(getNamePrefix());token = tokens[pos];if(token.type === TokenType.Asterisk){var asteriskNode=newNode(NodeType.IdentType,'*',token.ln,token.col);content.push(asteriskNode);pos++;}else if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeSelector(i){var l=undefined;if(l = checkAttributeSelector1(i))tokens[i].attributeSelectorType = 1;else if(l = checkAttributeSelector2(i))tokens[i].attributeSelectorType = 2;return l;}function getAttributeSelector(){var type=tokens[pos].attributeSelectorType;if(type === 1)return getAttributeSelector1();else return getAttributeSelector2();} /**
	 * (1) `[panda=nani]`
	 * (2) `[panda='nani']`
	 * (3) `[panda='nani' i]`
	 *
	 */function checkAttributeSelector1(i){var start=i;if(tokens[i].type === TokenType.LeftSquareBracket)i++;else return 0;var l=undefined;if(l = checkSC(i))i += l;if(l = checkAttributeName(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeMatch(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeValue(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeFlags(i)){i += l;if(l = checkSC(i))i += l;}if(tokens[i].type === TokenType.RightSquareBracket)i++;else return 0;return i - start;}function getAttributeSelector1(){var type=NodeType.AttributeSelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `[`.
	pos++;content = content.concat(getSC());content.push(getAttributeName());content = content.concat(getSC());content.push(getAttributeMatch());content = content.concat(getSC());content.push(getAttributeValue());content = content.concat(getSC());if(checkAttributeFlags(pos)){content.push(getAttributeFlags());content = content.concat(getSC());} // Skip `]`.
	pos++;var end=getLastPosition(content,line,column,1);return newNode(type,content,line,column,end);} /**
	 * (1) `[panda]`
	 */function checkAttributeSelector2(i){var start=i;if(tokens[i].type === TokenType.LeftSquareBracket)i++;else return 0;var l=undefined;if(l = checkSC(i))i += l;if(l = checkAttributeName(i))i += l;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === TokenType.RightSquareBracket)i++;else return 0;return i - start;}function getAttributeSelector2(){var type=NodeType.AttributeSelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `[`.
	pos++;content = content.concat(getSC());content.push(getAttributeName());content = content.concat(getSC()); // Skip `]`.
	pos++;var end=getLastPosition(content,line,column,1);return newNode(type,content,line,column,end);}function checkAttributeName(i){var start=i;var l=undefined;if(l = checkNamePrefix(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getAttributeName(){var type=NodeType.AttributeNameType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkNamePrefix(pos))content.push(getNamePrefix());content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeMatch(i){var l=undefined;if(l = checkAttributeMatch1(i))tokens[i].attributeMatchType = 1;else if(l = checkAttributeMatch2(i))tokens[i].attributeMatchType = 2;return l;}function getAttributeMatch(){var type=tokens[pos].attributeMatchType;if(type === 1)return getAttributeMatch1();else return getAttributeMatch2();}function checkAttributeMatch1(i){var start=i;var type=tokens[i].type;if(type === TokenType.Tilde || type === TokenType.VerticalLine || type === TokenType.CircumflexAccent || type === TokenType.DollarSign || type === TokenType.Asterisk)i++;else return 0;if(tokens[i].type === TokenType.EqualsSign)i++;else return 0;return i - start;}function getAttributeMatch1(){var type=NodeType.AttributeMatchType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=tokens[pos].value + tokens[pos + 1].value;pos += 2;return newNode(type,content,line,column);}function checkAttributeMatch2(i){if(tokens[i].type === TokenType.EqualsSign)return 1;else return 0;}function getAttributeMatch2(){var type=NodeType.AttributeMatchType;var token=tokens[pos];var line=token.ln;var column=token.col;var content='=';pos++;return newNode(type,content,line,column);}function checkAttributeValue(i){return checkString(i) || checkIdentOrInterpolation(i);}function getAttributeValue(){var type=NodeType.AttributeValueType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkString(pos))content.push(getString());else content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeFlags(i){return checkIdentOrInterpolation(i);}function getAttributeFlags(){var type=NodeType.AttributeFlagsType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=getIdentOrInterpolation();return newNode(type,content,line,column);}function checkNamePrefix(i){if(i >= tokensLength)return 0;var l=undefined;if(l = checkNamePrefix1(i))tokens[i].namePrefixType = 1;else if(l = checkNamePrefix2(i))tokens[i].namePrefixType = 2;return l;}function getNamePrefix(){var type=tokens[pos].namePrefixType;if(type === 1)return getNamePrefix1();else return getNamePrefix2();} /**
	 * (1) `panda|`
	 * (2) `panda<comment>|`
	 */function checkNamePrefix1(i){var start=i;var l=undefined;if(l = checkNamespacePrefix(i))i += l;else return 0;if(l = checkCommentML(i))i += l;if(l = checkNamespaceSeparator(i))i += l;else return 0;return i - start;}function getNamePrefix1(){var type=NodeType.NamePrefixType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];content.push(getNamespacePrefix());if(checkCommentML(pos))content.push(getCommentML());content.push(getNamespaceSeparator());return newNode(type,content,line,column);} /**
	 * (1) `|`
	 */function checkNamePrefix2(i){return checkNamespaceSeparator(i);}function getNamePrefix2(){var type=NodeType.NamePrefixType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[getNamespaceSeparator()];return newNode(type,content,line,column);} /**
	 * (1) `*`
	 * (2) `panda`
	 */function checkNamespacePrefix(i){if(i >= tokensLength)return 0;var l=undefined;if(tokens[i].type === TokenType.Asterisk)return 1;else if(l = checkIdentOrInterpolation(i))return l;else return 0;}function getNamespacePrefix(){var type=NodeType.NamespacePrefixType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(token.type === TokenType.Asterisk){var asteriskNode=newNode(NodeType.IdentType,'*',token.ln,token.col);content.push(asteriskNode);pos++;}else if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);} /**
	 * (1) `|`
	 */function checkNamespaceSeparator(i){if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.VerticalLine)return 0; // Return false if `|=` - [attr|=value]
	if(tokens[i + 1] && tokens[i + 1].type === TokenType.EqualsSign)return 0;return 1;}function getNamespaceSeparator(){var type=NodeType.NamespaceSeparatorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content='|';pos++;return newNode(type,content,line,column);}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (css, tabSize) {
	  var TokenType = __webpack_require__(13);

	  var tokens = [];
	  var urlMode = false;
	  var c = undefined; // Current character
	  var cn = undefined; // Next character
	  var pos = 0;
	  var tn = 0;
	  var ln = 1;
	  var col = 1;

	  var Punctuation = {
	    ' ': TokenType.Space,
	    '\n': TokenType.Newline,
	    '\r': TokenType.Newline,
	    '\t': TokenType.Tab,
	    '!': TokenType.ExclamationMark,
	    '"': TokenType.QuotationMark,
	    '#': TokenType.NumberSign,
	    '$': TokenType.DollarSign,
	    '%': TokenType.PercentSign,
	    '&': TokenType.Ampersand,
	    '\'': TokenType.Apostrophe,
	    '(': TokenType.LeftParenthesis,
	    ')': TokenType.RightParenthesis,
	    '*': TokenType.Asterisk,
	    '+': TokenType.PlusSign,
	    ',': TokenType.Comma,
	    '-': TokenType.HyphenMinus,
	    '.': TokenType.FullStop,
	    '/': TokenType.Solidus,
	    ':': TokenType.Colon,
	    ';': TokenType.Semicolon,
	    '<': TokenType.LessThanSign,
	    '=': TokenType.EqualsSign,
	    '==': TokenType.EqualitySign,
	    '!=': TokenType.InequalitySign,
	    '>': TokenType.GreaterThanSign,
	    '?': TokenType.QuestionMark,
	    '@': TokenType.CommercialAt,
	    '[': TokenType.LeftSquareBracket,
	    ']': TokenType.RightSquareBracket,
	    '^': TokenType.CircumflexAccent,
	    '_': TokenType.LowLine,
	    '{': TokenType.LeftCurlyBracket,
	    '|': TokenType.VerticalLine,
	    '}': TokenType.RightCurlyBracket,
	    '~': TokenType.Tilde
	  };

	  /**
	   * Add a token to the token list
	   * @param {string} type
	   * @param {string} value
	   */
	  function pushToken(type, value, column) {
	    tokens.push({
	      tn: tn++,
	      ln: ln,
	      col: column,
	      type: type,
	      value: value
	    });
	  }

	  /**
	   * Check if a character is a decimal digit
	   * @param {string} c Character
	   * @returns {boolean}
	   */
	  function isDecimalDigit(c) {
	    return '0123456789'.indexOf(c) >= 0;
	  }

	  /**
	   * Parse spaces
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseSpaces(css) {
	    var start = pos;

	    // Read the string until we meet a non-space character:
	    for (; pos < css.length; pos++) {
	      if (css.charAt(pos) !== ' ') break;
	    }

	    // Add a substring containing only spaces to tokens:
	    pushToken(TokenType.Space, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse a string within quotes
	   * @param {string} css Unparsed part of CSS string
	   * @param {string} q Quote (either `'` or `"`)
	   */
	  function parseString(css, q) {
	    var start = pos;

	    // Read the string until we meet a matching quote:
	    for (pos++; pos < css.length; pos++) {
	      // Skip escaped quotes:
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) === q) break;
	    }

	    // Add the string (including quotes) to tokens:
	    var type = q === '"' ? TokenType.StringDQ : TokenType.StringSQ;
	    pushToken(type, css.substring(start, pos + 1), col);
	    col += pos - start;
	  }

	  /**
	   * Parse numbers
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseDecimalNumber(css) {
	    var start = pos;

	    // Read the string until we meet a character that's not a digit:
	    for (; pos < css.length; pos++) {
	      if (!isDecimalDigit(css.charAt(pos))) break;
	    }

	    // Add the number to tokens:
	    pushToken(TokenType.DecimalNumber, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse identifier
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseIdentifier(css) {
	    var start = pos;

	    // Skip all opening slashes:
	    while (css.charAt(pos) === '/') pos++;

	    // Read the string until we meet a punctuation mark:
	    for (; pos < css.length; pos++) {
	      // Skip all '\':
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) in Punctuation) break;
	    }

	    var ident = css.substring(start, pos--);

	    // Enter url mode if parsed substring is `url`:
	    if (!urlMode && ident === 'url' && css.charAt(pos + 1) === '(') {
	      urlMode = true;
	    }

	    // Add identifier to tokens:
	    pushToken(TokenType.Identifier, ident, col);
	    col += pos - start;
	  }

	  /**
	   * Parse equality sign
	   */
	  function parseEquality() {
	    pushToken(TokenType.EqualitySign, '==', col);
	    pos++;
	    col++;
	  }

	  /**
	   * Parse inequality sign
	   */
	  function parseInequality() {
	    pushToken(TokenType.InequalitySign, '!=', col);
	    pos++;
	    col++;
	  }

	  /**
	  * Parse a multiline comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseMLComment(css) {
	    var start = pos;

	    // Read the string until we meet `*/`.
	    // Since we already know first 2 characters (`/*`), start reading
	    // from `pos + 2`:
	    for (pos += 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '*' && css.charAt(pos + 1) === '/') {
	        pos++;
	        break;
	      }
	    }

	    // Add full comment (including `/*` and `*/`) to the list of tokens:
	    var comment = css.substring(start, pos + 1);
	    pushToken(TokenType.CommentML, comment, col);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  /**
	  * Parse a single line comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseSLComment(css) {
	    var start = pos;

	    // Read the string until we meet line break.
	    // Since we already know first 2 characters (`//`), start reading
	    // from `pos + 2`:
	    for (pos += 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '\n' || css.charAt(pos) === '\r') {
	        break;
	      }
	    }

	    // Add comment (including `//` and line break) to the list of tokens:
	    pushToken(TokenType.CommentSL, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Convert a CSS string to a list of tokens
	   * @param {string} css CSS string
	   * @returns {Array} List of tokens
	   * @private
	   */
	  function getTokens(css) {
	    // Parse string, character by character:
	    for (pos = 0; pos < css.length; col++, pos++) {
	      c = css.charAt(pos);
	      cn = css.charAt(pos + 1);

	      // If we meet `/*`, it's a start of a multiline comment.
	      // Parse following characters as a multiline comment:
	      if (c === '/' && cn === '*') {
	        parseMLComment(css);
	      }

	      // If we meet `//` and it is not a part of url:
	      else if (!urlMode && c === '/' && cn === '/') {
	          // If we're currently inside a block, treat `//` as a start
	          // of identifier. Else treat `//` as a start of a single-line
	          // comment:
	          parseSLComment(css);
	        }

	        // If current character is a double or single quote, it's a start
	        // of a string:
	        else if (c === '"' || c === "'") {
	            parseString(css, c);
	          }

	          // If current character is a space:
	          else if (c === ' ') {
	              parseSpaces(css);
	            }

	            // If current character is `=`, it must be combined with next `=`
	            else if (c === '=' && cn === '=') {
	                parseEquality(css);
	              }

	              // If we meet `!=`, this must be inequality
	              else if (c === '!' && cn === '=') {
	                  parseInequality(css);
	                }

	                // If current character is a punctuation mark:
	                else if (c in Punctuation) {
	                    // Check for CRLF here or just LF
	                    if (c === '\r' && cn === '\n' || c === '\n') {
	                      // If \r we know the next character is \n due to statement above
	                      // so we push a CRLF token type to the token list and importantly
	                      // skip the next character so as not to double count newlines or
	                      // columns etc
	                      if (c === '\r') {
	                        pushToken(TokenType.Newline, '\r\n', col);
	                        pos++; // If CRLF skip the next character and push crlf token
	                      } else if (c === '\n') {
	                          // If just a LF newline and not part of CRLF newline we can just
	                          // push punctuation as usual
	                          pushToken(Punctuation[c], c, col);
	                        }

	                      ln++; // Go to next line
	                      col = 0; // Reset the column count
	                    } else if (c !== '\r' && c !== '\n') {
	                        // Handle all other punctuation and add to list of tokens
	                        pushToken(Punctuation[c], c, col);
	                      } // Go to next line
	                    if (c === ')') urlMode = false; // Exit url mode
	                    else if (c === '\t' && tabSize > 1) col += tabSize - 1;
	                  }

	                  // If current character is a decimal digit:
	                  else if (isDecimalDigit(c)) {
	                      parseDecimalNumber(css);
	                    }

	                    // If current character is anything else:
	                    else {
	                        parseIdentifier(css);
	                      }
	    }

	    return tokens;
	  }

	  return getTokens(css);
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Node = __webpack_require__(1);
	var NodeTypes = __webpack_require__(15);

	module.exports = function () {
	  return new Node({
	    type: NodeTypes.StylesheetType,
	    content: [],
	    start: [0, 0],
	    end: [0, 0]
	  });
	};

/***/ }
/******/ ])
});
;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var groot = __webpack_require__(11);
var helpers = __webpack_require__(0);
var slRules = __webpack_require__(13);
var ruleToggler = __webpack_require__(12);
var getToggledRules = ruleToggler.getToggledRules;
var isResultEnabled = ruleToggler.isResultEnabled;

var defaultConfig = {
    "rules": {
        "extends-before-mixins": 2,
        "hex-notation": [2, {
            "style": "uppercase"
        }],
        "placeholder-in-extend": 2,
        "no-warn": 1,
        "no-important": 2,
        "no-ids": 2,
        "property-sort-order": [1, {
            "ignore-custom-properties": true,
            "order": ["display", "margin"]
        }],
        "mixins-before-declarations": [2, {
            "exclude": ["breakpoint", "mq"]
        }],
        "no-debug": 1,
        "indentation": [2, {
            "size": 2
        }],
        "extends-before-declarations": 2,
        "variable-for-property": [2, {
            "properties": ["margin", "content"]
        }]
    },
    "options": {
        "output-file": "linters/sass-lint.html",
        "formatter": "html",
        "max-warnings": 50,
        "merge-default-rules": false
    }
};

function verify(text, options) {
    var baseConfig = JSON.parse(JSON.stringify(defaultConfig));
    if (options) {
        if (options.rules) {
            for (var i in options.rules) {
                baseConfig.rules[i] = options.rules[i];
            }
        }
        if (options.options) {
            for (var _i in options.options) {
                baseConfig.options[_i] = options.options[_i];
            }
        }
    }
    var rules = slRules(baseConfig),
        ast = {},
        detects,
        results = [],
        errors = 0,
        warnings = 0,
        ruleToggles = null,
        isEnabledFilter = null;

    try {
        ast = groot(text, 'scss');
    } catch (e) {
        var line = e.line || 1;
        errors++;

        results = [{
            ruleId: 'Fatal',
            line: line,
            column: 1,
            message: e.message,
            severity: 2
        }];
    }

    if (ast.content && ast.content.length > 0) {
        ruleToggles = getToggledRules(ast);
        isEnabledFilter = isResultEnabled(ruleToggles);

        rules.forEach(function (rule) {
            detects = rule.rule.detect(ast, rule).filter(isEnabledFilter);
            if (detects.length) {
                detects.forEach(function (detect) {
                    detect.message += " (" + detect.ruleId + ")";
                });
                if (rule.severity === 1) {
                    warnings += detects.length;
                    detects.forEach(function (detect) {
                        detect.type = "warning";
                    });
                } else if (rule.severity === 2) {
                    errors += detects.length;
                    detects.forEach(function (detect) {
                        detect.type = "error";
                    });
                }
            }
            results = results.concat(detects);
        });
    }
    results.sort(helpers.sortDetects);
    return {
        'warningCount': warnings,
        'errorCount': errors,
        'messages': results
    };
}
exports.default = { verify: verify };
//modules.exports={verify};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sassLint = __webpack_require__(9);

var _sassLint2 = _interopRequireDefault(_sassLint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.SCSSLint = _sassLint2.default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//////////////////////////////
// Tree Abstraction
//////////////////////////////


var gonzales = __webpack_require__(8);
//var fm = require('front-matter');
var helpers = __webpack_require__(0);

module.exports = function (text, syntax, filename) {
  var tree;

  // Run `.toString()` to allow Buffers to be passed in
  text = helpers.stripBom(text.toString());

  // if we're skipping front matter do it here, fall back to just our text in case it fails
  //  if (fm.test(text)) {
  //    text = fm(text).body || text;
  //  }

  try {
    tree = gonzales.parse(text, {
      'syntax': syntax
    });
  } catch (e) {
    throw {
      message: e.message,
      file: filename,
      line: e.line
    };
  }

  if (typeof tree === 'undefined') {
    throw {
      message: 'Undefined tree',
      file: filename,
      text: text.toString(),
      tree: tree.toString()
    };
  }

  return tree;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Adds each rule in our array of rules in a disable comment into the toggledRules object
 * under the correct rule name along with the line and column number where the disable comment
 * was encountered
 *
 * @param {Object} toggledRules - Contains the information about each rule disable/enable
                                  encountered and and what line/column it occurred on
 * @param {Array} rules - An array of rule names
 * @param {number} line - The line number the disable appeared on
 * @param {number} column - The column number the disable appeared on
 */

var addDisable = function addDisable(toggledRules, rules, line, column) {
  rules.map(function (rule) {
    toggledRules.ruleEnable[rule] = toggledRules.ruleEnable[rule] || [];
    toggledRules.ruleEnable[rule].push([false, line, column]);
  });
};

/**
 * Adds each rule in our array of rules in a enable comment into the toggledRules object
 * under the correct rule name along with the line and column number where the enable comment
 * was encountered
 *
 * @param {Object} toggledRules - Contains the information about each rule enable
                                  encountered and and what line/column it occurred on
 * @param {Array} rules - An array of rule names
 * @param {number} line - The line number the enable appeared on
 * @param {number} column - The column number the enable appeared on
 */
var addEnable = function addEnable(toggledRules, rules, line, column) {
  rules.map(function (rule) {
    toggledRules.ruleEnable[rule] = toggledRules.ruleEnable[rule] || [];
    toggledRules.ruleEnable[rule].push([true, line, column]);
  });
};

/**
 * Adds each rule in our array of rules in a disable block comment into the toggledRules object
 * under the correct rule name along with the line and column number where the disable block comment
 * was encountered
 *
 * @param {Object} toggledRules - Contains the information about each rule enable
                                  encountered and and what line/column that block occurred on
 * @param {Array} rules - An array of rule names
 * @param {Object} block - The block that is to be disabled
 */
var addDisableBlock = function addDisableBlock(toggledRules, rules, block) {
  rules.map(function (rule) {
    toggledRules.ruleEnable[rule] = toggledRules.ruleEnable[rule] || [];
    toggledRules.ruleEnable[rule].push([false, block.start.line, block.start.column]);
    toggledRules.ruleEnable[rule].push([true, block.end.line, block.end.column]);
  });
};

/**
 * Adds a globally disabled flag to the toggled rules globalEnable property including the line and column
 * that this comment was encountered on.
 *
 * @param {Object} toggledRules - Contains the information about the global disable comment
                                  encountered and and what line/column it occurred on
 * @param {number} line - The line number the disable appeared on
 * @param {number} column - The column number the disable appeared on
 */
var addDisableAll = function addDisableAll(toggledRules, line, column) {
  toggledRules.globalEnable.push([false, line, column]);
};

/**
 * Adds a globally enabled flag to the toggled rules globalEnable property including the line and column
 * that this comment was encountered on.
 *
 * @param {Object} toggledRules - Contains the information about the global enable comment
                                  encountered and and what line/column it occurred on
 * @param {number} line - The line number the enable appeared on
 * @param {number} column - The column number the enable appeared on
 */
var addEnableAll = function addEnableAll(toggledRules, line, column) {
  toggledRules.globalEnable.push([true, line, column]);
};

/**
 * Adds a line disabled flag to the ruleEnable property of the toggledRules object for each rule name
 * encountered in the comment and which line this comment was discovered on / refers to
 *
 * @param {Object} toggledRules - Contains the information about the line disable comment encountered, the rules
 *                              it relates to and which line it was encountered on
 * @param {Array} rules - An array of rule names to apply
 * @param {number} line - The line number that this disable should refer to
 */
var addDisableLine = function addDisableLine(toggledRules, rules, line) {
  rules.map(function (rule) {
    toggledRules.ruleEnable[rule] = toggledRules.ruleEnable[rule] || [];
    // NOTE: corner case not handled here: a 2nd disable inside an ignored line, which is unrealistically pathological.
    toggledRules.ruleEnable[rule].push([false, line, 1]);
    toggledRules.ruleEnable[rule].push([true, line + 1, 1]);
  });
};

/**
 * This is the sorting function we use to sort the toggle stacks in our getToggledRules method
 * First sorts by line and then by column if the lines are identical
 *
 * @param {Array} toggleRangeA - The first rule to sort
 * @param {Array} toggleRangeB - The second rule to sort
 *
 * @returns {number} A pointer to signify to the sort method how the currently in focus value should be sorted
 */
var sortRange = function sortRange(toggleRangeA, toggleRangeB) {
  var aLine = toggleRangeA[1],
      aCol = toggleRangeA[2],
      bLine = toggleRangeB[1],
      bCol = toggleRangeB[2];
  if (aLine < bLine) {
    return -1;
  }
  if (aLine > bLine) {
    return 1;
  }
  if (aCol < bCol) {
    return -1;
  }
  if (aCol > bCol) {
    return 1;
  }
  return 0;
};

/**
 * Checks if line number A is before line number B, if it's the same then it checks if the column of A
 * is before the column of B
 *
 * @param {number} x - The line number of A
 * @param {number} y - The column number of A
 * @param {number} x2 - The line number of B
 * @param {number} y2 - The column number of B
 *
 * @returns {Boolean} Whether the current line/column A is before or the same as B
 */
var isBeforeOrSame = function isBeforeOrSame(x, y, x2, y2) {
  return x < x2 || x === x2 && y < y2;
};

/**
 * Traverses the AST looking for sass-lint disable/enable comments and then builds an Object/node representation
 * of any it encounters
 *
 * @param {Object} ast - Gonzales PE abstract syntax tree
 *
 * @returns {Object} The toggledRules object containing all of our rule enable/disable information
 */
module.exports.getToggledRules = function (ast) {
  var toggledRules = {
    ruleEnable: {
      // Format in here is [isEnabled, line, column]
    },
    globalEnable: []
  };
  if (!ast.traverseByTypes) {
    return toggledRules;
  }
  ast.traverseByTypes(['multilineComment', 'singlelineComment'], function (comment, i, parent) {
    var content = comment.content;
    if (!content) {
      return;
    }
    var tokens = content.split(/[\s,]+/).filter(function (s) {
      return s.trim().length > 0;
    });
    if (!tokens.length) {
      return;
    }
    var first = tokens[0],
        rules = tokens.slice(1);
    switch (first) {
      case 'sass-lint:disable':
        addDisable(toggledRules, rules, comment.start.line, comment.start.column);
        break;
      case 'sass-lint:enable':
        addEnable(toggledRules, rules, comment.start.line, comment.start.column);
        break;
      case 'sass-lint:disable-block':
        // future ref: not sure what the appropriate behavior is if there is no parent block; currently NPEs
        addDisableBlock(toggledRules, rules, parent);
        break;
      case 'sass-lint:disable-all':
        addDisableAll(toggledRules, comment.start.line, comment.start.column);
        break;
      case 'sass-lint:enable-all':
        addEnableAll(toggledRules, comment.start.line, comment.start.column);
        break;
      case 'sass-lint:disable-line':
        addDisableLine(toggledRules, rules, comment.start.line);
        break;
      default:
        return;
    }
  });
  // Sort these toggle stacks so reading them is easier (algorithmically).
  // Usually already sorted but since it's not guaranteed by the contract with gonzales-pe, ensuring it is.
  toggledRules.globalEnable.sort(sortRange);
  Object.keys(toggledRules.ruleEnable).map(function (ruleId) {
    toggledRules.ruleEnable[ruleId].sort(sortRange);
  });
  return toggledRules;
};

/**
 * Filters our rule results by checking the lint result and its line/column against our
 * toggledRules object to see whether we should still be reporting this lint.
 *
 * @param {Object} toggledRules - The toggledRules object containing all of our rule enable/disable information
 *
 * @returns {Boolean} Whether the current rule is disabled for this lint report
 */
module.exports.isResultEnabled = function (toggledRules) {
  return function (ruleResult) {
    var ruleId = ruleResult.ruleId;
    // Convention: if no column or line, assume rule is targetting 1.
    var line = ruleResult.line || 1;
    var column = ruleResult.column || 1;
    var isGloballyEnabled = toggledRules.globalEnable.reduce(function (acc, toggleRange) {
      return isBeforeOrSame(line, column, toggleRange[1], toggleRange[2]) ? acc : toggleRange[0];
    }, true);
    if (!isGloballyEnabled) {
      return false;
    }
    if (!toggledRules.ruleEnable[ruleId]) {
      return true;
    }
    var isRuleEnabled = toggledRules.ruleEnable[ruleId].reduce(function (acc, toggleRange) {
      return isBeforeOrSame(line, column, toggleRange[1], toggleRange[2]) ? acc : toggleRange[0];
    }, true);
    if (!isRuleEnabled) {
      return false;
    }
    return true;
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var merge = __webpack_require__(99);
var searchArray = function searchArray(haystack, needle) {
    var i;
    for (i = 0; i < haystack.length; i++) {
        if (haystack[i].indexOf(needle) >= 0) {
            return i;
        }
    }
    return -1;
};

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}
// requires and returns all modules that match

var rules = requireAll(__webpack_require__(98));

module.exports = function (config) {
    var handlers = [],
        i;
    //
    //  rules = fs.readdirSync(path.join(__dirname, 'rules'));
    //  for (i = 0; i < rules.length; i++) {
    //    rules[i] = path.join(__dirname, 'rules', rules[i]);
    //  }
    //    rules=modules;
    Object.keys(config.rules).forEach(function (ruleName) {
        var fullRule = config.rules[ruleName],
            loadRule,
            severity,
            options,
            ruleSearch;

        if (typeof fullRule === 'number') {
            severity = fullRule;
            options = {};
        } else {
            severity = fullRule[0];
            options = fullRule[1];
        }

        // Only seek out rules that are enabled
        if (severity !== 0) {
            //      var fileName = path.normalize(path.join('/', rule + '.js'));

            //      ruleSearch = searchArray(rules, fileName);
            loadRule = rules.find(function (rule) {
                return rule.name === ruleName;
            });
            if (loadRule) {

                options = merge.recursive(true, loadRule.defaults, options);

                handlers.push({
                    'rule': loadRule,
                    'severity': severity,
                    'options': options
                });
            } else {
                throw new Error('Rule `' + ruleName + '` could not be found!');
            }
        }
    });

    return handlers;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'attribute-quotes',
  'defaults': {
    'include': true
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('attributeValue', function (item) {
      if (item.content[0].is('string') && !parser.options.include) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': item.start.line,
          'column': item.start.column,
          'message': 'Attribute values should not be surrounded by quotes',
          'severity': parser.severity
        });
      } else if (item.content[0].is('ident') && parser.options.include) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': item.start.line,
          'column': item.start.column,
          'message': 'Attribute values should be surrounded by quotes',
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);
var selectorHelpers = __webpack_require__(1);

/**
 * Get number of BEM elements in
 * @param   {string}  str String representing a class selector
 * @returns {integer}     Number of BEM elements in str
 */
var bemDepth = function bemDepth(str) {
  var elements = str.split('__').length;

  if (elements >= 2) {
    return elements - 1;
  }

  return 0;
};

module.exports = {
  'name': 'bem-depth',
  'defaults': {
    'max-depth': 1
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByTypes(['ruleset', 'placeholder'], function (node) {
      var name,
          depth,
          selectorAndExtensions,
          maxDepth = parser.options['max-depth'];

      if (node.is('placeholder')) {
        name = selectorHelpers.constructSelector(node);
        if (name) {
          depth = bemDepth(name);
          if (depth > maxDepth) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': node.start.line,
              'column': node.start.column,
              'message': ['Placeholder \'%', name, '\' should have ', maxDepth, ' or fewer BEM elements, but ', depth, ' were found.'].join(''),
              'severity': parser.severity
            });
          }
        }
      } else {
        selectorAndExtensions = helpers.collectSuffixExtensions(node, 'class');

        selectorAndExtensions.forEach(function (selector) {
          name = selector.content;
          depth = bemDepth(name);

          if (depth > maxDepth) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': selector.start.line,
              'column': selector.start.column,
              'message': ['Selector \'.', name, '\' should have ', maxDepth, ' or fewer BEM elements, but ', depth, ' were found.'].join(''),
              'severity': parser.severity
            });
          }
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var borders = ['border', 'border-top', 'border-right', 'border-bottom', 'border-left'];
var allowedConventions = ['0', 'none'];

module.exports = {
  'name': 'border-zero',
  'defaults': {
    'convention': '0'
  },
  'detect': function detect(ast, parser) {
    var result = [];
    var userConvention = parser.options.convention.toString();
    var convention = allowedConventions.indexOf(userConvention) !== -1 ? userConvention : allowedConventions[0];
    var invalidConvention = convention !== userConvention;

    ast.traverseByType('declaration', function (declaration) {
      var isBorder = false;

      declaration.traverse(function (item) {
        if (item.type === 'property') {
          item.traverse(function (child) {
            if (borders.indexOf(child.content) !== -1) {
              isBorder = true;
            }
          });
        }

        if (isBorder) {
          if (item.type === 'value') {
            var node = item.content[0];
            if (node.type === 'number' || node.type === 'ident') {
              if (node.content === '0' || node.content === 'none') {
                if (convention !== node.content) {
                  if (invalidConvention) {
                    invalidConvention = false;
                    result = helpers.addUnique(result, {
                      'ruleId': parser.rule.name,
                      'line': 1,
                      'column': 1,
                      'message': 'The border-zero convention `' + userConvention + ' in your config file is not valid. Defaulted to convention \'0\'',
                      'severity': parser.severity
                    });
                  }
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': node.start.line,
                    'column': node.start.column,
                    'message': 'A value of `' + node.content + '` is not allowed. `' + convention + '` must be used.',
                    'severity': parser.severity
                  });
                }
              }
            }
          }
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

/**
 * Get the current block within a node
 *
 * @param {Object} node - The node containing our desired block
 * @returns {Object} The current block of the node
 */
var getCurrentNode = function getCurrentNode(node) {
  return node.contains('block') ? node.first('block') : false;
};

/**
 * Get the previous node
 *
 * @param {Object} node - Our current node
 * @returns {Object|bool} The previous node or false if not found
 */
var getPreviousNode = function getPreviousNode(node) {
  // Rulesets
  if (node.is('ruleset')) {
    return node.contains('selector') ? node.last('selector') : false;
  }

  // Conditonal statements
  if (node.is('conditionalStatement')) {
    var previousParent = node.contains('condition') ? node.last('condition') : false;
    return previousParent && previousParent.contains('atkeyword') ? previousParent.last('atkeyword') : false;
  }

  // Loops
  if (node.is('loop')) {
    return node.contains('atkeyword') ? node.last('atkeyword') : false;
  }

  // Mixins and atrules (functions etc)
  if (node.is('mixin') || node.is('atrule')) {
    if (node.contains('function')) {
      return node.last('function');
    }

    if (node.contains('arguments')) {
      return node.last('arguments');
    }
    return node.contains('atkeyword') ? node.last('atkeyword') : false;
  }

  return false;
};

/**
 * Determine if current node is an exception and end checks if it is
 * If we've picked up a return @rule ignore it
 *
 * @param {Object} node - The original node
 * @param {object} currentNode - The current node block
 * @param {Object} previousNode - The node previous to our current node
 * @returns {bool} Whether or not the it is an exception
 */
var isException = function isException(node, currentNode, previousNode) {
  if (node.is('atrule')) {
    if (previousNode.contains('ident') && previousNode.first('ident').content === 'return') {
      return true;
    }
  }
  return false;
};

/**
 * Determine if statement is a single line statement
 *
 * @param {Object} node - The statement to check
 * @returns {bool} True or false
 */
var isSingleLineStatement = function isSingleLineStatement(node) {
  return node.start.line === node.end.line;
};

/**
 * Determine if opening brace of statement is on a new line
 *
 * @param {Object} nodeA - The previous block
 * @param {Object} nodeB - The current block
 * @returns {bool} True or false
 */
var isOpeningBraceOnNewLine = function isOpeningBraceOnNewLine(nodeA, nodeB) {
  return nodeA.end.line === nodeB.start.line;
};

/**
 * Determine if closing brace of statement is on new line
 *
 * @param {Object} node - The current block
 * @returns {bool|null} True or false if relevant else null
 */
var isClosingBraceOnNewLine = function isClosingBraceOnNewLine(node) {
  if (node.contains('block')) {
    var content = node.first('block'),
        contentLength = content.length - 1,
        lastNode = content.get(contentLength);

    if (lastNode && lastNode.is('space') && helpers.hasEOL(lastNode.content)) {
      return true;
    }
    return false;
  }
  return null;
};

/**
 * Determine if condition starts on a new line by checking the leading node for
 * an end-of-line
 *
 * @param {Object} node - The node that is our condition
 * @param {Object} parentNode - The condition node's parent
 * @param {Number} j - The index of our node in the context of the parent's children
 * @returns {bool|null} True or false if relevant else null
 */
var isConditionOnNewLine = function isConditionOnNewLine(node, parentNode, j) {
  var currentNode = node;

  // Check node is part of an `else if` and if it is, use the else node instead
  if (node.first('ident').content === 'if') {
    var initialNode = parentNode.get(j);
    currentNode = initialNode.contains('atkeyword') ? initialNode.first('atkeyword') : false;
  }

  // Only check if it's an @else condition
  if (currentNode && currentNode.contains('ident') && currentNode.first('ident').content === 'else') {
    // Reverse back up tree
    var previousChild = parentNode.get(--j) || false;
    if (previousChild) {
      // Determine if we have a leading new line
      if (previousChild.is('space') && helpers.hasEOL(previousChild.content)) {
        return true;
      }
      return false;
    }
    return false;
  }
  return null;
};

/**
 * Run the rule checks and return their results
 *
 * @param {Object} node - The original node
 * @param {Object} currentNode - The current node block
 * @param {Object} previousNode - The node previous to our current node
 * @param {Object} parentNode - The parent of the original node
 * @param {int} index - The index of the original node
 * @returns {Object} The results of the rule checks
 */
var runRuleChecks = function runRuleChecks(node, currentNode, previousNode, parentNode, index) {
  var checks = {};

  // Determine if single line statement
  checks.singleLineStatement = isSingleLineStatement(node);

  // Determine if condition is on a new line
  if (node.is('atrule') || node.is('conditionalStatement')) {
    checks.conditionOnNewLine = isConditionOnNewLine(previousNode, parentNode, index);
  }

  // Determine if opening brace is on new line
  if (previousNode && currentNode) {
    checks.openingBraceOnNewLine = isOpeningBraceOnNewLine(previousNode, currentNode);
  }

  // Determine if closing brace is on new line
  checks.closingBraceOnNewLine = isClosingBraceOnNewLine(node);

  return checks;
};

/**
 * Filter at-rules
 *
 * @param {Object} node - The node to filter
 * @param {Array} accepted - The array of accepted at-rule types
 * @returns {bool} true if we should ignore, false to continue
 */
var filterAtrule = function filterAtrule(node, accepted) {
  if (node.is('atrule')) {
    if (node.contains('atkeyword') && node.first('atkeyword').contains('ident')) {
      if (accepted.indexOf(node.first('atkeyword').first('ident').content) === -1) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Create an issue using the supplied information
 *
 * @param {Object} parser - The parser
 * @param {Object} node - The node with the issue
 * @param {string} message - The message to display
 * @returns {Object} An object containing an issue
 */
var createIssue = function createIssue(parser, node, message) {
  return {
    'ruleId': parser.rule.name,
    'line': node.line,
    'column': node.column,
    'message': message,
    'severity': parser.severity
  };
};

module.exports = {
  'name': 'brace-style',
  'defaults': {
    'style': '1tbs',
    'allow-single-line': true
  },
  'detect': function detect(ast, parser) {
    var result = [],
        acceptedAtrules = ['function', 'if', 'else'];

    ast.traverseByTypes(['conditionalStatement', 'atrule', 'ruleset', 'mixin', 'loop'], function (node, i, parent) {
      var currentNode = false,
          previousNode = false,
          checks = {
        singleLineStatement: null,
        openingBraceOnNewLine: null,
        closingBraceOnNewLine: null,
        conditionOnNewLine: null
      },
          messages = ['Single line statements are not allowed', 'Opening brace must be on the same line as condition', 'Brace must be on a new line', 'Statement must start on the same line as the closing brace of the previous statement', 'Statement must begin on a new line', 'Closing brace must be on a new line'];

      // SCSS syntax only rule
      if (ast.syntax === 'sass') {
        return false;
      }

      // Filter at-rule types
      if (filterAtrule(node, acceptedAtrules)) {
        return false;
      }

      // Assign current & previous nodes based on node type
      currentNode = getCurrentNode(node);
      previousNode = getPreviousNode(node);

      // If not an exception carry on
      if (!isException(node, currentNode, previousNode)) {

        // Run and store rule check results
        checks = runRuleChecks(node, currentNode, previousNode, parent, i);

        // Build single-line statement results
        if (checks.singleLineStatement === false && checks.closingBraceOnNewLine === false) {
          result = helpers.addUnique(result, createIssue(parser, {
            line: currentNode.end.line,
            column: currentNode.end.column
          }, messages[5]));
        }

        if (checks.singleLineStatement === true) {
          if (parser.options['allow-single-line'] === false) {
            result = helpers.addUnique(result, createIssue(parser, {
              line: node.start.line,
              column: node.start.column
            }, messages[0]));
          }
          return false;
        }

        // Build brace-style results
        if (previousNode && currentNode) {
          if (parser.options.style === '1tbs') {
            if (checks.openingBraceOnNewLine === false) {
              result = helpers.addUnique(result, createIssue(parser, {
                line: currentNode.start.line,
                column: currentNode.start.column
              }, messages[1]));
            }
            if (checks.conditionOnNewLine === true) {
              result = helpers.addUnique(result, createIssue(parser, {
                line: previousNode.start.line,
                column: previousNode.start.column
              }, messages[3]));
            }
          }

          if (parser.options.style === 'stroustrup') {
            if (checks.openingBraceOnNewLine === false) {
              result = helpers.addUnique(result, createIssue(parser, {
                line: currentNode.start.line,
                column: currentNode.start.column
              }, messages[1]));
            }
            if (checks.conditionOnNewLine === false) {
              result = helpers.addUnique(result, createIssue(parser, {
                line: previousNode.start.line,
                column: previousNode.start.column
              }, messages[4]));
            }
          }

          if (parser.options.style === 'allman') {
            if (checks.openingBraceOnNewLine === true) {
              result = helpers.addUnique(result, createIssue(parser, {
                line: currentNode.end.line,
                column: currentNode.end.column
              }, messages[2]));
            }
            if (checks.conditionOnNewLine === false) {
              result = helpers.addUnique(result, createIssue(parser, {
                line: previousNode.start.line,
                column: previousNode.start.column
              }, messages[4]));
            }
          }
        }
      }

      return true;
    });

    return result;
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'class-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase',
    'convention-explanation': false,
    'ignore': []
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('ruleset', function (ruleset) {
      var selectorAndExtensions = helpers.collectSuffixExtensions(ruleset, 'class');

      selectorAndExtensions.forEach(function (node) {
        var name = node.content,
            strippedName,
            violationMessage = false;

        if (parser.options.ignore.indexOf(name) !== -1) {
          return;
        }

        strippedName = name;

        if (parser.options['allow-leading-underscore'] && name[0] === '_') {
          strippedName = name.slice(1);
        }

        switch (parser.options.convention) {
          case 'hyphenatedlowercase':
            if (!helpers.isHyphenatedLowercase(strippedName)) {
              violationMessage = 'Class \'.' + name + '\' should be written in lowercase with hyphens';
            }
            break;
          case 'camelcase':
            if (!helpers.isCamelCase(strippedName)) {
              violationMessage = 'Class \'.' + name + '\' should be written in camelCase';
            }
            break;
          case 'pascalcase':
            if (!helpers.isPascalCase(strippedName)) {
              violationMessage = 'Class \'.' + name + '\' should be written in PascalCase';
            }
            break;
          case 'snakecase':
            if (!helpers.isSnakeCase(strippedName)) {
              violationMessage = 'Class \'.' + name + '\' should be written in snake_case';
            }
            break;
          case 'strictbem':
            if (!helpers.isStrictBEM(strippedName)) {
              violationMessage = 'Class \'.' + name + '\' should be written in BEM (Block Element Modifier) format';
            }
            break;
          case 'hyphenatedbem':
            if (!helpers.isHyphenatedBEM(strippedName)) {
              violationMessage = 'Class \'.' + name + '\' should be written in hyphenated BEM (Block Element Modifier) format';
            }
            break;
          default:
            if (!new RegExp(parser.options.convention).test(strippedName)) {
              violationMessage = 'Class \'.' + name + '\' should match regular expression /' + parser.options.convention + '/';

              // convention-message overrides violationMessage
              if (parser.options['convention-explanation']) {
                violationMessage = parser.options['convention-explanation'];
              }
            }
        }

        if (violationMessage) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': violationMessage,
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0),
    path = __webpack_require__(87);

var getImportPath = function getImportPath(parent, syntax) {
  if (parent.first('uri')) {
    return parent.first('uri');
  }

  if (parent.first('string')) {
    return helpers.stripQuotes(parent.first('string').content);
  }

  if (parent.first('ident')) {

    if (syntax === 'sass') {
      var output = '',
          isFinished = false;

      parent.forEach(function (item) {
        // Force an end if we've appended a 'class'.. aka file extension
        if (!isFinished) {
          // Since we don't have quotes, gonzales-pe will parse file path as
          // multiple different types
          if (item.type === 'string' || item.type === 'operator' || item.type === 'ident') {
            output += item.content;
          }

          // Gonzales-pe parses file extensions as classes if they are not
          // wrapped in quotes...
          if (item.type === 'class') {
            if (item.first('ident')) {
              output += '.' + item.first('ident').content;
            }

            isFinished = true;
          }
        }
      });

      return output.trim();
    }

    return parent.first('ident');
  }

  return false;
};

module.exports = {
  'name': 'clean-import-paths',
  'defaults': {
    'leading-underscore': false,
    'filename-extension': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('atkeyword', function (keyword, i, parent) {
      keyword.forEach(function (item) {
        if (item.content === 'import') {
          var importPath = getImportPath(parent, keyword.syntax);

          if (importPath) {
            if (typeof importPath === 'string') {
              var filename = path.basename(importPath),
                  fileExtension = path.extname(filename);

              if (fileExtension === '.sass' || fileExtension === '.scss' || fileExtension === '') {
                if (filename.charAt(0) === '_') {
                  if (!parser.options['leading-underscore']) {
                    result = helpers.addUnique(result, {
                      'ruleId': parser.rule.name,
                      'line': item.start.line,
                      'column': item.start.column,
                      'message': 'Leading underscores are not allowed',
                      'severity': parser.severity
                    });
                  }
                } else {
                  if (parser.options['leading-underscore']) {
                    result = helpers.addUnique(result, {
                      'ruleId': parser.rule.name,
                      'line': item.start.line,
                      'column': item.start.column,
                      'message': 'Leading underscores are required',
                      'severity': parser.severity
                    });
                  }
                }

                if (fileExtension) {
                  if (!parser.options['filename-extension']) {
                    result = helpers.addUnique(result, {
                      'ruleId': parser.rule.name,
                      'line': item.start.line,
                      'column': item.start.column,
                      'message': 'File extensions are not allowed',
                      'severity': parser.severity
                    });
                  }
                } else {
                  if (parser.options['filename-extension']) {
                    result = helpers.addUnique(result, {
                      'ruleId': parser.rule.name,
                      'line': item.start.line,
                      'column': item.start.column,
                      'message': 'File extensions are required',
                      'severity': parser.severity
                    });
                  }
                }
              }
            }
          }
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'declarations-before-nesting',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [],
        error;

    ast.traverseByType('block', function (block) {
      if (block.contains('ruleset') && block.contains('declaration')) {
        var rulesetIndex;

        block.forEach(function (item, j) {
          var declarationIndex;
          var declaration;

          if (item.is('ruleset') && rulesetIndex === void 0) {
            rulesetIndex = j;
          }

          if (item.is('declaration')) {
            var property = item.content[0];

            if (property && property.is('property')) {
              if (property.content[0] && property.content[0].is('variable')) {
                return;
              }
            }

            declarationIndex = j;
            declaration = item;
          }

          if (rulesetIndex < declarationIndex && declaration) {
            error = {
              'ruleId': parser.rule.name,
              'line': declaration.start.line,
              'column': declaration.start.column,
              'message': 'Declarations should come before nestings',
              'severity': parser.severity
            };
            result = helpers.addUnique(result, error);
          }
        });

        rulesetIndex = null;
      }
    });

    return result;
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'empty-args',
  'defaults': {
    'include': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByTypes(['mixin', 'include'], function (item) {
      if (item.contains('arguments')) {
        item.traverse(function (node) {
          if (node.type === 'arguments') {
            if (node.content.length === 0) {
              if (!parser.options.include) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': node.start.line,
                  'column': node.start.column,
                  'message': 'Parenthesis should be removed.',
                  'severity': parser.severity
                });
              }
            }
          }
        });
      } else {
        if (parser.options.include) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': 'Parenthesis are required.',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var counter, syntax;

var findNearestReturnSCSS = function findNearestReturnSCSS(parent, i) {
  var previous, doublePrevious, space;

  if (parent.content[i - 1]) {
    previous = parent.content[i - 1];

    if (i >= 2) {
      doublePrevious = parent.content[i - 2];

      // First check to see that the previous line is not a new line as if it is
      // we don't want to recursively run the function again

      if (!helpers.isEmptyLine(previous.content)) {
        if (doublePrevious.type.indexOf('Comment') !== -1) {
          return findNearestReturnSCSS(parent, i - 1);
        }
      }
    }

    if (i >= 1) {
      if (previous.type.indexOf('Comment') !== -1) {
        return findNearestReturnSCSS(parent, i - 1);
      }

      if (previous.type === 'space') {
        space = helpers.isEmptyLine(previous.content);

        // If there's not a new line and it's the first within the block, ignore
        if (!space && i - 1 === 0) {
          return false;
        }

        return {
          'space': space,
          'previous': previous
        };
      }
    }
  }
  return false;
};

var findNearestReturnSass = function findNearestReturnSass(parent, i) {
  var previous;

  if (parent.content[i - 1]) {
    previous = parent.content[i - 1];

    if (counter === 2) {
      return {
        space: true,
        previous: previous
      };
    }

    if (previous.is('space') || previous.is('declarationDelimiter')) {
      if (helpers.hasEOL(previous.content)) {
        counter++;
      }

      return findNearestReturnSass(parent, i - 1);
    }

    // If ruleset, we must reset the parent to be the previous node and
    // loop through that
    else if (previous.is('ruleset') || previous.is('include')) {
        var previousNode = previous.content[previous.content.length - 1];

        // Set the i parameter for findNearestReturn to be the length of the
        // content array in order to get the last one
        return findNearestReturnSass(previousNode, previousNode.content.length);
      } else {
        counter = 0;

        if (previous.type.indexOf('Comment') !== -1) {

          // If it's the first line
          if (previous.start.line === 1) {
            return {
              space: true,
              previous: previous
            };
          }

          return findNearestReturnSass(parent, i - 1);
        }
      }
  }

  return {
    space: false,
    previous: previous
  };
};

module.exports = {
  'name': 'empty-line-between-blocks',
  'defaults': {
    'include': true,
    'allow-single-line-rulesets': true
  },
  'detect': function detect(ast, parser) {
    var result = [];
    syntax = ast.syntax;

    ast.traverseByType('ruleset', function (node, j, p) {
      var space;

      if (node.start.line === node.end.line && parser.options['allow-single-line-rulesets']) {
        return false;
      }

      if (syntax === 'scss') {
        space = findNearestReturnSCSS(p, j);

        if (space) {
          if (parser.options.include && !space.space && j !== 1) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': space.previous.end.line,
              'column': 1,
              'message': 'Space expected between blocks',
              'severity': parser.severity
            });
          } else if (!parser.options.include && space.space) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': space.previous.end.line,
              'column': 1,
              'message': 'Space not allowed between blocks',
              'severity': parser.severity
            });
          }
        }
      } else if (syntax === 'sass') {
        // Reset the counter for each ruleset
        counter = 0;

        if (node.is('ruleset')) {

          node.forEach('block', function (block, i, parent) {
            var previous;

            // Capture the previous node
            if (parent.content[i - 1]) {
              previous = parent.content[i - 1];
            } else {
              // Else set the block to act as the previous node
              previous = block;
            }

            // If it's a new line, lets go back up to the selector
            if (previous.is('space') && helpers.hasEOL(previous.content)) {
              space = findNearestReturnSass(p, j);
            }
          });
        }

        if (space && space.previous) {
          if (space.previous.start.line !== 1) {
            if (parser.options.include && !space.space) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': space.previous.end.line + 1,
                'column': 1,
                'message': 'Space expected between blocks',
                'severity': parser.severity
              });
            } else if (!parser.options.include && space.space) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': space.previous.end.line + 1,
                'column': 1,
                'message': 'Space not allowed between blocks',
                'severity': parser.severity
              });
            }
          }
        }
      }
      return true;
    });

    return result;
  }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'extends-before-declarations',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [],
        error;

    ast.traverseByType('block', function (block) {
      var lastDeclaration = null;

      block.forEach(function (item, j) {
        if (item.is('include') || item.is('extend')) {
          if (item.contains('atkeyword')) {
            var atkeyword = item.first('atkeyword');

            if (atkeyword.contains('ident')) {
              var ident = atkeyword.first('ident');

              if (ident.content === 'extend') {
                if (j > lastDeclaration && lastDeclaration !== null) {
                  error = {
                    'ruleId': parser.rule.name,
                    'line': item.start.line,
                    'column': item.start.column,
                    'message': 'Extends should come before declarations',
                    'severity': parser.severity
                  };
                  result = helpers.addUnique(result, error);
                }
              }
            }
          }
        }

        if (item.is('declaration')) {
          lastDeclaration = j;
        }
      });
      lastDeclaration = null;
    });

    return result;
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'extends-before-mixins',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('block', function (block) {
      var lastMixin = null;

      block.forEach(function (item, j) {
        if (item.is('include') || item.is('extend')) {
          if (item.contains('atkeyword')) {
            var atkeyword = item.first('atkeyword');

            if (atkeyword.contains('ident')) {
              var ident = atkeyword.first('ident');

              if (ident.content === 'extend') {
                if (j > lastMixin && lastMixin !== null) {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': item.start.line,
                    'column': item.start.column,
                    'message': 'Extends should come before mixins',
                    'severity': parser.severity
                  });
                }
              }
            }
          }
        }

        if (item.is('include')) {
          lastMixin = j;
        }
      });

      lastMixin = null;
    });

    return result;
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

/**
 * Get the 'last' node of the tree to test for an EOL
 *
 * @param {Object} node - The node whose last child we want to return
 * @returns {Object} The last node
 */
var getLastNode = function getLastNode(node) {
  var last = node.last();

  return last ? getLastNode(last) : node;
};

module.exports = {
  'name': 'final-newline',
  'defaults': {
    'include': true
  },
  'detect': function detect(ast, parser) {
    var result = [],
        last,
        error = {
      'ruleId': parser.rule.name,
      'severity': parser.severity
    };

    // If the syntax is Sass we must recursively loop to determine the last node.
    // This is not required for SCSS which will always use the last node in the
    // content of the parent stylesheet node
    if (ast.syntax === 'sass') {
      last = getLastNode(ast);
    } else {
      last = ast.content[ast.content.length - 1];
    }

    if (!last.is('space') && !last.is('declarationDelimiter')) {
      if (parser.options.include) {
        error.line = last.end.line;
        error.column = last.end.column;
        error.message = 'Files must end with a new line';
        result = helpers.addUnique(result, error);
      }
    } else if (last.is('space') || last.is('declarationDelimiter')) {
      if (!helpers.hasEOL(last.content) && parser.options.include) {
        error.line = last.start.line;
        error.column = last.start.column;
        error.message = 'Files must end with a new line';
        result = helpers.addUnique(result, error);
      } else if (helpers.hasEOL(last.content) && !parser.options.include) {
        error.line = last.start.line;
        error.column = last.start.column;
        error.message = 'Files must not end with a new line';
        result = helpers.addUnique(result, error);
      }
    }

    return result;
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0),
    capitalize = __webpack_require__(4),
    kebabcase = __webpack_require__(5);

// Our nestable selector types, separated by type for ease of use with rules
// we replace ident with 'selector' for readability'
var nestableElements = ['selector', 'class', 'id', 'typeSelector', 'parentSelectorExtension'],
    nestableAttributes = ['attributeSelector'],
    nestablePseudo = ['pseudoClass', 'pseudoElement', 'nth', 'nthSelector'];

/**
 * Formats a string from camelCase to hyphens and capitalizes
 * @param {string} str - The string to be formatted
 * @returns {string} A hyphenated and capitalized string
 */
var formatOutput = function formatOutput(str) {
  return capitalize(kebabcase(str));
};

module.exports = {
  'name': 'force-attribute-nesting',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [],
        elements = nestableElements.concat(nestableAttributes, nestablePseudo);

    ast.traverseByType('ruleset', function (ruleset) {

      ruleset.forEach('selector', function (selector) {
        var previousVal;
        selector.forEach(function (item) {
          if (previousVal) {
            if (helpers.isNestable(item.type, previousVal.type, elements, nestableAttributes)) {
              helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': selector.start.line,
                'column': selector.start.column,
                'message': formatOutput(item.type) + ' should be nested within its parent ' + formatOutput(previousVal.type),
                'severity': parser.severity
              });
            }
          }
          previousVal = item;
        });
      });
    });

    return result;
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0),
    capitalize = __webpack_require__(4),
    kebabcase = __webpack_require__(5);

// Our nestable selector types, separated by type for ease of use with rules
// we replace ident with 'selector' for readability'
var nestableElements = ['selector', 'class', 'id', 'typeSelector', 'parentSelectorExtension'],
    nestableAttributes = ['attributeSelector'],
    nestablePseudo = ['pseudoClass', 'pseudoElement', 'nth', 'nthSelector'];

/**
 * Formats a string from camelCase to hyphens and capitalizes
 * @param {string} str - The string to be formatted
 * @returns {string} A hyphenated and capitalized string
 */
var formatOutput = function formatOutput(str) {
  return capitalize(kebabcase(str));
};

module.exports = {
  'name': 'force-element-nesting',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [],
        elements = nestableElements.concat(nestableAttributes, nestablePseudo);

    ast.traverseByType('ruleset', function (ruleset) {
      ruleset.forEach(function (selector) {

        var previousVal;
        selector.forEach(function (item) {
          if (previousVal) {
            if (helpers.isNestable(item.type, previousVal.type, elements, nestableElements)) {
              helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': selector.start.line,
                'column': selector.start.column,
                'message': formatOutput(item.type) + ' should be nested within its parent ' + formatOutput(previousVal.type),
                'severity': parser.severity
              });
            }
          }
          if (!item.is('space')) {
            previousVal = item;
          }
        });
      });
    });

    return result;
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0),
    capitalize = __webpack_require__(4),
    kebabcase = __webpack_require__(5);

// Our nestable selector types, separated by type for ease of use with rules
// we replace ident with 'selector' for readability'
var nestableElements = ['selector', 'class', 'id', 'typeSelector', 'parentSelectorExtension'],
    nestableAttributes = ['attributeSelector'],
    nestablePseudo = ['pseudoClass', 'pseudoElement', 'nth', 'nthSelector'];

/**
 * Formats a string from camelCase to hyphens and capitalizes when not
 * nth related
 * @param {string} str - The string to be formatted
 * @returns {string} A hyphenated (and possibly capitalized) string
 */
var formatOutput = function formatOutput(str) {
  str = kebabcase(str);

  if (str.indexOf('nth') === -1) {
    str = capitalize(str);
  }

  return str;
};

module.exports = {
  'name': 'force-pseudo-nesting',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [],
        elements = nestableElements.concat(nestableAttributes, nestablePseudo);

    ast.traverseByType('ruleset', function (ruleset) {

      ruleset.forEach('selector', function (selector) {
        var previousVal;
        selector.forEach(function (item) {
          if (previousVal) {
            if (helpers.isNestable(item.type, previousVal.type, elements, nestablePseudo)) {
              helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': selector.start.line,
                'column': selector.start.column,
                'message': formatOutput(item.type) + ' should be nested within its parent ' + formatOutput(previousVal.type),
                'severity': parser.severity
              });
            }
          }
          previousVal = item;
        });
      });
    });

    return result;
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Note that this file is nearly identical to mixin-name-format.js, placeholder-name-format.js, and variable-name-format.js


var helpers = __webpack_require__(0);

var whitelist = __webpack_require__(95);

module.exports = {
  'name': 'function-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase',
    'convention-explanation': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('function', function (node) {
      var name = node.first('ident').content,
          strippedName,
          violationMessage = false;

      // ignore functions on whitelist - css3 transforms
      if (whitelist.indexOf(name) !== -1) {
        return;
      }

      strippedName = name;

      if (parser.options['allow-leading-underscore'] && name[0] === '_') {
        strippedName = name.slice(1);
      }

      switch (parser.options.convention) {
        case 'hyphenatedlowercase':
          if (!helpers.isHyphenatedLowercase(strippedName)) {
            violationMessage = 'Function \'' + name + '\' should be written in lowercase with hyphens';
          }
          break;
        case 'camelcase':
          if (!helpers.isCamelCase(strippedName)) {
            violationMessage = 'Function \'' + name + '\' should be written in camelCase';
          }
          break;
        case 'pascalcase':
          if (!helpers.isPascalCase(strippedName)) {
            violationMessage = 'Function \'' + name + '\' should be written in PascalCase';
          }
          break;
        case 'snakecase':
          if (!helpers.isSnakeCase(strippedName)) {
            violationMessage = 'Function \'' + name + '\' should be written in snake_case';
          }
          break;
        case 'strictbem':
          if (!helpers.isStrictBEM(strippedName)) {
            violationMessage = 'Function \'' + name + '\' should be written in BEM (Block Element Modifier) format';
          }
          break;
        case 'hyphenatedbem':
          if (!helpers.isHyphenatedBEM(strippedName)) {
            violationMessage = 'Function \'' + name + '\' should be written in hyphenated BEM (Block Element Modifier) format';
          }
          break;
        default:
          if (!new RegExp(parser.options.convention).test(strippedName)) {
            violationMessage = 'Function \'' + name + '\' should match regular expression /' + parser.options.convention + '/';

            // convention-message overrides violationMessage
            if (parser.options['convention-explanation']) {
              violationMessage = parser.options['convention-explanation'];
            }
          }
      }

      if (violationMessage) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': violationMessage,
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);
var lengths = {
  short: 3,
  long: 6
};
var canShorten = function canShorten(hex) {
  return hex.length === lengths.long && hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5];
};

module.exports = {
  'name': 'hex-length',
  'defaults': {
    'style': 'short'
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('color', function (value) {
      if (parser.options.style === 'short' && canShorten(value.content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': value.start.line,
          'column': value.start.column,
          'message': 'Hex values should use the shorthand format - 3 characters where possible',
          'severity': parser.severity
        });
      } else if (parser.options.style === 'long') {
        if (value.content.length !== lengths.long) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': value.start.line,
            'column': value.start.column,
            'message': 'Hex values should use the long-form format - 6 characters',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'hex-notation',
  'defaults': {
    'style': 'lowercase'
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('color', function (value) {
      if (value.content.match(/[a-z]/i)) {
        if (parser.options.style === 'lowercase') {
          if (!helpers.isLowerCase(value.content)) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': value.start.line,
              'column': value.start.column,
              'message': 'Hex notation should all be lower case',
              'severity': parser.severity
            });
          }
        } else if (parser.options.style === 'uppercase') {
          if (!helpers.isUpperCase(value.content)) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': value.start.line,
              'column': value.start.column,
              'message': 'Hex notation should all be upper case',
              'severity': parser.severity
            });
          }
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'id-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase',
    'convention-explanation': false,
    'ignore': []
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('ruleset', function (ruleset) {
      var selectorAndExtensions = helpers.collectSuffixExtensions(ruleset, 'id');

      selectorAndExtensions.forEach(function (node) {
        var name = node.content,
            strippedName,
            violationMessage = false;

        if (parser.options.ignore.indexOf(name) !== -1) {
          return;
        }

        strippedName = name;

        if (parser.options['allow-leading-underscore'] && name[0] === '_') {
          strippedName = name.slice(1);
        }

        switch (parser.options.convention) {
          case 'hyphenatedlowercase':
            if (!helpers.isHyphenatedLowercase(strippedName)) {
              violationMessage = 'ID \'#' + name + '\' should be written in lowercase with hyphens';
            }
            break;
          case 'camelcase':
            if (!helpers.isCamelCase(strippedName)) {
              violationMessage = 'ID \'#' + name + '\' should be written in camelCase';
            }
            break;
          case 'pascalcase':
            if (!helpers.isPascalCase(strippedName)) {
              violationMessage = 'ID \'#' + name + '\' should be written in PascalCase';
            }
            break;
          case 'snakecase':
            if (!helpers.isSnakeCase(strippedName)) {
              violationMessage = 'ID \'#' + name + '\' should be written in snake_case';
            }
            break;
          default:
            if (!new RegExp(parser.options.convention).test(strippedName)) {
              violationMessage = 'ID \'#' + name + '\' should match regular expression /' + parser.options.convention + '/';

              // convention-message overrides violationMessage
              if (parser.options['convention-explanation']) {
                violationMessage = parser.options['convention-explanation'];
              }
            }
        }

        if (violationMessage) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': violationMessage,
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'indentation',
  'defaults': {
    'size': 2
  },
  'detect': function detect(ast, parser) {
    var result = [],
        inAtRule = false,
        inProps = false,
        inBlock = false,
        lintSize = parser.options.size,
        lintType = 'space',
        plural = '',
        detected = [lintType];

    // Prepare to check for mixed spaces or tabs depending on what the user has specified
    if (parser.options.size === 'tab') {
      lintSize = 1;
      lintType = 'tab';
      detected[0] = lintType;
    }

    var processNode = function processNode(node, level) {
      var i, n, prevNode, nextNode, sassNextNode, reportNode, reportCondition, space, spaceLength, newlineLength, spaceCount, tabCount, mixedWarning;

      level = level || 0;

      if (node.is('braces')) {
        return;
      }

      for (i = 0; i < node.length; i++) {
        n = node.get(i);
        prevNode = node.get(i - 1);
        nextNode = node.get(i + 1) || false;
        // Due to the Sass structure in gonzales we sometimes need to check 2 ahead
        sassNextNode = node.get(i + 2) || false;
        reportNode = null;

        if (!n) {
          continue;
        }

        if (n.syntax === 'scss') {
          if (n.type === 'space') {

            // Test for CRLF first, since it includes LF
            space = n.content.lastIndexOf('\r\n');
            newlineLength = 2;

            if (space === -1) {
              // Test for LF
              space = n.content.lastIndexOf('\n');
              newlineLength = 1;
            }

            if (space >= 0) {
              // Check how many spaces or tabs we have and set our plural character if necessary for
              // our lint reporting message
              spaceLength = n.content.slice(space + newlineLength).length;
              spaceCount = n.content.slice(space + newlineLength).match(/ /g);
              tabCount = n.content.slice(space + newlineLength).match(/\t/g);
              plural = level > 1 ? 's' : '';
              reportNode = nextNode;
              reportCondition = i !== node.length - 1;
            }
          }
        } else if (n.syntax === 'sass') {
          if (n.is('declarationDelimiter') || helpers.isNewLine(n)) {
            // Due to the way gonzales handles line endings in Sass we don't care if it's CRLF or just LF
            if (nextNode && nextNode.is('space') && nextNode.content.indexOf('\n') === -1) {
              spaceLength = nextNode.content.length;
              spaceCount = nextNode.content.match(/ /g);
              tabCount = nextNode.content.match(/\t/g);
              plural = level > 1 ? 's' : '';

              // if we're at the end of a block we want to drop the level here for Sass
              if (!node.get(i + 2)) {
                level--;
              }

              reportNode = sassNextNode;
              reportCondition = true;
            }
          }
          // Check all the spaces in Sass that aren't newlines
          else if (helpers.isSpace(n)) {
              // This is a special condition for the first property in a block with Sass as it usually
              // doesn't have a previous node before the space appears so we need to check this is
              // valid and then we can rely on the declarationDelimiter check above.
              if (inBlock && (!prevNode || prevNode.is('space'))) {
                inBlock = false;
                spaceLength = n.content.length;
                spaceCount = n.content.match(/ /g);
                tabCount = n.content.match(/\t/g);
                plural = level > 1 ? 's' : '';
                reportNode = nextNode;
                reportCondition = true;
              }
              // A extra check for tabs when using spaces as single tab characters aren't highlighted
              // as mixed spaces and tabs without this. Spaces on the other hand are fine. Gonzales
              // reports them a little differently.
              else if (n.type === 'space' && lintType === 'space') {
                  tabCount = n.content.match(/\t/g);
                  reportNode = nextNode;
                  // we dont want to check the lint levels here as it could be a tab between a prop and
                  // value, totally unrealistic I know but we still want to report it.
                  reportCondition = false;
                }
            }
        }
        if (reportNode) {
          // if we've encountered a space check if we have before if not save a reference
          if (spaceCount !== null && detected.indexOf('space') === -1) {
            detected.push('space');
          }

          // if we've encountered a tab check if we have before if not save a reference
          if (tabCount !== null && detected.indexOf('tab') === -1) {
            detected.push('tab');
          }

          if (detected.length > 1) {
            // Indicates we've told the user about mixed tabs and spaces in their file
            mixedWarning = true;
            // Remove the last detected type from our detected array,
            // if we encounter a mix again we'll output again but all the while keep a reference
            // to the first space character (tab or space) that we encountered so as to be
            // consistent with our warnings
            detected.pop();
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': reportNode.start.line,
              'column': reportNode.start.column,
              'message': 'Mixed tabs and spaces',
              'severity': parser.severity
            });
          }
          if (reportCondition && !mixedWarning && spaceLength / lintSize !== level) {
            // Check if expected indentation matches what it should be
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': reportNode.start.line,
              'column': reportNode.start.column,
              'message': 'Expected indentation of ' + level * lintSize + ' ' + lintType + plural + ' but found ' + spaceLength + '.',
              'severity': parser.severity
            });
          }
          mixedWarning = false;
        }
        // if we're in an atrule make we need to possibly handle multiline arguments
        if (n.is('atrule') && n.contains('block')) {
          inAtRule = true;
          inBlock = false;
        }

        // if a delimeter is encountered we check if it's directly after a parenthesis node
        // if it is we know next node will be the same level of indentation
        if (n.is('operator')) {
          if (n.content === ',' && prevNode.is('parentheses') && helpers.isNewLine(nextNode)) {
            if (inAtRule && !inProps) {
              level++;
              inProps = true;
            } else if (!inProps) {
              level--;
            }
          }
        }

        // if a block node is encountered we first check to see if it's within an include/function
        // by checking if the node also contains arguments, if it does we skip the block as we add a level
        // for arguments anyway. If not the the block is a usual ruleset block and should be treated accordingly
        // The other checks are kept from 1.0 and work for their respective types.
        if (n.is('block') && !node.contains('arguments') || n.is('arguments') || n.is('parentheses') && !node.is('atrule')) {
          level++;
        }

        if (n.is('block')) {
          inAtRule = false;
          inProps = false;
          inBlock = true;
        }
        processNode(n, level);
      }
    };

    processNode(ast);
    return result;
  }
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var leadingZeroRegex = /^0\.\d+$/,
    noLeadingZeroRegex = /^\.\d+$/;

module.exports = {
  'name': 'leading-zero',
  'defaults': {
    'include': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('number', function (num) {
      if (num.content.match(/^-?(0?\.\d+)/)) {
        if (num.content.match(leadingZeroRegex)) {
          if (!parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': num.start.line,
              'column': num.start.column,
              'message': 'Don\'t include leading zeros on numbers',
              'severity': parser.severity
            });
          }
        }
        if (num.content.match(noLeadingZeroRegex)) {
          if (parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': num.start.line,
              'column': num.start.column - 1,
              'message': 'Include leading zeros on numbers',
              'severity': parser.severity
            });
          }
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'max-file-line-count',
  'defaults': {
    length: 300
  },
  'detect': function detect(ast, parser) {
    var result = [];

    if (ast.end.line > parser.options.length) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': ast.end.line,
        'column': 0,
        'message': 'This file has ' + ast.end.line + ' lines, which exceeds the maximum of ' + parser.options.length + ' lines allowed.',
        'severity': parser.severity
      });
    }

    return result;
  }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'max-line-length',
  'defaults': {
    length: 80
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('space', function (space) {
      var lineLength = 0;
      if (helpers.hasEOL(space.content)) {
        lineLength = space.start.column - 1;
      }

      if (lineLength > parser.options.length) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'severity': parser.severity,
          'line': space.start.line,
          'column': 0,
          'message': 'line ' + space.start.line + ' exceeds the maximum line length of ' + parser.options.length
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'mixin-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase',
    'convention-explanation': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByTypes(['mixin', 'include'], function (node) {
      var name,
          strippedName,
          violationMessage = false;

      if (node.is('mixin')) {
        if (node.contains('ident')) {
          name = node.first('ident').content;
        }
      } else {
        // We're not linting extends here
        if (node.contains('atkeyword')) {
          if (node.first('atkeyword').contains('ident')) {
            if (node.first('atkeyword').first('ident').content === 'extend') {
              return false;
            }
          }
        }

        if (node.contains('ident')) {
          name = node.first('ident').content;
        }
      }

      if (name) {
        strippedName = name;

        if (parser.options['allow-leading-underscore'] && name[0] === '_') {
          strippedName = name.slice(1);
        }

        switch (parser.options.convention) {
          case 'hyphenatedlowercase':
            if (!helpers.isHyphenatedLowercase(strippedName)) {
              violationMessage = 'Mixin \'' + name + '\' should be written in lowercase with hyphens';
            }
            break;
          case 'camelcase':
            if (!helpers.isCamelCase(strippedName)) {
              violationMessage = 'Mixin \'' + name + '\' should be written in camelCase';
            }
            break;
          case 'pascalcase':
            if (!helpers.isPascalCase(strippedName)) {
              violationMessage = 'Mixin \'' + name + '\' should be written in PascalCase';
            }
            break;
          case 'snakecase':
            if (!helpers.isSnakeCase(strippedName)) {
              violationMessage = 'Mixin \'' + name + '\' should be written in snake_case';
            }
            break;
          case 'strictbem':
            if (!helpers.isStrictBEM(strippedName)) {
              violationMessage = 'Mixin \'' + name + '\' should be written in BEM (Block Element Modifier) format';
            }
            break;
          case 'hyphenatedbem':
            if (!helpers.isHyphenatedBEM(strippedName)) {
              violationMessage = 'Mixin \'' + name + '\' should be written in hyphenated BEM (Block Element Modifier) format';
            }
            break;
          default:
            if (!new RegExp(parser.options.convention).test(strippedName)) {
              violationMessage = 'Mixin \'' + name + '\' should match regular expression /' + parser.options.convention + '/';

              // convention-message overrides violationMessage
              if (parser.options['convention-explanation']) {
                violationMessage = parser.options['convention-explanation'];
              }
            }
        }

        if (violationMessage) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': violationMessage,
            'severity': parser.severity
          });
        }
      }
      return true;
    });

    return result;
  }
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'mixins-before-declarations',
  'defaults': {
    'exclude': ['breakpoint', 'mq']
  },
  'detect': function detect(ast, parser) {
    var result = [],
        error;

    ast.traverseByType('include', function (node, i, parent) {
      var depth = 0,
          declarationCount = [depth];

      parent.forEach(function (item) {
        if (item.is('ruleset')) {
          depth++;
          declarationCount[depth] = 0;
        } else if (item.is('declaration')) {
          if (item.first().is('property')) {
            var prop = item.first();

            if (prop.first().is('ident')) {
              declarationCount[depth]++;
            }
          }
        } else if (item.is('include')) {
          item.forEach('ident', function (name) {
            if (parser.options.exclude.indexOf(name.content) === -1 && declarationCount[depth] > 0) {
              error = {
                'ruleId': parser.rule.name,
                'line': item.start.line,
                'column': item.start.column,
                'message': 'Mixins should come before declarations',
                'severity': parser.severity
              };
              result = helpers.addUnique(result, error);
            }
          });
        }
      });
    });
    return result;
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'nesting-depth',
  'defaults': {
    'max-depth': 2
  },
  'detect': function detect(ast, parser) {
    var result = [],
        nodes = {},
        depth = 0;

    var recursiveSearch = function recursiveSearch(node) {
      if (node.contains('block')) {
        node.forEach('block', function (block) {
          if (block.contains('ruleset')) {
            depth++;
            block.forEach('ruleset', function (ruleset) {
              var selector = ruleset.first('selector');

              if (depth > parser.options['max-depth']) {
                var nodeLineColumn = selector.start.line + ':' + selector.start.column;

                if (nodes[nodeLineColumn]) {
                  if (depth > nodes[nodeLineColumn].depth) {
                    nodes[nodeLineColumn].depth = depth;
                  }
                } else {
                  nodes[nodeLineColumn] = {
                    'line': selector.start.line,
                    'column': selector.start.column,
                    'depth': depth
                  };
                }
              } else {
                recursiveSearch(ruleset);
              }
            });
          }
        });
      }
      depth--;
    };

    ast.traverseByType('selector', function (selector, i, parent) {
      recursiveSearch(parent);
      depth = 0;
    });

    Object.keys(nodes).forEach(function (node) {
      node = nodes[node];
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': node.line,
        'column': node.column,
        'message': 'Nesting depth ' + node.depth + ' greater than max of ' + parser.options['max-depth'],
        'severity': parser.severity
      });
    });

    return result;
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-attribute-selectors',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('attributeSelector', function (item) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': item.start.line,
        'column': item.start.column,
        'message': 'Attribute selectors are not allowed',
        'severity': parser.severity
      });
    });

    return result;
  }
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-color-hex',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('color', function (value) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': value.start.line,
        'column': value.start.column,
        'message': 'Hexadecimal colors should not be used',
        'severity': parser.severity
      });
    });
    return result;
  }
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var cssColors = __webpack_require__(7);

/**
 * Checks if a node's parent is a valid type as we dont want to apply
 * this rule to function names or variable names
 *
 * @param {Object} node - The parent node to test
 * @returns {boolean} Whether the node is a valid type or not
 */
var checkValidParentType = function checkValidParentType(node) {
  if (node) {
    return node.type === 'function' || node.type === 'variable';
  }

  return false;
};

module.exports = {
  'name': 'no-color-keywords',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('value', function (node) {
      node.traverse(function (elem, i, parent) {
        if (elem.type === 'ident' && !checkValidParentType(parent)) {
          var index = cssColors.indexOf(elem.content.toLowerCase());

          if (index !== -1) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': elem.start.line,
              'column': elem.start.column,
              'message': 'Color \'' + elem.content + '\' should be written in its hexadecimal form #' + cssColors[index + 1],
              'severity': parser.severity
            });
          }
        }
      });
    });
    return result;
  }
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var colorFunctions = ['rgb', 'rgba', 'hsl', 'hsla'],
    cssColors = __webpack_require__(7);

/**
 * Returns a copy of the colour functions array
 *
 * @param {Array} colorFunctionsArr - The color functions array we wish to clone
 * @returns {Array} A copy of the color functions array.
 */
var getColorFunctionsCopy = function getColorFunctionsCopy(colorFunctionsArr) {
  return colorFunctionsArr.slice();
};

/**
 * Checks if the next node along is an operator of type ':'
 *
 * @param {Object} parent - The parent node
 * @param {number} i - The current child position in the parent node
 * @returns {boolean} If the sibling node is the correct type of operator
 */
var checkNextIsOperator = function checkNextIsOperator(parent, i) {
  var next = parent.content[i + 1] && parent.content[i + 1].type === 'operator' && parent.content[i + 1].content === ':';
  var spacedNext = parent.content[i + 2] && parent.content[i + 2].type === 'operator' && parent.content[i + 2].content === ':';

  return next || spacedNext;
};

/**
 * Check nested function arguments for colors/idents or further nested functions
 *
 * @param {Object} node - The node we're checking
 * @returns {boolean} Whether the node matches the specified types
 */
var checkForNestedFuncArgs = function checkForNestedFuncArgs(node) {
  return node.type === 'color' || node.type === 'ident' || node.type === 'function';
};

/**
 * Check if the value is a color literal
 *
 * @param {Object} node - The node we're checking
 * @param {Array} validColorFunctions - The array of valid color function types to check against
 * @returns {boolean} Whether the node matches the specified types
 */
var checkIsLiteral = function checkIsLiteral(node, validColorFunctions) {
  return cssColors.indexOf(node.content) !== -1 || helpers.isValidHex(node.content) || validColorFunctions.indexOf(node.content) !== -1;
};

/**
 * Checks the see if the node type is a hex value if so return the correct prefix
 *
 * @param {String} nodeType - The node type identifier
 * @returns {String} Either a '#' or an empty string
 */
var checkHexPrefix = function checkHexPrefix(nodeType) {
  return nodeType === 'color' ? '#' : '';
};

module.exports = {
  'name': 'no-color-literals',
  'defaults': {
    'allow-map-identifiers': true,
    'allow-rgba': false,
    'allow-variable-identifiers': true
  },
  'detect': function detect(ast, parser) {
    var result = [],
        validColorFunctions = getColorFunctionsCopy(colorFunctions);

    if (parser.options['allow-rgba'] && validColorFunctions.indexOf('rgba') !== -1) {
      validColorFunctions.splice(validColorFunctions.indexOf('rgba'), 1);
    }

    ast.traverseByTypes(['value', 'variable'], function (node, i, parent) {

      // If we don't literals as variable names then check each variable name
      if (node.is('variable') && !parser.options['allow-variable-identifiers']) {
        if (cssColors.indexOf(node.content[0].content) !== -1) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'Color literals should not be used as variable names',
            'severity': parser.severity
          });
        }
      }
      // check the value nodes
      else if (node.is('value')) {
          node.forEach(function (valElem) {
            var declarationType = parent.content[0].content[0].type;
            // check type is color, content isn't a css color literal
            if (valElem.type === 'color' || cssColors.indexOf(valElem.content) !== -1) {
              if (declarationType === 'ident') {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': valElem.start.line,
                  'column': valElem.start.column,
                  'message': 'Color literals such as \'' + checkHexPrefix(valElem.type) + valElem.content + '\' should only be used in variable declarations',
                  'severity': parser.severity
                });
              }
            }

            // if not a color value or a variable then check if it's a function
            else if (valElem.type === 'function') {
                var funcType = valElem.content[0].content;

                // check it's not a blacklisted color function and even if it is that it's not assigned to a variable
                if (validColorFunctions.indexOf(funcType) !== -1 && declarationType !== 'variable') {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': valElem.start.line,
                    'column': valElem.start.column,
                    'message': 'Color functions such as \'' + funcType + '\' should only be used in variable declarations',
                    'severity': parser.severity
                  });
                }

                // if rgba usage is allowed we need to make sure only variables are being passed to it.
                else if (parser.options['allow-rgba'] && funcType === 'rgba' && valElem.content[1].content[0].type !== 'variable' && declarationType !== 'variable') {
                    result = helpers.addUnique(result, {
                      'ruleId': parser.rule.name,
                      'line': valElem.start.line,
                      'column': valElem.start.column,
                      'message': 'A color in variable form must be passed to rgba, literals are restricted',
                      'severity': parser.severity
                    });
                  }

                  // if a non color function we should check its arguments
                  else {
                      valElem.content.forEach(function (funcContent) {
                        if (funcContent.type === 'arguments') {
                          funcContent.forEach(function (funcArgs) {
                            // if the arguments are not functions themselves
                            if (funcArgs.type !== 'function') {
                              // check if the argument types are therefore color literals
                              if ((funcArgs.type === 'color' || funcArgs.type === 'ident') && (cssColors.indexOf(funcArgs.content) !== -1 || helpers.isValidHex(funcArgs.content))) {
                                result = helpers.addUnique(result, {
                                  'ruleId': parser.rule.name,
                                  'line': funcArgs.start.line,
                                  'column': funcArgs.start.column,
                                  'message': 'Color literals such as \'' + checkHexPrefix(funcArgs.type) + funcArgs.content + '\' should not be passed to functions, use variables',
                                  'severity': parser.severity
                                });
                              }
                            }

                            // if the argument is a function itself
                            else {
                                // loop its arguments
                                funcArgs.forEach(function (nestedFuncArgs) {
                                  // check again for color literals or blacklisted color functions
                                  if (checkForNestedFuncArgs(nestedFuncArgs) && checkIsLiteral(nestedFuncArgs, validColorFunctions)) {
                                    result = helpers.addUnique(result, {
                                      'ruleId': parser.rule.name,
                                      'line': nestedFuncArgs.start.line,
                                      'column': nestedFuncArgs.start.column,
                                      'message': 'Color functions such as \'' + nestedFuncArgs.content + '\' should not be passed to functions, use variables',
                                      'severity': parser.severity
                                    });
                                  }
                                });
                              }
                          });
                        }
                      });
                    }
              }

              // if not allowing literals as map identifiers check to see if the property names
              // are the same as color literals - this is bad
              else if (valElem.type === 'parentheses' && !parser.options['allow-map-identifiers']) {
                  valElem.traverse(function (mapVals, idx, mapValsParent) {
                    // check if the parent is a variable to allow variables named after CSS colors, e.g. `$black`
                    if (mapVals.type === 'ident' && checkNextIsOperator(mapValsParent, idx) && cssColors.indexOf(mapVals.content) !== -1) {
                      result = helpers.addUnique(result, {
                        'ruleId': parser.rule.name,
                        'line': mapVals.start.line,
                        'column': mapVals.start.column,
                        'message': 'Color literals should not be used as map identifiers',
                        'severity': parser.severity
                      });
                    }
                  });
                }
          });
        }
    });
    return result;
  }
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

/**
 * Check if it's an exception (combinator or a parent selector before or after a space)
 *
 * @param {Object} node - The node to check
 * @param {Object} next - The next node
 * @param {Object} previous - The previous node
 * @returns {Boolean} True if exception
 */
var isException = function isException(node, next, previous) {
  if (node.is('space')) {
    if (next && next.is('combinator') || next.is('parentSelector')) {
      return true;
    }

    if (previous && previous.is('combinator') || previous.is('parentSelector')) {
      return true;
    }
  }

  return false;
};

module.exports = {
  'name': 'no-combinators',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('selector', function (selector) {
      selector.forEach(function (item, i) {
        var previous = selector.content[i - 1] || false,
            next = selector.content[i + 1] || false;

        if (isException(item, next, previous)) {
          return false;
        }

        if (item.is('combinator') || item.is('space')) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': 'Combinators are not allowed',
            'severity': parser.severity
          });
        }
        return false;
      });
    });

    return result;
  }
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-css-comments',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('multilineComment', function (node) {
      if (node.content.charAt(0) !== '!') {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Multiline style comments should not be used',
          'severity': parser.severity
        });
      }
    });
    return result;
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-debug',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('atkeyword', function (keyword) {
      keyword.traverse(function (item) {
        if (item.content === 'debug') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': '@debug not allowed',
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-disallowed-properties',
  'defaults': {
    'properties': []
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('property', function (node) {
      var first = node.first();
      if (!first.is('ident') || parser.options.properties.indexOf(first.content) === -1) {
        return;
      }
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': node.start.line,
        'column': node.start.column,
        'message': 'Property `' + first.content + '` should not be used',
        'severity': parser.severity
      });
    });
    return result;
  }
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);
var selectorHelpers = __webpack_require__(1);

module.exports = {
  'name': 'no-duplicate-properties',
  'defaults': {
    'exclude': []
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('block', function (block) {
      var properties = [],
          items = [],
          warnMessage = false;

      block.eachFor('declaration', function (declaration) {
        items.push(declaration);
      });

      items.reverse();

      items.forEach(function (declaration) {
        warnMessage = false;

        declaration.eachFor('property', function (item) {
          var property = '';

          // Check if declaration is actually a variable declaration
          if (item.content[0] && item.content[0].is('variable')) {
            return;
          }

          item.forEach(function (subItem) {
            // Although not a selector the method here helps us construct the proper property name
            // taking into account any interpolation etc
            property += selectorHelpers.constructSelector(subItem);
          });

          if (properties.indexOf(property) !== -1 && properties.length >= 1) {
            if (parser.options.exclude.indexOf(property) !== -1 && properties[properties.length - 1] !== property) {
              warnMessage = 'Excluded duplicate properties must directly follow each other.';
            } else if (parser.options.exclude.indexOf(property) === -1) {
              warnMessage = 'Duplicate properties are not allowed within a block';
            }
          }

          properties.push(property);

          if (warnMessage) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': item.start.line,
              'column': item.start.column,
              'message': warnMessage,
              'severity': parser.severity
            });
          }
        });
      });
    });

    return result;
  }
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-empty-rulesets',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('block', function (block) {
      var nonSpaceCount = 0,
          empty = false;

      if (block.content.length === 0) {
        empty = true;
      } else {
        block.traverse(function (item) {
          if (!helpers.isEqual(block, item)) {
            if (item.type !== 'space') {
              nonSpaceCount++;
            }
          }
        });
        if (nonSpaceCount === 0) {
          empty = true;
        }
      }

      if (empty) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'severity': parser.severity,
          'line': block.start.line,
          'column': block.start.column,
          'message': 'No empty blocks allowed'
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-extends',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('atkeyword', function (keyword) {
      keyword.traverse(function (item) {
        if (item.content === 'extend') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': '@extend not allowed',
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-ids',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('id', function (id) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': id.start.line,
        'column': id.start.column,
        'message': 'ID selectors not allowed',
        'severity': parser.severity
      });
    });

    return result;
  }
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-important',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('important', function (item) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': item.start.line,
        'column': item.start.column,
        'message': '!important not allowed',
        'severity': parser.severity
      });
    });

    return result;
  }
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-invalid-hex',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('color', function (value) {
      if (!helpers.isValidHex(value.content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': value.start.line,
          'column': value.start.column,
          'message': 'Hexadecimal values must be a valid format',
          'severity': parser.severity
        });
      }
    });
    return result;
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0),
    selectorHelpers = __webpack_require__(1);

var mergeableNodes = ['atrule', 'include', 'ruleset'],
    validAtRules = ['media'],
    curLevel = 0,
    curSelector = [],
    parentSelector = [],
    selectorList = [],
    syntax = '';

/**
 * Traverses a block and calls our callback function for each block encountered
 *
 * @param {object} block - The current node / part of our selector
 * @param {object} cb - The callback function we wish to apply to each block
 * @returns {undefined}
 */
var traverseBlock = function traverseBlock(block, cb) {
  block.forEach(function (contentItem) {
    cb(contentItem);
  });
};

/**
 * Traverses a block and calls our callback function for each block encountered
 *
 * @param {string} ruleSet - The current selector
 * @param {boolean} isAtRule - Whether the ruleSet is an atRule
 * @param {string} line - The line that the ruleset starts
 * @param {string} col - The column that the ruleset starts
 * @returns {undefined}
 */
var updateList = function updateList(ruleSet, isAtRule, line, col) {
  parentSelector[curLevel] = ruleSet;
  curSelector = {
    selector: helpers.stripLastSpace(parentSelector.join('')),
    line: line,
    column: col
  };
  if (!isAtRule) {
    selectorList.push(curSelector);
  }
};

/**
 * Checks a rulesets contents for selectors and calls our consstructSelector method
 *
 * @param {object} ruleNode - The current node / part of our selector
 * @returns {undefined}
 */
var checkRuleset = function checkRuleset(ruleNode) {
  var ruleSet = '';
  ruleNode.forEach(function (ruleNodeItem) {
    if (!ruleNodeItem.is('block')) {
      if (ruleNodeItem.is('selector')) {
        ruleNodeItem.forEach(function (selectorContent) {
          ruleSet += selectorHelpers.constructSelector(selectorContent);
        });
      } else if (ruleNodeItem.is('delimiter') || ruleNodeItem.is('space')) {
        ruleSet += selectorHelpers.constructSelector(ruleNodeItem);
      }
    }
  });
  if (ruleSet !== '') {
    updateList(ruleSet, false, ruleNode.start.line, ruleNode.start.column);
  }
};

/**
 * Checks an atRule contents for selectors and calls our consstructSelector method
 *
 * @param {object} atRule - The current node / atRule part of our selector
 * @returns {undefined}
 */
var checkAtRule = function checkAtRule(atRule) {
  var test = '';
  atRule.forEach(function (atRuleItem) {
    if (!atRuleItem.is('block')) {
      test += selectorHelpers.constructSelector(atRuleItem);
    }
  });
  updateList(test, true, atRule.start.line, atRule.start.column);
};

/**
 * Checks an atRule to see if if it's part of our mergeable at rule list.
 * It also checks for Sass syntax as gonzales currently has issues with the syntax
 *
 * @param {object} node - The current node / atRule part of our selector
 * @returns {boolean} Whether this atRule should be merged or not
 */
var isMergeableAtRule = function isMergeableAtRule(node) {
  var isMergeable = false;
  node.forEach(function (item) {
    // TODO Check back when Gonzales updates to fix this
    // Gonzales has issues with nest levels in media queries :(
    if (item.is('atkeyword') && validAtRules.indexOf(item.first('ident').content) !== -1 && syntax !== 'sass') {
      isMergeable = true;
    }
  });

  return isMergeable;
};

/**
 * Checks if a node contains a block and if so calls our traverseBlock method. Also
 * handles our current level counter.
 *
 * @param {object} node - The current node / atRule part of our selector
 * @param {object} cb - The callback function we wish to pass through
 * @returns {undefined}
 */
var checkForBlock = function checkForBlock(node, cb) {
  if (node.contains('block')) {
    curLevel += 1;
    node.forEach('block', function (block) {
      traverseBlock(block.content, cb);
    });
    curLevel -= 1;
    parentSelector.pop();
  }
};

/**
 * Traverses a node and checks for rulesets and at rules and then fires off to the
 * respective method for them to be handled
 *
 * @param {object} node - The current node / atRule part of our selector
 * @returns {undefined}
 */
var traverseNode = function traverseNode(node) {
  if (mergeableNodes.indexOf(node.type) !== -1) {
    if (node.is('ruleset')) {
      checkRuleset(node);
      checkForBlock(node, traverseNode);
    } else if (node.is('atrule')) {
      if (isMergeableAtRule(node)) {
        checkAtRule(node);
        checkForBlock(node, traverseNode);
      }
    }
  }
};

/**
 * Checks our selector list for mergeable selectors and reports errors where needed
 *
 * @param {object} parser - The parser object
 * @returns {array} Array of result objects
 */
var checkMergeable = function checkMergeable(parser) {
  var result = [];
  selectorList.forEach(function (item, index, arr) {
    var pos = helpers.propertySearch(arr, item.selector, 'selector');
    if (pos !== index && parser.options.whitelist.indexOf(item.selector) === -1) {
      result = helpers.addUnique(result, {
        'ruleId': parser.rule.name,
        'line': item.line,
        'column': item.column,
        'message': 'Rule `' + item.selector + '` should be merged with the rule on line ' + selectorList[pos].line,
        'severity': parser.severity
      });
    }
  });
  return result;
};

module.exports = {
  'name': 'no-mergeable-selectors',
  'defaults': {
    'whitelist': []
  },
  'detect': function detect(ast, parser) {
    curLevel = 0;
    curSelector = [];
    parentSelector = [];
    selectorList = [];
    syntax = ast.syntax;
    ast.traverseByType('stylesheet', function (styleSheet) {
      traverseBlock(styleSheet, traverseNode);
    });
    return checkMergeable(parser);
  }
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var properties = __webpack_require__(3);

/**
 * Combine the valid property array and the array of extras into a new array
 *
 * @param {Array} props - The list of default valid properties
 * @param {Array} extras - The user specified list of valid properties
 * @returns {Array} Combined list
 */
var getCombinedList = function getCombinedList(props, extras) {
  return props.concat(extras);
};

module.exports = {
  'name': 'no-misspelled-properties',
  'defaults': {
    'extra-properties': []
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('property', function (node) {
      if (node.first().is('ident')) {
        var curProperty = node.first().content,
            propertyList = getCombinedList(properties, parser.options['extra-properties']);

        if (curProperty.charAt(0) === '-') {
          curProperty = helpers.stripPrefix(curProperty);
        }

        if (helpers.isPartialStringMatch(curProperty, propertyList)) {
          return false;
        }

        if (curProperty.length > 0) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'Property `' + curProperty + '` appears to be spelled incorrectly',
            'severity': parser.severity
          });
        }
      }

      return false;
    });

    return result;
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-qualifying-elements',
  'defaults': {
    'allow-element-with-attribute': false,
    'allow-element-with-class': false,
    'allow-element-with-id': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('selector', function (selector) {
      selector.forEach(function (item, i) {
        if (item.is('attributeSelector') || item.is('class') || item.is('id')) {
          var previous = selector.content[i - 1] || false;

          if (previous && previous.is('typeSelector')) {
            if (previous.contains('ident')) {
              var type = null;

              if (item.is('attributeSelector')) {
                type = 'attribute';
              }

              if (item.is('class')) {
                type = 'class';
              }

              if (item.is('id')) {
                type = 'id';
              }

              if (type && !parser.options['allow-element-with-' + type]) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': item.start.line,
                  'column': item.start.column,
                  'message': 'Qualifying elements are not allowed for ' + type + ' selectors',
                  'severity': parser.severity
                });
              }
            }
          }
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-trailing-whitespace',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];
    var trailing = /( |\t)+\n/;
    var trailingCRLF = /( |\t)+\r\n/;

    ast.traverseByType('space', function (space, i, parent) {
      var content = space.content;
      var nextIndex = i + 1;
      var next = parent.content[nextIndex];

      while (next && (next.is('space') || next.is('declarationDelimiter'))) {
        content += next.content;
        nextIndex++;
        next = parent.content[nextIndex];
      }

      if (trailing.test(content) || trailingCRLF.test(content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'severity': parser.severity,
          'line': space.start.line,
          'column': space.start.column,
          'message': 'No trailing whitespace allowed'
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var trailingZeroRegex = /^(\d+\.|\.)+(\d*?)0+$/;

module.exports = {
  'name': 'no-trailing-zero',
  'defaults': {
    'include': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('number', function (num) {

      if (num.content.match(trailingZeroRegex)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': num.start.line,
          'column': num.start.column,
          'message': 'Don\'t include trailing zeros on numbers',
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-transition-all',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('declaration', function (declaration) {

      if (declaration.first('property')) {
        if (declaration.first('property').first('ident')) {
          var propertyName = declaration.first('property').first('ident').content;

          if (propertyName.charAt(0) === '-') {
            propertyName = helpers.stripPrefix(propertyName);
          }

          if (propertyName === 'transition' || propertyName === 'transition-property') {
            declaration.forEach('value', function (val) {
              val.forEach('ident', function (ident) {
                if (ident.content === 'all') {
                  result = helpers.addUnique(result, {
                    'ruleId': parser.rule.name,
                    'line': declaration.start.line,
                    'column': declaration.start.column,
                    'message': 'The keyword `all` should not be used with the property `' + propertyName + '`',
                    'severity': parser.severity
                  });
                }
              });
            });
          }
        }
      }
    });
    return result;
  }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-universal-selectors',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('typeSelector', function (typeSelector) {
      typeSelector.traverse(function (item) {
        if (item.is('ident') && item.content === '*') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': '* (universal) selectors are not allowed',
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0),
    url = __webpack_require__(93);

module.exports = {
  'name': 'no-url-domains',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('uri', function (uri) {
      uri.traverse(function (item) {
        if (item.is('string')) {
          var stripped = helpers.stripQuotes(item.content),
              parsedUrl = url.parse(stripped, false, true);

          if (parsedUrl.host && parsedUrl.protocol !== 'data:') {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'severity': parser.severity,
              'line': item.end.line,
              'column': item.end.column,
              'message': 'Domains in URLs are disallowed'
            });
          }
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var isUrlRegex = /^(https?:)?\/\//,
    protocolRelativeRegex = /^(https?:)\/\//;

module.exports = {
  'name': 'no-url-protocols',
  'defaults': {
    'allow-protocol-relative-urls': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('uri', function (uri) {
      uri.traverse(function (item) {
        if (item.is('string')) {
          var stripped = helpers.stripQuotes(item.content),
              regexSelector = !parser.options['allow-protocol-relative-urls'] ? isUrlRegex : protocolRelativeRegex,
              message = !parser.options['allow-protocol-relative-urls'] ? 'Protocols and domains in URLs are disallowed' : 'Protocols in URLS are disallowed';

          if (stripped.match(regexSelector)) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'severity': parser.severity,
              'line': item.end.line,
              'column': item.end.column,
              'message': message
            });
          }
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var properties = __webpack_require__(3),
    prefixes = ['webkit', 'moz', 'ms'];

/**
 * Returns a copy of the prefixes array so that it can be safely modified
 *
 * @param {Array} prefixArr - The array of prefixes
 * @returns {Array} A copy of the prefixes array
 */
var getPrefixCopy = function getPrefixCopy(prefixArr) {
  return prefixArr.slice();
};

/**
 * Removes specified vendor prefixes from the prefixes array
 *
 * @param {Array} prefixArr - The array of prefixes
 * @param {Array} excludes - An array of prefixes to exclude
 * @returns {Array} The prefixes array minus any excluded prefixes
 */
var handleExcludes = function handleExcludes(prefixArr, excludes) {
  excludes.forEach(function (item) {
    var index = prefixArr.indexOf(item);

    if (index > -1) {
      prefixArr.splice(index, 1);
    }
  });

  return prefixArr;
};

/**
 * Adds specified vendor prefixes to the prefixes array
 *
 * @param {Array} prefixArr - The array of prefixes
 * @param {Array} includes - An array of prefixes to include
 * @returns {Array} The prefixes array plus any extra included prefixes
 */
var handleIncludes = function handleIncludes(prefixArr, includes) {
  includes.forEach(function (item) {
    if (prefixArr.indexOf(item) === -1) {
      prefixArr.push(item);
    }
  });

  return prefixArr;
};

/**
 * Creates and returns a regex pattern based on all the included prefixes so that
 * we can test our values against it.
 *
 * @param {Array} prefixArr - The array of prefixes
 * @param {Array} includes - An array of prefixes to include
 * @param {Array} excludes - An array of prefixes to exclude
 * @returns {RegExp} The regex pattern for us to test values against
 */
var precompileRegEx = function precompileRegEx(prefixArr, includes, excludes) {
  if (includes.length) {
    prefixArr = handleIncludes(prefixArr, includes);
  }

  if (excludes.length) {
    prefixArr = handleExcludes(prefixArr, excludes);
  }

  return new RegExp('-(' + prefixArr.join('|') + ')-');
};

/**
 * Checks to see if the property is a standard property or a browser specific one
 *
 * @param {string} property - The property string we want to test
 * @returns {boolean} Whether the property is standard or not
 */
var isStandardProperty = function isStandardProperty(property) {
  return properties.indexOf(helpers.stripPrefix(property)) !== -1;
};

module.exports = {
  'name': 'no-vendor-prefixes',
  'defaults': {
    'additional-identifiers': [],
    'excluded-identifiers': [],
    'ignore-non-standard': false
  },
  'detect': function detect(ast, parser) {

    var result = [],
        validPrefixes = getPrefixCopy(prefixes),
        statement = precompileRegEx(validPrefixes, parser.options['additional-identifiers'], parser.options['excluded-identifiers']);

    ast.traverseByType('ident', function (value) {
      if (statement.test(value.content)) {
        if (!isStandardProperty(value.content) && parser.options['ignore-non-standard']) {
          return;
        }
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': value.start.line,
          'column': value.start.column,
          'message': 'Vendor prefixes should not be used',
          'severity': parser.severity
        });
      }
    });
    return result;
  }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'no-warn',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('atkeyword', function (keyword) {
      keyword.traverse(function (item) {
        if (item.content === 'warn') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': item.start.line,
            'column': item.start.column,
            'message': '@warn not allowed',
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'one-declaration-per-line',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [],
        lastLine = {};

    ast.traverseByType('declaration', function (declaration, i, parent) {

      if (declaration.start.line === lastLine.start || declaration.start.line === lastLine.end) {
        if (parent.type !== 'arguments') {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': declaration.start.line,
            'column': declaration.start.column,
            'message': 'Only one declaration allowed per line',
            'severity': parser.severity
          });
        }
      }

      lastLine.start = declaration.start.line;
      lastLine.end = declaration.end.line;
    });

    return result;
  }
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'placeholder-in-extend',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('atkeyword', function (keyword, i, parent) {
      keyword.forEach(function (item) {
        if (item.content === 'extend') {

          parent.forEach('selector', function (selector) {
            var placeholder = false;

            selector.content.forEach(function (selectorPiece) {
              if (selectorPiece.type === 'placeholder') {
                placeholder = true;
              }
            });

            if (!placeholder) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'line': selector.start.line,
                'column': selector.start.column,
                'message': '@extend must be used with a %placeholder',
                'severity': parser.severity
              });
            }
          });
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Note that this file is nearly identical to function-name-format.js, mixin-name-format.js, and variable-name-format.js


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'placeholder-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase',
    'convention-explanation': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('placeholder', function (node) {
      var name = node.first().content,
          strippedName,
          violationMessage = false;

      if (node.first().is('ident')) {
        strippedName = name;
        if (parser.options['allow-leading-underscore'] && name[0] === '_') {
          strippedName = name.slice(1);
        }

        switch (parser.options.convention) {
          case 'hyphenatedlowercase':
            if (!helpers.isHyphenatedLowercase(strippedName)) {
              violationMessage = 'Placeholder \'%' + name + '\' should be written in lowercase with hyphens';
            }
            break;
          case 'camelcase':
            if (!helpers.isCamelCase(strippedName)) {
              violationMessage = 'Placeholder \'%' + name + '\' should be written in camelCase';
            }
            break;
          case 'pascalcase':
            if (!helpers.isPascalCase(strippedName)) {
              violationMessage = 'Placeholder \'%' + name + '\' should be written in PascalCase';
            }
            break;
          case 'snakecase':
            if (!helpers.isSnakeCase(strippedName)) {
              violationMessage = 'Placeholder \'%' + name + '\' should be written in snake_case';
            }
            break;
          case 'strictbem':
            if (!helpers.isStrictBEM(strippedName)) {
              violationMessage = 'Placeholder \'%' + name + '\' should be written in BEM (Block Element Modifier) format';
            }
            break;
          case 'hyphenatedbem':
            if (!helpers.isHyphenatedBEM(strippedName)) {
              violationMessage = 'Placeholder \'%' + name + '\' should be written in hyphenated BEM (Block Element Modifier) format';
            }
            break;
          default:
            if (!new RegExp(parser.options.convention).test(strippedName)) {
              violationMessage = 'Placeholder \'%' + name + '\' should match regular expression /' + parser.options.convention + '/';

              // convention-message overrides violationMessage
              if (parser.options['convention-explanation']) {
                violationMessage = parser.options['convention-explanation'];
              }
            }
        }

        if (violationMessage) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': violationMessage,
            'severity': parser.severity
          });
        }
      }
    });
    return result;
  }
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helpers = __webpack_require__(0);

var propertyCheckList = __webpack_require__(3);

var orderPresets = {
  'recess': 'recess.yml',
  'smacss': 'smacss.yml',
  'concentric': 'concentric.yml'
};

var getOrderConfig = function getOrderConfig(order) {
  if (typeof order === 'string') {
    if (orderPresets.hasOwnProperty(order)) {
      var filename = orderPresets[order],
          orderConfig = helpers.loadConfigFile('property-sort-orders/' + filename);

      return orderConfig.order;
    }
  }

  return false;
};

var sortProperties = function sortProperties(obj, order) {
  var keys = Object.keys(obj),
      unknown = [],
      sorted = {},
      i;

  if (typeof order === 'string') {
    if (order === 'alphabetical') {
      keys = keys.sort();
    }
  } else if ((typeof order === 'undefined' ? 'undefined' : _typeof(order)) === 'object') {
    var orderedKeys = [];

    for (i = 0; i < order.length; i++) {
      if (keys.indexOf(order[i]) !== -1) {
        orderedKeys.push(order[i]);
      }
    }

    keys = orderedKeys;
  } else {
    keys = keys.sort(function (a, b) {
      if (order.indexOf(a) === -1) {
        if (unknown.indexOf(a) === -1) {
          unknown.push(a);
        }
      }
      if (order.indexOf(b) === -1) {
        if (unknown.indexOf(b) === -1) {
          unknown.push(b);
        }
      }

      if (order.indexOf(a) > order.indexOf(b)) {
        return 1;
      }
      if (order.indexOf(a) < order.indexOf(b)) {
        return -1;
      }
      return 0;
    });
  }

  for (i = 0; i < unknown.length; i++) {
    if (keys.indexOf(unknown[i]) !== -1) {
      keys.splice(keys.indexOf(unknown[i]), 1);
    }
  }

  keys = keys.concat(unknown.sort());

  for (i = 0; i < keys.length; i++) {
    sorted[keys[i]] = obj[keys[i]];
  }

  return sorted;
};

module.exports = {
  'name': 'property-sort-order',
  'defaults': {
    'order': 'alphabetical',
    'ignore-custom-properties': false
  },
  'detect': function detect(ast, parser) {
    var result = [],
        order = getOrderConfig(parser.options.order) || parser.options.order;

    ast.traverseByType('block', function (block) {
      var properties = {},
          sorted,
          pKeys,
          sKeys;

      if (block) {
        block.forEach('declaration', function (dec) {
          var prop = dec.first('property'),
              name = prop.first('ident');

          if (name) {
            if (parser.options['ignore-custom-properties']) {
              if (propertyCheckList.indexOf(name.content) !== -1) {
                properties[name.content] = prop;
              }
            } else {
              properties[name.content] = prop;
            }
          }
        });

        sorted = sortProperties(properties, order);

        pKeys = Object.keys(properties);
        sKeys = Object.keys(sorted);

        sKeys.every(function (e, i) {
          var pKey = pKeys[i],
              prop = properties[pKey];

          if (e !== pKey) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': prop.start.line,
              'column': prop.start.column,
              'message': 'Expected `' + e + '`, found `' + pKey + '`',
              'severity': parser.severity
            });
          }
          return true;
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'property-units',
  'defaults': {
    'per-property': {},
    'global': []
  },
  'detect': function detect(ast, parser) {
    var result = [],
        unitsAllowedGlobally = parser.options.global,
        unitsAllowedPerProperty = parser.options['per-property'];

    ast.traverseByType('declaration', function (declaration) {
      var property = declaration.first('property'),
          ident = property ? property.first('ident') : null,
          propertyName = ident ? ident.content : null,
          valueNode = declaration.first('value'),
          hasDimension = valueNode ? !!valueNode.first('dimension') : null;
      if (propertyName && hasDimension) {
        // properties such as box-shadow may have multiple dimensions defined so enumerate through them
        valueNode.forEach('dimension', function (dimension) {
          var dimensionIdent = dimension ? dimension.first('ident') : null,
              unitType = dimensionIdent ? dimensionIdent.content : null,
              unitsAllowed = unitsAllowedPerProperty[propertyName];
          // If a property is defined in unitsAllowed, then it will only validate those unit types
          if (unitType && unitsAllowed) {
            if (unitsAllowed.indexOf(unitType) === -1) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'severity': parser.severity,
                'line': dimension.start.line,
                'column': dimension.start.column,
                'message': 'Values for property \'' + propertyName + '\' may not use ' + unitType + ' units'
              });
            }
          }
          // If no units are defined in unitsAllowedGlobally, then allow all of them
          // Otherwise, verify the given unit is in the unitsAllowedGlobally list.
          else if (unitType && unitsAllowedGlobally.length && unitsAllowedGlobally.indexOf(unitType) === -1) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'severity': parser.severity,
                'line': dimension.start.line,
                'column': dimension.start.column,
                'message': 'Values for property \'' + propertyName + '\' may not use ' + unitType + ' units'
              });
            }
        });
      }
    });
    return result;
  }
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var pseudoElements = __webpack_require__(97),
    pseudoClasses = __webpack_require__(96);

/**
 * Check if the given argument is a prefixed string. If it is we return an unprefixed
 * version, else return it unmodified
 *
 * @param {Object|string} name - The value to test
 * @returns {string} A prefix free version of the string
 */
var prefixFree = function prefixFree(name) {
  return typeof name === 'string' && name.charAt(0) === '-' ? helpers.stripPrefix(name) : name;
};

/**
 * Determine if the given string matches a pseudo-element
 *
 * @param {string} name - The name to check
 * @returns {Boolean} Whether or not name is pseudo-element
 */
var isPseudoElement = function isPseudoElement(name) {
  return pseudoElements.indexOf(prefixFree(name)) !== -1;
};

/**
 * Determine if the given string matches a pseudo-class
 *
 * @param {string} name - The name to check
 * @returns {Boolean} Whether or not name is pseudo-class
 */
var isPseudoClass = function isPseudoClass(name) {
  return pseudoClasses.indexOf(prefixFree(name)) !== -1;
};

module.exports = {
  'name': 'pseudo-element',
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('pseudoClass', function (node) {
      if (isPseudoElement(node.content[0].content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Pseudo-elements must start with double colons',
          'severity': parser.severity
        });
      }
    });

    ast.traverseByType('pseudoElement', function (node) {
      if (isPseudoClass(node.content[0].content)) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Pseudo-classes must start with a single colon',
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'quotes',
  'defaults': {
    'style': 'single'
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('string', function (node) {
      var firstQuote = node.content.charAt(0),
          lastQuote = node.content.charAt(node.content.length - 1);

      if (firstQuote !== lastQuote) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Mixed quote styles',
          'severity': parser.severity
        });
      }

      if (parser.options.style === 'single' && firstQuote !== '\'') {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Strings must use single quotes',
          'severity': parser.severity
        });
      } else if (parser.options.style === 'double' && firstQuote !== '"') {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': node.start.line,
          'column': node.start.column,
          'message': 'Strings must use double quotes',
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var shortVals = ['border-color', 'border-radius', 'border-style', 'border-width', 'margin', 'padding'];

/**
 * Checks to see if a series of values can be condensed down to a singular value
 *
 * @param {array} value - The array of values to check
 * @param {array} allowed - The parser options to specify the levels allowed to condense to
 * @returns {boolean} Whether the values can be condensed to a singular value
 */
var condenseToOne = function condenseToOne(value, allowed) {
  if (allowed.indexOf(1) !== -1 && value.length > 1) {
    for (var i = 1; i < value.length; i++) {
      if (value[i] !== value[0]) {
        return false;
      }
    }
    return true;
  }
  return false;
};

/**
 * Checks to see if a series of values can be condensed down to two values
 *
 * @param {array} value - The array of values to check
 * @param {array} allowed - The parser options to specify the levels allowed to condense to
 * @returns {boolean} Whether the values can be condensed to two values
 */
var condenseToTwo = function condenseToTwo(value, allowed) {
  if (allowed.indexOf(2) !== -1 && value.length > 2) {
    if (value[0] === value[2] && value[1] === value[3] || value[0] === value[2] && !value[3] && value[0] !== value[1]) {
      return true;
    }
  }
  return false;
};

/**
 * Checks to see if a series of values can be condensed down to three values
 *
 * @param {array} value - The array of values to check
 * @param {array} allowed - The parser options to specify the levels allowed to condense to
 * @returns {boolean} Whether the values can be condensed to three values
 */
var condenseToThree = function condenseToThree(value, allowed) {
  if (allowed.indexOf(3) !== -1 && value.length > 3) {
    if (value[1] === value[3]) {
      return true;
    }
  }
  return false;
};

/**
 * Used to scan property values and create a string representation of the values to display
 *
 * @param {Object} node - The current node
 * @returns {string} A string reconstruction of the current properties value
 */
var scanValue = function scanValue(node) {
  var curValue = [];
  var fullVal = '';
  node.forEach(function (val) {
    // add to our value string depending on node type
    if (val.is('dimension')) {
      val.forEach(function (el) {
        fullVal += el.content;
      });
    } else if (val.is('percentage')) {
      val.forEach(function (el) {
        fullVal += el.content + '%';
      });
    } else if (val.is('interpolation')) {
      fullVal += '#{' + scanValue(val.content) + '}';
    } else if (val.is('color')) {
      fullVal += '#' + val.content + '';
    } else if (val.is('operator') || val.is('ident') || val.is('number') || val.is('unaryOperator') || val.is('string')) {
      fullVal += val.content;
    } else if (val.is('variable')) {
      val.forEach(function (el) {
        fullVal += '$' + el.content;
      });
    } else if (val.is('function')) {

      var func = val.first('ident'),
          args = '';

      val.forEach('arguments', function (arg) {
        args = scanValue(arg).join(' ');
      });

      fullVal = func + '(' + args + ')';
    } else if (val.is('parentheses')) {
      fullVal += '(' + scanValue(val).join(' ') + ')';
    } else if (val.is('space')) {
      // This is a non value character such as a space
      // We want to start another value here
      curValue.push(fullVal);

      // reset the value string for the next iteration
      fullVal = '';
    }
  });

  if (fullVal !== '') {
    // The last dimension in a value will not be followed by a character so we push here
    curValue.push(fullVal);
  }
  return curValue;
};

module.exports = {
  'name': 'shorthand-values',
  'defaults': {
    'allowed-shorthands': [1, 2, 3]
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('declaration', function (declaration) {
      var isShorthandProperty = false,
          property;

      declaration.traverse(function (item) {

        if (item.is('property')) {
          item.traverse(function (child) {
            // check if the property is a possible shorthand property
            if (shortVals.indexOf(child.content) !== -1) {
              isShorthandProperty = true;

              // store a reference to the property for our error
              property = shortVals[shortVals.indexOf(child.content)];
            }
          });
        }

        if (isShorthandProperty) {
          var value = [];

          if (item.is('value')) {
            var node = item.content;

            // Build each value into an array of strings with value and type
            value = scanValue(node);

            if (value.length <= 4 && value.length >= 1) {
              var output = [];

              // check which values can condense
              if (condenseToOne(value, parser.options['allowed-shorthands'])) {
                output = [value[0]];
              } else if (condenseToTwo(value, parser.options['allowed-shorthands'])) {
                output = [value[0], value[1]];
              } else if (condenseToThree(value, parser.options['allowed-shorthands'])) {
                output = [value[0], value[1], value[2]];
              }

              if (output.length) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': item.start.line,
                  'column': item.start.column,
                  'message': 'Property `' + property + '` should be written more concisely as `' + output.join(' ') + '` instead of `' + value.join(' ') + '`',
                  'severity': parser.severity
                });
              }
            }
          }
        }
      });
    });
    return result;
  }
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

/**
 * Checks a ruleset for selectors or EOL characters. If a selector is found before an EOL
 * then it returns the selector node for reporting or returns false
 *
 * @param {Object} ruleset - The ruleset node
 * @param {number} index - The current index of the delimiter
 * @returns {Object|boolean} Either the selector node or false
 */
var checkLineForSelector = function checkLineForSelector(ruleset, index) {
  var curIndex = index += 1;
  if (ruleset.content[curIndex]) {
    for (; curIndex < ruleset.content.length; curIndex++) {
      var curType = ruleset.content[curIndex].type;
      if (curType === 'space' && helpers.hasEOL(ruleset.content[curIndex])) {
        return false;
      }
      if (curType === 'selector' || curType === 'typeSelector') {
        return ruleset.content[curIndex];
      }
    }
  }

  return false;
};

module.exports = {
  'name': 'single-line-per-selector',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('ruleset', function (ruleset) {
      ruleset.forEach('delimiter', function (delimiter, j) {
        var next = checkLineForSelector(ruleset, j);

        if (next) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': next.start.line,
            'column': next.start.column,
            'message': 'Selectors must be placed on new lines',
            'severity': parser.severity
          });
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'space-after-bang',
  'defaults': {
    'include': false
  },
  'detect': function detect(ast, parser) {
    var result = [],
        regex = /!\s/;

    ast.traverseByTypes(['important', 'default', 'global', 'optional'], function (block) {
      if (block.content.match(regex) !== null) {
        if (parser.options.include) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column + 1,
            'message': 'Bangs (!) should be followed by a space',
            'severity': parser.severity
          });
        } else {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column,
            'message': 'Bangs (!) should not be followed by a space',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'space-after-colon',
  'defaults': {
    'include': true
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByTypes(['propertyDelimiter', 'operator'], function (delimiter, i, parent) {
      if (delimiter.content === ':') {
        var next = parent.content[i + 1];

        if (next && next.is('space')) {
          if (!parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': next.start.line,
              'column': next.start.column,
              'message': 'No space allowed after `:`',
              'severity': parser.severity
            });
          }
        } else {
          if (parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': delimiter.start.line,
              'column': delimiter.start.column,
              'message': 'Space expected after `:`',
              'severity': parser.severity
            });
          }
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'space-after-comma',
  'defaults': {
    'include': true
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByTypes(['operator', 'delimiter'], function (operator, i, parent) {
      var next, doubleNext;

      if (operator.content === ',') {
        next = parent.content[i + 1] || false;
        doubleNext = parent.content[i + 2] || false;

        if (next) {
          if (operator.is('delimiter')) {
            if (next.is('selector')) {
              next = next.content[0];
            }
          }

          if (next.is('space') && !helpers.hasEOL(next.content) && !parser.options.include) {
            if (doubleNext && doubleNext.is('singlelineComment')) {
              return false;
            }

            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': next.start.line,
              'column': next.start.column,
              'message': 'Commas should not be followed by a space',
              'severity': parser.severity
            });
          }

          if (!next.is('space') && parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': operator.start.line,
              'column': operator.start.column,
              'message': 'Commas should be followed by a space',
              'severity': parser.severity
            });
          }
        }
      }
      return true;
    });

    return result;
  }
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var operators = ['+', '-', '/', '*', '%', '<', '>', '==', '!=', '<=', '>='];

/**
 * Determine a relational operator based on the operator node
 *
 * @param {Object} node - The operator node
 * @returns {string} Returns a relational operator
 */
var getRelationalOperator = function getRelationalOperator(node) {
  if (node.content === '<') {
    return '<=';
  }

  if (node.content === '>') {
    return '>=';
  }
  return false;
};

/**
 * Determine if operator is negative number
 *
 * @param {string} operator - The operator
 * @param {Object} next - The next node
 * @param {Object} previous - The previous node
 * @param {Object} doublePrevious - The double previous node (back two)
 * @returns {bool} true / false
 */
var isNegativeNumber = function isNegativeNumber(operator, next, previous, doublePrevious) {
  if (operator === '-') {

    // Catch the following:
    // $foo: -20;
    // $foo: -#{$foo}
    // $foo: -($foo * 2)
    // $foo: -$foo
    if (next) {
      if (!previous || previous.is('space') && doublePrevious && !doublePrevious.is('number')) {
        if (next.is('number') || next.is('interpolation') || next.is('variable') || next.is('parentheses')) {
          return true;
        }
      }
    }

    // Catch the following:
    // .foo {
    //   property: -16px;
    // }
    if (next && (next.is('dimension') || next.is('percentage'))) {
      return true;
    }

    // Catch the following:
    // .foo {
    //   propery: 2 / -16;
    // }
    if (doublePrevious && doublePrevious.is('operator')) {
      return true;
    }

    // Catch the following:
    // .foo {
    //   property: 2 /-16px;
    // }
    if (previous && previous.is('operator')) {
      return true;
    }
  }

  return false;
};

/**
 * Determine if operator is divider
 *
 * @param {string} operator - The operator
 * @param {Object} next - The next node
 * @param {Object} previous - The previous node
 * @returns {bool} true / false
 */
var isDivider = function isDivider(operator, next, previous) {
  if (operator === '/') {

    // Catch the following:
    // .foo {
    //   property: calc(100% / 2);
    // }
    if (previous && next) {
      if (previous.is('dimension') && (next.is('dimension') || next.is('number'))) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Determine if operator is part of unicode
 *
 * @param {string} operator - The operator
 * @param {Object} previous - The previous node
 * @returns {bool} true / false
 */
var isUnicode = function isUnicode(operator, previous) {
  if (operator === '+') {

    // Catch the following:
    // @font-face {
    //   unicode-range: U+26;
    // }
    if (previous && previous.is('ident') && previous.content === 'U') {
      return true;
    }
  }

  return false;
};

/**
 * Determine if operator is part of import path
 *
 * @param {string} operator - The operator
 * @param {Object} parent - The parent node
 * @returns {bool} true / false
 */
var isImport = function isImport(operator, parent) {
  if (operator === '/') {

    if (parent && parent.is('atrule') && parent.contains('atkeyword')) {
      var keyword = parent.first('atkeyword');

      if (keyword.contains('ident')) {
        var ident = keyword.first('ident');

        if (ident.content === 'import') {
          return true;
        }
      }
    }
  }

  return false;
};

/**
 * Determine if operator is part an ident
 *
 * @param {string} operator - The operator
 * @param {Object} next - The next node
 * @param {Object} previous - The previous node
 * @returns {bool} true / false
 */
var isPartialIdent = function isPartialIdent(operator, next, previous) {
  if (operator === '-') {
    return next && previous && previous.is('interpolation');
  }
  return false;
};

/**
 * Determine if operator is exception
 *
 * @param {string} operator - The operator
 * @param {Object} parent - The parent node
 * @param {Object} i - The node index
 * @returns {bool} true / false
 */
var isException = function isException(operator, parent, i) {
  var previous = parent.content[i - 1] || false,
      doublePrevious = parent.content[i - 2] || false,
      next = parent.content[i + 1] || false;

  if (isNegativeNumber(operator, next, previous, doublePrevious)) {
    return true;
  }

  if (isDivider(operator, next, previous)) {
    return true;
  }

  if (isUnicode(operator, previous)) {
    return true;
  }

  if (isImport(operator, parent)) {
    return true;
  }

  if (isPartialIdent(operator, next, previous)) {
    return true;
  }

  return false;
};

/**
 * Check the spacing around an operator
 *
 * @param {Object} node - The node to check the spacing around
 * @param {int} i - The node's child index of it's parent
 * @param {Object} parent - The parent node
 * @param {Object} parser - The parser object
 * @param {Object} result - The result object
 * @returns {bool|null} false if exception
 */
var checkSpacing = function checkSpacing(node, i, parent, parser, result) {
  if (node.is('operator') || node.is('unaryOperator')) {
    var previous = parent.content[i - 1] || false,
        next = parent.content[i + 1] || false,
        operator = node.content;

    //////////////////////////
    // Multi-part operators
    //////////////////////////

    // If second part of relational operator move on
    if (node.content === '=' && previous) {
      if (previous.content === '<' || previous.content === '>') {
        return false;
      }
    }

    // If first part of relational operator, carry on and build it
    if ((node.content === '<' || node.content === '>') && next) {
      if (next.content === '=') {
        operator = getRelationalOperator(node);
        next = parent.content[i + 2] || false;
      }
    }

    //////////////////////////
    // Exceptions
    //////////////////////////

    if (isException(operator, parent, i)) {
      return false;
    }

    // If the operator checks out in our valid operator list
    if (operators.indexOf(operator) !== -1) {

      if (parser.options.include) {
        if (previous && !previous.is('space') || next && !next.is('space')) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'Space expected around operator',
            'severity': parser.severity
          });
        } else {
          if (previous && previous.end.line >= previous.start.line && previous.end.column > previous.start.column || next && next.end.line >= next.start.line && next.end.column > next.start.column) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': node.start.line,
              'column': node.start.column,
              'message': 'Multiple spaces not allowed around operator',
              'severity': parser.severity
            });
          }
        }
      } else {
        if (previous && previous.is('space') || next && next.is('space')) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': node.start.line,
            'column': node.start.column,
            'message': 'No spaces allowed around operator',
            'severity': parser.severity
          });
        }
      }
    }
  }
  return result;
};

module.exports = {
  'name': 'space-around-operator',
  'defaults': {
    'include': true
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByTypes(['condition', 'atrule', 'value'], function (node) {
      node.forEach(function (item, i, parent) {
        // Perform another loop of the children if we come across a parenthesis
        // parent node
        if (item.is('parentheses')) {
          item.forEach(function (child, j, childParent) {
            // Do the spacing checks
            checkSpacing(child, j, childParent, parser, result);
          });
        } else {
          // Do the spacing checks
          checkSpacing(item, i, parent, parser, result);
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'space-before-bang',
  'defaults': {
    'include': true
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByTypes(['important', 'default'], function (block, i, parent) {
      var previous = parent.content[i - 1];

      if (!previous.is('space')) {
        if (parser.options.include) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': block.start.line,
            'column': block.start.column,
            'message': 'Whitespace required before !important',
            'severity': parser.severity
          });
        }
      } else {
        if (!parser.options.include) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': previous.start.line,
            'column': previous.start.column,
            'message': 'Whitespace not allowed before !important',
            'severity': parser.severity
          });
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var getLastWhitespace = function getLastWhitespace(node) {
  if (node === false) {
    return null;
  }

  if (!node) {
    return false;
  }
  if (node.is('space')) {
    return node;
  }

  return getLastWhitespace(node.last());
};

module.exports = {
  'name': 'space-before-brace',
  'defaults': {
    'include': true
  },
  'detect': function detect(ast, parser) {
    var result = [];
    if (ast.syntax === 'scss') {
      ast.traverseByTypes(['block', 'atrulers', 'declaration'], function (block, i, parent) {
        var previous = false,
            whitespace,
            warn = {};

        if ((block.is('block') || block.is('atrulers')) && !parent.is('value')) {
          previous = parent.get(i - 1);
        } else if (block.is('declaration')) {
          if (block.contains('value')) {
            for (var j = 0; j < block.content.length; j++) {
              if (block.content[j].is('value') && block.content[j].content[0].is('block')) {
                previous = block.content[j - 1];
                warn.line = block.content[j].content[0].start.line;
                warn.col = block.content[j].content[0].start.column;
              }
            }
          }
        }
        whitespace = getLastWhitespace(previous);
        if (whitespace === false) {
          if (parser.options.include) {
            if (!warn.hasOwnProperty('line')) {
              warn.line = block.start.line;
              warn.col = block.start.column;
            }
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': warn.line,
              'column': warn.col - 1,
              'message': 'Whitespace required before {',
              'severity': parser.severity
            });
          }
        } else {
          if (!parser.options.include && whitespace !== null) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': whitespace.start.line,
              'column': whitespace.start.column,
              'message': 'Whitespace not allowed before {',
              'severity': parser.severity
            });
          }
        }
      });
    }
    return result;
  }
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'space-before-colon',
  'defaults': {
    'include': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByTypes(['propertyDelimiter', 'operator'], function (delimiter, i, parent) {
      if (delimiter.content === ':') {
        var previous = parent.content[i - 1];

        if (previous && previous.is('space')) {
          if (!parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': previous.start.line,
              'column': previous.start.column,
              'message': 'No space allowed before `:`',
              'severity': parser.severity
            });
          }
        } else {
          if (parser.options.include) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': delimiter.start.line,
              'column': delimiter.start.column - 1,
              'message': 'Space expected before `:`',
              'severity': parser.severity
            });
          }
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'space-between-parens',
  'defaults': {
    'include': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('arguments', function (args) {
      var first = args.first(),
          last = args.last();

      if (args.length === 0) {
        return;
      }

      if (parser.options.include) {
        if (!first.is('space')) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': first.start.line,
            'column': first.start.column - 1,
            'message': 'Space expected at beginning of parenthesis',
            'severity': parser.severity
          });
        }
        if (!last.is('space')) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': last.end.line,
            'column': last.end.column,
            'message': 'Space expected at end of parenthesis',
            'severity': parser.severity
          });
        }
      } else {
        // Ignore if arguments are multi-line
        if (first.is('space') && !helpers.hasEOL(first.content)) {
          result = helpers.addUnique(result, {
            'ruleId': parser.rule.name,
            'line': first.start.line,
            'column': first.start.column,
            'message': 'No space allowed at beginning of parenthesis',
            'severity': parser.severity
          });
        }
        if (last.is('space')) {
          // Proceed if arguments aren't multi-line.
          // With Sass we have one extra check for nested nodes where we must
          // check doublePrevious as the last node will be the indentation
          if (ast.syntax === 'scss' && !helpers.hasEOL(last.content) || ast.syntax === 'sass' && !helpers.hasEOL(last.content) && !helpers.hasEOL(args.content[args.content.length - 2].content)) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'line': last.start.line,
              'column': last.start.column,
              'message': 'No space allowed at end of parenthesis',
              'severity': parser.severity
            });
          }
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'trailing-semicolon',
  'defaults': {
    'include': true
  },
  'detect': function detect(ast, parser) {
    var result = [];

    if (ast.syntax !== 'sass') {
      ast.traverseByType('block', function (block) {
        var last, next;

        try {
          last = block.last('declaration');
        } catch (e) {
          return;
        }

        block.forEach('declaration', function (item, i, parent) {
          if (item.contains('value')) {
            var valueNode = item.last('value').content[0];

            if (!valueNode.is('block')) {
              if (helpers.isEqual(last, item)) {
                if (parent.content[i + 1]) {
                  next = parent.content[i + 1];

                  if (next.is('declarationDelimiter')) {
                    if (!parser.options.include) {
                      result = helpers.addUnique(result, {
                        'ruleId': parser.rule.name,
                        'severity': parser.severity,
                        'line': item.end.line,
                        'column': item.end.column,
                        'message': 'No trailing semicolons allowed'
                      });
                    }
                  } else {
                    if (parser.options.include) {
                      result = helpers.addUnique(result, {
                        'ruleId': parser.rule.name,
                        'severity': parser.severity,
                        'line': item.last('value').start.line,
                        'column': item.last('value').start.column,
                        'message': 'Trailing semicolons required'
                      });
                    }
                  }
                }
              }
            }
          }
        });
      });
    }

    return result;
  }
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var isVarRegex = /^[\$]/;

module.exports = {
  'name': 'url-quotes',
  'defaults': {},
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('uri', function (node) {
      node.traverse(function (item) {
        if (item.is('raw')) {
          if (!item.content.match(isVarRegex)) {
            result = helpers.addUnique(result, {
              'ruleId': parser.rule.name,
              'severity': parser.severity,
              'line': item.start.line,
              'column': item.start.column,
              'message': 'Quotes around URLs are required'
            });
          }
        }
      });
    });

    return result;
  }
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

// The whitelisted ident values
var whitelistedValues = ['inherit', 'initial', 'transparent', 'none', 'currentColor'],
    ignoredValueTypes = ['important', 'space'];

/**
 * Checks If the property is of a valid type, either its a variable or it's a whitelisted ident value
 *
 * @param {Object} propertyElem - The property element
 * @returns {boolean} Whether the property is valid or not
 */
var isValidProperty = function isValidProperty(propertyElem) {
  if (propertyElem) {
    if (propertyElem.type === 'variable') {
      return true;
    } else if (propertyElem.type === 'ident' && whitelistedValues.indexOf(propertyElem.content) !== -1) {
      return true;
    }
  }
  return false;
};

/**
 * Checks If the property type is an ignored value type
 *
 * @param {Object} propertyElem - The property element
 * @returns {boolean} Whether the property is an ignored type or not
 */
var isIgnoredType = function isIgnoredType(propertyElem) {
  if (propertyElem) {
    return ignoredValueTypes.indexOf(propertyElem.type) !== -1;
  }
  return false;
};

module.exports = {
  'name': 'variable-for-property',
  'defaults': {
    'properties': []
  },
  'detect': function detect(ast, parser) {
    var result = [];

    if (parser.options.properties.length) {
      ast.traverseByType('value', function (node, i, parent) {
        var declaration = parent.content[0].content[0],
            declarationType = declaration.type,
            declarationIdent = declaration.content;

        if (declarationType === 'ident') {
          if (parser.options.properties.indexOf(declarationIdent) !== -1) {
            node.forEach(function (valElem) {
              if (!isValidProperty(valElem) && !isIgnoredType(valElem)) {
                result = helpers.addUnique(result, {
                  'ruleId': parser.rule.name,
                  'line': declaration.start.line,
                  'column': declaration.start.column,
                  'message': 'Values for properties of type \'' + declarationIdent + '\' may only be variables',
                  'severity': parser.severity
                });
              }
            });
          }
        }
      });
    }
    return result;
  }
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Note that this file is nearly identical to function-name-format.js, mixin-name-format.js, and placeholder-name-format.js


var helpers = __webpack_require__(0);

module.exports = {
  'name': 'variable-name-format',
  'defaults': {
    'allow-leading-underscore': true,
    'convention': 'hyphenatedlowercase',
    'convention-explanation': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('variable', function (variable) {
      var strippedName,
          violationMessage = false,
          name = variable.first().content;

      strippedName = name;

      if (parser.options['allow-leading-underscore'] && name[0] === '_') {
        strippedName = strippedName.slice(1);
      }

      switch (parser.options.convention) {
        case 'hyphenatedlowercase':
          if (!helpers.isHyphenatedLowercase(strippedName)) {
            violationMessage = 'Variable \'' + name + '\' should be written in lowercase with hyphens';
          }
          break;
        case 'camelcase':
          if (!helpers.isCamelCase(strippedName)) {
            violationMessage = 'Variable \'' + name + '\' should be written in camelCase';
          }
          break;
        case 'pascalcase':
          if (!helpers.isPascalCase(strippedName)) {
            violationMessage = 'Variable \'' + name + '\' should be written in PascalCase';
          }
          break;
        case 'snakecase':
          if (!helpers.isSnakeCase(strippedName)) {
            violationMessage = 'Variable \'' + name + '\' should be written in snake_case';
          }
          break;
        case 'strictbem':
          if (!helpers.isStrictBEM(strippedName)) {
            violationMessage = 'Variable \'' + name + '\' should be written in BEM (Block Element Modifier) format';
          }
          break;
        case 'hyphenatedbem':
          if (!helpers.isHyphenatedBEM(strippedName)) {
            violationMessage = 'Variable \'' + name + '\' should be written in hyphenated BEM (Block Element Modifier) format';
          }
          break;
        default:
          if (!new RegExp(parser.options.convention).test(strippedName)) {
            violationMessage = 'Variable \'' + name + '\' should match regular expression /' + parser.options.convention + '/';

            // convention-message overrides violationMessage
            if (parser.options['convention-explanation']) {
              violationMessage = parser.options['convention-explanation'];
            }
          }
      }

      if (violationMessage) {
        result = helpers.addUnique(result, {
          'ruleId': parser.rule.name,
          'line': variable.start.line,
          'column': variable.start.column,
          'message': violationMessage,
          'severity': parser.severity
        });
      }
    });

    return result;
  }
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = __webpack_require__(0);

var units = ['em', 'ex', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'px', 'mm', 'cm', 'in', 'pt', 'pc'];

module.exports = {
  'name': 'zero-unit',
  'defaults': {
    'include': false
  },
  'detect': function detect(ast, parser) {
    var result = [];

    ast.traverseByType('number', function (item, i, parent) {

      if (item.content === '0') {
        if (parent.type === 'dimension') {
          var next = parent.content[i + 1] || false;

          if (units.indexOf(next.content) !== -1) {
            if (!parser.options.include) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'severity': parser.severity,
                'line': item.end.line,
                'column': item.end.column,
                'message': 'No unit allowed for values of 0'
              });
            }
          }
        } else {
          if (parent.type === 'value') {
            if (parser.options.include) {
              result = helpers.addUnique(result, {
                'ruleId': parser.rule.name,
                'severity': parser.severity,
                'line': item.end.line,
                'column': item.end.column,
                'message': 'Unit required for values of 0'
              });
            }
          }
        }
      }
    });

    return result;
  }
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(88)))

/***/ }),
/* 88 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module), __webpack_require__(2)))

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(90);
exports.encode = exports.stringify = __webpack_require__(91);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(89);
var util = __webpack_require__(94);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(92);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = [
	"abs",
	"adjust-color",
	"adjust-hue",
	"alpha",
	"annotation",
	"append",
	"blue",
	"blur",
	"brightness",
	"calc",
	"call",
	"ceil",
	"change-color",
	"character-variant",
	"circle",
	"comparable",
	"complement",
	"contrast",
	"cubic-bezier",
	"custom",
	"darken",
	"desaturate",
	"drop-shadow",
	"element",
	"ellipse",
	"feature-exists",
	"floor",
	"function-exists",
	"global-variable-exists",
	"grayscale",
	"green",
	"hue",
	"hue-rotate",
	"hsl",
	"hsla",
	"if",
	"index",
	"inset",
	"inspect",
	"invert",
	"is-hex-str",
	"is-superselector",
	"join",
	"keywords",
	"length",
	"lighten",
	"lightness",
	"linear-gradient",
	"list-separator",
	"map-get",
	"map-has-key",
	"map-keys",
	"map-merge",
	"map-remove",
	"map-values",
	"matrix",
	"matrix3d",
	"min",
	"max",
	"mix",
	"mixin-exists",
	"nth",
	"ornaments",
	"opacify",
	"opacity",
	"percentage",
	"perspective",
	"polygon",
	"quote",
	"radial-gradient",
	"random",
	"rect",
	"red",
	"repeat",
	"repeating-linear-gradient",
	"repeating-radial-gradient",
	"rgb",
	"rgba",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"rotate3d",
	"round",
	"saturate",
	"saturation",
	"scale",
	"scale-color",
	"scaleX",
	"scaleY",
	"scaleZ",
	"scale3d",
	"selector-nest",
	"selector-append",
	"selector-extend",
	"selector-replace",
	"selector-unify",
	"simple-selectors",
	"selector-parse",
	"set-nth",
	"sepia",
	"skewX",
	"skewY",
	"steps",
	"str-index",
	"str-insert",
	"str-length",
	"str-slice",
	"styleset",
	"stylistic",
	"swash",
	"symbols",
	"to-lower-case",
	"to-upper-case",
	"translate",
	"translateX",
	"translateY",
	"translateZ",
	"translate3d",
	"transparentize",
	"type-of",
	"unique-id",
	"unit",
	"unitless",
	"unquote",
	"url",
	"var",
	"variable-exists",
	"zip"
];

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = [
	"active",
	"checked",
	"default",
	"disabled",
	"empty",
	"enabled",
	"first",
	"first-child",
	"first-of-type",
	"focus",
	"hover",
	"indeterminate",
	"in-range",
	"invalid",
	"lang",
	"last-child",
	"last-of-type",
	"left",
	"link",
	"not",
	"nth-child",
	"nth-last-child",
	"nth-last-of-type",
	"nth-of-type",
	"only-child",
	"only-of-type",
	"optional",
	"out-of-range",
	"read-only",
	"read-write",
	"required",
	"right",
	"root",
	"target",
	"valid",
	"visited"
];

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = [
	"after",
	"before",
	"first-letter",
	"first-line",
	"selection",
	"backdrop"
];

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./attribute-quotes.js": 14,
	"./bem-depth.js": 15,
	"./border-zero.js": 16,
	"./brace-style.js": 17,
	"./class-name-format.js": 18,
	"./clean-import-paths.js": 19,
	"./declarations-before-nesting.js": 20,
	"./empty-args.js": 21,
	"./empty-line-between-blocks.js": 22,
	"./extends-before-declarations.js": 23,
	"./extends-before-mixins.js": 24,
	"./final-newline.js": 25,
	"./force-attribute-nesting.js": 26,
	"./force-element-nesting.js": 27,
	"./force-pseudo-nesting.js": 28,
	"./function-name-format.js": 29,
	"./hex-length.js": 30,
	"./hex-notation.js": 31,
	"./id-name-format.js": 32,
	"./indentation.js": 33,
	"./leading-zero.js": 34,
	"./max-file-line-count.js": 35,
	"./max-line-length.js": 36,
	"./mixin-name-format.js": 37,
	"./mixins-before-declarations.js": 38,
	"./nesting-depth.js": 39,
	"./no-attribute-selectors.js": 40,
	"./no-color-hex.js": 41,
	"./no-color-keywords.js": 42,
	"./no-color-literals.js": 43,
	"./no-combinators.js": 44,
	"./no-css-comments.js": 45,
	"./no-debug.js": 46,
	"./no-disallowed-properties.js": 47,
	"./no-duplicate-properties.js": 48,
	"./no-empty-rulesets.js": 49,
	"./no-extends.js": 50,
	"./no-ids.js": 51,
	"./no-important.js": 52,
	"./no-invalid-hex.js": 53,
	"./no-mergeable-selectors.js": 54,
	"./no-misspelled-properties.js": 55,
	"./no-qualifying-elements.js": 56,
	"./no-trailing-whitespace.js": 57,
	"./no-trailing-zero.js": 58,
	"./no-transition-all.js": 59,
	"./no-universal-selectors.js": 60,
	"./no-url-domains.js": 61,
	"./no-url-protocols.js": 62,
	"./no-vendor-prefixes.js": 63,
	"./no-warn.js": 64,
	"./one-declaration-per-line.js": 65,
	"./placeholder-in-extend.js": 66,
	"./placeholder-name-format.js": 67,
	"./property-sort-order.js": 68,
	"./property-units.js": 69,
	"./pseudo-element.js": 70,
	"./quotes.js": 71,
	"./shorthand-values.js": 72,
	"./single-line-per-selector.js": 73,
	"./space-after-bang.js": 74,
	"./space-after-colon.js": 75,
	"./space-after-comma.js": 76,
	"./space-around-operator.js": 77,
	"./space-before-bang.js": 78,
	"./space-before-brace.js": 79,
	"./space-before-colon.js": 80,
	"./space-between-parens.js": 81,
	"./trailing-semicolon.js": 82,
	"./url-quotes.js": 83,
	"./variable-for-property.js": 84,
	"./variable-name-format.js": 85,
	"./zero-unit.js": 86
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 98;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {/*!
 * @name JavaScript/NodeJS Merge v1.2.0
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = Public.clone(input[index]);

		}

		return output;

	};

	/**
	 * Merge two objects recursively
	 * @param mixed input
	 * @param mixed extend
	 * @return mixed
	 */

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

				base[key] = extend[key];

			}

		}

		return base;

	}

	/**
	 * Merge two or more objects
	 * @param bool clone
	 * @param bool recursive
	 * @param array argv
	 * @return object
	 */

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

					result[key] = sitem;

				}

			}

		}

		return result;

	}

	/**
	 * Get type of variable
	 * @param mixed input
	 * @return string
	 *
	 * @see http://jsperf.com/typeofvar
	 */

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)(module)))

/***/ })
/******/ ]);