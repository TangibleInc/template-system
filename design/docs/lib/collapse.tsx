import '@site/all' // Listens to events on data-t attributes

export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <p className={`${prefix}d-inline-flex ${prefix}gap-1`}>
        <a
          className={`${prefix}btn ${prefix}btn-primary`}
          data-t-toggle='collapse'
          href='#collapseExample'
          role='button'
          aria-expanded='false'
          aria-controls='collapseExample'
        >
          Link with href
        </a>
        <button
          className={`${prefix}btn ${prefix}btn-primary`}
          type='button'
          data-t-toggle='collapse'
          data-t-target='#collapseExample'
          aria-expanded='false'
          aria-controls='collapseExample'
        >
          Button with data-t-target
        </button>
      </p>
      <div className={`${prefix}collapse`} id='collapseExample'>
        <div className={`${prefix}card ${prefix}card-body`}>
          Some placeholder content for the collapse component. This panel is
          hidden by default but revealed when the user activates the relevant
          trigger.
        </div>
      </div>
    </>
  )
}
