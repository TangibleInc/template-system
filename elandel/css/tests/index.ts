import path from 'node:path'
import fs from 'node:fs/promises'
import { test, is, ok, run } from 'testra'
import * as css from '../index'

const { dirname } = import.meta

test('create', async () => {

  ok(css, 'created')
  is(typeof css.render, 'function', 'render() exists')

  const fixturesPath = path.join(dirname, 'fixtures')

  const files = (await fs.readdir(fixturesPath)).filter((file) =>
    file.endsWith('.scss')
  )

  css.variables['bg-color'] = '#123'

  for (const file of files) {
    const filePath = path.join(fixturesPath, file)

    const [source, expected = ''] = await Promise.all([
      fs.readFile(filePath, 'utf-8'),
      fs.readFile(filePath.replace('.scss', '.css'), 'utf-8'),
    ])

    const result = await css.render(source, {
      from: filePath,
      minify: true
    })

    is(result.css, expected, file)
  }
})

run()
