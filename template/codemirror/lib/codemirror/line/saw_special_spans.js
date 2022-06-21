"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seeReadOnlySpans = seeReadOnlySpans;
exports.seeCollapsedSpans = seeCollapsedSpans;
exports.sawCollapsedSpans = exports.sawReadOnlySpans = void 0;
// Optimize some code when these features are not used.
let sawReadOnlySpans = false,
    sawCollapsedSpans = false;
exports.sawCollapsedSpans = sawCollapsedSpans;
exports.sawReadOnlySpans = sawReadOnlySpans;

function seeReadOnlySpans() {
  exports.sawReadOnlySpans = sawReadOnlySpans = true;
}

function seeCollapsedSpans() {
  exports.sawCollapsedSpans = sawCollapsedSpans = true;
}