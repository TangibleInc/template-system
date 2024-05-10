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

  const $fields: {
    [name: string]: HTMLElement[]
  } = {}
  let $loading
  const $buttonsContainers = []

  $subscribers.each(function () {
    const $subscriber = $(this)
    const actionName = $subscriber.data('tangiblePaginatorSubscribeAction')

    switch (actionName) {
      case 'fields':
        $subscriber.find('[data-tangible-paginator-field]').each(function () {
          const $field = $(this)
          const fieldName = $field.data('tangiblePaginatorField')

          if (!$fields[fieldName]) {
            $fields[fieldName] = []
          }
          $fields[fieldName].push($field)
        })

        // console.log('Fields subscribed', Object.keys($fields))

        break
      case 'loading':
        $loading = $subscriber
        break
      case 'buttons':

        $buttonsContainers.push($subscriber)

        /**
         * Pass additional settings, such as scroll_top
         * @see /tags/loop/paginate/buttons.php
         */

        const subscribeSettings = $subscriber.data(
          'tangiblePaginatorSubscribeSettings'
        )

        const buttonsSettings = {}

        if (
          typeof subscribeSettings === 'object' &&
          !Array.isArray(subscribeSettings)
        ) {
          Object.assign(buttonsSettings, additionalSettings, subscribeSettings)
        }

        $subscriber.renderButtons = () => {
          renderPaginationButtons($subscriber, state, setState, buttonsSettings)
        }

        $subscriber.renderButtons()
        break
      default:
        console.warn('Unknown subscriber action', actionName)
        break
    }
  })

  function updateFields(state) {
    Object.keys($fields).forEach(function (fieldName) {
      for (const $field of $fields[fieldName]) {
        $field.text(state[fieldName])
      }
    })
  }

  // Update on page load to support fields rendered before loop
  updateFields(state)

  const cachedPages = {} // pageNumber: content

  // Keep track of last rendered page
  state.last_rendered_page = state.current_page

  // Page rendered on server-side
  cachedPages[state.current_page] = $target.html()

  function render(state) {
    updateFields(state)

    $buttonsContainers.forEach($el =>
      $el.renderButtons()
      // renderPaginationButtons($el, state, setState, additionalSettings)
    )

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

function renderPaginationButtons($buttonsContainer, state, setState, settings = {}) {

  const {
    current_page: currentPage,
    total_pages: totalPages
  } = state

  const pageNumbers = generatePageRange(currentPage, totalPages)

  // Add new buttons, or replace existing ones

  const existingButtons = [...$buttonsContainer.children()]

  let buttonIndex = 0

  function addButtonType(buttonType, isEnabled = true, isActive = false) {

    const $button = existingButtons[buttonIndex]
      ? $(existingButtons[buttonIndex])
      : $('<button />')

    $button.addClass('tangible-paginator-button')
    $button.attr('data-tangible-paginator-action', buttonType)
    $button.removeAttr('data-tangible-paginator-page')
    $button.removeClass('active')

    $button.prop('disabled', !isEnabled)

    if (!existingButtons[buttonIndex]) {
      $buttonsContainer.append($button)
    }
    buttonIndex++

    return $button
  }

  if (totalPages > 2) {
    if (settings.first) {
      addButtonType('first_page', currentPage > 1).text(
        settings.first===true ? '<<' : settings.first
      )
    }
    if (settings.prev) {
      addButtonType('prev_page', currentPage > 1).text(
        settings.prev===true ? '<' : settings.prev
      )
    }
  }

  pageNumbers.forEach(function (num, index) {

    const $button = existingButtons[buttonIndex]
      ? $(existingButtons[buttonIndex])
      : $('<button />')

    $button.addClass('tangible-paginator-button')

    if (num === '...') {
      $button.text('…')
      $button.prop('disabled', true)
      $button.removeAttr('data-tangible-paginator-action')
      $button.removeAttr('data-tangible-paginator-page')
      $button.removeClass('active')
    } else {
      $button.text(num)
      $button.prop('disabled', false)
      $button.attr('data-tangible-paginator-action', 'page')
      $button.attr('data-tangible-paginator-page', num)

      $button[
        num == currentPage ? 'addClass' : 'removeClass'
      ]('active')
    }

    if (!existingButtons[buttonIndex]) {
      $buttonsContainer.append($button)
    }

    buttonIndex++
  })

  if (totalPages > 2) {
    if (settings.next) {
      addButtonType('next_page', currentPage < totalPages).text(
        settings.next===true ? '>' : settings.next
      )
    }
    if (settings.last) {
      addButtonType('last_page', currentPage < totalPages).text(
        settings.last===true ? '>>' : settings.last
      )
    }
  }

  const initKey = 'paginatorActionsActivated'
  if ($buttonsContainer[0][initKey]) return $buttonsContainer
  $buttonsContainer[0][initKey] = true

  // First-time render: Bind event handler

  $buttonsContainer.on(
    'click',
    '[data-tangible-paginator-action]',
    function () {
      const $button = $(this)
      const actionName = $button.attr('data-tangible-paginator-action')
      switch (actionName) {
        case 'page': {
          // Note: Use $.attr() instead of $.data() which can return stale value
          const page = parseInt($button.attr('data-tangible-paginator-page'), 10)
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
        case 'prev_page':
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
