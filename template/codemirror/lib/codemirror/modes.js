"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineMode = defineMode;
exports.defineMIME = defineMIME;
exports.resolveMode = resolveMode;
exports.getMode = getMode;
exports.extendMode = extendMode;
exports.copyState = copyState;
exports.innerMode = innerMode;
exports.startState = startState;
exports.modeExtensions = exports.mimeModes = exports.modes = void 0;

var _misc = require("./util/misc.js");

// Known modes, by name and by MIME
let modes = {},
    mimeModes = {}; // Extra arguments are stored as the mode's dependencies, which is
// used by (legacy) mechanisms like loadmode.js to automatically
// load a mode. (Preferred mechanism is the require/define calls.)

exports.mimeModes = mimeModes;
exports.modes = modes;

function defineMode(name, mode) {
  if (arguments.length > 2) mode.dependencies = Array.prototype.slice.call(arguments, 2);
  modes[name] = mode;
}

function defineMIME(mime, spec) {
  mimeModes[mime] = spec;
} // Given a MIME type, a {name, ...options} config object, or a name
// string, return a mode config object.


function resolveMode(spec) {
  if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
    spec = mimeModes[spec];
  } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
    let found = mimeModes[spec.name];
    if (typeof found == "string") found = {
      name: found
    };
    spec = (0, _misc.createObj)(found, spec);
    spec.name = found.name;
  } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
    return resolveMode("application/xml");
  } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
    return resolveMode("application/json");
  }

  if (typeof spec == "string") return {
    name: spec
  };else return spec || {
    name: "null"
  };
} // Given a mode spec (anything that resolveMode accepts), find and
// initialize an actual mode object.


function getMode(options, spec) {
  spec = resolveMode(spec);
  let mfactory = modes[spec.name];
  if (!mfactory) return getMode(options, "text/plain");
  let modeObj = mfactory(options, spec);

  if (modeExtensions.hasOwnProperty(spec.name)) {
    let exts = modeExtensions[spec.name];

    for (let prop in exts) {
      if (!exts.hasOwnProperty(prop)) continue;
      if (modeObj.hasOwnProperty(prop)) modeObj["_" + prop] = modeObj[prop];
      modeObj[prop] = exts[prop];
    }
  }

  modeObj.name = spec.name;
  if (spec.helperType) modeObj.helperType = spec.helperType;
  if (spec.modeProps) for (let prop in spec.modeProps) modeObj[prop] = spec.modeProps[prop];
  return modeObj;
} // This can be used to attach properties to mode objects from
// outside the actual mode definition.


let modeExtensions = {};
exports.modeExtensions = modeExtensions;

function extendMode(mode, properties) {
  let exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
  (0, _misc.copyObj)(properties, exts);
}

function copyState(mode, state) {
  if (state === true) return state;
  if (mode.copyState) return mode.copyState(state);
  let nstate = {};

  for (let n in state) {
    let val = state[n];
    if (val instanceof Array) val = val.concat([]);
    nstate[n] = val;
  }

  return nstate;
} // Given a mode and a state (for that mode), find the inner mode and
// state at the position that the state refers to.


function innerMode(mode, state) {
  let info;

  while (mode.innerMode) {
    info = mode.innerMode(state);
    if (!info || info.mode == mode) break;
    state = info.state;
    mode = info.mode;
  }

  return info || {
    mode: mode,
    state: state
  };
}

function startState(mode, a1, a2) {
  return mode.startState ? mode.startState(a1, a2) : true;
}