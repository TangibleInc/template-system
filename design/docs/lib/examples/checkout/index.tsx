import React from 'react'
import { placeholderImage300x150 } from '@site/utilities/placeholder'

export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      
{/* <link href="checkout.css" rel="stylesheet">
<script src="checkout.js"></script></body> */}

<div className={`${prefix}container`}>
  <main>
    <div className={`${prefix}py-5 ${prefix}text-center`}>
    <img src={placeholderImage300x150} className={`${prefix}d-block ${prefix}w-100`} alt='...' />
      <h2>Checkout form</h2>
      <p className={`${prefix}lead`}>Below is an example form built entirely with form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
    </div>

    <div className={`${prefix}row ${prefix}g-5`}>
      <div className={`${prefix}col-md-5 ${prefix}col-lg-4 ${prefix}order-md-last`}>
        <h4 className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}align-items-center ${prefix}mb-3`}>
          <span className={`${prefix}text-primary`}>Your cart</span>
          <span className={`${prefix}badge ${prefix}bg-primary ${prefix}rounded-pill`}>3</span>
        </h4>
        <ul className={`${prefix}list-group ${prefix}mb-3`}>
          <li className={`${prefix}list-group-item ${prefix}d-flex ${prefix}justify-content-between ${prefix}lh-sm`}>
            <div>
              <h6 className={`${prefix}my-0`}>Product name</h6>
              <small className={`${prefix}text-body-secondary`}>Brief description</small>
            </div>
            <span className={`${prefix}text-body-secondary`}>$12</span>
          </li>
          <li className={`${prefix}list-group-item ${prefix}d-flex ${prefix}justify-content-between ${prefix}lh-sm`}>
            <div>
              <h6 className={`${prefix}my-0`}>Second product</h6>
              <small className={`${prefix}text-body-secondary`}>Brief description</small>
            </div>
            <span className={`${prefix}text-body-secondary`}>$8</span>
          </li>
          <li className={`${prefix}list-group-item ${prefix}d-flex ${prefix}justify-content-between ${prefix}lh-sm`}>
            <div>
              <h6 className={`${prefix}my-0`}>Third item</h6>
              <small className={`${prefix}text-body-secondary`}>Brief description</small>
            </div>
            <span className={`${prefix}text-body-secondary`}>$5</span>
          </li>
          <li className={`${prefix}list-group-item ${prefix}d-flex ${prefix}justify-content-between ${prefix}bg-body-tertiary`}>
            <div className={`${prefix}text-success`}>
              <h6 className={`${prefix}my-0`}>Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span className={`${prefix}text-success`}>−$5</span>
          </li>
          <li className={`${prefix}list-group-item ${prefix}d-flex ${prefix}justify-content-between`}>
            <span>Total (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>

        <form className={`${prefix}card ${prefix}p-2`}>
          <div className={`${prefix}input-group`}>
            <input type="text" className={`${prefix}form-control`} placeholder="Promo code"/>
            <button type="submit" className={`${prefix}btn ${prefix}btn-secondary`}>Redeem</button>
          </div>
        </form>
      </div>
      <div className={`${prefix}col-md-7 ${prefix}col-lg-8`}>
        <h4 className={`${prefix}mb-3`}>Billing address</h4>
        <form className={`${prefix}needs-validation`} novalidate>
          <div className={`${prefix}row ${prefix}g-3`}>
            <div className={`${prefix}col-sm-6`}>
              <label htmlFor="firstName" className={`${prefix}form-label`}>First name</label>
              <input type="text" className={`${prefix}form-control`} id="firstName" placeholder="" value="" required />
              <div className={`${prefix}invalid-feedback`}>
                Valid first name is required.
              </div>
            </div>

            <div className={`${prefix}col-sm-6`}>
              <label htmlFor="lastName" className={`${prefix}form-label`}>Last name</label>
              <input type="text" className={`${prefix}form-control`} id="lastName" placeholder="" value="" required />
              <div className={`${prefix}invalid-feedback`}>
                Valid last name is required.
              </div>
            </div>

            <div className={`${prefix}col-12`}>
              <label htmlFor="username" className={`${prefix}form-label`}>Username</label>
              <div className={`${prefix}input-group ${prefix}has-validation`}>
                <span className={`${prefix}input-group-text`}>@</span>
                <input type="text" className={`${prefix}form-control`} id="username" placeholder="Username" required />
              <div className={`${prefix}invalid-feedback`}>
                  Your username is required.
                </div>
              </div>
            </div>

            <div className={`${prefix}col-12`}>
              <label htmlFor="email" className={`${prefix}form-label`}>Email <span className={`${prefix}text-body-secondary`}>(Optional)</span></label>
              <input type="email" className={`${prefix}form-control`} id="email" placeholder="you@example.com" />
              <div className={`${prefix}invalid-feedback`}>
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className={`${prefix}col-12`}>
              <label htmlFor="address" className={`${prefix}form-label`}>Address</label>
              <input type="text" className={`${prefix}form-control`} id="address" placeholder="1234 Main St" required />
              <div className={`${prefix}invalid-feedback`}>
                Please enter your shipping address.
              </div>
            </div>

            <div className={`${prefix}col-12`}>
              <label htmlFor="address2" className={`${prefix}form-label`}>Address 2 <span className={`${prefix}text-body-secondary`}>(Optional)</span></label>
              <input type="text" className={`${prefix}form-control`} id="address2" placeholder="Apartment or suite" />
            </div>

            <div className={`${prefix}col-md-5`}>
              <label htmlFor="country" className={`${prefix}form-label`}>Country</label>
              <select className={`${prefix}form-select`} id="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div className={`${prefix}invalid-feedback`}>
                Please select a valid country.
              </div>
            </div>

            <div className={`${prefix}col-md-4`}>
              <label htmlFor="state" className={`${prefix}form-label`}>State</label>
              <select className={`${prefix}form-select`} id="state" required>
                <option value="">Choose...</option>
                <option>California</option>
              </select>
              <div className={`${prefix}invalid-feedback`}>
                Please provide a valid state.
              </div>
            </div>

            <div className={`${prefix}col-md-3`}>
              <label htmlFor="zip" className={`${prefix}form-label`}>Zip</label>
              <input type="text" className={`${prefix}form-control`} id="zip" placeholder="" required />
              <div className={`${prefix}invalid-feedback`}>
                Zip code required.
              </div>
            </div>
          </div>

          <hr className={`${prefix}my-4`}/>

          <div className={`${prefix}form-check`}>
            <input type="checkbox" className={`${prefix}form-check-input`} id="same-address" />
            <label className={`${prefix}form-check-label`} htmlFor="same-address">Shipping address is the same as my billing address</label>
          </div>

          <div className={`${prefix}form-check`}>
            <input type="checkbox" className={`${prefix}form-check-input`} id="save-info" />
            <label className={`${prefix}form-check-label`} htmlFor="save-info">Save this information for next time</label>
          </div>

          <hr className={`${prefix}my-4`}/>

          <h4 className={`${prefix}mb-3`}>Payment</h4>

          <div className={`${prefix}my-3`}>
            <div className={`${prefix}form-check`}>
              <input id="credit" name="paymentMethod" type="radio" className={`${prefix}form-check-input`} checked required />
              <label className={`${prefix}form-check-label`} htmlFor="credit">Credit card</label>
            </div>
            <div className={`${prefix}form-check`}>
              <input id="debit" name="paymentMethod" type="radio" className={`${prefix}form-check-input`} required />
              <label className={`${prefix}form-check-label`} htmlFor="debit">Debit card</label>
            </div>
            <div className={`${prefix}form-check`}>
              <input id="paypal" name="paymentMethod" type="radio" className={`${prefix}form-check-input`} required />
              <label className={`${prefix}form-check-label`} htmlFor="paypal">PayPal</label>
            </div>
          </div>

          <div className={`${prefix}row ${prefix}gy-3`}>
            <div className={`${prefix}col-md-6`}>
              <label htmlFor="cc-name" className={`${prefix}form-label`}>Name on card</label>
              <input type="text" className={`${prefix}form-control`} id="cc-name" placeholder="" required />
              <small className={`${prefix}text-body-secondary`}>Full name as displayed on card</small>
              <div className={`${prefix}invalid-feedback`}>
                Name on card is required
              </div>
            </div>

            <div className={`${prefix}col-md-6`}>
              <label htmlFor="cc-number" className={`${prefix}form-label`}>Credit card number</label>
              <input type="text" className={`${prefix}form-control`} id="cc-number" placeholder="" required />
              <div className={`${prefix}invalid-feedback`}>
                Credit card number is required
              </div>
            </div>

            <div className={`${prefix}col-md-3`}>
              <label htmlFor="cc-expiration" className={`${prefix}form-label`}>Expiration</label>
              <input type="text" className={`${prefix}form-control`} id="cc-expiration" placeholder="" required />
              <div className={`${prefix}invalid-feedback`}>
                Expiration date required
              </div>
            </div>

            <div className={`${prefix}col-md-3`}>
              <label htmlFor="cc-cvv" className={`${prefix}form-label`}>CVV</label>
              <input type="text" className={`${prefix}form-control`} id="cc-cvv" placeholder="" required />
              <div className={`${prefix}invalid-feedback`}>
                Security code required
              </div>
            </div>
          </div>

          <hr className={`${prefix}my-4`}/>

          <button className={`${prefix}w-100 ${prefix}btn ${prefix}btn-primary ${prefix}btn-lg`} type="submit">Continue to checkout</button>
        </form>
      </div>
    </div>
  </main>

  <footer className={`${prefix}my-5 ${prefix}pt-5 ${prefix}text-body-secondary ${prefix}text-center ${prefix}text-small`}>
    <p className={`${prefix}mb-1`}>&copy; 2017–2023 Company Name</p>
    <ul className={`${prefix}list-inline`}>
      <li className={`${prefix}list-inline-item`}><a href="#">Privacy</a></li>
      <li className={`${prefix}list-inline-item`}><a href="#">Terms</a></li>
      <li className={`${prefix}list-inline-item`}><a href="#">Support</a></li>
    </ul>
  </footer>
</div>


    </>
  )
}
