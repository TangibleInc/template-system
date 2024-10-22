import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      {/* <link href="sticky-footer.css" rel="stylesheet"> */}

<div className={`${prefix}d-flex ${prefix}flex-column ${prefix}min-vh-100`}>

<main className={`${prefix}flex-shrink-0`}>
  <div className={`${prefix}container`}>
    <h1 className={`${prefix}mt-5`}>Sticky footer</h1>
    <p className={`${prefix}lead`}>Pin a footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS.</p>
    <p>Use <a href="../sticky-footer-navbar/">the sticky footer with a fixed navbar</a> if need be, too.</p>
  </div>
</main>

<footer className={`${prefix}footer ${prefix}mt-auto ${prefix}py-3 ${prefix}bg-body-tertiary`}>
  <div className={`${prefix}container`}>
    <span className={`${prefix}text-body-secondary`}>Place sticky footer content here.</span>
  </div>
</footer>


</div>

    </>
  )
}
