import { create } from './index'

const design = create({
  classPrefix: '',
  // data- attributes are still prefixed
  dataPrefix: 't-',
  components: {},
})

export default design