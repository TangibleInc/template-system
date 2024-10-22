import '@site/all' // Listens to events on data-t attributes

export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      <ul className={`${prefix}nav ${prefix}nav-tabs`}>
        <li className={`${prefix}nav-item`}>
          <a
            className={`${prefix}nav-link ${prefix}active`}
            aria-current='page'
            href='#'
          >
            Active
          </a>
        </li>
        <li className={`${prefix}nav-item`}>
          <a className={`${prefix}nav-link`} href='#'>
            Link
          </a>
        </li>
        <li className={`${prefix}nav-item`}>
          <a className={`${prefix}nav-link`} href='#'>
            Link
          </a>
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

      <div className={`${prefix}nav ${prefix}nav-tabs ${prefix}mb-3`} id='nav-tab' role='tablist'>
        <button
          className={`${prefix}nav-link ${prefix}active`}
          id='nav-home-tab'
          data-t-toggle='tab'
          data-t-target='#nav-home'
          type='button'
          role='tab'
          aria-controls='nav-home'
          aria-selected='true'
        >
          Home
        </button>
        <button
          className={`${prefix}nav-link`}
          id='nav-profile-tab'
          data-t-toggle='tab'
          data-t-target='#nav-profile'
          type='button'
          role='tab'
          aria-controls='nav-profile'
          aria-selected='false'
          tabIndex={-1}
        >
          Profile
        </button>
        <button
          className={`${prefix}nav-link`}
          id='nav-contact-tab'
          data-t-toggle='tab'
          data-t-target='#nav-contact'
          type='button'
          role='tab'
          aria-controls='nav-contact'
          aria-selected='false'
          tabIndex={-1}
        >
          Contact
        </button>
      </div>

      <div className={`${prefix}tab-content`} id='nav-tabContent'>
        <div
          className={`${prefix}tab-pane ${prefix}fade ${prefix}active ${prefix}show`}
          id='nav-home'
          role='tabpanel'
          aria-labelledby='nav-home-tab'
        >
          <p>
            This is some placeholder content the <strong>Home tab's</strong>{' '}
            associated content. Clicking another tab will toggle the visibility
            of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling. You can use it with
            tabs, pills, and any other <code>.nav</code>-powered navigation.
          </p>
        </div>
        <div
          className={`${prefix}tab-pane ${prefix}fade`}
          id='nav-profile'
          role='tabpanel'
          aria-labelledby='nav-profile-tab'
        >
          <p>
            This is some placeholder content the <strong>Profile tab's</strong>{' '}
            associated content. Clicking another tab will toggle the visibility
            of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling. You can use it with
            tabs, pills, and any other <code>.nav</code>-powered navigation.
          </p>
        </div>
        <div
          className={`${prefix}tab-pane ${prefix}fade`}
          id='nav-contact'
          role='tabpanel'
          aria-labelledby='nav-contact-tab'
        >
          <p>
            This is some placeholder content the <strong>Contact tab's</strong>{' '}
            associated content. Clicking another tab will toggle the visibility
            of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling. You can use it with
            tabs, pills, and any other <code>.nav</code>-powered navigation.
          </p>
        </div>
      </div>
    </>
  )
}
