const debug = false // Set this to false for production
const log = (...args) => debug && console.log('[ensureDataForRule]', ...args)

const { ajax } = window.Tangible

// AJAX action prefix must be the same as in includes/location/ajax/index.php
const ajaxActionPrefix = 'tangible_template_location__'

const ensureDataForRule = ({
  rule,
  ruleDefinitionByField,
  ajaxStateRef,
  setAjaxState,
}) => {
  if (!rule.field) return

  // Field definition
  const fieldDef = ruleDefinitionByField[rule.field]
  if (!fieldDef) return

  for (const partName of ['field_2', 'values']) {
    if (!fieldDef[partName]) continue // Next

    // Field part definition
    let partDef = fieldDef[partName][0]
    if (!partDef || partDef.type !== 'select_ajax') continue // Check next part

    /**
     * Support conditionally showing values select for certain operators
     *
     * Also supports multiple values to match different operators.
     *
     * See same logic in ./index.js, partSelect()
     */

    if (partName === 'values') {
      for (const valuesDef of fieldDef.values) {
        if (
          !valuesDef.operators ||
          valuesDef.operators.indexOf(rule.operator) >= 0
        ) {
          // Operators not defined or matches

          partDef = valuesDef
          break // Stop searching
        }

        // No match - Continue searching
        partDef = null
      }

      if (!partDef) {
        log('No values select for operator', rule.operator)
        return
      }
    }

    const ajaxState = ajaxStateRef.current
    const ajaxActionName = partDef.ajax_action
    const ajaxActionData = {}

    /**
     * Map rule properties to AJAX request
     *
     * For example, if definition is field_2 => post_type, then
     * request.post_type = rule.field_2
     */

    if (partDef['rule_properties_to_ajax']) {
      const props = partDef['rule_properties_to_ajax']

      for (const key in props) {
        if (!rule[key]) {
          // Assume all keys are required: Don't make AJAX request

          log('Missing request key', key)
          return
        }

        ajaxActionData[props[key]] = rule[key]
      }
    }

    /**
     * Map direct values to AJAX request keys
     *
     * For example, if definition is post_type => 'lesson', then
     * request.post_type = 'lesson'
     */
    if (partDef['ajax_properties']) {
      const props = partDef['ajax_properties']

      for (const key in props) {
        ajaxActionData[key] = props[key]
      }

      log('Mapped AJAX properties to values', ajaxActionData)
    }

    // Provide part definition with methods to get options based on rule
    if (!partDef.getAjaxActionCacheKey) {
      partDef.getAjaxActionCacheKey = function (currentRule) {
        let cacheKey = ajaxActionName

        if (partDef['rule_properties_to_ajax']) {
          const props = partDef['rule_properties_to_ajax']

          for (const key in props) {
            cacheKey += '__' + props[key] + '__' + currentRule[key]
          }

          // log('Cache key', cacheKey, currentRule)
        }

        return cacheKey
      }

      partDef.getOptionsForRule = function (currentRule) {
        const key = partDef.getAjaxActionCacheKey(currentRule)
        const ajaxState = ajaxStateRef.current // NOTE: Ensure fresh reference

        if (ajaxState[key] && !(ajaxState[key] instanceof Promise)) {
          log('Got options for key', key, ajaxState[key])
          return ajaxState[key]
        }
        // Caller must handle when no options available
        log('Options not ready for key', key, ajaxState)
      }
    }

    // Unique key to track progress
    const ajaxActionCacheKey = partDef.getAjaxActionCacheKey(rule)

    /**
     * Update part definition with fetched options
     */

    const updatePartDefinition = (data) => {
      log('updatePartDefinition', ajaxStateRef.current)

      setAjaxState({
        ...ajaxStateRef.current, // NOTE: Ensure fresh reference
      }) // Re-render
    }

    /**
     * Fetch
     */
    if (!ajaxState[ajaxActionCacheKey]) {
      const name = ajaxActionPrefix + ajaxActionName

      log('Getting data..', name, ajaxActionData)

      // Assign the Promise to cache for tracking progress
      ajaxState[ajaxActionCacheKey] = ajax(name, ajaxActionData)
        .then((data) => {
          ajaxStateRef.current[ajaxActionCacheKey] = data // NOTE: Ensure fresh reference

          log(
            'Got data',
            ajaxActionCacheKey,
            ajaxStateRef.current[ajaxActionCacheKey]
          )

          updatePartDefinition(data)

          return data // Make it available for subsequent .then()
        })
        .catch((e) => {
          log('Failed to get data', ajaxActionCacheKey, e)
        })

      return // Skip the rest until data ready
    }

    /**
     * Fetch in progress
     */
    if (ajaxState[ajaxActionCacheKey] instanceof Promise) {
      log('Fetch in progress', ajaxActionCacheKey)
      return // Skip the rest until data ready
    }

    /**
     * Cached
     */

    // log('Cached', ajaxActionCacheKey, ajaxState[ ajaxActionCacheKey ])

    // Continue to next rule part
  }
}

export default ensureDataForRule
