/**
 * Embed - Responsive iframe
 *
 * Prefer CSS-only solution which is more performant. JS is needed when
 * aspect ratio is dynamic or unknown.
 */

jQuery(document).on('ready', function () {
  const $ = jQuery

  function resizeEmbed($el) {
    const iframe = $el.find('iframe')[0]

    if (!iframe) return

    const widthAttr = iframe.getAttribute('width')
    const heightAttr = iframe.getAttribute('height')

    const width = !isNaN(widthAttr) ? widthAttr : iframe.clientWidth
    const height = !isNaN(heightAttr) ? heightAttr : iframe.clientHeight

    // const ratio = height / width

    // console.log('iframe aspect ratio', iframe, ratio)

    $el.css({
      // paddingTop: ratio * 100 + '%',
      aspectRatio: `${width} / ${height}`,
    })
  }

  function resizeEmbeds() {
    $('.tangible-embed-dynamic').each(function () {
      resizeEmbed($(this))
    })
  }

  resizeEmbeds()

  // $(window).resize(resizeEmbeds)
})
