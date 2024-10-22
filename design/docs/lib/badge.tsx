export default function BadgesExample({
  prefix = 't-' // or ''
}) {
  return (
    <div style={{
      display: 'flex',
      gap: '.25rem',
    }}>
      <span className={`${prefix}badge ${prefix}text-bg-primary`}>Primary</span>
      <span className={`${prefix}badge ${prefix}text-bg-secondary`}>Secondary</span>
      <span className={`${prefix}badge ${prefix}text-bg-success`}>Success</span>
      <span className={`${prefix}badge ${prefix}text-bg-danger`}>Danger</span>
      <span className={`${prefix}badge ${prefix}text-bg-warning`}>Warning</span>
      <span className={`${prefix}badge ${prefix}text-bg-info`}>Info</span>
      <span className={`${prefix}badge ${prefix}text-bg-light`}>Light</span>
      <span className={`${prefix}badge ${prefix}text-bg-dark`}>Dark</span>
    </div>
  )
}
