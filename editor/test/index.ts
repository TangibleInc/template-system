const { createTemplateEditor: createEditor } = window.Tangible

;(async () => {

  const htmlEditor = await createEditor({
    el: document.getElementById(`html-editor`),
    lang: 'html',
    content: `<Loop type=post>
  <Field title />
</Loop>`
  })

  htmlEditor.view.focus()

  await createEditor({
    el: document.getElementById(`sass-editor`),
    lang: 'sass',
    content: `$bg-color: #123;
.test {
  background-color: $bg-color;
}`
  })

  await createEditor({
    el: document.getElementById(`javascript-editor`),
    lang: 'javascript',
    content: `console.log('hi')`
  })

})().catch(console.error)
