import { ajax, ajaxActionPrefix } from '../common'

export default function handleDuplicates({
  mode, // overwrite or keep_both
  inputStateRef,
  setInputState,
}) {
  const { importData } = inputStateRef.current

  if (!importData || !importData.post_types) {
    console.warn('Import data not found', importData)
    return
  }

  const duplicates = {
    ...importData, // NOTE: Other import data properties such as "shared_assets"
    post_types: {},
    handle_duplicates: mode,
  }

  // Filter only duplicate posts
  for (const { id, title, post_type } of inputStateRef.current
    .duplicatesFound) {
    const postData = importData.post_types[post_type].filter(
      (post) => post.id === id
    )[0]
    if (!postData) {
      console.warn('Corresponding post not found', id, post_type, title)
      continue
    }

    if (!duplicates.post_types[post_type]) {
      duplicates.post_types[post_type] = []
    }

    duplicates.post_types[post_type].push(postData)
  }

  // console.log('Import duplicates', mode, duplicates)

  setInputState({
    ...inputStateRef.current,
    importData: {},
    importedData: {},
    duplicatesFound: [],
    duplicatesHandledMessage: '',
    message: '',
  })

  ajax(ajaxActionPrefix + 'import', duplicates)
    .then((result) => {
      const importedData = {
        ...duplicates,
        old_to_new_id: {
          ...(inputStateRef.current.old_to_new_id || {}),
          ...(result.old_to_new_id || {}),
        },
      }

      console.log('Imported duplicates', importedData)

      // Clear duplicate posts state and show message after "Import" button

      setInputState({
        ...inputStateRef.current,
        importing: false,
        importData: {},
        importedData,
        duplicatesFound: [],
        duplicatesHandledMessage: '',
        message:
          result.post_count +
          ' template' +
          (result.post_count !== 1 ? 's' : '') +
          ' imported',
      })
    })
    .catch((error) => {
      setInputState({
        ...inputStateRef.current,
        duplicatesHandledMessage: 'Error: ' + error.message,
      })
    })
}
