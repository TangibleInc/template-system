"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeChanged = themeChanged;

var _position_measurement = require("../measurement/position_measurement.js");

function themeChanged(cm) {
  cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
  (0, _position_measurement.clearCaches)(cm);
}