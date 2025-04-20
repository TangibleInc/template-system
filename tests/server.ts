import path from 'node:path'
import fs from 'node:fs/promises'
import { getWpNowConfig, startServer } from '@tangible/now'
import type { WPNowServer, WPNowOptions } from '@tangible/now'
import type { PHP } from '@php-wasm/universal'

/**
 * Create a wrapper around `fetch()` with given URL for JSON API
 */
export type Requester = {
  (options: {
    route: string
    method?: string
    format?: 'json' | 'text' | 'arrayBuffer'
    data?: {
      [key: string]: string
    }
  }): Promise<any>
  token?: string
}

export function createRequest(siteUrl: string): Requester {
  const request: Requester = async ({
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

    const options: {
      method: string
      headers?: {
        [key: string]: string
      }
      body?: string
    } = {
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

    return await (await fetch(url, options))[
      format
    ]()
  }

  request.token = undefined

  return request
}

/**
 * Console
 */
const silentConsole = {
  log() {},
  warn() {},
  error() {},
}
export const originalConsole = globalThis.console

export const disableConsole = () => {
  // Silence console messages from NodePHP
  globalThis.console = silentConsole as Console
}

export const enableConsole = () => {
  globalThis.console = originalConsole
}


let serverInstance: Server | null

export type Server = {
  php: PHP
  port: number
  siteUrl: string
  documentRoot: string
  options: {}
  stopServer: () => Promise<void>
  request: Requester
  console: Console

  // Template tag functions
  phpx: (code: string | TemplateStringsArray, ...args: any[]) => Promise<any>
  wpx: (code: string | TemplateStringsArray, ...args: any[]) => Promise<any>

  setSiteTemplate: (code: string) => void
  resetSiteTemplate: () => void

  onMessage: (callback: Listener) => void
}

export type Listener = (message: any) => void

export async function getServer(
  options: {
    path?: string
    blueprint?: string
    env?: string
    mappings?: {
      [target: string]: string
    }
    phpVersion?: string
    restart?: boolean
    reset?: boolean
  } = {},
): Promise<Server> {
  if (serverInstance) {
    if (!options.restart) return serverInstance
    await serverInstance.stopServer()
  }

  const {
    path: projectPath = path.join(process.cwd(), 'tests'),
    reset = true,
    blueprint,
    env,
    mappings,
    ...serverOptions
  } = options

  const server: WPNowServer = await startServer({
    ...(await getWpNowConfig({
      path: projectPath,
      blueprint,
      env,
        // @ts-ignore
      mappings,
    })),

    projectPath,
    mode: 'plugin',
    phpVersion: '8.2',
    // silence: true,
    reset,
    ...serverOptions,
  } as WPNowOptions)

  const { php, stopServer } = server
  const {
    port = 3000,
    documentRoot = '/var/www/html'
  } = server.options

  /**
   * PHP-WASM provides a function post_message_to_js() to send messages from PHP to JS.
   * It expects a single global listener on JS side, with no way to unsubscribe. The following
   * is a wrapper to enable multiple listeners with unsubscribe.
   */

  const phpListeners: Listener[] = []

  // Subscriber
  function onMessage(callback: Listener) {
    if (phpListeners.indexOf(callback) === -1) {
      phpListeners.push(callback)
    }
    // Unsubscriber
    return function unsubscribe() {
      phpListeners.splice(phpListeners.indexOf(callback), 1)
    }
  }

  php.onMessage(function globalListener(data: string) {
    try {
      const message = JSON.parse(data)
      for (const listener of phpListeners) {
        listener(message)
      }  
    } catch(e) {
      console.error(e)
    }
  })

  const phpStart = '<?php '
  const phpStartRegex = /^<\?php /

  /**
   * Run PHP code - Starting PHP tag is optional
   *
   * ```js
   * const result = phpx`echo 'hi';`
   * ```
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
   */
  const phpx = async (code: string | TemplateStringsArray, ...args: string[]) => {
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
        code: phpStart + (code as string).replace(phpStartRegex, ''),
      })
    } catch (e: any) {
      result = { errors: e.message }
    }
    const { text, errors } = result

    enableConsole()

    if (errors) throw new Error(errors)
    else return text
  }

  /**
   * Run PHP code in WordPress context
   *
   * ```js
   * const result = wpx`return 'hi';`
   * ```
   */
  const wpx = async (code: string | TemplateStringsArray, ...args: string[]) => {
    if (Array.isArray(code)) {
      code = code.reduce(
        (prev, now, index) => prev + now + (args[index] ?? ''),
        '',
      )
    }

    // Extract lines to use namespace and put them at the top
    let useNamespace = ''
    let filteredCode = ''

    for (const line of (code as string).split('\n')) {
      if (line.trim().startsWith('use ')) {
        useNamespace += line + '\n';
      } else {
        filteredCode += line + '\n'
      }
    }

const result = await phpx/* php */`
${useNamespace}
include 'wp-load.php';
echo json_encode((function() {
  try {
    ${filteredCode}
  } catch (Exception $e) {
    return [
      'error' => $e->getMessage()
    ];
  }
})());`

    try {
      return JSON.parse(result || '')
    } catch (e) {
      console.error(e)
    }
  }

  await wpx/* php */ `
// Pretty permalinks
global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/%postname%/');
$wp_rewrite->flush_rules();
`

  const templatePluginPath = `${documentRoot}/wp-content/mu-plugins/template-include.php`
  /**
   * Set site template to override theme
   */
  function setSiteTemplate(code: string) {
    php.writeFile(
      templatePluginPath,
      `<?php
add_filter('template_include', function() {
  echo tangible_template(<<<'HTML'
${code}
HTML);
  exit;
});`,
    )
  }
  /**
   * Reset site template to let theme handle response
   */
  function resetSiteTemplate() {
    try {
      php.unlink(templatePluginPath)
    } catch (e) {
      // OK
    }
  }

  resetSiteTemplate()

  const siteUrl = `http://localhost:${port}`

  return (serverInstance = {
    php,
    port,
    console: originalConsole,
    siteUrl,
    documentRoot,
    options: server.options,
    request: createRequest(siteUrl),
    phpx,
    wpx,
    async stopServer() {
      serverInstance = null
      await stopServer()
    },
    onMessage,
    setSiteTemplate,
    resetSiteTemplate,
  })
}
