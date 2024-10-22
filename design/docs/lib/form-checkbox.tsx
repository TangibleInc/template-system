export default function ({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <div className={`${prefix}form-check`}>
        <input
          className={`${prefix}form-check-input`}
          type='checkbox'
          value=''
          id='flexCheckDefault'
        />
        <label className={`${prefix}form-check-label`} htmlFor='flexCheckDefault'>
          Default checkbox
        </label>
      </div>
      <div className={`${prefix}form-check`}>
        <input
          className={`${prefix}form-check-input`}
          type='checkbox'
          value=''
          id='flexCheckChecked'
          checked
        />
        <label className={`${prefix}form-check-label`} htmlFor='flexCheckChecked'>
          Checked checkbox
        </label>
      </div>
    </>
  )
}
