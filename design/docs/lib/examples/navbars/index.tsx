import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      {/* <link href="navbars.css" rel="stylesheet"> */}

<main>
  <nav className={`${prefix}navbar ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="First navbar example">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Never expand</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExample01">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className={`${prefix}dropdown-menu`}>
              <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form role="search">
          <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}navbar-expand ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Second navbar example">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Always expand</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExample02">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
        </ul>
        <form role="search">
          <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}navbar-expand-sm ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Third navbar example">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Expand at sm</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExample03">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-sm-0`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className={`${prefix}dropdown-menu`}>
              <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form role="search">
          <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}navbar-expand-md ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Fourth navbar example">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Expand at md</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExample04">
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
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className={`${prefix}dropdown-menu`}>
              <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form role="search">
          <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Fifth navbar example">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Expand at lg</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExample05">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-lg-0`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className={`${prefix}dropdown-menu`}>
              <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form role="search">
          <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}navbar-expand-xl ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Sixth navbar example">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Expand at xl</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample06" aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExample06">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-xl-0`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className={`${prefix}dropdown-menu`}>
              <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form role="search">
          <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}navbar-expand-xxl ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Seventh navbar example">
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Expand at xxl</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleXxl" aria-controls="navbarsExampleXxl" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExampleXxl">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-xl-0`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className={`${prefix}dropdown-menu`}>
              <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form role="search">
          <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Eighth navbar example">
    <div className={`${prefix}container`}>
      <a className={`${prefix}navbar-brand`} href="#">Container</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExample07">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-lg-0`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className={`${prefix}dropdown-menu`}>
              <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form role="search">
          <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>
  </nav>

  <nav className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Ninth navbar example">
    <div className={`${prefix}container-xl`}>
      <a className={`${prefix}navbar-brand`} href="#">Container XL</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExample07XL">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-lg-0`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul className={`${prefix}dropdown-menu`}>
              <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
              <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form role="search">
          <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </div>
  </nav>

  <div className={`${prefix}container-xl ${prefix}mb-4`}>
    <p>Matching .container-xl...</p>
  </div>

  <nav className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}navbar-dark ${prefix}bg-dark`} aria-label="Tenth navbar example">
    <div className={`${prefix}container-fluid`}>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>

      <div className={`${prefix}collapse ${prefix}navbar-collapse ${prefix}justify-content-md-center`} id="navbarsExample08">
        <ul className={`${prefix}navbar-nav`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Centered nav only</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
          <li className={`${prefix}nav-item ${prefix}dropdown`}>
            <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
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

  <div className={`${prefix}container`}>
    <nav className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}bg-body-tertiary ${prefix}rounded`} aria-label="Eleventh navbar example">
      <div className={`${prefix}container-fluid`}>
        <a className={`${prefix}navbar-brand`} href="#">Navbar</a>
        <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
          <span className={`${prefix}navbar-toggler-icon`}></span>
        </button>

        <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarsExample09">
          <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-lg-0`}>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
            </li>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link`} href="#">Link</a>
            </li>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
            </li>
            <li className={`${prefix}nav-item ${prefix}dropdown`}>
              <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
              <ul className={`${prefix}dropdown-menu`}>
                <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
                <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
                <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form role="search">
            <input className={`${prefix}form-control`} type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
      </div>
    </nav>

    <nav className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}bg-body-tertiary ${prefix}rounded`} aria-label="Twelfth navbar example">
      <div className={`${prefix}container-fluid`}>
        <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
          <span className={`${prefix}navbar-toggler-icon`}></span>
        </button>

        <div className={`${prefix}collapse ${prefix}navbar-collapse ${prefix}justify-content-md-center`} id="navbarsExample10">
          <ul className={`${prefix}navbar-nav`}>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Centered nav only</a>
            </li>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link`} href="#">Link</a>
            </li>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
            </li>
            <li className={`${prefix}nav-item ${prefix}dropdown`}>
              <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
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

    <nav className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}bg-body-tertiary ${prefix}rounded`} aria-label="Thirteenth navbar example">
      <div className={`${prefix}container-fluid`}>
        <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span className={`${prefix}navbar-toggler-icon`}></span>
        </button>

        <div className={`${prefix}collapse ${prefix}navbar-collapse ${prefix}d-lg-flex`} id="navbarsExample11">
          <a className={`${prefix}navbar-brand ${prefix}col-lg-3 ${prefix}me-0`} href="#">Centered nav</a>
          <ul className={`${prefix}navbar-nav ${prefix}col-lg-6 ${prefix}justify-content-lg-center`}>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
            </li>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link`} href="#">Link</a>
            </li>
            <li className={`${prefix}nav-item`}>
              <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
            </li>
            <li className={`${prefix}nav-item ${prefix}dropdown`}>
              <a className={`${prefix}nav-link ${prefix}dropdown-toggle`} href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
              <ul className={`${prefix}dropdown-menu`}>
                <li><a className={`${prefix}dropdown-item`} href="#">Action</a></li>
                <li><a className={`${prefix}dropdown-item`} href="#">Another action</a></li>
                <li><a className={`${prefix}dropdown-item`} href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <div className={`${prefix}d-lg-flex ${prefix}col-lg-3 ${prefix}justify-content-lg-end`}>
            <button className={`${prefix}btn ${prefix}btn-primary`}>Button</button>
          </div>
        </div>
      </div>
    </nav>

    <div>
      <div className={`${prefix}bg-body-tertiaryp-5 ${prefix}rounded`}>
        <div className={`${prefix}col-sm-8 ${prefix}mx-auto`}>
          <h1>Navbar examples</h1>
          <p>This example is a quick exercise to illustrate how the navbar and its contents work. Some navbars extend the width of the viewport, others are confined within a <code>.container</code>. For positioning of navbars, checkout the <a href="../examples/navbar-static/">top</a> and <a href="../examples/navbar-fixed/">fixed top</a> examples.</p>
          <p>At the smallest breakpoint, the collapse plugin is used to hide the links and show a menu button to toggle the collapsed content.</p>
        </div>
      </div>
    </div>
  </div>
</main>


    </>
  )
}
