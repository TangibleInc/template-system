import { memory, setMemory } from './memory'

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
    iframe.srcdoc = `<!DOCTYPE html>${content}`
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
  }, 2000) // TODO: Adjustable refresh interval

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
      iframe.style.flex = '1';
      iframe.style.border = 'none'
      iframe.style.borderRadius = '.5rem'
      iframe.style.padding = '.5rem'
      iframe.style.backgroundColor = '#fff'

      el.style.resize = 'vertical'
      el.style.overflowY = 'auto'
      el.style.display = 'flex'
      el.style.minHeight = '100px'

      if (memory.previewHeight) {
        el.style.height = `${memory.previewHeight}px`
      }

      el.appendChild(iframe)

      if (ResizeObserver) {
        let timer
        const resizeObserver = new ResizeObserver((entries) => {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            const previewHeight = el.offsetHeight
            if (previewHeight) {
              setMemory({ previewHeight })
            }
          }, 1000)  
        })
        resizeObserver.observe(el)
      }
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
