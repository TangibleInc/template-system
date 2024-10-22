import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      {/* <link href="heroes.css" rel="stylesheet"> */}

<main>
  <h1 className={`${prefix}visually-hidden`}>Heroes examples</h1>

  <div className={`${prefix}px-4 ${prefix}py-5 ${prefix}my-5 ${prefix}text-center`}>
    <img className={`${prefix}d-block ${prefix}mx-auto ${prefix}mb-4`} src="/img/profile.png" alt="" width="72" height="57"/>
    <h1 className={`${prefix}display-5 ${prefix}fw-bold ${prefix}text-body-emphasis`}>Centered hero</h1>
    <div className={`${prefix}col-lg-6 ${prefix}mx-auto`}>
      <p className={`${prefix}lead ${prefix}mb-4`}>Quickly design and customize responsive mobile-first sites, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      <div className={`${prefix}d-grid ${prefix}gap-2 ${prefix}d-sm-flex ${prefix}justify-content-sm-center`}>
        <button type="button" className={`${prefix}btn ${prefix}btn-primary ${prefix}btn-lg ${prefix}px-4 ${prefix}gap-3`}>Primary button</button>
        <button type="button" className={`${prefix}btn ${prefix}btn-outline-secondary ${prefix}btn-lg ${prefix}px-4`}>Secondary</button>
      </div>
    </div>
  </div>

  <div className={`${prefix}b-example-divider`}></div>

  <div className={`${prefix}px-4 ${prefix}pt-5 ${prefix}my-5 ${prefix}text-center ${prefix}border-bottom`}>
    <h1 className={`${prefix}display-4 ${prefix}fw-bold ${prefix}text-body-emphasis`}>Centered screenshot</h1>
    <div className={`${prefix}col-lg-6 ${prefix}mx-auto`}>
      <p className={`${prefix}lead ${prefix}mb-4`}>Quickly design and customize responsive mobile-first sites, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      <div className={`${prefix}d-grid ${prefix}gap-2 ${prefix}d-sm-flex ${prefix}justify-content-sm-center ${prefix}mb-5`}>
        <button type="button" className={`${prefix}btn ${prefix}btn-primary ${prefix}btn-lg ${prefix}px-4 ${prefix}me-sm-3`}>Primary button</button>
        <button type="button" className={`${prefix}btn ${prefix}btn-outline-secondary ${prefix}btn-lg ${prefix}px-4`}>Secondary</button>
      </div>
    </div>
    <div className={`${prefix}overflow-hidden`} style={{maxHeight: "30vh"}}>
      <div className={`${prefix}container ${prefix}px-5`}>
        <img src="bootstrap-docs.png" className={`${prefix}img-fluid ${prefix}border ${prefix}rounded-3 ${prefix}shadow-lg ${prefix}mb-4`} alt="Example image" width="700" height="500" loading="lazy"/>
      </div>
    </div>
  </div>

  <div className={`${prefix}b-example-divider`}></div>

  <div className={`${prefix}container ${prefix}col-xxl-8 ${prefix}px-4 ${prefix}py-5`}>
    <div className={`${prefix}row ${prefix}flex-lg-row-reverse ${prefix}align-items-center ${prefix}g-5 ${prefix}py-5`}>
      <div className={`${prefix}col-10 ${prefix}col-sm-8 ${prefix}col-lg-6`}>
        <img src="bootstrap-themes.png" className={`${prefix}d-block ${prefix}mx-lg-auto ${prefix}img-fluid`} alt="Example Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div className={`${prefix}col-lg-6`}>
        <h1 className={`${prefix}display-5 ${prefix}fw-bold ${prefix}text-body-emphasis ${prefix}lh-1 ${prefix}mb-3`}>Responsive left-aligned hero with image</h1>
        <p className={`${prefix}lead`}>Quickly design and customize responsive mobile-first sites, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div className={`${prefix}d-grid ${prefix}gap-2 ${prefix}d-md-flex ${prefix}justify-content-md-start`}>
          <button type="button" className={`${prefix}btn ${prefix}btn-primary ${prefix}btn-lg ${prefix}px-4 ${prefix}me-md-2`}>Primary</button>
          <button type="button" className={`${prefix}btn ${prefix}btn-outline-secondary ${prefix}btn-lg ${prefix}px-4`}>Default</button>
        </div>
      </div>
    </div>
  </div>

  <div className={`${prefix}b-example-divider`}></div>

  <div className={`${prefix}container ${prefix}col-xl-10 ${prefix}col-xxl-8 ${prefix}px-4 ${prefix}py-5`}>
    <div className={`${prefix}row ${prefix}align-items-center ${prefix}g-lg-5 ${prefix}py-5`}>
      <div className={`${prefix}col-lg-7 ${prefix}text-center ${prefix}text-lg-start`}>
        <h1 className={`${prefix}display-4 ${prefix}fw-bold ${prefix}lh-1 ${prefix}text-body-emphasis ${prefix}mb-3`}>Vertically centered hero sign-up form</h1>
        <p className={`${prefix}col-lg-10 ${prefix}fs-4`}>Below is an example form built entirely with Example’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
      </div>
      <div className={`${prefix}col-md-10 ${prefix}mx-auto ${prefix}col-lg-5`}>
        <form className={`${prefix}p-4 ${prefix}p-md-5 ${prefix}border ${prefix}rounded-3 ${prefix}bg-body-tertiary`}>
          <div className={`${prefix}form-floating ${prefix}mb-3`}>
            <input type="email" className={`${prefix}form-control`} id="floatingInput" placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className={`${prefix}form-floating ${prefix}mb-3`}>
            <input type="password" className={`${prefix}form-control`} id="floatingPassword" placeholder="Password"/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className={`${prefix}checkbox ${prefix}mb-3`}>
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <button className={`${prefix}w-100 ${prefix}btn ${prefix}btn-lg ${prefix}btn-primary`} type="submit">Sign up</button>
          <hr className={`${prefix}my-4`}/>
          <small className={`${prefix}text-body-secondary`}>By clicking Sign up, you agree to the terms of use.</small>
        </form>
      </div>
    </div>
  </div>

  <div className={`${prefix}b-example-divider`}></div>

  <div className={`${prefix}container ${prefix}my-5`}>
    <div className={`${prefix}row ${prefix}p-4 ${prefix}pb-0 ${prefix}pe-lg-0 ${prefix}pt-lg-5 ${prefix}align-items-center ${prefix}rounded-3 ${prefix}border ${prefix}shadow-lg`}>
      <div className={`${prefix}col-lg-7 ${prefix}p-3 ${prefix}p-lg-5 ${prefix}pt-lg-3`}>
        <h1 className={`${prefix}display-4 ${prefix}fw-bold ${prefix}lh-1 ${prefix}text-body-emphasis`}>Border hero with cropped image and shadows</h1>
        <p className={`${prefix}lead`}>Quickly design and customize responsive mobile-first sites with Example, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div className={`${prefix}d-grid ${prefix}gap-2 ${prefix}d-md-flex ${prefix}justify-content-md-start ${prefix}mb-4 ${prefix}mb-lg-3`}>
          <button type="button" className={`${prefix}btn ${prefix}btn-primary ${prefix}btn-lg ${prefix}px-4 ${prefix}me-md-2 ${prefix}fw-bold`}>Primary</button>
          <button type="button" className={`${prefix}btn ${prefix}btn-outline-secondary ${prefix}btn-lg ${prefix}px-4`}>Default</button>
        </div>
      </div>
      <div className={`${prefix}col-lg-4 ${prefix}offset-lg-1 ${prefix}p-0 ${prefix}overflow-hidden ${prefix}shadow-lg`}>
          <img className={`${prefix}rounded-lg-3`} src="bootstrap-docs.png" alt="" width="720"/>
      </div>
    </div>
  </div>

  <div className={`${prefix}b-example-divider`}></div>

  <div className={`${prefix}bg-dark ${prefix}text-secondary ${prefix}px-4 ${prefix}py-5 ${prefix}text-center`}>
    <div className={`${prefix}py-5`}>
      <h1 className={`${prefix}display-5 ${prefix}fw-bold ${prefix}text-white`}>Dark color hero</h1>
      <div className={`${prefix}col-lg-6 ${prefix}mx-auto`}>
        <p className={`${prefix}fs-5 ${prefix}mb-4`}>Quickly design and customize responsive mobile-first sites with Example, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div className={`${prefix}d-grid ${prefix}gap-2 ${prefix}d-sm-flex ${prefix}justify-content-sm-center`}>
          <button type="button" className={`${prefix}btn ${prefix}btn-outline-info ${prefix}btn-lg ${prefix}px-4 ${prefix}me-sm-3 ${prefix}fw-bold`}>Custom button</button>
          <button type="button" className={`${prefix}btn ${prefix}btn-outline-light ${prefix}btn-lg ${prefix}px-4`}>Secondary</button>
        </div>
      </div>
    </div>
  </div>

  <div className={`${prefix}b-example-divider ${prefix}mb-0`}></div>
</main>


    </>
  )
}
