import * as React from 'react'
import { useState, useMemo } from 'react'
import * as Layout from '../Layout'
import { IconFullScreenOpen, IconFullScreenClose } from '../icons'

enum ScreenSize {
  Default,
  Full,
  FullScreen
}

// See ./index.scss
const fullScreenClassName = 'tangible-template-system-ide-expanded'

function updateFullScreenClass(isFullScreen: boolean) {
  const $html = document.documentElement
  if (isFullScreen) {
    $html.classList.add(fullScreenClassName)
  } else {
    $html.classList.remove(fullScreenClassName)
  }
}

export function Header({
  layoutModel,
  ideElement
}) {

  const [screenSize, _setScreenSize] = useState(ScreenSize.Default)
  const setScreenSize = useMemo(() => function(size) {

    function update() {
      updateFullScreenClass(
        size===ScreenSize.Full || size===ScreenSize.FullScreen
      )
      _setScreenSize(size)
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
    if (size===ScreenSize.FullScreen) {
      if (!document.fullscreenElement) {
        ideElement.requestFullscreen()
          .then(update)
          .catch(e => {
            // Refused
          })
          return
      }
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
    }

    update()

  }, [_setScreenSize])

  return <div className='ide-header'>
    <div className="ide-header--title">
      <input type="text" value="Template name" />
    </div>
    <div className="ide-header--actions">

      <button className='ide-header--action'>Save</button>
      <button className='ide-header--action'
      >Format</button>
      <button className='ide-header--action'
      >Export</button>
      {/* <button className='ide-header--action'
      >Import</button> */}

      <div className='ide-header--action-separator'></div>

      <button className='ide-header--action'
        onClick={() => {
          layoutModel.doAction(Layout.Actions.selectTab('library'))
        }}
      >Library</button>
      <button className='ide-header--action'
        onClick={() => {
          layoutModel.doAction(Layout.Actions.selectTab('support'))
        }}
      >Support</button>

      { screenSize===ScreenSize.FullScreen
        ? <button className='ide-header--action ide-header--action-with-icon'
          onClick={() => setScreenSize(ScreenSize.Default) }
        ><IconFullScreenClose /></button>
        : <>
          { screenSize===ScreenSize.Full &&
            <button className='ide-header--action ide-header--action-with-icon'
            onClick={() => setScreenSize( ScreenSize.FullScreen ) }
            alt='Full Screen'
            ><IconFullScreenOpen /></button>
          }
          { screenSize===ScreenSize.Default &&
            <button className='ide-header--action ide-header--action-with-icon'
              onClick={() => setScreenSize( ScreenSize.Full ) }
              alt='Expand'
            ><IconFullScreenOpen /></button>
        }
        { screenSize===ScreenSize.Full &&
          <button className='ide-header--action ide-header--action-with-icon'
            onClick={() => setScreenSize( ScreenSize.Default )}
            alt='Shrink'
          ><IconFullScreenClose /></button>
        }
        </>
      }

    </div>
  </div>
}
