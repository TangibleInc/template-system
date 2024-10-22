import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      

<main className={`${prefix}container`}>
  <div className={`${prefix}bg-body-tertiary ${prefix}p-5 ${prefix}rounded ${prefix}mt-3`}>
    <h1>Bottom Navbar example</h1>
    <p className={`${prefix}lead`}>This example is a quick exercise to illustrate how the bottom navbar works.</p>
    <a className={`${prefix}btn ${prefix}btn-lg ${prefix}btn-primary`} href="../components/navbar/" role="button">View navbar docs &raquo;</a>
  </div>
</main>
<nav className={`${prefix}navbar ${prefix}fixed-bottom ${prefix}navbar-expand-sm ${prefix}navbar-dark ${prefix}bg-dark`}>
  <div className={`${prefix}container-fluid`}>
    <a className={`${prefix}navbar-brand`} href="#">Bottom navbar</a>
    <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className={`${prefix}navbar-toggler-icon`}></span>
    </button>
    <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarCollapse">
      <ul className={`${prefix}navbar-nav`}>
        <li className={`${prefix}nav-item`}>
          <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
        </li>
        <li className={`${prefix}nav-item`}>
          <a className={`${prefix}nav-link`} href="#">Link</a>
        </li>
        <li className={`${prefix}nav-item`}>
          <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
        </li>
        <li className={`${prefix}nav-item ${prefix}dropup`}>
          <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropup</a>
          <ul className={`${prefix}dropdown-menu`}>
            <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
            <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
            <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </>
  )
}
