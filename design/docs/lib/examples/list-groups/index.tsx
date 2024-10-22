import React from 'react'
export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      {/* <link href="list-groups.css" rel="stylesheet"> */}

      <svg xmlns='http://www.w3.org/2000/svg' className={`${prefix}d-none`}>
        <symbol id='calendar-event' viewBox='0 0 16 16'>
          <path d='M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z' />
          <path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z' />
        </symbol>

        <symbol id='alarm' viewBox='0 0 16 16'>
          <path d='M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z' />
          <path d='M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z' />
        </symbol>

        <symbol id='list-check' viewBox='0 0 16 16'>
          <path
            fill-rule='evenodd'
            d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z'
          />
        </symbol>
      </svg>

      <div
        className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}
      >
        <div className={`${prefix}list-group`}>
          <a
            href='#'
            className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}d-flex ${prefix}gap-3 ${prefix}py-3`}
            aria-current='true'
          >
            <img
              src='https://github.com/twbs.png'
              alt='twbs'
              width='32'
              height='32'
              className={`${prefix}rounded-circle ${prefix}flex-shrink-0`}
            />
            <div
              className={`${prefix}d-flex ${prefix}gap-2 ${prefix}w-100 ${prefix}justify-content-between`}
            >
              <div>
                <h6 className={`${prefix}mb-0`}>List group item heading</h6>
                <p className={`${prefix}mb-0 ${prefix}opacity-75`}>
                  Some placeholder content in a paragraph.
                </p>
              </div>
              <small className={`${prefix}opacity-50 ${prefix}text-nowrap`}>
                now
              </small>
            </div>
          </a>
          <a
            href='#'
            className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}d-flex ${prefix}gap-3 ${prefix}py-3`}
            aria-current='true'
          >
            <img
              src='https://github.com/twbs.png'
              alt='twbs'
              width='32'
              height='32'
              className={`${prefix}rounded-circle ${prefix}flex-shrink-0`}
            />
            <div
              className={`${prefix}d-flex ${prefix}gap-2 ${prefix}w-100 ${prefix}justify-content-between`}
            >
              <div>
                <h6 className={`${prefix}mb-0`}>Another title here</h6>
                <p className={`${prefix}mb-0 ${prefix}opacity-75`}>
                  Some placeholder content in a paragraph that goes a little
                  longer so it wraps to a new line.
                </p>
              </div>
              <small className={`${prefix}opacity-50 ${prefix}text-nowrap`}>
                3d
              </small>
            </div>
          </a>
          <a
            href='#'
            className={`${prefix}list-group-item ${prefix}list-group-item-action ${prefix}d-flex ${prefix}gap-3 ${prefix}py-3`}
            aria-current='true'
          >
            <img
              src='https://github.com/twbs.png'
              alt='twbs'
              width='32'
              height='32'
              className={`${prefix}rounded-circle ${prefix}flex-shrink-0`}
            />
            <div
              className={`${prefix}d-flex ${prefix}gap-2 ${prefix}w-100 ${prefix}justify-content-between`}
            >
              <div>
                <h6 className={`${prefix}mb-0`}>Third heading</h6>
                <p className={`${prefix}mb-0 ${prefix}opacity-75`}>
                  Some placeholder content in a paragraph.
                </p>
              </div>
              <small className={`${prefix}opacity-50 ${prefix}text-nowrap`}>
                1w
              </small>
            </div>
          </a>
        </div>
      </div>

      <div className={`${prefix}b-example-divider`}></div>

      <div
        className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}
      >
        <div className={`${prefix}list-group`}>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-2`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}flex-shrink-0`}
              type='checkbox'
              value=''
              checked
            />
            <span>
              First checkbox
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                With support text underneath to add more detail
              </small>
            </span>
          </label>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-2`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}flex-shrink-0`}
              type='checkbox'
              value=''
            />
            <span>
              Second checkbox
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                Some other text goes here
              </small>
            </span>
          </label>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-2`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}flex-shrink-0`}
              type='checkbox'
              value=''
            />
            <span>
              Third checkbox
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                And we end with another snippet of text
              </small>
            </span>
          </label>
        </div>

        <div className={`${prefix}list-group`}>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-2`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}flex-shrink-0`}
              type='radio'
              name='listGroupRadios'
              id='listGroupRadios1'
              value=''
              checked
            />
            <span>
              First radio
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                With support text underneath to add more detail
              </small>
            </span>
          </label>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-2`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}flex-shrink-0`}
              type='radio'
              name='listGroupRadios'
              id='listGroupRadios2'
              value=''
            />
            <span>
              Second radio
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                Some other text goes here
              </small>
            </span>
          </label>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-2`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}flex-shrink-0`}
              type='radio'
              name='listGroupRadios'
              id='listGroupRadios3'
              value=''
            />
            <span>
              Third radio
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                And we end with another snippet of text
              </small>
            </span>
          </label>
        </div>
      </div>

      <div className={`${prefix}b-example-divider`}></div>

      <div
        className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}
      >
        <div className={`${prefix}list-group`}>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-3`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}flex-shrink-0`}
              type='checkbox'
              value=''
              checked
              style={{ fontSize: '1.375em' }}
            />
            <span className={`${prefix}pt-1 ${prefix}form-checked-content`}>
              <strong>Finish sales report</strong>
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                <svg
                  className={`${prefix}bi ${prefix}me-1`}
                  width='1em'
                  height='1em'
                >
                  <use xlinkHref='#calendar-event' />
                </svg>
                1:00–2:00pm
              </small>
            </span>
          </label>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-3`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}flex-shrink-0`}
              type='checkbox'
              value=''
              style={{ fontSize: '1.375em' }}
            />
            <span className={`${prefix}pt-1 ${prefix}form-checked-content`}>
              <strong>Weekly All Hands</strong>
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                <svg
                  className={`${prefix}bi ${prefix}me-1`}
                  width='1em'
                  height='1em'
                >
                  <use xlinkHref='#calendar-event' />
                </svg>
                2:00–2:30pm
              </small>
            </span>
          </label>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-3`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}flex-shrink-0`}
              type='checkbox'
              value=''
              style={{ fontSize: '1.375em' }}
            />
            <span className={`${prefix}pt-1 ${prefix}form-checked-content`}>
              <strong>Out of office</strong>
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                <svg
                  className={`${prefix}bi ${prefix}me-1`}
                  width='1em'
                  height='1em'
                >
                  <use xlinkHref='#alarm' />
                </svg>
                Tomorrow
              </small>
            </span>
          </label>
          <label
            className={`${prefix}list-group-item ${prefix}d-flex ${prefix}gap-3 ${prefix}bg-body-tertiary`}
          >
            <input
              className={`${prefix}form-check-input ${prefix}form-check-input-placeholder ${prefix}bg-body-tertiary ${prefix}flex-shrink-0 ${prefix}pe-none`}
              disabled
              type='checkbox'
              value=''
              style={{ fontSize: '1.375em' }}
            />
            <span className={`${prefix}pt-1 ${prefix}form-checked-content`}>
              <span contenteditable='true' className={`${prefix}w-100`}>
                Add new task...
              </span>
              <small
                className={`${prefix}d-block ${prefix}text-body-secondary`}
              >
                <svg
                  className={`${prefix}bi ${prefix}me-1`}
                  width='1em'
                  height='1em'
                >
                  <use xlinkHref='#list-check' />
                </svg>
                Choose list...
              </small>
            </span>
          </label>
        </div>
      </div>

      <div className={`${prefix}b-example-divider`}></div>

      <div
        className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}
      >
        <div
          className={`${prefix}list-group ${prefix}list-group-checkable ${prefix}d-grid ${prefix}gap-2 ${prefix}border-0`}
        >
          <input
            className={`${prefix}list-group-item-check ${prefix}pe-none`}
            type='radio'
            name='listGroupCheckableRadios'
            id='listGroupCheckableRadios1'
            value=''
            checked
          />
          <label
            className={`${prefix}list-group-item ${prefix}rounded-3 ${prefix}py-3`}
            htmlFor='listGroupCheckableRadios1'
          >
            First radio
            <span
              className={`${prefix}d-block ${prefix}small ${prefix}opacity-50`}
            >
              With support text underneath to add more detail
            </span>
          </label>

          <input
            className={`${prefix}list-group-item-check ${prefix}pe-none`}
            type='radio'
            name='listGroupCheckableRadios'
            id='listGroupCheckableRadios2'
            value=''
          />
          <label
            className={`${prefix}list-group-item ${prefix}rounded-3 ${prefix}py-3`}
            htmlFor='listGroupCheckableRadios2'
          >
            Second radio
            <span
              className={`${prefix}d-block ${prefix}small ${prefix}opacity-50`}
            >
              Some other text goes here
            </span>
          </label>

          <input
            className={`${prefix}list-group-item-check ${prefix}pe-none`}
            type='radio'
            name='listGroupCheckableRadios'
            id='listGroupCheckableRadios3'
            value=''
          />
          <label
            className={`${prefix}list-group-item ${prefix}rounded-3 ${prefix}py-3`}
            htmlFor='listGroupCheckableRadios3'
          >
            Third radio
            <span
              className={`${prefix}d-block ${prefix}small ${prefix}opacity-50`}
            >
              And we end with another snippet of text
            </span>
          </label>

          <input
            className={`${prefix}list-group-item-check ${prefix}pe-none`}
            type='radio'
            name='listGroupCheckableRadios'
            id='listGroupCheckableRadios4'
            value=''
            disabled
          />
          <label
            className={`${prefix}list-group-item ${prefix}rounded-3 ${prefix}py-3`}
            htmlFor='listGroupCheckableRadios4'
          >
            Fourth disabled radio
            <span
              className={`${prefix}d-block ${prefix}small ${prefix}opacity-50`}
            >
              This option is disabled
            </span>
          </label>
        </div>
      </div>

      <div className={`${prefix}b-example-divider`}></div>

      <div
        className={`${prefix}d-flex ${prefix}flex-column ${prefix}flex-md-row ${prefix}p-4 ${prefix}gap-4 ${prefix}py-md-5 ${prefix}align-items-center ${prefix}justify-content-center`}
      >
        <div
          className={`${prefix}list-group ${prefix}list-group-radio ${prefix}d-grid ${prefix}gap-2 ${prefix}border-0`}
        >
          <div className={`${prefix}position-relative`}>
            <input
              className={`${prefix}form-check-input ${prefix}position-absolute ${prefix}top-50 ${prefix}end-0 ${prefix}me-3 ${prefix}fs-5`}
              type='radio'
              name='listGroupRadioGrid'
              id='listGroupRadioGrid1'
              value=''
              checked
            />
            <label
              className={`${prefix}list-group-item ${prefix}py-3 ${prefix}pe-5`}
              htmlFor='listGroupRadioGrid1'
            >
              <strong className={`${prefix}fw-semibold`}>First radio</strong>
              <span
                className={`${prefix}d-block ${prefix}small ${prefix}opacity-75`}
              >
                With support text underneath to add more detail
              </span>
            </label>
          </div>

          <div className={`${prefix}position-relative`}>
            <input
              className={`${prefix}form-check-input ${prefix}position-absolute ${prefix}top-50 ${prefix}end-0 ${prefix}me-3 ${prefix}fs-5`}
              type='radio'
              name='listGroupRadioGrid'
              id='listGroupRadioGrid2'
              value=''
            />
            <label
              className={`${prefix}list-group-item ${prefix}py-3 ${prefix}pe-5`}
              htmlFor='listGroupRadioGrid2'
            >
              <strong className={`${prefix}fw-semibold`}>Second radio</strong>
              <span
                className={`${prefix}d-block ${prefix}small ${prefix}opacity-75`}
              >
                Some other text goes here
              </span>
            </label>
          </div>

          <div className={`${prefix}position-relative`}>
            <input
              className={`${prefix}form-check-input ${prefix}position-absolute ${prefix}top-50 ${prefix}end-0 ${prefix}me-3 ${prefix}fs-5`}
              type='radio'
              name='listGroupRadioGrid'
              id='listGroupRadioGrid3'
              value=''
            />
            <label
              className={`${prefix}list-group-item ${prefix}py-3 ${prefix}pe-5`}
              htmlFor='listGroupRadioGrid3'
            >
              <strong className={`${prefix}fw-semibold`}>Third radio</strong>
              <span
                className={`${prefix}d-block ${prefix}small ${prefix}opacity-75`}
              >
                And we end with another snippet of text
              </span>
            </label>
          </div>

          <div className={`${prefix}position-relative`}>
            <input
              className={`${prefix}form-check-input ${prefix}position-absolute ${prefix}top-50 ${prefix}end-0 ${prefix}me-3 ${prefix}fs-5`}
              type='radio'
              name='listGroupRadioGrid'
              id='listGroupRadioGrid4'
              value=''
              disabled
            />
            <label
              className={`${prefix}list-group-item ${prefix}py-3 ${prefix}pe-5`}
              htmlFor='listGroupRadioGrid4'
            >
              <strong className={`${prefix}fw-semibold`}>
                Fourth disabled radio
              </strong>
              <span
                className={`${prefix}d-block ${prefix}small ${prefix}opacity-75`}
              >
                This option is disabled
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
