/**
 * Template import/export
 *
 * @see /template/import-export/ajax.php, view.php
 */

import Importer from './Importer'
import Exporter from './Exporter'

const {
  Tangible: { Preact },
} = window

const el = document.getElementById('tangible_template_import_export_form')

el.addEventListener('submit', function (e) {
  e.preventDefault()
})

Preact.render(
  <>
    <h1 className="wp-heading-inline">Import</h1>

    <Importer />

    <hr />

    <h1 className="wp-heading-inline">Export</h1>

    <Exporter />
  </>,
  el
)
