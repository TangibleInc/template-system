import * as React from 'react'
import { memo } from 'react'

export const Library = memo(({ type, node }) => {
  return <div className='ide-component'>

    <h2>Local</h2>

    <p>List of templates</p>

    <h2>Cloud</h2>

    <p>Catalog</p>

  </div>
})
