"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendRange = extendRange;
exports.extendSelection = extendSelection;
exports.extendSelections = extendSelections;
exports.replaceOneSelection = replaceOneSelection;
exports.setSimpleSelection = setSimpleSelection;
exports.setSelectionReplaceHistory = setSelectionReplaceHistory;
exports.setSelection = setSelection;
exports.setSelectionNoUndo = setSelectionNoUndo;
exports.reCheckSelection = reCheckSelection;
exports.skipAtomic = skipAtomic;
exports.selectAll = selectAll;

var _operation_group = require("../util/operation_group.js");

var _scrolling = require("../display/scrolling.js");

var _pos = require("../line/pos.js");

var _utils_line = require("../line/utils_line.js");

var _event = require("../util/event.js");

var _misc = require("../util/misc.js");

var _history = require("./history.js");

var _selection = require("./selection.js");

// The 'scroll' parameter given to many of these indicated whether
// the new cursor position should be scrolled into view after
// modifying the selection.
// If shift is held or the extend flag is set, extends a range to
// include a given position (and optionally a second position).
// Otherwise, simply returns the range between the given positions.
// Used for cursor motion and such.
function extendRange(range, head, other, extend) {
  if (extend) {
    let anchor = range.anchor;

    if (other) {
      let posBefore = (0, _pos.cmp)(head, anchor) < 0;

      if (posBefore != (0, _pos.cmp)(other, anchor) < 0) {
        anchor = head;
        head = other;
      } else if (posBefore != (0, _pos.cmp)(head, other) < 0) {
        head = other;
      }
    }

    return new _selection.Range(anchor, head);
  } else {
    return new _selection.Range(other || head, head);
  }
} // Extend the primary selection range, discard the rest.


function extendSelection(doc, head, other, options, extend) {
  if (extend == null) extend = doc.cm && (doc.cm.display.shift || doc.extend);
  setSelection(doc, new _selection.Selection([extendRange(doc.sel.primary(), head, other, extend)], 0), options);
} // Extend all selections (pos is an array of selections with length
// equal the number of selections)


function extendSelections(doc, heads, options) {
  let out = [];
  let extend = doc.cm && (doc.cm.display.shift || doc.extend);

  for (let i = 0; i < doc.sel.ranges.length; i++) out[i] = extendRange(doc.sel.ranges[i], heads[i], null, extend);

  let newSel = (0, _selection.normalizeSelection)(doc.cm, out, doc.sel.primIndex);
  setSelection(doc, newSel, options);
} // Updates a single range in the selection.


function replaceOneSelection(doc, i, range, options) {
  let ranges = doc.sel.ranges.slice(0);
  ranges[i] = range;
  setSelection(doc, (0, _selection.normalizeSelection)(doc.cm, ranges, doc.sel.primIndex), options);
} // Reset the selection to a single range.


function setSimpleSelection(doc, anchor, head, options) {
  setSelection(doc, (0, _selection.simpleSelection)(anchor, head), options);
} // Give beforeSelectionChange handlers a change to influence a
// selection update.


function filterSelectionChange(doc, sel, options) {
  let obj = {
    ranges: sel.ranges,
    update: function (ranges) {
      this.ranges = [];

      for (let i = 0; i < ranges.length; i++) this.ranges[i] = new _selection.Range((0, _pos.clipPos)(doc, ranges[i].anchor), (0, _pos.clipPos)(doc, ranges[i].head));
    },
    origin: options && options.origin
  };
  (0, _event.signal)(doc, "beforeSelectionChange", doc, obj);
  if (doc.cm) (0, _event.signal)(doc.cm, "beforeSelectionChange", doc.cm, obj);
  if (obj.ranges != sel.ranges) return (0, _selection.normalizeSelection)(doc.cm, obj.ranges, obj.ranges.length - 1);else return sel;
}

function setSelectionReplaceHistory(doc, sel, options) {
  let done = doc.history.done,
      last = (0, _misc.lst)(done);

  if (last && last.ranges) {
    done[done.length - 1] = sel;
    setSelectionNoUndo(doc, sel, options);
  } else {
    setSelection(doc, sel, options);
  }
} // Set a new selection.


