import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default async () => {
  const build = []

  for (const name of [
    'api',
    'preact',
    'select',
  ]) {
    const tasks = (await import(`./${name}/tangible.config.js`)).default.build
    build.push(
      ...tasks.map((task) => ({
        ...task,
        name,
        src: join(__dirname, name, task.src),
        dest: join(__dirname, name, task.dest),
      }))
    )
  }

  return {
    build,
    format: ['**/*.{php,ts,tsx,scss}', '!build'],
  }
}
