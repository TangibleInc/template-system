import { fromHtml } from './hast-util-from-html'
import rehypeFormat from './rehype-format'
import { toHtml } from './hast-util-to-html'

import type { Root } from './hast-util-from-html'
import type { Options as FormatOptions } from './rehype-format'
import type { Options as ParserOptions } from './hast-util-from-html'

export type Language = {
  closedTags?: string[]
  rawTags?: string[]
}

export type ParseOptions = ParserOptions & {
  document?: boolean
  sourceCodeLocationInfo?: boolean
}

export type { FormatOptions }
export type { Root }

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
  const parsed = parse(content, language)
  const formatted = format(parsed, language)
  const rendered = render(formatted, language)
  return rendered.trimStart()
}

export function format(rootNode: Root, language: Language = {}): Root {
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
