export default function ({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <div className={`${prefix}form-check ${prefix}form-switch`}>
        <input
          className={`${prefix}form-check-input`}
          type='checkbox'
          role='switch'
          id='flexSwitchCheckDefault'
        />
        <label className={`${prefix}form-check-label`} htmlFor='flexSwitchCheckDefault'>
          Default switch checkbox input
        </label>
      </div>
      <div className={`${prefix}form-check ${prefix}form-switch`}>
        <input
          className={`${prefix}form-check-input`}
          type='checkbox'
          role='switch'
          id='flexSwitchCheckChecked'
          checked
        />
        <label className={`${prefix}form-check-label`} htmlFor='flexSwitchCheckChecked'>
          Checked switch checkbox input
        </label>
      </div>
      <div className={`${prefix}form-check ${prefix}form-switch`}>
        <input
          className={`${prefix}form-check-input`}
          type='checkbox'
          role='switch'
          id='flexSwitchCheckDisabled'
          disabled
        />
        <label className={`${prefix}form-check-label`} htmlFor='flexSwitchCheckDisabled'>
          Disabled switch checkbox input
        </label>
      </div>
      <div className={`${prefix}form-check ${prefix}form-switch`}>
        <input
          className={`${prefix}form-check-input`}
          type='checkbox'
          role='switch'
          id='flexSwitchCheckCheckedDisabled'
          checked
          disabled
        />
        <label
          className={`${prefix}form-check-label`}
          htmlFor='flexSwitchCheckCheckedDisabled'
        >
          Disabled checked switch checkbox input
        </label>
      </div>
    </>
  )
}
