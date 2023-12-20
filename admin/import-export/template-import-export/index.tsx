/**
 * Template import/export
 *
 * @see /template/import-export/ajax.php, view.php
 */
import React from 'react'
import { createRoot } from 'react-dom'
import Importer from './Importer'
import Exporter from './Exporter'

const {
  Tangible: {
    /**
     * Check for installed plugins
     * @see /template/import-export/enqueue.php
     */
    templateSystemHasPlugin: hasPlugin = {}
  },
} = window

const el = document.getElementById('tangible_template_import_export_form')

el.addEventListener('submit', function (e) {
  e.preventDefault()
})

const hasExport =
  hasPlugin['loops'] // Loop & Logic
  || hasPlugin['blocks_editor'] // Tangible Blocks Editor
  || hasPlugin['template_system'] // Template System module as standalone plugin

createRoot(el).render(
  <>
    <h1 className="wp-heading-inline">Import</h1>

    <Importer />

    { hasExport && <>
      <hr />
      <h1 className="wp-heading-inline">Export</h1>
      <Exporter />
    </> 
    }
  </>
)
