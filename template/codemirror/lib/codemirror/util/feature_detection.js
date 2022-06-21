"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zeroWidthElement = zeroWidthElement;
exports.hasBadBidiRects = hasBadBidiRects;
exports.hasBadZoomedRects = hasBadZoomedRects;
exports.hasCopyEvent = exports.hasSelection = exports.splitLinesAuto = exports.dragAndDrop = void 0;

var _dom = require("./dom.js");

var _browser = require("./browser.js");

// Detect drag-and-drop
let dragAndDrop = function () {
  // There is *some* kind of drag-and-drop support in IE6-8, but I
  // couldn't get it to work yet.
  if (_browser.ie && _browser.ie_version < 9) return false;
  let div = (0, _dom.elt)('div');
  return "draggable" in div || "dragDrop" in div;
}();

exports.dragAndDrop = dragAndDrop;
let zwspSupported;

function zeroWidthElement(measure) {
  if (zwspSupported == null) {
    let test = (0, _dom.elt)("span", "\u200b");
    (0, _dom.removeChildrenAndAdd)(measure, (0, _dom.elt)("span", [test, document.createTextNode("x")]));
    if (measure.firstChild.offsetHeight != 0) zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(_browser.ie && _browser.ie_version < 8);
  }

  let node = zwspSupported ? (0, _dom.elt)("span", "\u200b") : (0, _dom.elt)("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
  node.setAttribute("cm-text", "");
  return node;
} // Feature-detect IE's crummy client rect reporting for bidi text


let badBidiRects;

function hasBadBidiRects(measure) {
  if (badBidiRects != null) return badBidiRects;
  let txt = (0, _dom.removeChildrenAndAdd)(measure, document.createTextNode("A\u062eA"));
  let r0 = (0, _dom.range)(txt, 0, 1).getBoundingClientRect();
  let r1 = (0, _dom.range)(txt, 1, 2).getBoundingClientRect();
  (0, _dom.removeChildren)(measure);
  if (!r0 || r0.left == r0.right) return false; // Safari returns null in some cases (#2780)

  return badBidiRects = r1.right - r0.right < 3;
} // See if "".split is the broken IE version, if so, provide an
// alternative way to split lines.


let splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? string => {
  let pos = 0,
      result = [],
      l = string.length;

  while (pos <= l) {
    let nl = string.indexOf("\n", pos);
    if (nl == -1) nl = string.length;
    let line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
    let rt = line.indexOf("\r");

    if (rt != -1) {
      result.push(line.slice(0, rt));
      pos += rt + 1;
    } else {
      result.push(line);
      pos = nl + 1;
    }
  }

  return result;
} : string => string.split(/\r\n?|\n/);
exports.splitLinesAuto = splitLinesAuto;
let hasSelection = window.getSelection ? te => {
  try {
    return te.selectionStart != te.selectionEnd;
  } catch (e) {
    return false;
  }
} : te => {
  let range;

  try {
    range = te.ownerDocument.selection.createRange();
  } catch (e) {}

  if (!range || range.parentElement() != te) return false;
  return range.compareEndPoints("StartToEnd", range) != 0;
};
exports.hasSelection = hasSelection;

let hasCopyEvent = (() => {
  let e = (0, _dom.elt)("div");
  if ("oncopy" in e) return true;
  e.setAttribute("oncopy", "return;");
  return typeof e.oncopy == "function";
})();

exports.hasCopyEvent = hasCopyEvent;
let badZoomedRects = null;

function hasBadZoomedRects(measure) {
  if (badZoomedRects != null) return badZoomedRects;
  let node = (0, _dom.removeChildrenAndAdd)(measure, (0, _dom.elt)("span", "x"));
  let normal = node.getBoundingClientRect();
  let fromRange = (0, _dom.range)(node, 0, 1).getBoundingClientRect();
  return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
}