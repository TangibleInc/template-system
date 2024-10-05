/// <reference lib="webworker" />
/**
 * Sass compiler in Web Worker
 * Using fast sync version of compileString
 * @see https://sass-lang.com/documentation/js-api/functions/compilestring/
 */
import { compileString } from 'sass'

self.onmessage = function (e) {
  const [id, data] = e.data
  try {
    const result = compileString(data.code)
    self.postMessage([
      id, // Message ID
      null, // Error
      result, // Result
    ])
  } catch (error) {
    /**
     * Sass compiler exception
     * @see https://sass-lang.com/documentation/js-api/classes/exception/
     */
    self.postMessage([id, {
      message: error.sassMessage,

      location: {
        start: {
          line: error.span.start.line,
          column: error.span.start.column,
          offset: error.span.start.offset,
        },
        end: {
          line: error.span.end.line,
          column: error.span.end.column,
          offset: error.span.end.offset,
        },
      },

      // Full message showing which part of the line - Remove location which includes file path 
      // fullMessage: error.message.split('\n').slice(0, -1).join('\n'),
      // text: error.span.text,
      // context: error.span.context,
    }, null])
  }
}
