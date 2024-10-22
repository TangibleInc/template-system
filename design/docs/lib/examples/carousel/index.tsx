import React from 'react'
import '@site/all' // Listens to events on data-t attributes
import { placeholderImage300x150 } from '@site/utilities/placeholder'

export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
{/* <link href="carousel.css" rel="stylesheet"> */}
{/* 
<header data-t-theme="dark">
  <nav className={`${prefix}navbar ${prefix}navbar-expand-md ${prefix}navbar-dark ${prefix}fixed-top ${prefix}bg-dark`}>
    <div className={`${prefix}container-fluid`}>
      <a className={`${prefix}navbar-brand`} href="#">Carousel</a>
      <button className={`${prefix}navbar-toggler`} type="button" data-t-toggle="collapse" data-t-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className={`${prefix}navbar-toggler-icon`}></span>
      </button>
      <div className={`${prefix}collapse ${prefix}navbar-collapse`} id="navbarCollapse">
        <ul className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-md-0`}>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}active`} aria-current="page" href="#">Home</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link`} href="#">Link</a>
          </li>
          <li className={`${prefix}nav-item`}>
            <a className={`${prefix}nav-link ${prefix}disabled`} aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form className={`${prefix}d-flex`} role="search">
          <input className={`${prefix}form-control ${prefix}me-2`} type="search" placeholder="Search" aria-label="Search" />
          <button className={`${prefix}btn ${prefix}btn-outline-success`} type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</header> */}

