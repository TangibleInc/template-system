import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
    {/* <link href="breadcrumbs.css" rel="stylesheet"> */}

<svg xmlns="http://www.w3.org/2000/svg" className={`${prefix}d-none`}>
  <symbol id="house-door-fill" viewBox="0 0 16 16">
    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
  </symbol>
</svg>

<div className={`${prefix}container ${prefix}my-5`}>
  <nav aria-label="breadcrumb">
    <ol className={`${prefix}breadcrumb ${prefix}p-3 ${prefix}bg-body-tertiary ${prefix}rounded-3`}>
      <li className={`${prefix}breadcrumb-item`}><a href="#">Home</a></li>
      <li className={`${prefix}breadcrumb-item`}><a href="#">Library</a></li>
      <li className={`${prefix}breadcrumb-item ${prefix}active`} aria-current="page">Data</li>
    </ol>
  </nav>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}container ${prefix}my-5`}>
  <nav aria-label="breadcrumb">
    <ol className={`${prefix}breadcrumb ${prefix}p-3 ${prefix}bg-body-tertiary ${prefix}rounded-3`}>
      <li className={`${prefix}breadcrumb-item`}>
        <a className={`${prefix}link-body-emphasis`} href="#">
          <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#house-door-fill"></use></svg>
          <span className={`${prefix}visually-hidden`}>Home</span>
        </a>
      </li>
      <li className={`${prefix}breadcrumb-item`}>
        <a className={`${prefix}link-body-emphasis ${prefix}fw-semibold ${prefix}text-decoration-none`} href="#">Library</a>
      </li>
      <li className={`${prefix}breadcrumb-item ${prefix}active`} aria-current="page">
        Data
      </li>
    </ol>
  </nav>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}container ${prefix}my-5`}>
  <nav aria-label="breadcrumb">
    <ol className={`${prefix}breadcrumb ${prefix}breadcrumb-chevron ${prefix}p-3 ${prefix}bg-body-tertiary ${prefix}rounded-3`}>
      <li className={`${prefix}breadcrumb-item`}>
        <a className={`${prefix}link-body-emphasis`} href="#">
          <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#house-door-fill"></use></svg>
          <span className={`${prefix}visually-hidden`}>Home</span>
        </a>
      </li>
      <li className={`${prefix}breadcrumb-item`}>
        <a className={`${prefix}link-body-emphasis ${prefix}fw-semibold ${prefix}text-decoration-none`} href="#">Library</a>
      </li>
      <li className={`${prefix}breadcrumb-item ${prefix}active`} aria-current="page">
        Data
      </li>
    </ol>
  </nav>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}container ${prefix}my-5`}>
  <nav aria-label="breadcrumb">
    <ol className={`${prefix}breadcrumb ${prefix}breadcrumb-custom ${prefix}overflow-hidden ${prefix}text-center ${prefix}bg-body-tertiary ${prefix}border ${prefix}rounded-3`}>
      <li className={`${prefix}breadcrumb-item`}>
        <a className={`${prefix}link-body-emphasis ${prefix}fw-semibold ${prefix}text-decoration-none`} href="#">
          <svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#house-door-fill"></use></svg>
          Home
        </a>
      </li>
      <li className={`${prefix}breadcrumb-item`}>
        <a className={`${prefix}link-body-emphasis ${prefix}fw-semibold ${prefix}text-decoration-none`} href="#">Library</a>
      </li>
      <li className={`${prefix}breadcrumb-item ${prefix}active`} aria-current="page">
        Data
      </li>
    </ol>
  </nav>
</div>

<div className={`${prefix}b-example-divider`}></div>


    </>
  )
}
