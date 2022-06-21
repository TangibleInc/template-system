"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indentLine = indentLine;

var _highlight = require("../line/highlight.js");

var _pos = require("../line/pos.js");

var _utils_line = require("../line/utils_line.js");

var _changes = require("../model/changes.js");

var _selection = require("../model/selection.js");

var _selection_updates = require("../model/selection_updates.js");

var _misc = require("../util/misc.js");

// Indent the given line. The how parameter can be "smart",
// "add"/null, "subtract", or "prev". When aggressive is false
// (typically set to true for forced single-line indents), empty
// lines are not indented, and places where the mode returns Pass
// are left alone.
function indentLine(cm, n, how, aggressive) {
  let doc = cm.doc,
      state;
  if (how == null) how = "add";

  if (how == "smart") {
    // Fall back to "prev" when the mode doesn't have an indentation
    // method.
    if (!doc.mode.indent) how = "prev";else state = (0, _highlight.getContextBefore)(cm, n).state;
  }

  let tabSize = cm.options.tabSize;
  let line = (0, _utils_line.getLine)(doc, n),
      curSpace = (0, _misc.countColumn)(line.text, null, tabSize);
  if (line.stateAfter) line.stateAfter = null;
  let curSpaceString = line.text.match(/^\s*/)[0],
      indentation;

  if (!aggressive && !/\S/.test(line.text)) {
    indentation = 0;
    how = "not";
  } else if (how == "smart") {
    indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);

    if (indentation == _misc.Pass || indentation > 150) {
      if (!aggressive) return;
      how = "prev";
    }
  }

  if (how == "prev") {
    if (n > doc.first) indentation = (0, _misc.countColumn)((0, _utils_line.getLine)(doc, n - 1).text, null, tabSize);else indentation = 0;
  } else if (how == "add") {
    indentation = curSpace + cm.options.indentUnit;
  } else if (how == "subtract") {
    indentation = curSpace - cm.options.indentUnit;
  } else if (typeof how == "number") {
    indentation = curSpace + how;
  }

  indentation = Math.max(0, indentation);
  let indentString = "",
      pos = 0;
  if (cm.options.indentWithTabs) for (let i = Math.floor(indentation / tabSize); i; --i) {
    pos += tabSize;
    indentString += "\t";
  }
  if (pos < indentation) indentString += (0, _misc.spaceStr)(indentation - pos);

  if (indentString != curSpaceString) {
    (0, _changes.replaceRange)(doc, indentString, (0, _pos.Pos)(n, 0), (0, _pos.Pos)(n, curSpaceString.length), "+input");
    line.stateAfter = null;
    return true;
  } else {
    // Ensure that, if the cursor was in the whitespace at the start
    // of the line, it is moved to the end of that space.
    for (let i = 0; i < doc.sel.ranges.length; i++) {
      let range = doc.sel.ranges[i];

      if (range.head.line == n && range.head.ch < curSpaceString.length) {
        let pos = (0, _pos.Pos)(n, curSpaceString.length);
        (0, _selection_updates.replaceOneSelection)(doc, i, new _selection.Range(pos, pos));
        break;
      }
    }
  }
}