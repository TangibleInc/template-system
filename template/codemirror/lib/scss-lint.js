// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE


(function (mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("./codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["./codemirror"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function (CodeMirror) {
    "use strict";

    CodeMirror.registerHelper("lint", "scss", function (text, options) {
        var found = [];
        if (!window.SCSSLint) return found;
        var results = SCSSLint.verify(text, options),
            messages = results.messages,
            message = null;
        for (var i = 0; i < messages.length; i++) {
            message = messages[i];
            var startLine = message.line - 1,
                endLine = message.line - 1,
                startCol = message.col - 1,
                endCol = message.col;
            found.push({
                from: CodeMirror.Pos(startLine, startCol),
                to: CodeMirror.Pos(endLine, endCol),
                message: message.message,
                severity: message.type
            });
        }
        return found;
    });

});