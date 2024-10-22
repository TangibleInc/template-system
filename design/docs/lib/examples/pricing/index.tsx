import React from 'react'
export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      {/* <link href="pricing.css" rel="stylesheet"> */}

      <svg xmlns='http://www.w3.org/2000/svg' className={`${prefix}d-none`}>
        <symbol id='check' viewBox='0 0 16 16'>
          <title>Check</title>
          <path d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z' />
        </symbol>
      </svg>

      <div className={`${prefix}container ${prefix}py-3`}>
        <header>
          <div
            className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}align-items-center ${prefix}pb-3 ${prefix}mb-4 ${prefix}border-bottom`}
          >
            <a
              href='/'
              className={`${prefix}d-flex ${prefix}align-items-center ${prefix}link-body-emphasis ${prefix}text-decoration-none`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='32'
                className={`${prefix}me-2`}
                viewBox='0 0 118 94'
                role='img'
              >
                <title>Example</title>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z'
                  fill='currentColor'
                ></path>
              </svg>
              <span className={`${prefix}fs-4`}>Pricing example</span>
            </a>

            <nav
              className={`${prefix}d-inline-flex ${prefix}mt-2 ${prefix}mt-md-0 ${prefix}ms-md-auto`}
            >
              <a
                className={`${prefix}me-3 ${prefix}py-2 ${prefix}link-body-emphasis ${prefix}text-decoration-none`}
                href='#'
              >
                Features
              </a>
              <a
                className={`${prefix}me-3 ${prefix}py-2 ${prefix}link-body-emphasis ${prefix}text-decoration-none`}
                href='#'
              >
                Enterprise
              </a>
              <a
                className={`${prefix}me-3 ${prefix}py-2 ${prefix}link-body-emphasis ${prefix}text-decoration-none`}
                href='#'
              >
                Support
              </a>
              <a
                className={`${prefix}py-2 ${prefix}link-body-emphasis ${prefix}text-decoration-none`}
                href='#'
              >
                Pricing
              </a>
            </nav>
          </div>

          <div
            className={`${prefix}pricing-header ${prefix}p-3 ${prefix}pb-md-4 ${prefix}mx-auto ${prefix}text-center`}
          >
            <h1
              className={`${prefix}display-4 ${prefix}fw-normal ${prefix}text-body-emphasis`}
            >
              Pricing
            </h1>
            <p className={`${prefix}fs-5 ${prefix}text-body-secondary`}>
              Quickly build an effective pricing table for your potential
              customers with this Example example. It’s built with default
              Example components and utilities with little customization.
            </p>
          </div>
        </header>

        <main>
          <div
            className={`${prefix}row ${prefix}row-cols-1 ${prefix}row-cols-md-3 ${prefix}mb-3 ${prefix}text-center`}
          >
            <div className={`${prefix}col`}>
              <div
                className={`${prefix}card ${prefix}mb-4 ${prefix}rounded-3 ${prefix}shadow-sm`}
              >
                <div className={`${prefix}card-header ${prefix}py-3`}>
                  <h4 className={`${prefix}my-0 ${prefix}fw-normal`}>Free</h4>
                </div>
                <div className={`${prefix}card-body`}>
                  <h1
                    className={`${prefix}card-title ${prefix}pricing-card-title`}
                  >
                    $0
                    <small
                      className={`${prefix}text-body-secondary ${prefix}fw-light`}
                    >
                      /mo
                    </small>
                  </h1>
                  <ul
                    className={`${prefix}list-unstyled ${prefix}mt-3 ${prefix}mb-4`}
                  >
                    <li>10 users included</li>
                    <li>2 GB of storage</li>
                    <li>Email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button
                    type='button'
                    className={`${prefix}w-100 ${prefix}btn ${prefix}btn-lg ${prefix}btn-outline-primary`}
                  >
                    Sign up for free
                  </button>
                </div>
              </div>
            </div>
            <div className={`${prefix}col`}>
              <div
                className={`${prefix}card ${prefix}mb-4 ${prefix}rounded-3 ${prefix}shadow-sm`}
              >
                <div className={`${prefix}card-header ${prefix}py-3`}>
                  <h4 className={`${prefix}my-0 ${prefix}fw-normal`}>Pro</h4>
                </div>
                <div className={`${prefix}card-body`}>
                  <h1
                    className={`${prefix}card-title ${prefix}pricing-card-title`}
                  >
                    $15
                    <small
                      className={`${prefix}text-body-secondary ${prefix}fw-light`}
                    >
                      /mo
                    </small>
                  </h1>
                  <ul
                    className={`${prefix}list-unstyled ${prefix}mt-3 ${prefix}mb-4`}
                  >
                    <li>20 users included</li>
                    <li>10 GB of storage</li>
                    <li>Priority email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button
                    type='button'
                    className={`${prefix}w-100 ${prefix}btn ${prefix}btn-lg ${prefix}btn-primary`}
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
            <div className={`${prefix}col`}>
              <div
                className={`${prefix}card ${prefix}mb-4 ${prefix}rounded-3 ${prefix}shadow-sm ${prefix}border-primary`}
              >
                <div
                  className={`${prefix}card-header ${prefix}py-3 ${prefix}text-bg-primary ${prefix}border-primary`}
                >
                  <h4 className={`${prefix}my-0 ${prefix}fw-normal`}>
                    Enterprise
                  </h4>
                </div>
                <div className={`${prefix}card-body`}>
                  <h1
                    className={`${prefix}card-title ${prefix}pricing-card-title`}
                  >
                    $29
                    <small
                      className={`${prefix}text-body-secondary ${prefix}fw-light`}
                    >
                      /mo
                    </small>
                  </h1>
                  <ul
                    className={`${prefix}list-unstyled ${prefix}mt-3 ${prefix}mb-4`}
                  >
                    <li>30 users included</li>
                    <li>15 GB of storage</li>
                    <li>Phone and email support</li>
                    <li>Help center access</li>
                  </ul>
                  <button
                    type='button'
                    className={`${prefix}w-100 ${prefix}btn ${prefix}btn-lg ${prefix}btn-primary`}
                  >
                    Contact us
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h2
            className={`${prefix}display-6 ${prefix}text-center ${prefix}mb-4`}
          >
            Compare plans
          </h2>

          <div className={`${prefix}table-responsive`}>
            <table className={`${prefix}table ${prefix}text-center`}>
              <thead>
                <tr>
                  <th style={{ width: '34%' }}></th>
                  <th style={{ width: '22%' }}>Free</th>
                  <th style={{ width: '22%' }}>Pro</th>
                  <th style={{ width: '22%' }}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row' className={`${prefix}text-start`}>
                    Public
                  </th>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <th scope='row' className={`${prefix}text-start`}>
                    Private
                  </th>
                  <td></td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th scope='row' className={`${prefix}text-start`}>
                    Permissions
                  </th>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <th scope='row' className={`${prefix}text-start`}>
                    Sharing
                  </th>
                  <td></td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <th scope='row' className={`${prefix}text-start`}>
                    Unlimited members
                  </th>
                  <td></td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <th scope='row' className={`${prefix}text-start`}>
                    Extra security
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <svg className={`${prefix}bi`} width='24' height='24'>
                      <use xlinkHref='#check' />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

        <footer
          className={`${prefix}pt-4 ${prefix}my-md-5 ${prefix}pt-md-5 ${prefix}border-top`}
        >
          <div className={`${prefix}row`}>
            <div className={`${prefix}col-12 ${prefix}col-md`}>
              <img
                className={`${prefix}mb-2`}
                src='/img/logo.svg'
                alt=''
                width='24'
                height='19'
              />
              <small
                className={`${prefix}d-block ${prefix}mb-3 ${prefix}text-body-secondary`}
              >
                &copy; 2017–2023
              </small>
            </div>
            <div className={`${prefix}col-6 ${prefix}col-md`}>
              <h5>Features</h5>
              <ul className={`${prefix}list-unstyled ${prefix}text-small`}>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Cool stuff
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Random feature
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Team feature
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Stuff for developers
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Another one
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
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
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Resource
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Resource name
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Another resource
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
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
              <h5>About</h5>
              <ul className={`${prefix}list-unstyled ${prefix}text-small`}>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Team
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Locations
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
                  <a
                    className={`${prefix}link-secondary ${prefix}text-decoration-none`}
                    href='#'
                  >
                    Privacy
                  </a>
                </li>
                <li className={`${prefix}mb-1`}>
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
      </div>
    </>
  )
}
