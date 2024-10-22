export default function BreadcrumbExample({
  prefix = 't-' // or ''
}) {
  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className={`${prefix}breadcrumb`}>
          <li className={`${prefix}breadcrumb-item ${prefix}active`} aria-current='page'>
            Home
          </li>
        </ol>
      </nav>

      <nav aria-label='breadcrumb'>
        <ol className={`${prefix}breadcrumb`}>
          <li className={`${prefix}breadcrumb-item`}>
            <a href='#'>Home</a>
          </li>
          <li className={`${prefix}breadcrumb-item ${prefix}active`} aria-current='page'>
            Library
          </li>
        </ol>
      </nav>

      <nav aria-label='breadcrumb'>
        <ol className={`${prefix}breadcrumb`}>
          <li className={`${prefix}breadcrumb-item`}>
            <a href='#'>Home</a>
          </li>
          <li className={`${prefix}breadcrumb-item`}>
            <a href='#'>Library</a>
          </li>
          <li className={`${prefix}breadcrumb-item ${prefix}active`} aria-current='page'>
            Data
          </li>
        </ol>
      </nav>
    </div>
  )
}
