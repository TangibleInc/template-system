import fs from 'node:fs'
import { test, expect } from '@wordpress/e2e-test-utils-playwright'
import { useGuestPage, SECRET_OPTION_VALUE } from './utils.js'

const { describe } = test

/**
 * A paginated Loop and an Async tag print their template into the page with a
 * hash, and tangible_template_render only renders what that hash covers: the
 * whole template (tag, attributes, children) and its context.
 *
 * Requests go through the real client, so the data takes the same trip as in
 * production: JSON in the page, jQuery serialization, PHP request parsing. The
 * hash must survive that trip for every template in the cases file, and must
 * not survive any change made by the client.
 *
 * @see language/ajax/index.php
 * @see language/utils/hash.php
 * @see tests/e2e/ajax/template-render-cases.json
 */
const CASES = JSON.parse(
  fs.readFileSync(
    new URL('./template-render-cases.json', import.meta.url),
    'utf8',
  ),
)

const caseIndex = (name) => CASES.findIndex((entry) => entry.name === name)

// The request the client would send for a case
const readRequest = (page, index) =>
  page.evaluate((index) => {

    const $case = window.jQuery(`#case-${index}`)
    const $loop = $case.find('.tangible-paginator-target')

    if (!$loop.length) {
      return $case.find('.tangible-async-render').data('templateData')
    }

    const { template, hash, context, context_hash } = $loop.data(
      'tangiblePaginatorTargetData',
    )

    return { template, hash, context, context_hash, page: 1 }
  }, index)

const render = (page, request) =>
  page.evaluate(
    (request) =>
      window.Tangible.ajax('tangible_template_render', request).then(
        (data) => ({ success: true, data }),
        (data) => ({ success: false, data }),
      ),
    request,
  )

const INJECTED = {
  tag: 'Setting',
  attributes: { keys: ['tangible_e2e_secret_option'] },
}

const changeTemplate = (change) => (request) => ({
  ...request,
  template: change(request.template),
})

const changeFirstChild = (change) =>
  changeTemplate((template) => ({
    ...template,
    children: [change(template.children[0]), ...template.children.slice(1)],
  }))

/**
 * Each entry changes a signed request the way a client could. The case is the
 * name of the entry in the cases file the request is read from.
 */
const TAMPERED = [
  {
    name: 'children replaced',
    case: 'empty and self-closing tags',
    change: changeTemplate((template) => ({
      ...template,
      children: [INJECTED],
    })),
  },
  {
    name: 'child appended',
    case: 'empty and self-closing tags',
    change: changeTemplate((template) => ({
      ...template,
      children: [...template.children, INJECTED],
    })),
  },
  {
    name: 'nested child appended',
    case: 'empty and self-closing tags',
    change: changeFirstChild((child) => ({
      ...child,
      children: [...child.children, INJECTED],
    })),
  },
  {
    name: 'nested child attribute changed',
    case: 'empty and valueless attributes',
    change: changeFirstChild((child) => ({
      ...child,
      attributes: { ...child.attributes, title: 'changed' },
    })),
  },
  {
    name: 'nested child tag changed',
    case: 'empty and valueless attributes',
    change: changeFirstChild((child) => ({ ...child, tag: 'Setting' })),
  },
  {
    name: 'text changed',
    case: 'special characters in text',
    change: changeFirstChild((child) => ({
      ...child,
      children: [{ text: 'changed' }],
    })),
  },
  {
    name: 'children removed',
    case: 'plain field',
    change: changeTemplate(({ children, ...template }) => template),
  },
  {
    name: 'tag changed',
    case: 'plain field',
    change: changeTemplate((template) => ({ ...template, tag: 'Setting' })),
  },
  {
    name: 'loop attribute changed',
    case: 'plain field',
    change: changeTemplate((template) => ({
      ...template,
      attributes: { ...template.attributes, post_type: 'page' },
    })),
  },
  {
    name: 'loop attribute added',
    case: 'plain field',
    change: changeTemplate((template) => ({
      ...template,
      attributes: { ...template.attributes, status: 'private' },
    })),
  },
  {
    name: 'loop attribute removed',
    case: 'plain field',
    change: changeTemplate((template) => {
      const { category, ...attributes } = template.attributes
      return { ...template, attributes }
    }),
  },
  {
    name: 'template replaced by a string',
    case: 'plain field',
    change: changeTemplate(() => '<Setting tangible_e2e_secret_option />'),
  },
  {
    name: 'template sent as JSON',
    case: 'plain field',
    change: changeTemplate((template) => JSON.stringify(template)),
  },
  {
    name: 'async template changed',
    case: 'async template',
    change: changeTemplate(
      (template) => template + '<Setting tangible_e2e_secret_option />',
    ),
  },
  {
    name: 'variable value changed',
    case: 'global variable set before loop',
    message: 'Invalid context hash',
    change: (request) => ({
      ...request,
      context: {
        variable_types: { global: { e2e_global: 'changed' } },
      },
    }),
  },
  {
    name: 'variable added',
    case: 'global variable set before loop',
    message: 'Invalid context hash',
    change: (request) => ({
      ...request,
      context: {
        variable_types: {
          ...request.context.variable_types,
          local: { added: 'value' },
        },
      },
    }),
  },
  {
    name: 'current post changed',
    case: 'async template',
    message: 'Invalid context hash',
    change: (request) => ({
      ...request,
      context: { ...request.context, current_post_id: 1 },
    }),
  },
]

describe('AJAX signing: tangible_template_render', () => {

  const guestPage = useGuestPage('/?pagename=e2e-ajax-render')

  CASES.forEach((entry, index) => {
    test(`accepts: ${entry.name}`, async () => {

      const page = guestPage()
      const request = await readRequest(page, index)

      expect(request?.hash, 'signed template in the page').toBeTruthy()

      const response = await render(page, request)

      expect(response.data?.message).toBeUndefined()
      expect(response.success).toBe(true)

      // Not only accepted: nothing of the template got lost on the way
      expect(response.data.trim()).toBe(entry.expect)
    })
  })

  test('honors an unsigned page change', async () => {

    const page = guestPage()
    const request = await readRequest(page, caseIndex('plain field'))

    const response = await render(page, { ...request, page: 2 })

    expect(response.success).toBe(true)
    expect(response.data).toBe('E2E Pager B')
  })

  TAMPERED.forEach((entry) => {
    test(`rejects: ${entry.name}`, async () => {

      const page = guestPage()
      const request = await readRequest(page, caseIndex(entry.case))

      expect(request?.hash, 'signed template in the page').toBeTruthy()

      const response = await render(page, entry.change(request))

      expect(response.success).toBe(false)
      expect(response.data?.message).toBe(
        entry.message ?? 'Invalid template hash',
      )
      expect(JSON.stringify(response)).not.toContain(SECRET_OPTION_VALUE)
    })
  })
})
