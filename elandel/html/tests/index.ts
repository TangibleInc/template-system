import fs from 'node:fs/promises'
import { test, is, run } from 'testra'
import { parse, render, format } from '../index'

const { dirname } = import.meta
const testContent = await fs.readFile(`${dirname}/test-1.html`, 'utf-8')
const testContentTree = JSON.parse(
  await fs.readFile(`${dirname}/test-1-parse.json`, 'utf-8'),
)

const language = {
  closedTags: ['Else', 'Field'],
}

test('parse', () => {
  is(parse(testContent, language), testContentTree, 'works')
})

test('format', async () => {
  is(
    render(format(parse(testContent, language), language), language),
    await fs.readFile(`${dirname}/test-1-format-fragment.html`, 'utf-8'),
    'fragment',
  )

  is(
    render(
      format(parse(testContent, { document: true, ...language }), language),
      language,
    ),
    await fs.readFile(`${dirname}/test-1-format-document.html`, 'utf-8'),
    'document',
  )
})

run()
