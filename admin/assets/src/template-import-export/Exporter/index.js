/**
 * Template exporter
 */

import { useEffect, useRef, useState } from 'react'
import ExportRule from './ExportRule'
import {
  saveStateToLocalStorage,
  getSavedStateFromLocalStorage,
} from './localStorage'

import { ajax, ajaxActionPrefix } from '../common'

const debug = false // Set this to false for production
const log = (...args) => debug && console.log('[Exporter]', ...args)

const savedState = getSavedStateFromLocalStorage()

const defaultPackageName =
  (savedState && savedState.name) || 'tangible-templates'
const defaultExportRules = (savedState && savedState.rules) || [
  {
    field: 'tangible_template',
    operator: 'all',
    values: [],
  },
]

const Exporter = () => {
  // Export package name
  const exportNameRef = useRef()

  // Rules state

  const [exportRules, _setExportRules] = useState(defaultExportRules)

  const exportRulesRef = useRef()
  exportRulesRef.current = exportRules // Keep ever-fresh reference for event callbacks to use

  const setExportRules = (rules) => {
    _setExportRules([...rules]) // Must create new state to re-render
  }

  // log('exportRulesRef.current', exportRulesRef.current)

  // AJAX data state

  const [templateTypeItemOptions, setTemplateTypeItemOptions] = useState({})
  const templateTypeItemOptionsRef = useRef()

  // Keep ever-fresh reference for event callbacks to use
  templateTypeItemOptionsRef.current = templateTypeItemOptions

  // log('templateTypeItemOptionsRef.current', templateTypeItemOptionsRef.current)

  // Export state

  const [exportState, _setExportState] = useState({
    exporting: false,
    message: '',
    json: '',
    packageName: '',
  })

  const exportStateRef = useRef()
  exportStateRef.current = exportState

  const setExportState = (newState) => {
    _setExportState({
      ...exportStateRef.current,
      ...newState,
    })
  }

  // Ensure data

  const ensureTemplateTypeItemOptions = async (templateType) => {
    // We already have data (or is loading it)
    if (templateTypeItemOptionsRef.current[templateType]) return

    log(
      'ensureTemplateTypeItemOptions',
      templateType,
      templateTypeItemOptionsRef.current
    )

    const promise = ajax(ajaxActionPrefix + 'get_template_type_item_options', {
      post_type: templateType,
    })
      .then((result) => {
        log('ensureTemplateTypeItemOptions Success', result)

        setTemplateTypeItemOptions({
          ...templateTypeItemOptionsRef.current,
          [templateType]: result,
        })
      })
      .catch((error) => {
        log('ensureTemplateTypeItemOptions Fail', error)
      })

    // Store promise to prevent loading multiple times
    setTemplateTypeItemOptions({
      ...templateTypeItemOptionsRef.current,
      [templateType]: promise,
    })
  }

  return (
    <div id="exporter">
      <div className="export-name">
        Package name:{' '}
        <input
          type="text"
          name="name"
          defaultValue={defaultPackageName}
          ref={exportNameRef}
        />
      </div>

      <div className="export-rules">
        {exportRules.map((rule, ruleIndex) => (
          <ExportRule
            key={`export-rule-${ruleIndex}`}
            {...{
              rule,
              ruleIndex,

              exportRulesRef,
              setExportRules,

              templateTypeItemOptionsRef,
              ensureTemplateTypeItemOptions,
            }}
          />
        ))}
      </div>

      <p>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => {
            // Add export rule

            exportRulesRef.current.push({
              field: 'tangible_template',
              operator: 'all',
              values: [],
            })

            setExportRules(exportRulesRef.current)
          }}
        >
          Add export rule
        </button>
      </p>

      {exportRulesRef.current.length > 0 && (
        <p>
          <button
            type="button"
            className="button button-primary"
            disabled={exportState.exporting}
            onClick={() => {
              const packageName =
                (exportNameRef.current && exportNameRef.current.value) ||
                defaultPackageName

              saveStateToLocalStorage({
                name: packageName,
                rules: exportRulesRef.current,
              })

              // Export

              log('Export start', exportRulesRef.current)

              setExportState({
                exporting: true,
                message: 'Exporting..',
              })

              ajax(ajaxActionPrefix + 'export', {
                export_rules: exportRulesRef.current,
              })
                .then((result) => {
                  console.log('Export success', result)

                  setExportState({
                    exporting: false,
                    message: '',
                    // json: JSON.stringify(result, null, 2)
                  })

                  // Download JSON file

                  const data = {
                    package_name: packageName,
                    ...result,
                  }

                  const timestamp = new Date()
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, '') // Ymd

                  const a = document.createElement('a')

                  a.href =
                    'data:text/json;charset=utf-8,' +
                    encodeURIComponent(JSON.stringify(data, null, 2))
                  a.download = `${packageName}-${timestamp}.json`
                  a.style.display = 'none'

                  document.body.appendChild(a)

                  a.click()
                })
                .catch((error) => {
                  console.error(error)

                  setExportState({
                    exporting: false,
                    message: 'Error: ' + error.message,
                  })
                })
            }}
          >
            Export
          </button>

          {exportState.message && (
            <span style={{ paddingLeft: '1rem' }}>{exportState.message}</span>
          )}
        </p>
      )}
    </div>
  )
}

export default Exporter
