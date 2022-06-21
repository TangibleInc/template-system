"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widgetHeight = widgetHeight;
exports.eventInWidget = eventInWidget;

var _dom = require("../util/dom.js");

var _event = require("../util/event.js");

function widgetHeight(widget) {
  if (widget.height != null) return widget.height;
  let cm = widget.doc.cm;
  if (!cm) return 0;

  if (!(0, _dom.contains)(document.body, widget.node)) {
    let parentStyle = "position: relative;";
    if (widget.coverGutter) parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
    if (widget.noHScroll) parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
    (0, _dom.removeChildrenAndAdd)(cm.display.measure, (0, _dom.elt)("div", [widget.node], null, parentStyle));
  }

  return widget.height = widget.node.parentNode.offsetHeight;
} // Return true when the given mouse event happened in a widget


function eventInWidget(display, e) {
  for (let n = (0, _event.e_target)(e); n != display.wrapper; n = n.parentNode) {
    if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == display.sizer && n != display.mover) return true;
  }
}