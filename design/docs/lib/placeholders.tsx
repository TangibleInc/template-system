import { placeholderImage300x150 } from '@site/utilities/placeholder'

export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    }}>
      <div className={`${prefix}card`}>
        <img
          src={placeholderImage300x150}
          className={`${prefix}card-img-top`}
          alt='...'
        />

        <div className={`${prefix}card-body`}>
          <h5 className={`${prefix}card-title`}>Card title</h5>
          <p className={`${prefix}card-text`}>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href='#' className={`${prefix}btn ${prefix}btn-primary`}>
            Go somewhere
          </a>
        </div>
      </div>

      <div className={`${prefix}card`} aria-hidden='true'>
        <img
          src={placeholderImage300x150}
          className={`${prefix}card-img-top`}
          alt='...'
        />
        <div className={`${prefix}card-body`}>
          <h5 className={`${prefix}card-title ${prefix}placeholder-glow`}>
            <span className={`${prefix}placeholder ${prefix}col-6`}></span>
          </h5>
          <p className={`${prefix}card-text placeholder-glow`}>
            <span className={`${prefix}placeholder ${prefix}col-7`}></span>
            <span className={`${prefix}placeholder ${prefix}col-4`}></span>
            <span className={`${prefix}placeholder ${prefix}col-4`}></span>
            <span className={`${prefix}placeholder ${prefix}col-6`}></span>
            <span className={`${prefix}placeholder ${prefix}col-8`}></span>
          </p>
          <a
            className={`${prefix}btn ${prefix}btn-primary ${prefix}disabled ${prefix}placeholder ${prefix}col-6`}
            aria-disabled='true'
          ></a>
        </div>
      </div>
    </div>
  )
}
