import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      {/* <link href="navbars-offcanvas.css" rel="stylesheet"> */}

<main>
  <nav className={`${prefix}navbar ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Dark offcanvas navbar">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Dark offcanvas navbar</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>
      <div className={`${prefix}offcanvas ${prefix}offcanvas-end ${prefix}text-bg-dark`} tabIndex={-1} id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarDarkLabel">
        <div className={`${prefix}offcanvas-header`}>
          <h5 className={`${prefix}offcanvas-title`} id="offcanvasNavbarDarkLabel">Offcanvas</h5>
          <button type="button" className={`${prefix}btn-close ${prefix}btn-close-white`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className={`${prefix}offcanvas-body`}>
          <ul className={`${prefix}navbar-nav ${prefix}justify-content-end ${prefix}flex-grow-1 ${prefix}pe-3`}>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
            </li>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link`} href="#">Link</a>
            </li>
            <li className={`${prefix}nav-item ${prefix}dropdown`}>
              <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className={`${prefix}dropdown-menu`}>
                <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
                <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
                <li>
                  <hr className={`${prefix}dropdown-divider`}/>
                </li>
                <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form className={`${prefix}d-flex ${prefix}mt-3`} role="search">
            <input className={`${prefix}form-control ${prefix}me-2`} type="search" placeholder="Search" aria-label="Search"/>
            <button className={`${prefix}btn ${prefix}btn-outline-success`} type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}bg-body-tertiary`} aria-label="Light offcanvas navbar">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Light offcanvas navbar</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarLight" aria-controls="offcanvasNavbarLight" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>
      <div className={`${prefix}offcanvas ${prefix}offcanvas-end`} tabIndex={-1} id="offcanvasNavbarLight" aria-labelledby="offcanvasNavbarLightLabel">
        <div className={`${prefix}offcanvas-header`}>
          <h5 className={`${prefix}offcanvas-title`} id="offcanvasNavbarLightLabel">Offcanvas</h5>
          <button type="button" className={`${prefix}btn-close`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className={`${prefix}offcanvas-body`}>
          <ul className={`${prefix}navbar-nav ${prefix}justify-content-end ${prefix}flex-grow-1 ${prefix}pe-3`}>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
            </li>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link`} href="#">Link</a>
            </li>
            <li className={`${prefix}nav-item ${prefix}dropdown`}>
              <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className={`${prefix}dropdown-menu`}>
                <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
                <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
                <li>
                  <hr className={`${prefix}dropdown-divider`}/>
                </li>
                <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form className={`${prefix}d-flex ${prefix}mt-3`} role="search">
            <input className={`${prefix}form-control ${prefix}me-2`} type="search" placeholder="Search" aria-label="Search"/>
            <button className={`${prefix}btn ${prefix}btn-outline-success`} type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Offcanvas navbar large">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Responsive offcanvas navbar</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>
      <div className={`${prefix}offcanvas ${prefix}offcanvas-end ${prefix}text-bg-dark`} tabIndex={-1} id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
        <div className={`${prefix}offcanvas-header`}>
          <h5 className={`${prefix}offcanvas-title`} id="offcanvasNavbar2Label">Offcanvas</h5>
          <button type="button" className={`${prefix}btn-close ${prefix}btn-close-white`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className={`${prefix}offcanvas-body`}>
          <ul className={`${prefix}navbar-nav ${prefix}justify-content-end ${prefix}flex-grow-1 ${prefix}pe-3`}>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
            </li>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link`} href="#">Link</a>
            </li>
            <li className={`${prefix}nav-item ${prefix}dropdown`}>
              <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className={`${prefix}dropdown-menu`}>
                <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
                <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
                <li>
                  <hr className={`${prefix}dropdown-divider`}/>
                </li>
                <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form className={`${prefix}d-flex ${prefix}mt-3 ${prefix}mt-lg-0`} role="search">
            <input className={`${prefix}form-control ${prefix}me-2`} type="search" placeholder="Search" aria-label="Search" />
            <button className={`${prefix}btn ${prefix}btn-outline-success`} type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </nav>

  <div className={`${prefix}container ${prefix}my-5`}>
    <div className={`${prefix}bg-body-tertiary ${prefix}p-5 ${prefix}rounded`}>
      <div className={`${prefix}col-sm-8 ${prefix}py-5 ${prefix}mx-auto`}>
        <h1 className={`${prefix}display-5 ${prefix}fw-normal`}>Navbar with offcanvas examples</h1>
        <p className={`${prefix}fs-5`}>This example shows how responsive offcanvas menus work within the navbar. For positioning of navbars, checkout the <a href="../examples/navbar-static/">top</a> and <a href="../examples/navbar-fixed/">fixed top</a> examples.</p>
        <p>From the top down, you'll see a dark navbar, light navbar and a responsive navbar—each with offcanvases built in. Resize your browser window to the large breakpoint to see the toggle for the offcanvas.</p>
        <p>
          <a className={`${prefix}btn ${prefix}btn-primary`} href="../components/navbar/#offcanvas" role="button">Learn more about offcanvas navbars &raquo;</a>
        </p>
    </div>
    </div>
  </div>
</main>


    </>
  )
}