<main>

  <div id="myCarousel" className={`${prefix}carousel ${prefix}slide ${prefix}mb-6`} data-t-ride="carousel">
    <div className={`${prefix}carousel-indicators`}>
      <button type="button" data-t-target="#myCarousel" data-t-slide-to="0" className={`${prefix}active`} aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-t-target="#myCarousel" data-t-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-t-target="#myCarousel" data-t-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div className={`${prefix}carousel-inner`}>
      <div className={`${prefix}carousel-item ${prefix}active`}>
        <img src={placeholderImage300x150} className={`${prefix}d-block ${prefix}w-100`} alt='...' />
        <div className={`${prefix}container`}>
          <div className={`${prefix}carousel-caption ${prefix}text-start`}>
            <h1>Example headline.</h1>
            <p className={`${prefix}opacity-75`}>Some representative placeholder content for the first slide of the carousel.</p>
            <p><a className={`${prefix}btn ${prefix}btn-lg ${prefix}btn-primary`} href="#">Sign up today</a></p>
          </div>
        </div>
      </div>
      <div className={`${prefix}carousel-item`}>
        <img src={placeholderImage300x150} className={`${prefix}d-block ${prefix}w-100`} alt='...' />
        <div className={`${prefix}container`}>
          <div className={`${prefix}carousel-caption`}>
            <h1>Another example headline.</h1>
            <p>Some representative placeholder content for the second slide of the carousel.</p>
            <p><a className={`${prefix}btn ${prefix}btn-lg ${prefix}btn-primary`} href="#">Learn more</a></p>
          </div>
        </div>
      </div>
      <div className={`${prefix}carousel-item`}>
        <img src={placeholderImage300x150} className={`${prefix}d-block ${prefix}w-100`} alt='...' />
        <div className={`${prefix}container`}>
          <div className={`${prefix}carousel-caption ${prefix}text-end`}>
            <h1>One more for good measure.</h1>
            <p>Some representative placeholder content for the third slide of this carousel.</p>
            <p><a className={`${prefix}btn ${prefix}btn-lg ${prefix}btn-primary`} href="#">Browse gallery</a></p>
          </div>
        </div>
      </div>
    </div>
    <button className={`${prefix}carousel-control-prev`} type="button" data-t-target="#myCarousel" data-t-slide="prev">
      <span className={`${prefix}carousel-control-prev-icon`} aria-hidden="true"></span>
      <span className={`${prefix}visually-hidden`}>Previous</span>
    </button>
    <button className={`${prefix}carousel-control-next`} type="button" data-t-target="#myCarousel" data-t-slide="next">
      <span className={`${prefix}carousel-control-next-icon`} aria-hidden="true"></span>
      <span className={`${prefix}visually-hidden`}>Next</span>
    </button>
  </div>


  {/* <!-- Marketing messaging and featurettes
  ================================================== -->
  <!-- Wrap the rest of the page in another container to center all the content. --> */}

  <div className={`${prefix}container ${prefix}marketing`}>

    {/* <!-- Three columns of text below the carousel --> */}
    <div className={`${prefix}row`}>
      <div className={`${prefix}col-lg-4`}>
        <svg className={`${prefix}bd-placeholder-img ${prefix}rounded-circle`} width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
        <h2 className={`${prefix}fw-normal`}>Heading</h2>
        <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
        <p><a className={`${prefix}btn ${prefix}btn-secondary`} href="#">View details &raquo;</a></p>
      </div>
      <div className={`${prefix}col-lg-4`}>
        <svg className={`${prefix}bd-placeholder-img ${prefix}rounded-circle`} width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
        <h2 className={`${prefix}fw-normal`}>Heading</h2>
        <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
        <p><a className={`${prefix}btn ${prefix}btn-secondary`} href="#">View details &raquo;</a></p>
      </div>
      <div className={`${prefix}col-lg-4`}>
        <svg className={`${prefix}bd-placeholder-img ${prefix}rounded-circle`} width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"/></svg>
        <h2 className={`${prefix}fw-normal`}>Heading</h2>
        <p>And lastly this, the third column of representative placeholder content.</p>
        <p><a className={`${prefix}btn ${prefix}btn-secondary`} href="#">View details &raquo;</a></p>
      </div>
    </div>


    {/* <!-- START THE FEATURETTES --> */}

    <hr className={`${prefix}featurette-divider`} />

    <div className={`${prefix}row ${prefix}featurette`}>
      <div className={`${prefix}col-md-7`}>
        <h2 className={`${prefix}featurette-heading ${prefix}fw-normal ${prefix}lh-1`}>First featurette heading. <span className={`${prefix}text-body-secondary`}>It’ll blow your mind.</span></h2>
        <p className={`${prefix}lead`}>Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
      </div>
      <div className={`${prefix}col-md-5`}>
        <svg className={`${prefix}bd-placeholder-img ${prefix}bd-placeholder-img-lg ${prefix}featurette-image ${prefix}img-fluid ${prefix}mx-auto`} width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"/><text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text></svg>
      </div>
    </div>

    <hr className={`${prefix}featurette-divider`}/>

    <div className={`${prefix}row ${prefix}featurette`}>
      <div className={`${prefix}col-md-7 ${prefix}order-md-2`}>
        <h2 className={`${prefix}featurette-heading ${prefix}fw-normal ${prefix}lh-1`}>Oh yeah, it’s that good. <span className={`${prefix}text-body-secondary`}>See for yourself.</span></h2>
        <p className={`${prefix}lead`}>Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
      </div>
      <div className={`${prefix}col-md-5 ${prefix}order-md-1`}>
        <svg className={`${prefix}bd-placeholder-img ${prefix}bd-placeholder-img-lg ${prefix}featurette-image ${prefix}img-fluid ${prefix}mx-auto`} width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"/><text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text></svg>
      </div>
    </div>

    <hr className={`${prefix}featurette-divider`}/>

    <div className={`${prefix}row ${prefix}featurette`}>
      <div className={`${prefix}col-md-7`}>
        <h2 className={`${prefix}featurette-heading ${prefix}fw-normal ${prefix}lh-1`}>And lastly, this one. <span className={`${prefix}text-body-secondary`}>Checkmate.</span></h2>
        <p className={`${prefix}lead`}>And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
      </div>
      <div className={`${prefix}col-md-5`}>
        <svg className={`${prefix}bd-placeholder-img ${prefix}bd-placeholder-img-lg ${prefix}featurette-image ${prefix}img-fluid ${prefix}mx-auto`} width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-bg)"/><text x="50%" y="50%" fill="var(--bs-secondary-color)" dy=".3em">500x500</text></svg>
      </div>
    </div>

    <hr className={`${prefix}featurette-divider`}/>

    {/* <!-- /END THE FEATURETTES --> */}

  </div>

  <footer className={`${prefix}container`}>
    <p className={`${prefix}float-end`}><a href="#">Back to top</a></p>
    <p>&copy; 2017–2023 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
  </footer>
</main>


    </>
  )
}
