import Data from './dom/data'
import EventHandler from './dom/event-handler'
// import Config from './utilities/config'
import { executeAfterTransition, getElement } from './utilities'

/**
 * Constants
 */

export default function createBaseComponent({
  Config,
  DATA_PREFIX,
  DATA_PREFIX_BASE,
}) {
  /**
   * Class definition
   */

  class BaseComponent extends Config {
    constructor(element, config) {
      super()

      element = getElement(element)
      if (!element) {
        console.warn('No element found for component', this.NAME)
        console.trace()
        return
      }

      this._element = element
      this._config = this._getConfig(config)

      Data.set(this._element, this.constructor.DATA_KEY, this)
    }

    // Public
    dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY)
      EventHandler.off(this._element, this.constructor.EVENT_KEY)

      for (const propertyName of Object.getOwnPropertyNames(this)) {
        this[propertyName] = null
      }
    }

    _queueCallback(callback, element, isAnimated = true) {
      executeAfterTransition(callback, element, isAnimated)
    }

    _getConfig(config) {
      config = this._mergeConfigObj(config, this._element)
      config = this._configAfterMerge(config)
      this._typeCheckConfig(config)
      return config
    }

    // Static
    static getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY)
    }

    static getOrCreateInstance(element, config = {}) {
      return (
        this.getInstance(element) ||
        new this(element, typeof config === 'object' ? config : null)
      )
    }

    static get DATA_PREFIX() {
      return DATA_PREFIX
    }

    static set DATA_PREFIX(_prefix: string) {
      let prefix = _prefix.replace(/\-$/, '')
      DATA_PREFIX_BASE = prefix
      DATA_PREFIX = `${prefix}-`
    }

    static get DATA_KEY() {
      return `${this.DATA_PREFIX}.${this.NAME}`
    }

    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`
    }

    static eventName(name) {
      return `${name}${this.EVENT_KEY}`
    }
  }

  return BaseComponent
}
