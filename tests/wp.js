import { execSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import path from 'node:path'

/**
 * The wp-env tests container name: instance hash (md5 of the absolute
 * .wp-env.json path) + the `-tests-cli-1` compose suffix
 *
 * @see node_modules/@wordpress/env/lib/config/load-config.js
 */
const testsContainer = () => {
  const configPath = path.resolve(process.cwd(), '.wp-env.json')
  const hash = createHash('md5').update(configPath).digest('hex')
  return `${hash}-tests-cli-1`
}

/**
 * Run wp-cli in the already-running tests container
 */
const wp = (command, options = {}) => {
  const container = testsContainer()
  try {
    /**
     * We use `docker exec` instead of `wp-env run`
     *
     * `wp-env run` makes some https calls to verify the config from
     * .wp-env.json on every call, and will fail if offline or if the
     * source is unreachable
     *
     * @see node_modules/@wordpress/env/lib/commands/run.js
     */
    return execSync(`docker exec ${container} wp ${command}`, {
      encoding: 'utf8',
      ...options,
    })
  } catch (error) {
    throw new Error(
      `wp-cli failed in ${container}. Is the tests instance running? ` +
        `Try: npm run env:start\n${error.message}`,
    )
  }
}

export { wp }
