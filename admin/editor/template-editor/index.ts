/**
 * Editor for template post type
 */

import { handleTabs } from './tabs'
import { createEditors } from './editors'
import { memory, setMemory } from './memory'
import { createPreviewPane } from './preview'

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
   * @see /admin/editor/fields.php
   * @see /admin/template-post/fields - NOTE: Add new fields here to make sure it gets saved
   */
  const additionalFieldNames = [
    'name',
    'assets',
    'location',
    'theme_position',
    'theme_header',
    'theme_footer',
    'universal_id',
    'atomic_css'
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

  /**
   * Preview pane
   */

  const $preview = $postForm.find('.tangible-template-preview-pane')
  const $previewButton = $postForm.find(
    '.tangible-template-tab-selector[data-tab-name=preview]'
  )

  const { scheduleRenderPreview, setEditorActiveForPreview } =
    createPreviewPane({
      $preview,
      $previewButton,
      ajax,
      postId,
      getEditorFields,
      getAdditionalFields,
      setMemory,
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
     * Atomic CSS engine
     */
    const cssEngine = window.Tangible.createAtomicCssEngine
      ? window.Tangible.createAtomicCssEngine()
      : null
    const $atomicCss = $postForm.find(`[name="atomic_css"]`)
    const contentEditor = editorInstances.post_content

    if (cssEngine && contentEditor && $atomicCss.length) {
      contentEditor.generateCss = async function() {
        const generated = await cssEngine.parse(contentEditor.getValue())
        $atomicCss.val(JSON.stringify(generated))
      }

      contentEditor.generateCss()
        .then(() => {
          if (memory.previewOpen) {
            $previewButton.click()
          }    
        })
  
    } else {
      if (memory.previewOpen) {
        $previewButton.click()
      }  
    }

    /**
     * Schedule preview on editor change
     */
    for (const [key, editor] of Object.entries(editorInstances)) {
      if (editor.generateCss) {
        editor?.on('change', () => {
          editor.generateCss().then(scheduleRenderPreview)
        })
      } else {
        editor?.on('change', scheduleRenderPreview)
      }
    }

    handleTabs({
      $,
      postId,
      $postForm,
      editorInstances,
      setEditorActiveForPreview,
    })
  })
})
