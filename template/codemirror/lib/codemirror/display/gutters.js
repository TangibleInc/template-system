"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGutters = getGutters;
exports.renderGutters = renderGutters;
exports.updateGutters = updateGutters;

var _dom = require("../util/dom.js");

var _view_tracking = require("./view_tracking.js");

var _line_numbers = require("./line_numbers.js");

var _update_display = require("./update_display.js");

function getGutters(gutters, lineNumbers) {
  let result = [],
      sawLineNumbers = false;

  for (let i = 0; i < gutters.length; i++) {
    let name = gutters[i],
        style = null;

    if (typeof name != "string") {
      style = name.style;
      name = name.className;
    }

    if (name == "CodeMirror-linenumbers") {
      if (!lineNumbers) continue;else sawLineNumbers = true;
    }

    result.push({
      className: name,
      style
    });
  }

  if (lineNumbers && !sawLineNumbers) result.push({
    className: "CodeMirror-linenumbers",
    style: null
  });
  return result;
} // Rebuild the gutter elements, ensure the margin to the left of the
// code matches their width.


function renderGutters(display) {
  let gutters = display.gutters,
      specs = display.gutterSpecs;
  (0, _dom.removeChildren)(gutters);
  display.lineGutter = null;

  for (let i = 0; i < specs.length; ++i) {
    let {
      className,
      style
    } = specs[i];
    let gElt = gutters.appendChild((0, _dom.elt)("div", null, "CodeMirror-gutter " + className));
    if (style) gElt.style.cssText = style;

    if (className == "CodeMirror-linenumbers") {
      display.lineGutter = gElt;
      gElt.style.width = (display.lineNumWidth || 1) + "px";
    }
  }

  gutters.style.display = specs.length ? "" : "none";
  (0, _update_display.updateGutterSpace)(display);
}

function updateGutters(cm) {
  renderGutters(cm.display);
  (0, _view_tracking.regChange)(cm);
  (0, _line_numbers.alignHorizontally)(cm);
}