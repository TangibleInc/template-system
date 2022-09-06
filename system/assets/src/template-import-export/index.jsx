/**
 * Template import/export
 *
 * @see /template/import-export/ajax.php, view.php
 */

import Importer from './Importer'
import Exporter from './Exporter'

const {
  Tangible: {
    Preact,
    /**
     * Check for installed plugins
     * @see /template/import-export/enqueue.php
     */
    templateSystemHasPlugin = {}
  },
} = window

const el = document.getElementById('tangible_template_import_export_form')

el.addEventListener('submit', function (e) {
  e.preventDefault()
})

const hasExport = templateSystemHasPlugin['loops']
  || templateSystemHasPlugin['blocks_editor']

Preact.render(
  <>
    <h1 className="wp-heading-inline">Import</h1>

    <Importer />

    { hasExport && <>
      <hr />
      <h1 className="wp-heading-inline">Export</h1>
      <Exporter />
    </> 
    }
  </>,
  el
)
