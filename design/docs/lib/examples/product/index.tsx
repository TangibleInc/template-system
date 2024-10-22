import React from 'react'
export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      {/* <link href="product.css" rel="stylesheet"> */}

      <svg xmlns='http://www.w3.org/2000/svg' className={`${prefix}d-none`}>
        <symbol
          id='aperture'
          fill='none'
          stroke='currentColor'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='2'
          viewBox='0 0 24 24'
        >
          <circle cx='12' cy='12' r='10' />
          <path d='M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94' />
        </symbol>
        <symbol id='cart' viewBox='0 0 16 16'>
          <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
        </symbol>
        <symbol id='chevron-right' viewBox='0 0 16 16'>
          <path
            fill-rule='evenodd'
            d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
          />
        </symbol>
      </svg>

      <nav
        className={`${prefix}navbar ${prefix}navbar-expand-md ${prefix}bg-dark ${prefix}sticky-top ${prefix}border-bottom`}
        data-bs-theme='dark'
      >
        <div className={`${prefix}container`}>
          <a className={`${prefix}navbar-brand ${prefix}d-md-none`} href='#'>
            <svg className={`${prefix}bi`} width='24' height='24'>
              <use xlinkHref='#aperture' />
            </svg>
            Aperture
          </a>
          <button
            className={`${prefix}navbar-toggler`}
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvas'
            aria-controls='#offcanvas'
            aria-label='Toggle navigation'
          >
            <span className={`${prefix}navbar-toggler-icon`}></span>
          </button>
          <div
            className={`${prefix}offcanvas ${prefix}offcanvas-end`}
            tabIndex={-1}
            id='#offcanvas'
            aria-labelledby='#offcanvasLabel'
          >
            <div className={`${prefix}offcanvas-header`}>
              <h5 className={`${prefix}offcanvas-title`} id='#offcanvasLabel'>
                Aperture
              </h5>
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <div className={`${prefix}offcanvas-body`}>
              <ul
                className={`${prefix}navbar-nav ${prefix}flex-grow-1 ${prefix}justify-content-between`}
              >
                <li className={`${prefix}nav-item`}>
                  <a className={`${prefix}nav-link`} href='#'>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#aperture' />
                    </svg>
                  </a>
                </li>
                <li className={`${prefix}nav-item`}>
                  <a className={`${prefix}nav-link`} href='#'>
                    Tour
                  </a>
                </li>
                <li className={`${prefix}nav-item`}>
                  <a className={`${prefix}nav-link`} href='#'>
                    Product
                  </a>
                </li>
                <li className={`${prefix}nav-item`}>
                  <a className={`${prefix}nav-link`} href='#'>
                    Features
                  </a>
                </li>
                <li className={`${prefix}nav-item`}>
                  <a className={`${prefix}nav-link`} href='#'>
                    Enterprise
                  </a>
                </li>
                <li className={`${prefix}nav-item`}>
                  <a className={`${prefix}nav-link`} href='#'>
                    Support
                  </a>
                </li>
                <li className={`${prefix}nav-item`}>
                  <a className={`${prefix}nav-link`} href='#'>
                    Pricing
                  </a>
                </li>
                <li className={`${prefix}nav-item`}>
                  <a className={`${prefix}nav-link`} href='#'>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#cart' />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <main>

        <div
          className={`${prefix}d-md-flex ${prefix}flex-md-equal ${prefix}w-100 ${prefix}my-md-3 ${prefix}ps-md-3`}
        >
          <div
            className={`${prefix}text-bg-dark ${prefix}me-md-3 ${prefix}pt-3 ${prefix}px-3 ${prefix}pt-md-5 ${prefix}px-md-5 ${prefix}text-center ${prefix}overflow-hidden`}
          >
            <div className={`${prefix}my-3 ${prefix}py-3`}>
              <h2 className={`${prefix}display-5`}>Another headline</h2>
              <p className={`${prefix}lead`}>And an even wittier subheading.</p>
            </div>
            <div
              className={`${prefix}bg-body-tertiary ${prefix}shadow-sm ${prefix}mx-auto`}
              style={{
                width: '80%',
                height: '300px',
                borderRadius: '21px 21px 0 0;',
              }}
            ></div>
          </div>
          <div
            className={`${prefix}bg-body-tertiary ${prefix}me-md-3 ${prefix}pt-3 ${prefix}px-3 ${prefix}pt-md-5 ${prefix}px-md-5 ${prefix}text-center ${prefix}overflow-hidden`}
          >
            <div className={`${prefix}my-3 ${prefix}p-3`}>
              <h2 className={`${prefix}display-5`}>Another headline</h2>
              <p className={`${prefix}lead`}>And an even wittier subheading.</p>
            </div>
            <div
              className={`${prefix}bg-dark ${prefix}shadow-sm ${prefix}mx-auto`}
              style={{
                width: '80%',
                height: '300px',
                borderRadius: '21px 21px 0 0',
              }}
            ></div>
          </div>
        </div>

        <div
          className={`${prefix}d-md-flex ${prefix}flex-md-equal ${prefix}w-100 ${prefix}my-md-3 ${prefix}ps-md-3`}
        >
          <div
            className={`${prefix}bg-body-tertiary ${prefix}me-md-3 ${prefix}pt-3 ${prefix}px-3 ${prefix}pt-md-5 ${prefix}px-md-5 ${prefix}text-center ${prefix}overflow-hidden`}
          >
            <div className={`${prefix}my-3 ${prefix}p-3`}>
              <h2 className={`${prefix}display-5`}>Another headline</h2>
              <p className={`${prefix}lead`}>And an even wittier subheading.</p>
            </div>
            <div
              className={`${prefix}bg-dark ${prefix}shadow-sm ${prefix}mx-auto`}
              style={{
                width: '80%',
                height: '300px',
                borderRadius: '21px 21px 0 0',
              }}
            ></div>
          </div>
          <div
            className={`${prefix}text-bg-primary ${prefix}me-md-3 ${prefix}pt-3 ${prefix}px-3 ${prefix}pt-md-5 ${prefix}px-md-5 ${prefix}text-center ${prefix}overflow-hidden`}
          >
            <div className={`${prefix}my-3 ${prefix}py-3`}>
              <h2 className={`${prefix}display-5`}>Another headline</h2>
              <p className={`${prefix}lead`}>And an even wittier subheading.</p>
            </div>
            <div
              className={`${prefix}bg-body-tertiary ${prefix}shadow-sm ${prefix}mx-auto`}
              style={{
                width: '80%',
                height: '300px',
                borderRadius: '21px 21px 0 0',
              }}
            ></div>
          </div>
        </div>

        <div
          className={`${prefix}d-md-flex ${prefix}flex-md-equal ${prefix}w-100 ${prefix}my-md-3 ${prefix}ps-md-3`}
        >
          <div
            className={`${prefix}bg-body-tertiary ${prefix}me-md-3 ${prefix}pt-3 ${prefix}px-3 ${prefix}pt-md-5 ${prefix}px-md-5 ${prefix}text-center ${prefix}overflow-hidden`}
          >
            <div className={`${prefix}my-3 ${prefix}p-3`}>
              <h2 className={`${prefix}display-5`}>Another headline</h2>
              <p className={`${prefix}lead`}>And an even wittier subheading.</p>
            </div>
            <div
              className={`${prefix}bg-body ${prefix}shadow-sm ${prefix}mx-auto`}
              style={{
                width: '80%',
                height: '300px',
                borderRadius: '21px 21px 0 0',
              }}
            ></div>
          </div>
          <div
            className={`${prefix}bg-body-tertiary ${prefix}me-md-3 ${prefix}pt-3 ${prefix}px-3 ${prefix}pt-md-5 ${prefix}px-md-5 ${prefix}text-center ${prefix}overflow-hidden`}
          >
            <div className={`${prefix}my-3 ${prefix}py-3`}>
              <h2 className={`${prefix}display-5`}>Another headline</h2>
              <p className={`${prefix}lead`}>And an even wittier subheading.</p>
            </div>
            <div
              className={`${prefix}bg-body ${prefix}shadow-sm ${prefix}mx-auto`}
              style={{
                width: '80%',
                height: '300px',
                borderRadius: '21px 21px 0 0',
              }}
            ></div>
          </div>
        </div>

        <div
          className={`${prefix}d-md-flex ${prefix}flex-md-equal ${prefix}w-100 ${prefix}my-md-3 ${prefix}ps-md-3`}
        >
          <div
            className={`${prefix}bg-body-tertiary ${prefix}me-md-3 ${prefix}pt-3 ${prefix}px-3 ${prefix}pt-md-5 ${prefix}px-md-5 ${prefix}text-center ${prefix}overflow-hidden`}
          >
            <div className={`${prefix}my-3 ${prefix}p-3`}>
              <h2 className={`${prefix}display-5`}>Another headline</h2>
              <p className={`${prefix}lead`}>And an even wittier subheading.</p>
            </div>
            <div
              className={`${prefix}bg-body ${prefix}shadow-sm ${prefix}mx-auto`}
              style={{
                width: '80%',
                height: '300px',
                borderRadius: '21px 21px 0 0',
              }}
            ></div>
          </div>
          <div
            className={`${prefix}bg-body-tertiary ${prefix}me-md-3 ${prefix}pt-3 ${prefix}px-3 ${prefix}pt-md-5 ${prefix}px-md-5 ${prefix}text-center ${prefix}overflow-hidden`}
          >
            <div className={`${prefix}my-3 ${prefix}py-3`}>
              <h2 className={`${prefix}display-5`}>Another headline</h2>
              <p className={`${prefix}lead`}>And an even wittier subheading.</p>
            </div>
            <div
              className={`${prefix}bg-body ${prefix}shadow-sm ${prefix}mx-auto`}
              style={{
                width: '80%',
                height: '300px',
                borderRadius: '21px 21px 0 0',
              }}
            ></div>
          </div>
        </div>
      </main>

      <footer className={`${prefix}container ${prefix}py-5`}>
        <div className={`${prefix}row`}>
          <div className={`${prefix}col-12 ${prefix}col-md`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              className={`${prefix}d-block ${prefix}mb-2`}
              role='img'
              viewBox='0 0 24 24'
            >
              <title>Product</title>
              <circle cx='12' cy='12' r='10' />
              <path d='M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94' />
            </svg>
            <small
              className={`${prefix}d-block ${prefix}mb-3 ${prefix}text-body-secondary`}
            >
              &copy; 2017–2023
            </small>
          </div>
          <div className={`${prefix}col-6 ${prefix}col-md`}>
            <h5>Features</h5>
            <ul className={`${prefix}list-unstyled ${prefix}text-small`}>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Cool stuff
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Random feature
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Team feature
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Stuff for developers
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Another one
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Last time
                </a>
              </li>
            </ul>
          </div>
          <div className={`${prefix}col-6 ${prefix}col-md`}>
            <h5>Resources</h5>
            <ul className={`${prefix}list-unstyled ${prefix}text-small`}>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Resource name
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Resource
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Another resource
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Final resource
                </a>
              </li>
            </ul>
          </div>
          <div className={`${prefix}col-6 ${prefix}col-md`}>
            <h5>Resources</h5>
            <ul className={`${prefix}list-unstyled ${prefix}text-small`}>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Business
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Education
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Government
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Gaming
                </a>
              </li>
            </ul>
          </div>
          <div className={`${prefix}col-6 ${prefix}col-md`}>
            <h5>About</h5>
            <ul className={`${prefix}list-unstyled ${prefix}text-small`}>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Locations
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                  href='#'
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}
