import { create } from './index'
import Popper from './popper'
import * as components from './components'

const design = create({
  classPrefix: '',
  components: Object.assign(components, {
    Popper,
  }),
})

declare global {
  var Tangible: {
    Design?: typeof design
  }
}

;(window.Tangible = window.Tangible || {}).Design = design
