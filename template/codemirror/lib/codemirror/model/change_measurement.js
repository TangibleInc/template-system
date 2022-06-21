"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeEnd = changeEnd;
exports.computeSelAfterChange = computeSelAfterChange;
exports.computeReplacedSel = computeReplacedSel;

var _pos = require("../line/pos.js");

var _misc = require("../util/misc.js");

var _selection = require("./selection.js");

// Compute the position of the end of a change (its 'to' property
// refers to the pre-change end).
function changeEnd(change) {
  if (!change.text) return change.to;
  return (0, _pos.Pos)(change.from.line + change.text.length - 1, (0, _misc.lst)(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
} // Adjust a position to refer to the post-change position of the
// same text, or the end of the change if the change covers it.


function adjustForChange(pos, change) {
  if ((0, _pos.cmp)(pos, change.from) < 0) return pos;
  if ((0, _pos.cmp)(pos, change.to) <= 0) return changeEnd(change);
  let line = pos.line + change.text.length - (change.to.line - change.from.line) - 1,
      ch = pos.ch;
  if (pos.line == change.to.line) ch += changeEnd(change).ch - change.to.ch;
  return (0, _pos.Pos)(line, ch);
}

function computeSelAfterChange(doc, change) {
  let out = [];

  for (let i = 0; i < doc.sel.ranges.length; i++) {
    let range = doc.sel.ranges[i];
    out.push(new _selection.Range(adjustForChange(range.anchor, change), adjustForChange(range.head, change)));
  }

  return (0, _selection.normalizeSelection)(doc.cm, out, doc.sel.primIndex);
}

function offsetPos(pos, old, nw) {
  if (pos.line == old.line) return (0, _pos.Pos)(nw.line, pos.ch - old.ch + nw.ch);else return (0, _pos.Pos)(nw.line + (pos.line - old.line), pos.ch);
} // Used by replaceSelections to allow moving the selection to the
// start or around the replaced test. Hint may be "start" or "around".


function computeReplacedSel(doc, changes, hint) {
  let out = [];
  let oldPrev = (0, _pos.Pos)(doc.first, 0),
      newPrev = oldPrev;

  for (let i = 0; i < changes.length; i++) {
    let change = changes[i];
    let from = offsetPos(change.from, oldPrev, newPrev);
    let to = offsetPos(changeEnd(change), oldPrev, newPrev);
    oldPrev = change.to;
    newPrev = to;

    if (hint == "around") {
      let range = doc.sel.ranges[i],
          inv = (0, _pos.cmp)(range.head, range.anchor) < 0;
      out[i] = new _selection.Range(inv ? to : from, inv ? from : to);
    } else {
      out[i] = new _selection.Range(from, from);
    }
  }

  return new _selection.Selection(out, doc.sel.primIndex);
}