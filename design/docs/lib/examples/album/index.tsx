import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>

<header data-theme="dark">
  <div className={`${prefix}collapse ${prefix}text-bg-dark`} id="navbarHeader">
    <div className={`${prefix}container`}>
      <div className={`${prefix}row`}>
        <div className={`${prefix}col-sm-8 ${prefix}col-md-7 ${prefix}py-4`}>
          <h4>About</h4>
          <p className={`${prefix}text-body-secondary`}>Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
        </div>
        <div className={`${prefix}col-sm-4 ${prefix}offset-md-1 ${prefix}py-4`}>
          <h4>Contact</h4>
          <ul className={`${prefix}list-unstyled`}>
            <li><a href="#" className={`${prefix}text-white`}>Follow on Twitter</a></li>
            <li><a href="#" className={`${prefix}text-white`}>Like on Facebook</a></li>
            <li><a href="#" className={`${prefix}text-white`}>Email me</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div className={`${prefix}navbar ${prefix}navbar-dark ${prefix}bg-dark ${prefix}shadow-sm`}>
    <div className={`${prefix}container`}>
      <a href="#" className={`${prefix}navbar-brand ${prefix}d-flex ${prefix}align-items-center`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" className={`${prefix}me-2`} viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        <strong>Album</strong>
      </a>
      <button className={`${prefix}navbar-toggler`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>
    </div>
  </div>
</header>

<main>

  <section className={`${prefix}py-5 ${prefix}text-center ${prefix}container`}>
    <div className={`${prefix}row ${prefix}py-lg-5`}>
      <div className={`${prefix}col-lg-6 ${prefix}col-md-8 ${prefix}mx-auto`}>
        <h1 className={`${prefix}fw-light`}>Album example</h1>
        <p className={`${prefix}lead ${prefix}text-body-secondary`}>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
        <p>
          <a href="#" className={`${prefix}btn ${prefix}btn-primary ${prefix}my-2`}>Main call to action</a>
          <a href="#" className={`${prefix}btn ${prefix}btn-secondary ${prefix}my-2`}>Secondary action</a>
        </p>
      </div>
    </div>
  </section>

  <div className={`${prefix}album ${prefix}py-5 ${prefix}bg-body-tertiary`}>
    <div className={`${prefix}container`}>

      <div className={`${prefix}row ${prefix}row-cols-1 ${prefix}row-cols-sm-2 ${prefix}row-cols-md-3 ${prefix}g-3`}>
        <div className={`${prefix}col`}>
          <div className={`${prefix}card ${prefix}shadow-sm`}>
            <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className={`${prefix}card-body`}>
              <p className={`${prefix}card-text`}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center`}>
                <div className={`${prefix}btn-group`}>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>View</button>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>Edit</button>
                </div>
                <small className={`${prefix}text-body-secondary`}>9 mins</small>
              </div>
            </div>
          </div>
        </div>
        <div className={`${prefix}col`}>
          <div className={`${prefix}card ${prefix}shadow-sm`}>
            <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className={`${prefix}card-body`}>
              <p className={`${prefix}card-text`}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center`}>
                <div className={`${prefix}btn-group`}>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>View</button>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>Edit</button>
                </div>
                <small className={`${prefix}text-body-secondary`}>9 mins</small>
              </div>
            </div>
          </div>
        </div>
        <div className={`${prefix}col`}>
          <div className={`${prefix}card ${prefix}shadow-sm`}>
            <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className={`${prefix}card-body`}>
              <p className={`${prefix}card-text`}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center`}>
                <div className={`${prefix}btn-group`}>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>View</button>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>Edit</button>
                </div>
                <small className={`${prefix}text-body-secondary`}>9 mins</small>
              </div>
            </div>
          </div>
        </div>

        <div className={`${prefix}col`}>
          <div className={`${prefix}card ${prefix}shadow-sm`}>
            <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className={`${prefix}card-body`}>
              <p className={`${prefix}card-text`}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center`}>
                <div className={`${prefix}btn-group`}>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>View</button>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>Edit</button>
                </div>
                <small className={`${prefix}text-body-secondary`}>9 mins</small>
              </div>
            </div>
          </div>
        </div>
        <div className={`${prefix}col`}>
          <div className={`${prefix}card ${prefix}shadow-sm`}>
            <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className={`${prefix}card-body`}>
              <p className={`${prefix}card-text`}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center`}>
                <div className={`${prefix}btn-group`}>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>View</button>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>Edit</button>
                </div>
                <small className={`${prefix}text-body-secondary`}>9 mins</small>
              </div>
            </div>
          </div>
        </div>
        <div className={`${prefix}col`}>
          <div className={`${prefix}card ${prefix}shadow-sm`}>
            <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className={`${prefix}card-body`}>
              <p className={`${prefix}card-text`}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center`}>
                <div className={`${prefix}btn-group`}>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>View</button>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>Edit</button>
                </div>
                <small className={`${prefix}text-body-secondary`}>9 mins</small>
              </div>
            </div>
          </div>
        </div>

        <div className={`${prefix}col`}>
          <div className={`${prefix}card ${prefix}shadow-sm`}>
            <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className={`${prefix}card-body`}>
              <p className={`${prefix}card-text`}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center`}>
                <div className={`${prefix}btn-group`}>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>View</button>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>Edit</button>
                </div>
                <small className={`${prefix}text-body-secondary`}>9 mins</small>
              </div>
            </div>
          </div>
        </div>
        <div className={`${prefix}col`}>
          <div className={`${prefix}card ${prefix}shadow-sm`}>
            <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className={`${prefix}card-body`}>
              <p className={`${prefix}card-text`}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center`}>
                <div className={`${prefix}btn-group`}>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>View</button>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>Edit</button>
                </div>
                <small className={`${prefix}text-body-secondary`}>9 mins</small>
              </div>
            </div>
          </div>
        </div>
        <div className={`${prefix}col`}>
          <div className={`${prefix}card ${prefix}shadow-sm`}>
            <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div className={`${prefix}card-body`}>
              <p className={`${prefix}card-text`}>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center`}>
                <div className={`${prefix}btn-group`}>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>View</button>
                  <button type="button" className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`}>Edit</button>
                </div>
                <small className={`${prefix}text-body-secondary`}>9 mins</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</main>

    </>
  )
}
