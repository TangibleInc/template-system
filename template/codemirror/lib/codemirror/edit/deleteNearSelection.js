"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteNearSelection = deleteNearSelection;

var _operations = require("../display/operations.js");

var _scrolling = require("../display/scrolling.js");

var _pos = require("../line/pos.js");

var _changes = require("../model/changes.js");

var _misc = require("../util/misc.js");

// Helper for deleting text near the selection(s), used to implement
// backspace, delete, and similar functionality.
function deleteNearSelection(cm, compute) {
  let ranges = cm.doc.sel.ranges,
      kill = []; // Build up a set of ranges to kill first, merging overlapping
  // ranges.

  for (let i = 0; i < ranges.length; i++) {
    let toKill = compute(ranges[i]);

    while (kill.length && (0, _pos.cmp)(toKill.from, (0, _misc.lst)(kill).to) <= 0) {
      let replaced = kill.pop();

      if ((0, _pos.cmp)(replaced.from, toKill.from) < 0) {
        toKill.from = replaced.from;
        break;
      }
    }

    kill.push(toKill);
  } // Next, remove those actual ranges.


  (0, _operations.runInOp)(cm, () => {
    for (let i = kill.length - 1; i >= 0; i--) (0, _changes.replaceRange)(cm.doc, "", kill[i].from, kill[i].to, "+delete");

    (0, _scrolling.ensureCursorVisible)(cm);
  });
}