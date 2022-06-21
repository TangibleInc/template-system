"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CodeMirror", {
  enumerable: true,
  get: function () {
    return _CodeMirror.CodeMirror;
  }
});

var _CodeMirror = require("./CodeMirror.js");

var _event = require("../util/event.js");

var _misc = require("../util/misc.js");

var _options = require("./options.js");

var _methods = _interopRequireDefault(require("./methods.js"));

var _Doc = _interopRequireDefault(require("../model/Doc.js"));

var _ContentEditableInput = _interopRequireDefault(require("../input/ContentEditableInput.js"));

var _TextareaInput = _interopRequireDefault(require("../input/TextareaInput.js"));

var _modes = require("../modes.js");

var _fromTextArea = require("./fromTextArea.js");

var _legacy = require("./legacy.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// EDITOR CONSTRUCTOR
(0, _options.defineOptions)(_CodeMirror.CodeMirror);
(0, _methods.default)(_CodeMirror.CodeMirror);
// Set up methods on CodeMirror's prototype to redirect to the editor's document.
let dontDelegate = "iter insert remove copy getEditor constructor".split(" ");

for (let prop in _Doc.default.prototype) if (_Doc.default.prototype.hasOwnProperty(prop) && (0, _misc.indexOf)(dontDelegate, prop) < 0) _CodeMirror.CodeMirror.prototype[prop] = function (method) {
  return function () {
    return method.apply(this.doc, arguments);
  };
}(_Doc.default.prototype[prop]);

(0, _event.eventMixin)(_Doc.default); // INPUT HANDLING

_CodeMirror.CodeMirror.inputStyles = {
  "textarea": _TextareaInput.default,
  "contenteditable": _ContentEditableInput.default
}; // MODE DEFINITION AND QUERYING

// Extra arguments are stored as the mode's dependencies, which is
// used by (legacy) mechanisms like loadmode.js to automatically
// load a mode. (Preferred mechanism is the require/define calls.)
_CodeMirror.CodeMirror.defineMode = function (name
/*, mode, …*/
) {
  if (!_CodeMirror.CodeMirror.defaults.mode && name != "null") _CodeMirror.CodeMirror.defaults.mode = name;

  _modes.defineMode.apply(this, arguments);
};

_CodeMirror.CodeMirror.defineMIME = _modes.defineMIME; // Minimal default mode.

_CodeMirror.CodeMirror.defineMode("null", () => ({
  token: stream => stream.skipToEnd()
}));

_CodeMirror.CodeMirror.defineMIME("text/plain", "null"); // EXTENSIONS


_CodeMirror.CodeMirror.defineExtension = (name, func) => {
  _CodeMirror.CodeMirror.prototype[name] = func;
};

_CodeMirror.CodeMirror.defineDocExtension = (name, func) => {
  _Doc.default.prototype[name] = func;
};

_CodeMirror.CodeMirror.fromTextArea = _fromTextArea.fromTextArea;
(0, _legacy.addLegacyProps)(_CodeMirror.CodeMirror);
_CodeMirror.CodeMirror.version = "5.63.1";