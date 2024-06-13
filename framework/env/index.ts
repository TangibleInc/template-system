import path from 'node:path'
import fs from 'node:fs/promises'
import { getWpNowConfig, startServer } from '@tangible/now'
import { disableConsole, enableConsole } from './console'
import { createRequest } from './request'
import type { WPNowServer, WPNowOptions } from '@tangible/now'
import type { NodePHP } from '@php-wasm/node'

let serverInstance: Server

export type Server = {
  php: NodePHP
  port: number
  documentRoot: string
  options: {}
  stopServer: () => Promise<void>
  request: (requestOptions: {
    method?: string | undefined
    route: any
    format?: string | undefined
    data?: {} | undefined
  }) => Promise<any>

  // Template tag functions
  phpx: (code: string, ...args: string[]) => Promise<any>
  wpx: (code: string | TemplateStringsArray, ...args: any[]) => Promise<any>

  setSiteTemplate: (code: string) => void
  resetSiteTemplate: () => void
}

export async function getServer(
  options: {
    path?: string
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
    mappings,
    ...serverOptions
  } = options

  const server: WPNowServer = await startServer({
    ...(await getWpNowConfig({
      path: projectPath,
      mappings,
    })),

    // documentRoot: '/var/www/html',
    projectPath,
    mode: 'plugin',
    phpVersion: '7.4',
    // silence: true,
    reset,
    ...serverOptions,
  })

  const { php, stopServer } = server
  const { port, documentRoot } = server.options

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
        code: phpStart + code.replace(phpStartRegex, ''),
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
    const result = await phpx/* php */`
include 'wp-load.php';
echo json_encode((function() {
  try {
    ${code}
  } catch (Exception $e) {
    return [
      'error' => $e->getMessage()
    ];
  }
})());
`
    try {
      return JSON.parse(result)
    } catch (e) {
      console.error(e)
    }
  }

  await wpx/* php */`
// Pretty permalinks
global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/%postname%/');
$wp_rewrite->flush_rules();
`

  const templatePluginPath = `/${documentRoot}/wp-content/mu-plugins/template-include.php`
  /**
   * Set site template to override theme
   */
  function setSiteTemplate(code: string) {
    php.writeFile(templatePluginPath, `<?php
add_filter('template_include', function() {
  echo tangible_template(<<<'HTML'
${code}
HTML);
  exit;
});`)
  }
  /**
   * Reset site template to let theme handle response
   */
  function resetSiteTemplate() {
    try {
      php.unlink(templatePluginPath)
    } catch(e) {
      // OK
    }
  }

  resetSiteTemplate()

  return (serverInstance = {
    php,
    port,
    documentRoot,
    options: server.options,
    request: createRequest(`http://localhost:${port}`),
    phpx,
    wpx,
    async stopServer() {
      serverInstance = null
      await stopServer()
    },
    setSiteTemplate,
    resetSiteTemplate
  })
}
