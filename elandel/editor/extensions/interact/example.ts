// @ts-nocheck
// 1. move cursor on different values
// 2. hold Alt key
// 3. click / drag
import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import interact from '../src/interact'

const doc = `
// hold Alt and drag / click values
const a = 123
const b = vec2(20, 80)
const c = vec2(60)
const d = rgb(128, 128, 255)
const e = false
const f = 'http://example.com'
`.trim()

new EditorView({
  state: EditorState.create({
    doc,
    extensions: [
      basicSetup,
      javascript(),
      interact({
        rules: [
          {
            regexp: /-?\b\d+\.?\d*\b/g,
            cursor: 'ew-resize',
            onDrag: (text, setText, e) => {
              // TODO: size aware
              // TODO: small interval with shift key?
              const newVal = Number(text) + e.movementX
              if (isNaN(newVal)) return
              setText(newVal.toString())
            }
          },
          // bool toggler
          {
            regexp: /true|false/g,
            cursor: 'pointer',
            onClick: (text, setText) => {
              switch (text) {
                case 'true': return setText('false')
                case 'false': return setText('true')
              }
            },
          },
          // kaboom vec2 slider
          {
            regexp: /vec2\(-?\b\d+\.?\d*\b\s*(,\s*-?\b\d+\.?\d*\b)?\)/g,
            cursor: 'move',
            onDrag: (text, setText, e) => {
              const res = /vec2\((?<x>-?\b\d+\.?\d*\b)\s*(,\s*(?<y>-?\b\d+\.?\d*\b))?\)/.exec(text)
              const x = Number(res?.groups?.x)
              let y = Number(res?.groups?.y)
              if (isNaN(x)) return
              if (isNaN(y)) y = x
              setText(`vec2(${x + e.movementX}, ${y + e.movementY})`)
            },
          },
          // kaboom color picker
          {
            regexp: /rgb\(.*\)/g,
            cursor: 'pointer',
            onClick: (text, setText, e) => {
              const res = /rgb\((?<r>\d+)\s*,\s*(?<g>\d+)\s*,\s*(?<b>\d+)\)/.exec(text)
              const r = Number(res?.groups?.r)
              const g = Number(res?.groups?.g)
              const b = Number(res?.groups?.b)
              const sel = document.createElement('input')
              sel.type = 'color'
              if (!isNaN(r + g + b)) sel.value = rgb2hex(r, g, b)
              sel.addEventListener('input', (e) => {
                const el = e.target as HTMLInputElement
                if (el.value) {
                  const [r, g, b] = hex2rgb(el.value)
                  setText(`rgb(${r}, ${g}, ${b})`)
                }
              })
              sel.click()
            },
          },
          // url clicker
          {
            regexp: /https?:\/\/[^ "]+/g,
            cursor: 'pointer',
            onClick: (text) => {
              window.open(text)
            },
          },
        ],
      }),
    ],
  }),
  parent: document.querySelector('#editor'),
})

const hex2rgb = (hex: string): [number, number, number] => {
  const v = parseInt(hex.substring(1), 16)
  return [
    (v >> 16) & 255,
    (v >> 8) & 255,
    v & 255,
  ]
}

const rgb2hex = (r: number, g: number, b: number): string =>
  '#' + r.toString(16) + g.toString(16) + b.toString(16)
