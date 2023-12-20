import { useCallback, useRef, useState } from 'react'
import Field from './Field'
import Select from '../../../../common/Select'
import ensureDataForRule from './ensureDataForRule'

const debug = false // Set this to false for production
const log = (...args) => debug && console.log('[Rule]', ...args)

const Rule = ({
  ruleGroups,
  setRuleGroups,
  group,
  groupIndex,
  rule,
  ruleIndex,
  ruleProps,
}) => {
  log('--- Rule ---', rule)

  /**
   * Create ever-fresh reference for current rule, for use in onChange function closure
   * for select field (see below)
   */
  const ruleRef = useRef()
  ruleRef.current = rule

  const {
    ruleDefinitionByField,

    ajaxStateRef,
    setAjaxState,
  } = ruleProps

  const setRule = (givenRule = {}) => {
    group[ruleIndex] = {
      ...rule,
      ...givenRule,
    }
    ruleGroups[groupIndex] = group
    setRuleGroups()
  }

  /**
   * Ensure data by AJAX request as needed
   *
   * Was on rule mount: useEffect(() => { ensureData() }, [])
   *
   * Must check on every render, in case any rule part changed
   */

  const ensureData = useCallback(() => {
    ensureDataForRule({
      rule,
      ruleDefinitionByField,

      ajaxStateRef,
      setAjaxState,
    })
  }, [rule])

  ensureData()

  const fieldDef = rule.field && ruleDefinitionByField[rule.field]

  /**
   * Create select field for each rule part
   */
  const partSelect = (partName) => {
    if (!fieldDef || !fieldDef[partName]) return // Ensure field definition exists

    // Part definition
    let partDef = fieldDef[partName][0]

    const isPartSelect =
      partName === 'operators' ||
      (partDef && (partDef.type === 'select' || partDef.type === 'select_ajax'))
    // NOTE: If fieldDef['values'][1] exists, assume it's the same type

    if (!isPartSelect) {
      /**
       * Support non-select field types
       * See ../LocationEditor where it gathers
       */

      const { type, placeholder, description } = partDef || {}

      if (type === 'input') {
        let value = rule[partName]

        return (
          <div className={`rule-part rule-${partName}`}>
            <input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={(e) => {
                const rule = ruleRef.current // Use fresh reference
                setRule({
                  ...rule,
                  [partName]: e.target.value,
                })
              }}
            />
            {description && (
              <small style={{ display: 'block' }}>{description}</small>
            )}
          </div>
        )
      }

      return
    }

    /**
     * Support conditionally showing values select for certain operators
     *
     * Also supports multiple values to match different operators.
     *
     * See same logic in ./ensureDataForRule.js
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

    const isOperators = partName === 'operators'

    const rulePartName = isOperators
      ? 'operator'
      : partName.replace(/values/, 'value')

    // Prepare properties for select input

    const labelForEmptyValue =
      isOperators || rule.operator === 'exclude'
        ? '' // No empty value for operators
        : // Empty value is accepted if label is defined
          partDef['label_for_empty_value']

    /**
     * For input type "select_ajax", options are empty until they're ready.
     *
     * See ./ensureDataForRule, getOptionsForRule()
     */

    const options = isOperators
      ? fieldDef[partName]

          // Support filtering operators by field_2
          .filter(
            (obj) => !obj.field_2 || obj.field_2.indexOf(rule.field_2) >= 0
          )

          .map((obj) => ({
            value: obj.name,
            label: obj.label,
          }))
      : partDef.getOptionsForRule
      ? partDef.getOptionsForRule(rule)
      : partDef.options

    if (!options) {
      log('Options not available yet')
      return
    }

    if (isOperators) log('Operator options', options)

    let value = rule[rulePartName]

    // Select first option by default if value is empty and there's no option for empty
    if (
      !partDef['multi_select'] &&
      !value &&
      !labelForEmptyValue &&
      options[0] &&
      options[0].value
    ) {
      value = rule[rulePartName] = options[0].value

      log('Select first option by default', rulePartName, value)

      setRule(rule) // Will trigger re-render
    }

    log('partSelect', rulePartName, rule[rulePartName])

    return (
      <div className={`rule-part rule-${partName}`}>
        <Select
          {...{
            labelForEmptyValue,
            options,
            value,

            onChange(value) {
              // Use fresh reference for current rule
              const rule = ruleRef.current

              /**
               * Update rule with new value for current part
               *
               * Previously, there was logic here to clear/remove the rest of rule parts
               * (afer current part), but because the Select component triggers onChange
               * initially on mount, it caused parts to get cleared incorrectly.
               *
               * Now we simply update the changed part and keep other rule parts the same.
               */
              const nextRule = {
                ...rule,
                [rulePartName]: value,
              }

              log('Next rule', nextRule)

              setRule(nextRule) // Will trigger ensureData()
            },

            multiSelect: !isOperators && partDef['multi_select'],

            style: isOperators ? { width: 'auto' } : {},
          }}
        />
      </div>
    )
  }

  return (
    <>
      <div className="rule">
        <div className="rule-parts">
          <Field
            {...{
              rule,
              setRule,
              ruleProps,
              ensureData,
            }}
          />

          {partSelect('field_2')}

          {fieldDef &&
            (!fieldDef['field_2'] || rule['field_2']) &&
            partSelect('operators')}
          {fieldDef &&
            (!fieldDef['field_2'] || rule['field_2']) &&
            partSelect('values')}
        </div>

        <div className="rule-actions">
          <div className="rule-action rule-action--remove-rule">
            <div
              className="icon"
              onClick={() => {
                // Remove this rule
                group.splice(ruleIndex, 1)

                if (!group.length) {
                  // If group is empty, remove it

                  ruleGroups.splice(groupIndex, 1)
                } else {
                  ruleGroups[groupIndex] = group
                }

                setRuleGroups()
              }}
            >
              <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {fieldDef && fieldDef.description && (
        <p
          dangerouslySetInnerHTML={{
            __html: fieldDef.description,
          }}
        ></p>
      )}
    </>
  )
}

export default Rule
