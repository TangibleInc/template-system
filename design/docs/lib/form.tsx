export default function({
  prefix = 't-' // or ''
}) {
  return <form>
  <div className={`${prefix}mb-3`}>
    <label htmlFor="exampleInputEmail1" className={`${prefix}form-label`}>Email address</label>
    <input type="email" className={`${prefix}form-control`} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className={`${prefix}form-text`}>We'll never share your email with anyone else.</div>
  </div>
  <div className={`${prefix}mb-3`}>
    <label htmlFor="exampleInputPassword1" className={`${prefix}form-label`}>Password</label>
    <input type="password" className={`${prefix}form-control`} id="exampleInputPassword1"/>
  </div>
  <div className={`${prefix}mb-3 ${prefix}form-check`}>
    <input type="checkbox" className={`${prefix}form-check-input`} id="exampleCheck1"/>
    <label className={`${prefix}form-check-label`} htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className={`${prefix}btn ${prefix}btn-primary`}>Submit</button>
</form>
}