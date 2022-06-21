"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureFocus = ensureFocus;
exports.delayBlurEvent = delayBlurEvent;
exports.onFocus = onFocus;
exports.onBlur = onBlur;

var _selection = require("./selection.js");

var _browser = require("../util/browser.js");

var _dom = require("../util/dom.js");

var _event = require("../util/event.js");

function ensureFocus(cm) {
  if (!cm.hasFocus()) {
    cm.display.input.focus();
    if (!cm.state.focused) onFocus(cm);
  }
}

function delayBlurEvent(cm) {
  cm.state.delayingBlurEvent = true;
  setTimeout(() => {
    if (cm.state.delayingBlurEvent) {
      cm.state.delayingBlurEvent = false;
      if (cm.state.focused) onBlur(cm);
    }
  }, 100);
}

function onFocus(cm, e) {
  if (cm.state.delayingBlurEvent && !cm.state.draggingText) cm.state.delayingBlurEvent = false;
  if (cm.options.readOnly == "nocursor") return;

  if (!cm.state.focused) {
    (0, _event.signal)(cm, "focus", cm, e);
    cm.state.focused = true;
    (0, _dom.addClass)(cm.display.wrapper, "CodeMirror-focused"); // This test prevents this from firing when a context
    // menu is closed (since the input reset would kill the
    // select-all detection hack)

    if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
      cm.display.input.reset();
      if (_browser.webkit) setTimeout(() => cm.display.input.reset(true), 20); // Issue #1730
    }

    cm.display.input.receivedFocus();
  }

  (0, _selection.restartBlink)(cm);
}

function onBlur(cm, e) {
  if (cm.state.delayingBlurEvent) return;

  if (cm.state.focused) {
    (0, _event.signal)(cm, "blur", cm, e);
    cm.state.focused = false;
    (0, _dom.rmClass)(cm.display.wrapper, "CodeMirror-focused");
  }

  clearInterval(cm.display.blinker);
  setTimeout(() => {
    if (!cm.state.focused) cm.display.shift = false;
  }, 150);
}