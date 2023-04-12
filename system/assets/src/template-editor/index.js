/**
 * Editor for template post type
 */

/**
 * Remember state in local storage
 */

const memoryKey = 'tangibleTemplateEditorState'

const memory = Object.assign(
  {
    tab: undefined, // Default tab
  },
  getMemory() || {}
)

function setMemory(state) {
  if (!window.localStorage) return
  window.localStorage.setItem(memoryKey, JSON.stringify(state))
  Object.assign(memory, state)
}

function getMemory() {
  if (!window.localStorage) return
  let state = window.localStorage.getItem(memoryKey)
  if (!state) return
  try {
    state = JSON.parse(state)
    return state
  } catch (e) {
    /* Ignore */
  }
}

jQuery(function ($) {
  const $postForm = $('#post')

  const $editors = $postForm.find('[data-tangible-template-editor-type]')

  if (!$editors.length) {
    console.warn('No editor elements found for Tangible Template code editor')
  }

  const editorInstances = {
    // fieldName: editor instance
  }

  const postId = $('#post_ID').val()
  const $postTitle = $postForm.find('input[name="post_title"]')
  // const $postContent = $postForm.find('[name="post_content"]') // textarea

  const $publishButton = $('#publish')
  const $publishingActions = $publishButton.closest('#major-publishing-actions')

  const templateMeta =
    $postForm.find('#tangible-template-editor-meta').data('json') || {}

  const { ajax, createCodeEditor } = window.Tangible

  /**
   * Additional fields that are not editors
   *
   * @see /includes/template/fields.php
   */
  const additionalFieldNames = [
    'name',
    'assets',
    'location',
    'theme_position',
    'theme_header',
    'theme_footer',
    'universal_id',
  ]

  const $additionalFields = {
    // name?: $element
  }

  for (const fieldName of additionalFieldNames) {
    const $field = $postForm.find(`[name="${fieldName}"]`)
    if ($field.length) {
      $additionalFields[fieldName] = $field
    }
  }

  const taxonomyNames = ['tangible_template_category']
  const $taxonomyFields = {
    // name?: $terms
  }

  for (const taxName of taxonomyNames) {
    const $terms = $postForm.find(
      `[type="checkbox"][name="tax_input[${taxName}][]"]`
    )
    if ($terms.length) {
      $taxonomyFields[taxName] = $terms

      /**
       * Fix browser autocomplete messing with checkboxes..
       * Force "checked" state based on HTML attribute
       */
      $terms.each(function () {
        const checked = this.getAttribute('checked') === 'checked'
        $(this).prop('checked', checked)
      })
    }
  }

  /**
   * Show success/error message in publish button
   */
  const updatePublishButton = function (newText, errorMessage) {
    $publishButton.val(newText)

    if (errorMessage) {
      $publishingActions.append(
        `<div id="post-save-error-message" style="padding-top: 8px">${errorMessage}</div>`
      )
    } else {
      $publishingActions.find('#post-save-error-message').remove()
    }
  }

  const getEditorFields = function () {
    const data = {}

    for (let fieldName in editorInstances) {
      const editor = editorInstances[fieldName]

      if (fieldName === 'post_content') fieldName = 'content'

      const value = editor.getValue()
      data[fieldName] = value
    }

    return data
  }

  const getAdditionalFields = function () {
    const data = {}

    for (const fieldName of additionalFieldNames) {
      if (!$additionalFields[fieldName]) continue
      data[fieldName] = $additionalFields[fieldName].val()
    }

    return data
  }

  const getTaxonomyFields = function () {
    const data = {}

    for (const taxName of taxonomyNames) {
      if (!$taxonomyFields[taxName]) continue
      data[taxName] = []
      $taxonomyFields[taxName].each(function () {
        const $el = $(this)
        if ($el.prop('checked')) {
          data[taxName].push($el.val())
        }
      })
    }

    return data
  }

  const save = function () {
    if (templateMeta.isNewPost) {
      $publishButton.click()
      return
    }

    // New and existing post should have ID
    if (!postId) return

    const title = $postTitle.val()
    if (!title) return

    const data = {
      title,
      id: postId,
      content: '',
      ...getEditorFields(),
      ...getAdditionalFields(),
      tax_input: getTaxonomyFields(),
    }

    const previousLabel = $publishButton.val()

    let labelTimer
    function restorePreviousLabelAfterTimeout() {
      if (labelTimer) clearTimeout(labelTimer)
      labelTimer = setTimeout(function () {
        $publishButton.val(previousLabel)
      }, 7000)
    }

    // $publishButton.val('Saving..')

    ajax('tangible_template_editor_save', data)
      .then(function (res) {
        updatePublishButton('Saved')
        restorePreviousLabelAfterTimeout()
      })
      .catch(function (e) {
        updatePublishButton('Error', e.message)
        restorePreviousLabelAfterTimeout()
      })
  }

  /**
   * New or draft posts must submit the form and reload the edit screen,
   * but after that the publish button can use AJAX save.
   */
  if (!templateMeta.isNewPost && templateMeta.postStatus === 'publish') {
    /**
     * Disable AJAX save until following issues are resolved:
     *
     * - AJAX nonce expiring
     * - Sometimes the post slug not saving?
     * - Sometimes there's a confirmation dialog "information you've entered may not be saved"
     */
    /*
        $publishButton.on('click', function (e) {
          e.preventDefault()
          save()
        })
    */
    // window.onbeforeunload = function() {}
  }

  const sharedEditorOptions = {
    viewportMargin: Infinity, // With .CodeMirror height: auto or 100%
    resizable: false,
    lineWrapping: true,

    extraKeys: {
      'Alt-F': 'findPersistent',
      'Ctrl-S': save,
      'Cmd-S': save,
      Tab: 'emmetExpandAbbreviation',
      Esc: 'emmetResetAbbreviation',
      Enter: 'emmetInsertLineBreak',
      'Ctrl-Space': 'autocomplete',
    },
  }

  $editors.each(function () {
    const $editor = $(this)
    const fieldName = $editor.attr('name')
    const type = $editor.data('tangibleTemplateEditorType') // html, sass, javascript, json

    const editorOptions = {
      ...sharedEditorOptions,
      language: type,
    }

    if (type === 'html') {
      editorOptions.emmet = {
        preview: false,
        config: {
          // TODO: Emmet custom abbreviations - Currently not working
          // @see https://github.com/emmetio/codemirror-plugin#emmet-config
          html: {
            Loop: 'Loop[type]',
            Field: 'Field/',
          },
        },
      }
    }

    const editor = (editorInstances[fieldName] = createCodeEditor(
      this,
      editorOptions
    ))

    editor.setSize(null, '100%')

    // Focus on content if editing existing post
    if (fieldName === 'post_content' && !templateMeta.isNewPost) editor.focus()
  })

  // Tabs

  const $tabSelectors = $postForm.find('.tangible-template-tab-selector')
  const $tabs = $postForm.find('.tangible-template-tab')
  const tabEditorActivated = [] // index => boolean

  if (!$tabs.length) {
    console.warn('No tabs elements found for Tangible Template code editor')
    return
  }

  $tabSelectors.on('click', function () {
    const currentTabSelector = this

    // Show current tab, hide others

    $tabSelectors.each(function (index) {
      const $tabSelector = $(this)
      const $tab = $tabs.eq(index)

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
      }

      setMemory({
        tab: $tabSelector.data('tabName'),
        postId,
      })
    }) // End for each tab selector
  }) // End on click tab selector

  /**
   * Set default tab from URL query parameter
   */

  const query = window.location.search
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
})
