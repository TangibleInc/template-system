import { linter } from '@codemirror/lint'
import { genericLinter } from '../linter'

export function createJavaScriptLinter() {
  return linter(genericLinter)
}
