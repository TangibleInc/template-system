import createCodeMirror from '../index'

createCodeMirror(
  document.getElementById('html-editor'),
  {
    language: 'html',
    resizable: 'vertical',
    emmet: {
      config: {
        html: {
          test: 'test[type]'
        }
      }
    }
  }
)

createCodeMirror(
  document.getElementById('css-editor'),
  {
    language: 'css',
    resizable: 'both'
  }
)

createCodeMirror(
  document.getElementById('sass-editor'),
  {
    language: 'sass',
    resizable: 'both'
  }
)

createCodeMirror(
  document.getElementById('javascript-editor'),
  {
    language: 'javascript'
  }
)

createCodeMirror(
  document.getElementById('json-editor'),
  {
    language: 'json'
  }
)
