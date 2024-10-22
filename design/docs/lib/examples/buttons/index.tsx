import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      
<svg xmlns="http://www.w3.org/2000/svg" className={`${prefix}d-none`}>
  <symbol id="arrow-right-short" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
  </symbol>
  <symbol id="x-lg" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
    <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
  </symbol>
</svg>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}py-5`}>
  <button className={`${prefix}btn ${prefix}btn-primary ${prefix}rounded-pill ${prefix}px-3`} type="button">Primary</button>
  <button className={`${prefix}btn ${prefix}btn-secondary ${prefix}rounded-pill ${prefix}px-3`} type="button">Secondary</button>
  <button className={`${prefix}btn ${prefix}btn-success ${prefix}rounded-pill ${prefix}px-3`} type="button">Success</button>
  <button className={`${prefix}btn ${prefix}btn-danger ${prefix}rounded-pill ${prefix}px-3`} type="button">Danger</button>
  <button className={`${prefix}btn ${prefix}btn-warning ${prefix}rounded-pill ${prefix}px-3`} type="button">Warning</button>
  <button className={`${prefix}btn ${prefix}btn-info ${prefix}rounded-pill ${prefix}px-3`} type="button">Info</button>
  <button className={`${prefix}btn ${prefix}btn-light ${prefix}rounded-pill ${prefix}px-3`} type="button">Light</button>
  <button className={`${prefix}btn ${prefix}btn-dark ${prefix}rounded-pill ${prefix}px-3`} type="button">Dark</button>
  <button className={`${prefix}btn ${prefix}btn-link ${prefix}rounded-pill ${prefix}px-3`} type="button">Link</button>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}col-lg-6 ${prefix}col-xxl-4 ${prefix}my-5 ${prefix}mx-auto`}>
  <div className={`${prefix}d-grid ${prefix}gap-2`}>
    <button className={`${prefix}btn ${prefix}btn-outline-secondary`} type="button">Secondary action</button>
    <button className={`${prefix}btn ${prefix}btn-primary`} type="button">Primary action</button>
  </div>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}py-5`}>
  <button className={`${prefix}btn ${prefix}btn-primary ${prefix}d-inline-flex ${prefix}align-items-center`} type="button">
    Primary icon
    <svg className={`${prefix}bi ${prefix}ms-1`} width="20" height="20"><use xlinkHref="#arrow-right-short"/></svg>
  </button>
  <button className={`${prefix}btn ${prefix}btn-outline-secondary ${prefix}d-inline-flex ${prefix}align-items-center`} type="button">
    Secondary icon
    <svg className={`${prefix}bi ${prefix}ms-1`} width="20" height="20"><use xlinkHref="#arrow-right-short"/></svg>
  </button>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}py-5`}>
  <button className={`${prefix}btn ${prefix}btn-primary`} type="button" disabled>
    <span className={`${prefix}spinner-border ${prefix}spinner-border-sm`} aria-hidden="true"></span>
    <span className={`${prefix}visually-hidden`} role="status">Loading...</span>
  </button>
  <button className={`${prefix}btn ${prefix}btn-primary`} type="button" disabled>
    <span className={`${prefix}spinner-border ${prefix}spinner-border-sm`} aria-hidden="true"></span>
    <span role="status">Loading...</span>
  </button>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}pt-5 ${prefix}pb-4`}>
  <button className={`${prefix}btn ${prefix}btn-primary ${prefix}rounded-circle ${prefix}p-2 ${prefix}lh-1`} type="button">
    <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-lg"/></svg>
    <span className={`${prefix}visually-hidden`}>Dismiss</span>
  </button>
  <button className={`${prefix}btn ${prefix}btn-outline-primary ${prefix}rounded-circle ${prefix}p-2 ${prefix}lh-1`} type="button">
    <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-lg"/></svg>
    <span className={`${prefix}visually-hidden`}>Dismiss</span>
  </button>
</div>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}pb-5`}>
  <button className={`${prefix}btn ${prefix}btn-primary ${prefix}rounded-circle ${prefix}p-3 ${prefix}lh-1`} type="button">
    <svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#x-lg"/></svg>
    <span className={`${prefix}visually-hidden`}>Dismiss</span>
  </button>
  <button className={`${prefix}btn ${prefix}btn-outline-primary ${prefix}rounded-circle ${prefix}p-3 ${prefix}lh-1`} type="button">
    <svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#x-lg"/></svg>
    <span className={`${prefix}visually-hidden`}>Dismiss</span>
  </button>
</div>

<div className={`${prefix}b-example-divider`}></div>


    </>
  )
}
