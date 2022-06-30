import { useEffect, useRef, useState } from 'react'

import { ajax, ajaxActionPrefix } from './common'

import Paginator from './Paginator'

const debug = true // Set this to false for production
const log = (...args) => debug && console.log('[Store Blocks Catalog]', ...args)

/**
 * Check for Pro plugin
 * @see /includes/template/cloud/enqueue.php
 */
const { isTangibleBlocksProInstalled = false } = window.Tangible

const Catalog = ({ tabs, activeTab, loadImportData }) => {
  const [catalogState, setCatalogState] = useState({
    loading: true,
    count: 0,
    total: 0,
    page: 1,
    next: 1,
    prev: 1,
    last: 1,
    downloads: [],
  })

  const setPage = (page) => {
    setCatalogState({
      ...catalogState,
      page,
    })
  }

  const needsPro = function (dld) {
    return dld.is_pro && !isTangibleBlocksProInstalled
  }

  const attemptInstall = (dld) => {
    if (!dld.files.length) console.error('File missing from dld', dld)
    if (needsPro(dld)) console.error('Tangible Blocks Pro missing') // Sanity check in case user deletes disabled tag

    if (dld.dependencies && dld.dependencies.unmet.length > 0) {
      if (
        !confirm(
          'Warning: There are one or more missing plugins which this block distribution relies on. If you proceed with the installation, the installed templates might interfere with the normal functioning of your website.'
        )
      ) {
        return
      }
    }

    const file = dld.files[0].file

    ajax(ajaxActionPrefix + 'json', { file })
      .then((result) => {
        // Import data should be at top-level
        loadImportData(result)
      })
      .catch((error) => {
        // Import failed
        console.error(error)
      })
  }

  // const catalogStateRef = useRef()
  // catalogStateRef.current = catalogState

  useEffect(() => {
    setCatalogState({
      ...catalogState,
      loading: true,
    })

    ajax(ajaxActionPrefix + 'catalog', {
      number: 12,
      page: catalogState.page,
      access_type: activeTab,
    })
      .then((result) => {
        let downloads = result.products

        setCatalogState({
          ...catalogState,
          ...result.meta,
          downloads,
          loading: false,
        })
      })
      .catch((error) => {
        // Import failed
        console.error(error)
      })
  }, [catalogState.page])

  return (
    <div className="tangible-blocks__loop-gallery">
      {catalogState.loading && (
        <div className="components-modal__screen-overlay-wpcontent">
          <span className="spinner"></span>
        </div>
      )}
      {catalogState.downloads.length > 0 ? (
        <div className="theme-browser">
          <div className="themes wp-clearfix">
            {catalogState.downloads.map((dld, idx) => (
              <div
                key={`download-${idx}`}
                className={'theme' + (dld.is_pro ? ' pro' : '')}
              >
                <div
                  className={
                    'theme-screenshot' + (!dld.thumbnail ? ' blank' : '')
                  }
                >
                  {dld.thumbnail && <img src={dld.thumbnail} />}

                  {dld.vendor && (
                    <div className="theme-vendor-wrap">
                      {dld.vendor.logo && (
                        <img
                          className="theme-vendor-logo"
                          src={dld.vendor.logo}
                        />
                      )}
                      <a
                        className="theme-vendor-link"
                        target="_blank"
                        href={dld.vendor.url}
                      >
                        {dld.vendor.name}
                      </a>
                    </div>
                  )}
                </div>

                <div className="theme-id-container">
                  <div className="theme-copy">
                    <h2 className="theme-name">{dld.title}</h2>
                    {dld.dependencies && (
                      <p className="theme-details">
                        Dependencies:{' '}
                        {dld.dependencies.met.map((dep, idx) => (
                          <span
                            key={`dependency-met-${idx}`}
                            className="dependency met"
                            data-slug={dep.slug}
                          >
                            {dep.name}
                          </span>
                        ))}
                        {dld.dependencies.unmet.map((dep, idx) => (
                          <span
                            key={`dependency-unmet-${idx}`}
                            className="dependency unmet"
                            data-slug={dep.slug}
                          >
                            {dep.name}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>

                  <div className="theme-actions">
                    {['public', 'free'].includes(activeTab) ? (
                      <button
                        className="button button-primary"
                        disabled={needsPro(dld)}
                        onClick={() => attemptInstall(dld)}
                      >
                        Install
                      </button>
                    ) : (
                      <a href={dld.link} target="_blank" className="button">
                        Buy
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - split into another component */}
          <Paginator {...{ catalogState, setPage }} />
        </div>
      ) : (
        <>
          {!catalogState.loading && (
            <h2>Nothing found in catalog for {tabs[activeTab]}</h2>
          )}
        </>
      )}
    </div>
  )
}

export default Catalog
