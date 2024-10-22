export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <div style={{
      display: 'flex',
      gap: '1.5rem',
    }}>
      <div
        className={`${prefix}spinner-border ${prefix}text-primary`}
        role='status'
      >
        <span className={`${prefix}visually-hidden`}>Loading...</span>
      </div>
      <div
        className={`${prefix}spinner-border ${prefix}text-secondary`}
        role='status'
      >
        <span className={`${prefix}visually-hidden`}>Loading...</span>
      </div>
      <div
        className={`${prefix}spinner-border ${prefix}text-success`}
        role='status'
      >
        <span className={`${prefix}visually-hidden`}>Loading...</span>
      </div>
      <div
        className={`${prefix}spinner-border ${prefix}text-danger`}
        role='status'
      >
        <span className={`${prefix}visually-hidden`}>Loading...</span>
      </div>
      <div
        className={`${prefix}spinner-border ${prefix}text-warning`}
        role='status'
      >
        <span className={`${prefix}visually-hidden`}>Loading...</span>
      </div>
      <div
        className={`${prefix}spinner-border ${prefix}text-info`}
        role='status'
      >
        <span className={`${prefix}visually-hidden`}>Loading...</span>
      </div>
      <div
        className={`${prefix}spinner-border ${prefix}text-light`}
        role='status'
      >
        <span className={`${prefix}visually-hidden`}>Loading...</span>
      </div>
      <div
        className={`${prefix}spinner-border ${prefix}text-dark`}
        role='status'
      >
        <span className={`${prefix}visually-hidden`}>Loading...</span>
      </div>
    </div>
  )
}
