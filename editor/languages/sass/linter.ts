import { linter } from '@codemirror/lint'
import { genericLinter } from '../linter'

export function createSassLinter() {
  return linter(genericLinter)
}
