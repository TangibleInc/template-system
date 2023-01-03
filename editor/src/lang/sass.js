import { StreamLanguage } from '@codemirror/language'
// https://github.com/codemirror/legacy-modes
import { sass as sassMode } from '@codemirror/legacy-modes/mode/sass'

export const sass = () => StreamLanguage.define(sassMode)
