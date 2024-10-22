import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      {/* <link href="sticky-footer-navbar.css" rel="stylesheet"> */}

<div className={`${prefix}d-flex ${prefix}flex-column ${prefix}min-vh-100`}>

<header>
  {/* <!-- Fixed navbar --> */}
  <nav className={`${prefix}navbar ${prefix}navbar-expand-md ${prefix}navbar-dark ${prefix}fixed-top ${prefix}bg-dark`}>
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Fixed navbar</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>
      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarCollapse">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-md-0`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form className={`${prefix}d-flex`} role="search">
          <input className={`${prefix}form-control ${prefix}me-2`} type="search" placeholder="Search" aria-label="Search"/>
          <button className={`${prefix}btn ${prefix}btn-outline-success`} type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</header>

{/* <!-- Begin page content --> */}
<main className={`${prefix}flex-shrink-0`}>
  <div className={`${prefix}container`}>
    <h1 className={`${prefix}mt-5`}>Sticky footer with fixed navbar</h1>
    <p className={`${prefix}lead`}>Pin a footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS. A fixed navbar has been added with <code className={`${prefix}small`}>padding-top: 60px;</code> on the <code className={`${prefix}small`}>main &gt; .container</code>.</p>
    <p>Back to <a href="../sticky-footer/">the default sticky footer</a> minus the navbar.</p>
  </div>
</main>

<footer className={`${prefix}footer ${prefix}mt-auto ${prefix}py-3 ${prefix}bg-body-tertiary`}>
  <div className={`${prefix}container`}>
    <span className={`${prefix}text-body-secondary`}>Place sticky footer content here.</span>
  </div>
</footer>


</div>

    </>
  )
}
