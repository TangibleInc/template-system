import { execSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import path from 'node:path'

/**
 * Get the wp-env tests container name
 *
 * wp-env >= 11.5: `wp-env-{project directory}-{hash}-tests-cli-1`
 * wp-env < 11.5: `{hash}-tests-cli-1`
 *
 * {hash} is the md5 of the absolute .wp-env.json path, shortened to
 * 8 characters if wp-env >= 11.5
 *
 * @see node_modules/@wordpress/env/lib/config/load-config.js
 */
const testsContainer = () => {
  const configPath = path.resolve(process.cwd(), '.wp-env.json')
  const hash = createHash('md5').update(configPath).digest('hex')
  const containers = execSync(
    'docker ps --filter label=com.docker.compose.service=tests-cli --format {{.Names}}',
    { encoding: 'utf8' },
  ).split('\n')
  return containers.find(name => name.includes(hash.slice(0, 8)))
    ?? `${hash}-tests-cli-1`
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
