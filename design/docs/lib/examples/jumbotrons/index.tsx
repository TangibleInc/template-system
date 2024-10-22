import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      
{/* <link href="jumbotrons.css" rel="stylesheet"> */}

<svg xmlns="http://www.w3.org/2000/svg" className={`${prefix}d-none`}>
  <symbol id="bootstrap" viewBox="0 0 118 94">
    <title>Example</title>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path>
  </symbol>
  <symbol id="arrow-right-short" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
  </symbol>
  <symbol id="check2-circle" viewBox="0 0 16 16">
    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
  </symbol>
</svg>

<div className={`${prefix}container ${prefix}my-5`}>
  <div className={`${prefix}p-5 ${prefix}text-center ${prefix}bg-body-tertiary ${prefix}rounded-3`}>
    <svg className={`${prefix}bi ${prefix}mt-4 ${prefix}mb-3`} style={{color: "var(--bs-indigo)"}} width="100" height="100"><use xlinkHref="#bootstrap"/></svg>
    <h1 className={`${prefix}text-body-emphasis`}>Jumbotron with icon</h1>
    <p className={`${prefix}col-lg-8 ${prefix}mx-auto ${prefix}fs-5 ${prefix}text-muted`}>
      This is a custom jumbotron featuring an SVG image at the top, some longer text that wraps early thanks to a responsive <code>.col-*</code> class, and a customized call to action.
    </p>
    <div className={`${prefix}d-inline-flex ${prefix}gap-2 ${prefix}mb-5`}>
      <button className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}btn ${prefix}btn-primary ${prefix}btn-lg ${prefix}px-4 ${prefix}rounded-pill`} type="button">
        Call to action
        <svg className={`${prefix}bi ${prefix}ms-2`} width="24" height="24"><use xlinkHref="#arrow-right-short"/></svg>
      </button>
      <button className={`${prefix}btn ${prefix}btn-outline-secondary ${prefix}btn-lg ${prefix}px-4 ${prefix}rounded-pill`} type="button">
        Secondary link
      </button>
    </div>
  </div>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}container ${prefix}my-5`}>
  <div className={`${prefix}position-relative ${prefix}p-5 ${prefix}text-center ${prefix}text-muted ${prefix}bg-body ${prefix}border ${prefix}border-dashed ${prefix}rounded-5`}>
    <button type="button" className={`${prefix}position-absolute ${prefix}top-0 ${prefix}end-0 ${prefix}p-3 ${prefix}m-3 ${prefix}btn-close ${prefix}bg-secondary ${prefix}bg-opacity-10 ${prefix}rounded-pill`} aria-label="Close"></button>
    <svg className={`${prefix}bi ${prefix}mt-5 ${prefix}mb-3`} width="48" height="48"><use xlinkHref="#check2-circle"/></svg>
    <h1 className={`${prefix}text-body-emphasis`}>Placeholder jumbotron</h1>
    <p className={`${prefix}col-lg-6 ${prefix}mx-auto ${prefix}mb-4`}>
      This faded back jumbotron is useful for placeholder content. It's also a great way to add a bit of context to a page or section when no content is available and to encourage visitors to take a specific action.
    </p>
    <button className={`${prefix}btn ${prefix}btn-primary ${prefix}px-5 ${prefix}mb-5`} type="button">
      Call to action
    </button>
  </div>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}my-5`}>
  <div className={`${prefix}p-5 ${prefix}text-center ${prefix}bg-body-tertiary`}>
    <div className={`${prefix}container ${prefix}py-5`}>
      <h1 className={`${prefix}text-body-emphasis`}>Full-width jumbotron</h1>
      <p className={`${prefix}col-lg-8 ${prefix}mx-auto ${prefix}lead`}>
        This takes the basic jumbotron above and makes its background edge-to-edge with a <code>.container</code> inside to align content. Similar to above, it's been recreated with built-in grid and utility classes.
      </p>
    </div>
  </div>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}container ${prefix}my-5`}>
  <div className={`${prefix}p-5 ${prefix}text-center ${prefix}bg-body-tertiary ${prefix}rounded-3`}>
    <h1 className={`${prefix}text-body-emphasis`}>Basic jumbotron</h1>
    <p className={`${prefix}lead`}>
      This is a simple Example jumbotron that sits within a <code>.container</code>, recreated with built-in utility classes.
    </p>
  </div>
</div>

<div className={`${prefix}b-example-divider`}></div>


    </>
  )
}
