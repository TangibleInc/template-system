"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeMirror = CodeMirror;
exports.default = void 0;

var _Display = require("../display/Display.js");

var _focus = require("../display/focus.js");

var _line_numbers = require("../display/line_numbers.js");

var _operations = require("../display/operations.js");

var _scrollbars = require("../display/scrollbars.js");

var _scroll_events = require("../display/scroll_events.js");

var _scrolling = require("../display/scrolling.js");

var _pos = require("../line/pos.js");

var _position_measurement = require("../measurement/position_measurement.js");

var _widgets = require("../measurement/widgets.js");

var _Doc = _interopRequireDefault(require("../model/Doc.js"));

var _document_data = require("../model/document_data.js");

var _selection = require("../model/selection.js");

var _selection_updates = require("../model/selection_updates.js");

var _browser = require("../util/browser.js");

var _event = require("../util/event.js");

var _misc = require("../util/misc.js");

var _drop_events = require("./drop_events.js");

var _global_events = require("./global_events.js");

var _key_events = require("./key_events.js");

var _mouse_events = require("./mouse_events.js");

var _utils = require("./utils.js");

var _options = require("./options.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A CodeMirror instance represents an editor. This is the object
// that user code is usually dealing with.
function CodeMirror(place, options) {
  if (!(this instanceof CodeMirror)) return new CodeMirror(place, options);
  this.options = options = options ? (0, _misc.copyObj)(options) : {}; // Determine effective options based on given values and defaults.

  (0, _misc.copyObj)(_options.defaults, options, false);
  let doc = options.value;
  if (typeof doc == "string") doc = new _Doc.default(doc, options.mode, null, options.lineSeparator, options.direction);else if (options.mode) doc.modeOption = options.mode;
  this.doc = doc;
  let input = new CodeMirror.inputStyles[options.inputStyle](this);
  let display = this.display = new _Display.Display(place, doc, input, options);
  display.wrapper.CodeMirror = this;
  (0, _utils.themeChanged)(this);
  if (options.lineWrapping) this.display.wrapper.className += " CodeMirror-wrap";
  (0, _scrollbars.initScrollbars)(this);
  this.state = {
    keyMaps: [],
    // stores maps added by addKeyMap
    overlays: [],
    // highlighting overlays, as added by addOverlay
    modeGen: 0,
    // bumped when mode/overlay changes, used to invalidate highlighting info
    overwrite: false,
    delayingBlurEvent: false,
    focused: false,
    suppressEdits: false,
    // used to disable editing during key handlers when in readOnly mode
    pasteIncoming: -1,
    cutIncoming: -1,
    // help recognize paste/cut edits in input.poll
    selectingText: false,
    draggingText: false,
    highlight: new _misc.Delayed(),
    // stores highlight worker timeout
    keySeq: null,
    // Unfinished key sequence
    specialChars: null
  };
  if (options.autofocus && !_browser.mobile) display.input.focus(); // Override magic textarea content restore that IE sometimes does
  // on our hidden textarea on reload

  if (_browser.ie && _browser.ie_version < 11) setTimeout(() => this.display.input.reset(true), 20);
  registerEventHandlers(this);
  (0, _global_events.ensureGlobalHandlers)();
  (0, _operations.startOperation)(this);
  this.curOp.forceUpdate = true;
  (0, _document_data.attachDoc)(this, doc);
  if (options.autofocus && !_browser.mobile || this.hasFocus()) setTimeout(() => {
    if (this.hasFocus() && !this.state.focused) (0, _focus.onFocus)(this);
  }, 20);else (0, _focus.onBlur)(this);

  for (let opt in _options.optionHandlers) if (_options.optionHandlers.hasOwnProperty(opt)) _options.optionHandlers[opt](this, options[opt], _options.Init);

  (0, _line_numbers.maybeUpdateLineNumberWidth)(this);
  if (options.finishInit) options.finishInit(this);

  for (let i = 0; i < initHooks.length; ++i) initHooks[i](this);

  (0, _operations.endOperation)(this); // Suppress optimizelegibility in Webkit, since it breaks text
  // measuring on line wrapping boundaries.

  if (_browser.webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility") display.lineDiv.style.textRendering = "auto";
} // The default configuration options.


CodeMirror.defaults = _options.defaults; // Functions to run when options are changed.

CodeMirror.optionHandlers = _options.optionHandlers;
var _default = CodeMirror; // Attach the necessary event handlers when initializing the editor

exports.default = _default;

function registerEventHandlers(cm) {
  let d = cm.display;
  (0, _event.on)(d.scroller, "mousedown", (0, _operations.operation)(cm, _mouse_events.onMouseDown)); // Older IE's will not fire a second mousedown for a double click

  if (_browser.ie && _browser.ie_version < 11) (0, _event.on)(d.scroller, "dblclick", (0, _operations.operation)(cm, e => {
    if ((0, _event.signalDOMEvent)(cm, e)) return;
    let pos = (0, _position_measurement.posFromMouse)(cm, e);
    if (!pos || (0, _mouse_events.clickInGutter)(cm, e) || (0, _widgets.eventInWidget)(cm.display, e)) return;
    (0, _event.e_preventDefault)(e);
    let word = cm.findWordAt(pos);
    (0, _selection_updates.extendSelection)(cm.doc, word.anchor, word.head);
  }));else (0, _event.on)(d.scroller, "dblclick", e => (0, _event.signalDOMEvent)(cm, e) || (0, _event.e_preventDefault)(e)); // Some browsers fire contextmenu *after* opening the menu, at
  // which point we can't mess with it anymore. Context menu is
  // handled in onMouseDown for these browsers.

  (0, _event.on)(d.scroller, "contextmenu", e => (0, _mouse_events.onContextMenu)(cm, e));
  (0, _event.on)(d.input.getField(), "contextmenu", e => {
    if (!d.scroller.contains(e.target)) (0, _mouse_events.onContextMenu)(cm, e);
  }); // Used to suppress mouse event handling when a touch happens

  let touchFinished,
      prevTouch = {
    end: 0
  };

  function finishTouch() {
    if (d.activeTouch) {
      touchFinished = setTimeout(() => d.activeTouch = null, 1000);
      prevTouch = d.activeTouch;
      prevTouch.end = +new Date();
    }
  }

  function isMouseLikeTouchEvent(e) {
    if (e.touches.length != 1) return false;
    let touch = e.touches[0];
    return touch.radiusX <= 1 && touch.radiusY <= 1;
  }

  function farAway(touch, other) {
    if (other.left == null) return true;
    let dx = other.left - touch.left,
        dy = other.top - touch.top;
    return dx * dx + dy * dy > 20 * 20;
  }

  (0, _event.on)(d.scroller, "touchstart", e => {
    if (!(0, _event.signalDOMEvent)(cm, e) && !isMouseLikeTouchEvent(e) && !(0, _mouse_events.clickInGutter)(cm, e)) {
      d.input.ensurePolled();
      clearTimeout(touchFinished);
      let now = +new Date();
      d.activeTouch = {
        start: now,
        moved: false,
        prev: now - prevTouch.end <= 300 ? prevTouch : null
      };

      if (e.touches.length == 1) {
        d.activeTouch.left = e.touches[0].pageX;
        d.activeTouch.top = e.touches[0].pageY;
      }
    }
  });
  (0, _event.on)(d.scroller, "touchmove", () => {
    if (d.activeTouch) d.activeTouch.moved = true;
  });
  (0, _event.on)(d.scroller, "touchend", e => {
    let touch = d.activeTouch;

    if (touch && !(0, _widgets.eventInWidget)(d, e) && touch.left != null && !touch.moved && new Date() - touch.start < 300) {
      let pos = cm.coordsChar(d.activeTouch, "page"),
          range;
      if (!touch.prev || farAway(touch, touch.prev)) // Single tap
        range = new _selection.Range(pos, pos);else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) // Double tap
        range = cm.findWordAt(pos);else // Triple tap
        range = new _selection.Range((0, _pos.Pos)(pos.line, 0), (0, _pos.clipPos)(cm.doc, (0, _pos.Pos)(pos.line + 1, 0)));
      cm.setSelection(range.anchor, range.head);
      cm.focus();
      (0, _event.e_preventDefault)(e);
    }

    finishTouch();
  });
  (0, _event.on)(d.scroller, "touchcancel", finishTouch); // Sync scrolling between fake scrollbars and real scrollable
  // area, ensure viewport is updated when scrolling.

  (0, _event.on)(d.scroller, "scroll", () => {
    if (d.scroller.clientHeight) {
      (0, _scrolling.updateScrollTop)(cm, d.scroller.scrollTop);
      (0, _scrolling.setScrollLeft)(cm, d.scroller.scrollLeft, true);
      (0, _event.signal)(cm, "scroll", cm);
    }
  }); // Listen to wheel events in order to try and update the viewport on time.

  (0, _event.on)(d.scroller, "mousewheel", e => (0, _scroll_events.onScrollWheel)(cm, e));
  (0, _event.on)(d.scroller, "DOMMouseScroll", e => (0, _scroll_events.onScrollWheel)(cm, e)); // Prevent wrapper from ever scrolling

  (0, _event.on)(d.wrapper, "scroll", () => d.wrapper.scrollTop = d.wrapper.scrollLeft = 0);
  d.dragFunctions = {
    enter: e => {
      if (!(0, _event.signalDOMEvent)(cm, e)) (0, _event.e_stop)(e);
    },
    over: e => {
      if (!(0, _event.signalDOMEvent)(cm, e)) {
        (0, _drop_events.onDragOver)(cm, e);
        (0, _event.e_stop)(e);
      }
    },
    start: e => (0, _drop_events.onDragStart)(cm, e),
    drop: (0, _operations.operation)(cm, _drop_events.onDrop),
    leave: e => {
      if (!(0, _event.signalDOMEvent)(cm, e)) {
        (0, _drop_events.clearDragCursor)(cm);
      }
    }
  };
  let inp = d.input.getField();
  (0, _event.on)(inp, "keyup", e => _key_events.onKeyUp.call(cm, e));
  (0, _event.on)(inp, "keydown", (0, _operations.operation)(cm, _key_events.onKeyDown));
  (0, _event.on)(inp, "keypress", (0, _operations.operation)(cm, _key_events.onKeyPress));
  (0, _event.on)(inp, "focus", e => (0, _focus.onFocus)(cm, e));
  (0, _event.on)(inp, "blur", e => (0, _focus.onBlur)(cm, e));
}

let initHooks = [];

CodeMirror.defineInitHook = f => initHooks.push(f);