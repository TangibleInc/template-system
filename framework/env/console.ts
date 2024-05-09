
const silentConsole = {
  log() {},
  warn() {},
  error() {},
}
const originalConsole = globalThis.console

export const disableConsole = () => {
  // Silence console messages from NodePHP
  globalThis.console = silentConsole
}

export const enableConsole = () => {
  globalThis.console = originalConsole
}
