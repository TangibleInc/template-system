/**
 * Editor for template post type
 */

import { handleTabs } from './tabs'
import { createEditors } from './editors'

declare global {
  interface Window {
    jQuery: any
    wp: any
    Tangible: any
  }
}

window.jQuery(function ($) {
  const $postForm = $('#post')
  const $editors = $postForm.find('[data-tangible-template-editor-type]')

  if (!$editors.length) {
    console.warn('No editor elements found for Tangible Template code editor')
    return
  }

  /**
   * Silence "Are you sure?" alert when leaving screen
   * @see https://core.trac.wordpress.org/browser/branches/5.6/src/js/_enqueues/wp/autosave.js?rev=50366
   */
  const { wp } = window
  if (
    wp &&
    wp.autosave &&
    wp.autosave.server &&
    wp.autosave.server.postChanged
  ) {
    // console.log('Proxy wp.autosave.server.postChanged')
    wp.autosave.server.postChanged = function () {
      // console.log('postChanged', false)
      return false
    }
  }

  const { Tangible } = window
  const {
    ajax,
    // Provide new editor compatibility layer
    createCodeEditor,
  } = Tangible

  Tangible.codeEditors = []

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

  /**
   * Additional fields that are not editors
   * @see /system/editor/fields.php
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

  // Get taxonomy fields

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
  const updatePublishButton = function (newText, errorMessage = '') {
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

  /**
   * Save via AJAX, except for new post which requires page reload
   */
  function save() {
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
    //
    // window.onbeforeunload = function() {}
  }

  const $preview = $postForm.find('.tangible-template-preview-pane')

  function setIframeContent(iframe, content) {
    // iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(content)
    iframe.contentWindow.document
    iframe.contentWindow.document.open()
    iframe.contentWindow.document.write(content)
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

  const $previewButton = $postForm.find(
    '.tangible-template-tab-selector[data-tab-name=preview]'
  )

  $previewButton.on('click', function () {
    $preview.toggle()
    if ($preview.is(':visible')) {
      $previewButton.addClass('active')
      isPreviewVisible = true
      renderPreview()
    } else {
      $previewButton.removeClass('active')
      isPreviewVisible = false
    }
  })

  createEditors({
    $,
    save,
    $editors,
    editorInstances,
    createCodeEditor,
    templateMeta,
    Tangible,
  }).finally(function () {

    /**
     * Schedule preview on editor change
     */
    for (const [key, editor] of Object.entries(editorInstances)) {
      editor && editor.on('change', scheduleRenderPreview)
    }

    handleTabs({
      $,
      postId,
      $postForm,
      editorInstances,
    })
  })
})
