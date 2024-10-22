export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <label htmlFor='customRange1' className={`${prefix}form-label`}>
        Example range
      </label>
      <input type='range' className={`${prefix}form-range`} id='customRange1'></input>
    </>
  )
}
