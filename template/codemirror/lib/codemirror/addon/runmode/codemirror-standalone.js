"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _StringStream = _interopRequireDefault(require("../../util/StringStream.js"));

var _misc = require("../../util/misc.js");

var modeMethods = _interopRequireWildcard(require("../../modes.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// declare global: globalThis, CodeMirror
// Create a minimal CodeMirror needed to use runMode, and assign to root.
var root = typeof globalThis !== 'undefined' ? globalThis : window;
root.CodeMirror = {}; // Copy StringStream and mode methods into CodeMirror object.

CodeMirror.StringStream = _StringStream.default;

for (var exported in modeMethods) CodeMirror[exported] = modeMethods[exported]; // Minimal default mode.


CodeMirror.defineMode("null", () => ({
  token: stream => stream.skipToEnd()
}));
CodeMirror.defineMIME("text/plain", "null");
CodeMirror.registerHelper = CodeMirror.registerGlobalHelper = Math.min;

CodeMirror.splitLines = function (string) {
  return string.split(/\r?\n|\r/);
};

CodeMirror.countColumn = _misc.countColumn;
CodeMirror.defaults = {
  indentUnit: 2
};
var _default = CodeMirror;
exports.default = _default;