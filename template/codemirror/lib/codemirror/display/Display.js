"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Display = Display;

var _browser = require("../util/browser.js");

var _dom = require("../util/dom.js");

var _misc = require("../util/misc.js");

var _gutters = require("./gutters.js");

// The display handles the DOM integration, both for input reading
// and content drawing. It holds references to DOM nodes and
// display-related state.
function Display(place, doc, input, options) {
  let d = this;
  this.input = input; // Covers bottom-right square when both scrollbars are present.

  d.scrollbarFiller = (0, _dom.elt)("div", null, "CodeMirror-scrollbar-filler");
  d.scrollbarFiller.setAttribute("cm-not-content", "true"); // Covers bottom of gutter when coverGutterNextToScrollbar is on
  // and h scrollbar is present.

  d.gutterFiller = (0, _dom.elt)("div", null, "CodeMirror-gutter-filler");
  d.gutterFiller.setAttribute("cm-not-content", "true"); // Will contain the actual code, positioned to cover the viewport.

  d.lineDiv = (0, _dom.eltP)("div", null, "CodeMirror-code"); // Elements are added to these to represent selection and cursors.

  d.selectionDiv = (0, _dom.elt)("div", null, null, "position: relative; z-index: 1");
  d.cursorDiv = (0, _dom.elt)("div", null, "CodeMirror-cursors"); // A visibility: hidden element used to find the size of things.

  d.measure = (0, _dom.elt)("div", null, "CodeMirror-measure"); // When lines outside of the viewport are measured, they are drawn in this.

  d.lineMeasure = (0, _dom.elt)("div", null, "CodeMirror-measure"); // Wraps everything that needs to exist inside the vertically-padded coordinate system

  d.lineSpace = (0, _dom.eltP)("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv], null, "position: relative; outline: none");
  let lines = (0, _dom.eltP)("div", [d.lineSpace], "CodeMirror-lines"); // Moved around its parent to cover visible view.

  d.mover = (0, _dom.elt)("div", [lines], null, "position: relative"); // Set to the height of the document, allowing scrolling.

  d.sizer = (0, _dom.elt)("div", [d.mover], "CodeMirror-sizer");
  d.sizerWidth = null; // Behavior of elts with overflow: auto and padding is
  // inconsistent across browsers. This is used to ensure the
  // scrollable area is big enough.

  d.heightForcer = (0, _dom.elt)("div", null, null, "position: absolute; height: " + _misc.scrollerGap + "px; width: 1px;"); // Will contain the gutters, if any.

  d.gutters = (0, _dom.elt)("div", null, "CodeMirror-gutters");
  d.lineGutter = null; // Actual scrollable element.

  d.scroller = (0, _dom.elt)("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
  d.scroller.setAttribute("tabIndex", "-1"); // The element in which the editor lives.

  // TANGIBLE: CHANGED
  d.wrapper = (0, _dom.elt)("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror tangible-codemirror"); // This attribute is respected by automatic translation systems such as Google Translate,
  // and may also be respected by tools used by human translators.

  d.wrapper.setAttribute('translate', 'no'); // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)

  if (_browser.ie && _browser.ie_version < 8) {
    d.gutters.style.zIndex = -1;
    d.scroller.style.paddingRight = 0;
  }

  if (!_browser.webkit && !(_browser.gecko && _browser.mobile)) d.scroller.draggable = true;

  if (place) {
    if (place.appendChild) place.appendChild(d.wrapper);else place(d.wrapper);
  } // Current rendered range (may be bigger than the view window).


  d.viewFrom = d.viewTo = doc.first;
  d.reportedViewFrom = d.reportedViewTo = doc.first; // Information about the rendered lines.

  d.view = [];
  d.renderedView = null; // Holds info about a single rendered line when it was rendered
  // for measurement, while not in view.

  d.externalMeasured = null; // Empty space (in pixels) above the view

  d.viewOffset = 0;
  d.lastWrapHeight = d.lastWrapWidth = 0;
  d.updateLineNumbers = null;
  d.nativeBarWidth = d.barHeight = d.barWidth = 0;
  d.scrollbarsClipped = false; // Used to only resize the line number gutter when necessary (when
  // the amount of lines crosses a boundary that makes its width change)

  d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null; // Set to true when a non-horizontal-scrolling line widget is
  // added. As an optimization, line widget aligning is skipped when
  // this is false.

  d.alignWidgets = false;
  d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null; // Tracks the maximum line length so that the horizontal scrollbar
  // can be kept static when scrolling.

  d.maxLine = null;
  d.maxLineLength = 0;
  d.maxLineChanged = false; // Used for measuring wheel scrolling granularity

  d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null; // True when shift is held down.

  d.shift = false; // Used to track whether anything happened since the context menu
  // was opened.

  d.selForContextMenu = null;
  d.activeTouch = null;
  d.gutterSpecs = (0, _gutters.getGutters)(options.gutters, options.lineNumbers);
  (0, _gutters.renderGutters)(d);
  input.init(d);
}