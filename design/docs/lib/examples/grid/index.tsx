import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      
{/* <link href="grid.css" rel="stylesheet"> */}

<div className={`${prefix}py-4`}>


<main>
  <div className={`${prefix}container`}>

    <h1>Example grid examples</h1>
    <p className={`${prefix}lead`}>Basic grid layouts to get you familiar with building within the Example grid system.</p>
    <p>In these examples the <code>.themed-grid-col</code> class is added to the columns to add some theming. This is not a class that is available in Example by default.</p>

    <h2 className={`${prefix}mt-4`}>Five grid tiers</h2>
    <p>There are five tiers to the Example grid system, one for each range of devices we support. Each tier starts at a minimum viewport size and automatically applies to the larger devices unless overridden.</p>

    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-4 ${prefix}themed-grid-col`}>.col-4</div>
      <div className={`${prefix}col-4 ${prefix}themed-grid-col`}>.col-4</div>
      <div className={`${prefix}col-4 ${prefix}themed-grid-col`}>.col-4</div>
    </div>

    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-sm-4 ${prefix}themed-grid-col`}>.col-sm-4</div>
      <div className={`${prefix}col-sm-4 ${prefix}themed-grid-col`}>.col-sm-4</div>
      <div className={`${prefix}col-sm-4 ${prefix}themed-grid-col`}>.col-sm-4</div>
    </div>

    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-md-4</div>
      <div className={`${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-md-4</div>
      <div className={`${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-md-4</div>
    </div>

    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-lg-4 ${prefix}themed-grid-col`}>.col-lg-4</div>
      <div className={`${prefix}col-lg-4 ${prefix}themed-grid-col`}>.col-lg-4</div>
      <div className={`${prefix}col-lg-4 ${prefix}themed-grid-col`}>.col-lg-4</div>
    </div>

    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-xl-4 ${prefix}themed-grid-col`}>.col-xl-4</div>
      <div className={`${prefix}col-xl-4 ${prefix}themed-grid-col`}>.col-xl-4</div>
      <div className={`${prefix}col-xl-4 ${prefix}themed-grid-col`}>.col-xl-4</div>
    </div>

    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-xxl-4 ${prefix}themed-grid-col`}>.col-xxl-4</div>
      <div className={`${prefix}col-xxl-4 ${prefix}themed-grid-col`}>.col-xxl-4</div>
      <div className={`${prefix}col-xxl-4 ${prefix}themed-grid-col`}>.col-xxl-4</div>
    </div>

    <h2 className={`${prefix}mt-4`}>Three equal columns</h2>
    <p>Get three equal-width columns <strong>starting at desktops and scaling to large desktops</strong>. On mobile devices, tablets and below, the columns will automatically stack.</p>
    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-md-4</div>
      <div className={`${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-md-4</div>
      <div className={`${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-md-4</div>
    </div>

    <h2 className={`${prefix}mt-4`}>Three equal columns alternative</h2>
    <p>By using the <code>.row-cols-*</code> classes, you can easily create a grid with equal columns.</p>
    <div className={`${prefix}row ${prefix}row-cols-md-3 ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> child of <code>.row-cols-md-3</code></div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> child of <code>.row-cols-md-3</code></div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> child of <code>.row-cols-md-3</code></div>
    </div>

    <h2 className={`${prefix}mt-4`}>Three unequal columns</h2>
    <p>Get three columns <strong>starting at desktops and scaling to large desktops</strong> of various widths. Remember, grid columns should add up to twelve for a single horizontal block. More than that, and columns start stacking no matter the viewport.</p>
    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-md-3 ${prefix}themed-grid-col`}>.col-md-3</div>
      <div className={`${prefix}col-md-6 ${prefix}themed-grid-col`}>.col-md-6</div>
      <div className={`${prefix}col-md-3 ${prefix}themed-grid-col`}>.col-md-3</div>
    </div>

    <h2 className={`${prefix}mt-4`}>Two columns</h2>
    <p>Get two columns <strong>starting at desktops and scaling to large desktops</strong>.</p>
    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-md-8 ${prefix}themed-grid-col`}>.col-md-8</div>
      <div className={`${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-md-4</div>
    </div>

    <h2 className={`${prefix}mt-4`}>Full width, single column</h2>
    <p className={`${prefix}text-warning`}>
      No grid classes are necessary for full-width elements.
    </p>

    <hr className={`${prefix}my-4`}/>

    <h2 className={`${prefix}mt-4`}>Two columns with two nested columns</h2>
    <p>Per the documentation, nesting is easy—just put a row of columns within an existing column. This gives you two columns <strong>starting at desktops and scaling to large desktops</strong>, with another two (equal widths) within the larger column.</p>
    <p>At mobile device sizes, tablets and down, these columns and their nested columns will stack.</p>
    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-md-8 ${prefix}themed-grid-col`}>
        <div className={`${prefix}pb-3`}>
          .col-md-8
        </div>
        <div className={`${prefix}row`}>
          <div className={`${prefix}col-md-6 ${prefix}themed-grid-col`}>.col-md-6</div>
          <div className={`${prefix}col-md-6 ${prefix}themed-grid-col`}>.col-md-6</div>
        </div>
      </div>
      <div className={`${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-md-4</div>
    </div>

    <hr className={`${prefix}my-4`}/>

    <h2 className={`${prefix}mt-4`}>Mixed: mobile and desktop</h2>
    <p>The Example v5 grid system has six tiers of classes: xs (extra small, this class infix is not used), sm (small), md (medium), lg (large), xl (x-large), and xxl (xx-large). You can use nearly any combination of these classes to create more dynamic and flexible layouts.</p>
    <p>Each tier of classes scales up, meaning if you plan on setting the same widths for md, lg, xl and xxl, you only need to specify md.</p>
    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-md-8 ${prefix}themed-grid-col`}>.col-md-8</div>
      <div className={`${prefix}col-6 ${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-6 .col-md-4</div>
    </div>
    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-6 ${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-6 .col-md-4</div>
      <div className={`${prefix}col-6 ${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-6 .col-md-4</div>
      <div className={`${prefix}col-6 ${prefix}col-md-4 ${prefix}themed-grid-col`}>.col-6 .col-md-4</div>
    </div>
    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-6 ${prefix}themed-grid-col`}>.col-6</div>
      <div className={`${prefix}col-6 ${prefix}themed-grid-col`}>.col-6</div>
    </div>

    <hr className={`${prefix}my-4`}/>

    <h2 className={`${prefix}mt-4`}>Mixed: mobile, tablet, and desktop</h2>
    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-sm-6 ${prefix}col-lg-8 ${prefix}themed-grid-col`}>.col-sm-6 .col-lg-8</div>
      <div className={`${prefix}col-6 ${prefix}col-lg-4 ${prefix}themed-grid-col`}>.col-6 .col-lg-4</div>
    </div>
    <div className={`${prefix}row ${prefix}mb-3 ${prefix}text-center`}>
      <div className={`${prefix}col-6 ${prefix}col-sm-4 ${prefix}themed-grid-col`}>.col-6 .col-sm-4</div>
      <div className={`${prefix}col-6 ${prefix}col-sm-4 ${prefix}themed-grid-col`}>.col-6 .col-sm-4</div>
      <div className={`${prefix}col-6 ${prefix}col-sm-4 ${prefix}themed-grid-col`}>.col-6 .col-sm-4</div>
    </div>

    <hr className={`${prefix}my-4`}/>

    <h2 className={`${prefix}mt-4`}>Gutters</h2>
    <p>With <code>.gx-*</code> classes, the horizontal gutters can be adjusted.</p>
    <div className={`${prefix}row ${prefix}row-cols-1 ${prefix}row-cols-md-3 ${prefix}gx-4 ${prefix}text-center`}>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gx-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gx-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gx-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gx-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gx-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gx-4</code> gutters</div>
    </div>
    <p className={`${prefix}mt-4`}>Use the <code>.gy-*</code> classes to control the vertical gutters.</p>
    <div className={`${prefix}row ${prefix}row-cols-1 ${prefix}row-cols-md-3 ${prefix}gy-4 ${prefix}text-center`}>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gy-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gy-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gy-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gy-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gy-4</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.gy-4</code> gutters</div>
    </div>
    <p className={`${prefix}mt-4`}>With <code>.g-*</code> classes, the gutters in both directions can be adjusted.</p>
    <div className={`${prefix}row ${prefix}row-cols-1 ${prefix}row-cols-md-3 ${prefix}g-3 ${prefix}text-center`}>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.g-3</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.g-3</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.g-3</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.g-3</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.g-3</code> gutters</div>
      <div className={`${prefix}col ${prefix}themed-grid-col`}><code>.col</code> with <code>.g-3</code> gutters</div>
    </div>
  </div>

  <div className={`${prefix}container`} id="containers">
    <hr className={`${prefix}my-4`}/>

    <h2 className={`${prefix}mt-4`}>Containers</h2>
    <p>Additional classes added in Example v4.4 allow containers that are 100% wide until a particular breakpoint. v5 adds a new <code>xxl</code> breakpoint.</p>
  </div>

  <div className={`${prefix}container ${prefix}themed-container ${prefix}text-center`}>.container</div>
  <div className={`${prefix}container-sm ${prefix}themed-container ${prefix}text-center`}>.container-sm</div>
  <div className={`${prefix}container-md ${prefix}themed-container ${prefix}text-center`}>.container-md</div>
  <div className={`${prefix}container-lg ${prefix}themed-container ${prefix}text-center`}>.container-lg</div>
  <div className={`${prefix}container-xl ${prefix}themed-container ${prefix}text-center`}>.container-xl</div>
  <div className={`${prefix}container-xxl ${prefix}themed-container ${prefix}text-center`}>.container-xxl</div>
  <div className={`${prefix}container-fluid ${prefix}themed-container ${prefix}text-center`}>.container-fluid</div>
</main>

</div>

    </>
  )
}
