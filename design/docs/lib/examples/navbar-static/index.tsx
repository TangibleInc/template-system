import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      {/* <link href="navbar-static.css" rel="stylesheet"> */}

<nav className={`${prefix}navbar ${prefix}navbar-expand-md ${prefix}navbar-dark ${prefix}bg-dark ${prefix}mb-4`}>
  <div className={`${prefix}container-fluid`}>
    <a className={`${prefix}navbar-brand`} href="#">Top navbar</a>
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
        <input className={`${prefix}form-control ${prefix}me-2`} type="search" placeholder="Search" aria-label="Search" />
        <button className={`${prefix}btn ${prefix}btn-outline-success`} type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<main className={`${prefix}container`}>
  <div className={`${prefix}bg-body-tertiary ${prefix}p-5 ${prefix}rounded`}>
    <h1>Navbar example</h1>
    <p className={`${prefix}lead`}>This example is a quick exercise to illustrate how the top-aligned navbar works. As you scroll, this navbar remains in its original position and moves with the rest of the page.</p>
    <a className={`${prefix}btn ${prefix}btn-lg ${prefix}btn-primary`} href="../components/navbar/" role="button">View navbar docs &raquo;</a>
  </div>
</main>


    </>
  )
}
