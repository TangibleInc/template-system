export default function createPopover({
  CLASS_PREFIX,
  Tooltip
}: {
  CLASS_PREFIX: string
  Tooltip?: any
}) {
  /**
   * Constants
   */

  const NAME = 'popover'

  const SELECTOR_TITLE = `.${CLASS_PREFIX}popover-header`
  const SELECTOR_CONTENT = `.${CLASS_PREFIX}popover-body`

  const Default = {
    ...Tooltip.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template: `<div class="${CLASS_PREFIX}popover" role="tooltip"><div class="${CLASS_PREFIX}popover-arrow"></div><h3 class="${CLASS_PREFIX}popover-header"></h3><div class="${CLASS_PREFIX}popover-body"></div></div>`,
    trigger: 'click',
  }

  const DefaultType = {
    ...Tooltip.DefaultType,
    content: '(null|string|element|function)',
  }

  /**
   * Class definition
   */

  class Popover extends Tooltip {
    // Getters
    static get Default() {
      return Default
    }

    static get DefaultType() {
      return DefaultType
    }

    static get NAME() {
      return NAME
    }

    // Overrides
    _isWithContent() {
      return this._getTitle() || this._getContent()
    }

    // Private
    _getContentForTemplate() {
      return {
        [SELECTOR_TITLE]: this._getTitle(),
        [SELECTOR_CONTENT]: this._getContent(),
      }
    }

    _getContent() {
      return this._resolvePossibleFunction(this._config.content)
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = Popover.getOrCreateInstance(this, config)

        if (typeof config !== 'string') {
          return
        }

        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      })
    }
  }

  return Popover
}
