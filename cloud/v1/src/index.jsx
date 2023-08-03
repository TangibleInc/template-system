/**
 * Template cloud
 *
 * @see /includes/template/cloud
 */
import { render, useRef, useState } from 'react'

import Catalog from './Catalog'
import Menu from './Menu'
import Importer from '../template-import-export/Importer'

const el = document.getElementById('tangible_template_cloud_wrapper')
const tabs = {
  public: 'Public Blocks',
}

const Wrapper = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0])
  const [importData, setImportData] = useState()

  const loadImportData = (data) => {
    setImportData(data)
  }

  return (
    <>
      <Menu
        {...{
          tabs,
          activeTab,
          setActiveTab,
        }}
      />

      <Importer
        key={importData}
        {...{
          useInput: false,
          directImportData: importData,
        }}
      />

      <Catalog
        key={activeTab}
        {...{
          tabs,
          activeTab,
          loadImportData,
        }}
      />
    </>
  )
}

render(<Wrapper tabs={tabs} />, el)
