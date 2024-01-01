export function createPreviewPane({
  $preview,
  $previewButton,

  ajax,
  postId,
  getEditorFields,
  getAdditionalFields,
  setMemory
}) {
  function setIframeContent(iframe, content) {
    // iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(content)
    iframe.contentWindow.document
    iframe.contentWindow.document.open()
    iframe.contentWindow.document.write(`<!DOCTYPE html>${content}`)
    iframe.contentWindow.document.close()
  }

  let isPreviewVisible = false
  let isRenderPreviewScheduled = false

  function scheduleRenderPreview() {
    isRenderPreviewScheduled = true
  }

  setInterval(function () {
    if (!isRenderPreviewScheduled) return
    isRenderPreviewScheduled = false
    if (isPreviewVisible) {
      renderPreview()
    }
  }, 3000)

  async function renderPreview() {
    const el = $preview[0]

    const data = {
      id: postId,
      content: '',
      ...getEditorFields(),
      ...getAdditionalFields(),
    }

    let iframe: HTMLIFrameElement = el.getElementsByTagName('iframe')[0]

    if (!iframe) {
      iframe = document.createElement('iframe')
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.style.minHeight = '240px'
      iframe.style.border = 'none'
      iframe.style.borderRadius = '.5rem'
      iframe.style.backgroundColor = '#fff'

      el.style.resize = 'vertical'
      el.style.overflowY = 'auto'
      el.appendChild(iframe)
    }

    ajax('tangible_template_editor_render', data)
      .then(function (res) {
        setIframeContent(iframe, res.result)
      })
      .catch(function (e) {
        setIframeContent(iframe, `<p>${e.message}</p>`)
      })
  }

  let isEditorActiveForPreview = true

  $previewButton.on('click', function () {
    const isOpen = !$previewButton.hasClass('active')

    if (isEditorActiveForPreview) {
      $preview.toggle()
    }

    if (isOpen) {
      $previewButton.addClass('active')
      isPreviewVisible = true

      if (isEditorActiveForPreview) {
        renderPreview()
      }
    } else {
      $previewButton.removeClass('active')
      isPreviewVisible = false
    }

    setMemory({
      previewOpen: isOpen,
    })
  })

  function setEditorActiveForPreview(open = true) {
    isEditorActiveForPreview = open
    if (open) {
      if (isPreviewVisible && !$preview.is(':visible')) {
        $preview.show()
      }
    } else {
      if (isPreviewVisible && $preview.is(':visible')) {
        $preview.hide()
      }
    }
  }

  return {
    scheduleRenderPreview,
    setEditorActiveForPreview,
  }
}
