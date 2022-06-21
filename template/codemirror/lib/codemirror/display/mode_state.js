"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMode = loadMode;
exports.resetModeState = resetModeState;

var _modes = require("../modes.js");

var _highlight_worker = require("./highlight_worker.js");

var _view_tracking = require("./view_tracking.js");

// Used to get the editor into a consistent state again when options change.
function loadMode(cm) {
  cm.doc.mode = (0, _modes.getMode)(cm.options, cm.doc.modeOption);
  resetModeState(cm);
}

function resetModeState(cm) {
  cm.doc.iter(line => {
    if (line.stateAfter) line.stateAfter = null;
    if (line.styles) line.styles = null;
  });
  cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
  (0, _highlight_worker.startWorker)(cm, 100);
  cm.state.modeGen++;
  if (cm.curOp) (0, _view_tracking.regChange)(cm);
}