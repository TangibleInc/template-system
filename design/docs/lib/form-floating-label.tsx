export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <div className={`${prefix}form-floating ${prefix}mb-3`}>
        <input
          type='email'
          className={`${prefix}form-control`}
          id='floatingInput'
          placeholder='name@example.com'
        />
        <label htmlFor='floatingInput'>Email address</label>
      </div>
      <div className={`${prefix}form-floating`}>
        <input
          type='password'
          className={`${prefix}form-control`}
          id='floatingPassword'
          placeholder='Password'
        />
        <label htmlFor='floatingPassword'>Password</label>
      </div>
    </>
  )
}
