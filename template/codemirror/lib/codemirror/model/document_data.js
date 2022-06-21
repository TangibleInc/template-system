"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWholeLineUpdate = isWholeLineUpdate;
exports.updateDoc = updateDoc;
exports.linkedDocs = linkedDocs;
exports.attachDoc = attachDoc;
exports.directionChanged = directionChanged;

var _mode_state = require("../display/mode_state.js");

var _operations = require("../display/operations.js");

var _view_tracking = require("../display/view_tracking.js");

var _line_data = require("../line/line_data.js");

var _spans = require("../line/spans.js");

var _utils_line = require("../line/utils_line.js");

var _position_measurement = require("../measurement/position_measurement.js");

var _dom = require("../util/dom.js");

var _misc = require("../util/misc.js");

var _operation_group = require("../util/operation_group.js");

// DOCUMENT DATA STRUCTURE
// By default, updates that start and end at the beginning of a line
// are treated specially, in order to make the association of line
// widgets and marker elements with the text behave more intuitive.
function isWholeLineUpdate(doc, change) {
  return change.from.ch == 0 && change.to.ch == 0 && (0, _misc.lst)(change.text) == "" && (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
} // Perform a change on the document data structure.


function updateDoc(doc, change, markedSpans, estimateHeight) {
  function spansFor(n) {
    return markedSpans ? markedSpans[n] : null;
  }

  function update(line, text, spans) {
    (0, _line_data.updateLine)(line, text, spans, estimateHeight);
    (0, _operation_group.signalLater)(line, "change", line, change);
  }

  function linesFor(start, end) {
    let result = [];

    for (let i = start; i < end; ++i) result.push(new _line_data.Line(text[i], spansFor(i), estimateHeight));

    return result;
  }

  let from = change.from,
      to = change.to,
      text = change.text;
  let firstLine = (0, _utils_line.getLine)(doc, from.line),
      lastLine = (0, _utils_line.getLine)(doc, to.line);
  let lastText = (0, _misc.lst)(text),
      lastSpans = spansFor(text.length - 1),
      nlines = to.line - from.line; // Adjust the line structure

  if (change.full) {
    doc.insert(0, linesFor(0, text.length));
    doc.remove(text.length, doc.size - text.length);
  } else if (isWholeLineUpdate(doc, change)) {
    // This is a whole-line replace. Treated specially to make
    // sure line objects move the way they are supposed to.
    let added = linesFor(0, text.length - 1);
    update(lastLine, lastLine.text, lastSpans);
    if (nlines) doc.remove(from.line, nlines);
    if (added.length) doc.insert(from.line, added);
  } else if (firstLine == lastLine) {
    if (text.length == 1) {
      update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
    } else {
      let added = linesFor(1, text.length - 1);
      added.push(new _line_data.Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight));
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
      doc.insert(from.line + 1, added);
    }
  } else if (text.length == 1) {
    update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
    doc.remove(from.line + 1, nlines);
  } else {
    update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
    update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
    let added = linesFor(1, text.length - 1);
    if (nlines > 1) doc.remove(from.line + 1, nlines - 1);
    doc.insert(from.line + 1, added);
  }

  (0, _operation_group.signalLater)(doc, "change", doc, change);
} // Call f for all linked documents.


function linkedDocs(doc, f, sharedHistOnly) {
  function propagate(doc, skip, sharedHist) {
    if (doc.linked) for (let i = 0; i < doc.linked.length; ++i) {
      let rel = doc.linked[i];
      if (rel.doc == skip) continue;
      let shared = sharedHist && rel.sharedHist;
      if (sharedHistOnly && !shared) continue;
      f(rel.doc, shared);
      propagate(rel.doc, doc, shared);
    }
  }

  propagate(doc, null, true);
} // Attach a document to an editor.


function attachDoc(cm, doc) {
  if (doc.cm) throw new Error("This document is already in use.");
  cm.doc = doc;
  doc.cm = cm;
  (0, _position_measurement.estimateLineHeights)(cm);
  (0, _mode_state.loadMode)(cm);
  setDirectionClass(cm);
  cm.options.direction = doc.direction;
  if (!cm.options.lineWrapping) (0, _spans.findMaxLine)(cm);
  cm.options.mode = doc.modeOption;
  (0, _view_tracking.regChange)(cm);
}

function setDirectionClass(cm) {
  ;
  (cm.doc.direction == "rtl" ? _dom.addClass : _dom.rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
}

function directionChanged(cm) {
  (0, _operations.runInOp)(cm, () => {
    setDirectionClass(cm);
    (0, _view_tracking.regChange)(cm);
  });
}