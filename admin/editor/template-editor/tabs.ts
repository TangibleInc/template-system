
import {
  memory,
  getMemory,
  setMemory
} from './memory'

export function handleTabs({
  $,
  postId,
  $postForm,
  editorInstances,
  setEditorActiveForPreview
}) {
  
  /**
   * Tabs
   */

  const $tabSelectors = $postForm.find('.tangible-template-tab-selector')
  const $tabs = $postForm.find('.tangible-template-tab')
  const tabEditorActivated: boolean[] = [] // index => boolean

  if (!$tabs.length) {
    console.warn('No tabs elements found for Tangible Template code editor')
    return
  }

  $tabSelectors.on('click', function () {

    const tabName = $(this).data('tabName')
    if (tabName==='preview') return

    const currentTabSelector = this

    // Show current tab, hide others

    $tabSelectors.each(function (index) {

      const $tabSelector = $(this)
      const tabName = $tabSelector.data('tabName')
      if (tabName==='preview') return

      const $tab = $tabs.eq(index)

      // TODO: Each tab area should set its name
      // $tabs.filter(`[data-tab-name="${tabName}"]`).first()

      if (this !== currentTabSelector) {
        // Hide

        $tabSelector.removeClass('active')
        $tab.hide()

        return
      }

      // Show

      $tabSelector.addClass('active')
      $tab.show()

      // Find editor in tab, if any
      const $tabEditor = $tab.find('[data-tangible-template-editor-type]')
      const editorInstance = $tabEditor.length
        ? editorInstances[
          $tabEditor.attr('name') // By field name
        ]
        : false

      if (!tabEditorActivated[index]) {
        tabEditorActivated[index] = true

        // Refresh editor once
        if (editorInstance) {
          editorInstance.refresh()
        }
      }

      if (editorInstance) {
        editorInstance.focus()
        setEditorActiveForPreview()
      } else {
        /**
         * Hide preview if non-editor tab is open
         */
        setEditorActiveForPreview(false)
      }

      setMemory({
        tab: tabName,
        postId,
      })
    }) // End for each tab selector
  }) // End on click tab selector

  /**
   * Set default tab from URL query parameter
   */

  const query: {
    [key: string]: string
  } = window.location.search
    .substr(1)
    .split('&')
    .reduce(function (obj, pair) {
      const [key, value] = pair.split('=')
      obj[key] = value
      return obj
    }, {})

  const gotoTab = query.tab || (memory.postId === postId && memory.tab)

  if (gotoTab) {
    // Switch to tab

    const $activeTabSelector = $tabSelectors.filter(
      `[data-tab-name="${gotoTab}"]`
    )

    if ($activeTabSelector.length) {
      $activeTabSelector.eq(0).click()
    } else {
      // Ignore if tab not found
      // console.log('Tab not found', gotoTab)
    }
  }  
}
