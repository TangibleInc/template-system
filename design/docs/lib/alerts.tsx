export default function AlertsExample({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <div className={`${prefix}alert ${prefix}alert-primary`} role='alert'>
        A simple primary alert—check it out!
      </div>
      <div className={`${prefix}alert ${prefix}alert-secondary`} role='alert'>
        A simple secondary alert—check it out!
      </div>
      <div className={`${prefix}alert ${prefix}alert-success`} role='alert'>
        A simple success alert—check it out!
      </div>
      <div className={`${prefix}alert ${prefix}alert-danger`} role='alert'>
        A simple danger alert—check it out!
      </div>
      <div className={`${prefix}alert ${prefix}alert-warning`} role='alert'>
        A simple warning alert—check it out!
      </div>
      <div className={`${prefix}alert ${prefix}alert-info`} role='alert'>
        A simple info alert—check it out!
      </div>
      <div className={`${prefix}alert ${prefix}alert-light`} role='alert'>
        A simple light alert—check it out!
      </div>
      <div className={`${prefix}alert ${prefix}alert-dark`} role='alert'>
        A simple dark alert—check it out!
      </div>
    </>
  )
}
