"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDrop = onDrop;
exports.onDragStart = onDragStart;
exports.onDragOver = onDragOver;
exports.clearDragCursor = clearDragCursor;

var _selection = require("../display/selection.js");

var _operations = require("../display/operations.js");

var _pos = require("../line/pos.js");

var _position_measurement = require("../measurement/position_measurement.js");

var _widgets = require("../measurement/widgets.js");

var _changes = require("../model/changes.js");

var _change_measurement = require("../model/change_measurement.js");

var _selection2 = require("../model/selection.js");

var _selection_updates = require("../model/selection_updates.js");

var _browser = require("../util/browser.js");

var _dom = require("../util/dom.js");

var _event = require("../util/event.js");

var _misc = require("../util/misc.js");

// Kludge to work around strange IE behavior where it'll sometimes
// re-fire a series of drag-related events right after the drop (#1551)
let lastDrop = 0;

function onDrop(e) {
  let cm = this;
  clearDragCursor(cm);
  if ((0, _event.signalDOMEvent)(cm, e) || (0, _widgets.eventInWidget)(cm.display, e)) return;
  (0, _event.e_preventDefault)(e);
  if (_browser.ie) lastDrop = +new Date();
  let pos = (0, _position_measurement.posFromMouse)(cm, e, true),
      files = e.dataTransfer.files;
  if (!pos || cm.isReadOnly()) return; // Might be a file drop, in which case we simply extract the text
  // and insert it.

  if (files && files.length && window.FileReader && window.File) {
    let n = files.length,
        text = Array(n),
        read = 0;

    const markAsReadAndPasteIfAllFilesAreRead = () => {
      if (++read == n) {
        (0, _operations.operation)(cm, () => {
          pos = (0, _pos.clipPos)(cm.doc, pos);
          let change = {
            from: pos,
            to: pos,
            text: cm.doc.splitLines(text.filter(t => t != null).join(cm.doc.lineSeparator())),
            origin: "paste"
          };
          (0, _changes.makeChange)(cm.doc, change);
          (0, _selection_updates.setSelectionReplaceHistory)(cm.doc, (0, _selection2.simpleSelection)((0, _pos.clipPos)(cm.doc, pos), (0, _pos.clipPos)(cm.doc, (0, _change_measurement.changeEnd)(change))));
        })();
      }
    };

    const readTextFromFile = (file, i) => {
      if (cm.options.allowDropFileTypes && (0, _misc.indexOf)(cm.options.allowDropFileTypes, file.type) == -1) {
        markAsReadAndPasteIfAllFilesAreRead();
        return;
      }

      let reader = new FileReader();

      reader.onerror = () => markAsReadAndPasteIfAllFilesAreRead();

      reader.onload = () => {
        let content = reader.result;

        if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
          markAsReadAndPasteIfAllFilesAreRead();
          return;
        }

        text[i] = content;
        markAsReadAndPasteIfAllFilesAreRead();
      };

      reader.readAsText(file);
    };

    for (let i = 0; i < files.length; i++) readTextFromFile(files[i], i);
  } else {
    // Normal drop
    // Don't do a replace if the drop happened inside of the selected text.
    if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
      cm.state.draggingText(e); // Ensure the editor is re-focused

      setTimeout(() => cm.display.input.focus(), 20);
      return;
    }

    try {
      let text = e.dataTransfer.getData("Text");

      if (text) {
        let selected;
        if (cm.state.draggingText && !cm.state.draggingText.copy) selected = cm.listSelections();
        (0, _selection_updates.setSelectionNoUndo)(cm.doc, (0, _selection2.simpleSelection)(pos, pos));
        if (selected) for (let i = 0; i < selected.length; ++i) (0, _changes.replaceRange)(cm.doc, "", selected[i].anchor, selected[i].head, "drag");
        cm.replaceSelection(text, "around", "paste");
        cm.display.input.focus();
      }
    } catch (e) {}
  }
}

function onDragStart(cm, e) {
  if (_browser.ie && (!cm.state.draggingText || +new Date() - lastDrop < 100)) {
    (0, _event.e_stop)(e);
    return;
  }

  if ((0, _event.signalDOMEvent)(cm, e) || (0, _widgets.eventInWidget)(cm.display, e)) return;
  e.dataTransfer.setData("Text", cm.getSelection());
  e.dataTransfer.effectAllowed = "copyMove"; // Use dummy image instead of default browsers image.
  // Recent Safari (~6.0.2) have a tendency to segfault when this happens, so we don't do it there.

  if (e.dataTransfer.setDragImage && !_browser.safari) {
    let img = (0, _dom.elt)("img", null, null, "position: fixed; left: 0; top: 0;");
    img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

    if (_browser.presto) {
      img.width = img.height = 1;
      cm.display.wrapper.appendChild(img); // Force a relayout, or Opera won't use our image for some obscure reason

      img._top = img.offsetTop;
    }

    e.dataTransfer.setDragImage(img, 0, 0);
    if (_browser.presto) img.parentNode.removeChild(img);
  }
}

function onDragOver(cm, e) {
  let pos = (0, _position_measurement.posFromMouse)(cm, e);
  if (!pos) return;
  let frag = document.createDocumentFragment();
  (0, _selection.drawSelectionCursor)(cm, pos, frag);

  if (!cm.display.dragCursor) {
    cm.display.dragCursor = (0, _dom.elt)("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
    cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
  }

  (0, _dom.removeChildrenAndAdd)(cm.display.dragCursor, frag);
}

function clearDragCursor(cm) {
  if (cm.display.dragCursor) {
    cm.display.lineSpace.removeChild(cm.display.dragCursor);
    cm.display.dragCursor = null;
  }
}