"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLineWidget = addLineWidget;
exports.LineWidget = void 0;

var _operations = require("../display/operations.js");

var _scrolling = require("../display/scrolling.js");

var _view_tracking = require("../display/view_tracking.js");

var _spans = require("../line/spans.js");

var _utils_line = require("../line/utils_line.js");

var _widgets = require("../measurement/widgets.js");

var _changes = require("./changes.js");

var _event = require("../util/event.js");

var _operation_group = require("../util/operation_group.js");

// Line widgets are block elements displayed above or below a line.
class LineWidget {
  constructor(doc, node, options) {
    if (options) for (let opt in options) if (options.hasOwnProperty(opt)) this[opt] = options[opt];
    this.doc = doc;
    this.node = node;
  }

  clear() {
    let cm = this.doc.cm,
        ws = this.line.widgets,
        line = this.line,
        no = (0, _utils_line.lineNo)(line);
    if (no == null || !ws) return;

    for (let i = 0; i < ws.length; ++i) if (ws[i] == this) ws.splice(i--, 1);

    if (!ws.length) line.widgets = null;
    let height = (0, _widgets.widgetHeight)(this);
    (0, _utils_line.updateLineHeight)(line, Math.max(0, line.height - height));

    if (cm) {
      (0, _operations.runInOp)(cm, () => {
        adjustScrollWhenAboveVisible(cm, line, -height);
        (0, _view_tracking.regLineChange)(cm, no, "widget");
      });
      (0, _operation_group.signalLater)(cm, "lineWidgetCleared", cm, this, no);
    }
  }

  changed() {
    let oldH = this.height,
        cm = this.doc.cm,
        line = this.line;
    this.height = null;
    let diff = (0, _widgets.widgetHeight)(this) - oldH;
    if (!diff) return;
    if (!(0, _spans.lineIsHidden)(this.doc, line)) (0, _utils_line.updateLineHeight)(line, line.height + diff);

    if (cm) {
      (0, _operations.runInOp)(cm, () => {
        cm.curOp.forceUpdate = true;
        adjustScrollWhenAboveVisible(cm, line, diff);
        (0, _operation_group.signalLater)(cm, "lineWidgetChanged", cm, this, (0, _utils_line.lineNo)(line));
      });
    }
  }

}

exports.LineWidget = LineWidget;
(0, _event.eventMixin)(LineWidget);

function adjustScrollWhenAboveVisible(cm, line, diff) {
  if ((0, _spans.heightAtLine)(line) < (cm.curOp && cm.curOp.scrollTop || cm.doc.scrollTop)) (0, _scrolling.addToScrollTop)(cm, diff);
}

function addLineWidget(doc, handle, node, options) {
  let widget = new LineWidget(doc, node, options);
  let cm = doc.cm;
  if (cm && widget.noHScroll) cm.display.alignWidgets = true;
  (0, _changes.changeLine)(doc, handle, "widget", line => {
    let widgets = line.widgets || (line.widgets = []);
    if (widget.insertAt == null) widgets.push(widget);else widgets.splice(Math.min(widgets.length, Math.max(0, widget.insertAt)), 0, widget);
    widget.line = line;

    if (cm && !(0, _spans.lineIsHidden)(doc, line)) {
      let aboveVisible = (0, _spans.heightAtLine)(line) < doc.scrollTop;
      (0, _utils_line.updateLineHeight)(line, line.height + (0, _widgets.widgetHeight)(widget));
      if (aboveVisible) (0, _scrolling.addToScrollTop)(cm, widget.height);
      cm.curOp.forceUpdate = true;
    }

    return true;
  });
  if (cm) (0, _operation_group.signalLater)(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : (0, _utils_line.lineNo)(handle));
  return widget;
}