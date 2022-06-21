"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromTextArea = fromTextArea;

var _CodeMirror = require("./CodeMirror.js");

var _dom = require("../util/dom.js");

var _event = require("../util/event.js");

var _misc = require("../util/misc.js");

function fromTextArea(textarea, options) {
  options = options ? (0, _misc.copyObj)(options) : {};
  options.value = textarea.value;
  if (!options.tabindex && textarea.tabIndex) options.tabindex = textarea.tabIndex;
  if (!options.placeholder && textarea.placeholder) options.placeholder = textarea.placeholder; // Set autofocus to true if this textarea is focused, or if it has
  // autofocus and no other element is focused.

  if (options.autofocus == null) {
    let hasFocus = (0, _dom.activeElt)();
    options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
  }

  function save() {
    textarea.value = cm.getValue();
  }

  let realSubmit;

  if (textarea.form) {
    (0, _event.on)(textarea.form, "submit", save); // Deplorable hack to make the submit method do the right thing.

    if (!options.leaveSubmitMethodAlone) {
      let form = textarea.form;
      realSubmit = form.submit;

      try {
        let wrappedSubmit = form.submit = () => {
          save();
          form.submit = realSubmit;
          form.submit();
          form.submit = wrappedSubmit;
        };
      } catch (e) {}
    }
  }

  options.finishInit = cm => {
    cm.save = save;

    cm.getTextArea = () => textarea;

    cm.toTextArea = () => {
      cm.toTextArea = isNaN; // Prevent this from being ran twice

      save();
      textarea.parentNode.removeChild(cm.getWrapperElement());
      textarea.style.display = "";

      if (textarea.form) {
        (0, _event.off)(textarea.form, "submit", save);
        if (!options.leaveSubmitMethodAlone && typeof textarea.form.submit == "function") textarea.form.submit = realSubmit;
      }
    };
  };

  textarea.style.display = "none";
  let cm = (0, _CodeMirror.CodeMirror)(node => textarea.parentNode.insertBefore(node, textarea.nextSibling), options);
  return cm;
}