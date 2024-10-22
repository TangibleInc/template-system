import React from 'react'
import '@site/all' // Listens to events on data-t attributes
import styles from './all.module.css'

export function Typography({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='typography'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Typography</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../content/typography/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <p className={`${prefix}display-1`}>Display 1</p>
            <p className={`${prefix}display-2`}>Display 2</p>
            <p className={`${prefix}display-3`}>Display 3</p>
            <p className={`${prefix}display-4`}>Display 4</p>
            <p className={`${prefix}display-5`}>Display 5</p>
            <p className={`${prefix}display-6`}>Display 6</p>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <p className={`${prefix}h1`}>Heading 1</p>
            <p className={`${prefix}h2`}>Heading 2</p>
            <p className={`${prefix}h3`}>Heading 3</p>
            <p className={`${prefix}h4`}>Heading 4</p>
            <p className={`${prefix}h5`}>Heading 5</p>
            <p className={`${prefix}h6`}>Heading 6</p>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <p className={`${prefix}lead`}>
              This is a lead paragraph. It stands out from regular paragraphs.
            </p>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <p>
              You can use the mark tag to <mark>highlight</mark> text.
            </p>
            <p>
              <del>
                This line of text is meant to be treated as deleted text.
              </del>
            </p>
            <p>
              <s>
                This line of text is meant to be treated as no longer accurate.
              </s>
            </p>
            <p>
              <ins>
                This line of text is meant to be treated as an addition to the
                document.
              </ins>
            </p>
            <p>
              <u>This line of text will render as underlined.</u>
            </p>
            <p>
              <small>
                This line of text is meant to be treated as fine print.
              </small>
            </p>
            <p>
              <strong>This line rendered as bold text.</strong>
            </p>
            <p>
              <em>This line rendered as italicized text.</em>
            </p>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <hr />
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <blockquote className={`${prefix}blockquote`}>
              <p>A well-known quote, contained in a blockquote element.</p>
              <footer className={`${prefix}blockquote-footer`}>
                Someone famous in <cite title='Source Title'>Source Title</cite>
              </footer>
            </blockquote>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <ul className={`${prefix}list-unstyled`}>
              <li>This is a list.</li>
              <li>It appears completely unstyled.</li>
              <li>Structurally, it's still a list.</li>
              <li>
                However, this style only applies to immediate child elements.
              </li>
              <li>
                Nested lists:
                <ul>
                  <li>are unaffected by this style</li>
                  <li>will still show a bullet</li>
                  <li>and have appropriate left margin</li>
                </ul>
              </li>
              <li>This may still come in handy in some situations.</li>
            </ul>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <ul className={`${prefix}list-inline`}>
              <li className={`${prefix}list-inline-item`}>
                This is a list item.
              </li>
              <li className={`${prefix}list-inline-item`}>And another one.</li>
              <li className={`${prefix}list-inline-item`}>
                But they're displayed inline.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Images({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='images'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Images</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../content/images/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <svg
              className={`${prefix}bd-placeholder-img ${prefix}bd-placeholder-img-lg ${prefix}img-fluid`}
              width='100%'
              height='250'
              xmlns='http://www.w3.org/2000/svg'
              role='img'
              aria-label='Placeholder: Responsive image'
              preserveAspectRatio='xMidYMid slice'
              focusable='false'
            >
              <title>Placeholder</title>
              <rect width='100%' height='100%' fill='#868e96' />
              <text x='50%' y='50%' fill='#dee2e6' dy='.3em'>
                Responsive image
              </text>
            </svg>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <svg
              className={`${prefix}bd-placeholder-img ${prefix}img-thumbnail`}
              width='200'
              height='200'
              xmlns='http://www.w3.org/2000/svg'
              role='img'
              aria-label='A generic square placeholder image with a white border around it, making it resemble a photograph taken with an old instant camera: 200x200'
              preserveAspectRatio='xMidYMid slice'
              focusable='false'
            >
              <title>
                A generic square placeholder image with a white border around
                it, making it resemble a photograph taken with an old instant
                camera
              </title>
              <rect width='100%' height='100%' fill='#868e96' />
              <text x='50%' y='50%' fill='#dee2e6' dy='.3em'>
                200x200
              </text>
            </svg>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Tables({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='tables'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Tables</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../content/tables/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <table className={`${prefix}table ${prefix}table-striped`}>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>First</th>
                  <th scope='col'>Last</th>
                  <th scope='col'>Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope='row'>2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope='row'>3</th>
                  <td colspan='2'>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <table
              className={`${prefix}table ${prefix}table-dark ${prefix}table-borderless`}
            >
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>First</th>
                  <th scope='col'>Last</th>
                  <th scope='col'>Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope='row'>2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope='row'>3</th>
                  <td colspan='2'>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <table className={`${prefix}table ${prefix}table-hover`}>
              <thead>
                <tr>
                  <th scope='col'>Class</th>
                  <th scope='col'>Heading</th>
                  <th scope='col'>Heading</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>Default</th>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>

                <tr className={`${prefix}table-primary`}>
                  <th scope='row'>Primary</th>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>
                <tr className={`${prefix}table-secondary`}>
                  <th scope='row'>Secondary</th>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>
                <tr className={`${prefix}table-success`}>
                  <th scope='row'>Success</th>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>
                <tr className={`${prefix}table-danger`}>
                  <th scope='row'>Danger</th>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>
                <tr className={`${prefix}table-warning`}>
                  <th scope='row'>Warning</th>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>
                <tr className={`${prefix}table-info`}>
                  <th scope='row'>Info</th>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>
                <tr className={`${prefix}table-light`}>
                  <th scope='row'>Light</th>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>
                <tr className={`${prefix}table-dark`}>
                  <th scope='row'>Dark</th>
                  <td>Cell</td>
                  <td>Cell</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <table
              className={`${prefix}table ${prefix}table-sm ${prefix}table-bordered`}
            >
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>First</th>
                  <th scope='col'>Last</th>
                  <th scope='col'>Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope='row'>2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope='row'>3</th>
                  <td colspan='2'>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Figures({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='figures'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Figures</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../content/figures/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <figure className={`${prefix}figure`}>
              <svg
                className={`${prefix}bd-placeholder-img ${prefix}figure-img ${prefix}img-fluid ${prefix}rounded`}
                width='400'
                height='300'
                xmlns='http://www.w3.org/2000/svg'
                role='img'
                aria-label='Placeholder: 400x300'
                preserveAspectRatio='xMidYMid slice'
                focusable='false'
              >
                <title>Placeholder</title>
                <rect width='100%' height='100%' fill='#868e96' />
                <text x='50%' y='50%' fill='#dee2e6' dy='.3em'>
                  400x300
                </text>
              </svg>
              <figcaption className={`${prefix}figure-caption`}>
                A caption for the above image.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </article>
  )
}

export function FormOverview({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='form-overview'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Overview</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../forms/overview/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <form>
              <div className={`${prefix}mb-3`}>
                <label
                  htmlFor='exampleInputEmail1'
                  className={`${prefix}form-label`}
                >
                  Email address
                </label>
                <input
                  type='email'
                  className={`${prefix}form-control`}
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                />
                <div id='emailHelp' className={`${prefix}form-text`}>
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className={`${prefix}mb-3`}>
                <label
                  htmlFor='exampleInputPassword1'
                  className={`${prefix}form-label`}
                >
                  Password
                </label>
                <input
                  type='password'
                  className={`${prefix}form-control`}
                  id='exampleInputPassword1'
                />
              </div>
              <div className={`${prefix}mb-3`}>
                <label
                  htmlFor='exampleSelect'
                  className={`${prefix}form-label`}
                >
                  Select menu
                </label>
                <select className={`${prefix}form-select`} id='exampleSelect'>
                  <option selected>Open this select menu</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </select>
              </div>
              <div className={`${prefix}mb-3 ${prefix}form-check`}>
                <input
                  type='checkbox'
                  className={`${prefix}form-check-input`}
                  id='exampleCheck1'
                />
                <label
                  className={`${prefix}form-check-label`}
                  htmlFor='exampleCheck1'
                >
                  Check me out
                </label>
              </div>
              <fieldset className={`${prefix}mb-3`}>
                <legend>Radios buttons</legend>
                <div className={`${prefix}form-check`}>
                  <input
                    type='radio'
                    name='radios'
                    className={`${prefix}form-check-input`}
                    id='exampleRadio1'
                  />
                  <label
                    className={`${prefix}form-check-label`}
                    htmlFor='exampleRadio1'
                  >
                    Default radio
                  </label>
                </div>
                <div className={`${prefix}mb-3 ${prefix}form-check`}>
                  <input
                    type='radio'
                    name='radios'
                    className={`${prefix}form-check-input`}
                    id='exampleRadio2'
                  />
                  <label
                    className={`${prefix}form-check-label`}
                    htmlFor='exampleRadio2'
                  >
                    Another radio
                  </label>
                </div>
              </fieldset>
              <div className={`${prefix}mb-3`}>
                <label className={`${prefix}form-label`} htmlFor='customFile'>
                  Upload
                </label>
                <input
                  type='file'
                  className={`${prefix}form-control`}
                  id='customFile'
                />
              </div>
              <div
                className={`${prefix}mb-3 ${prefix}form-check ${prefix}form-switch`}
              >
                <input
                  className={`${prefix}form-check-input`}
                  type='checkbox'
                  role='switch'
                  id='flexSwitchCheckChecked'
                  checked
                />
                <label
                  className={`${prefix}form-check-label`}
                  htmlFor='flexSwitchCheckChecked'
                >
                  Checked switch checkbox input
                </label>
              </div>
              <div className={`${prefix}mb-3`}>
                <label htmlFor='customRange3' className={`${prefix}form-label`}>
                  Example range
                </label>
                <input
                  type='range'
                  className={`${prefix}form-range`}
                  min='0'
                  max='5'
                  step='0.5'
                  id='customRange3'
                />
              </div>
              <button
                type='submit'
                className={`${prefix}btn ${prefix}btn-primary`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </article>
  )
}

export function DisabledForms({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='disabled-forms'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Disabled forms</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../forms/overview/#disabled-forms'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <form>
              <fieldset disabled aria-label='Disabled fieldset example'>
                <div className={`${prefix}mb-3`}>
                  <label
                    htmlFor='disabledTextInput'
                    className={`${prefix}form-label`}
                  >
                    Disabled input
                  </label>
                  <input
                    type='text'
                    id='disabledTextInput'
                    className={`${prefix}form-control`}
                    placeholder='Disabled input'
                  />
                </div>
                <div className={`${prefix}mb-3`}>
                  <label
                    htmlFor='disabledSelect'
                    className={`${prefix}form-label`}
                  >
                    Disabled select menu
                  </label>
                  <select
                    id='disabledSelect'
                    className={`${prefix}form-select`}
                  >
                    <option>Disabled select</option>
                  </select>
                </div>
                <div className={`${prefix}mb-3`}>
                  <div className={`${prefix}form-check`}>
                    <input
                      className={`${prefix}form-check-input`}
                      type='checkbox'
                      id='disabledFieldsetCheck'
                      disabled
                    />
                    <label
                      className={`${prefix}form-check-label`}
                      htmlFor='disabledFieldsetCheck'
                    >
                      Can't check this
                    </label>
                  </div>
                </div>
                <fieldset className={`${prefix}mb-3`}>
                  <legend>Disabled radios buttons</legend>
                  <div className={`${prefix}form-check`}>
                    <input
                      type='radio'
                      name='radios'
                      className={`${prefix}form-check-input`}
                      id='disabledRadio1'
                      disabled
                    />
                    <label
                      className={`${prefix}form-check-label`}
                      htmlFor='disabledRadio1'
                    >
                      Disabled radio
                    </label>
                  </div>
                  <div className={`${prefix}mb-3 ${prefix}form-check`}>
                    <input
                      type='radio'
                      name='radios'
                      className={`${prefix}form-check-input`}
                      id='disabledRadio2'
                      disabled
                    />
                    <label
                      className={`${prefix}form-check-label`}
                      htmlFor='disabledRadio2'
                    >
                      Another radio
                    </label>
                  </div>
                </fieldset>
                <div className={`${prefix}mb-3`}>
                  <label
                    className={`${prefix}form-label`}
                    htmlFor='disabledCustomFile'
                  >
                    Upload
                  </label>
                  <input
                    type='file'
                    className={`${prefix}form-control`}
                    id='disabledCustomFile'
                    disabled
                  />
                </div>
                <div
                  className={`${prefix}mb-3 ${prefix}form-check ${prefix}form-switch`}
                >
                  <input
                    className={`${prefix}form-check-input`}
                    type='checkbox'
                    role='switch'
                    id='disabledSwitchCheckChecked'
                    checked
                    disabled
                  />
                  <label
                    className={`${prefix}form-check-label`}
                    htmlFor='disabledSwitchCheckChecked'
                  >
                    Disabled checked switch checkbox input
                  </label>
                </div>
                <div className={`${prefix}mb-3`}>
                  <label
                    htmlFor='disabledRange'
                    className={`${prefix}form-label`}
                  >
                    Disabled range
                  </label>
                  <input
                    type='range'
                    className={`${prefix}form-range`}
                    min='0'
                    max='5'
                    step='0.5'
                    id='disabledRange'
                  />
                </div>
                <button
                  type='submit'
                  className={`${prefix}btn ${prefix}btn-primary`}
                >
                  Submit
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </article>
  )
}

export function FormSizing({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='form-sizing'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Sizing</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../forms/form-control/#sizing'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div className={`${prefix}mb-3`}>
              <input
                className={`${prefix}form-control ${prefix}form-control-lg`}
                type='text'
                placeholder='.form-control-lg'
                aria-label='.form-control-lg example'
              />
            </div>
            <div className={`${prefix}mb-3`}>
              <select
                className={`${prefix}form-select ${prefix}form-select-lg`}
                aria-label='.form-select-lg example'
              >
                <option selected>Open this select menu</option>
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
              </select>
            </div>
            <div className={`${prefix}mb-3`}>
              <input
                type='file'
                className={`${prefix}form-control ${prefix}form-control-lg`}
                aria-label='Large file input example'
              />
            </div>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div className={`${prefix}mb-3`}>
              <input
                className={`${prefix}form-control ${prefix}form-control-sm`}
                type='text'
                placeholder='.form-control-sm'
                aria-label='.form-control-sm example'
              />
            </div>
            <div className={`${prefix}mb-3`}>
              <select
                className={`${prefix}form-select ${prefix}form-select-sm`}
                aria-label='.form-select-sm example'
              >
                <option selected>Open this select menu</option>
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
              </select>
            </div>
            <div className={`${prefix}mb-3`}>
              <input
                type='file'
                className={`${prefix}form-control ${prefix}form-control-sm`}
                aria-label='Small file input example'
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function InputGroup({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='input-group'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Input group</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../forms/input-group/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div className={`${prefix}input-group ${prefix}mb-3`}>
              <span className={`${prefix}input-group-text`} id='basic-addon1'>
                @
              </span>
              <input
                type='text'
                className={`${prefix}form-control`}
                placeholder='Username'
                aria-label='Username'
                aria-describedby='basic-addon1'
              />
            </div>
            <div className={`${prefix}input-group ${prefix}mb-3`}>
              <input
                type='text'
                className={`${prefix}form-control`}
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby='basic-addon2'
              />
              <span className={`${prefix}input-group-text`} id='basic-addon2'>
                @example.com
              </span>
            </div>
            <label htmlFor='basic-url' className={`${prefix}form-label`}>
              Your vanity URL
            </label>
            <div className={`${prefix}input-group ${prefix}mb-3`}>
              <span className={`${prefix}input-group-text`} id='basic-addon3'>
                https://example.com/users/
              </span>
              <input
                type='text'
                className={`${prefix}form-control`}
                id='basic-url'
                aria-describedby='basic-addon3'
              />
            </div>
            <div className={`${prefix}input-group ${prefix}mb-3`}>
              <span className={`${prefix}input-group-text`}>$</span>
              <input
                type='text'
                className={`${prefix}form-control`}
                aria-label='Amount (to the nearest dollar)'
              />
              <span className={`${prefix}input-group-text`}>.00</span>
            </div>
            <div className={`${prefix}input-group`}>
              <span className={`${prefix}input-group-text`}>With textarea</span>
              <textarea
                className={`${prefix}form-control`}
                aria-label='With textarea'
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function FloatingLabels({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='floating-labels'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Floating labels</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../forms/floating-labels/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <form>
              <div className={`${prefix}form-floating ${prefix}mb-3`}>
                <input
                  type='email'
                  className={`${prefix}form-control`}
                  id='floatingInput'
                  placeholder='name@example.com'
                />
                <label htmlFor='floatingInput'>Email address</label>
              </div>
              <div className={`${prefix}form-floating`}>
                <input
                  type='password'
                  className={`${prefix}form-control`}
                  id='floatingPassword'
                  placeholder='Password'
                />
                <label htmlFor='floatingPassword'>Password</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </article>
  )
}

export function FormValidation({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='form-validation'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Validation</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../forms/validation/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <form className={`${prefix}row ${prefix}g-3`}>
              <div className={`${prefix}col-md-4`}>
                <label
                  htmlFor='validationServer01'
                  className={`${prefix}form-label`}
                >
                  First name
                </label>
                <input
                  type='text'
                  className={`${prefix}form-control ${prefix}is-valid`}
                  id='validationServer01'
                  value='Mark'
                  required
                />
                <div className={`${prefix}valid-feedback`}>Looks good!</div>
              </div>
              <div className={`${prefix}col-md-4`}>
                <label
                  htmlFor='validationServer02'
                  className={`${prefix}form-label`}
                >
                  Last name
                </label>
                <input
                  type='text'
                  className={`${prefix}form-control ${prefix}is-valid`}
                  id='validationServer02'
                  value='Otto'
                  required
                />
                <div className={`${prefix}valid-feedback`}>Looks good!</div>
              </div>
              <div className={`${prefix}col-md-4`}>
                <label
                  htmlFor='validationServerUsername'
                  className={`${prefix}form-label`}
                >
                  Username
                </label>
                <div className={`${prefix}input-group ${prefix}has-validation`}>
                  <span
                    className={`${prefix}input-group-text`}
                    id='inputGroupPrepend3'
                  >
                    @
                  </span>
                  <input
                    type='text'
                    className={`${prefix}form-control ${prefix}is-invalid`}
                    id='validationServerUsername'
                    aria-describedby='inputGroupPrepend3'
                    required
                  />
                  <div className={`${prefix}invalid-feedback`}>
                    Please choose a username.
                  </div>
                </div>
              </div>
              <div className={`${prefix}col-md-6`}>
                <label
                  htmlFor='validationServer03'
                  className={`${prefix}form-label`}
                >
                  City
                </label>
                <input
                  type='text'
                  className={`${prefix}form-control ${prefix}is-invalid`}
                  id='validationServer03'
                  required
                />
                <div className={`${prefix}invalid-feedback`}>
                  Please provide a valid city.
                </div>
              </div>
              <div className={`${prefix}col-md-3`}>
                <label
                  htmlFor='validationServer04'
                  className={`${prefix}form-label`}
                >
                  State
                </label>
                <select
                  className={`${prefix}form-select ${prefix}is-invalid`}
                  id='validationServer04'
                  required
                >
                  <option selected disabled value=''>
                    Choose...
                  </option>
                  <option>...</option>
                </select>
                <div className={`${prefix}invalid-feedback`}>
                  Please select a valid state.
                </div>
              </div>
              <div className={`${prefix}col-md-3`}>
                <label
                  htmlFor='validationServer05'
                  className={`${prefix}form-label`}
                >
                  Zip
                </label>
                <input
                  type='text'
                  className={`${prefix}form-control ${prefix}is-invalid`}
                  id='validationServer05'
                  required
                />
                <div className={`${prefix}invalid-feedback`}>
                  Please provide a valid zip.
                </div>
              </div>
              <div className={`${prefix}col-12`}>
                <div className={`${prefix}form-check`}>
                  <input
                    className={`${prefix}form-check-input ${prefix}is-invalid`}
                    type='checkbox'
                    value=''
                    id='invalidCheck3'
                    required
                  />
                  <label
                    className={`${prefix}form-check-label`}
                    htmlFor='invalidCheck3'
                  >
                    Agree to terms and conditions
                  </label>
                  <div className={`${prefix}invalid-feedback`}>
                    You must agree before submitting.
                  </div>
                </div>
              </div>
              <div className={`${prefix}col-12`}>
                <button
                  className={`${prefix}btn ${prefix}btn-primary`}
                  type='submit'
                >
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Accordion({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='accordion'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Accordion</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/accordion/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div className={`${prefix}accordion`} id='accordionExample'>
              <div className={`${prefix}accordion-item`}>
                <h4 className={`${prefix}accordion-header`}>
                  <button
                    className={`${prefix}accordion-button`}
                    type='button'
                    data-t-toggle='collapse'
                    data-t-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'
                  >
                    Accordion Item #1
                  </button>
                </h4>
                <div
                  id='collapseOne'
                  className={`${prefix}accordion-collapse ${prefix}collapse ${prefix}show`}
                  data-t-parent='#accordionExample'
                >
                  <div className={`${prefix}accordion-body`}>
                    <strong>This is the first item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className={`${prefix}accordion-item`}>
                <h4 className={`${prefix}accordion-header`}>
                  <button
                    className={`${prefix}accordion-button ${prefix}collapsed`}
                    type='button'
                    data-t-toggle='collapse'
                    data-t-target='#collapseTwo'
                    aria-expanded='false'
                    aria-controls='collapseTwo'
                  >
                    Accordion Item #2
                  </button>
                </h4>
                <div
                  id='collapseTwo'
                  className={`${prefix}accordion-collapse ${prefix}collapse`}
                  data-t-parent='#accordionExample'
                >
                  <div className={`${prefix}accordion-body`}>
                    <strong>This is the second item's accordion body.</strong>{' '}
                    It is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
              <div className={`${prefix}accordion-item`}>
                <h4 className={`${prefix}accordion-header`}>
                  <button
                    className={`${prefix}accordion-button ${prefix}collapsed`}
                    type='button'
                    data-t-toggle='collapse'
                    data-t-target='#collapseThree'
                    aria-expanded='false'
                    aria-controls='collapseThree'
                  >
                    Accordion Item #3
                  </button>
                </h4>
                <div
                  id='collapseThree'
                  className={`${prefix}accordion-collapse ${prefix}collapse`}
                  data-t-parent='#accordionExample'
                >
                  <div className={`${prefix}accordion-body`}>
                    <strong>This is the third item's accordion body.</strong> It
                    is hidden by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the
                    transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Alerts({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='alerts'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Alerts</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/alerts/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              className={`${prefix}alert ${prefix}alert-primary ${prefix}alert-dismissible ${prefix}fade ${prefix}show`}
              role='alert'
            >
              A simple primary alert with{' '}
              <a href='#' className={`${prefix}alert-link`}>
                an example link
              </a>
              . Give it a click if you like.
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='alert'
                aria-label='Close'
              ></button>
            </div>
            <div
              className={`${prefix}alert ${prefix}alert-secondary ${prefix}alert-dismissible ${prefix}fade ${prefix}show`}
              role='alert'
            >
              A simple secondary alert with{' '}
              <a href='#' className={`${prefix}alert-link`}>
                an example link
              </a>
              . Give it a click if you like.
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='alert'
                aria-label='Close'
              ></button>
            </div>
            <div
              className={`${prefix}alert ${prefix}alert-success ${prefix}alert-dismissible ${prefix}fade ${prefix}show`}
              role='alert'
            >
              A simple success alert with{' '}
              <a href='#' className={`${prefix}alert-link`}>
                an example link
              </a>
              . Give it a click if you like.
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='alert'
                aria-label='Close'
              ></button>
            </div>
            <div
              className={`${prefix}alert ${prefix}alert-danger ${prefix}alert-dismissible ${prefix}fade ${prefix}show`}
              role='alert'
            >
              A simple danger alert with{' '}
              <a href='#' className={`${prefix}alert-link`}>
                an example link
              </a>
              . Give it a click if you like.
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='alert'
                aria-label='Close'
              ></button>
            </div>
            <div
              className={`${prefix}alert ${prefix}alert-warning ${prefix}alert-dismissible ${prefix}fade ${prefix}show`}
              role='alert'
            >
              A simple warning alert with{' '}
              <a href='#' className={`${prefix}alert-link`}>
                an example link
              </a>
              . Give it a click if you like.
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='alert'
                aria-label='Close'
              ></button>
            </div>
            <div
              className={`${prefix}alert ${prefix}alert-info ${prefix}alert-dismissible ${prefix}fade ${prefix}show`}
              role='alert'
            >
              A simple info alert with{' '}
              <a href='#' className={`${prefix}alert-link`}>
                an example link
              </a>
              . Give it a click if you like.
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='alert'
                aria-label='Close'
              ></button>
            </div>
            <div
              className={`${prefix}alert ${prefix}alert-light ${prefix}alert-dismissible ${prefix}fade ${prefix}show`}
              role='alert'
            >
              A simple light alert with{' '}
              <a href='#' className={`${prefix}alert-link`}>
                an example link
              </a>
              . Give it a click if you like.
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='alert'
                aria-label='Close'
              ></button>
            </div>
            <div
              className={`${prefix}alert ${prefix}alert-dark ${prefix}alert-dismissible ${prefix}fade ${prefix}show`}
              role='alert'
            >
              A simple dark alert with{' '}
              <a href='#' className={`${prefix}alert-link`}>
                an example link
              </a>
              . Give it a click if you like.
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='alert'
                aria-label='Close'
              ></button>
            </div>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              className={`${prefix}alert ${prefix}alert-success`}
              role='alert'
            >
              <h4 className={`${prefix}alert-heading`}>Well done!</h4>
              <p>
                Aww yeah, you successfully read this important alert message.
                This example text is going to run a bit longer so that you can
                see how spacing within an alert works with this kind of content.
              </p>
              <hr />
              <p className={`${prefix}mb-0`}>
                Whenever you need to, be sure to use margin utilities to keep
                things nice and tidy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Badge({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='badge'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Badge</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/badge/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <p className={`${prefix}h1`}>
              Example heading{' '}
              <span className={`${prefix}badge ${prefix}bg-primary`}>New</span>
            </p>
            <p className={`${prefix}h2`}>
              Example heading{' '}
              <span className={`${prefix}badge ${prefix}bg-secondary`}>
                New
              </span>
            </p>
            <p className={`${prefix}h3`}>
              Example heading{' '}
              <span className={`${prefix}badge ${prefix}bg-success`}>New</span>
            </p>
            <p className={`${prefix}h4`}>
              Example heading{' '}
              <span className={`${prefix}badge ${prefix}bg-danger`}>New</span>
            </p>
            <p className={`${prefix}h5`}>
              Example heading{' '}
              <span className={`${prefix}badge ${prefix}text-bg-warning`}>
                New
              </span>
            </p>
            <p className={`${prefix}h6`}>
              Example heading{' '}
              <span className={`${prefix}badge ${prefix}text-bg-info`}>
                New
              </span>
            </p>
            <p className={`${prefix}h6`}>
              Example heading{' '}
              <span className={`${prefix}badge ${prefix}text-bg-light`}>
                New
              </span>
            </p>
            <p className={`${prefix}h6`}>
              Example heading{' '}
              <span className={`${prefix}badge ${prefix}bg-dark`}>New</span>
            </p>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <span
              className={`${prefix}badge ${prefix}rounded-pill ${prefix}bg-primary`}
            >
              Primary
            </span>
            <span
              className={`${prefix}badge ${prefix}rounded-pill ${prefix}bg-secondary`}
            >
              Secondary
            </span>
            <span
              className={`${prefix}badge ${prefix}rounded-pill ${prefix}bg-success`}
            >
              Success
            </span>
            <span
              className={`${prefix}badge ${prefix}rounded-pill ${prefix}bg-danger`}
            >
              Danger
            </span>
            <span
              className={`${prefix}badge ${prefix}rounded-pill ${prefix}text-bg-warning`}
            >
              Warning
            </span>
            <span
              className={`${prefix}badge ${prefix}rounded-pill ${prefix}text-bg-info`}
            >
              Info
            </span>
            <span
              className={`${prefix}badge ${prefix}rounded-pill ${prefix}text-bg-light`}
            >
              Light
            </span>
            <span
              className={`${prefix}badge ${prefix}rounded-pill ${prefix}bg-dark`}
            >
              Dark
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Breadcrumb({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='breadcrumb'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Breadcrumb</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/breadcrumb/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <nav aria-label='breadcrumb'>
              <ol className={`${prefix}breadcrumb`}>
                <li className={`${prefix}breadcrumb-item`}>
                  <a href='#'>Home</a>
                </li>
                <li className={`${prefix}breadcrumb-item`}>
                  <a href='#'>Library</a>
                </li>
                <li
                  className={`${prefix}breadcrumb-item ${prefix}active`}
                  aria-current='page'
                >
                  Data
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Buttons({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='buttons'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Buttons</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/buttons/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-primary`}
            >
              Primary
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
            >
              Secondary
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-success`}
            >
              Success
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-danger`}
            >
              Danger
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-warning`}
            >
              Warning
            </button>
            <button type='button' className={`${prefix}btn ${prefix}btn-info`}>
              Info
            </button>
            <button type='button' className={`${prefix}btn ${prefix}btn-light`}>
              Light
            </button>
            <button type='button' className={`${prefix}btn ${prefix}btn-dark`}>
              Dark
            </button>

            <button type='button' className={`${prefix}btn ${prefix}btn-link`}>
              Link
            </button>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-outline-primary`}
            >
              Primary
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-outline-secondary`}
            >
              Secondary
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-outline-success`}
            >
              Success
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-outline-danger`}
            >
              Danger
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-outline-warning`}
            >
              Warning
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-outline-info`}
            >
              Info
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-outline-light`}
            >
              Light
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-outline-dark`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-primary ${prefix}btn-sm`}
            >
              Small button
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-primary`}
            >
              Standard button
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-primary ${prefix}btn-lg`}
            >
              Large button
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ButtonGroup({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='button-group'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Button group</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/button-group/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              className={`${prefix}btn-toolbar`}
              role='toolbar'
              aria-label='Toolbar with button groups'
            >
              <div
                className={`${prefix}btn-group ${prefix}me-2`}
                role='group'
                aria-label='First group'
              >
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-secondary`}
                >
                  1
                </button>
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-secondary`}
                >
                  2
                </button>
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-secondary`}
                >
                  3
                </button>
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-secondary`}
                >
                  4
                </button>
              </div>
              <div
                className={`${prefix}btn-group ${prefix}me-2`}
                role='group'
                aria-label='Second group'
              >
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-secondary`}
                >
                  5
                </button>
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-secondary`}
                >
                  6
                </button>
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-secondary`}
                >
                  7
                </button>
              </div>
              <div
                className={`${prefix}btn-group`}
                role='group'
                aria-label='Third group'
              >
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-secondary`}
                >
                  8
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Card({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='card'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Card</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/card/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              className={`${prefix}row ${prefix} ${prefix}row-cols-1 ${prefix}row-cols-md-2 ${prefix}g-4`}
            >
              <div className={`${prefix}col`}>
                <div className={`${prefix}card`}>
                  <svg
                    className={`${prefix}bd-placeholder-img ${prefix}card-img-top`}
                    width='100%'
                    height='180'
                    xmlns='http://www.w3.org/2000/svg'
                    role='img'
                    aria-label='Placeholder: Image cap'
                    preserveAspectRatio='xMidYMid slice'
                    focusable='false'
                  >
                    <title>Placeholder</title>
                    <rect width='100%' height='100%' fill='#868e96' />
                    <text x='50%' y='50%' fill='#dee2e6' dy='.3em'>
                      Image cap
                    </text>
                  </svg>
                  <div className={`${prefix}card-body`}>
                    <h5 className={`${prefix}card-title`}>Card title</h5>
                    <p className={`${prefix}card-text`}>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href='#' className={`${prefix}btn ${prefix}btn-primary`}>
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
              <div className={`${prefix}col`}>
                <div className={`${prefix}card`}>
                  <div className={`${prefix}card-header`}>Featured</div>
                  <div className={`${prefix}card-body`}>
                    <h5 className={`${prefix}card-title`}>Card title</h5>
                    <p className={`${prefix}card-text`}>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href='#' className={`${prefix}btn ${prefix}btn-primary`}>
                      Go somewhere
                    </a>
                  </div>
                  <div
                    className={`${prefix}card-footer ${prefix}text-body-secondary`}
                  >
                    2 days ago
                  </div>
                </div>
              </div>
              <div className={`${prefix}col`}>
                <div className={`${prefix}card`}>
                  <div className={`${prefix}card-body`}>
                    <h5 className={`${prefix}card-title`}>Card title</h5>
                    <p className={`${prefix}card-text`}>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <ul
                    className={`${prefix}list-group ${prefix}list-group-flush`}
                  >
                    <li className={`${prefix}list-group-item`}>An item</li>
                    <li className={`${prefix}list-group-item`}>
                      A second item
                    </li>
                    <li className={`${prefix}list-group-item`}>A third item</li>
                  </ul>
                  <div className={`${prefix}card-body`}>
                    <a href='#' className={`${prefix}card-link`}>
                      Card link
                    </a>
                    <a href='#' className={`${prefix}card-link`}>
                      Another link
                    </a>
                  </div>
                </div>
              </div>
              <div className={`${prefix}col`}>
                <div className={`${prefix}card`}>
                  <div className={`${prefix}row ${prefix}g-0`}>
                    <div className={`${prefix}col-md-4`}>
                      <svg
                        className={`${prefix}bd-placeholder-img`}
                        width='100%'
                        height='250'
                        xmlns='http://www.w3.org/2000/svg'
                        role='img'
                        aria-label='Placeholder: Image'
                        preserveAspectRatio='xMidYMid slice'
                        focusable='false'
                      >
                        <title>Placeholder</title>
                        <rect width='100%' height='100%' fill='#868e96' />
                        <text x='50%' y='50%' fill='#dee2e6' dy='.3em'>
                          Image
                        </text>
                      </svg>
                    </div>
                    <div className={`${prefix}col-md-8`}>
                      <div className={`${prefix}card-body`}>
                        <h5 className={`${prefix}card-title`}>Card title</h5>
                        <p className={`${prefix}card-text`}>
                          This is a wider card with supporting text below as a
                          natural lead-in to additional content. This content is
                          a little bit longer.
                        </p>
                        <p className={`${prefix}card-text`}>
                          <small className={`${prefix}text-body-secondary`}>
                            Last updated 3 mins ago
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Carousel({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='carousel'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Carousel</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/carousel/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              id='carouselExampleCaptions'
              className={`${prefix}carousel ${prefix}slide`}
              data-t-ride='carousel'
            >
              <div className={`${prefix}carousel-indicators`}>
                <button
                  type='button'
                  data-t-target='#carouselExampleCaptions'
                  data-t-slide-to='0'
                  className={`${prefix}active`}
                  aria-current='true'
                  aria-label='Slide 1'
                ></button>
                <button
                  type='button'
                  data-t-target='#carouselExampleCaptions'
                  data-t-slide-to='1'
                  aria-label='Slide 2'
                ></button>
                <button
                  type='button'
                  data-t-target='#carouselExampleCaptions'
                  data-t-slide-to='2'
                  aria-label='Slide 3'
                ></button>
              </div>
              <div className={`${prefix}carousel-inner`}>
                <div className={`${prefix}carousel-item ${prefix}active`}>
                  <svg
                    className={`${prefix}bd-placeholder-img ${prefix}bd-placeholder-img-lg ${prefix}d-block ${prefix}w-100`}
                    width='800'
                    height='400'
                    xmlns='http://www.w3.org/2000/svg'
                    role='img'
                    aria-label='Placeholder: First slide'
                    preserveAspectRatio='xMidYMid slice'
                    focusable='false'
                  >
                    <title>Placeholder</title>
                    <rect width='100%' height='100%' fill='#777' />
                    <text x='50%' y='50%' fill='#555' dy='.3em'>
                      First slide
                    </text>
                  </svg>
                  <div
                    className={`${prefix}carousel-caption ${prefix}d-none ${prefix}d-md-block`}
                  >
                    <h5>First slide label</h5>
                    <p>
                      Some representative placeholder content for the first
                      slide.
                    </p>
                  </div>
                </div>
                <div className={`${prefix}carousel-item`}>
                  <svg
                    className={`${prefix}bd-placeholder-img ${prefix}bd-placeholder-img-lg ${prefix}d-block ${prefix}w-100`}
                    width='800'
                    height='400'
                    xmlns='http://www.w3.org/2000/svg'
                    role='img'
                    aria-label='Placeholder: Second slide'
                    preserveAspectRatio='xMidYMid slice'
                    focusable='false'
                  >
                    <title>Placeholder</title>
                    <rect width='100%' height='100%' fill='#666' />
                    <text x='50%' y='50%' fill='#444' dy='.3em'>
                      Second slide
                    </text>
                  </svg>
                  <div
                    className={`${prefix}carousel-caption ${prefix}d-none ${prefix}d-md-block`}
                  >
                    <h5>Second slide label</h5>
                    <p>
                      Some representative placeholder content for the second
                      slide.
                    </p>
                  </div>
                </div>
                <div className={`${prefix}carousel-item`}>
                  <svg
                    className={`${prefix}bd-placeholder-img ${prefix}bd-placeholder-img-lg ${prefix}d-block ${prefix}w-100`}
                    width='800'
                    height='400'
                    xmlns='http://www.w3.org/2000/svg'
                    role='img'
                    aria-label='Placeholder: Third slide'
                    preserveAspectRatio='xMidYMid slice'
                    focusable='false'
                  >
                    <title>Placeholder</title>
                    <rect width='100%' height='100%' fill='#555' />
                    <text x='50%' y='50%' fill='#333' dy='.3em'>
                      Third slide
                    </text>
                  </svg>
                  <div
                    className={`${prefix}carousel-caption ${prefix}d-none ${prefix}d-md-block`}
                  >
                    <h5>Third slide label</h5>
                    <p>
                      Some representative placeholder content for the third
                      slide.
                    </p>
                  </div>
                </div>
              </div>
              <button
                className={`${prefix}carousel-control-prev`}
                type='button'
                data-t-target='#carouselExampleCaptions'
                data-t-slide='prev'
              >
                <span
                  className={`${prefix}carousel-control-prev-icon`}
                  aria-hidden='true'
                ></span>
                <span className={`${prefix}visually-hidden`}>Previous</span>
              </button>
              <button
                className={`${prefix}carousel-control-next`}
                type='button'
                data-t-target='#carouselExampleCaptions'
                data-t-slide='next'
              >
                <span
                  className={`${prefix}carousel-control-next-icon`}
                  aria-hidden='true'
                ></span>
                <span className={`${prefix}visually-hidden`}>Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Dropdowns({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='dropdowns'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Dropdowns</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/dropdowns/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              className={`${prefix}btn-group ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between ${prefix}flex-wrap`}
            >
              <div className={`${prefix}dropdown`}>
                <button
                  className={`${prefix}btn ${prefix}btn-secondary ${prefix}btn-sm ${prefix}dropdown-toggle`}
                  type='button'
                  data-t-toggle='dropdown'
                  aria-expanded='false'
                >
                  Dropdown button
                </button>
                <ul className={`${prefix}dropdown-menu`}>
                  <li>
                    <h6 className={`${prefix}dropdown-header`}>
                      Dropdown header
                    </h6>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className={`${prefix}dropdown-divider`} />
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
              <div className={`${prefix}dropdown`}>
                <button
                  className={`${prefix}btn ${prefix}btn-secondary ${prefix}dropdown-toggle`}
                  type='button'
                  data-t-toggle='dropdown'
                  aria-expanded='false'
                >
                  Dropdown button
                </button>
                <ul className={`${prefix}dropdown-menu`}>
                  <li>
                    <h6 className={`${prefix}dropdown-header`}>
                      Dropdown header
                    </h6>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className={`${prefix}dropdown-divider`} />
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
              <div className={`${prefix}dropdown`}>
                <button
                  className={`${prefix}btn ${prefix}btn-secondary ${prefix}btn-lg ${prefix}dropdown-toggle`}
                  type='button'
                  data-t-toggle='dropdown'
                  aria-expanded='false'
                >
                  Dropdown button
                </button>
                <ul className={`${prefix}dropdown-menu`}>
                  <li>
                    <h6 className={`${prefix}dropdown-header`}>
                      Dropdown header
                    </h6>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className={`${prefix}dropdown-divider`} />
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div className={`${prefix}btn-group`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-primary`}
              >
                Primary
              </button>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-primary ${prefix}dropdown-toggle ${prefix}dropdown-toggle-split`}
                data-t-toggle='dropdown'
                aria-expanded='false'
              >
                <span className={`${prefix}visually-hidden`}>
                  Toggle Dropdown
                </span>
              </button>
              <ul className={`${prefix}dropdown-menu`}>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Another action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className={`${prefix}btn-group`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-secondary`}
              >
                Secondary
              </button>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-secondary ${prefix}dropdown-toggle ${prefix}dropdown-toggle-split`}
                data-t-toggle='dropdown'
                aria-expanded='false'
              >
                <span className={`${prefix}visually-hidden`}>
                  Toggle Dropdown
                </span>
              </button>
              <ul className={`${prefix}dropdown-menu`}>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Another action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className={`${prefix}btn-group`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-success`}
              >
                Success
              </button>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-success ${prefix}dropdown-toggle ${prefix}dropdown-toggle-split`}
                data-t-toggle='dropdown'
                aria-expanded='false'
              >
                <span className={`${prefix}visually-hidden`}>
                  Toggle Dropdown
                </span>
              </button>
              <ul className={`${prefix}dropdown-menu`}>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Another action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className={`${prefix}btn-group`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-info`}
              >
                Info
              </button>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-info ${prefix}dropdown-toggle ${prefix}dropdown-toggle-split`}
                data-t-toggle='dropdown'
                aria-expanded='false'
              >
                <span className={`${prefix}visually-hidden`}>
                  Toggle Dropdown
                </span>
              </button>
              <ul className={`${prefix}dropdown-menu`}>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Another action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className={`${prefix}btn-group`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-warning`}
              >
                Warning
              </button>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-warning ${prefix}dropdown-toggle ${prefix}dropdown-toggle-split`}
                data-t-toggle='dropdown'
                aria-expanded='false'
              >
                <span className={`${prefix}visually-hidden`}>
                  Toggle Dropdown
                </span>
              </button>
              <ul className={`${prefix}dropdown-menu`}>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Another action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className={`${prefix}btn-group`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-danger`}
              >
                Danger
              </button>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-danger ${prefix}dropdown-toggle ${prefix}dropdown-toggle-split`}
                data-t-toggle='dropdown'
                aria-expanded='false'
              >
                <span className={`${prefix}visually-hidden`}>
                  Toggle Dropdown
                </span>
              </button>
              <ul className={`${prefix}dropdown-menu`}>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Another action
                  </a>
                </li>
                <li>
                  <a className={`${prefix}dropdown-item`} href='#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              className={`${prefix}btn-group ${prefix}w-100 ${prefix}align-items-center ${prefix}justify-content-between ${prefix}flex-wrap`}
            >
              <div className={`${prefix}dropend`}>
                <button
                  className={`${prefix}btn ${prefix}btn-secondary ${prefix}dropdown-toggle`}
                  type='button'
                  data-t-toggle='dropdown'
                  aria-expanded='false'
                >
                  Dropend button
                </button>
                <ul className={`${prefix}dropdown-menu`}>
                  <li>
                    <h6 className={`${prefix}dropdown-header`}>
                      Dropdown header
                    </h6>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className={`${prefix}dropdown-divider`} />
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
              <div className={`${prefix}dropup`}>
                <button
                  className={`${prefix}btn ${prefix}btn-secondary ${prefix}dropdown-toggle`}
                  type='button'
                  data-t-toggle='dropdown'
                  aria-expanded='false'
                >
                  Dropup button
                </button>
                <ul className={`${prefix}dropdown-menu`}>
                  <li>
                    <h6 className={`${prefix}dropdown-header`}>
                      Dropdown header
                    </h6>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className={`${prefix}dropdown-divider`} />
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
              <div className={`${prefix}dropstart`}>
                <button
                  className={`${prefix}btn ${prefix}btn-secondary ${prefix}dropdown-toggle`}
                  type='button'
                  data-t-toggle='dropdown'
                  aria-expanded='false'
                >
                  Dropstart button
                </button>
                <ul className={`${prefix}dropdown-menu`}>
                  <li>
                    <h6 className={`${prefix}dropdown-header`}>
                      Dropdown header
                    </h6>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Something else here
                    </a>
                  </li>
                  <li>
                    <hr className={`${prefix}dropdown-divider`} />
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div className={`${prefix}btn-group`}>
              <div className={`${prefix}dropdown`}>
                <button
                  className={`${prefix}btn ${prefix}btn-secondary ${prefix}dropdown-toggle`}
                  type='button'
                  data-t-toggle='dropdown'
                  aria-expanded='false'
                >
                  End-aligned menu
                </button>
                <ul
                  className={`${prefix}dropdown-menu ${prefix}dropdown-menu-end`}
                >
                  <li>
                    <h6 className={`${prefix}dropdown-header`}>
                      Dropdown header
                    </h6>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Action
                    </a>
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className={`${prefix}dropdown-divider`} />
                  </li>
                  <li>
                    <a className={`${prefix}dropdown-item`} href='#'>
                      Separated link
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ListGroup({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='list-group'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>List group</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/list-group/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <ul className={`${prefix}list-group`}>
              <li
                className={`${prefix}list-group-item ${prefix}disabled`}
                aria-disabled='true'
              >
                A disabled item
              </li>
              <li className={`${prefix}list-group-item`}>A second item</li>
              <li className={`${prefix}list-group-item`}>A third item</li>
              <li className={`${prefix}list-group-item`}>A fourth item</li>
              <li className={`${prefix}list-group-item`}>And a fifth one</li>
            </ul>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <ul className={`${prefix}list-group ${prefix}list-group-flush`}>
              <li className={`${prefix}list-group-item`}>An item</li>
              <li className={`${prefix}list-group-item`}>A second item</li>
              <li className={`${prefix}list-group-item`}>A third item</li>
              <li className={`${prefix}list-group-item`}>A fourth item</li>
              <li className={`${prefix}list-group-item`}>And a fifth one</li>
            </ul>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div className={`${prefix}list-group`}>
              <a
                href='#'
                className={`${prefix}list-group-item ${prefix}list-group-item-action`}
              >
                A simple default list group item
              </a>

              <a
                href='#'
                className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}list-group-item-primary`}
              >
                A simple primary list group item
              </a>
              <a
                href='#'
                className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}list-group-item-secondary`}
              >
                A simple secondary list group item
              </a>
              <a
                href='#'
                className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}list-group-item-success`}
              >
                A simple success list group item
              </a>
              <a
                href='#'
                className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}list-group-item-danger`}
              >
                A simple danger list group item
              </a>
              <a
                href='#'
                className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}list-group-item-warning`}
              >
                A simple warning list group item
              </a>
              <a
                href='#'
                className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}list-group-item-info`}
              >
                A simple info list group item
              </a>
              <a
                href='#'
                className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}list-group-item-light`}
              >
                A simple light list group item
              </a>
              <a
                href='#'
                className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}list-group-item-dark`}
              >
                A simple dark list group item
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Modal({ prefix = 't-' }) {
  return (
    <>
      <article className={`${prefix}my-3`} id='modal'>
        <div
          className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
        >
          <h3>Modal</h3>
          <a
            className={`${prefix}d-flex ${prefix}align-items-center`}
            href='../components/modal/'
          >
            Documentation
          </a>
        </div>

        <div>
          <div
            className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}
          >
            <div
              className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}
            >
              <div
                className={`${prefix}d-flex ${prefix}justify-content-between ${prefix}flex-wrap`}
              >
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-primary`}
                  data-t-toggle='modal'
                  data-t-target='#exampleModalDefault'
                >
                  Launch demo modal
                </button>
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-primary`}
                  data-t-toggle='modal'
                  data-t-target='#staticBackdropLive'
                >
                  Launch static backdrop modal
                </button>
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-primary`}
                  data-t-toggle='modal'
                  data-t-target='#exampleModalCenteredScrollable'
                >
                  Vertically centered scrollable modal
                </button>
                <button
                  type='button'
                  className={`${prefix}btn ${prefix}btn-primary`}
                  data-t-toggle='modal'
                  data-t-target='#exampleModalFullscreen'
                >
                  Full screen
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div
        className={`${prefix}modal ${prefix}fade`}
        id='exampleModalDefault'
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className={`${prefix}modal-dialog`}>
          <div className={`${prefix}modal-content`}>
            <div className={`${prefix}modal-header`}>
              <h1
                className={`${prefix}modal-title ${prefix}fs-5`}
                id='exampleModalLabel'
              >
                Modal title
              </h1>
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className={`${prefix}modal-body`}>...</div>
            <div className={`${prefix}modal-footer`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-secondary`}
                data-t-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-primary`}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${prefix}modal ${prefix}fade`}
        id='staticBackdropLive'
        data-t-backdrop='static'
        data-t-keyboard='false'
        tabIndex={-1}
        aria-labelledby='staticBackdropLiveLabel'
        aria-hidden='true'
      >
        <div className={`${prefix}modal-dialog`}>
          <div className={`${prefix}modal-content`}>
            <div className={`${prefix}modal-header`}>
              <h1
                className={`${prefix}modal-title ${prefix}fs-5`}
                id='staticBackdropLiveLabel'
              >
                Modal title
              </h1>
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className={`${prefix}modal-body`}>
              <p>
                I will not close if you click outside me. Don't even try to
                press escape key.
              </p>
            </div>
            <div className={`${prefix}modal-footer`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-secondary`}
                data-t-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-primary`}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${prefix}modal ${prefix}fade`}
        id='exampleModalCenteredScrollable'
        tabIndex={-1}
        aria-labelledby='exampleModalCenteredScrollableTitle'
        aria-hidden='true'
      >
        <div
          className={`${prefix}modal-dialog ${prefix}modal-dialog-centered ${prefix}modal-dialog-scrollable`}
        >
          <div className={`${prefix}modal-content`}>
            <div className={`${prefix}modal-header`}>
              <h1
                className={`${prefix}modal-title ${prefix}fs-5`}
                id='exampleModalCenteredScrollableTitle'
              >
                Modal title
              </h1>
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className={`${prefix}modal-body`}>
              <p>
                This is some placeholder content to show the scrolling behavior
                for modals. We use repeated line breaks to demonstrate how
                content can exceed minimum inner height, thereby showing inner
                scrolling. When content becomes longer than the predefined
                max-height of modal, content will be cropped and scrollable
                within the modal.
              </p>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <p>This content should appear at the bottom after you scroll.</p>
            </div>
            <div className={`${prefix}modal-footer`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-secondary`}
                data-t-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-primary`}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${prefix}modal ${prefix}fade`}
        id='exampleModalFullscreen'
        tabIndex={-1}
        aria-labelledby='exampleModalFullscreenLabel'
        aria-hidden='true'
      >
        <div className={`${prefix}modal-dialog ${prefix}modal-fullscreen`}>
          <div className={`${prefix}modal-content`}>
            <div className={`${prefix}modal-header`}>
              <h1
                className={`${prefix}modal-title ${prefix}fs-4`}
                id='exampleModalFullscreenLabel'
              >
                Full screen modal
              </h1>
              <button
                type='button'
                className={`${prefix}btn-close`}
                data-t-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className={`${prefix}modal-body`}>...</div>
            <div className={`${prefix}modal-footer`}>
              <button
                type='button'
                className={`${prefix}btn ${prefix}btn-secondary`}
                data-t-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function Navs({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='navs'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Navs</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/navs-tabs/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <nav className={`${prefix}nav`}>
              <a
                className={`${prefix}nav-link ${prefix}active`}
                aria-current='page'
                href='#'
              >
                Active
              </a>
              <a className={`${prefix}nav-link`} href='#'>
                Link
              </a>
              <a className={`${prefix}nav-link`} href='#'>
                Link
              </a>
              <a
                className={`${prefix}nav-link ${prefix}disabled`}
                aria-disabled='true'
              >
                Disabled
              </a>
            </nav>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <nav>
              <div
                className={`${prefix}nav ${prefix}nav-tabs ${prefix}mb-3`}
                id='nav-tab'
                role='tablist'
              >
                <button
                  className={`${prefix}nav-link ${prefix}active`}
                  id='nav-home-tab'
                  data-t-toggle='tab'
                  data-t-target='#nav-home'
                  type='button'
                  role='tab'
                  aria-controls='nav-home'
                  aria-selected='true'
                >
                  Home
                </button>
                <button
                  className={`${prefix}nav-link`}
                  id='nav-profile-tab'
                  data-t-toggle='tab'
                  data-t-target='#nav-profile'
                  type='button'
                  role='tab'
                  aria-controls='nav-profile'
                  aria-selected='false'
                >
                  Profile
                </button>
                <button
                  className={`${prefix}nav-link`}
                  id='nav-contact-tab'
                  data-t-toggle='tab'
                  data-t-target='#nav-contact'
                  type='button'
                  role='tab'
                  aria-controls='nav-contact'
                  aria-selected='false'
                >
                  Contact
                </button>
              </div>
            </nav>
            <div className={`${prefix}tab-content`} id='nav-tabContent'>
              <div
                className={`${prefix}tab-pane ${prefix}fade ${prefix}show ${prefix}active`}
                id='nav-home'
                role='tabpanel'
                aria-labelledby='nav-home-tab'
              >
                <p>
                  This is some placeholder content the{' '}
                  <strong>Home tab's</strong> associated content. Clicking
                  another tab will toggle the visibility of this one for the
                  next. The tab JavaScript swaps classes to control the content
                  visibility and styling. You can use it with tabs, pills, and
                  any other <code>.nav</code>-powered navigation.
                </p>
              </div>
              <div
                className={`${prefix}tab-pane ${prefix}fade`}
                id='nav-profile'
                role='tabpanel'
                aria-labelledby='nav-profile-tab'
              >
                <p>
                  This is some placeholder content the{' '}
                  <strong>Profile tab's</strong> associated content. Clicking
                  another tab will toggle the visibility of this one for the
                  next. The tab JavaScript swaps classes to control the content
                  visibility and styling. You can use it with tabs, pills, and
                  any other <code>.nav</code>
                  -powered navigation.
                </p>
              </div>
              <div
                className={`${prefix}tab-pane ${prefix}fade`}
                id='nav-contact'
                role='tabpanel'
                aria-labelledby='nav-contact-tab'
              >
                <p>
                  This is some placeholder content the{' '}
                  <strong>Contact tab's</strong> associated content. Clicking
                  another tab will toggle the visibility of this one for the
                  next. The tab JavaScript swaps classes to control the content
                  visibility and styling. You can use it with tabs, pills, and
                  any other <code>.nav</code>
                  -powered navigation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <ul className={`${prefix}nav ${prefix}nav-pills`}>
              <li className={`${prefix}nav-item`}>
                <a
                  className={`${prefix}nav-link ${prefix}active`}
                  aria-current='page'
                  href='#'
                >
                  Active
                </a>
              </li>
              <li className={`${prefix}nav-item`}>
                <a className={`${prefix}nav-link`} href='#'>
                  Link
                </a>
              </li>
              <li className={`${prefix}nav-item`}>
                <a className={`${prefix}nav-link`} href='#'>
                  Link
                </a>
              </li>
              <li className={`${prefix}nav-item`}>
                <a
                  className={`${prefix}nav-link ${prefix}disabled`}
                  aria-disabled='true'
                >
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Navbar({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='navbar'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Navbar</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/navbar/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <nav
              className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}bg-body-tertiary`}
            >
              <div className={`${prefix}container-fluid`}>
                <a className={`${prefix}navbar-brand`} href='#'>
                  <img
                    src='/img/logo.svg'
                    width='38'
                    height='30'
                    className={`${prefix}d-inline-block ${prefix}align-top`}
                    alt='Example'
                    loading='lazy'
                    style={{
                      filter: `invert(1) grayscale(100%) brightness(200%)`,
                    }}
                  />
                </a>
                <button
                  className={`${prefix}navbar-toggler`}
                  type='button'
                  data-t-toggle='collapse'
                  data-t-target='#navbarSupportedContent'
                  aria-controls='navbarSupportedContent'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <span className={`${prefix}navbar-toggler-icon`}></span>
                </button>
                <div
                  className={`${prefix}collapse ${prefix}navbar-collapse`}
                  id='navbarSupportedContent'
                >
                  <ul
                    className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-lg-0`}
                  >
                    <li className={`${prefix}nav-item`}>
                      <a
                        className={`${prefix}nav-link ${prefix}active`}
                        aria-current='page'
                        href='#'
                      >
                        Home
                      </a>
                    </li>
                    <li className={`${prefix}nav-item`}>
                      <a className={`${prefix}nav-link`} href='#'>
                        Link
                      </a>
                    </li>
                    <li className={`${prefix}nav-item ${prefix}dropdown`}>
                      <a
                        className={`${prefix}nav-link ${prefix}dropdown-toggle`}
                        href='#'
                        role='button'
                        data-t-toggle='dropdown'
                        aria-expanded='false'
                      >
                        Dropdown
                      </a>
                      <ul className={`${prefix}dropdown-menu`}>
                        <li>
                          <a className={`${prefix}dropdown-item`} href='#'>
                            Action
                          </a>
                        </li>
                        <li>
                          <a className={`${prefix}dropdown-item`} href='#'>
                            Another action
                          </a>
                        </li>
                        <li>
                          <hr className={`${prefix}dropdown-divider`} />
                        </li>
                        <li>
                          <a className={`${prefix}dropdown-item`} href='#'>
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className={`${prefix}nav-item`}>
                      <a
                        className={`${prefix}nav-link ${prefix}disabled`}
                        aria-disabled='true'
                      >
                        Disabled
                      </a>
                    </li>
                  </ul>
                  <form className={`${prefix}d-flex`} role='search'>
                    <input
                      className={`${prefix}form-control ${prefix}me-2`}
                      type='search'
                      placeholder='Search'
                      aria-label='Search'
                    />
                    <button
                      className={`${prefix}btn ${prefix}btn-outline-dark`}
                      type='submit'
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </nav>

            <nav
              className={`${prefix}navbar ${prefix}navbar-expand-lg ${prefix}navbar-dark ${prefix}bg-primary ${prefix}mt-5`}
            >
              <div className={`${prefix}container-fluid`}>
                <a className={`${prefix}navbar-brand`} href='#'>
                  <img
                    src='/img/logo.svg'
                    width='38'
                    height='30'
                    className={`${prefix}d-inline-block ${prefix}align-top`}
                    alt='Example'
                    loading='lazy'
                  />
                </a>
                <button
                  className={`${prefix}navbar-toggler`}
                  type='button'
                  data-t-toggle='collapse'
                  data-t-target='#navbarSupportedContent2'
                  aria-controls='navbarSupportedContent2'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <span className={`${prefix}navbar-toggler-icon`}></span>
                </button>
                <div
                  className={`${prefix}collapse ${prefix}navbar-collapse`}
                  id='navbarSupportedContent2'
                >
                  <ul
                    className={`${prefix}navbar-nav ${prefix}me-auto ${prefix}mb-2 ${prefix}mb-lg-0`}
                  >
                    <li className={`${prefix}nav-item`}>
                      <a
                        className={`${prefix}nav-link ${prefix}active`}
                        aria-current='page'
                        href='#'
                      >
                        Home
                      </a>
                    </li>
                    <li className={`${prefix}nav-item`}>
                      <a className={`${prefix}nav-link`} href='#'>
                        Link
                      </a>
                    </li>
                    <li className={`${prefix}nav-item ${prefix}dropdown`}>
                      <a
                        className={`${prefix}nav-link ${prefix}dropdown-toggle`}
                        href='#'
                        role='button'
                        data-t-toggle='dropdown'
                        aria-expanded='false'
                      >
                        Dropdown
                      </a>
                      <ul className={`${prefix}dropdown-menu`}>
                        <li>
                          <a className={`${prefix}dropdown-item`} href='#'>
                            Action
                          </a>
                        </li>
                        <li>
                          <a className={`${prefix}dropdown-item`} href='#'>
                            Another action
                          </a>
                        </li>
                        <li>
                          <hr className={`${prefix}dropdown-divider`} />
                        </li>
                        <li>
                          <a className={`${prefix}dropdown-item`} href='#'>
                            Something else here
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className={`${prefix}nav-item`}>
                      <a
                        className={`${prefix}nav-link ${prefix}disabled`}
                        aria-disabled='true'
                      >
                        Disabled
                      </a>
                    </li>
                  </ul>
                  <form className={`${prefix}d-flex`} role='search'>
                    <input
                      className={`${prefix}form-control ${prefix}me-2`}
                      type='search'
                      placeholder='Search'
                      aria-label='Search'
                    />
                    <button
                      className={`${prefix}btn ${prefix}btn-outline-light`}
                      type='submit'
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Pagination({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='pagination'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Pagination</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/pagination/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <nav aria-label='Pagination example'>
              <ul className={`${prefix}pagination ${prefix}pagination-sm`}>
                <li className={`${prefix}page-item`}>
                  <a className={`${prefix}page-link`} href='#'>
                    1
                  </a>
                </li>
                <li
                  className={`${prefix}page-item ${prefix}active`}
                  aria-current='page'
                >
                  <a className={`${prefix}page-link`} href='#'>
                    2
                  </a>
                </li>
                <li className={`${prefix}page-item`}>
                  <a className={`${prefix}page-link`} href='#'>
                    3
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <nav aria-label='Standard pagination example'>
              <ul className={`${prefix}pagination`}>
                <li className={`${prefix}page-item`}>
                  <a
                    className={`${prefix}page-link`}
                    href='#'
                    aria-label='Previous'
                  >
                    <span aria-hidden='true'>&laquo;</span>
                  </a>
                </li>
                <li className={`${prefix}page-item`}>
                  <a className={`${prefix}page-link`} href='#'>
                    1
                  </a>
                </li>
                <li className={`${prefix}page-item`}>
                  <a className={`${prefix}page-link`} href='#'>
                    2
                  </a>
                </li>
                <li className={`${prefix}page-item`}>
                  <a className={`${prefix}page-link`} href='#'>
                    3
                  </a>
                </li>
                <li className={`${prefix}page-item`}>
                  <a
                    className={`${prefix}page-link`}
                    href='#'
                    aria-label='Next'
                  >
                    <span aria-hidden='true'>&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <nav aria-label='Another pagination example'>
              <ul
                className={`${prefix}pagination ${prefix}pagination-lg ${prefix}flex-wrap`}
              >
                <li className={`${prefix}page-item ${prefix}disabled`}>
                  <a className={`${prefix}page-link`}>Previous</a>
                </li>
                <li className={`${prefix}page-item`}>
                  <a className={`${prefix}page-link`} href='#'>
                    1
                  </a>
                </li>
                <li
                  className={`${prefix}page-item ${prefix}active`}
                  aria-current='page'
                >
                  <a className={`${prefix}page-link`} href='#'>
                    2
                  </a>
                </li>
                <li className={`${prefix}page-item`}>
                  <a className={`${prefix}page-link`} href='#'>
                    3
                  </a>
                </li>
                <li className={`${prefix}page-item`}>
                  <a className={`${prefix}page-link`} href='#'>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Popovers({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='popovers'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Popovers</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/popovers/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-lg ${prefix}btn-danger`}
              data-t-toggle='popover'
              title='Popover title'
              data-t-content="And here's some amazing content. It's very engaging. Right?"
            >
              Click to toggle popover
            </button>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
              data-t-container='body'
              data-t-toggle='popover'
              data-t-placement='top'
              data-t-content='Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'
            >
              Popover on top
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
              data-t-container='body'
              data-t-toggle='popover'
              data-t-placement='right'
              data-t-content='Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'
            >
              Popover on end
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
              data-t-container='body'
              data-t-toggle='popover'
              data-t-placement='bottom'
              data-t-content='Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'
            >
              Popover on bottom
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
              data-t-container='body'
              data-t-toggle='popover'
              data-t-placement='left'
              data-t-content='Vivamus sagittis lacus vel augue laoreet rutrum faucibus.'
            >
              Popover on start
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Progress({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='progress'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Progress</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/progress/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              className={`${prefix}progress ${prefix}mb-3`}
              role='progressbar'
              aria-label='Example with label'
              aria-valuenow='0'
              aria-valuemin='0'
              aria-valuemax='100'
            >
              <div className={`${prefix}progress-bar`}>0%</div>
            </div>
            <div
              className={`${prefix}progress ${prefix}mb-3`}
              role='progressbar'
              aria-label='Success example with label'
              aria-valuenow='25'
              aria-valuemin='0'
              aria-valuemax='100'
            >
              <div
                className={`${prefix}progress-bar ${prefix}bg-success ${prefix}w-25`}
              >
                25%
              </div>
            </div>
            <div
              className={`${prefix}progress ${prefix}mb-3`}
              role='progressbar'
              aria-label='Info example with label'
              aria-valuenow='50'
              aria-valuemin='0'
              aria-valuemax='100'
            >
              <div
                className={`${prefix}progress-bar ${prefix}text-bg-info ${prefix}w-50`}
              >
                50%
              </div>
            </div>
            <div
              className={`${prefix}progress ${prefix}mb-3`}
              role='progressbar'
              aria-label='Warning example with label'
              aria-valuenow='75'
              aria-valuemin='0'
              aria-valuemax='100'
            >
              <div
                className={`${prefix}progress-bar ${prefix}text-bg-warning ${prefix}w-75`}
              >
                75%
              </div>
            </div>
            <div
              className={`${prefix}progress`}
              role='progressbar'
              aria-label='Danger example with label'
              aria-valuenow='100'
              aria-valuemin='0'
              aria-valuemax='100'
            >
              <div
                className={`${prefix}progress-bar ${prefix}bg-danger ${prefix}w-100`}
              >
                100%
              </div>
            </div>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div className={`${prefix}progress-stacked`}>
              <div
                className={`${prefix}progress`}
                role='progressbar'
                aria-label='Segment one - default example'
                style={{
                  width: '15%',
                }}
                aria-valuenow='15'
                aria-valuemin='0'
                aria-valuemax='100'
              >
                <div className={`${prefix}progress-bar`}></div>
              </div>
              <div
                className={`${prefix}progress`}
                role='progressbar'
                aria-label='Segment two - animated striped success example'
                style={{ width: '40%' }}
                aria-valuenow='40'
                aria-valuemin='0'
                aria-valuemax='100'
              >
                <div
                  className={`${prefix}progress-bar ${prefix}progress-bar-striped ${prefix}progress-bar-animated ${prefix}bg-success`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Scrollspy({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='scrollspy'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Scrollspy</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/scrollspy/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example`}>
          <nav
            id='navbar-example2'
            className={`${prefix}navbar ${prefix}bg-body-tertiary ${prefix}px-3`}
          >
            <a className={`${prefix}navbar-brand`} href='#'>
              Navbar
            </a>
            <ul className={`${prefix}nav ${prefix}nav-pills`}>
              <li className={`${prefix}nav-item`}>
                <a
                  className={`${prefix}nav-link ${prefix}active`}
                  href='#scrollspyHeading1'
                >
                  First
                </a>
              </li>
              <li className={`${prefix}nav-item`}>
                <a className={`${prefix}nav-link`} href='#scrollspyHeading2'>
                  Second
                </a>
              </li>
              <li className={`${prefix}nav-item ${prefix}dropdown`}>
                <a
                  className={`${prefix}nav-link ${prefix}dropdown-toggle`}
                  data-t-toggle='dropdown'
                  href='#'
                  role='button'
                  aria-expanded='false'
                >
                  Dropdown
                </a>
                <ul className={`${prefix}dropdown-menu`}>
                  <li>
                    <a
                      className={`${prefix}dropdown-item`}
                      href='#scrollspyHeading3'
                    >
                      Third
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${prefix}dropdown-item`}
                      href='#scrollspyHeading4'
                    >
                      Fourth
                    </a>
                  </li>
                  <li>
                    <hr className={`${prefix}dropdown-divider`} />
                  </li>
                  <li>
                    <a
                      className={`${prefix}dropdown-item`}
                      href='#scrollspyHeading5'
                    >
                      Fifth
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div
            data-t-spy='scroll'
            data-t-target='#navbar-example2'
            data-t-offset='0'
            className={`${prefix}scrollspy-example ${prefix}position-relative ${prefix}mt-2 ${prefix}overflow-auto`}
            tabIndex={0}
          >
            <h4 id='scrollspyHeading1'>First heading</h4>
            <p>
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It's repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
            <h4 id='scrollspyHeading2'>Second heading</h4>
            <p>
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It's repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
            <h4 id='scrollspyHeading3'>Third heading</h4>
            <p>
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It's repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
            <h4 id='scrollspyHeading4'>Fourth heading</h4>
            <p>
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It's repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
            <h4 id='scrollspyHeading5'>Fifth heading</h4>
            <p>
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It's repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Spinners({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='spinners'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Spinners</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/spinners/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              className={`${prefix}spinner-border ${prefix}text-primary`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-border ${prefix}text-secondary`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-border ${prefix}text-success`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-border ${prefix}text-danger`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-border ${prefix}text-warning`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-border ${prefix}text-info`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-border ${prefix}text-light`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-border ${prefix}text-dark`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
          </div>
        </div>

        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0`}>
            <div
              className={`${prefix}spinner-grow ${prefix}text-primary`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-grow ${prefix}text-secondary`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-grow ${prefix}text-success`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-grow ${prefix}text-danger`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-grow ${prefix}text-warning`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-grow ${prefix}text-info`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-grow ${prefix}text-light`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
            <div
              className={`${prefix}spinner-grow ${prefix}text-dark`}
              role='status'
            >
              <span className={`${prefix}visually-hidden`}>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Toasts({ prefix = 't-' }) {
  return (
    <article className={`${prefix}my-3`} id='toasts'>
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Toasts</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/toasts/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div
            className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0 ${prefix}bg-dark ${prefix}p-5 ${prefix}align-items-center`}
          >
            <div
              className={`${prefix}toast`}
              role='alert'
              aria-live='assertive'
              aria-atomic='true'
            >
              <div className={`${prefix}toast-header`}>
                <svg
                  className={`${prefix}bd-placeholder-img ${prefix}rounded ${prefix}me-2`}
                  width='20'
                  height='20'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden='true'
                  preserveAspectRatio='xMidYMid slice'
                  focusable='false'
                >
                  <rect width='100%' height='100%' fill='#007aff' />
                </svg>
                <strong className={`${prefix}me-auto`}>Example</strong>
                <small className={`${prefix}text-body-secondary`}>
                  11 mins ago
                </small>
                <button
                  type='button'
                  className={`${prefix}btn-close`}
                  data-t-dismiss='toast'
                  aria-label='Close'
                ></button>
              </div>
              <div className={`${prefix}toast-body`}>
                Hello, world! This is a toast message.
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Tooltips({ prefix = 't-' }) {
  return (
    <article
      className={`${prefix}mt-3 ${prefix}mb-5 ${prefix}pb-5`}
      id='tooltips'
    >
      <div
        className={`${prefix}bd-heading ${prefix}sticky-xl-top-- ${prefix}align-self-start ${prefix}mt-5 ${prefix}mb-3 ${prefix}mt-xl-0 ${prefix}mb-xl-2`}
      >
        <h3>Tooltips</h3>
        <a
          className={`${prefix}d-flex ${prefix}align-items-center`}
          href='../components/tooltips/'
        >
          Documentation
        </a>
      </div>

      <div>
        <div className={`${prefix}bd-example-snippet ${prefix}bd-code-snippet`}>
          <div
            className={`${prefix}bd-example ${prefix}m-0 ${prefix}border-0 ${prefix}tooltip-demo`}
          >
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
              data-t-toggle='tooltip'
              data-t-placement='top'
              title='Tooltip on top'
            >
              Tooltip on top
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
              data-t-toggle='tooltip'
              data-t-placement='right'
              title='Tooltip on end'
            >
              Tooltip on end
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
              data-t-toggle='tooltip'
              data-t-placement='bottom'
              title='Tooltip on bottom'
            >
              Tooltip on bottom
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
              data-t-toggle='tooltip'
              data-t-placement='left'
              title='Tooltip on start'
            >
              Tooltip on start
            </button>
            <button
              type='button'
              className={`${prefix}btn ${prefix}btn-secondary`}
              data-t-toggle='tooltip'
              data-t-html='true'
              title='<em>Tooltip</em> <u>with</u> <b>HTML</b>'
            >
              Tooltip with HTML
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      <Header
        {...{
          prefix,
        }}
      />
      <div
        className={`${styles['bd-all']} ${prefix}container-fluid ${prefix}bg-body`}
      >
        <section id='content'>
          <h2
            className={`${prefix}sticky-xl-top-- ${prefix}fw-bold ${prefix}pt-3 ${prefix}pt-xl-5 ${prefix}pb-2 ${prefix}pb-xl-3`}
          >
            Contents
          </h2>
        </section>

        <section id='forms'>
          <h2
            className={`${prefix}sticky-xl-top-- ${prefix}fw-bold ${prefix}pt-3 ${prefix}pt-xl-5 ${prefix}pb-2 ${prefix}pb-xl-3`}
          >
            Forms
          </h2>
        </section>

        <section id='components'>
          <h2
            className={`${prefix}sticky-xl-top-- ${prefix}fw-bold ${prefix}pt-3 ${prefix}pt-xl-5 ${prefix}pb-2 ${prefix}pb-xl-3`}
          >
            Components
          </h2>
        </section>
      </div>
    </>
  )
}

function Header({ prefix }) {
  return (
    <>
      <aside
        className={`${prefix}bd-aside ${prefix}sticky-xl-top-- ${prefix}text-body-secondary ${prefix}align-self-start ${prefix}mb-3 ${prefix}mb-xl-5 ${prefix}px-2`}
      >
        <nav className={`${prefix}small`} id='toc'>
          <ul className={`${prefix}list-unstyled`}>
            <li className={`${prefix}my-2`}>
              <button
                className={`${prefix}btn ${prefix}d-inline-flex ${prefix}align-items-center ${prefix}collapsed-- ${prefix}border-0`}
                data-t-toggle='collapse'
                aria-expanded='false'
                data-t-target='#contents-collapse'
                aria-controls='contents-collapse'
              >
                Contents
              </button>
              <ul
                className={`${prefix}list-unstyled ${prefix}ps-3 ${prefix}collapse--`}
                id='contents-collapse'
              >
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#typography'
                  >
                    Typography
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#images'
                  >
                    Images
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#tables'
                  >
                    Tables
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#figures'
                  >
                    Figures
                  </a>
                </li>
              </ul>
            </li>
            <li className={`${prefix}my-2`}>
              <button
                className={`${prefix}btn ${prefix}d-inline-flex ${prefix}align-items-center ${prefix}collapsed-- ${prefix}border-0`}
                data-t-toggle='collapse'
                aria-expanded='false'
                data-t-target='#forms-collapse'
                aria-controls='forms-collapse'
              >
                Forms
              </button>
              <ul
                className={`${prefix}list-unstyled ${prefix}ps-3 ${prefix}collapse--`}
                id='forms-collapse'
              >
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#overview'
                  >
                    Overview
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#disabled-forms'
                  >
                    Disabled forms
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#sizing'
                  >
                    Sizing
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#input-group'
                  >
                    Input group
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#floating-labels'
                  >
                    Floating labels
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#validation'
                  >
                    Validation
                  </a>
                </li>
              </ul>
            </li>
            <li className={`${prefix}my-2`}>
              <button
                className={`${prefix}btn ${prefix}d-inline-flex ${prefix}align-items-center ${prefix}collapsed-- ${prefix}border-0`}
                data-t-toggle='collapse'
                aria-expanded='false'
                data-t-target='#components-collapse'
                aria-controls='components-collapse'
              >
                Components
              </button>
              <ul
                className={`${prefix}list-unstyled ${prefix}ps-3 ${prefix}collapse--`}
                id='components-collapse'
              >
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#accordion'
                  >
                    Accordion
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#alerts'
                  >
                    Alerts
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#badge'
                  >
                    Badge
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#breadcrumb'
                  >
                    Breadcrumb
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#buttons'
                  >
                    Buttons
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#button-group'
                  >
                    Button group
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#card'
                  >
                    Card
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#carousel'
                  >
                    Carousel
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#dropdowns'
                  >
                    Dropdowns
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#list-group'
                  >
                    List group
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#modal'
                  >
                    Modal
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#navs'
                  >
                    Navs
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#navbar'
                  >
                    Navbar
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#pagination'
                  >
                    Pagination
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#popovers'
                  >
                    Popovers
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#progress'
                  >
                    Progress
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#scrollspy'
                  >
                    Scrollspy
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#spinners'
                  >
                    Spinners
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#toasts'
                  >
                    Toasts
                  </a>
                </li>
                <li>
                  <a
                    className={`${prefix}d-inline-flex ${prefix}align-items-center ${prefix}rounded ${prefix}text-decoration-none`}
                    href='#tooltips'
                  >
                    Tooltips
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
