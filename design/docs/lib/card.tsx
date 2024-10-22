import { placeholderImage300x150 } from '@site/utilities/placeholder'

export default function Example({
  prefix = 't-', // or ''
}) {
  return (
    <>
      <div
        className={`${prefix}card`}
        style={{
          width: '18rem',
        }}
      >
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
    </>
  )
}
