/**
 * Template edit screen: Location tab
 *
 * Depends on Tangible AJAX and Select modules
 */

import LocationEditor from './LocationEditor'

const {
  jQuery: $,
  Tangible: {
    Preact
  }
} = window

const $el = $('#post .template-location-editor')
const el = $el[0]

let data = $el.data('location')

// Server can pass empty array to mean an object
data = typeof data === 'object' && !Array.isArray(data) ? data : {}

const ruleDefinitions = $el.data('ruleDefinitions') || []

Preact.render(<LocationEditor {...{
  data,
  ruleDefinitions
}} />, el)
