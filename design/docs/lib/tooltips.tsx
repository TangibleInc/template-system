import { useEffect, useRef } from 'react'
import design from '@site/all' // Listens to events on data-t attributes

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
      new design.Tooltip(target)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: '.5rem',
      }}
    >
      <button
        type='button'
        className={`${prefix}btn ${prefix}btn-secondary`}
        data-t-toggle='tooltip'
        data-t-placement='top'
        data-t-title='Tooltip on top'
      >
        Tooltip on top
      </button>
      <button
        type='button'
        className={`${prefix}btn ${prefix}btn-secondary`}
        data-t-toggle='tooltip'
        data-t-placement='right'
        data-t-title='Tooltip on right'
      >
        Tooltip on right
      </button>
      <button
        type='button'
        className={`${prefix}btn ${prefix}btn-secondary`}
        data-t-toggle='tooltip'
        data-t-placement='bottom'
        data-t-title='Tooltip on bottom'
      >
        Tooltip on bottom
      </button>
      <button
        type='button'
        className={`${prefix}btn ${prefix}btn-secondary`}
        data-t-toggle='tooltip'
        data-t-placement='left'
        data-t-title='Tooltip on left'
      >
        Tooltip on left
      </button>
    </div>
  )
}
