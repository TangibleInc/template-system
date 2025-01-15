import { fromHtml } from './hast-util-from-html'
import rehypeFormat from './rehype-format'
import { toHtml } from './hast-util-to-html'
import type {
  Element as HastElement,
  Properties as HastProperties,
  Comment,
  Doctype,
  // RootContent as HastRootContent,
  RootData,
  Root as HastRoot,
} from 'hast'
import type { Options as FormatOptions } from './rehype-format'
import type {
  Options as ParserOptions,
  FromParse5Options,
  ErrorCode as ParserErrorCode,
  ErrorOptions as ParserErrorOptions,
  ErrorSeverity as ParserErrorSeverity,
  ExtraOptions as ParserExtraOptions,
  OnError as ParserOnError,
} from './hast-util-from-html'
import type { Raw } from 'mdast-util-to-hast'

/**
 * Extended element
 */
export type Element = HastElement & {
  /**
   * Ordered list of attribute key/value pairs
   */
  attributeKeys: ElementAttributeKeys
}
export type ElementAttributeKeys = [string, string | undefined][]

export type Root = HastRoot & {
  type: 'root'
  children: RootContent[]
  data?: RootData | undefined
}

export type RootContent = Comment | Doctype | Element | Text | Raw
export interface Properties {
  [PropertyName: string]:
    | boolean
    | number
    | string
    | null
    | undefined
    | Array<string | number>
}

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

export type * from 'hast'

export type {
  FormatOptions,
  // For typedoc
  ParserOptions,
  FromParse5Options,
  ParserErrorSeverity,
  ParserExtraOptions,
  HastRoot,
  ParserOnError,
  ParserErrorOptions,
  ParserErrorCode,
}

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
  options?: ParseOptions & Language
): Root {
  const tree = fromHtml(content, {
    document: false,
    fragment: !options?.document,
    ...options,
  }) as Root
  // Ensure DocType
  if (
    options?.document &&
    typeof tree?.children[0] === 'object' &&
    tree?.children[0].type === 'element' &&
    tree?.children[0].tagName === 'html'
  ) {
    tree?.children.unshift({
      type: 'doctype',
    })
  }
  return tree
}

export function formatString(content: string, language: Language = {}): string {
  return render(
    format(parse(content, language), language),
    language
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
