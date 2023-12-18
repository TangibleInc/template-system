/**
 * Based on: https://github.com/ravid7000/table-sortable
 */

import TableSortable from './TableSortable'

function create(options) {
  if (!options.element.length) {
    console.warn('Tangible table requires element in options', options)
    return
  }

  return new TableSortable(options)
}

// Export

window.Tangible = window.Tangible || {}
window.Tangible.Table = TableSortable
window.Tangible.Table.create = create // Backward compatibility
