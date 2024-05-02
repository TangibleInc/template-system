import path from 'node:path'
import fetch from 'node-fetch'
import { getWpNowConfig, startServer } from '@tangible/now'

export function createRequest(siteUrl) {
  const request = async ({
    method = 'GET',
    route,
    /**
     * Response format: arrayBuffer, formData, json, text
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Response#instance_methods
     */
    format = 'json',
    data = {},
  }) => {
    const isJson = format === 'json'
    const hasBody = !['GET', 'HEAD'].includes(method)
    let url = `${siteUrl}${isJson ? '/wp-json' : ''}${route}`

    if (!hasBody) {
      // Convert data to URL query
      url += Object.keys(data).reduce(
        (str, key) => str + `${!str ? '?' : '&'}${key}=${data[key]}`,
        '',
      )
    }

    const options = {
      method,
    }

    if (isJson) {
      options.headers = {
        'Content-Type': 'application/json',
      }
      if (request.token) {
        options.headers.Authorization = `Bearer ${request.token}`
      }
      if (hasBody) {
        options.body = JSON.stringify(data)
      }
    }

    return await (await fetch(url, options))[format]()
  }

  request.token = undefined

  return request
}

const silentConsole = {
  log() {},
  warn() {},
  error() {},
}
const originalConsole = globalThis.console

const disableConsole = () => {
  // Silence console messages from NodePHP
  globalThis.console = silentConsole
}

const enableConsole = () => {
  globalThis.console = originalConsole
}

let serverInstance

export async function getServer(options = {}) {

  if (serverInstance) {
    if (!options.reset) return serverInstance
    await serverInstance.stopServer()
  }

  const {
    path: projectPath = path.join(process.cwd(), 'tests'),
    reset = false,
    ...serverOptions
  } = options

  const server = await startServer({
    ...(await getWpNowConfig({
      path: projectPath,
    })),

    // documentRoot: '/var/www/html',
    projectPath,
    mode: 'plugin',
    phpVersion: '7.4',
    // silence: true,
    ...serverOptions,
  })

  const { port } = server.options

  const { php, stopServer } = server

  const phpStart = '<?php '
  const phpStartRegex= /^<\?php /

  /**
   * Run PHP code - Starting PHP tag is optional
   * 
   * ```js
   * const result = phpx`echo 'hi';`
   * ```
   * 
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
   */
  const phpx = async (code, ...args) => {
    if (Array.isArray(code)) {
      code = code.reduce(
        (prev, now, index) => prev + now + (args[index] ?? ''),
        '',
      )
    }

    disableConsole()

    let result
    try {
      result = await php.run({
        code: phpStart + code.replace(phpStartRegex, '')
      })
    } catch (e) {
      result = { errors: e.message }
    }
    const { text, errors } = result

    enableConsole()

    if (errors) throw errors
    else return text
  }

  /**
   * Run PHP code in WordPress context
   * 
   * ```js
   * const result = wpx`return 'hi';`
   * ```
   */
  const wpx = async (code, ...args) => {
    if (Array.isArray(code)) {
      code = code.reduce(
        (prev, now, index) => prev + now + (args[index] ?? ''),
        '',
      )
    }
    return JSON.parse(
      await phpx`
include 'wp-load.php';
echo json_encode((function() { ${code} })());`,
    )
  }

  await wpx`
// Pretty permalinks
global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/%postname%/');
$wp_rewrite->flush_rules();
`

  return (serverInstance = {
    php,
    port,
    options: server.options,
    request: createRequest(`http://localhost:${port}`),
    phpx,
    wpx,
    async stopServer() {
      serverInstance = null
      await stopServer()
    },
  })
}
