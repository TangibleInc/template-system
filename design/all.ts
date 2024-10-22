import { create } from './index'
import Popper from './popper'
import * as components from './components'

const design =
  typeof window === 'undefined'
    ? {}
    : create({
        components: Object.assign(components, {
          Popper,
        }),
      })

export default design
