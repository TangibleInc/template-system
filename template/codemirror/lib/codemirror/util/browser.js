"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.captureRightClick = exports.flipCtrlCmd = exports.windows = exports.chromeOS = exports.mac = exports.mobile = exports.android = exports.ios = exports.phantom = exports.mac_geMountainLion = exports.safari = exports.presto = exports.chrome = exports.webkit = exports.ie_version = exports.ie = exports.gecko = void 0;
// Kludges for bugs and behavior differences that can't be feature
// detected are enabled based on userAgent etc sniffing.
let userAgent = navigator.userAgent;
let platform = navigator.platform;
let gecko = /gecko\/\d/i.test(userAgent);
exports.gecko = gecko;
let ie_upto10 = /MSIE \d/.test(userAgent);
let ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
let edge = /Edge\/(\d+)/.exec(userAgent);
let ie = ie_upto10 || ie_11up || edge;
exports.ie = ie;
let ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
exports.ie_version = ie_version;
let webkit = !edge && /WebKit\//.test(userAgent);
exports.webkit = webkit;
let qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
let chrome = !edge && /Chrome\//.test(userAgent);
exports.chrome = chrome;
let presto = /Opera\//.test(userAgent);
exports.presto = presto;
let safari = /Apple Computer/.test(navigator.vendor);
exports.safari = safari;
let mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
exports.mac_geMountainLion = mac_geMountainLion;
let phantom = /PhantomJS/.test(userAgent);
exports.phantom = phantom;
let ios = safari && (/Mobile\/\w+/.test(userAgent) || navigator.maxTouchPoints > 2);
exports.ios = ios;
let android = /Android/.test(userAgent); // This is woefully incomplete. Suggestions for alternative methods welcome.

exports.android = android;
let mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
exports.mobile = mobile;
let mac = ios || /Mac/.test(platform);
exports.mac = mac;
let chromeOS = /\bCrOS\b/.test(userAgent);
exports.chromeOS = chromeOS;
let windows = /win/i.test(platform);
exports.windows = windows;
let presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
if (presto_version) presto_version = Number(presto_version[1]);

if (presto_version && presto_version >= 15) {
  exports.presto = presto = false;
  exports.webkit = webkit = true;
} // Some browsers use the wrong event properties to signal cmd/ctrl on OS X


let flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
exports.flipCtrlCmd = flipCtrlCmd;
let captureRightClick = gecko || ie && ie_version >= 9;
exports.captureRightClick = captureRightClick;