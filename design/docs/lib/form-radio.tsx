export default function ({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <div className={`${prefix}form-check`}>
        <input
          className={`${prefix}form-check-input`}
          type='radio'
          name='flexRadioDefault'
          id='flexRadioDefault1'
        />
        <label className={`${prefix}form-check-label`} htmlFor='flexRadioDefault1'>
          Default radio
        </label>
      </div>
      <div className={`${prefix}form-check`}>
        <input
          className={`${prefix}form-check-input`}
          type='radio'
          name='flexRadioDefault'
          id='flexRadioDefault2'
          checked
        />
        <label className={`${prefix}form-check-label`} htmlFor='flexRadioDefault2'>
          Default checked radio
        </label>
      </div>
    </>
  )
}
