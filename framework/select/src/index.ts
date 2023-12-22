/**
 * Select2 - https://select2.org/
 */

import createSelect2 from './select2.full.js'

const $ = window.jQuery

// In case another instance is loaded
const previous = $.fn.select2

// Factory function
createSelect2(window, $)

const select2 = $.fn.select2

// Restore or set current
$.fn.select2 = previous || select2

// Export

$.fn.tangibleSelect = function (options = {}) {
  this.each(function () {
    const $el = $(this)
    const instanceOptions = $el.data('tangibleSelect') || {}
    select2.call($el, {
      ...options,
      ...instanceOptions,
    })
  })
}

window.Tangible = window.Tangible || {}
window.Tangible.Select = class {
  constructor($element, options = {}) {
    $element.tangibleSelect(options)
  }
}
