// Rewritten from https://github.com/nolanlawson/promise-worker

export class PromiseWorker {
  worker: Worker

  callbacks: {
    [id: string]: (error, result) => void
  } = {}

  nextMessageId: number = 0

  constructor(workerPath: string) {
    this.worker = new Worker(workerPath)
    this.worker.addEventListener('message', this.onMessage)
  }

  destroy() {
    this.worker.removeEventListener('message', this.onMessage)
    this.worker = null
    this.callbacks = {}
  }

  private onMessage = (e) => {
    const message = e.data
    if (!Array.isArray(message) || message.length < 2) {
      return
    }
    const messageId = message[0]
    const error = message[1]
    const result = message[2]

    const callback = this.callbacks[messageId]
    if (!callback) {
      return
    }

    delete this.callbacks[messageId]
    callback(error, result)
  }

  postMessage(userMessage: any) {
    const messageId = this.nextMessageId++

    const messageToSend = [messageId, userMessage]

    return new Promise((resolve, reject) => {
      // Timeout if it takes too long
      const timer = setTimeout(() => reject(new Error('Timeout')), 3000)

      this.callbacks[messageId] = function (error, result) {
        clearTimeout(timer)
        if (error) {
          return reject(error)
        }
        resolve(result)
      }

      this.worker.postMessage(messageToSend)
    })
  }
}
