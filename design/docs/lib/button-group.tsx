export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <div className={`${prefix}btn-group`}>
        <a href='#' className={`${prefix}btn ${prefix}btn-primary ${prefix}active`} aria-current='page'>
          Active link
        </a>
        <a href='#' className={`${prefix}btn ${prefix}btn-primary`}>
          Link
        </a>
        <a href='#' className={`${prefix}btn ${prefix}btn-primary`}>
          Link
        </a>
      </div>
    </>
  )
}
