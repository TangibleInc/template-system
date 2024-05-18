import fs from 'node:fs/promises'
import path from 'path'

export const __dirname = path.join(process.cwd(), 'tests')
export const readJson = async (file) =>
  JSON.parse(await fs.readFile(path.join(__dirname, file), 'utf8'))
