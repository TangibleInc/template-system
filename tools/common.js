import util from 'node:util'
import { exec as execSync } from 'node:child_process'

const execAsync = util.promisify(execSync)

export const run = async (...args) => {
  try {
    const { stdout, stderr } = await execAsync(...args)
    return [stdout, stderr]
  } catch (e) {
    return [null, e.message]
  }
}
