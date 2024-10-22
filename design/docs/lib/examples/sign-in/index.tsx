import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      {/* <link href="sign-in.css" rel="stylesheet"> */}

<main className={`${prefix}form-signin ${prefix}w-100 ${prefix}m-auto`}>
  <form>
    <img className={`${prefix}mb-4`} src="/img/logo.svg" alt="" width="72" height="57"/>
    <h1 className={`${prefix}h3 ${prefix}mb-3 ${prefix}fw-normal`}>Please sign in</h1>

    <div className={`${prefix}form-floating`}>
      <input type="email" className={`${prefix}form-control`} id="floatingInput" placeholder="name@example.com"/>
      <label htmlFor="floatingInput">Email address</label>
    </div>
    <div className={`${prefix}form-floating`}>
      <input type="password" className={`${prefix}form-control`} id="floatingPassword" placeholder="Password"/>
      <label htmlFor="floatingPassword">Password</label>
    </div>

    <div className={`${prefix}form-check ${prefix}text-start ${prefix}my-3`}>
      <input className={`${prefix}form-check-input`} type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label className={`${prefix}form-check-label`} htmlFor="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button className={`${prefix}btn ${prefix}btn-primary ${prefix}w-100 ${prefix}py-2`} type="submit">Sign in</button>
    <p className={`${prefix}mt-5 ${prefix}mb-3 ${prefix}text-body-secondary`}>&copy; 2017–2023</p>
  </form>
</main>

    </>
  )
}
