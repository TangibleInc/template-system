import type { ElementAttributeKeys } from './index.ts'

/**
 * Element as compact tuple
 */
export type CompactElement =
  | CompactTag
  | CompactDoctype
  | CompactComment
  | CompactText
  | CompactRaw

export type CompactTag = [
  tag: string,
  keys: ElementAttributeKeys | null,
  children: string | CompactElement[],
]
export type CompactDoctype = [
  tag: '#doctype'
]
export type CompactComment = [tag: '#comment', value: string]
export type CompactText = [tag: '#text', value: string]
export type CompactRaw = [tag: '#raw', value: string]
