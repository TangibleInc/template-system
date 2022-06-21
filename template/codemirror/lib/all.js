const CodeMirror = require('./codemirror/codemirror').default

// Register extension
require('@emmetio/codemirror-plugin')(CodeMirror)

// Languages
require('../mode/css/css')
require('../mode/javascript/javascript')
require('../mode/php/php')
require('../mode/xml/xml')
require('../mode/htmlmixed/htmlmixed')

// These extend CodeMirror from node_modules

require('../addon/dialog/dialog')
require('../addon/display/fullscreen')

require('../addon/edit/closebrackets')
require('../addon/edit/matchbrackets')

require('../addon/edit/closetag')
require('../addon/edit/matchtags')

require('../addon/fold/foldcode')
require('../addon/fold/foldgutter')
require('../addon/fold/xml-fold')

require('../addon/search/search')
require('../addon/search/searchcursor')
require('../addon/search/jump-to-line')

require('../addon/search/matchesonscrollbar')
require('../addon/scroll/annotatescrollbar')
require('../addon/scroll/simplescrollbars')

require('../addon/selection/active-line')

// Hint

require('./show-hint') // require('codemirror/addon/hint/show-hint') // with show-hint.scss

require('../addon/hint/css-hint')
// require('./scss-hint')

// Depends on htmlhint.min.js
require('./xml-hint') // require('codemirror/addon/hint/xml-hint')
require('./html-hint') // require('codemirror/addon/hint/html-hint')

// Depends on jshint.min.js
require('./javascript-hint') // require('codemirror/addon/hint/javascript-hint')

// Lint

require('../addon/lint/lint') // with lint.scss

require('./html-lint') // require('codemirror/addon/lint/html-lint')
require('./javascript-lint') // require('codemirror/addon/lint/javascript-lint')

// Depends on csslint.min.js
require('../addon/lint/css-lint')
require('./scss-lint')

// Depends on jsonlint.min.js
require('./json-lint') // require('codemirror/addon/lint/json-lint')

module.exports = CodeMirror