function setSelection(doc, sel, options) {
  setSelectionNoUndo(doc, sel, options);
  (0, _history.addSelectionToHistory)(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
}

function setSelectionNoUndo(doc, sel, options) {
  if ((0, _event.hasHandler)(doc, "beforeSelectionChange") || doc.cm && (0, _event.hasHandler)(doc.cm, "beforeSelectionChange")) sel = filterSelectionChange(doc, sel, options);
  let bias = options && options.bias || ((0, _pos.cmp)(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
  setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));
  if (!(options && options.scroll === false) && doc.cm && doc.cm.getOption("readOnly") != "nocursor") (0, _scrolling.ensureCursorVisible)(doc.cm);
}

function setSelectionInner(doc, sel) {
  if (sel.equals(doc.sel)) return;
  doc.sel = sel;

  if (doc.cm) {
    doc.cm.curOp.updateInput = 1;
    doc.cm.curOp.selectionChanged = true;
    (0, _event.signalCursorActivity)(doc.cm);
  }

  (0, _operation_group.signalLater)(doc, "cursorActivity", doc);
} // Verify that the selection does not partially select any atomic
// marked ranges.


function reCheckSelection(doc) {
  setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false));
} // Return a selection that does not partially select any atomic
// ranges.


function skipAtomicInSelection(doc, sel, bias, mayClear) {
  let out;

  for (let i = 0; i < sel.ranges.length; i++) {
    let range = sel.ranges[i];
    let old = sel.ranges.length == doc.sel.ranges.length && doc.sel.ranges[i];
    let newAnchor = skipAtomic(doc, range.anchor, old && old.anchor, bias, mayClear);
    let newHead = skipAtomic(doc, range.head, old && old.head, bias, mayClear);

    if (out || newAnchor != range.anchor || newHead != range.head) {
      if (!out) out = sel.ranges.slice(0, i);
      out[i] = new _selection.Range(newAnchor, newHead);
    }
  }

  return out ? (0, _selection.normalizeSelection)(doc.cm, out, sel.primIndex) : sel;
}

function skipAtomicInner(doc, pos, oldPos, dir, mayClear) {
  let line = (0, _utils_line.getLine)(doc, pos.line);
  if (line.markedSpans) for (let i = 0; i < line.markedSpans.length; ++i) {
    let sp = line.markedSpans[i],
        m = sp.marker; // Determine if we should prevent the cursor being placed to the left/right of an atomic marker
    // Historically this was determined using the inclusiveLeft/Right option, but the new way to control it
    // is with selectLeft/Right

    let preventCursorLeft = "selectLeft" in m ? !m.selectLeft : m.inclusiveLeft;
    let preventCursorRight = "selectRight" in m ? !m.selectRight : m.inclusiveRight;

    if ((sp.from == null || (preventCursorLeft ? sp.from <= pos.ch : sp.from < pos.ch)) && (sp.to == null || (preventCursorRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
      if (mayClear) {
        (0, _event.signal)(m, "beforeCursorEnter");

        if (m.explicitlyCleared) {
          if (!line.markedSpans) break;else {
            --i;
            continue;
          }
        }
      }

      if (!m.atomic) continue;

      if (oldPos) {
        let near = m.find(dir < 0 ? 1 : -1),
            diff;
        if (dir < 0 ? preventCursorRight : preventCursorLeft) near = movePos(doc, near, -dir, near && near.line == pos.line ? line : null);
        if (near && near.line == pos.line && (diff = (0, _pos.cmp)(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0)) return skipAtomicInner(doc, near, pos, dir, mayClear);
      }

      let far = m.find(dir < 0 ? -1 : 1);
      if (dir < 0 ? preventCursorLeft : preventCursorRight) far = movePos(doc, far, dir, far.line == pos.line ? line : null);
      return far ? skipAtomicInner(doc, far, pos, dir, mayClear) : null;
    }
  }
  return pos;
} // Ensure a given position is not inside an atomic range.


function skipAtomic(doc, pos, oldPos, bias, mayClear) {
  let dir = bias || 1;
  let found = skipAtomicInner(doc, pos, oldPos, dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, dir, true) || skipAtomicInner(doc, pos, oldPos, -dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, -dir, true);

  if (!found) {
    doc.cantEdit = true;
    return (0, _pos.Pos)(doc.first, 0);
  }

  return found;
}

function movePos(doc, pos, dir, line) {
  if (dir < 0 && pos.ch == 0) {
    if (pos.line > doc.first) return (0, _pos.clipPos)(doc, (0, _pos.Pos)(pos.line - 1));else return null;
  } else if (dir > 0 && pos.ch == (line || (0, _utils_line.getLine)(doc, pos.line)).text.length) {
    if (pos.line < doc.first + doc.size - 1) return (0, _pos.Pos)(pos.line + 1, 0);else return null;
  } else {
    return new _pos.Pos(pos.line, pos.ch + dir);
  }
}

function selectAll(cm) {
  cm.setSelection((0, _pos.Pos)(cm.firstLine(), 0), (0, _pos.Pos)(cm.lastLine()), _misc.sel_dontScroll);
}