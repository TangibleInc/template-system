// import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { render as renderHtml } from '../index.ts'

export async function renderMarkdown(content: string, options?: any): Promise<string> {
  return await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content)
}

/**
 * Plugin to add support for serializing as HTML.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function rehypeStringify(options) {
  /** @type {Processor<undefined, undefined, undefined, Root, string>} */
  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.
  const self = this
  const settings = {...self.data('settings'), ...options}

  self.compiler = compiler

  /**
   * @type {Compiler<Root, string>}
   */
  function compiler(tree) {
    return renderHtml(tree, settings)
  }
}
