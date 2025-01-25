import { getServer as getServerBase, type Server } from '@tangible/env'

let server: Server & {
  // Template tag functions
  template: (code: string | TemplateStringsArray, ...args: string[]) => Promise<string>
}

export async function getServer(serverProps?: any) {
  if (server) return server
  const serverBase = await getServerBase(serverProps)

  const { wpx } = serverBase
  await ensureTemplateSystem({ wpx })

  server = {
    ...serverBase,
    async template(code: string | TemplateStringsArray, ...args: string[]) {
      if (Array.isArray(code)) {
        code = code.reduce(
          (prev, now, index) => prev + now + (args[index] ?? ''),
          '',
        )
      }
      return (await wpx/* php */`
return tangible_template(<<<'HTML'
${code}
HTML);`
      ).trim()
    }
  }

  return server
}

export async function ensureTemplateSystem({ wpx }) {
  return wpx/* php */`

if (!function_exists('tangible_template')) {
  if (!function_exists('activate_plugin')) {
    require ABSPATH . 'wp-admin/includes/plugin.php';
  }
  $result = activate_plugin(ABSPATH . 'wp-content/plugins/tangible-template-system/plugin.php');
  if (is_wp_error($result)) return false;
}

if ( !get_option('site_init_done') ) {

  global $wp_rewrite;
  $wp_rewrite->set_permalink_structure('/%postname%/');
  $wp_rewrite->flush_rules();

  update_option('site_init_done', 1);
}

return true;
`
}
