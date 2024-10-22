export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <nav aria-label='Page navigation example'>
        <ul className={`${prefix}pagination`}>
          <li className={`${prefix}page-item`}>
            <a className={`${prefix}page-link`} href='#'>
              Previous
            </a>
          </li>
          <li className={`${prefix}page-item`}>
            <a className={`${prefix}page-link`} href='#'>
              1
            </a>
          </li>
          <li className={`${prefix}page-item`}>
            <a className={`${prefix}page-link`} href='#'>
              2
            </a>
          </li>
          <li className={`${prefix}page-item`}>
            <a className={`${prefix}page-link`} href='#'>
              3
            </a>
          </li>
          <li className={`${prefix}page-item`}>
            <a className={`${prefix}page-link`} href='#'>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}
