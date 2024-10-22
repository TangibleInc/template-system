import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
          
    {/* <!-- <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet"> --> */}
    {/* <link href="blog.css" rel="stylesheet"> */}

<svg xmlns="http://www.w3.org/2000/svg" className={`${prefix}d-none`}>
  <symbol id="aperture" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/>
  </symbol>
  <symbol id="cart" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
  <symbol id="chevron-right" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
  </symbol>
</svg>

<div className={`${prefix}container`}>
  <header className={`${prefix}border-bottom ${prefix}lh-1 ${prefix}py-3`}>
    <div className={`${prefix}row ${prefix}flex-nowrap ${prefix}justify-content-between ${prefix}align-items-center`}>
      <div className={`${prefix}col-4 ${prefix}pt-1`}>
        <a className={`${prefix}link-secondary`} href="#">Subscribe</a>
      </div>
      <div className={`${prefix}col-4 ${prefix}text-center`}>
        <a className={`${prefix}blog-header-logo ${prefix}text-body-emphasis ${prefix}text-decoration-none`} href="#">Large</a>
      </div>
      <div className={`${prefix}col-4 ${prefix}d-flex ${prefix}justify-content-end ${prefix}align-items-center`}>
        <a className={`${prefix}link-secondary`} href="#" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className={`${prefix}mx-3`} role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
        </a>
        <a className={`${prefix}btn ${prefix}btn-sm ${prefix}btn-outline-secondary`} href="#">Sign up</a>
      </div>
    </div>
  </header>

  <div className={`${prefix}nav-scroller ${prefix}py-1 ${prefix}mb-3 ${prefix}border-bottom`}>
    <nav className={`${prefix}nav ${prefix}nav-underline ${prefix}justify-content-between`}>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis ${prefix}active`} href="#">World</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">U.S.</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Technology</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Design</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Culture</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Business</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Politics</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Opinion</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Science</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Health</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Style</a>
      <a className={`${prefix}nav-item ${prefix}nav-link ${prefix}link-body-emphasis`} href="#">Travel</a>
    </nav>
  </div>
</div>

<main className={`${prefix}container`}>
  <div className={`${prefix}p-4 ${prefix}p-md-5 ${prefix}mb-4 ${prefix}rounded ${prefix}text-body-emphasis ${prefix}bg-body-secondary`}>
    <div className={`${prefix}col-lg-6 ${prefix}px-0`}>
      <h1 className={`${prefix}display-4 ${prefix}fst-italic`}>Title of a longer featured blog post</h1>
      <p className={`${prefix}lead ${prefix}my-3`}>Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
      <p className={`${prefix}lead ${prefix}mb-0`}><a href="#" className={`${prefix}text-body-emphasis ${prefix}fw-bold`}>Continue reading...</a></p>
    </div>
  </div>

  <div className={`${prefix}row ${prefix}mb-2`}>
    <div className={`${prefix}col-md-6`}>
      <div className={`${prefix}row ${prefix}g-0 ${prefix}border ${prefix}rounded ${prefix}overflow-hidden ${prefix}flex-md-row ${prefix}mb-4 ${prefix}shadow-sm ${prefix}h-md-250 ${prefix}position-relative`}>
        <div className={`${prefix}col ${prefix}p-4 ${prefix}d-flex ${prefix}flex-column ${prefix}position-static`}>
          <strong className={`${prefix}d-inline-block ${prefix}mb-2 ${prefix}text-primary-emphasis`}>World</strong>
          <h3 className={`${prefix}mb-0`}>Featured post</h3>
          <div className={`${prefix}mb-1 ${prefix}text-body-secondary`}>Nov 12</div>
          <p className={`${prefix}card-text ${prefix}mb-auto`}>This is a wider card with supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className={`${prefix}icon-link ${prefix}gap-1 ${prefix}icon-link-hover ${prefix}stretched-link`}>
            Continue reading
            <svg className={`${prefix}bi`}><use xlinkHref="#chevron-right"/></svg>
          </a>
        </div>
        <div className={`${prefix}col-auto ${prefix}d-none ${prefix}d-lg-block`}>
          <svg className={`${prefix}bd-placeholder-img`} width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        </div>
      </div>
    </div>
    <div className={`${prefix}col-md-6`}>
      <div className={`${prefix}row ${prefix}g-0 ${prefix}border ${prefix}rounded ${prefix}overflow-hidden ${prefix}flex-md-row ${prefix}mb-4 ${prefix}shadow-sm ${prefix}h-md-250 ${prefix}position-relative`}>
        <div className={`${prefix}col ${prefix}p-4 ${prefix}d-flex ${prefix}flex-column ${prefix}position-static`}>
          <strong className={`${prefix}d-inline-block ${prefix}mb-2 ${prefix}text-success-emphasis`}>Design</strong>
          <h3 className={`${prefix}mb-0`}>Post title</h3>
          <div className={`${prefix}mb-1 ${prefix}text-body-secondary`}>Nov 11</div>
          <p className={`${prefix}mb-auto`}>This is a wider card with supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className={`${prefix}icon-link ${prefix}gap-1 ${prefix}icon-link-hover ${prefix}stretched-link`}>
            Continue reading
            <svg className={`${prefix}bi`}><use xlinkHref="#chevron-right"/></svg>
          </a>
        </div>
        <div className={`${prefix}col-auto ${prefix}d-none ${prefix}d-lg-block`}>
          <svg className={`${prefix}bd-placeholder-img`} width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
        </div>
      </div>
    </div>
  </div>

  <div className={`${prefix}row ${prefix}g-5`}>
    <div className={`${prefix}col-md-8`}>
      <h3 className={`${prefix}pb-4 ${prefix}mb-4 ${prefix}fst-italic ${prefix}border-bottom`}>
        From the Firehose
      </h3>

      <article className={`${prefix}blog-post`}>
        <h2 className={`${prefix}display-5 ${prefix}link-body-emphasis ${prefix}mb-1`}>Sample blog post</h2>
        <p className={`${prefix}blog-post-meta`}>January 1, 2021 by <a href="#">Mark</a></p>

        <p>This blog post shows a few different types of content that’s supported and styled. Basic typography, lists, tables, images, code, and more are all supported as expected.</p>
        <hr/>
        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <h2>Blockquotes</h2>
        <p>This is an example blockquote in action:</p>
        <blockquote className={`${prefix}blockquote`}>
          <p>Quoted text goes here.</p>
        </blockquote>
        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <h3>Example lists</h3>
        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout. This is an example unordered list:</p>
        <ul>
          <li>First list item</li>
          <li>Second list item with a longer description</li>
          <li>Third list item to close it out</li>
        </ul>
        <p>And this is an ordered list:</p>
        <ol>
          <li>First list item</li>
          <li>Second list item with a longer description</li>
          <li>Third list item to close it out</li>
        </ol>
        <p>And this is a definition list:</p>
        <dl>
          <dt>HyperText Markup Language (HTML)</dt>
          <dd>The language used to describe and define the content of a Web page</dd>
          <dt>Cascading Style Sheets (CSS)</dt>
          <dd>Used to describe the appearance of Web content</dd>
          <dt>JavaScript (JS)</dt>
          <dd>The programming language used to build advanced Web sites and applications</dd>
        </dl>
        <h2>Inline HTML elements</h2>
        <p>HTML defines a long list of available inline tags, a complete list of which can be found on the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element">Mozilla Developer Network</a>.</p>
        <ul>
          <li><strong>To bold text</strong>, use <code className={`${prefix}language-plaintext ${prefix}highlighter-rouge`}>&lt;strong&gt;</code>.</li>
          <li><em>To italicize text</em>, use <code className={`${prefix}language-plaintext ${prefix}highlighter-rouge`}>&lt;em&gt;</code>.</li>
          <li>Abbreviations, like <abbr title="HyperText Markup Language">HTML</abbr> should use <code className={`${prefix}language-plaintext ${prefix}highlighter-rouge`}>&lt;abbr&gt;</code>, with an optional <code className={`${prefix}language-plaintext ${prefix}highlighter-rouge`}>title</code> attribute for the full phrase.</li>
          <li>Citations, like <cite>— Mark Otto</cite>, should use <code className={`${prefix}language-plaintext ${prefix}highlighter-rouge`}>&lt;cite&gt;</code>.</li>
          <li><del>Deleted</del> text should use <code className={`${prefix}language-plaintext ${prefix}highlighter-rouge`}>&lt;del&gt;</code> and <ins>inserted</ins> text should use <code className={`${prefix}language-plaintext ${prefix}highlighter-rouge`}>&lt;ins&gt;</code>.</li>
          <li>Superscript <sup>text</sup> uses <code className={`${prefix}language-plaintext ${prefix}highlighter-rouge`}>&lt;sup&gt;</code> and subscript <sub>text</sub> uses <code className={`${prefix}language-plaintext ${prefix}highlighter-rouge`}>&lt;sub&gt;</code>.</li>
        </ul>
        <p>Most of these elements are styled by browsers with few modifications on our part.</p>
        <h2>Heading</h2>
        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <h3>Sub-heading</h3>
        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <pre><code>Example code block</code></pre>
        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
      </article>

      <article className={`${prefix}blog-post`}>
        <h2 className={`${prefix}display-5 ${prefix}link-body-emphasis ${prefix}mb-1`}>Another blog post</h2>
        <p className={`${prefix}blog-post-meta`}>December 23, 2020 by <a href="#">Jacob</a></p>

        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <blockquote>
          <p>Longer quote goes here, maybe with some <strong>emphasized text</strong> in the middle of it.</p>
        </blockquote>
        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <h3>Example table</h3>
        <p>And don't forget about tables in these posts:</p>
        <table className={`${prefix}table`}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Upvotes</th>
              <th>Downvotes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alice</td>
              <td>10</td>
              <td>11</td>
            </tr>
            <tr>
              <td>Bob</td>
              <td>4</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Charlie</td>
              <td>7</td>
              <td>9</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>Totals</td>
              <td>21</td>
              <td>23</td>
            </tr>
          </tfoot>
        </table>

        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
      </article>

      <article className={`${prefix}blog-post`}>
        <h2 className={`${prefix}display-5 ${prefix}link-body-emphasis ${prefix}mb-1`}>New feature</h2>
        <p className={`${prefix}blog-post-meta`}>December 14, 2020 by <a href="#">Chris</a></p>

        <p>This is some additional paragraph placeholder content. It has been written to fill the available space and show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the demonstration flowing, so be on the lookout for this exact same string of text.</p>
        <ul>
          <li>First list item</li>
          <li>Second list item with a longer description</li>
          <li>Third list item to close it out</li>
        </ul>
        <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly repetitive body text used throughout.</p>
      </article>

      <nav className={`${prefix}blog-pagination`} aria-label="Pagination">
        <a className={`${prefix}btn ${prefix}btn-outline-primary ${prefix}rounded-pill`} href="#">Older</a>
        <a className={`${prefix}btn ${prefix}btn-outline-secondary ${prefix}rounded-pill ${prefix}disabled`} aria-disabled="true">Newer</a>
      </nav>

    </div>

    <div className={`${prefix}col-md-4`}>
      <div className={`${prefix}position-sticky`} style={{
        top: '2rem'
      }}>
        <div className={`${prefix}p-4 ${prefix}mb-3 ${prefix}bg-body-tertiary ${prefix}rounded`}>
          <h4 className={`${prefix}fst-italic`}>About</h4>
          <p className={`${prefix}mb-0`}>Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
        </div>

        <div>
          <h4 className={`${prefix}fst-italic`}>Recent posts</h4>
          <ul className={`${prefix}list-unstyled`}>
            <li>
              <a className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-lg-row ${prefix}gap-3 ${prefix}align-items-start ${prefix}align-items-lg-center ${prefix}py-3 ${prefix}link-body-emphasis ${prefix}text-decoration-none ${prefix}border-top`} href="#">
                <svg className={`${prefix}bd-placeholder-img`} width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>
                <div className={`${prefix}col-lg-8`}>
                  <h6 className={`${prefix}mb-0`}>Example blog post title</h6>
                  <small className={`${prefix}text-body-secondary`}>January 15, 2023</small>
                </div>
              </a>
            </li>
            <li>
              <a className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-lg-row ${prefix}gap-3 ${prefix}align-items-start ${prefix}align-items-lg-center ${prefix}py-3 ${prefix}link-body-emphasis ${prefix}text-decoration-none ${prefix}border-top`} href="#">
                <svg className={`${prefix}bd-placeholder-img`} width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>
                <div className={`${prefix}col-lg-8`}>
                  <h6 className={`${prefix}mb-0`}>This is another blog post title</h6>
                  <small className={`${prefix}text-body-secondary`}>January 14, 2023</small>
                </div>
              </a>
            </li>
            <li>
              <a className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-lg-row ${prefix}gap-3 ${prefix}align-items-start ${prefix}align-items-lg-center ${prefix}py-3 ${prefix}link-body-emphasis ${prefix}text-decoration-none ${prefix}border-top`} href="#">
                <svg className={`${prefix}bd-placeholder-img`} width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"/></svg>
                <div className={`${prefix}col-lg-8`}>
                  <h6 className={`${prefix}mb-0`}>Longer blog post title: This one has multiple lines!</h6>
                  <small className={`${prefix}text-body-secondary`}>January 13, 2023</small>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div className={`${prefix}p-4`}>
          <h4 className={`${prefix}fst-italic`}>Archives</h4>
          <ol className={`${prefix}list-unstyled ${prefix}mb-0`}>
            <li><a href="#">March 2021</a></li>
            <li><a href="#">February 2021</a></li>
            <li><a href="#">January 2021</a></li>
            <li><a href="#">December 2020</a></li>
            <li><a href="#">November 2020</a></li>
            <li><a href="#">October 2020</a></li>
            <li><a href="#">September 2020</a></li>
            <li><a href="#">August 2020</a></li>
            <li><a href="#">July 2020</a></li>
            <li><a href="#">June 2020</a></li>
            <li><a href="#">May 2020</a></li>
            <li><a href="#">April 2020</a></li>
          </ol>
        </div>

        <div className={`${prefix}p-4`}>
          <h4 className={`${prefix}fst-italic`}>Elsewhere</h4>
          <ol className={`${prefix}list-unstyled`}>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
          </ol>
        </div>
      </div>
    </div>
  </div>

</main>


    </>
  )
}
