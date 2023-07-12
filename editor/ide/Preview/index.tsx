import * as React from 'react'
import { memo, useEffect, useRef } from 'react'

export const Preview = memo(({ type, node, onPreviewerReady }) => {

  const ref = useRef()

  useEffect(() => {

    console.log('Previewer mount', ref.current)
    
  }, [])

  return <div className='ide-component' ref={ref}></div>
})
