"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchKey = dispatchKey;
exports.onKeyDown = onKeyDown;
exports.onKeyUp = onKeyUp;
exports.onKeyPress = onKeyPress;

var _operation_group = require("../util/operation_group.js");

var _selection = require("../display/selection.js");

var _keymap = require("../input/keymap.js");

var _widgets = require("../measurement/widgets.js");

var _browser = require("../util/browser.js");

var _dom = require("../util/dom.js");

var _event = require("../util/event.js");

var _feature_detection = require("../util/feature_detection.js");

var _misc = require("../util/misc.js");

var _commands = require("./commands.js");

// Run a handler that was bound to a key.
function doHandleBinding(cm, bound, dropShift) {
  if (typeof bound == "string") {
    bound = _commands.commands[bound];
    if (!bound) return false;
  } // Ensure previous input has been read, so that the handler sees a
  // consistent view of the document


  cm.display.input.ensurePolled();
  let prevShift = cm.display.shift,
      done = false;

  try {
    if (cm.isReadOnly()) cm.state.suppressEdits = true;
    if (dropShift) cm.display.shift = false;
    done = bound(cm) != _misc.Pass;
  } finally {
    cm.display.shift = prevShift;
    cm.state.suppressEdits = false;
  }

  return done;
}

function lookupKeyForEditor(cm, name, handle) {
  for (let i = 0; i < cm.state.keyMaps.length; i++) {
    let result = (0, _keymap.lookupKey)(name, cm.state.keyMaps[i], handle, cm);
    if (result) return result;
  }

  return cm.options.extraKeys && (0, _keymap.lookupKey)(name, cm.options.extraKeys, handle, cm) || (0, _keymap.lookupKey)(name, cm.options.keyMap, handle, cm);
} // Note that, despite the name, this function is also used to check
// for bound mouse clicks.


let stopSeq = new _misc.Delayed();

function dispatchKey(cm, name, e, handle) {
  let seq = cm.state.keySeq;

  if (seq) {
    if ((0, _keymap.isModifierKey)(name)) return "handled";
    if (/\'$/.test(name)) cm.state.keySeq = null;else stopSeq.set(50, () => {
      if (cm.state.keySeq == seq) {
        cm.state.keySeq = null;
        cm.display.input.reset();
      }
    });
    if (dispatchKeyInner(cm, seq + " " + name, e, handle)) return true;
  }

  return dispatchKeyInner(cm, name, e, handle);
}

function dispatchKeyInner(cm, name, e, handle) {
  let result = lookupKeyForEditor(cm, name, handle);
  if (result == "multi") cm.state.keySeq = name;
  if (result == "handled") (0, _operation_group.signalLater)(cm, "keyHandled", cm, name, e);

  if (result == "handled" || result == "multi") {
    (0, _event.e_preventDefault)(e);
    (0, _selection.restartBlink)(cm);
  }

  return !!result;
} // Handle a key from the keydown event.


function handleKeyBinding(cm, e) {
  let name = (0, _keymap.keyName)(e, true);
  if (!name) return false;

  if (e.shiftKey && !cm.state.keySeq) {
    // First try to resolve full name (including 'Shift-'). Failing
    // that, see if there is a cursor-motion command (starting with
    // 'go') bound to the keyname without 'Shift-'.
    return dispatchKey(cm, "Shift-" + name, e, b => doHandleBinding(cm, b, true)) || dispatchKey(cm, name, e, b => {
      if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) return doHandleBinding(cm, b);
    });
  } else {
    return dispatchKey(cm, name, e, b => doHandleBinding(cm, b));
  }
} // Handle a key from the keypress event


function handleCharBinding(cm, e, ch) {
  return dispatchKey(cm, "'" + ch + "'", e, b => doHandleBinding(cm, b, true));
}

let lastStoppedKey = null;

function onKeyDown(e) {
  let cm = this;
  if (e.target && e.target != cm.display.input.getField()) return;
  cm.curOp.focus = (0, _dom.activeElt)();
  if ((0, _event.signalDOMEvent)(cm, e)) return; // IE does strange things with escape.

  if (_browser.ie && _browser.ie_version < 11 && e.keyCode == 27) e.returnValue = false;
  let code = e.keyCode;
  cm.display.shift = code == 16 || e.shiftKey;
  let handled = handleKeyBinding(cm, e);

  if (_browser.presto) {
    lastStoppedKey = handled ? code : null; // Opera has no cut event... we try to at least catch the key combo

    if (!handled && code == 88 && !_feature_detection.hasCopyEvent && (_browser.mac ? e.metaKey : e.ctrlKey)) cm.replaceSelection("", null, "cut");
  }

  if (_browser.gecko && !_browser.mac && !handled && code == 46 && e.shiftKey && !e.ctrlKey && document.execCommand) document.execCommand("cut"); // Turn mouse into crosshair when Alt is held on Mac.

  if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className)) showCrossHair(cm);
}

function showCrossHair(cm) {
  let lineDiv = cm.display.lineDiv;
  (0, _dom.addClass)(lineDiv, "CodeMirror-crosshair");

  function up(e) {
    if (e.keyCode == 18 || !e.altKey) {
      (0, _dom.rmClass)(lineDiv, "CodeMirror-crosshair");
      (0, _event.off)(document, "keyup", up);
      (0, _event.off)(document, "mouseover", up);
    }
  }

  (0, _event.on)(document, "keyup", up);
  (0, _event.on)(document, "mouseover", up);
}

function onKeyUp(e) {
  if (e.keyCode == 16) this.doc.sel.shift = false;
  (0, _event.signalDOMEvent)(this, e);
}

function onKeyPress(e) {
  let cm = this;
  if (e.target && e.target != cm.display.input.getField()) return;
  if ((0, _widgets.eventInWidget)(cm.display, e) || (0, _event.signalDOMEvent)(cm, e) || e.ctrlKey && !e.altKey || _browser.mac && e.metaKey) return;
  let keyCode = e.keyCode,
      charCode = e.charCode;

  if (_browser.presto && keyCode == lastStoppedKey) {
    lastStoppedKey = null;
    (0, _event.e_preventDefault)(e);
    return;
  }

  if (_browser.presto && (!e.which || e.which < 10) && handleKeyBinding(cm, e)) return;
  let ch = String.fromCharCode(charCode == null ? keyCode : charCode); // Some browsers fire keypress events for backspace

  if (ch == "\x08") return;
  if (handleCharBinding(cm, e, ch)) return;
  cm.display.input.onKeyPress(e);
}