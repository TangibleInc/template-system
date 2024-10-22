import '@site/all' // Listens to events on data-t attributes

export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      <nav
        className={`${prefix}navbar ${prefix}navbar-expand-md ${prefix}bg-body-tertiary`}
      >
        <div className={`${prefix}container-fluid`}>
          <a className={`${prefix}navbar-brand`} href='#'>
            Navbar
          </a>
          <button
            className={`${prefix}navbar-toggler`}
            type='button'
            data-t-toggle='collapse'
            data-t-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className={`${prefix}navbar-toggler-icon`}></span>
          </button>
          <div
            className={`${prefix}collapse ${prefix}navbar-collapse`}
            id='navbarSupportedContent'
          >
            <ul
              className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-md-0`}
            >
              <li className={`${prefix}nav-item`}>
                <a
                  className={`${prefix}nav-link ${prefix}active`}
                  aria-current='page'
                  href='#'
                >
                  Home
                </a>
              </li>
              <li className={`${prefix}nav-item`}>
                <a className={`${prefix}nav-link`} href='#'>
                  Link
                </a>
              </li>
              <li className={`${prefix}nav-item ${prefix}dropdown`}>
                <a
                  className={`${prefix}nav-link ${prefix}dropdown-toggle`}
                  href='#'
                  role='button'
                  data-t-toggle='dropdown'
                  aria-expanded='false'
                >
                  Dropdown
                </a>
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
                    <hr className={`${prefix}dropdown-divider`} />
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className={`${prefix}nav-item`}>
                <a
                  className={`${prefix}nav-link ${prefix}disabled`}
                  aria-disabled='true'
                >
                  Disabled
                </a>
              </li>
            </ul>
            <form className={`${prefix}d-flex`} role='search'>
              <input
                className={`${prefix}form-control ${prefix}me-2`}
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <button
                className={`${prefix}btn ${prefix}btn-outline-success`}
                type='submit'
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}
