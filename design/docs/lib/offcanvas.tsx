import '@site/all' // Listens to events on data-t attributes

export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
    <div style={{
      display: 'flex',
      gap: '.5rem',
    }}>
      <a
        className={`${prefix}btn ${prefix}btn-primary`}
        data-t-toggle='offcanvas'
        href='#offcanvasExample'
        role='button'
        aria-controls='offcanvasExample'
      >
        Link with href
      </a>
      <button
        className={`${prefix}btn ${prefix}btn-primary`}
        type='button'
        data-t-toggle='offcanvas'
        data-t-target='#offcanvasExample'
        aria-controls='offcanvasExample'
      >
        Button with data-t-target
      </button>
    </div>

      <div
        className={`${prefix}offcanvas ${prefix}offcanvas-start`}
        tabIndex={-1}
        id='offcanvasExample'
        aria-labelledby='offcanvasExampleLabel'
      >
        <div className={`${prefix}offcanvas-header`}>
          <h5 className={`${prefix}offcanvas-title`} id='offcanvasExampleLabel'>
            Offcanvas
          </h5>
          <button
            type='button'
            className={`${prefix}btn-close`}
            data-t-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className={`${prefix}offcanvas-body`}>
          <div>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </div>
          <div className={`${prefix}dropdown ${prefix}mt-3`}>
            <button
              className={`${prefix}btn ${prefix}btn-secondary ${prefix}dropdown-toggle`}
              type='button'
              data-t-toggle='dropdown'
            >
              Dropdown button
            </button>
            <ul className={`${prefix}dropdown-menu`}>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Action
                </a>
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Another action
                </a>
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Something else here
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
