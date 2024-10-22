export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <form className={`${prefix}row ${prefix}g-3 ${prefix}needs-validation`} noValidate>
        <div className={`${prefix}col-md-4`}>
          <label htmlFor='validationCustom01' className={`${prefix}form-label`}>
            First name
          </label>
          <input
            type='text'
            className={`${prefix}form-control`}
            id='validationCustom01'
            value='Mark'
            required
          />
          <div className={`${prefix}valid-feedback`}>Looks good!</div>
        </div>
        <div className={`${prefix}col-md-4`}>
          <label htmlFor='validationCustom02' className={`${prefix}form-label`}>
            Last name
          </label>
          <input
            type='text'
            className={`${prefix}form-control`}
            id='validationCustom02'
            value='Otto'
            required
          />
          <div className={`${prefix}valid-feedback`}>Looks good!</div>
        </div>
        <div className={`${prefix}col-md-4`}>
          <label htmlFor='validationCustomUsername' className={`${prefix}form-label`}>
            Username
          </label>
          <div className={`${prefix}input-group ${prefix}has-validation`}>
            <span className={`${prefix}input-group-text`} id='inputGroupPrepend'>
              @
            </span>
            <input
              type='text'
              className={`${prefix}form-control`}
              id='validationCustomUsername'
              aria-describedby='inputGroupPrepend'
              required
            />
            <div className={`${prefix}invalid-feedback`}>Please choose a username.</div>
          </div>
        </div>
        <div className={`${prefix}col-md-6`}>
          <label htmlFor='validationCustom03' className={`${prefix}form-label`}>
            City
          </label>
          <input
            type='text'
            className={`${prefix}form-control`}
            id='validationCustom03'
            required
          />
          <div className={`${prefix}invalid-feedback`}>Please provide a valid city.</div>
        </div>
        <div className={`${prefix}col-md-3`}>
          <label htmlFor='validationCustom04' className={`${prefix}form-label`}>
            State
          </label>
          <select className={`${prefix}form-select`} id='validationCustom04' required>
            <option selected disabled value=''>
              Choose...
            </option>
            <option>...</option>
          </select>
          <div className={`${prefix}invalid-feedback`}>Please select a valid state.</div>
        </div>
        <div className={`${prefix}col-md-3`}>
          <label htmlFor='validationCustom05' className={`${prefix}form-label`}>
            Zip
          </label>
          <input
            type='text'
            className={`${prefix}form-control`}
            id='validationCustom05'
            required
          />
          <div className={`${prefix}invalid-feedback`}>Please provide a valid zip.</div>
        </div>
        <div className={`${prefix}col-12`}>
          <div className={`${prefix}form-check`}>
            <input
              className={`${prefix}form-check-input`}
              type='checkbox'
              value=''
              id='invalidCheck'
              required
            />
            <label className={`${prefix}form-check-label`} htmlFor='invalidCheck'>
              Agree to terms and conditions
            </label>
            <div className={`${prefix}invalid-feedback`}>
              You must agree before submitting.
            </div>
          </div>
        </div>
        <div className={`${prefix}col-12`}>
          <button className={`${prefix}btn ${prefix}btn-primary`} type='submit'>
            Submit form
          </button>
        </div>
      </form>
    </>
  )
}
