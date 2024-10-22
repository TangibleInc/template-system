import design from '@site/all' // Listens to events on data-t attributes

design // Ensure it gets bundled

export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      <nav
        id='navbar-example2'
        className={`${prefix}navbar ${prefix}bg-body-tertiary ${prefix}px-3 ${prefix}mb-3`}
      >
        <a className={`${prefix}navbar-brand`} href='#'>
          Navbar
        </a>
        <ul className={`${prefix}nav ${prefix}nav-pills`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href='#scrollspyHeading1'>
              First
            </a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href='#scrollspyHeading2'>
              Second
            </a>
          </li>
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a
              className={`${prefix}nav-link ${prefix}dropdown-toggle`}
              data-t-toggle='dropdown'
              href='#'
              role='button'
              aria-expanded='false'
            >
              Dropdown
            </a>
            <ul className={`${prefix}dropdown-menu`}>
              <li>
                <a
                  className={`${prefix}dropdown-item`}
                  href='#scrollspyHeading3'
                >
                  Third
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}dropdown-item`}
                  href='#scrollspyHeading4'
                >
                  Fourth
                </a>
              </li>
              <li>
                <hr className={`${prefix}dropdown-divider`} />
              </li>
              <li>
                <a
                  className={`${prefix}dropdown-item`}
                  href='#scrollspyHeading5'
                >
                  Fifth
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div
        data-t-spy='scroll'
        data-t-target='#navbar-example2'
        data-t-root-margin='0px 0px -40%'
        data-t-smooth-scroll='true'
        className={`${prefix}scrollspy-example ${prefix}bg-body-tertiary ${prefix}p-3 ${prefix}rounded-2`}
        tabIndex={0}
      >
        <h4 id='scrollspyHeading1'>First heading</h4>
        <p>...</p>
        <h4 id='scrollspyHeading2'>Second heading</h4>
        <p>...</p>
        <h4 id='scrollspyHeading3'>Third heading</h4>
        <p>...</p>
        <h4 id='scrollspyHeading4'>Fourth heading</h4>
        <p>...</p>
        <h4 id='scrollspyHeading5'>Fifth heading</h4>
        <p>...</p>
      </div>
    </>
  )
}
