import { test, is, ok, run } from 'testra'
import { getServer } from '../common.ts'

export default run(async () => {

  const { wpx, template } = await getServer()

  let result: any

  test('Format', async () => {
    console.log(await template`<Format count>abcdefg</Format>`)
  })

})
