import postcss from 'postcss'
import postCssAdvancedVariables from 'postcss-advanced-variables'
import postCssNested from 'postcss-nested'
import postCssScssSyntax from 'postcss-scss'
import postCssMapGet from './postcss-map-get'
import postCssMinify from './postcss-minify'

import type {
  Plugin,
  Parser,
  Result,
  Processor,
  ProcessOptions,
  Syntax,
} from 'postcss'

export const variables: {
  [key: string]: any
} = {}

export const postcssPlugins = [
  postCssAdvancedVariables({
    unresolved: 'ignore', // throw, warn
    variables(name: string, node: any) {
      return variables[name]
    },
  }) as Plugin,
  postCssMapGet(),
  postCssNested() as Plugin,
]

export const cssProcessor = postcss(postcssPlugins)

export {
  postCssAdvancedVariables,
  postCssScssSyntax,
  postCssMapGet,
  postCssMinify,
}

const minifier = postCssMinify()

export async function render(
  css: string,
  options?: ProcessOptions & {
    minify?: boolean
  }
): Promise<Result> {
  const minify = options && options.minify
  if (minify) {
    cssProcessor.plugins.push(minifier)
  }
  const result = await cssProcessor.process(css, {
    syntax: postCssScssSyntax as Syntax,
    from: 'index.scss',
    to: 'index.min.css',
    map: false,
    ...options,
  })
  if (minify) {
    cssProcessor.plugins.pop()
  }
  return result
}
