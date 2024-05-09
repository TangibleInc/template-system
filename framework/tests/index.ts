import { test, is, ok, run } from 'testra'
import { getServer } from '../env/index.js'

export default run(async () => {
  const { php, request, phpx, wpx } = await getServer({
    reset: true
  })

  // Object.assign(globalThis, { php, request })

  test('Test site', async () => {
    ok(true, 'starts')

    let result = await request({
      route: '/',
      format: 'text',
    })

    ok(Boolean(result), 'responds')
    is('<!doc', result.slice(0, 5).toLowerCase(), 'responds with HTML document')

    // https://wordpress.github.io/wordpress-playground/api/universal/class/BasePHP

    result = await wpx`
// Clear log
file_put_contents('wp-content/log.txt', '');

return [
  'permalink' => get_option( 'permalink_structure' )
];`

    ok(Boolean(result), 'PHP setup success')

    is('/%postname%/', result.permalink, 'pretty permalink enabled')
  })

  await import('../api/tests/index.js')

  test('Log', async () => {
    const log = (
      await php.run({
        code: `<?php
echo file_get_contents('wp-content/log.txt');
  `,
      })
    ).text

    if (log) console.log(log)
  })
})
