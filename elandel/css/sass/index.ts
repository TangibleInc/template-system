import { PromiseWorker } from './promise-worker'
import type * as Sass from 'sass'

type SassCompiler = (
  str: string,
  opt?: Sass.Options<'async'>,
) => Promise<Sass.CompileResult>

declare global {
  interface Window {
    sass: SassCompiler
  }
}

export async function createSassEngine() {

  // 
  const sassWorker = new PromiseWorker('sass-worker.min.js')

  // TODO: Custom import loader

  async function compile(
    code: string,
  ): Promise<Sass.CompileResult> {
      return (await sassWorker.postMessage({
        code,
      })) as Sass.CompileResult
  }

  return {
    compile
  }
}
