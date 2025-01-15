// import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified, type Plugin, type Processor, type Compiler } from 'unified'
import { render as renderHtml, type Root, type Language } from '../index.ts'

export async function renderMarkdown(
  content: string,
  options?: any
): Promise<string> {
  return (
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, {
        allowDangerousHtml: true,
      })
      .use(rehypeStringify as Plugin)
      .process(content)
  ).toString()
}

/**
 * Plugin to add support for serializing as HTML.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function rehypeStringify(this: any, options: Language) {
  /** @type {Processor<undefined, undefined, undefined, Root, string>} */
  const self = this as Processor
  const settings = {
    allowDangerousHtml: true,
    ...self.data('settings'),
    ...options,
  }

  self.compiler = compiler as unknown as Compiler

  /**
   * @type {Compiler<Root, string>}
   */
  function compiler(tree: Root) {
    return renderHtml(tree, settings)
  }
}
