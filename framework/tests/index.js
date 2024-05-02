import { test, is, ok, run } from 'testra'
import { getServer } from './setup.js'

export default run(async () => {

  const { php, request } = await getServer()

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

    result = await php.run({
      code: `<?php
include 'wp-load.php';

// Clear log
file_put_contents('wp-content/log.txt', '');

echo json_encode([
  'permalink' => get_option( 'permalink_structure' )
]);
exit;
`,
    })

    ok(Boolean(result), 'PHP setup success')

    result = JSON.parse(result.text)

    is('/%postname%/', result.permalink, 'pretty permalink enabled')
  })

  await import('../api/tests/index.js')

  const log = (
    await php.run({
      code: `<?php
echo file_get_contents('wp-content/log.txt');
  `,
    })
  ).text

  if (log) console.log(log)  
})
