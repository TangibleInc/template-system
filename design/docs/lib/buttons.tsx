export default function ButtonsExample({
  prefix = 't-' // or ''
}) {
  return (
    <div style={{
      display: 'flex',
      gap: '.5rem',
    }}>
      <button type='button' className={`${prefix}btn ${prefix}btn-primary`}>
        Primary
      </button>
      <button type='button' className={`${prefix}btn ${prefix}btn-secondary`}>
        Secondary
      </button>
      <button type='button' className={`${prefix}btn ${prefix}btn-success`}>
        Success
      </button>
      <button type='button' className={`${prefix}btn ${prefix}btn-danger`}>
        Danger
      </button>
      <button type='button' className={`${prefix}btn ${prefix}btn-warning`}>
        Warning
      </button>
      <button type='button' className={`${prefix}btn ${prefix}btn-info`}>
        Info
      </button>
      <button type='button' className={`${prefix}btn ${prefix}btn-light`}>
        Light
      </button>
      <button type='button' className={`${prefix}btn ${prefix}btn-dark`}>
        Dark
      </button>

      <button type='button' className={`${prefix}btn ${prefix}btn-link`}>
        Link
      </button>
    </div>
  )
}
