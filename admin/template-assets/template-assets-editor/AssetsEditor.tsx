import { useEffect, useRef, useState } from 'react'

const { wp } = window

let mediaModal
let mediaModalCallback
const openMediaModal = () => {
  // Open media library

  if (mediaModal) {
    mediaModal.open()
    return
  }

  mediaModal = wp.media({
    title: 'Select media attachment',
    button: {
      text: 'Select',
    },
    multiple: true,
  })

  mediaModal.on('select', mediaModalCallback)
  mediaModal.open()
}

/**
 * Ensure valid asset name, so it can be used as variable name:
 * alphanumeric, dash, and underscore.
 *
 * This is only applied for newly added asset, because if we apply it
 * while the user is editing the input field, the cursor jumps unexpectedly.
 *
 * Same logic on server side: /admin/template-post/fields.php, get_template_fields()
 */
function withValidName(asset) {
  if (asset.name) {
    asset.name = asset.name.replace(/[^\w_\-]/g, '')
  }
  return asset
}

const AssetsEditor = ({ assets }) => {
  const [assetsState, _setAssets] = useState(assets)

  // Fresh state reference for callbacks
  const assetsRef = useRef()
  assetsRef.current = assetsState

  /**
   * Update assets JSON in input field on every change
   */
  const assetsElementRef = useRef()
  const updateAssetsElement = () => {
    assetsElementRef.current.value = JSON.stringify(assetsRef.current)
  }

  useEffect(() => {
    updateAssetsElement()
  }, [assetsElementRef.current])

  // Create new assets state on change
  const refreshAssets = () => {
    _setAssets([...assetsRef.current])
    updateAssetsElement()
  }
  const addAsset = (newAsset) => {
    assetsRef.current.push(withValidName(newAsset))
    refreshAssets()
  }
  const updateAsset = (index, newAsset) => {
    assetsRef.current[index] = {
      ...(assetsRef.current[index] || {}),
      ...newAsset,
    }
    refreshAssets()
  }
  const removeAsset = (assetIndex) => {
    assetsRef.current.splice(assetIndex, 1)
    refreshAssets()
  }

  if (!mediaModalCallback) {
    mediaModalCallback = () => {
      const attachments = mediaModal.state().get('selection').toJSON()
      // Previously accepted only one attachment
      // const attachment = mediaModal.state().get('selection').first().toJSON()

      console.log('Got attachments', attachments)

      for (const attachment of attachments) {
        // Ensure the same attachment is added only once
        let skip = false
        for (const asset of assetsRef.current) {
          if (asset.id === attachment.id) {
            skip = true
            break
          }
        }
        if (skip) continue

        /**
         * Extract attachment fields
         */
        const newAsset = [
          'id',
          // 'url',
          'name',
          'title',
          'filename',
          'mime',
          'alt',
          'caption',
          'description',
        ].reduce((obj, key) => {
          obj[key] = attachment[key]
          return obj
        }, {})

        addAsset(newAsset)
      }
    }
  }

  // Map of asset names to check for duplicates
  const assetNameMap = {} // name => true

  return (
    <>
      <input type="hidden" name="assets" ref={assetsElementRef} />

      <div className="template-assets">
        {assetsState.map((asset, assetIndex) => {
          const isDuplicate = assetNameMap[asset.name] ? true : false

          if (!isDuplicate) {
            assetNameMap[asset.name] = true
          }

          return (
            <div key={`asset-${assetIndex}`} className="template-asset">
              <div className="template-asset-fields">
                <div className="template-asset-field template-asset-field--name">
                  <label>Name</label>

                  <input
                    type="text"
                    value={asset.name}
                    onChange={(e) => {
                      updateAsset(assetIndex, { name: e.target.value })
                    }}
                  />
                </div>
                <div className="template-asset-field template-asset-field--attachment">
                  <div>
                    {isDuplicate && (
                      <div className="template-asset--duplicate-name-message">
                        Duplicate name exists
                      </div>
                    )}
                    ID:{' '}
                    <a
                      href={`post.php?post=${asset.id}&action=edit`}
                      target="_blank"
                    >
                      {asset.id}
                    </a>, 
                    Title: {asset.title}, 
                    File name: <code>{asset.filename}</code>
                    <br />
                    {/* MIME type: <code>{ asset.mime }</code> */}
                  </div>
                </div>
              </div>
              <div className="template-asset-actions">
                <div className="template-asset-action template-asset-action--remove-asset">
                  <div className="icon" onClick={() => removeAsset(assetIndex)}>
                    <svg
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className="button button--add-rule-group"
        onClick={() => openMediaModal()}
      >
        Add asset
      </button>
    </>
  )
}

export default AssetsEditor
