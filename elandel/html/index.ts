import { fromHtml } from './hast-util-from-html'
import rehypeFormat from './rehype-format'
import { toHtml } from './hast-util-to-html'

import type { Root } from './hast-util-from-html'
import type { Options as FormatOptions } from './rehype-format'
import type { Options as ParserOptions } from './hast-util-from-html'

export type Language = {
  closedTags?: string[],
  rawTags?: string[]
}

export const language: Language = {
  closedTags: [],
  rawTags: [],
}

export type ParseOptions = ParserOptions & {
  document?: boolean
  sourceCodeLocationInfo?: boolean
}

export type { FormatOptions }
export type { Root }

export function parse(content: string, options?: ParseOptions): Root {
  return fromHtml(content, {
    document: false,
    fragment: !options?.document,
    closedTags: language.closedTags,
    ...options,
  })
}

const formatter = rehypeFormat({
  closedTags: language.closedTags,
})

export function formatString(content: string): string {
  return render(format(parse(content))).trimStart()
}

export function format(rootNode: Root): Root {
  formatter(rootNode)
  return rootNode
}

const renderOptions = {
  allowDangerousHtml: true,
  // allowParseErrors: true,
  closeEmptyElements: true,
  collapseEmptyAttributes: true,
  preferUnquoted: true,

  closeSelfClosing: false,
  closedTags: language.closedTags,
}

export function render(rootNode: Root): string {
  return toHtml(rootNode, renderOptions)
}
