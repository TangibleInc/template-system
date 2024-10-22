import '@site/all' // Listens to events on data-t attributes

export default function AccordionExample({
  prefix = 't-' // or ''
}) {
  return (
    <div className={`${prefix}accordion`} id='accordionExample'>
      <div className={`${prefix}accordion-item`}>
        <h2 className={`${prefix}accordion-header`}>
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
        </h2>
        <div
          id='collapseOne'
          className={`${prefix}accordion-collapse ${prefix}collapse ${prefix}show`}
          data-t-parent='#accordionExample'
        >
          <div className={`${prefix}accordion-body`}>
            <strong>This is the first item's accordion body.</strong> It is
            shown by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </div>
        </div>
      </div>
      <div className={`${prefix}accordion-item`}>
        <h2 className={`${prefix}accordion-header`}>
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
        </h2>
        <div
          id='collapseTwo'
          className={`${prefix}accordion-collapse ${prefix}collapse`}
          data-t-parent='#accordionExample'
        >
          <div className={`${prefix}accordion-body`}>
            <strong>This is the second item's accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </div>
        </div>
      </div>
      <div className={`${prefix}accordion-item`}>
        <h2 className={`${prefix}accordion-header`}>
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
        </h2>
        <div
          id='collapseThree'
          className={`${prefix}accordion-collapse ${prefix}collapse`}
          data-t-parent='#accordionExample'
        >
          <div className={`${prefix}accordion-body`}>
            <strong>This is the third item's accordion body.</strong> It is
            hidden by default, until the collapse plugin adds the appropriate
            classes that we use to style each element. These classes control the
            overall appearance, as well as the showing and hiding via CSS
            transitions. You can modify any of this with custom CSS or
            overriding our default variables. It's also worth noting that just
            about any HTML can go within the <code>.accordion-body</code>,
            though the transition does limit overflow.
          </div>
        </div>
      </div>
    </div>
  )
}
