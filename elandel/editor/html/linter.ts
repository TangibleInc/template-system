import { linter } from '@codemirror/lint'
import { genericLinter } from '../linter'

export function createHtmlLinter() {
  return linter(genericLinter)
}
