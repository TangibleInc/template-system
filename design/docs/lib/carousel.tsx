import '@site/all' // Listens to events on data-t attributes
import { placeholderImage300x150 } from '@site/utilities/placeholder'

export default function Example({
  prefix = 't-' // or ''
}) {
  return (
    <>
      <div id='carouselExampleCaptions' className={`${prefix}carousel ${prefix}slide`}>
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
            <img src={placeholderImage300x150} className={`${prefix}d-block ${prefix}w-100`} alt='...' />
            <div className={`${prefix}carousel-caption ${prefix}d-none ${prefix}d-md-block`}>
              <h5>First slide label</h5>
              <p>
                Placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className={`${prefix}carousel-item`}>
            <img src={placeholderImage300x150} className={`${prefix}d-block ${prefix}w-100`} alt='...' />
            <div className={`${prefix}carousel-caption ${prefix}d-none ${prefix}d-md-block`}>
              <h5>Second slide label</h5>
              <p>
                Placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className={`${prefix}carousel-item`}>
            <img src={placeholderImage300x150} className={`${prefix}d-block ${prefix}w-100`} alt='...' />
            <div className={`${prefix}carousel-caption ${prefix}d-none ${prefix}d-md-block`}>
              <h5>Third slide label</h5>
              <p>
                Placeholder content for the third slide.
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
    </>
  )
}
