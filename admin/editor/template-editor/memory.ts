
/**
 * Remember state in local storage
 */

const memoryKey = 'tangibleTemplateEditorState'

export const memory = Object.assign(
  {
    tab: undefined, // Default tab
    postId: 0, // ?
    theme: 'default',
    fontFamily: 'default',
    fontSize: 14,
    previewOpen: false,
    previewHeight: 220
  },
  getMemory() || {}
)

export function setMemory(state) {
  if (!window.localStorage) return
  Object.assign(memory, state)
  window.localStorage.setItem(memoryKey, JSON.stringify(memory))
}

export function getMemory() {
  if (!window.localStorage) return
  let state = window.localStorage.getItem(memoryKey)
  if (!state) return
  try {
    state = JSON.parse(state)
    return state
  } catch (e) {
    /* Ignore */
  }
}
