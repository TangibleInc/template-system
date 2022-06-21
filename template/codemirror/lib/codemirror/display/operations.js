"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startOperation = startOperation;
exports.endOperation = endOperation;
exports.runInOp = runInOp;
exports.operation = operation;
exports.methodOp = methodOp;
exports.docMethodOp = docMethodOp;

var _pos = require("../line/pos.js");

var _spans = require("../line/spans.js");

var _position_measurement = require("../measurement/position_measurement.js");

var _event = require("../util/event.js");

var _dom = require("../util/dom.js");

var _operation_group = require("../util/operation_group.js");

var _focus = require("./focus.js");

var _scrollbars = require("./scrollbars.js");

var _selection = require("./selection.js");

var _scrolling = require("./scrolling.js");

var _update_display = require("./update_display.js");

var _update_lines = require("./update_lines.js");

// Operations are used to wrap a series of changes to the editor
// state in such a way that each change won't have to update the
// cursor and display (which would be awkward, slow, and
// error-prone). Instead, display updates are batched and then all
// combined and executed at once.
let nextOpId = 0; // Start a new operation.

function startOperation(cm) {
  cm.curOp = {
    cm: cm,
    viewChanged: false,
    // Flag that indicates that lines might need to be redrawn
    startHeight: cm.doc.height,
    // Used to detect need to update scrollbar
    forceUpdate: false,
    // Used to force a redraw
    updateInput: 0,
    // Whether to reset the input textarea
    typing: false,
    // Whether this reset should be careful to leave existing text (for compositing)
    changeObjs: null,
    // Accumulated changes, for firing change events
    cursorActivityHandlers: null,
    // Set of handlers to fire cursorActivity on
    cursorActivityCalled: 0,
    // Tracks which cursorActivity handlers have been called already
    selectionChanged: false,
    // Whether the selection needs to be redrawn
    updateMaxLine: false,
    // Set when the widest line needs to be determined anew
    scrollLeft: null,
    scrollTop: null,
    // Intermediate scroll position, not pushed to DOM yet
    scrollToPos: null,
    // Used to scroll to a specific position
    focus: false,
    id: ++nextOpId,
    // Unique ID
    markArrays: null // Used by addMarkedSpan

  };
  (0, _operation_group.pushOperation)(cm.curOp);
} // Finish an operation, updating the display and signalling delayed events


function endOperation(cm) {
  let op = cm.curOp;
  if (op) (0, _operation_group.finishOperation)(op, group => {
    for (let i = 0; i < group.ops.length; i++) group.ops[i].cm.curOp = null;

    endOperations(group);
  });
} // The DOM updates done when an operation finishes are batched so
// that the minimum number of relayouts are required.


function endOperations(group) {
  let ops = group.ops;

  for (let i = 0; i < ops.length; i++) // Read DOM
  endOperation_R1(ops[i]);

  for (let i = 0; i < ops.length; i++) // Write DOM (maybe)
  endOperation_W1(ops[i]);

  for (let i = 0; i < ops.length; i++) // Read DOM
  endOperation_R2(ops[i]);

  for (let i = 0; i < ops.length; i++) // Write DOM (maybe)
  endOperation_W2(ops[i]);

  for (let i = 0; i < ops.length; i++) // Read DOM
  endOperation_finish(ops[i]);
}

function endOperation_R1(op) {
  let cm = op.cm,
      display = cm.display;
  (0, _update_display.maybeClipScrollbars)(cm);
  if (op.updateMaxLine) (0, _spans.findMaxLine)(cm);
  op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping;
  op.update = op.mustUpdate && new _update_display.DisplayUpdate(cm, op.mustUpdate && {
    top: op.scrollTop,
    ensure: op.scrollToPos
  }, op.forceUpdate);
}

function endOperation_W1(op) {
  op.updatedDisplay = op.mustUpdate && (0, _update_display.updateDisplayIfNeeded)(op.cm, op.update);
}

