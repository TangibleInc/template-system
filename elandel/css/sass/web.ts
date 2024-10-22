import { PromiseWorker } from './promise-worker'
import type * as Sass from 'sass'

export type SassCompiler = (
  code: string,
  options?: Sass.Options<'sync'>,
) => Promise<Sass.CompileResult>

export async function createSassEngine(): Promise<{
  compile: SassCompiler
}> {

  const sassWorker = new PromiseWorker('sass-worker.min.js')

  // TODO: Custom import loader

  async function compile(
    code: string,
    options: Sass.Options<'sync'> = {}
  ): Promise<Sass.CompileResult> {
      return (await sassWorker.postMessage({
        code,
        options
      })) as Sass.CompileResult
  }

  return {
    compile
  }
}
