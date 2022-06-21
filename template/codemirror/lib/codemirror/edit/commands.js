"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commands = void 0;

var _deleteNearSelection = require("./deleteNearSelection.js");

var _operations = require("../display/operations.js");

var _scrolling = require("../display/scrolling.js");

var _movement = require("../input/movement.js");

var _pos = require("../line/pos.js");

var _spans = require("../line/spans.js");

var _utils_line = require("../line/utils_line.js");

var _selection = require("../model/selection.js");

var _selection_updates = require("../model/selection_updates.js");

var _misc = require("../util/misc.js");

var _bidi = require("../util/bidi.js");

// Commands are parameter-less actions that can be performed on an
// editor, mostly used for keybindings.
let commands = {
  selectAll: _selection_updates.selectAll,
  singleSelection: cm => cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), _misc.sel_dontScroll),
  killLine: cm => (0, _deleteNearSelection.deleteNearSelection)(cm, range => {
    if (range.empty()) {
      let len = (0, _utils_line.getLine)(cm.doc, range.head.line).text.length;
      if (range.head.ch == len && range.head.line < cm.lastLine()) return {
        from: range.head,
        to: (0, _pos.Pos)(range.head.line + 1, 0)
      };else return {
        from: range.head,
        to: (0, _pos.Pos)(range.head.line, len)
      };
    } else {
      return {
        from: range.from(),
        to: range.to()
      };
    }
  }),
  deleteLine: cm => (0, _deleteNearSelection.deleteNearSelection)(cm, range => ({
    from: (0, _pos.Pos)(range.from().line, 0),
    to: (0, _pos.clipPos)(cm.doc, (0, _pos.Pos)(range.to().line + 1, 0))
  })),
  delLineLeft: cm => (0, _deleteNearSelection.deleteNearSelection)(cm, range => ({
    from: (0, _pos.Pos)(range.from().line, 0),
    to: range.from()
  })),
  delWrappedLineLeft: cm => (0, _deleteNearSelection.deleteNearSelection)(cm, range => {
    let top = cm.charCoords(range.head, "div").top + 5;
    let leftPos = cm.coordsChar({
      left: 0,
      top: top
    }, "div");
    return {
      from: leftPos,
      to: range.from()
    };
  }),
  delWrappedLineRight: cm => (0, _deleteNearSelection.deleteNearSelection)(cm, range => {
    let top = cm.charCoords(range.head, "div").top + 5;
    let rightPos = cm.coordsChar({
      left: cm.display.lineDiv.offsetWidth + 100,
      top: top
    }, "div");
    return {
      from: range.from(),
      to: rightPos
    };
  }),
  undo: cm => cm.undo(),
  redo: cm => cm.redo(),
  undoSelection: cm => cm.undoSelection(),
  redoSelection: cm => cm.redoSelection(),
  goDocStart: cm => cm.extendSelection((0, _pos.Pos)(cm.firstLine(), 0)),
  goDocEnd: cm => cm.extendSelection((0, _pos.Pos)(cm.lastLine())),
  goLineStart: cm => cm.extendSelectionsBy(range => lineStart(cm, range.head.line), {
    origin: "+move",
    bias: 1
  }),
  goLineStartSmart: cm => cm.extendSelectionsBy(range => lineStartSmart(cm, range.head), {
    origin: "+move",
    bias: 1
  }),
  goLineEnd: cm => cm.extendSelectionsBy(range => lineEnd(cm, range.head.line), {
    origin: "+move",
    bias: -1
  }),
  goLineRight: cm => cm.extendSelectionsBy(range => {
    let top = cm.cursorCoords(range.head, "div").top + 5;
    return cm.coordsChar({
      left: cm.display.lineDiv.offsetWidth + 100,
      top: top
    }, "div");
  }, _misc.sel_move),
  goLineLeft: cm => cm.extendSelectionsBy(range => {
    let top = cm.cursorCoords(range.head, "div").top + 5;
    return cm.coordsChar({
      left: 0,
      top: top
    }, "div");
  }, _misc.sel_move),
  goLineLeftSmart: cm => cm.extendSelectionsBy(range => {
    let top = cm.cursorCoords(range.head, "div").top + 5;
    let pos = cm.coordsChar({
      left: 0,
      top: top
    }, "div");
    if (pos.ch < cm.getLine(pos.line).search(/\S/)) return lineStartSmart(cm, range.head);
    return pos;
  }, _misc.sel_move),
  goLineUp: cm => cm.moveV(-1, "line"),
  goLineDown: cm => cm.moveV(1, "line"),
  goPageUp: cm => cm.moveV(-1, "page"),
  goPageDown: cm => cm.moveV(1, "page"),
  goCharLeft: cm => cm.moveH(-1, "char"),
  goCharRight: cm => cm.moveH(1, "char"),
  goColumnLeft: cm => cm.moveH(-1, "column"),
  goColumnRight: cm => cm.moveH(1, "column"),
  goWordLeft: cm => cm.moveH(-1, "word"),
  goGroupRight: cm => cm.moveH(1, "group"),
  goGroupLeft: cm => cm.moveH(-1, "group"),
  goWordRight: cm => cm.moveH(1, "word"),
  delCharBefore: cm => cm.deleteH(-1, "codepoint"),
  delCharAfter: cm => cm.deleteH(1, "char"),
  delWordBefore: cm => cm.deleteH(-1, "word"),
  delWordAfter: cm => cm.deleteH(1, "word"),
  delGroupBefore: cm => cm.deleteH(-1, "group"),
  delGroupAfter: cm => cm.deleteH(1, "group"),
  indentAuto: cm => cm.indentSelection("smart"),
  indentMore: cm => cm.indentSelection("add"),
  indentLess: cm => cm.indentSelection("subtract"),
  insertTab: cm => cm.replaceSelection("\t"),
  insertSoftTab: cm => {
    let spaces = [],
        ranges = cm.listSelections(),
        tabSize = cm.options.tabSize;

    for (let i = 0; i < ranges.length; i++) {
      let pos = ranges[i].from();
      let col = (0, _misc.countColumn)(cm.getLine(pos.line), pos.ch, tabSize);
      spaces.push((0, _misc.spaceStr)(tabSize - col % tabSize));
    }

    cm.replaceSelections(spaces);
  },
  defaultTab: cm => {
    if (cm.somethingSelected()) cm.indentSelection("add");else cm.execCommand("insertTab");
  },
  // Swap the two chars left and right of each selection's head.
  // Move cursor behind the two swapped characters afterwards.
  //
  // Doesn't consider line feeds a character.
  // Doesn't scan more than one line above to find a character.
  // Doesn't do anything on an empty line.
  // Doesn't do anything with non-empty selections.
  transposeChars: cm => (0, _operations.runInOp)(cm, () => {
    let ranges = cm.listSelections(),
        newSel = [];

    for (let i = 0; i < ranges.length; i++) {
      if (!ranges[i].empty()) continue;
      let cur = ranges[i].head,
          line = (0, _utils_line.getLine)(cm.doc, cur.line).text;

      if (line) {
        if (cur.ch == line.length) cur = new _pos.Pos(cur.line, cur.ch - 1);

        if (cur.ch > 0) {
          cur = new _pos.Pos(cur.line, cur.ch + 1);
          cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2), (0, _pos.Pos)(cur.line, cur.ch - 2), cur, "+transpose");
        } else if (cur.line > cm.doc.first) {
          let prev = (0, _utils_line.getLine)(cm.doc, cur.line - 1).text;

          if (prev) {
            cur = new _pos.Pos(cur.line, 1);
            cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() + prev.charAt(prev.length - 1), (0, _pos.Pos)(cur.line - 1, prev.length - 1), cur, "+transpose");
          }
        }
      }

      newSel.push(new _selection.Range(cur, cur));
    }

    cm.setSelections(newSel);
  }),
  newlineAndIndent: cm => (0, _operations.runInOp)(cm, () => {
    let sels = cm.listSelections();

    for (let i = sels.length - 1; i >= 0; i--) cm.replaceRange(cm.doc.lineSeparator(), sels[i].anchor, sels[i].head, "+input");

    sels = cm.listSelections();

    for (let i = 0; i < sels.length; i++) cm.indentLine(sels[i].from().line, null, true);

    (0, _scrolling.ensureCursorVisible)(cm);
  }),
  openLine: cm => cm.replaceSelection("\n", "start"),
  toggleOverwrite: cm => cm.toggleOverwrite()
};
exports.commands = commands;

function lineStart(cm, lineN) {
  let line = (0, _utils_line.getLine)(cm.doc, lineN);
  let visual = (0, _spans.visualLine)(line);
  if (visual != line) lineN = (0, _utils_line.lineNo)(visual);
  return (0, _movement.endOfLine)(true, cm, visual, lineN, 1);
}

function lineEnd(cm, lineN) {
  let line = (0, _utils_line.getLine)(cm.doc, lineN);
  let visual = (0, _spans.visualLineEnd)(line);
  if (visual != line) lineN = (0, _utils_line.lineNo)(visual);
  return (0, _movement.endOfLine)(true, cm, line, lineN, -1);
}

function lineStartSmart(cm, pos) {
  let start = lineStart(cm, pos.line);
  let line = (0, _utils_line.getLine)(cm.doc, start.line);
  let order = (0, _bidi.getOrder)(line, cm.doc.direction);

  if (!order || order[0].level == 0) {
    let firstNonWS = Math.max(start.ch, line.text.search(/\S/));
    let inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
    return (0, _pos.Pos)(start.line, inWS ? 0 : firstNonWS, start.sticky);
  }

  return start;
}