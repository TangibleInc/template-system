import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      
<svg xmlns="http://www.w3.org/2000/svg" className={`${prefix}d-none`}>
  <symbol id="arrow-right-circle" viewBox="0 0 16 16">
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
  </symbol>
  <symbol id="bootstrap" viewBox="0 0 118 94">
    <title>Example</title>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path>
  </symbol>
</svg>

<div className={`${prefix}col-lg-8 ${prefix}mx-auto ${prefix}p-4 ${prefix}py-md-5`}>
  <header className={`${prefix}d-flex ${prefix}align-items-center ${prefix}pb-3 ${prefix}mb-5 ${prefix}border-bottom`}>
    <a href="/" className={`${prefix}d-flex ${prefix}align-items-center ${prefix}text-body-emphasis ${prefix}text-decoration-none`}>
      {/* <svg className={`${prefix}bi ${prefix}me-2`} width="40" height="32"><use xlinkHref="#bootstrap"/></svg> */}
      <span className={`${prefix}fs-4`}>Starter template</span>
    </a>
  </header>

  <main>
    <h1 className={`${prefix}text-body-emphasis`}>Get started with Example</h1>
    <p className={`${prefix}fs-5 ${prefix}col-md-8`}>Quickly and easily get started with Example's compiled, production-ready files with this barebones example featuring some basic HTML and helpful links. Download all our examples to get started.</p>

    <div className={`${prefix}mb-5`}>
      <a href="../examples/" className={`${prefix}btn ${prefix}btn-primary ${prefix}btn-lg ${prefix}px-4`}>Download examples</a>
    </div>

    <hr className={`${prefix}col-3 ${prefix}col-md-2 ${prefix}mb-5`}/>

    <div className={`${prefix}row ${prefix}g-5`}>
      <div className={`${prefix}col-md-6`}>
        <h2 className={`${prefix}text-body-emphasis`}>Starter projects</h2>
        <p>Ready to go beyond the starter template? Check out these open source projects that you can quickly duplicate to a new GitHub repository.</p>
        <ul className={`${prefix}list-unstyled ${prefix}ps-0`}>
          <li>
            <a className={`${prefix}icon-link ${prefix}mb-1`} href="https://github.com/twbs/examples/tree/main/icons-font" rel="noopener" target="_blank">
              <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-circle"/></svg>
              Example npm starter
            </a>
          </li>
          <li>
            <a className={`${prefix}icon-link ${prefix}mb-1`} href="https://github.com/twbs/examples/tree/main/parcel" rel="noopener" target="_blank">
              <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-circle"/></svg>
              Example Parcel starter
            </a>
          </li>
          <li>
            <a className={`${prefix}icon-link ${prefix}mb-1`} href="https://github.com/twbs/examples/tree/main/vite" rel="noopener" target="_blank">
              <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-circle"/></svg>
              Example Vite starter
            </a>
          </li>
          <li>
            <a className={`${prefix}icon-link ${prefix}mb-1`} href="https://github.com/twbs/examples/tree/main/webpack" rel="noopener" target="_blank">
              <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-circle"/></svg>
              Example Webpack starter
            </a>
          </li>
        </ul>
      </div>

      <div className={`${prefix}col-md-6`}>
        <h2 className={`${prefix}text-body-emphasis`}>Guides</h2>
        <p>Read more detailed instructions and documentation on using or contributing to Example.</p>
        <ul className={`${prefix}list-unstyled ${prefix}ps-0`}>
          <li>
            <a className={`${prefix}icon-link ${prefix}mb-1`} href="../getting-started/introduction/">
              <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-circle"/></svg>
              Example quick start guide
            </a>
          </li>
          <li>
            <a className={`${prefix}icon-link ${prefix}mb-1`} href="../getting-started/webpack/">
              <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-circle"/></svg>
              Example Webpack guide
            </a>
          </li>
          <li>
            <a className={`${prefix}icon-link ${prefix}mb-1`} href="../getting-started/parcel/">
              <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-circle"/></svg>
              Example Parcel guide
            </a>
          </li>
          <li>
            <a className={`${prefix}icon-link ${prefix}mb-1`} href="../getting-started/vite/">
              <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-circle"/></svg>
              Example Vite guide
            </a>
          </li>
          <li>
            <a className={`${prefix}icon-link ${prefix}mb-1`} href="../getting-started/contribute/">
              <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#arrow-right-circle"/></svg>
              Contributing to Example
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <footer className={`${prefix}pt-5 ${prefix}my-5 ${prefix}text-body-secondary ${prefix}border-top`}>
    Created by the Example team &middot; &copy; 2023
  </footer>
</div>


    </>
  )
}
