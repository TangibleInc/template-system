
const commonOptions = {
  theme: 'tangible-light',
  mode: 'text/html',
  value: '',

  tabIndex: 1,
  tabSize: 2,
  indentUnit: 2,
  indentWithTabs: false,

  spellcheck: false,
  //viewportMargin: Infinity, // With .CodeMirror height: auto or 100%
  // scrollbarStyle: 'simple',

  //autofocus: true,

  gutters: ["CodeMirror-lint-markers"],
  lineNumbers: true,
  // styleActiveLine: true,
  lineWrapping: true,

  hint: false,
  lint: true,

  matchBrackets: true,
  matchTags: true,
  autoCloseBrackets: true,
  autoCloseTags: {
    // For addon/edit/closetag.js
    indentTags: [
      "applet", "blockquote", "body",
      // "button",
      // "div",
      "dl", "fieldset", "form", "frameset",
      // "h1", "h2", "h3", "h4", "h5", "h6",
      "head", "html", "iframe", "layer", "legend", "object", "ol",
      //"p",
      "select", "table", "ul"
    ]
  },

  extraKeys: {
    "Alt-F": 'findPersistent',
    'Ctrl-S': function(cm) {
      console.log('Save')
    },
    'Cmd-S': function(cm) {
      console.log('Save')
    },
    'Enter': 'emmetInsertLineBreak',
    'Ctrl-Space': 'autocomplete'
  },

  emmet: {
    preview: false
  }
}

const cssLintOptions ={
  // https://github.com/CSSLint/csslint/wiki/Rules
  rules: {
    'errors'                    : true, // Parsing errors.
    'box-model'                 : true,
    'display-property-grouping' : true,
    'duplicate-properties'      : true,
    'known-properties'          : true,
    'outline-none'              : true,
    'no-important': 0,
    'hex-notation': 0,
    'variable-for-property': 0,
    'no-empty-rulesets': 0,
  }
}

const sassLintOptions = {
  rules: {
    // https://github.com/sds/scss-lint/blob/master/lib/scss_lint/linter/README.md
    'no-important': 0,
    'hex-notation': 0,
    'variable-for-property': 0,
    'no-empty-rulesets': 0,
    'property-sort-order': 0,
  }
}

const jsHintOptions = {
  // https://jshint.com/docs/options/
  'asi'      : true,
  'boss'     : true,
  'curly'    : true,
  'eqeqeq'   : true,
  'eqnull'   : true,
  'es3'      : true,
  'expr'     : true,
  'immed'    : true,
  'lastsemic': true,
  'noarg'    : true,
  'nonbsp'   : true,
  'onevar'   : true,
  'quotmark' : 'single',
  'trailing' : true,
  'undef'    : true,
  'unused'   : true,

  'browser'  : true,
  'devel'    : true, // Defines console, alert

  'globals': {
    // Set "false" for read-only global variable
    '_'        : false,
    'Backbone' : false,
    'jQuery'   : false,
    'JSON'     : false,
    'wp'       : false,
  }
}

const htmlLintOptions = {
  // https://htmlhint.com/docs/user-guide/list-rules
  rules: {
    "attr-lowercase": false,
    "attr-no-duplication": false,
    "attr-value-double-quotes": false,
    "doctype-first": false,
    "id-unique": false, // Dynamic tags can have non-unique "id" attributes
    "spec-char-escape": true,
    "src-not-empty": true,
    "tag-pair": true,
    "tagname-lowercase": false,
    csslint: cssLintOptions,
    jshint: jsHintOptions
  }
}

const languageOptions = {
  html: {
    mode: 'application/x-httpd-php', // 'text/html'
    lint: {
      options: htmlLintOptions
    },

    // For addon/edit/fold/xml-fold.js
    foldGutter: true,
    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  },
  css: {
    mode: 'text/css',
    lint: {
      options: cssLintOptions
    }
  },
  sass: {
    mode: 'text/x-scss',
    lint: {
      options: sassLintOptions
    }
  },
  javascript: {
    mode: 'application/javascript',
    lint: {
      options: jsHintOptions
    }
  },
  json: {
    mode: 'application/json',
  },
  php: {
    mode: 'application/x-httpd-php',
  }
}

module.exports = {
  commonOptions,
  languageOptions
}