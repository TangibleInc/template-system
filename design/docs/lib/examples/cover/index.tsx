import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      
{/* <link href="cover.css" rel="stylesheet"> */}

<div className={`${prefix}d-flex ${prefix}h-100 ${prefix}text-center ${prefix}text-bg-dark`}>

<div className={`${prefix}cover-container ${prefix}d-flex ${prefix}w-100 ${prefix}h-100 ${prefix}p-3 ${prefix}mx-auto ${prefix}flex-column`}>
  <header className={`${prefix}mb-auto`}>
    <div>
      <h3 className={`${prefix}float-md-start ${prefix}mb-0`}>Cover</h3>
      <nav className={`${prefix}nav ${prefix}nav-masthead ${prefix}justify-content-center ${prefix}float-md-end`}>
        <a className={`${prefix}nav-link ${prefix}fw-bold ${prefix}py-1 ${prefix}px-0 ${prefix}active`} aria-current="page" href="#">Home</a>
        <a className={`${prefix}nav-link ${prefix}fw-bold ${prefix}py-1 ${prefix}px-0`} href="#">Features</a>
        <a className={`${prefix}nav-link ${prefix}fw-bold ${prefix}py-1 ${prefix}px-0`} href="#">Contact</a>
      </nav>
    </div>
  </header>

  <main className={`${prefix}px-3`}>
    <h1>Cover your page.</h1>
    <p className={`${prefix}lead`}>Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
    <p className={`${prefix}lead`}>
      <a href="#" className={`${prefix}btn ${prefix}btn-lg ${prefix}btn-light ${prefix}fw-bold ${prefix}border-white ${prefix}bg-white`}>Learn more</a>
    </p>
  </main>

  <footer className={`${prefix}mt-auto ${prefix}text-white-50`}>
    <p>Cover template for <a href="#" className={`${prefix}text-white`}>Example</a>.</p>
  </footer>
</div>


</div>

    </>
  )
}
