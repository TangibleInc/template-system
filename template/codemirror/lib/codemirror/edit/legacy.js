"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLegacyProps = addLegacyProps;

var _scrollbars = require("../display/scrollbars.js");

var _scroll_events = require("../display/scroll_events.js");

var _keymap = require("../input/keymap.js");

var _keynames = require("../input/keynames.js");

var _line_data = require("../line/line_data.js");

var _pos = require("../line/pos.js");

var _change_measurement = require("../model/change_measurement.js");

var _Doc = _interopRequireDefault(require("../model/Doc.js"));

var _line_widget = require("../model/line_widget.js");

var _mark_text = require("../model/mark_text.js");

var _modes = require("../modes.js");

var _dom = require("../util/dom.js");

var _event = require("../util/event.js");

var _feature_detection = require("../util/feature_detection.js");

var _misc = require("../util/misc.js");

var _StringStream = _interopRequireDefault(require("../util/StringStream.js"));

var _commands = require("./commands.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addLegacyProps(CodeMirror) {
  CodeMirror.off = _event.off;
  CodeMirror.on = _event.on;
  CodeMirror.wheelEventPixels = _scroll_events.wheelEventPixels;
  CodeMirror.Doc = _Doc.default;
  CodeMirror.splitLines = _feature_detection.splitLinesAuto;
  CodeMirror.countColumn = _misc.countColumn;
  CodeMirror.findColumn = _misc.findColumn;
  CodeMirror.isWordChar = _misc.isWordCharBasic;
  CodeMirror.Pass = _misc.Pass;
  CodeMirror.signal = _event.signal;
  CodeMirror.Line = _line_data.Line;
  CodeMirror.changeEnd = _change_measurement.changeEnd;
  CodeMirror.scrollbarModel = _scrollbars.scrollbarModel;
  CodeMirror.Pos = _pos.Pos;
  CodeMirror.cmpPos = _pos.cmp;
  CodeMirror.modes = _modes.modes;
  CodeMirror.mimeModes = _modes.mimeModes;
  CodeMirror.resolveMode = _modes.resolveMode;
  CodeMirror.getMode = _modes.getMode;
  CodeMirror.modeExtensions = _modes.modeExtensions;
  CodeMirror.extendMode = _modes.extendMode;
  CodeMirror.copyState = _modes.copyState;
  CodeMirror.startState = _modes.startState;
  CodeMirror.innerMode = _modes.innerMode;
  CodeMirror.commands = _commands.commands;
  CodeMirror.keyMap = _keymap.keyMap;
  CodeMirror.keyName = _keymap.keyName;
  CodeMirror.isModifierKey = _keymap.isModifierKey;
  CodeMirror.lookupKey = _keymap.lookupKey;
  CodeMirror.normalizeKeyMap = _keymap.normalizeKeyMap;
  CodeMirror.StringStream = _StringStream.default;
  CodeMirror.SharedTextMarker = _mark_text.SharedTextMarker;
  CodeMirror.TextMarker = _mark_text.TextMarker;
  CodeMirror.LineWidget = _line_widget.LineWidget;
  CodeMirror.e_preventDefault = _event.e_preventDefault;
  CodeMirror.e_stopPropagation = _event.e_stopPropagation;
  CodeMirror.e_stop = _event.e_stop;
  CodeMirror.addClass = _dom.addClass;
  CodeMirror.contains = _dom.contains;
  CodeMirror.rmClass = _dom.rmClass;
  CodeMirror.keyNames = _keynames.keyNames;
}