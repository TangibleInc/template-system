import { test, is, ok, run } from 'testra'
import { getServer } from '../common.ts'

export default run(async () => {

  const { wpx } = await getServer()

  await import('./post.ts')
  await import('./taxonomy.ts')

})
