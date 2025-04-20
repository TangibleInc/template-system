import * as React from 'react'
import { memo } from 'react'

export const Support = memo(({ type, node }) => {
  return <div className='ide-component'>

  <h2>Keyboard Shortcuts</h2>

  <p>Ctrl or CMD + SPACE - Autocomplete</p>

  <h2>Language Reference</h2>

  </div>
})
