// https://raw.githubusercontent.com/UziTech/eslint-linter-browserify/master/example/script.js
// import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { javascript, esLint } from '@codemirror/lang-javascript'
import { linter, lintGutter } from '@codemirror/lint'

// Uses linter.mjs
// import * as eslint from 'eslint-linter-browserify'

const config = {
  // eslint configuration
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    semi: ['error', 'never'],
  },
}

new EditorView({
  doc: "console.log('hello');\n",
  extensions: [
    // basicSetup,
    javascript(),
    lintGutter(),
    // eslint-disable-next-line
    // linter(esLint(new eslint.Linter(), config)),
  ],
  // parent: document.body,
})
