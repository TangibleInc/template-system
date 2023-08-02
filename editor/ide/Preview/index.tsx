import * as React from 'react'
import { memo, useEffect, useRef } from 'react'
// import { startPlaygroundWeb } from '@wp-playground/client'

export const Preview = memo(({ type, node, onPreviewerReady }) => {

  const ref = useRef()

  useEffect(() => {

    const el = ref.current

    console.log('Previewer mount', el)

    return

    const iframe = document.createElement('iframe')

    iframe.width = '100%'
    iframe.height = iframe.height || '480px'
    iframe.style = 'border: none'
    el.append(iframe)  

    const server = 
      'https://playground.wordpress.net'
      // 'http://localhost:3000'

    console.log('iframe', iframe)
    console.log('server', server)
  
    const blueprint = {
      steps: [
        { step: 'login', username: 'admin', password: 'password' },
      ]
    }

    start({
      iframe,
      // server,
      remoteUrl: `${server}/remote.html`,
  
      // blueprint: {
      //   landingPage: '/',
      //   preferredVersions: {
      //     php: '8.0',
      //     wp: '6.2'
      //   },
      //   // disableProgressBar: true,
      //   ...blueprint
      // }
    })
      .then(function() {
        console.log('playground ready')
      })
      .catch(console.error)
    
  }, [])

  return <div className='ide-component' ref={ref}></div>
})

async function start(options) {
  console.log('start', options)
  const playground = await startPlaygroundWeb(options)

  console.log('playground', playground)

  await playground.isReady()
  
  return playground
}

