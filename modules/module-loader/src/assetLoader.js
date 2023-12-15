/**
 * Asset loader: JS and CSS with dependencies
 */
const loading = {} // name => Promise
const loaded = {} // name => true

async function assetLoader(assets) {
  if (!assets || !assets.length) return
  if (Array.isArray(assets)) {
    return await Promise.all(assets.map(assetLoader))
  }
  if (typeof assets === 'string') {
    assets = { file: assets }
  }

  const { file = '', depend = [] } = assets

  // Ensure dependencies
  if (depend.length) await assetLoader(depend)

  // Loaded
  if (loaded[file]) return

  // Currently loading
  if (loading[file]) return await loading[file]

  // Start loading
  loading[file] = new Promise((resolve, reject) => {
    // Create DOM element and await loaded

    const extension = file.split('.').pop()

    const handler = function (e) {
      delete loading[file] // Clear loading state

      // e.type is 'load' or 'error'
      if (e.type[0] === 'e')
        return reject(new Error(`Failed loading file: ${file}`))

      loaded[file] = true
      resolve()
    }

    if (extension === 'css') {
      const el = window.document.createElement('link')

      el.onload = el.onerror = handler
      el.rel = 'stylesheet'
      el.href = file

      window.document.head.appendChild(el)

      return
    }

    if (extension === 'js') {
      const el = window.document.createElement('script')

      el.onload = el.onerror = handler
      el.src = file

      window.document.head.appendChild(el)

      return
    }

    reject(new Error(`Unknown file extension: ${file}`))
  })

  return await loading[file]
}

export default assetLoader
