/**
 * Template importer with support for handling duplicates
 *
 * Also used in ../../template-cloud
 */

import { useEffect, useRef, useState } from 'react'
import { decode as decodeImageBuffer } from 'png-compressor'
import handleDuplicates from './handleDuplicates'

import { ajax, ajaxActionPrefix } from '../common'

const debug = false // Set this to false for production
const log = (...args) => debug && console.log('[Importer]', ...args)

const { FileReader } = window

const postTypeToLabel = {
  tangible_template: 'Templates',
  tangible_style: 'Styles',
  tangible_script: 'Scripts',
  tangible_layout: 'Layouts',
  tangible_block: 'Blocks',
}

const Importer = ({
  useInput = true,
  directImportData, // Optionally pass direct JSON data instead of using file upload
}) => {
  const [inputState, setInputState] = useState({
    importing: false,
    importData: {},
    importedData: {},
    message: '',
    duplicatesFound: [],
    duplicatesHandledMessage: '',
  })

  const inputStateRef = useRef()
  inputStateRef.current = inputState

  const preImport = () => {
    setInputState({
      ...inputStateRef.current,
      importing: true,
      importData: {},
      importedData: {},
      duplicatesFound: [],
      duplicatesHandledMessage: '',
      message: 'Importing..',
    })
  }

  const onError = (message) =>
    setInputState({
      ...inputStateRef.current,
      importing: false,
      importData: {},
      importedData: {},
      duplicatesFound: [],
      duplicatesHandledMessage: '',
      message: 'Error: ' + message,
    })

  const importJSON = (data) => {
    setInputState({
      ...inputStateRef.current,
      importData: data,
    })

    ajax(ajaxActionPrefix + 'import', data)
      .then((result) => {
        // Import complete
        log('Import success', result)

        const { importData } = inputStateRef.current
        const importedData = {
          post_types: Object.keys(importData.post_types).reduce(
            (obj, postType) => {
              const duplicateIds = result.duplicates_found
                .filter((post) => post.post_type === postType)
                .map((post) => post.id)

              obj[postType] = importData.post_types[postType].filter(
                (post) => duplicateIds.indexOf(post.id) < 0
              )

              return obj
            },
            {}
          ),
          // Map of old to new ID - See same property in ./handleDuplicates
          old_to_new_id: result.old_to_new_id || {},
        }

        log('Imported minus duplicates', importedData)

        setInputState({
          ...inputStateRef.current,
          importing: false,
          duplicatesFound: result.duplicates_found,
          importData: result.duplicates_found.length ? importData : {}, // Clear
          importedData,
          message:
            result.post_count +
            ' template' +
            (result.post_count !== 1 ? 's' : '') +
            ' imported' +
            (result.failed_post_count
              ? ' - ' +
                result.failed_post_count +
                ' template' +
                (result.failed_post_count !== 1 ? 's' : '') +
                ' failed'
              : ''),
        })
      })
      .catch((error) => {
        // Import failed
        console.error(error)
        onError(error.message)
      })
  }

  useEffect(() => {
    if (!directImportData) return

    preImport()
    importJSON(directImportData) // Will correctly refresh when a new block json is installed
  }, [])

  const fileInputRef = useRef()

  return (
    <div id="importer">
      {useInput && (
        <p>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept=".json,text/json,.png,image/png"
            onChange={({ target: { files } }) => {
              // File upload

              // log('File upload state', files)

              const file = files[0]

              const isImage = file.name.endsWith('.png')

              const reader = new FileReader()

              preImport()

              reader.onload = function (e) {
                const content = e.target.result

                // File upload complete

                if (isImage) {
                  decodeImageBuffer(content)
                    .then((data) => {
                      importJSON(data)
                    })
                    .catch((error) => {
                      console.error(error)
                      onError(error.message)
                    })
                  return
                }

                try {
                  const data = JSON.parse(content)

                  log('Import data', data)

                  importJSON(data)
                } catch (e) {
                  log('Invalid JSON', content)

                  onError('Invalid JSON')
                }
              }

              reader.onerror = function (e) {
                onError(e.message)
              }

              if (isImage) {
                reader.readAsArrayBuffer(file)
              } else {
                reader.readAsText(file)
              }
            }}
          />
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              if (inputState.importing) return
              fileInputRef.current && fileInputRef.current.click()
            }}
          >
            Import
          </button>
        </p>
      )}

      {inputState.message && <p>{inputState.message}</p>}

      {
        // List imported posts

        Object.keys(inputState.importedData.post_types || {}).map(
          (postType) =>
            inputState.importedData.post_types[postType] &&
            inputState.importedData.post_types[postType].length > 0 && (
              <>
                <div>
                  <b>{postTypeToLabel[postType] || 'Templates'}</b>
                </div>
                <ul>
                  {inputState.importedData.post_types[postType].map(
                    (post, postIndex) => (
                      <li key={`post-${postIndex}`}>
                        {inputState.importedData.old_to_new_id &&
                        inputState.importedData.old_to_new_id[post.id] ? (
                          // Link to newly created template
                          <a
                            href={`post.php?post=${
                              inputState.importedData.old_to_new_id[post.id]
                            }&action=edit`}
                          >
                            {post.title}
                          </a>
                        ) : (
                          // Fallback in case we couldn't find new ID in map
                          post.title
                        )}
                      </li>
                    )
                  )}
                </ul>
              </>
            )
        )
      }

      {
        // Duplicates

        inputState.duplicatesFound.length > 0 && (
          <>
            <p style={{ fontWeight: 'bold', color: 'red' }}>
              {inputState.duplicatesFound.length} duplicate template
              {inputState.duplicatesFound !== 1 ? 's' : ''} found
            </p>
            {
              // Organize list of duplicate posts by post type
              Object.keys(postTypeToLabel).map((postType) => {
                const posts = inputState.duplicatesFound.filter(
                  (post) => post.post_type === postType
                )
                if (!posts.length) return
                return (
                  <>
                    <div>
                      <b>{postTypeToLabel[postType] || 'Templates'}</b>
                    </div>
                    <ul>
                      {posts.map((post, postIndex) => (
                        <li key={`duplicate-post-${postIndex}`}>
                          {post.title}
                        </li>
                      ))}
                    </ul>
                  </>
                )
              })
            }
            {/* <ul>
          {inputState.duplicatesFound.map((post, postIndex) =>
            <li key={`duplicate-post-${postIndex}`}>{ post.title }
            </li>
          )}
        </ul> */}
            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                handleDuplicates({
                  mode: 'overwrite',
                  inputStateRef,
                  setInputState,
                })
              }}
            >
              Overwrite
            </button>
            &nbsp;
            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                handleDuplicates({
                  mode: 'keep_both',
                  inputStateRef,
                  setInputState,
                })
              }}
            >
              Keep both
            </button>
            &nbsp;
            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                // Clear state

                setInputState({
                  ...inputStateRef.current,
                  importing: false,
                  importData: {},
                  importedData: {},
                  duplicatesFound: [],
                  duplicatesHandledMessage: '',
                  message: '',
                })
              }}
            >
              Skip
            </button>
            {inputState.duplicatesHandledMessage && (
              <p>{inputState.duplicatesHandledMessage}</p>
            )}
          </>
        )
      }
    </div>
  )
}

export default Importer
