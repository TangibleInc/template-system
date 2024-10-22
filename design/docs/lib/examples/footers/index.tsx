import React from 'react'
export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      
<svg xmlns="http://www.w3.org/2000/svg" className={`${prefix}d-none`}>
  <symbol id="bootstrap" viewBox="0 0 118 94">
    <title>Example</title>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path>
  </symbol>
  <symbol id="facebook" viewBox="0 0 16 16">
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
  </symbol>
  <symbol id="instagram" viewBox="0 0 16 16">
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
  </symbol>
  <symbol id="twitter" viewBox="0 0 16 16">
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
  </symbol>
</svg>

<div className={`${prefix}container`}>
  <footer className={`${prefix}d-flex ${prefix}flex-wrap ${prefix}justify-content-between ${prefix}align-items-center ${prefix}py-3 ${prefix}my-4 ${prefix}border-top`}>
    <p className={`${prefix}col-md-4 ${prefix}mb-0 ${prefix}text-body-secondary`}>&copy; 2023 Company, Inc</p>

    <a href="/" className={`${prefix}col-md-4 ${prefix}d-flex ${prefix}align-items-center ${prefix}justify-content-center ${prefix}mb-3 ${prefix}mb-md-0 ${prefix}me-md-auto ${prefix}link-body-emphasis ${prefix}text-decoration-none`}>
      <svg className={`${prefix}bi ${prefix}me-2`} width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
    </a>

    <ul className={`${prefix}nav ${prefix}col-md-4 ${prefix}justify-content-end`}>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>Home</a></li>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>Features</a></li>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>Pricing</a></li>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>FAQs</a></li>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>About</a></li>
    </ul>
  </footer>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}container`}>
  <footer className={`${prefix}d-flex ${prefix}flex-wrap ${prefix}justify-content-between ${prefix}align-items-center ${prefix}py-3 ${prefix}my-4 ${prefix}border-top`}>
    <div className={`${prefix}col-md-4 ${prefix}d-flex ${prefix}align-items-center`}>
      <a href="/" className={`${prefix}mb-3 ${prefix}me-2 ${prefix}mb-md-0 ${prefix}text-body-secondary ${prefix}text-decoration-none ${prefix}lh-1`}>
        <svg className={`${prefix}bi`} width="30" height="24"><use xlinkHref="#bootstrap"/></svg>
      </a>
      <span className={`${prefix}mb-3 ${prefix}mb-md-0 ${prefix}text-body-secondary`}>&copy; 2023 Company, Inc</span>
    </div>

    <ul className={`${prefix}nav ${prefix}col-md-4 ${prefix}justify-content-end ${prefix}list-unstyled ${prefix}d-flex`}>
      <li className={`${prefix}ms-3`}><a className={`${prefix}text-body-secondary`} href="#"><svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#twitter"/></svg></a></li>
      <li className={`${prefix}ms-3`}><a className={`${prefix}text-body-secondary`} href="#"><svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#instagram"/></svg></a></li>
      <li className={`${prefix}ms-3`}><a className={`${prefix}text-body-secondary`} href="#"><svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#facebook"/></svg></a></li>
    </ul>
  </footer>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}container`}>
  <footer className={`${prefix}py-3 ${prefix}my-4`}>
    <ul className={`${prefix}nav ${prefix}justify-content-center ${prefix}border-bottom ${prefix}pb-3 ${prefix}mb-3`}>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>Home</a></li>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>Features</a></li>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>Pricing</a></li>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>FAQs</a></li>
      <li className={`${prefix}nav-item`}><a href="#" className={`${prefix}nav-link ${prefix}px-2 ${prefix}text-body-secondary`}>About</a></li>
    </ul>
    <p className={`${prefix}text-center ${prefix}text-body-secondary`}>&copy; 2023 Company, Inc</p>
  </footer>
</div>

<div className={`${prefix}b-example-divider`}></div>

