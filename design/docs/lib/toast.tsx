import '@site/all'
import { placeholderImage300x150 } from '@site/utilities/placeholder'

export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      <div
        className={`${prefix}toast ${prefix}show`}
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
      >
        <div className={`${prefix}toast-header`}>
          {/* <img
            src={'...'}
            className={`${prefix}rounded ${prefix}me-2`}
            alt='...'
          /> */}
          <strong className={`${prefix}me-auto`}>System</strong>
          <small>11 mins ago</small>
          <button
            type='button'
            className={`${prefix}btn-close`}
            data-t-dismiss='toast'
            aria-label='Close'
          ></button>
        </div>
        <div className={`${prefix}toast-body`}>
          Hello, world! This is a toast message.
        </div>
      </div>
    </>
  )
}
