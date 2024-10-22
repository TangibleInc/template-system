import React from 'react'
export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      {/* <link href="sidebars.css" rel="stylesheet">
<script src="sidebars.js"></script> */}

      <svg xmlns='http://www.w3.org/2000/svg' className={`${prefix}d-none`}>
        <symbol id='bootstrap' viewBox='0 0 118 94'>
          <title>Example</title>
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z'
          ></path>
        </symbol>
        <symbol id='home' viewBox='0 0 16 16'>
          <path d='M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z' />
        </symbol>
        <symbol id='speedometer2' viewBox='0 0 16 16'>
          <path d='M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z' />
          <path
            fill-rule='evenodd'
            d='M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z'
          />
        </symbol>
        <symbol id='table' viewBox='0 0 16 16'>
          <path d='M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z' />
        </symbol>
        <symbol id='people-circle' viewBox='0 0 16 16'>
          <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
          <path
            fill-rule='evenodd'
            d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
          />
        </symbol>
        <symbol id='grid' viewBox='0 0 16 16'>
          <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z' />
        </symbol>
      </svg>

      <main className={`${prefix}d-flex ${prefix}flex-nowrap`}>
        <h1 className={`${prefix}visually-hidden`}>Sidebars examples</h1>

        <div
          className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-shrink-0 ${prefix}p-3 ${prefix}text-bg-dark`}
          style={{
            width: '280px',
          }}
        >
          <a
            href='/'
            className={`${prefix}d-flex ${prefix}align-items-center ${prefix}mb-3 ${prefix}mb-md-0 ${prefix}me-md-auto ${prefix}text-white ${prefix}text-decoration-none`}
          >
            <svg
              className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
              width='40'
              height='32'
            >
              <use xlinkHref='#bootstrap' />
            </svg>
            <span className={`${prefix}fs-4`}>Sidebar</span>
          </a>
          <hr />
          <ul
            className={`${prefix}nav ${prefix}nav-pills ${prefix}flex-column ${prefix}mb-auto`}
          >
            <li className={`${prefix}nav-item`}>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}active`}
                aria-current='page'
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#home' />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a href='#' className={`${prefix}nav-link ${prefix}text-white`}>
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#speedometer2' />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href='#' className={`${prefix}nav-link ${prefix}text-white`}>
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#table' />
                </svg>
                Orders
              </a>
            </li>
            <li>
              <a href='#' className={`${prefix}nav-link ${prefix}text-white`}>
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#grid' />
                </svg>
                Products
              </a>
            </li>
            <li>
              <a href='#' className={`${prefix}nav-link ${prefix}text-white`}>
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#people-circle' />
                </svg>
                Customers
              </a>
            </li>
          </ul>
          <hr />
          <div className={`${prefix}dropdown`}>
            <a
              href='#'
              className={`${prefix}d-flex ${prefix}align-items-center ${prefix}text-white ${prefix}text-decoration-none ${prefix}dropdown-toggle`}
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <img
                src='/img/profile.png'
                alt=''
                width='32'
                height='32'
                className={`${prefix}rounded-circle ${prefix}me-2`}
              />
              <strong>mdo</strong>
            </a>
            <ul
              className={`${prefix}dropdown-menu ${prefix}dropdown-menu-dark ${prefix}text-small ${prefix}shadow`}
            >
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  New project...
                </a>
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Settings
                </a>
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Profile
                </a>
              </li>
              <li>
                <hr className={`${prefix}dropdown-divider`} />
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`${prefix}b-example-divider ${prefix}b-example-vr`}
        ></div>

        <div
          className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-shrink-0 ${prefix}p-3 ${prefix}bg-body-tertiary`}
          style={{
            width: '280px',
          }}
        >
          <a
            href='/'
            className={`${prefix}d-flex ${prefix}align-items-center ${prefix}mb-3 ${prefix}mb-md-0 ${prefix}me-md-auto ${prefix}link-body-emphasis ${prefix}text-decoration-none`}
          >
            <svg
              className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
              width='40'
              height='32'
            >
              <use xlinkHref='#bootstrap' />
            </svg>
            <span className={`${prefix}fs-4`}>Sidebar</span>
          </a>
          <hr />
          <ul
            className={`${prefix}nav ${prefix}nav-pills ${prefix}flex-column ${prefix}mb-auto`}
          >
            <li className={`${prefix}nav-item`}>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}active`}
                aria-current='page'
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#home' />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}link-body-emphasis`}
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#speedometer2' />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}link-body-emphasis`}
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#table' />
                </svg>
                Orders
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}link-body-emphasis`}
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#grid' />
                </svg>
                Products
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}link-body-emphasis`}
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
                  width='16'
                  height='16'
                >
                  <use xlinkHref='#people-circle' />
                </svg>
                Customers
              </a>
            </li>
          </ul>
          <hr />
          <div className={`${prefix}dropdown`}>
            <a
              href='#'
              className={`${prefix}d-flex ${prefix}align-items-center ${prefix}link-body-emphasis ${prefix}text-decoration-none ${prefix}dropdown-toggle`}
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <img
                src='/img/profile.png'
                alt=''
                width='32'
                height='32'
                className={`${prefix}rounded-circle ${prefix}me-2`}
              />
              <strong>mdo</strong>
            </a>
            <ul
              className={`${prefix}dropdown-menu ${prefix}text-small ${prefix}shadow`}
            >
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  New project...
                </a>
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Settings
                </a>
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Profile
                </a>
              </li>
              <li>
                <hr className={`${prefix}dropdown-divider`} />
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`${prefix}b-example-divider ${prefix}b-example-vr`}
        ></div>

        <div
          className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-shrink-0 ${prefix}bg-body-tertiary`}
          style={{
            width: '4.5rem',
          }}
        >
          <a
            href='/'
            className={`${prefix}d-block ${prefix}p-3 ${prefix}link-body-emphasis ${prefix}text-decoration-none`}
            title='Icon-only'
            data-bs-toggle='tooltip'
            data-bs-placement='right'
          >
            <svg
              className={`${prefix}bi ${prefix}pe-none`}
              width='40'
              height='32'
            >
              <use xlinkHref='#bootstrap' />
            </svg>
            <span className={`${prefix}visually-hidden`}>Icon-only</span>
          </a>
          <ul
            className={`${prefix}nav ${prefix}nav-pills ${prefix}nav-flush ${prefix}flex-column ${prefix}mb-auto ${prefix}text-center`}
          >
            <li className={`${prefix}nav-item`}>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}active ${prefix}py-3 ${prefix}border-bottom ${prefix}rounded-0`}
                aria-current='page'
                title='Home'
                data-bs-toggle='tooltip'
                data-bs-placement='right'
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none`}
                  width='24'
                  height='24'
                  role='img'
                  aria-label='Home'
                >
                  <use xlinkHref='#home' />
                </svg>
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}py-3 ${prefix}border-bottom ${prefix}rounded-0`}
                title='Dashboard'
                data-bs-toggle='tooltip'
                data-bs-placement='right'
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none`}
                  width='24'
                  height='24'
                  role='img'
                  aria-label='Dashboard'
                >
                  <use xlinkHref='#speedometer2' />
                </svg>
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}py-3 ${prefix}border-bottom ${prefix}rounded-0`}
                title='Orders'
                data-bs-toggle='tooltip'
                data-bs-placement='right'
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none`}
                  width='24'
                  height='24'
                  role='img'
                  aria-label='Orders'
                >
                  <use xlinkHref='#table' />
                </svg>
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}py-3 ${prefix}border-bottom ${prefix}rounded-0`}
                title='Products'
                data-bs-toggle='tooltip'
                data-bs-placement='right'
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none`}
                  width='24'
                  height='24'
                  role='img'
                  aria-label='Products'
                >
                  <use xlinkHref='#grid' />
                </svg>
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`${prefix}nav-link ${prefix}py-3 ${prefix}border-bottom ${prefix}rounded-0`}
                title='Customers'
                data-bs-toggle='tooltip'
                data-bs-placement='right'
              >
                <svg
                  className={`${prefix}bi ${prefix}pe-none`}
                  width='24'
                  height='24'
                  role='img'
                  aria-label='Customers'
                >
                  <use xlinkHref='#people-circle' />
                </svg>
              </a>
            </li>
          </ul>
          <div className={`${prefix}dropdown ${prefix}border-top`}>
            <a
              href='#'
              className={`${prefix}d-flex ${prefix}align-items-center ${prefix}justify-content-center ${prefix}p-3 ${prefix}link-body-emphasis ${prefix}text-decoration-none ${prefix}dropdown-toggle`}
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <img
                src='/img/profile.png'
                alt='mdo'
                width='24'
                height='24'
                className={`${prefix}rounded-circle`}
              />
            </a>
            <ul
              className={`${prefix}dropdown-menu ${prefix}text-small ${prefix}shadow`}
            >
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  New project...
                </a>
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Settings
                </a>
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Profile
                </a>
              </li>
              <li>
                <hr className={`${prefix}dropdown-divider`} />
              </li>
              <li>
                <a className={`${prefix}dropdown-item`} href='#'>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`${prefix}b-example-divider ${prefix}b-example-vr`}
        ></div>

        <div
          className={`${prefix}flex-shrink-0 ${prefix}p-3`}
          style={{
            width: '280px',
          }}
        >
          <a
            href='/'
            className={`${prefix}d-flex ${prefix}align-items-center ${prefix}pb-3 ${prefix}mb-3 ${prefix}link-body-emphasis ${prefix}text-decoration-none ${prefix}border-bottom`}
          >
            <svg
              className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
              width='30'
              height='24'
            >
              <use xlinkHref='#bootstrap' />
            </svg>
            <span className={`${prefix}fs-5 ${prefix}fw-semibold`}>
              Collapsible
            </span>
          </a>
          <ul className={`${prefix}list-unstyled ${prefix}ps-0`}>
            <li className={`${prefix}mb-1`}>
              <button
                className={`${prefix}btn ${prefix}btn-toggle ${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}border-0 ${prefix}collapsed`}
                data-bs-toggle='collapse'
                data-bs-target='#home-collapse'
                aria-expanded='true'
              >
                Home
              </button>
              <div
                className={`${prefix}collapse ${prefix}show`}
                id='home-collapse'
              >
                <ul
                  className={`${prefix}btn-toggle-nav ${prefix}list-unstyled ${prefix}fw-normal ${prefix}pb-1 ${prefix}small`}
                >
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Overview
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Updates
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Reports
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className={`${prefix}mb-1`}>
              <button
                className={`${prefix}btn ${prefix}btn-toggle ${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}border-0 ${prefix}collapsed`}
                data-bs-toggle='collapse'
                data-bs-target='#dashboard-collapse'
                aria-expanded='false'
              >
                Dashboard
              </button>
              <div className={`${prefix}collapse`} id='dashboard-collapse'>
                <ul
                  className={`${prefix}btn-toggle-nav ${prefix}list-unstyled ${prefix}fw-normal ${prefix}pb-1 ${prefix}small`}
                >
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Overview
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Weekly
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Monthly
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Annually
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className={`${prefix}mb-1`}>
              <button
                className={`${prefix}btn ${prefix}btn-toggle ${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}border-0 ${prefix}collapsed`}
                data-bs-toggle='collapse'
                data-bs-target='#orders-collapse'
                aria-expanded='false'
              >
                Orders
              </button>
              <div className={`${prefix}collapse`} id='orders-collapse'>
                <ul
                  className={`${prefix}btn-toggle-nav ${prefix}list-unstyled ${prefix}fw-normal ${prefix}pb-1 ${prefix}small`}
                >
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      New
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Processed
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Shipped
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Returned
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className={`${prefix}border-top ${prefix}my-3`}></li>
            <li className={`${prefix}mb-1`}>
              <button
                className={`${prefix}btn ${prefix}btn-toggle ${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}border-0 ${prefix}collapsed`}
                data-bs-toggle='collapse'
                data-bs-target='#account-collapse'
                aria-expanded='false'
              >
                Account
              </button>
              <div className={`${prefix}collapse`} id='account-collapse'>
                <ul
                  className={`${prefix}btn-toggle-nav ${prefix}list-unstyled ${prefix}fw-normal ${prefix}pb-1 ${prefix}small`}
                >
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      New...
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className={`${prefix}link-body-emphasis ${prefix}d-inline-flex ${prefix}text-decoration-none ${prefix}rounded`}
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div
          className={`${prefix}b-example-divider ${prefix}b-example-vr`}
        ></div>

        <div
          className={`${prefix}d-flex ${prefix}flex-column ${prefix}align-items-stretch ${prefix}flex-shrink-0 ${prefix}bg-body-tertiary`}
          style={{ width: '380px' }}
        >
          <a
            href='/'
            className={`${prefix}d-flex ${prefix}align-items-center ${prefix}flex-shrink-0 ${prefix}p-3 ${prefix}link-body-emphasis ${prefix}text-decoration-none ${prefix}border-bottom`}
          >
            <svg
              className={`${prefix}bi ${prefix}pe-none ${prefix}me-2`}
              width='30'
              height='24'
            >
              <use xlinkHref='#bootstrap' />
            </svg>
            <span className={`${prefix}fs-5 ${prefix}fw-semibold`}>
              List group
            </span>
          </a>
          <div
            className={`${prefix}list-group ${prefix}list-group-flush ${prefix}border-bottom ${prefix}scrollarea`}
          >
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}active ${prefix}py-3 ${prefix}lh-sm`}
              aria-current='true'
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small>Wed</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Tues</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Mon</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>

            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
              aria-current='true'
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Wed</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Tues</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Mon</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
              aria-current='true'
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Wed</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Tues</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Mon</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
              aria-current='true'
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Wed</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Tues</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
            <a
              href='#'
              className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}py-3 ${prefix}lh-sm`}
            >
              <div
                className={`${prefix}d-flex ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between`}
              >
                <strong className={`${prefix}mb-1`}>
                  List group item heading
                </strong>
                <small className={`${prefix}text-body-secondary`}>Mon</small>
              </div>
              <div className={`${prefix}col-10 ${prefix}mb-1 ${prefix}small`}>
                Some placeholder content in a paragraph below the heading and
                date.
              </div>
            </a>
          </div>
        </div>

        <div
          className={`${prefix}b-example-divider ${prefix}b-example-vr`}
        ></div>
      </main>
    </>
  )
}
