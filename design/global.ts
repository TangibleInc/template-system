import * as Design from './index'

declare global {
  var Tangible: {
    Design: typeof Design
  }
}

(window.Tangible = window.Tangible || {}).Design = Design
