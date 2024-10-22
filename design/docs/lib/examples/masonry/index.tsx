import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      
{/* <!-- <script async src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous"></script> --> */}
{/* <script async src="masonry.pkgd.min.js"></script> */}

<main className={`${prefix}container ${prefix}py-5`}>
  <h1>Example and Masonry</h1>
  <p className={`${prefix}lead`}>Integrate <a href="https://masonry.desandro.com/">Masonry</a> with the Example grid system and cards component.</p>

  <p>Masonry is not included in Example. Add it by including the JavaScript plugin manually, or using a CDN like so:</p>

  <pre><code>
&lt;script src=&quot;https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js&quot; integrity=&quot;sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D&quot; crossorigin=&quot;anonymous&quot; async&gt;&lt;/script&gt;
  </code></pre>

  <p>By adding <code>{`data-masonry='{"percentPosition": true }'`}</code> to the <code>.row</code> wrapper, we can combine the powers of Example's responsive grid and Masonry's positioning.</p>

  <hr className={`${prefix}my-5`}/>

  <div className={`${prefix}row`} data-masonry='{"percentPosition": true }'>
    <div className={`${prefix}col-sm-6 ${prefix}col-lg-4 ${prefix}mb-4`}>
      <div className={`${prefix}card`}>
        <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
        <div className={`${prefix}card-body`}>
          <h5 className={`${prefix}card-title`}>Card title that wraps to a new line</h5>
          <p className={`${prefix}card-text`}>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
    </div>
    <div className={`${prefix}col-sm-6 ${prefix}col-lg-4 ${prefix}mb-4`}>
      <div className={`${prefix}card ${prefix}p-3`}>
        <figure className={`${prefix}p-3 ${prefix}mb-0`}>
          <blockquote className={`${prefix}blockquote`}>
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption className={`${prefix}blockquote-footer ${prefix}mb-0 ${prefix}text-body-secondary`}>
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
      </div>
    </div>
    <div className={`${prefix}col-sm-6 ${prefix}col-lg-4 ${prefix}mb-4`}>
      <div className={`${prefix}card`}>
        <svg className={`${prefix}bd-placeholder-img ${prefix}card-img-top`} width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
        <div className={`${prefix}card-body`}>
          <h5 className={`${prefix}card-title`}>Card title</h5>
          <p className={`${prefix}card-text`}>This card has supporting text below as a natural lead-in to additional content.</p>
          <p className={`${prefix}card-text`}><small className={`${prefix}text-body-secondary`}>Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
    <div className={`${prefix}col-sm-6 ${prefix}col-lg-4 ${prefix}mb-4`}>
      <div className={`${prefix}card ${prefix}text-bg-primary ${prefix}text-center ${prefix}p-3`}>
        <figure className={`${prefix}mb-0`}>
          <blockquote className={`${prefix}blockquote`}>
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption className={`${prefix}blockquote-footer ${prefix}mb-0 ${prefix}text-white`}>
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
      </div>
    </div>
    <div className={`${prefix}col-sm-6 ${prefix}col-lg-4 ${prefix}mb-4`}>
      <div className={`${prefix}card ${prefix}text-center`}>
        <div className={`${prefix}card-body`}>
          <h5 className={`${prefix}card-title`}>Card title</h5>
          <p className={`${prefix}card-text`}>This card has a regular title and short paragraph of text below it.</p>
          <p className={`${prefix}card-text`}><small className={`${prefix}text-body-secondary`}>Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
    <div className={`${prefix}col-sm-6 ${prefix}col-lg-4 ${prefix}mb-4`}>
      <div className={`${prefix}card`}>
        <svg className={`${prefix}bd-placeholder-img ${prefix}card-img`} width="100%" height="260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Card image" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"/><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Card image</text></svg>
      </div>
    </div>
    <div className={`${prefix}col-sm-6 ${prefix}col-lg-4 ${prefix}mb-4`}>
      <div className={`${prefix}card ${prefix}p-3 ${prefix}text-end`}>
        <figure className={`${prefix}mb-0`}>
          <blockquote className={`${prefix}blockquote`}>
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption className={`${prefix}blockquote-footer ${prefix}mb-0 ${prefix}text-body-secondary`}>
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
      </div>
    </div>
    <div className={`${prefix}col-sm-6 ${prefix}col-lg-4 ${prefix}mb-4`}>
      <div className={`${prefix}card`}>
        <div className={`${prefix}card-body`}>
          <h5 className={`${prefix}card-title`}>Card title</h5>
          <p className={`${prefix}card-text`}>This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</p>
          <p className={`${prefix}card-text`}><small className={`${prefix}text-body-secondary`}>Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>

</main>

    </>
  )
}
