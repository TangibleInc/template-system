import * as Logic from './index.ts'

declare global {
  interface Window {
    Tangible: {
      Logic: typeof Logic
    }
  }
}

window.Tangible = window.Tangible || {}
window.Tangible.Logic = Logic