<div className={`${prefix}container`}>
  <footer className={`${prefix}row ${prefix}row-cols-1 ${prefix}row-cols-sm-2 ${prefix}row-cols-md-5 ${prefix}py-5 ${prefix}my-5 ${prefix}border-top`}>
    <div className={`${prefix}col ${prefix}mb-3`}>
      <a href="/" className={`${prefix}d-flex ${prefix}align-items-center ${prefix}mb-3 ${prefix}link-body-emphasis ${prefix}text-decoration-none`}>
        <svg className={`${prefix}bi ${prefix}me-2`} width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
      </a>
      <p className={`${prefix}text-body-secondary`}>&copy; 2023</p>
    </div>

    <div className={`${prefix}col ${prefix}mb-3`}>

    </div>

    <div className={`${prefix}col ${prefix}mb-3`}>
      <h5>Section</h5>
      <ul className={`${prefix}nav ${prefix}flex-column`}>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Home</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Features</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Pricing</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>FAQs</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>About</a></li>
      </ul>
    </div>

    <div className={`${prefix}col ${prefix}mb-3`}>
      <h5>Section</h5>
      <ul className={`${prefix}nav ${prefix}flex-column`}>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Home</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Features</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Pricing</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>FAQs</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>About</a></li>
      </ul>
    </div>

    <div className={`${prefix}col ${prefix}mb-3`}>
      <h5>Section</h5>
      <ul className={`${prefix}nav ${prefix}flex-column`}>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Home</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Features</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Pricing</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>FAQs</a></li>
        <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>About</a></li>
      </ul>
    </div>
  </footer>
</div>

<div className={`${prefix}b-example-divider`}></div>


<div className={`${prefix}container`}>
  <footer className={`${prefix}py-5`}>
    <div className={`${prefix}row`}>
      <div className={`${prefix}col-6 ${prefix}col-md-2 ${prefix}mb-3`}>
        <h5>Section</h5>
        <ul className={`${prefix}nav ${prefix}flex-column`}>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Home</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Features</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Pricing</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>FAQs</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>About</a></li>
        </ul>
      </div>

      <div className={`${prefix}col-6 ${prefix}col-md-2 ${prefix}mb-3`}>
        <h5>Section</h5>
        <ul className={`${prefix}nav ${prefix}flex-column`}>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Home</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Features</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Pricing</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>FAQs</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>About</a></li>
        </ul>
      </div>

      <div className={`${prefix}col-6 ${prefix}col-md-2 ${prefix}mb-3`}>
        <h5>Section</h5>
        <ul className={`${prefix}nav ${prefix}flex-column`}>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Home</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Features</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>Pricing</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>FAQs</a></li>
          <li className={`${prefix}nav-item ${prefix}mb-2`}><a href="#" className={`${prefix}nav-link ${prefix}p-0 ${prefix}text-body-secondary`}>About</a></li>
        </ul>
      </div>

      <div className={`${prefix}col-md-5 ${prefix}offset-md-1 ${prefix}mb-3`}>
        <form>
          <h5>Subscribe to our newsletter</h5>
          <p>Monthly digest of what's new and exciting from us.</p>
          <div className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-sm-row ${prefix}w-100 ${prefix}gap-2`}>
            <label htmlFor="newsletter1" className={`${prefix}visually-hidden`}>Email address</label>
            <input id="newsletter1" type="text" className={`${prefix}form-control`} placeholder="Email address"/>
            <button className={`${prefix}btn ${prefix}btn-primary`} type="button">Subscribe</button>
          </div>
        </form>
      </div>
    </div>

    <div className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-sm-row ${prefix}justify-content-between ${prefix}py-4 ${prefix}my-4 ${prefix}border-top`}>
      <p>&copy; 2023 Company, Inc. All rights reserved.</p>
      <ul className={`${prefix}list-unstyled ${prefix}d-flex`}>
        <li className={`${prefix}ms-3`}><a className={`${prefix}link-body-emphasis`} href="#"><svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#twitter"/></svg></a></li>
        <li className={`${prefix}ms-3`}><a className={`${prefix}link-body-emphasis`} href="#"><svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#instagram"/></svg></a></li>
        <li className={`${prefix}ms-3`}><a className={`${prefix}link-body-emphasis`} href="#"><svg className={`${prefix}bi`} width="24" height="24"><use xlinkHref="#facebook"/></svg></a></li>
      </ul>
    </div>
  </footer>
</div>

    </>
  )
}
