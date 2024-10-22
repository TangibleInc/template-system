import createBaseComponent from './base'
import EventHandler from './dom/event-handler'
import createManipulator from './dom/manipulator'
import createSelectorEngine from './dom/selector-engine'
import {
  // defineJQueryPlugin,
  execute,
  getElement,
  getNextActiveElement,
  isDisabled,
  isElement,
  isRTL,
  isVisible,
  noop,
  reflow,
  triggerTransitionEnd,
  findShadowRoot,
  getUID,
  toType,
  executeAfterTransition,
  parseSelector,
} from './utilities'
import { createEnableDismissTrigger } from './utilities/component-functions'
import createConfig from './utilities/config'
import createBackdrop from './utilities/backdrop'
import createFocusTrap from './utilities/focustrap'
import { DefaultAllowlist, sanitizeHtml } from './utilities/sanitizer'
import createTemplateFactory from './utilities/template-factory'
import createScrollBarHelper from './utilities/scrollbar'

const base = {
  // BaseComponent,
  // Config, // Support prefix
  // defineJQueryPlugin,
  // enableDismissTrigger,
  // Manipulator, // Support prefix
  // SelectorEngine,
  EventHandler,
  execute,
  executeAfterTransition,
  findShadowRoot,
  getElement,
  getNextActiveElement,
  getUID,
  isDisabled,
  isElement,
  isRTL,
  isVisible,
  noop,
  reflow,
  triggerTransitionEnd,

  // TODO: Support loading these separately?
  // Backdrop,
  // FocusTrap,
  // Popper,
  DefaultAllowlist,
  sanitizeHtml,
  // TemplateFactory,
}

export type ComponentCreator = (
  props: {
    DATA_PREFIX: string
    DATA_PREFIX_BASE: string
    CLASS_PREFIX: string

    // TODO: Improve these types
    Backdrop: any
    BaseComponent: any
    Config: any
    enableDismissTrigger: any
    FocusTrap: any
    Manipulator: any
    Popper: any
    ScrollBarHelper: any
    SelectorEngine: any
    TemplateFactory: any
    Tooltip?: any

    // Other components
    [key: string]: any
  } & typeof base,
) => Function | Object

/**
 * Create component by providing shared utilities and config such as
 * prefix for HTML data attributes.
 */
export function create({
  classPrefix: CLASS_PREFIX = 't-', // Or '' for no prefix
  dataPrefix: DATA_PREFIX = 't-',
  components = {},
}: {
  dataPrefix?: string
  dataPrefixBase?: string
  classPrefix?: string
  components?: {
    [name: string]: ComponentCreator
  }
}) {

  const DATA_PREFIX_BASE = DATA_PREFIX.slice(0, -1)

  const Manipulator = createManipulator({
    DATA_PREFIX,
    DATA_PREFIX_BASE,
  })

  const Config = createConfig({
    Manipulator,
    isElement,
    toType,
  })

  const BaseComponent = createBaseComponent({
    Config,
    DATA_PREFIX,
    DATA_PREFIX_BASE,
  })

  const SelectorEngine = createSelectorEngine({
    BaseComponent,
    DATA_PREFIX,
    isDisabled,
    isVisible,
    parseSelector,
  })

  const TemplateFactory = createTemplateFactory({
    SelectorEngine,
    Config,
    DefaultAllowlist,
    sanitizeHtml,
    execute,
    getElement,
    isElement,
  })

  const Backdrop = createBackdrop({
    DATA_PREFIX,
    DATA_PREFIX_BASE,
    EventHandler,
    Config,
    execute,
    executeAfterTransition,
    getElement,
    reflow,
  })

  const FocusTrap = createFocusTrap({
    DATA_PREFIX,
    DATA_PREFIX_BASE,
    EventHandler,
    SelectorEngine,
    Config,
  })

  const ScrollBarHelper = createScrollBarHelper({
    CLASS_PREFIX,
    Manipulator,
    SelectorEngine,
    isElement,
  })
  
  const enableDismissTrigger = createEnableDismissTrigger({
    CLASS_PREFIX,
    DATA_PREFIX,
    EventHandler,
    SelectorEngine,
    isDisabled,
  })

  const design = {
    ...base,
    Backdrop,
    BaseComponent,
    CLASS_PREFIX,
    Config,
    DATA_PREFIX_BASE,
    DATA_PREFIX,
    enableDismissTrigger,
    FocusTrap,
    Manipulator,
    ScrollBarHelper,
    SelectorEngine,
    TemplateFactory,
    Popper: null,
    addComponent(name: string, creator: ComponentCreator) {
      design[name] = design[name] || creator(design)
    }
  }

  if (components.Popper) {
    design.addComponent('Popper', components.Popper)
  }

  // Load components that extend other components at the end
  const loadLater: string[] = ['Popover']
  const entries = [
    ...Object.entries(components).filter(([name]) => !loadLater.includes(name)),
    ...loadLater
    .filter(name => Boolean(components[name]))
    .map<[key: string, ComponentCreator]>((key) => [
      key,
      components[key],
    ]),
  ]

  for (const [name, creator] of entries) {
    design.addComponent(name, creator)
  }

  // onDOMContentLoaded

  // Array.from(document.querySelectorAll('.t-dropdown'))
  //     .forEach(toastNode => new Toast(toastNode))

  return design
}
