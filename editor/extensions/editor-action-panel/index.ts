import { memory, setMemory } from './memory'

function camelCaseToTitle(s: string) {
  const result = s.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const defaultFontFamily = `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

/**
 * Editor action panel
 */
export function editorActionsPanel(view /*: EditorView*/, editor) /*: Panel*/ {

  const el = document.createElement('div')
  const {
    themes = {},
    fonts = [],
    loadFont
  } = editor
  const themesByName = Object.keys(themes)
    .sort()
    .filter((key) => key !== 'dark')
    .map((key) => ({
      label: camelCaseToTitle(key),
      value: key,
    }))

  // From local storage
  let {
    theme,
    fontFamily,
    fontSize, // /editor/core/theme/base.ts
  } = memory

  el.classList.add('tangible-template-system--editor-actions-panel')

  el.innerHTML = `<div class="col-left"></div><div class="col-right">
  <div class="settings-group" style="display: none">

    <div class="setting-label">Font</div>

    <select data-action="font-list">
      <option value="default">Default</option>
      ${fonts.map(
        ([label, value]) =>
          `<option value="${value}"${
            value === fontFamily ? ' selected' : ''
          }>${label}</option>`
      )}
    </select>

    <div data-action="font-size">
      <span data-action="font-size-minus">-</span>
      <span data-action="font-size-display">${fontSize}</span>
      <span data-action="font-size-plus">+</span>
    </div>

    <div class="setting-label">Theme</div>

    <select data-action="theme-list">
      <option value="dark">Default</option>
      ${themesByName.map(
        ({ label, value }) =>
          `<option value="${value}"${
            value === theme ? ' selected' : ''
          }>${label}</option>`
      )}
    </select>

  </div>
  <div class="setting-label-button" data-action="settings">Settings</div>
  <div class="setting-label-button" data-action="format">Format</div>
</div>`

  // Format
  el.querySelector('[data-action=format]')?.addEventListener(
    'click',
    function () {
      editor.format && editor.format()
    }
  )

  const $settingsGroup = el.querySelector('.settings-group')

  function setSettingsVisibility(show, broadcast = false) {
    $settingsGroup.style.display = show ? 'flex' : 'none'
    if (broadcast) {
      editor.eventHub.emit('settingsVisibility', show, editor)
    }
  }

  el.querySelector('[data-action=settings]')?.addEventListener(
    'click',
    function () {
      setSettingsVisibility($settingsGroup.style.display === 'none', true)
    }
  )

  editor.eventHub.on('settingsVisibility', function (show, source) {
    if (source === editor) return // Ignore self
    setSettingsVisibility(show)
  })

  // Fade in while theme and font loads

  view.dom.style.opacity = '0'
  view.dom.style.transition = 'opacity .3s'
  setTimeout(() => {
    view.dom.style.opacity = '1'
  }, 0)

  // Theme
  const $themeList = el.querySelector('[data-action=theme-list]')

  function selectTheme(theme, broadcast = false) {
    if (themes[theme]) {
      editor.setTheme(themes[theme])

      if (broadcast) {
        setMemory({ theme })
        editor.eventHub.emit('theme', theme, editor)
      }
    }
  }

  $themeList?.addEventListener('change', function (e) {
    const theme = e.target.value
    selectTheme(theme, true)
  })

  editor.eventHub.on('theme', function (theme, source) {
    if (source === editor) return // Ignore self
    $themeList.value = theme
    selectTheme(theme)
  })

  if (theme !== 'dark') {
    setTimeout(() => {
      selectTheme(theme)
    }, 0)
    // extensions[0] = theme
    // view.dispatch({
    //   effects: StateEffect.reconfigure.of(extensions),
    // })
  }

  /**
   * Font family
   */
  const $fontList = el.querySelector('[data-action=font-list]')
  const $fontSize = el.querySelector('[data-action=font-size]')

  // Editor assets URL from /admin/editor/enqueue.php
  const { editorUrl } = window.Tangible
  
  const fontsUrl = editorUrl && `${editorUrl}/fonts`

  async function selectFontFamily(fontFamily, broadcast = false) {
    const $content = view.dom.querySelector('.cm-content')
    if (!$content) return
    const isDefaultFont = fontFamily === 'default'
    try {
      if (!isDefaultFont && fontsUrl) {
        await loadFont(fontFamily, fontsUrl)
      }
    } catch (e) {
      return
    }

    $content.style.fontFamily = isDefaultFont
      ? defaultFontFamily
      : `'${fontFamily}', ${defaultFontFamily}`

    if (broadcast) {
      setMemory({ fontFamily })
      editor.eventHub.emit('fontFamily', fontFamily, editor)
    }
  }

  if (fontFamily !== 'default') {
    setTimeout(() => selectFontFamily(fontFamily), 0)
  }

  $fontList?.addEventListener('change', function (e) {
    const fontFamily = e.target?.value
    selectFontFamily(fontFamily, true)
  })

  editor.eventHub.on('fontFamily', function (fontFamily, source) {
    if (source === editor) return // Ignore self
    if ($fontList) $fontList.value = fontFamily
    selectFontFamily(fontFamily)
  })

  /**
   * Font size
   */

  const $fontSizeDisplay = el.querySelector('[data-action=font-size-display]')

  function selectFontSize(fontSize, broadcast = false) {
    const $content = view.dom.querySelector('.cm-content')
    if ($content) {
      $content.style.fontSize = `${fontSize}px`
      if ($fontSizeDisplay) $fontSizeDisplay.innerText = fontSize + ''

      if (broadcast) {
        setMemory({ fontSize })
        editor.eventHub.emit('fontSize', fontSize, editor)
      }
    }
  }

  setTimeout(() => selectFontSize(fontSize), 0)

  el.querySelector('[data-action=font-size-minus]')?.addEventListener(
    'click',
    function () {
      if (fontSize > 10) {
        fontSize--
        selectFontSize(fontSize, true)
      }
    }
  )
  el.querySelector('[data-action=font-size-plus]')?.addEventListener(
    'click',
    function () {
      if (fontSize < 100) {
        fontSize++
        selectFontSize(fontSize, true)
      }
    }
  )

  editor.eventHub.on('fontSize', function (fontSize, source) {
    if (source === editor) return // Ignore self
    selectFontSize(fontSize)
  })

  // const container = document.createElement('div')

  // container.style.position = 'absolute'
  // container.style.top = '-20px'
  // container.style.left = '0'
  // container.style.color = '0'
  // container.innerHTML = 'Open'

  return {
    // top: true,
    dom: el,
  }
}
