import fs from 'node:fs/promises'
import { test, is, run } from 'testra'
import * as html from '../index'

const { dirname } = import.meta
const testContent = await fs.readFile(`${dirname}/test-1.html`, 'utf-8')
const testContentTree = JSON.parse(
  await fs.readFile(`${dirname}/test-1-parse.json`, 'utf-8')
)

html.language.closedTags?.push('Else', 'Field')

test('parse', () => {
  is(html.parse(testContent), testContentTree, 'works')
})

test('format', async () => {
  is(
    html.render(html.format(html.parse(testContent))),
    await fs.readFile(`${dirname}/test-1-format-fragment.html`, 'utf-8'),
    'fragment'
  )

  is(
    html.render(html.format(html.parse(testContent, { document: true }))),
    await fs.readFile(`${dirname}/test-1-format-document.html`, 'utf-8'),
    'document'
  )
})

run()
