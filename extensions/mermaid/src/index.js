import mermaid from 'mermaid'

window.Tangible = window.Tangible || {}
window.Tangible.mermaid = mermaid

mermaid.initialize({ startOnLoad: false })

let moduleIndex = 0

mermaid.activateElement = function(el) {

  if (el._mermaidRendered) return
  el._mermaidRendered = true

  const codeEl = el.querySelector('code')
  const code = codeEl.innerText
  if (!code) return

  try {
    Tangible.mermaid.render(
      'tangible-mermaid-'+moduleIndex,
      code,
      function(svg) {
        el.innerHTML = svg
        el.style.display = 'block'
      }
    )
  } catch(e) {
    console.error('Tangible.mermaid', e.message)
    // el.innerText = e.message
    // el.style.display = 'block'
  }

  moduleIndex++
}

mermaid.activateElements = function() {
  ;[...document.body.querySelectorAll('.tangible-mermaid')].forEach(mermaid.activateElement)
}

document.addEventListener('DOMContentLoaded', mermaid.activateElements)
