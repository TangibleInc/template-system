import { test, is, ok, run } from 'testra'
import { getServer } from '../../framework/env'
import { ensureTemplateSystem } from '../common.ts'

export default run(async () => {

  const { wpx } = await getServer()

  // let result: any
  // result = await ensureTemplateSystem({ wpx })

  await import('./post.ts')
  await import('./taxonomy.ts')

})
