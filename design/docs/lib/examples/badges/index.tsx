import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
    
<svg xmlns="http://www.w3.org/2000/svg" className={`${prefix}d-none`}>
  <symbol id="x-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
  </symbol>
</svg>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}py-5`}>
  <span className={`${prefix}badge ${prefix}text-bg-primary ${prefix}rounded-pill`}>Primary</span>
  <span className={`${prefix}badge ${prefix}text-bg-secondary ${prefix}rounded-pill`}>Secondary</span>
  <span className={`${prefix}badge ${prefix}text-bg-success ${prefix}rounded-pill`}>Success</span>
  <span className={`${prefix}badge ${prefix}text-bg-danger ${prefix}rounded-pill`}>Danger</span>
  <span className={`${prefix}badge ${prefix}text-bg-warning ${prefix}rounded-pill`}>Warning</span>
  <span className={`${prefix}badge ${prefix}text-bg-info ${prefix}rounded-pill`}>Info</span>
  <span className={`${prefix}badge ${prefix}text-bg-light ${prefix}rounded-pill`}>Light</span>
  <span className={`${prefix}badge ${prefix}text-bg-dark ${prefix}rounded-pill`}>Dark</span>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}py-5`}>
  <span className={`${prefix}badge ${prefix}bg-primary-subtle ${prefix}text-primary-emphasis ${prefix}rounded-pill`}>Primary</span>
  <span className={`${prefix}badge ${prefix}bg-secondary-subtle ${prefix}text-secondary-emphasis ${prefix}rounded-pill`}>Secondary</span>
  <span className={`${prefix}badge ${prefix}bg-success-subtle ${prefix}text-success-emphasis ${prefix}rounded-pill`}>Success</span>
  <span className={`${prefix}badge ${prefix}bg-danger-subtle ${prefix}text-danger-emphasis ${prefix}rounded-pill`}>Danger</span>
  <span className={`${prefix}badge ${prefix}bg-warning-subtle ${prefix}text-warning-emphasis ${prefix}rounded-pill`}>Warning</span>
  <span className={`${prefix}badge ${prefix}bg-info-subtle ${prefix}text-info-emphasis ${prefix}rounded-pill`}>Info</span>
  <span className={`${prefix}badge ${prefix}bg-light-subtle ${prefix}text-light-emphasis ${prefix}rounded-pill`}>Light</span>
  <span className={`${prefix}badge ${prefix}bg-dark-subtle ${prefix}text-dark-emphasis ${prefix}rounded-pill`}>Dark</span>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}py-5`}>
  <span className={`${prefix}badge ${prefix}bg-primary-subtle ${prefix}border ${prefix}border-primary-subtle ${prefix}text-primary-emphasis ${prefix}rounded-pill`}>Primary</span>
  <span className={`${prefix}badge ${prefix}bg-secondary-subtle ${prefix}border ${prefix}border-secondary-subtle ${prefix}text-secondary-emphasis ${prefix}rounded-pill`}>Secondary</span>
  <span className={`${prefix}badge ${prefix}bg-success-subtle ${prefix}border ${prefix}border-success-subtle ${prefix}text-success-emphasis ${prefix}rounded-pill`}>Success</span>
  <span className={`${prefix}badge ${prefix}bg-danger-subtle ${prefix}border ${prefix}border-danger-subtle ${prefix}text-danger-emphasis ${prefix}rounded-pill`}>Danger</span>
  <span className={`${prefix}badge ${prefix}bg-warning-subtle ${prefix}border ${prefix}border-warning-subtle ${prefix}text-warning-emphasis ${prefix}rounded-pill`}>Warning</span>
  <span className={`${prefix}badge ${prefix}bg-info-subtle ${prefix}border ${prefix}border-info-subtle ${prefix}text-info-emphasis ${prefix}rounded-pill`}>Info</span>
  <span className={`${prefix}badge ${prefix}bg-light-subtle ${prefix}border ${prefix}border-light-subtle ${prefix}text-light-emphasis ${prefix}rounded-pill`}>Light</span>
  <span className={`${prefix}badge ${prefix}bg-dark-subtle ${prefix}border ${prefix}border-dark-subtle ${prefix}text-dark-emphasis ${prefix}rounded-pill`}>Dark</span>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}py-5`}>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-primary-emphasis ${prefix}bg-primary-subtle ${prefix}border ${prefix}border-primary-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />Primary
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-secondary-emphasis ${prefix}bg-secondary-subtle ${prefix}border ${prefix}border-secondary-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />Secondary
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-success-emphasis ${prefix}bg-success-subtle ${prefix}border ${prefix}border-success-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />Success
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-danger-emphasis ${prefix}bg-danger-subtle ${prefix}border ${prefix}border-danger-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />Danger
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-warning-emphasis ${prefix}bg-warning-subtle ${prefix}border ${prefix}border-warning-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />Warning
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-info-emphasis ${prefix}bg-info-subtle ${prefix}border ${prefix}border-info-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />Info
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-dark-emphasis ${prefix}bg-light-subtle ${prefix}border ${prefix}border-dark-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />Light
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-dark-emphasis ${prefix}bg-dark-subtle ${prefix}border ${prefix}border-dark-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />Dark
  </span>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}py-5`}>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}p-2 ${prefix}align-items-center ${prefix}text-bg-primary ${prefix}rounded-pill`}>
    <span className={`${prefix}px-1`}>Primary</span>
    <a href="#"><svg className={`${prefix}bi ${prefix}ms-1`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}p-2 ${prefix}align-items-center ${prefix}text-primary-emphasis ${prefix}bg-primary-subtle ${prefix}rounded-pill`}>
    <span className={`${prefix}px-1`}>Primary</span>
    <a href="#"><svg className={`${prefix}bi ${prefix}ms-1`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}p-2 ${prefix}align-items-center ${prefix}text-primary-emphasis ${prefix}bg-primary-subtle ${prefix}border ${prefix}border-primary-subtle ${prefix}rounded-pill`}>
    <span className={`${prefix}px-1`}>Primary</span>
    <a href="#"><svg className={`${prefix}bi ${prefix}ms-1`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}d-flex ${prefix}gap-2 ${prefix}justify-content-center ${prefix}py-5`}>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-primary-emphasis ${prefix}bg-primary-subtle ${prefix}border ${prefix}border-primary-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />
    Primary
    <span className={`${prefix}vr ${prefix}mx-2`}></span>
    <a href="#"><svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-secondary-emphasis ${prefix}bg-secondary-subtle ${prefix}border ${prefix}border-secondary-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />
    Secondary
    <span className={`${prefix}vr ${prefix}mx-2`}></span>
    <a href="#"><svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-success-emphasis ${prefix}bg-success-subtle ${prefix}border ${prefix}border-success-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />
    Success
    <span className={`${prefix}vr ${prefix}mx-2`}></span>
    <a href="#"><svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-danger-emphasis ${prefix}bg-danger-subtle ${prefix}border ${prefix}border-danger-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />
    Danger
    <span className={`${prefix}vr ${prefix}mx-2`}></span>
    <a href="#"><svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-warning-emphasis ${prefix}bg-warning-subtle ${prefix}border ${prefix}border-warning-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />
    Warning
    <span className={`${prefix}vr ${prefix}mx-2`}></span>
    <a href="#"><svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-info-emphasis ${prefix}bg-info-subtle ${prefix}border ${prefix}border-info-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />
    Info
    <span className={`${prefix}vr ${prefix}mx-2`}></span>
    <a href="#"><svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-light-emphasis ${prefix}bg-light-subtle ${prefix}border ${prefix}border-dark-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />
    Light
    <span className={`${prefix}vr ${prefix}mx-2`}></span>
    <a href="#"><svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
  <span className={`${prefix}badge ${prefix}d-flex ${prefix}align-items-center ${prefix}p-1 ${prefix}pe-2 ${prefix}text-dark-emphasis ${prefix}bg-dark-subtle ${prefix}border ${prefix}border-dark-subtle ${prefix}rounded-pill`}>
    <img className={`${prefix}rounded-circle ${prefix}me-1`} width="24" height="24" src="/img/profile.png" alt="" />
    Dark
    <span className={`${prefix}vr ${prefix}mx-2`}></span>
    <a href="#"><svg className={`${prefix}bi`} width="16" height="16"><use xlinkHref="#x-circle-fill"/></svg></a>
  </span>
</div>

    </>
  )
}
