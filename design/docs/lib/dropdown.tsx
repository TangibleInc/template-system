import '@site/all' // Listens to events on data-t attributes

export default function Dropdown({
  prefix = 't-' // or ''
}) {
  return (
    <div className={`${prefix}reset ${prefix}dropdown`}>
      <button
        className={`${prefix}btn ${prefix}btn-secondary ${prefix}
        dropdown-toggle`}
        type='button'
        data-t-toggle='dropdown'
        aria-expanded='false'
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
  )
}
