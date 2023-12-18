import { generatePageRange } from './range'

const {
  jQuery: $,
  Tangible: { ajax },
} = window

function activatePaginators() {
  $('.tangible-paginator-target').each(function () {
    createPaginator($(this))
  })
}

$(activatePaginators)

// Export for dynamically loaded content
window.Tangible.activatePaginators = activatePaginators
// window.Tangible.activatePaginator = activatePaginator__deprecated

/**
 * Create paginator
 */

function createPaginator($target) {
  const targetId = $target.data('tangiblePaginatorTargetId')
  const targetData = $target.data('tangiblePaginatorTargetData') || {}

  // console.log('Create paginator', targetId, targetData)

  // @see /tags/loop/paginate/loop.php
  const { state, template, hash, context, context_hash } = targetData

  if (!state || !template) return

  const additionalSettings = {}

  // Subscribers are updated on paginator state change
  const $subscribers = $(`.tangible-paginator-subscribe--${targetId}`)

  function setState(newState) {
    Object.assign(state, newState)
    render(state)
  }

  const $fields = {}
  let $loading
  let $buttonsContainer

  $subscribers.each(function () {
    const $subscriber = $(this)
    const actionName = $subscriber.data('tangiblePaginatorSubscribeAction')

    switch (actionName) {
      case 'fields':
        $subscriber.find('[data-tangible-paginator-field]').each(function () {
          const $field = $(this)
          const fieldName = $field.data('tangiblePaginatorField')

          $fields[fieldName] = $field
        })

        // console.log('Fields subscribed', Object.keys($fields))

        break
      case 'loading':
        $loading = $subscriber
        break
      case 'buttons':
        $buttonsContainer = $subscriber
        renderPaginationButtons($buttonsContainer, state, setState)

        /**
         * Pass additional settings, such as scroll_top
         * @see /tags/loop/paginate/buttons.php
         */

        const subscribeSettings = $subscriber.data(
          'tangiblePaginatorSubscribeSettings'
        )
        if (
          typeof subscribeSettings === 'object' &&
          !Array.isArray(subscribeSettings)
        ) {
          Object.assign(additionalSettings, subscribeSettings)
        }
        break
      default:
        console.warn('Unknown subscriber action', actionName)
        break
    }
  })

  function updateFields(state) {
    Object.keys($fields).forEach(function (fieldName) {
      $fields[fieldName].text(state[fieldName])
    })
  }

  const cachedPages = {} // pageNumber: content

  // Keep track of last rendered page
  state.last_rendered_page = state.current_page

  // Page rendered on server-side
  cachedPages[state.current_page] = $target.html()

  function render(state) {
    updateFields(state)

    if ($buttonsContainer) {
      renderPaginationButtons($buttonsContainer, state)
    }

    // Fetch page via AJAX

    // Same page?
    if (state.last_rendered_page === state.current_page) return
    state.last_rendered_page = state.current_page

    const afterLoaded = function () {
      // Scroll to top
      if (additionalSettings.scroll_top) {
        const targetTop = $target.offset().top

        if (!additionalSettings.scroll_animate) {
          // Jump with no animation
          $([document.documentElement, document.body]).scrollTop(targetTop)
          return
        }

        const duration =
          typeof additionalSettings.scroll_animate === 'number'
            ? additionalSettings.scroll_animate
            : 300

        $([document.documentElement, document.body]).animate(
          {
            scrollTop: targetTop,
          },
          duration
        )
      }
    }

    // Cached
    if (typeof cachedPages[state.current_page] !== 'undefined') {
      $target.html(cachedPages[state.current_page])
      afterLoaded()
      return
    }

    const loadingClass = 'tangible-paginator-target-loading'
    const currentPage = state.current_page

    const startLoading = function () {
      $target.addClass(loadingClass)

      // TODO: Option to fade in/out loading indicator

      if ($loading) $loading.show()
    }

    const finishLoading = function () {
      $target.removeClass(loadingClass)

      if ($loading) $loading.hide()

      afterLoaded()
    }

    startLoading()

    // Prevent repeated requests to same page
    cachedPages[currentPage] = ''

    // @see /ajax/index.php
    ajax('tangible_template_render', {
      template,
      page: currentPage,
      hash,
      context,
      context_hash,
    })
      .then((result) => {
        // console.log('Fetch page result', result)

        cachedPages[currentPage] = result
        $target.html(result)
        finishLoading()
      })
      .catch((error) => {
        console.error('Fetch page error', error)

        delete cachedPages[currentPage]

        finishLoading()
      })
  }
}

function renderPaginationButtons($buttonsContainer, state, setState) {
  const { current_page: currentPage, total_pages: totalPages } = state

  const pageNumbers = generatePageRange(currentPage, totalPages)

  // Add new buttons, or replace existing ones

  const $existingButtons = $buttonsContainer.children()

  pageNumbers.forEach(function (num, index) {
    const $button = $('<button />')

    $button.text(num)
    $button.addClass('tangible-paginator-button')

    if (num === '...') {
      $button.prop('disabled', true)
    } else {
      $button.attr('data-tangible-paginator-action', 'page')
      $button.attr('data-tangible-paginator-page', num)

      if (num == currentPage) {
        $button.addClass('active')
      }
    }

    if ($existingButtons.eq(index).length) {
      $existingButtons.eq(index).replaceWith($button)
      return
    }

    $buttonsContainer.append($button)
  })

  if (!setState) return

  // First-time render: Bind event handler

  $buttonsContainer.on(
    'click',
    '[data-tangible-paginator-action]',
    function () {
      const $button = $(this)
      const actionName = $button.data('tangiblePaginatorAction')

      switch (actionName) {
        case 'page': {
          const page = parseInt($button.data('tangiblePaginatorPage'), 10)

          if (isNaN(page) || page <= 0 || page > state.total_pages) return

          state.current_page = page
          break
        }
        case 'first_page':
          state.current_page = 1
          break
        case 'last_page':
          state.current_page = state.total_pages
          break
        case 'next_page':
          if (state.current_page === state.total_pages) return
          state.current_page++
          break
        case 'previous_page':
          if (state.current_page === 1) return
          state.current_page--
          break
        default:
          return
      }

      setState(state)
    }
  )

  return $buttonsContainer
}
