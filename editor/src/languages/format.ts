
import prettier from 'prettier' // 427 KB

import parserHtml from 'prettier/parser-html' // 158 KB
import parserEspree from 'prettier/parser-espree' // 152 KB
import parserPostCSS from 'prettier/parser-postcss' // 155 KB

// https://prettier.io/docs/en/options.html#parser
const prettierLanguageOptions = {
  html: {
    parser: 'html',
    plugins: [parserHtml]
  },
  sass: {
    parser: 'scss',
    plugins: [parserPostCSS]
  },
  javascript: {
    parser: 'espree',
    plugins: [parserEspree],
    singleQuote: true,
    semi: false,
    useTabs: false,
    tabWidth: 2
  },
  json: {
    parser: 'json-stringify'
  },
}

export async function format({
  lang = 'html',
  content,
  options = {}
}) {
  return !prettierLanguageOptions[lang]
    ? content
    : prettier.format(content, {
      ...prettierLanguageOptions[lang],
      ...options
    })
}
