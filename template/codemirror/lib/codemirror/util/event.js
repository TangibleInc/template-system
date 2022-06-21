"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHandlers = getHandlers;
exports.off = off;
exports.signal = signal;
exports.signalDOMEvent = signalDOMEvent;
exports.signalCursorActivity = signalCursorActivity;
exports.hasHandler = hasHandler;
exports.eventMixin = eventMixin;
exports.e_preventDefault = e_preventDefault;
exports.e_stopPropagation = e_stopPropagation;
exports.e_defaultPrevented = e_defaultPrevented;
exports.e_stop = e_stop;
exports.e_target = e_target;
exports.e_button = e_button;
exports.on = void 0;

var _browser = require("./browser.js");

var _misc = require("./misc.js");

// EVENT HANDLING
// Lightweight event framework. on/off also work on DOM nodes,
// registering native DOM handlers.
const noHandlers = [];

let on = function (emitter, type, f) {
  if (emitter.addEventListener) {
    emitter.addEventListener(type, f, false);
  } else if (emitter.attachEvent) {
    emitter.attachEvent("on" + type, f);
  } else {
    let map = emitter._handlers || (emitter._handlers = {});
    map[type] = (map[type] || noHandlers).concat(f);
  }
};

exports.on = on;

function getHandlers(emitter, type) {
  return emitter._handlers && emitter._handlers[type] || noHandlers;
}

function off(emitter, type, f) {
  if (emitter.removeEventListener) {
    emitter.removeEventListener(type, f, false);
  } else if (emitter.detachEvent) {
    emitter.detachEvent("on" + type, f);
  } else {
    let map = emitter._handlers,
        arr = map && map[type];

    if (arr) {
      let index = (0, _misc.indexOf)(arr, f);
      if (index > -1) map[type] = arr.slice(0, index).concat(arr.slice(index + 1));
    }
  }
}

function signal(emitter, type
/*, values...*/
) {
  let handlers = getHandlers(emitter, type);
  if (!handlers.length) return;
  let args = Array.prototype.slice.call(arguments, 2);

  for (let i = 0; i < handlers.length; ++i) handlers[i].apply(null, args);
} // The DOM events that CodeMirror handles can be overridden by
// registering a (non-DOM) handler on the editor for the event name,
// and preventDefault-ing the event in that handler.


function signalDOMEvent(cm, e, override) {
  if (typeof e == "string") e = {
    type: e,
    preventDefault: function () {
      this.defaultPrevented = true;
    }
  };
  signal(cm, override || e.type, cm, e);
  return e_defaultPrevented(e) || e.codemirrorIgnore;
}

function signalCursorActivity(cm) {
  let arr = cm._handlers && cm._handlers.cursorActivity;
  if (!arr) return;
  let set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);

  for (let i = 0; i < arr.length; ++i) if ((0, _misc.indexOf)(set, arr[i]) == -1) set.push(arr[i]);
}

function hasHandler(emitter, type) {
  return getHandlers(emitter, type).length > 0;
} // Add on and off methods to a constructor's prototype, to make
// registering events on such objects more convenient.


function eventMixin(ctor) {
  ctor.prototype.on = function (type, f) {
    on(this, type, f);
  };

  ctor.prototype.off = function (type, f) {
    off(this, type, f);
  };
} // Due to the fact that we still support jurassic IE versions, some
// compatibility wrappers are needed.


function e_preventDefault(e) {
  if (e.preventDefault) e.preventDefault();else e.returnValue = false;
}

function e_stopPropagation(e) {
  if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;
}

function e_defaultPrevented(e) {
  return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
}

function e_stop(e) {
  e_preventDefault(e);
  e_stopPropagation(e);
}

function e_target(e) {
  return e.target || e.srcElement;
}

function e_button(e) {
  let b = e.which;

  if (b == null) {
    if (e.button & 1) b = 1;else if (e.button & 2) b = 3;else if (e.button & 4) b = 2;
  }

  if (_browser.mac && e.ctrlKey && b == 1) b = 3;
  return b;
}