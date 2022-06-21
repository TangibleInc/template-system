"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _operations = require("../display/operations.js");

var _selection = require("../display/selection.js");

var _input = require("./input.js");

var _position_measurement = require("../measurement/position_measurement.js");

var _widgets = require("../measurement/widgets.js");

var _selection2 = require("../model/selection.js");

var _selection_updates = require("../model/selection_updates.js");

var _browser = require("../util/browser.js");

var _dom = require("../util/dom.js");

var _event = require("../util/event.js");

var _feature_detection = require("../util/feature_detection.js");

var _misc = require("../util/misc.js");

// TEXTAREA INPUT STYLE
class TextareaInput {
  constructor(cm) {
    this.cm = cm; // See input.poll and input.reset

    this.prevInput = ""; // Flag that indicates whether we expect input to appear real soon
    // now (after some event like 'keypress' or 'input') and are
    // polling intensively.

    this.pollingFast = false; // Self-resetting timeout for the poller

    this.polling = new _misc.Delayed(); // Used to work around IE issue with selection being forgotten when focus moves away from textarea

    this.hasSelection = false;
    this.composing = null;
  }

  init(display) {
    let input = this,
        cm = this.cm;
    this.createField(display);
    const te = this.textarea;
    display.wrapper.insertBefore(this.wrapper, display.wrapper.firstChild); // Needed to hide big blue blinking cursor on Mobile Safari (doesn't seem to work in iOS 8 anymore)

    if (_browser.ios) te.style.width = "0px";
    (0, _event.on)(te, "input", () => {
      if (_browser.ie && _browser.ie_version >= 9 && this.hasSelection) this.hasSelection = null;
      input.poll();
    });
    (0, _event.on)(te, "paste", e => {
      if ((0, _event.signalDOMEvent)(cm, e) || (0, _input.handlePaste)(e, cm)) return;
      cm.state.pasteIncoming = +new Date();
      input.fastPoll();
    });

    function prepareCopyCut(e) {
      if ((0, _event.signalDOMEvent)(cm, e)) return;

      if (cm.somethingSelected()) {
        (0, _input.setLastCopied)({
          lineWise: false,
          text: cm.getSelections()
        });
      } else if (!cm.options.lineWiseCopyCut) {
        return;
      } else {
        let ranges = (0, _input.copyableRanges)(cm);
        (0, _input.setLastCopied)({
          lineWise: true,
          text: ranges.text
        });

        if (e.type == "cut") {
          cm.setSelections(ranges.ranges, null, _misc.sel_dontScroll);
        } else {
          input.prevInput = "";
          te.value = ranges.text.join("\n");
          (0, _dom.selectInput)(te);
        }
      }

      if (e.type == "cut") cm.state.cutIncoming = +new Date();
    }

    (0, _event.on)(te, "cut", prepareCopyCut);
    (0, _event.on)(te, "copy", prepareCopyCut);
    (0, _event.on)(display.scroller, "paste", e => {
      if ((0, _widgets.eventInWidget)(display, e) || (0, _event.signalDOMEvent)(cm, e)) return;

      if (!te.dispatchEvent) {
        cm.state.pasteIncoming = +new Date();
        input.focus();
        return;
      } // Pass the `paste` event to the textarea so it's handled by its event listener.


      const event = new Event("paste");
      event.clipboardData = e.clipboardData;
      te.dispatchEvent(event);
    }); // Prevent normal selection in the editor (we handle our own)

    (0, _event.on)(display.lineSpace, "selectstart", e => {
      if (!(0, _widgets.eventInWidget)(display, e)) (0, _event.e_preventDefault)(e);
    });
    (0, _event.on)(te, "compositionstart", () => {
      let start = cm.getCursor("from");
      if (input.composing) input.composing.range.clear();
      input.composing = {
        start: start,
        range: cm.markText(start, cm.getCursor("to"), {
          className: "CodeMirror-composing"
        })
      };
    });
    (0, _event.on)(te, "compositionend", () => {
      if (input.composing) {
        input.poll();
        input.composing.range.clear();
        input.composing = null;
      }
    });
  }

  createField(_display) {
    // Wraps and hides input textarea
    this.wrapper = (0, _input.hiddenTextarea)(); // The semihidden textarea that is focused when the editor is
    // focused, and receives input.

    this.textarea = this.wrapper.firstChild;
  }

  screenReaderLabelChanged(label) {
    // Label for screenreaders, accessibility
    if (label) {
      this.textarea.setAttribute('aria-label', label);
    } else {
      this.textarea.removeAttribute('aria-label');
    }
  }

