import { useEffect, useRef } from 'react'
import design from '@site/all' // Listens to events on data-t attributes
design
export default function Example({
  prefix = 't-', // or ''
  dataPrefix = 't-',
}) {
  // TODO: Move this logic to new React component Popover
  const ref = useRef()
  useEffect(() => {
    const el: HTMLElement = ref.current
    if (!el) return
    for (const target of [
      ...el.querySelectorAll(`[data-${dataPrefix}toggle]`),
    ]) {
      new design.Popover(target)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: '.5rem',
        flexWrap: 'wrap',
      }}
    >
      <button
        type='button'
        className={`${prefix}btn ${prefix}btn-secondary`}
        data-t-container='body'
        data-t-toggle='popover'
        data-t-placement='top'
        data-t-content='Top popover'
      >
        Popover on top
      </button>
      <button
        type='button'
        className={`${prefix}btn ${prefix}btn-secondary`}
        data-t-container='body'
        data-t-toggle='popover'
        data-t-placement='right'
        data-t-content='Right popover'
      >
        Popover on right
      </button>
      <button
        type='button'
        className={`${prefix}btn ${prefix}btn-secondary`}
        data-t-container='body'
        data-t-toggle='popover'
        data-t-placement='bottom'
        data-t-content='Bottom popover'
      >
        Popover on bottom
      </button>
      <button
        type='button'
        className={`${prefix}btn ${prefix}btn-secondary`}
        data-t-container='body'
        data-t-toggle='popover'
        data-t-placement='left'
        data-t-content='Left popover'
      >
        Popover on left
      </button>
    </div>
  )
}
