import { fromHtml } from './hast-util-from-html'
import rehypeFormat from './rehype-format'
import { toHtml } from './hast-util-to-html'

import type { Root } from './hast-util-from-html'
import type { Options as FormatOptions } from './rehype-format'
import type { Options as ParserOptions } from './hast-util-from-html'
import type { Raw } from 'mdast-util-to-hast'

export type Language = {
  closedTags?: string[]
  rawTags?: string[]
  parse?: (content: string, options: ParseOptions & Language) => Root
  format?: (rootNode: Root, language?: Language) => Root
  render?: (rootNode: Root, language?: Language) => string
}

export type ParseOptions = ParserOptions & {
  document?: boolean
  sourceCodeLocationInfo?: boolean
}

export type { FormatOptions }
export type { Root }
export type * from 'hast'
export { htmlVoidElements } from './html-void-elements'

export type HtmlEngine = {
  language: Language
  parse: (content: string, options?: ParseOptions & Language) => Root
  format: (rootNode: Root) => Root
  render: (rootNode: Root) => string
}

export function createHtmlEngine(language: Language): HtmlEngine {
  const formatter = rehypeFormat(language)
  const html: HtmlEngine = {
    language,
    parse: (content: string, options: ParseOptions & Language = {}): Root =>
      parse(content, Object.assign(options, language)),
    format: (rootNode: Root): Root => {
      formatter(rootNode) // Mutates tree
      return rootNode
    },
    render: (rootNode: Root): string => render(rootNode, language),
  }
  return html
}

export function parse(
  content: string,
  options?: ParseOptions & Language,
): Root {
  return fromHtml(content, {
    document: false,
    fragment: !options?.document,
    ...options,
  })
}

export function formatString(content: string, language: Language = {}): string {
  return render(
    format(parse(content, language), language),
    language,
  ).trimStart()
}

export function format(rootNode: Root, language: Language = {}): Root {
  // Note: More efficient to create it once using createHtmlEngine()
  const formatter = rehypeFormat(language)
  formatter(rootNode) // Mutates tree
  return rootNode
}

export function render(rootNode: Root, language: Language = {}): string {
  return toHtml(rootNode, {
    allowDangerousHtml: true,
    // allowParseErrors: true,
    closeEmptyElements: true,
    collapseEmptyAttributes: true,
    preferUnquoted: true,
    closeSelfClosing: false,
    ...language,
  })
}
