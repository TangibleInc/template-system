"use strict";

var _StringStream = _interopRequireDefault(require("../../util/StringStream.js"));

var modeMethods = _interopRequireWildcard(require("../../modes.js"));

var _misc = require("../../util/misc.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copy StringStream and mode methods into exports (CodeMirror) object.
exports.StringStream = _StringStream.default;
exports.countColumn = _misc.countColumn;

for (var exported in modeMethods) exports[exported] = modeMethods[exported]; // Shim library CodeMirror with the minimal CodeMirror defined above.


require.cache[require.resolve("../../lib/codemirror")] = require.cache[require.resolve("./runmode.node")];
require.cache[require.resolve("../../addon/runmode/runmode")] = require.cache[require.resolve("./runmode.node")]; // Minimal default mode.

exports.defineMode("null", () => ({
  token: stream => stream.skipToEnd()
}));
exports.defineMIME("text/plain", "null");
exports.registerHelper = exports.registerGlobalHelper = Math.min;

exports.splitLines = function (string) {
  return string.split(/\r?\n|\r/);
};

exports.defaults = {
  indentUnit: 2
};