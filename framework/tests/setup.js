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

let serverInstance

export async function getServer(options = {}) {
  const {
    path: projectPath = process.cwd(),
    reset = false,
    ...serverOptions
  } = options

  if (serverInstance) {
    if (!reset) return serverInstance
    await serverInstance.stopServer()
  }

  const server = await startServer({
    ...(await getWpNowConfig({
      path: projectPath,
    })),

    // documentRoot: '/var/www/html',
    projectPath,
    mode: 'plugin',
    phpVersion: '7.4',
    silence: true,
    ...serverOptions,
  })

  const { port } = server.options

  const silentConsole = {
    log() {},
    warn() {},
    error() {},
  }
  const { php, stopServer } = server

  const runPhp = async (code) => {
    // Silence console messages from NodePHP
    const _console = globalThis.console
    globalThis.console = silentConsole
    let result
    try {
      result = await php.run({
        code,
      })
    } catch (e) {
      result = { errors: e.message }
    }
    const { text, errors } = result
    globalThis.console = _console
    if (errors) throw errors
    else return text
  }

  const runWp = async (code) => {
    return JSON.parse(
      await runPhp(`<?php include 'wp-load.php';
echo json_encode((function() { ${code} })());`),
    )
  }

  await runPhp(`
// Pretty permalinks
global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/%postname%/');
$wp_rewrite->flush_rules();
`)

  return (serverInstance = {
    php,
    port,
    options: server.options,
    request: createRequest(`http://localhost:${port}`),
    runPhp,
    runWp,
    async stopServer() {
      serverInstance = null
      await stopServer()
    },
  })
}
