
export function createAction(options) {

  const {
    ajaxUrl,
    nonce,
    ajaxAction
  } = options

  return async function action(name, data) {

    const formData = new FormData()
  
    formData.append('action', ajaxAction)
    formData.append('nonce', nonce)
    formData.append('request', JSON.stringify({
      action: name,
      data
    }))
  
    // TODO: Support file upload
  
    try {
  
      const response = await fetch(ajaxUrl, {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
      })
  
      if ( !(response.status >= 200 && response.status < 300) ) {
        const error = {
          code: response.status,
          message: response.statusText
        }
        return { error }
      }
  
      // Action response can be: { data } or { error }
      return await response.json()
  
    } catch(error) {
      // Convert into error response
      return { error }
    }
  
  }
}
