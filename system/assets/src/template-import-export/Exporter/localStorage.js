/**
 * Remember export settings in local storage
 */
export function saveStateToLocalStorage(state) {
  if (!window.localStorage) return
  window.localStorage.setItem('exporterState', JSON.stringify(state))
}

export function getSavedStateFromLocalStorage() {
  if (!window.localStorage) return
  let state = window.localStorage.getItem('exporterState')
  if (!state) return
  try {
    state = JSON.parse(state)
    return state
  } catch (e) {
    /* Ignore */
  }
}
