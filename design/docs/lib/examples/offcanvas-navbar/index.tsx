import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      {/* <link href="offcanvas-navbar.css" rel="stylesheet"> */}

<nav className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}fixed-top ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Main navigation">
  <div className={`${prefix}container-fluid`}>
    <a className={`${prefix}navbar-brand`} href="#">Offcanvas navbar</a>
    <button className={`${prefix}navbar-toggler ${prefix}p-0 ${prefix}border-0`} type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
      <span className={`${prefix}navbar-toggler-icon`}></span>
    </button>

    <div className={`${prefix}navbar-collapse ${prefix}offcanvas-collapse`} id="navbarsExampleDefault">
      <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-lg-0`}>
        <li className={`${prefix}nav-item`}>
          <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Dashboard</a>
        </li>
        <li className={`${prefix}nav-item`}>
          <a className={`${prefix}nav-link`} href="#">Notifications</a>
        </li>
        <li className={`${prefix}nav-item`}>
          <a className={`${prefix}nav-link`} href="#">Profile</a>
        </li>
        <li className={`${prefix}nav-item`}>
          <a className={`${prefix}nav-link`} href="#">Switch account</a>
        </li>
        <li className={`${prefix}nav-item ${prefix}dropdown`}>
          <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Settings</a>
          <ul className={`${prefix}dropdown-menu`}>
            <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
            <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
            <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <form className={`${prefix}d-flex`} role="search">
        <input className={`${prefix}form-control ${prefix}me-2`} type="search" placeholder="Search" aria-label="Search" />
        <button className={`${prefix}btn ${prefix}btn-outline-success`} type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<div className={`${prefix}nav-scroller ${prefix}bg-body ${prefix}shadow-sm`}>
  <nav className={`${prefix}nav`} aria-label="Secondary navigation">
    <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Dashboard</a>
    <a className={`${prefix}nav-link`} href="#">
      Friends
      <span className={`${prefix}badge ${prefix}text-bg-light ${prefix}rounded-pill ${prefix}align-text-bottom`}>27</span>
    </a>
    <a className={`${prefix}nav-link`} href="#">Explore</a>
    <a className={`${prefix}nav-link`} href="#">Suggestions</a>
    <a className={`${prefix}nav-link`} href="#">Link</a>
    <a className={`${prefix}nav-link`} href="#">Link</a>
    <a className={`${prefix}nav-link`} href="#">Link</a>
    <a className={`${prefix}nav-link`} href="#">Link</a>
    <a className={`${prefix}nav-link`} href="#">Link</a>
  </nav>
</div>

<main className={`${prefix}container`}>
  <div className={`${prefix}d-flex ${prefix}align-items-center ${prefix}p-3 ${prefix}my-3 ${prefix}text-white ${prefix}bg-purple ${prefix}rounded ${prefix}shadow-sm`}>
    <img className={`${prefix}me-3`} src="/img/logo.svg" alt="" width="48" height="38"/>
    <div className={`${prefix}lh-1`}>
      <h1 className={`${prefix}h6 ${prefix}mb-0 ${prefix}text-white ${prefix}lh-1`}>Example</h1>
      <small>Since 2011</small>
    </div>
  </div>

  <div className={`${prefix}my-3 ${prefix}p-3 ${prefix}bg-body ${prefix}rounded ${prefix}shadow-sm`}>
    <h6 className={`${prefix}border-bottom ${prefix}pb-2 ${prefix}mb-0`}>Recent updates</h6>
    <div className={`${prefix}d-flex ${prefix}text-body-secondary ${prefix}pt-3`}>
      <svg className={`${prefix}bd-placeholder-img ${prefix}flex-shrink-0 ${prefix}me-2 ${prefix}rounded`} width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
      <p className={`${prefix}pb-3 ${prefix}mb-0 ${prefix}small ${prefix}lh-sm ${prefix}border-bottom`}>
        <strong className={`${prefix}d-block ${prefix}text-gray-dark`}>@username</strong>
        Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?
      </p>
    </div>
    <div className={`${prefix}d-flex ${prefix}text-body-secondary ${prefix}pt-3`}>
      <svg className={`${prefix}bd-placeholder-img ${prefix}flex-shrink-0 ${prefix}me-2 ${prefix}rounded`} width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"/><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg>
      <p className={`${prefix}pb-3 ${prefix}mb-0 ${prefix}small ${prefix}lh-sm ${prefix}border-bottom`}>
        <strong className={`${prefix}d-block ${prefix}text-gray-dark`}>@username</strong>
        Some more representative placeholder content, related to this other user. Another status update, perhaps.
      </p>
    </div>
    <div className={`${prefix}d-flex ${prefix}text-body-secondary ${prefix}pt-3`}>
      <svg className={`${prefix}bd-placeholder-img ${prefix}flex-shrink-0 ${prefix}me-2 ${prefix}rounded`} width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6f42c1"/><text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text></svg>
      <p className={`${prefix}pb-3 ${prefix}mb-0 ${prefix}small ${prefix}lh-sm ${prefix}border-bottom`}>
        <strong className={`${prefix}d-block ${prefix}text-gray-dark`}>@username</strong>
        This user also gets some representative placeholder content. Maybe they did something interesting, and you really want to highlight this in the recent updates.
      </p>
    </div>
    <small className={`${prefix}d-block ${prefix}text-end ${prefix}mt-3`}>
      <a href="#">All updates</a>
    </small>
  </div>

  <div className={`${prefix}my-3 ${prefix}p-3 ${prefix}bg-body ${prefix}rounded ${prefix}shadow-sm`}>
    <h6 className={`${prefix}border-bottom ${prefix}pb-2 ${prefix}mb-0`}>Suggestions</h6>
    <div className={`${prefix}d-flex ${prefix}text-body-secondary ${prefix}pt-3`}>
      <svg className={`${prefix}bd-placeholder-img ${prefix}flex-shrink-0 ${prefix}me-2 ${prefix}rounded`} width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
      <div className={`${prefix}pb-3 ${prefix}mb-0 ${prefix}small ${prefix}lh-sm ${prefix}border-bottom ${prefix}w-100`}>
        <div className={`${prefix}d-flex ${prefix}justify-content-between`}>
          <strong className={`${prefix}text-gray-dark`}>Full Name</strong>
          <a href="#">Follow</a>
        </div>
        <span className={`${prefix}d-block`}>@username</span>
      </div>
    </div>
    <div className={`${prefix}d-flex ${prefix}text-body-secondary ${prefix}pt-3`}>
      <svg className={`${prefix}bd-placeholder-img ${prefix}flex-shrink-0 ${prefix}me-2 ${prefix}rounded`} width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
      <div className={`${prefix}pb-3 ${prefix}mb-0 ${prefix}small ${prefix}lh-sm ${prefix}border-bottom ${prefix}w-100`}>
        <div className={`${prefix}d-flex ${prefix}justify-content-between`}>
          <strong className={`${prefix}text-gray-dark`}>Full Name</strong>
          <a href="#">Follow</a>
        </div>
        <span className={`${prefix}d-block`}>@username</span>
      </div>
    </div>
    <div className={`${prefix}d-flex ${prefix}text-body-secondary ${prefix}pt-3`}>
      <svg className={`${prefix}bd-placeholder-img ${prefix}flex-shrink-0 ${prefix}me-2 ${prefix}rounded`} width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
      <div className={`${prefix}pb-3 ${prefix}mb-0 ${prefix}small ${prefix}lh-sm ${prefix}border-bottom ${prefix}w-100`}>
        <div className={`${prefix}d-flex ${prefix}justify-content-between`}>
          <strong className={`${prefix}text-gray-dark`}>Full Name</strong>
          <a href="#">Follow</a>
        </div>
        <span className={`${prefix}d-block`}>@username</span>
      </div>
    </div>
    <small className={`${prefix}d-block ${prefix}text-end ${prefix}mt-3`}>
      <a href="#">All suggestions</a>
    </small>
  </div>
</main>


    </>
  )
}
