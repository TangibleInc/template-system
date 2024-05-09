import fetch from 'node-fetch'

/**
 * Create a wrapper around `fetch()` with given URL for JSON API
 */
export function createRequest(siteUrl: string) {
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