function endOperation_R2(op) {
  let cm = op.cm,
      display = cm.display;
  if (op.updatedDisplay) (0, _update_lines.updateHeightsInViewport)(cm);
  op.barMeasure = (0, _scrollbars.measureForScrollbars)(cm); // If the max line changed since it was last measured, measure it,
  // and ensure the document's width matches it.
  // updateDisplay_W2 will use these properties to do the actual resizing

  if (display.maxLineChanged && !cm.options.lineWrapping) {
    op.adjustWidthTo = (0, _position_measurement.measureChar)(cm, display.maxLine, display.maxLine.text.length).left + 3;
    cm.display.sizerWidth = op.adjustWidthTo;
    op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + (0, _position_measurement.scrollGap)(cm) + cm.display.barWidth);
    op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - (0, _position_measurement.displayWidth)(cm));
  }

  if (op.updatedDisplay || op.selectionChanged) op.preparedSelection = display.input.prepareSelection();
}

function endOperation_W2(op) {
  let cm = op.cm;

  if (op.adjustWidthTo != null) {
    cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
    if (op.maxScrollLeft < cm.doc.scrollLeft) (0, _scrolling.setScrollLeft)(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
    cm.display.maxLineChanged = false;
  }

  let takeFocus = op.focus && op.focus == (0, _dom.activeElt)();
  if (op.preparedSelection) cm.display.input.showSelection(op.preparedSelection, takeFocus);
  if (op.updatedDisplay || op.startHeight != cm.doc.height) (0, _scrollbars.updateScrollbars)(cm, op.barMeasure);
  if (op.updatedDisplay) (0, _update_display.setDocumentHeight)(cm, op.barMeasure);
  if (op.selectionChanged) (0, _selection.restartBlink)(cm);
  if (cm.state.focused && op.updateInput) cm.display.input.reset(op.typing);
  if (takeFocus) (0, _focus.ensureFocus)(op.cm);
}

function endOperation_finish(op) {
  let cm = op.cm,
      display = cm.display,
      doc = cm.doc;
  if (op.updatedDisplay) (0, _update_display.postUpdateDisplay)(cm, op.update); // Abort mouse wheel delta measurement, when scrolling explicitly

  if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos)) display.wheelStartX = display.wheelStartY = null; // Propagate the scroll position to the actual DOM scroller

  if (op.scrollTop != null) (0, _scrolling.setScrollTop)(cm, op.scrollTop, op.forceScroll);
  if (op.scrollLeft != null) (0, _scrolling.setScrollLeft)(cm, op.scrollLeft, true, true); // If we need to scroll a specific position into view, do so.

  if (op.scrollToPos) {
    let rect = (0, _scrolling.scrollPosIntoView)(cm, (0, _pos.clipPos)(doc, op.scrollToPos.from), (0, _pos.clipPos)(doc, op.scrollToPos.to), op.scrollToPos.margin);
    (0, _scrolling.maybeScrollWindow)(cm, rect);
  } // Fire events for markers that are hidden/unidden by editing or
  // undoing


  let hidden = op.maybeHiddenMarkers,
      unhidden = op.maybeUnhiddenMarkers;
  if (hidden) for (let i = 0; i < hidden.length; ++i) if (!hidden[i].lines.length) (0, _event.signal)(hidden[i], "hide");
  if (unhidden) for (let i = 0; i < unhidden.length; ++i) if (unhidden[i].lines.length) (0, _event.signal)(unhidden[i], "unhide");
  if (display.wrapper.offsetHeight) doc.scrollTop = cm.display.scroller.scrollTop; // Fire change events, and delayed event handlers

  if (op.changeObjs) (0, _event.signal)(cm, "changes", cm, op.changeObjs);
  if (op.update) op.update.finish();
} // Run the given function in an operation


function runInOp(cm, f) {
  if (cm.curOp) return f();
  startOperation(cm);

  try {
    return f();
  } finally {
    endOperation(cm);
  }
} // Wraps a function in an operation. Returns the wrapped function.


function operation(cm, f) {
  return function () {
    if (cm.curOp) return f.apply(cm, arguments);
    startOperation(cm);

    try {
      return f.apply(cm, arguments);
    } finally {
      endOperation(cm);
    }
  };
} // Used to add methods to editor and doc instances, wrapping them in
// operations.


function methodOp(f) {
  return function () {
    if (this.curOp) return f.apply(this, arguments);
    startOperation(this);

    try {
      return f.apply(this, arguments);
    } finally {
      endOperation(this);
    }
  };
}

function docMethodOp(f) {
  return function () {
    let cm = this.cm;
    if (!cm || cm.curOp) return f.apply(this, arguments);
    startOperation(cm);

    try {
      return f.apply(this, arguments);
    } finally {
      endOperation(cm);
    }
  };
}