import { test, is, ok, run } from 'testra'
import fetch from 'node-fetch'
import { getWpNowConfig, startServer } from '@wp-now/wp-now'

const testSiteUrl = 'http://localhost:8881'

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
  let url = `${testSiteUrl}${isJson ? '/wp-json' : ''}${route}`

  if (!hasBody) {
    // Convert data to URL query
    url += Object.keys(data).reduce(
      (str, key) => str + `${!str ? '?' : '&'}${key}=${data[key]}`,
      '',
    )
  }

  const options = {
    method,
    ...(isJson
      ? {
          headers: {
            'Content-Type': 'application/json',
            ...(request.token
              ? {
                  Authorization: `Bearer ${request.token}`,
                }
              : {}),
          },
          ...(hasBody
            ? {
                body: JSON.stringify(data),
              }
            : {}),
        }
      : {}),
  }

  return await (await fetch(url, options))[format]()
}

request.token = undefined

let php

test('Test site', async () => {

  const server = await startServer({
    ...(await getWpNowConfig({
      path: process.cwd(),
    })),

    // Not working - Fork wp-now
    config: {
      output: false,
    },
    // documentRoot: '/var/www/html',
    // projectPath: process.cwd(),
    mode: 'plugin',
    phpVersion: '7.4',
  })

  php = server.php
  // const wpNowOptions = server.options

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

// Pretty permalinks
global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/%postname%/');
$wp_rewrite->flush_rules();

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

test('REST API', async () => {
  let result = await request({
    route: '/',
  })

  is('object', typeof result, 'responds in JSON object')

  // console.log(result)
  ok(result.routes, 'has routes')

  ok(result.routes['/wp/v2/users/me'], 'route exists: /wp/v2/users/me')

  ok(result.routes['/tangible/v1/token'], 'route exists: /tangible/v1/token')

  // Login
  result = await request({
    method: 'POST',
    route: '/tangible/v1/token',
    data: {
      username: 'admin',
      password: 'password',
    },
  })

  ok(result.token, 'got token')
  request.token = result.token

  result = await request({
    method: 'POST',
    route: '/tangible/v1/token/validate',
  })

  is('jwt_auth_valid_token', result.code, 'validate token')

  // result = await request({
  //   method: 'GET',
  //   route: '/wp/v2/users/1',
  // })
  // console.log('/users/1', result)

  result = await request({
    route: '/wp/v2/users/me',
  })

  is('admin', result.slug, 'can get admin user')
})

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

run().finally(() => process.exit())
