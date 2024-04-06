import postcss from 'postcss'
import postCssAdvancedVariables from 'postcss-advanced-variables'
import postCssNested from 'postcss-nested'
import postCssScss from 'postcss-scss'
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

export const processor = postcss([
  postCssAdvancedVariables({
    unresolved: 'ignore', // throw, warn
    variables(name: string, node: any) {
      return variables[name]
    },
  }) as Plugin,
  postCssMapGet(),
  postCssNested() as Plugin,
])

const minifier = postCssMinify()

export async function render(
  css: string,
  options?: ProcessOptions & {
    minify?: boolean
  }
): Promise<Result> {
  const minify = options && options.minify
  if (minify) {
    processor.plugins.push(minifier)
  }
  const result = await processor.process(css, {
    syntax: postCssScss as Syntax,
    from: 'index.scss',
    to: 'index.min.css',
    map: false,
    ...options,
  })
  if (minify) {
    processor.plugins.pop()
  }
  return result
}