  prepareSelection() {
    // Redraw the selection and/or cursor
    let cm = this.cm,
        display = cm.display,
        doc = cm.doc;
    let result = (0, _selection.prepareSelection)(cm); // Move the hidden textarea near the cursor to prevent scrolling artifacts

    if (cm.options.moveInputWithCursor) {
      let headPos = (0, _position_measurement.cursorCoords)(cm, doc.sel.primary().head, "div");
      let wrapOff = display.wrapper.getBoundingClientRect(),
          lineOff = display.lineDiv.getBoundingClientRect();
      result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top));
      result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left));
    }

    return result;
  }

  showSelection(drawn) {
    let cm = this.cm,
        display = cm.display;
    (0, _dom.removeChildrenAndAdd)(display.cursorDiv, drawn.cursors);
    (0, _dom.removeChildrenAndAdd)(display.selectionDiv, drawn.selection);

    if (drawn.teTop != null) {
      this.wrapper.style.top = drawn.teTop + "px";
      this.wrapper.style.left = drawn.teLeft + "px";
    }
  } // Reset the input to correspond to the selection (or to be empty,
  // when not typing and nothing is selected)


  reset(typing) {
    if (this.contextMenuPending || this.composing) return;
    let cm = this.cm;

    if (cm.somethingSelected()) {
      this.prevInput = "";
      let content = cm.getSelection();
      this.textarea.value = content;
      if (cm.state.focused) (0, _dom.selectInput)(this.textarea);
      if (_browser.ie && _browser.ie_version >= 9) this.hasSelection = content;
    } else if (!typing) {
      this.prevInput = this.textarea.value = "";
      if (_browser.ie && _browser.ie_version >= 9) this.hasSelection = null;
    }
  }

  getField() {
    return this.textarea;
  }

  supportsTouch() {
    return false;
  }

  focus() {
    if (this.cm.options.readOnly != "nocursor" && (!_browser.mobile || (0, _dom.activeElt)() != this.textarea)) {
      try {
        this.textarea.focus();
      } catch (e) {} // IE8 will throw if the textarea is display: none or not in DOM

    }
  }

  blur() {
    this.textarea.blur();
  }

  resetPosition() {
    this.wrapper.style.top = this.wrapper.style.left = 0;
  }

  receivedFocus() {
    this.slowPoll();
  } // Poll for input changes, using the normal rate of polling. This
  // runs as long as the editor is focused.


  slowPoll() {
    if (this.pollingFast) return;
    this.polling.set(this.cm.options.pollInterval, () => {
      this.poll();
      if (this.cm.state.focused) this.slowPoll();
    });
  } // When an event has just come in that is likely to add or change
  // something in the input textarea, we poll faster, to ensure that
  // the change appears on the screen quickly.


  fastPoll() {
    let missed = false,
        input = this;
    input.pollingFast = true;

    function p() {
      let changed = input.poll();

      if (!changed && !missed) {
        missed = true;
        input.polling.set(60, p);
      } else {
        input.pollingFast = false;
        input.slowPoll();
      }
    }

    input.polling.set(20, p);
  } // Read input from the textarea, and update the document to match.
  // When something is selected, it is present in the textarea, and
  // selected (unless it is huge, in which case a placeholder is
  // used). When nothing is selected, the cursor sits after previously
  // seen text (can be empty), which is stored in prevInput (we must
  // not reset the textarea when typing, because that breaks IME).


  poll() {
    let cm = this.cm,
        input = this.textarea,
        prevInput = this.prevInput; // Since this is called a *lot*, try to bail out as cheaply as
    // possible when it is clear that nothing happened. hasSelection
    // will be the case when there is a lot of text in the textarea,
    // in which case reading its value would be expensive.

    if (this.contextMenuPending || !cm.state.focused || (0, _feature_detection.hasSelection)(input) && !prevInput && !this.composing || cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq) return false;
    let text = input.value; // If nothing changed, bail.

    if (text == prevInput && !cm.somethingSelected()) return false; // Work around nonsensical selection resetting in IE9/10, and
    // inexplicable appearance of private area unicode characters on
    // some key combos in Mac (#2689).

    if (_browser.ie && _browser.ie_version >= 9 && this.hasSelection === text || _browser.mac && /[\uf700-\uf7ff]/.test(text)) {
      cm.display.input.reset();
      return false;
    }

    if (cm.doc.sel == cm.display.selForContextMenu) {
      let first = text.charCodeAt(0);
      if (first == 0x200b && !prevInput) prevInput = "\u200b";

      if (first == 0x21da) {
        this.reset();
        return this.cm.execCommand("undo");
      }
    } // Find the part of the input that is actually new


    let same = 0,
        l = Math.min(prevInput.length, text.length);

    while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) ++same;

    (0, _operations.runInOp)(cm, () => {
      (0, _input.applyTextInput)(cm, text.slice(same), prevInput.length - same, null, this.composing ? "*compose" : null); // Don't leave long text in the textarea, since it makes further polling slow

      if (text.length > 1000 || text.indexOf("\n") > -1) input.value = this.prevInput = "";else this.prevInput = text;

      if (this.composing) {
        this.composing.range.clear();
        this.composing.range = cm.markText(this.composing.start, cm.getCursor("to"), {
          className: "CodeMirror-composing"
        });
      }
    });
    return true;
  }

  ensurePolled() {
    if (this.pollingFast && this.poll()) this.pollingFast = false;
  }

  onKeyPress() {
    if (_browser.ie && _browser.ie_version >= 9) this.hasSelection = null;
    this.fastPoll();
  }

  onContextMenu(e) {
    let input = this,
        cm = input.cm,
        display = cm.display,
        te = input.textarea;
    if (input.contextMenuPending) input.contextMenuPending();
    let pos = (0, _position_measurement.posFromMouse)(cm, e),
        scrollPos = display.scroller.scrollTop;
    if (!pos || _browser.presto) return; // Opera is difficult.
    // Reset the current text selection only if the click is done outside of the selection
    // and 'resetSelectionOnContextMenu' option is true.

    let reset = cm.options.resetSelectionOnContextMenu;
    if (reset && cm.doc.sel.contains(pos) == -1) (0, _operations.operation)(cm, _selection_updates.setSelection)(cm.doc, (0, _selection2.simpleSelection)(pos), _misc.sel_dontScroll);
    let oldCSS = te.style.cssText,
        oldWrapperCSS = input.wrapper.style.cssText;
    let wrapperBox = input.wrapper.offsetParent.getBoundingClientRect();
    input.wrapper.style.cssText = "position: static";
    te.style.cssText = `position: absolute; width: 30px; height: 30px;
      top: ${e.clientY - wrapperBox.top - 5}px; left: ${e.clientX - wrapperBox.left - 5}px;
      z-index: 1000; background: ${_browser.ie ? "rgba(255, 255, 255, .05)" : "transparent"};
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`;
    let oldScrollY;
    if (_browser.webkit) oldScrollY = window.scrollY; // Work around Chrome issue (#2712)

    display.input.focus();
    if (_browser.webkit) window.scrollTo(null, oldScrollY);
    display.input.reset(); // Adds "Select all" to context menu in FF

    if (!cm.somethingSelected()) te.value = input.prevInput = " ";
    input.contextMenuPending = rehide;
    display.selForContextMenu = cm.doc.sel;
    clearTimeout(display.detectingSelectAll); // Select-all will be greyed out if there's nothing to select, so
    // this adds a zero-width space so that we can later check whether
    // it got selected.

    function prepareSelectAllHack() {
      if (te.selectionStart != null) {
        let selected = cm.somethingSelected();
        let extval = "\u200b" + (selected ? te.value : "");
        te.value = "\u21da"; // Used to catch context-menu undo

        te.value = extval;
        input.prevInput = selected ? "" : "\u200b";
        te.selectionStart = 1;
        te.selectionEnd = extval.length; // Re-set this, in case some other handler touched the
        // selection in the meantime.

        display.selForContextMenu = cm.doc.sel;
      }
    }

    function rehide() {
      if (input.contextMenuPending != rehide) return;
      input.contextMenuPending = false;
      input.wrapper.style.cssText = oldWrapperCSS;
      te.style.cssText = oldCSS;
      if (_browser.ie && _browser.ie_version < 9) display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos); // Try to detect the user choosing select-all

      if (te.selectionStart != null) {
        if (!_browser.ie || _browser.ie && _browser.ie_version < 9) prepareSelectAllHack();

        let i = 0,
            poll = () => {
          if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "\u200b") {
            (0, _operations.operation)(cm, _selection_updates.selectAll)(cm);
          } else if (i++ < 10) {
            display.detectingSelectAll = setTimeout(poll, 500);
          } else {
            display.selForContextMenu = null;
            display.input.reset();
          }
        };

        display.detectingSelectAll = setTimeout(poll, 200);
      }
    }

    if (_browser.ie && _browser.ie_version >= 9) prepareSelectAllHack();

    if (_browser.captureRightClick) {
      (0, _event.e_stop)(e);

      let mouseup = () => {
        (0, _event.off)(window, "mouseup", mouseup);
        setTimeout(rehide, 20);
      };

      (0, _event.on)(window, "mouseup", mouseup);
    } else {
      setTimeout(rehide, 50);
    }
  }

  readOnlyChanged(val) {
    if (!val) this.reset();
    this.textarea.disabled = val == "nocursor";
    this.textarea.readOnly = !!val;
  }

  setUneditable() {}

}

exports.default = TextareaInput;
TextareaInput.prototype.needsContentAttribute = false;