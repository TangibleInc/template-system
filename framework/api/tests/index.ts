import { test, is, ok, run } from 'testra'
import { getServer } from '../../env/index.js'

export default run(async () => {

  const { php, request } = await getServer()

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
  
})
