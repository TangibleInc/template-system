import path from 'node:path'
import fs from 'node:fs/promises'
import { getWpNowConfig, startServer } from '@tangible/now'
import { disableConsole, enableConsole } from './console'
import { createRequest } from './request'

let serverInstance

export async function getServer(options = {}) {

  if (serverInstance) {
    if (!options.reset) return serverInstance
    await serverInstance.stopServer()
  }

  const {
    path: projectPath = path.join(process.cwd(), 'tests'),
    reset = false,
    mappings,
    ...serverOptions
  } = options

  const server = await startServer({
    ...(await getWpNowConfig({
      path: projectPath,
      mappings
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
echo json_encode((function() {
  try {
    ${code}
  } catch (Exception $e) {
    return [
      'error' => $e->getMessage()
    ];
  }
})());`,
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
    read: file => fs.readFile(file, 'utf8'),
    phpx,
    wpx,
    async stopServer() {
      serverInstance = null
      await stopServer()
    },
  })
}
