import { useEffect, useMemo, useRef, useState } from 'react'
import RuleGroups from './RuleGroups'

const { jQuery: $ } = window

const debug = false // Set this to false for production
const log = (...args) => debug && console.log('[LocationEditor]', ...args)

const LocationEditor = ({ data, ruleDefinitions }) => {
  const [state, setState] = useState(data)

  const stateRef = useRef()
  stateRef.current = state

  const [ajaxState, setAjaxState] = useState({})

  /**
   * Create ever-fresh reference for current AJAX state, for use in function closures
   * See ./Rule/ensureDataForRule
   */
  const ajaxStateRef = useRef()
  ajaxStateRef.current = ajaxState

  const containerRef = useRef()
  const stateInputElementRef = useRef()

  // Rule groups

  const {
    // NOTE: Convert incoming data from snake to camel case
    rule_groups: ruleGroups = [],
  } = state

  const setRuleGroups = () =>
    setState((state) => ({
      ...state,
      // NOTE: Convert outgoing data from camel to snake case
      rule_groups: ruleGroups,
    }))

  /**
   * Preprocess rule definitions on mount - Used in Rule/Field.js
   */

  const { fieldOptions, ruleDefinitionByField } = useMemo(() => {
    // First field as list of select options
    const fieldOptions = []

    // Map of rule definitions organized by field name
    const ruleDefinitionByField = {
      // field: definition
    }

    ruleDefinitions.forEach((def) => {
      fieldOptions.push({
        value: def.name, // Field name
        label: def.label,
      })

      ruleDefinitionByField[def.name] = def
    })

    log('ruleDefinitionByField', ruleDefinitionByField)

    return {
      fieldOptions,
      ruleDefinitionByField,
    }
  }, [])

  /**
   * Properties to pass to Rule
   */
  const ruleProps = {
    ruleDefinitions,
    fieldOptions,
    ruleDefinitionByField,

    ajaxStateRef,
    setAjaxState,
  }

  useEffect(() => {
    /**
     * Generate human-readable description of rule groups
     */

    let description = ''

    const $rules = $(containerRef.current).find('.rule')

    for (let i = 0, len = $rules.length; i < len; i++) {
      const $parts = $($rules[i]).find('.rule-part')

      let ruleDescription = ''

      for (let j = 0, partLen = $parts.length; j < partLen; j++) {
        const $part = $($parts[j])
        const $select = $part.find('select')

        if (!$select[0]) {
          // Support non-select field types
          const $input = $part.find('input')
          if ($input) {
            ruleDescription += (j > 0 ? ' ' : '') + $input.val()
          }

          continue
        }

        /**
         * Ensure Select2 was instantiated - See ./Rule/Select
         */
        if (!$select[0].select2) continue

        const values = $select.select2('data')

        if (!Array.isArray(values)) continue

        ruleDescription +=
          (j > 0 ? ' ' : '') + values.map((value) => value.text).join(', ')
      }

      // log('Rule description:', ruleDescription)

      description += (i > 0 ? '<br>' : '') + ruleDescription
    }

    log('Description:', description)

    /**
     * Update input field for entire state
     */
    const state = stateRef.current

    state.description = description
    stateInputElementRef.current.value = JSON.stringify(state)
  })

  return (
    <div ref={containerRef}>
      <input
        type="hidden"
        name="location"
        ref={stateInputElementRef}
        value={JSON.stringify(state)}
      />

      <RuleGroups
        {...{
          ruleGroups,
          setRuleGroups,
          ruleProps,
        }}
      />
    </div>
  )
}

export default LocationEditor
