
export function createEnableDismissTrigger({
  CLASS_PREFIX,
  DATA_PREFIX,
  EventHandler,
  SelectorEngine,
  isDisabled,
}) {
  const enableDismissTrigger = (component, method = 'hide') => {
    const clickEvent = `click.dismiss${component.EVENT_KEY}`
    const name = component.NAME

    EventHandler.on(
      document,
      clickEvent,
      `[data-${DATA_PREFIX}dismiss="${name}"]`,
      function (event) {
        if (['A', 'AREA'].includes(this.tagName)) {
          event.preventDefault()
        }

        if (isDisabled(this)) {
          return
        }

        const target =
          SelectorEngine.getElementFromSelector(this) ||
          this.closest(`.${CLASS_PREFIX}${name}`)
        const instance = component.getOrCreateInstance(target)

        if (!instance) {
          console.warn('No instance found for component', target)
        }

        // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
        instance[method]()
      },
    )
  }

  return enableDismissTrigger
}
