const Modal = (props) => {
  return (
    <div id="tangible-logic-root" className="tangible-logic-open">
      <div className="tangible-logic-modal">
        <div className="tangible-logic-header">
          <div className="tangible-logic-title">
            {props.title ? props.title : ''}
          </div>
          <button
            id="logic-button-cancel"
            className="tangible-components-button has-icon"
            type="button"
            aria-label="Close dialog"
            onClick={props.cancel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path>
            </svg>
          </button>
        </div>

        <div className="tangible-logic-rule-group">{props.children}</div>

        <div className="tangible-logic-actions tangible-logic-clear">
          <button
            id="logic-button-cancel"
            className="tangible-components-button is-tertiary"
            type="button"
            onClick={props.cancel}
          >
            Cancel
          </button>
          <button
            id="logic-button-add-logic"
            className="tangible-components-button is-primary"
            type="button"
            onClick={props.submit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
