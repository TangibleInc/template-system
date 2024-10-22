export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <div className={`${prefix}input-group ${prefix}mb-3`}>
        <span className={`${prefix}input-group-text`} id='basic-addon1'>
          @
        </span>
        <input
          type='text'
          className={`${prefix}form-control`}
          placeholder='Username'
          aria-label='Username'
          aria-describedby='basic-addon1'
        />
      </div>

      <div className={`${prefix}input-group ${prefix}mb-3`}>
        <input
          type='text'
          className={`${prefix}form-control`}
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby='basic-addon2'
        />
        <span className={`${prefix}input-group-text`} id='basic-addon2'>
          @example.com
        </span>
      </div>

      <div className={`${prefix}mb-3`}>
        <label htmlFor='basic-url' className={`${prefix}form-label`}>
          Your vanity URL
        </label>
        <div className={`${prefix}input-group`}>
          <span className={`${prefix}input-group-text`} id='basic-addon3'>
            https://example.com/users/
          </span>
          <input
            type='text'
            className={`${prefix}form-control`}
            id='basic-url'
            aria-describedby='basic-addon3 basic-addon4'
          />
        </div>
        <div className={`${prefix}form-text`} id='basic-addon4'>
          Example help text goes outside the input group.
        </div>
      </div>

      <div className={`${prefix}input-group ${prefix}mb-3`}>
        <span className={`${prefix}input-group-text`}>$</span>
        <input
          type='text'
          className={`${prefix}form-control`}
          aria-label='Amount (to the nearest dollar)'
        />
        <span className={`${prefix}input-group-text`}>.00</span>
      </div>

      <div className={`${prefix}input-group ${prefix}mb-3`}>
        <input
          type='text'
          className={`${prefix}form-control`}
          placeholder='Username'
          aria-label='Username'
        />
        <span className={`${prefix}input-group-text`}>@</span>
        <input
          type='text'
          className={`${prefix}form-control`}
          placeholder='Server'
          aria-label='Server'
        />
      </div>

      <div className={`${prefix}input-group`}>
        <span className={`${prefix}input-group-text`}>With textarea</span>
        <textarea
          className={`${prefix}form-control`}
          aria-label='With textarea'
        ></textarea>
      </div>
    </>
  )
}
