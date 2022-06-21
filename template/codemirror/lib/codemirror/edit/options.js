"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineOptions = defineOptions;
exports.optionHandlers = exports.defaults = exports.Init = void 0;

var _focus = require("../display/focus.js");

var _gutters = require("../display/gutters.js");

var _mode_state = require("../display/mode_state.js");

var _scrollbars = require("../display/scrollbars.js");

var _selection = require("../display/selection.js");

var _view_tracking = require("../display/view_tracking.js");

var _keymap = require("../input/keymap.js");

var _line_data = require("../line/line_data.js");

var _pos = require("../line/pos.js");

var _spans = require("../line/spans.js");

var _position_measurement = require("../measurement/position_measurement.js");

var _changes = require("../model/changes.js");

var _browser = require("../util/browser.js");

var _dom = require("../util/dom.js");

var _event = require("../util/event.js");

var _utils = require("./utils.js");

let Init = {
  toString: function () {
    return "CodeMirror.Init";
  }
};
exports.Init = Init;
let defaults = {};
exports.defaults = defaults;
let optionHandlers = {};
exports.optionHandlers = optionHandlers;

function defineOptions(CodeMirror) {
  let optionHandlers = CodeMirror.optionHandlers;

  function option(name, deflt, handle, notOnInit) {
    CodeMirror.defaults[name] = deflt;
    if (handle) optionHandlers[name] = notOnInit ? (cm, val, old) => {
      if (old != Init) handle(cm, val, old);
    } : handle;
  }

  CodeMirror.defineOption = option; // Passed to option handlers when there is no old value.

  CodeMirror.Init = Init; // These two are, on init, called from the constructor because they
  // have to be initialized before the editor can start at all.

  option("value", "", (cm, val) => cm.setValue(val), true);
  option("mode", null, (cm, val) => {
    cm.doc.modeOption = val;
    (0, _mode_state.loadMode)(cm);
  }, true);
  option("indentUnit", 2, _mode_state.loadMode, true);
  option("indentWithTabs", false);
  option("smartIndent", true);
  option("tabSize", 4, cm => {
    (0, _mode_state.resetModeState)(cm);
    (0, _position_measurement.clearCaches)(cm);
    (0, _view_tracking.regChange)(cm);
  }, true);
  option("lineSeparator", null, (cm, val) => {
    cm.doc.lineSep = val;
    if (!val) return;
    let newBreaks = [],
        lineNo = cm.doc.first;
    cm.doc.iter(line => {
      for (let pos = 0;;) {
        let found = line.text.indexOf(val, pos);
        if (found == -1) break;
        pos = found + val.length;
        newBreaks.push((0, _pos.Pos)(lineNo, found));
      }

      lineNo++;
    });

    for (let i = newBreaks.length - 1; i >= 0; i--) (0, _changes.replaceRange)(cm.doc, val, newBreaks[i], (0, _pos.Pos)(newBreaks[i].line, newBreaks[i].ch + val.length));
  });
  option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, (cm, val, old) => {
    cm.state.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
    if (old != Init) cm.refresh();
  });
  option("specialCharPlaceholder", _line_data.defaultSpecialCharPlaceholder, cm => cm.refresh(), true);
  option("electricChars", true);
  option("inputStyle", _browser.mobile ? "contenteditable" : "textarea", () => {
    throw new Error("inputStyle can not (yet) be changed in a running editor"); // FIXME
  }, true);
  option("spellcheck", false, (cm, val) => cm.getInputField().spellcheck = val, true);
  option("autocorrect", false, (cm, val) => cm.getInputField().autocorrect = val, true);
  option("autocapitalize", false, (cm, val) => cm.getInputField().autocapitalize = val, true);
  option("rtlMoveVisually", !_browser.windows);
  option("wholeLineUpdateBefore", true);
  option("theme", "default", cm => {
    (0, _utils.themeChanged)(cm);
    (0, _gutters.updateGutters)(cm);
  }, true);
  option("keyMap", "default", (cm, val, old) => {
    let next = (0, _keymap.getKeyMap)(val);
    let prev = old != Init && (0, _keymap.getKeyMap)(old);
    if (prev && prev.detach) prev.detach(cm, next);
    if (next.attach) next.attach(cm, prev || null);
  });
  option("extraKeys", null);
  option("configureMouse", null);
  option("lineWrapping", false, wrappingChanged, true);
  option("gutters", [], (cm, val) => {
    cm.display.gutterSpecs = (0, _gutters.getGutters)(val, cm.options.lineNumbers);
    (0, _gutters.updateGutters)(cm);
  }, true);
  option("fixedGutter", true, (cm, val) => {
    cm.display.gutters.style.left = val ? (0, _position_measurement.compensateForHScroll)(cm.display) + "px" : "0";
    cm.refresh();
  }, true);
  option("coverGutterNextToScrollbar", false, cm => (0, _scrollbars.updateScrollbars)(cm), true);
  option("scrollbarStyle", "native", cm => {
    (0, _scrollbars.initScrollbars)(cm);
    (0, _scrollbars.updateScrollbars)(cm);
    cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
    cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
  }, true);
  option("lineNumbers", false, (cm, val) => {
    cm.display.gutterSpecs = (0, _gutters.getGutters)(cm.options.gutters, val);
    (0, _gutters.updateGutters)(cm);
  }, true);
  option("firstLineNumber", 1, _gutters.updateGutters, true);
  option("lineNumberFormatter", integer => integer, _gutters.updateGutters, true);
  option("showCursorWhenSelecting", false, _selection.updateSelection, true);
  option("resetSelectionOnContextMenu", true);
  option("lineWiseCopyCut", true);
  option("pasteLinesPerSelection", true);
  option("selectionsMayTouch", false);
  option("readOnly", false, (cm, val) => {
    if (val == "nocursor") {
      (0, _focus.onBlur)(cm);
      cm.display.input.blur();
    }

    cm.display.input.readOnlyChanged(val);
  });
  option("screenReaderLabel", null, (cm, val) => {
    val = val === '' ? null : val;
    cm.display.input.screenReaderLabelChanged(val);
  });
  option("disableInput", false, (cm, val) => {
    if (!val) cm.display.input.reset();
  }, true);
  option("dragDrop", true, dragDropChanged);
  option("allowDropFileTypes", null);
  option("cursorBlinkRate", 530);
  option("cursorScrollMargin", 0);
  option("cursorHeight", 1, _selection.updateSelection, true);
  option("singleCursorHeightPerLine", true, _selection.updateSelection, true);
  option("workTime", 100);
  option("workDelay", 100);
  option("flattenSpans", true, _mode_state.resetModeState, true);
  option("addModeClass", false, _mode_state.resetModeState, true);
  option("pollInterval", 100);
  option("undoDepth", 200, (cm, val) => cm.doc.history.undoDepth = val);
  option("historyEventDelay", 1250);
  option("viewportMargin", 10, cm => cm.refresh(), true);
  option("maxHighlightLength", 10000, _mode_state.resetModeState, true);
  option("moveInputWithCursor", true, (cm, val) => {
    if (!val) cm.display.input.resetPosition();
  });
  option("tabindex", null, (cm, val) => cm.display.input.getField().tabIndex = val || "");
  option("autofocus", null);
  option("direction", "ltr", (cm, val) => cm.doc.setDirection(val), true);
  option("phrases", null);
}

function dragDropChanged(cm, value, old) {
  let wasOn = old && old != Init;

  if (!value != !wasOn) {
    let funcs = cm.display.dragFunctions;
    let toggle = value ? _event.on : _event.off;
    toggle(cm.display.scroller, "dragstart", funcs.start);
    toggle(cm.display.scroller, "dragenter", funcs.enter);
    toggle(cm.display.scroller, "dragover", funcs.over);
    toggle(cm.display.scroller, "dragleave", funcs.leave);
    toggle(cm.display.scroller, "drop", funcs.drop);
  }
}

function wrappingChanged(cm) {
  if (cm.options.lineWrapping) {
    (0, _dom.addClass)(cm.display.wrapper, "CodeMirror-wrap");
    cm.display.sizer.style.minWidth = "";
    cm.display.sizerWidth = null;
  } else {
    (0, _dom.rmClass)(cm.display.wrapper, "CodeMirror-wrap");
    (0, _spans.findMaxLine)(cm);
  }

  (0, _position_measurement.estimateLineHeights)(cm);
  (0, _view_tracking.regChange)(cm);
  (0, _position_measurement.clearCaches)(cm);
  setTimeout(() => (0, _scrollbars.updateScrollbars)(cm), 100);
}