// import * as sass from 'sass' // 2 MB

const { TemplateEditor } = window.Tangible

// console.log('sass', sass)

;(async () => {

  const htmlEditor = await TemplateEditor.create({
    el: document.getElementById(`html-editor`),
    lang: 'html',
    content: `<Loop type=post>
  <Field title />
</Loop>`
  })

  htmlEditor.view.focus()

  await TemplateEditor.create({
    el: document.getElementById(`sass-editor`),
    lang: 'sass',
    content: `$bg-color: #123;
.test {
  background-color: $bg-color;
}`
  })

  await TemplateEditor.create({
    el: document.getElementById(`javascript-editor`),
    lang: 'javascript',
    content: `console.log('hi')`
  })

})().catch(console.error)
