
// Event hub for editors to communicate to each other
export const eventHub: {
  listeners: {
    [key: string]: Function[]
  }
  on: (event: string, callback: Function) => void
  emit: (event: string, ...args: any[]) => void
  clear: () => void
} = {
  listeners: {},
  on(event, callback) {
    if (!eventHub.listeners[event]) {
      eventHub.listeners[event] = []
    }
    eventHub.listeners[event].push(callback)
  },
  emit(event, ...args) {
    if (eventHub.listeners[event]) {
      for (const callback of eventHub.listeners[event]) {
        callback(...args)
      }
    }
  },
  clear() {
    eventHub.listeners = {}
  },
}
