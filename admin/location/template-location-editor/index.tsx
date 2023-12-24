/**
 * Template edit screen: Location tab
 *
 * Depends on Tangible AJAX and Select modules
 */
import { createRoot } from 'react-dom'
import LocationEditor from './LocationEditor'

const {
  jQuery: $,
  Tangible,
} = window

const $el = $('#post .template-location-editor')
const el = $el[0]

let data = $el.data('location')

// Server can pass empty array to mean an object
data = typeof data === 'object' && !Array.isArray(data) ? data : {}

const ruleDefinitions = $el.data('ruleDefinitions') || []

createRoot(el).render(
  <LocationEditor
    {...{
      data,
      ruleDefinitions,
    }}
  />
)
