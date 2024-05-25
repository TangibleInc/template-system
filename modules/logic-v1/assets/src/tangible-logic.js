jQuery(document).ready(function ($) {
  // Conditional logic modal window

  var $html = $('html')
  var $body = $('body')
  var $root = $('<div id="tangible-logic-root"></div>')

  $body.append($root)

  // Open button - can be dynamically added, so bind on body
  $body.on('click', '[data-tangible-logic="open"]', function () {
    var $input = $(this).parent().find('[data-tangible-logic="input"]')

    if (!$input.length) {
      console.warn('tangible/logic - Input field not found')
      return
    }

    // Logic config
    var config = $input.data('tangibleLogicConfig')

    if (typeof config === 'string') {
      try {
        config = JSON.parse(config)
      } catch (e) {
        console.warn('tangible/logic - Config failed to parse', config)
        config = []
      }
    }

    // Current data
    var value = $input.val()
    var data = []

    if (value) {
      try {
        data = JSON.parse(value)
      } catch (e) {
        console.warn('tangible/logic - Input value failed to parse', value)
        data = []
      }
      // Fix for literal "[]"
      if (typeof data === 'string') data = []
    }

    openUI($input, data, config)
  })

  var openClass = 'tangible-logic-open'
  var hideScrollbarClass = 'tangible-logic-hide-scrollbar'

  function closeUI() {
    $root.removeClass(openClass)
    $root.empty()
    $html.removeClass(hideScrollbarClass)
  }

  var modalActionsHtml =
    '<div class="tangible-logic-modal-actions tangible-logic-clear">' +
    '<button type="button" class="tangible-logic-button" data-tangible-logic="save">Save</button>' +
    '<button type="button" class="tangible-logic-button" data-tangible-logic="close">Cancel</button>' +
    '</div>'

  function openUI($input, data, config) {
    $html.addClass(hideScrollbarClass)

    // Build modal

    var $modal = $(
      '<div class="tangible-logic-modal">' +
        '<form>' +
        buildFormFields(data, config) +
        modalActionsHtml +
        '</form>' +
        '</div>'
    )

    $root.append($modal)
    $root.addClass(openClass)

    // Form actions

    var $form = $modal.find('form')

    // Close
    $form.find('[data-tangible-logic="close"]').on('click', closeUI)

    // Save
    $form.find('[data-tangible-logic="save"]').on('click', function () {
      saveForm($form, $input)
      closeUI()
    })

    // Add rule group

    var $ruleGroups = $form.find('.tangible-logic-rule-groups')

    $form
      .find('[data-tangible-logic="add-rule-group"]')
      .on('click', function () {
        var ruleGroupHtml = buildRuleGroup([{}], config)

        $ruleGroups.append(ruleGroupHtml)
      })

    // Rule actions - can be dynamically added, so bind on form

    // Add rule
    $form.on('click', '[data-tangible-logic="add-rule"]', function () {
      var $rules = $(this)
        .closest('.tangible-logic-rule-group')
        .find('.tangible-logic-rule-group-rules')
      var ruleHtml = buildRule({}, config)

      $rules.append(ruleHtml)
    })

    // Remove rule
    $form.on('click', '[data-tangible-logic="remove-rule"]', function () {
      var $rule = $(this).closest('.tangible-logic-rule')
      var $rules = $rule.closest('.tangible-logic-rule-group-rules')

      $rule.remove()

      var $remainingRules = $rules.find('.tangible-logic-rule')

      if (!$remainingRules.length) {
        // Remove rule group
        $rules.closest('.tangible-logic-rule-group').remove()
      }
    })

    // Rule field - Update rules based on selected field

    config.fieldMap = buildFieldMap(config)

    var fieldSelectSelector = '.tangible-logic-rule-field-select'
    $form.find(fieldSelectSelector).each(function () {
      updateRuleBasedOnField($(this), config)
    })
    $form.on('change', fieldSelectSelector, function (e) {
      updateRuleBasedOnField($(this), config)
    })

    var operandSelectSelector = '.tangible-logic-rule-operand-select'
    // Called by updateRuleBasedOnField above
    /*$form.find(operandSelectSelector).each(function() {
      updateRuleBasedOnOperand($(this), config)
    })*/
    $form.on('change', operandSelectSelector, function (e) {
      updateRuleBasedOnOperand($(this), config)
    })
  }

  function buildFieldMap(config) {
    // Field map for dynamically showing operands and values

    var fieldMap = {} // { name: { operands, values }, .. }

    $.each(config.fields || [], function (index, field) {
      fieldMap[field.name] = field
    })

    return fieldMap
  }

  function buildFormFields(data, config) {
    var html = ''

    if (config.title) {
      html += '<div class="tangible-logic-title">' + config.title + '</div>'
    }
    if (config.description) {
      html +=
        '<div class="tangible-logic-description">' +
        config.description +
        '</div>'
    }

    // Rule groups

    html += '<div class="tangible-logic-rule-groups">'

    if (!data.length) {
      // Default when empty
      html += buildRuleGroup([{}], config)
    } else {
      $.each(data, function (ruleGroupIndex, ruleGroupData) {
        html += buildRuleGroup(ruleGroupData, config)
      })
    }

    html += '</div>'

    // Add rule group
    html +=
      '<div class="tangible-logic-modal-actions tangible-logic-clear">' +
      '<button type="button" class="tangible-logic-button" data-tangible-logic="add-rule-group">' +
      'Add rule group' +
      '</button>' +
      '</div>'

    return html
  }

  function buildRuleGroup(ruleGroupData, config) {
    var html = ''

    html +=
      '<div class="tangible-logic-rule-group">' +
      '<div class="tangible-logic-rule-group-separator tangible-logic-clear">' +
      '<div class="tangible-logic-rule-column">' +
      'or' +
      '</div>' +
      '</div>'

    html += '<div class="tangible-logic-rule-group-box">'

    // Rules
    html += '<div class="tangible-logic-rule-group-rules">'
    $.each(ruleGroupData, function (ruleIndex, ruleData) {
      html += buildRule(ruleData, config)
    })
    html += '</div>'

    // Add rule
    html +=
      '<div class="tangible-logic-modal-actions tangible-logic-clear">' +
      '<button type="button" class="tangible-logic-button" data-tangible-logic="add-rule">Add rule</button>' +
      '</div>'

    html += '</div>' + '</div>' // rule-group-box // rule group

    return html
  }

  function buildRule(ruleData, config) {
    var fieldName = 'tangible_logic[][][field]'

    var html =
      '<div class="tangible-logic-rule tangible-logic-clear"' +
      " data-tangible-logic-rule-data='" +
      // Important: Escape '"<>
      escapeHtml(JSON.stringify(ruleData || {})) +
      "'" +
      '>' +
      '<div class="tangible-logic-rule-columns">' +
      buildRuleColumn('field', buildFieldSelect(fieldName, ruleData, config)) +
      // Add these columns as needed
      /*
          +'<div class="tangible-logic-rule-column tangible-logic-rule-operand">'
      //+ buildOperandSelect(fieldName, ruleData, config)
          +'</div>'
          +'<div class="tangible-logic-rule-column tangible-logic-rule-value">'
      //+ buildValueSelect(fieldName, ruleData, config)
          +'</div>'
          +'<div class="tangible-logic-rule-column tangible-logic-rule-subvalue">'
          +'</div>'
          */
      '</div>' +
      '<div class="tangible-logic-rule-actions">' +
      '<button type="button" class="tangible-logic-action-icon" data-tangible-logic="remove-rule">' +
      'Remove' +
      '</button>' +
      '</div>' +
      '</div>'

    return html
  }

  function buildRuleColumn(type, content) {
    return (
      '<div class="tangible-logic-rule-column tangible-logic-rule-' +
      type +
      '">' +
      '<div class="tangible-logic-rule-column-content">' +
      content +
      '</div>' +
      '</div>'
    )
  }

  function buildOperandSelect(fieldName, ruleData, operands) {
    var operandFieldName = fieldName.replace('[field]', '[operand]')

    if (!operands || !operands.length) return ''

    // If current operand not found, select first one
    // The result is passed back to caller via ruleData.operand
    var foundOperand = false
    for (let i = 0, len = operands.length; i < len; i++) {
      if (operands[i].name === ruleData.operand) foundOperand = true
    }
    if (!foundOperand && operands[0] && operands[0].name) {
      ruleData.operand = operands[0].name
    }

    return buildSelect(operandFieldName, ruleData.operand, operands, 'operand')
  }

  function buildValueSelect(
    fieldName,
    ruleData,
    values,
    currentOperand,
    subvalueIndex = 0
  ) {
    if (!values) return ''

    var valueKey = 'value' + (subvalueIndex ? '_' + subvalueIndex : '')
    var valueFieldName = fieldName.replace('[field]', '[' + valueKey + ']')

    // Value type
    if (values[0] && values[0].type) {
      var valueConfig = values[0]

      // Default value
      if (
        (ruleData[valueKey] === undefined || ruleData[valueKey] === '') &&
        valueConfig.default !== undefined
      )
        ruleData[valueKey] = valueConfig.default

      if (valueConfig.type === 'number') {
        return buildNumberInput(
          valueFieldName,
          ruleData[valueKey],
          valueConfig,
          'value',
          valueKey
        )
      } else if (valueConfig.type === 'text') {
        return buildTextInput(
          valueFieldName,
          ruleData[valueKey],
          valueConfig,
          'value',
          valueKey
        )
      } else if (valueConfig.type === 'select') {
        values = valueConfig.options
      }
    }

    // Values for operand
    var valuesForOperand = []

    $.each(values, function (index, value) {
      var keep = true
      if (value.operands) keep = value.operands.indexOf(currentOperand) >= 0
      if (value.excludeOperands)
        keep = value.excludeOperands.indexOf(currentOperand) < 0
      if (!keep) return
      valuesForOperand.push(value)
    })

    if (!valuesForOperand.length) return ''

    return buildSelect(
      valueFieldName,
      ruleData[valueKey],
      valuesForOperand,
      'value',
      valueKey
    )
  }

  function buildFieldSelect(fieldName, ruleData, config) {
    return buildSelect(fieldName, ruleData.field, config.fields, 'field')
  }

  // Similar to buildValueSelect, to support input types
  function buildSubfieldSelect(fieldName, ruleData, values, subvalueIndex = 0) {
    if (!values) return ''

    var valueKey = 'field' + (subvalueIndex ? '_' + subvalueIndex : '')
    var valueFieldName = fieldName.replace('[field]', '[' + valueKey + ']')

    // Value type
    if (values.type) {
      var valueConfig = values

      // Default value
      if (
        (ruleData[valueKey] === undefined || ruleData[valueKey] === '') &&
        valueConfig.default !== undefined
      )
        ruleData[valueKey] = valueConfig.default

      if (valueConfig.type === 'number') {
        return buildNumberInput(
          valueFieldName,
          ruleData[valueKey],
          valueConfig,
          'subfield', // 'value',
          valueKey
        )
      } else if (valueConfig.type === 'text') {
        return buildTextInput(
          valueFieldName,
          ruleData[valueKey],
          valueConfig,
          'subfield', // 'value',
          valueKey
        )
      } else if (valueConfig.type === 'select') {
        values = valueConfig.options
      }
    }

    return buildSelect(
      valueFieldName,
      ruleData[valueKey],
      values,
      'subfield', // 'value',
      valueKey
    )
  }

  function buildSelect(name, value, fields, selectType, inputName) {
    var html = '<select name="' + name + '"'
    if (selectType) {
      html +=
        ' class="tangible-logic-rule-input tangible-logic-rule-' +
        selectType +
        '-select"' +
        ' data-tangible-logic-rule-input-name="' +
        (inputName || selectType) +
        '"'
    }
    html += '>'

    var valueDefined = value !== undefined
    var options = []

    if (!valueDefined && selectType === 'field') {
      options.push({ name: '', label: 'Choose..' })
    }

    options = options.concat(fields || [])

    $.each(options, function (i, option) {
      if (!option) return
      var isSelected = (!i && !valueDefined) || option.name.toString() === value

      html +=
        '<option value="' +
        option.name +
        '"' +
        (isSelected ? ' selected="selected"' : '') +
        '>' +
        option.label +
        '</option>'
    })

    html += '</select>'

    return html
  }

  function buildNumberInput(name, value, valueConfig, selectType, inputName) {
    if (!$.isNumeric(value)) value = 0

    var html = '<input type="number" name="' + name + '"'
    if (selectType) {
      html +=
        ' class="tangible-logic-rule-input tangible-logic-rule-' +
        selectType +
        '-select"' +
        ' data-tangible-logic-rule-input-name="' +
        (inputName || selectType) +
        '"'
    }
    html +=
      ' value="' +
      (value !== undefined ? value : 0) +
      '"' +
      ' min="' +
      (valueConfig.min !== undefined ? valueConfig.min : 0) +
      '"'

    if (valueConfig.max) html += ' max="' + valueConfig.max + '"'
    if (valueConfig.step) html += ' step="' + valueConfig.step + '"'

    html += ' />'

    if (valueConfig.unit) {
      if (typeof valueConfig.unit === 'string') {
        html +=
          '<span class="tangible-logic-rule-value-unit">' +
          valueConfig.unit +
          '</span>'
      } else {
        // Unit select
        html +=
          '<select name="' +
          name +
          '_unit"' +
          ' class="tangible-logic-rule-input tangible-logic-rule-' +
          selectType +
          '-unit-select"' +
          ' data-tangible-logic-rule-input-name="' +
          (inputName || selectType) +
          '_unit"' +
          '>'

        $.each(valueConfig.unit, function (index, unitConfig) {
          if (typeof unitConfig === 'string') {
            unitConfig = { name: unitConfig, label: unitConfig }
          }

          html +=
            '<option value="' +
            unitConfig.name +
            '"' +
            (!index ? ' selected="selected"' : '') +
            '>' +
            unitConfig.label +
            '</option>'
        })

        html += '</select>'
      }
    }

    return (
      '<div class="tangible-logic-rule-number-input-wrap">' + html + '</div>'
    )
  }

  function buildTextInput(
    name,
    value = '',
    valueConfig,
    selectType,
    inputName
  ) {
    var html = '<input type="text" name="' + name + '"'
    if (selectType) {
      html +=
        ' class="tangible-logic-rule-input tangible-logic-rule-' +
        selectType +
        '-select"' +
        ' data-tangible-logic-rule-input-name="' +
        (inputName || selectType) +
        '"'
    }
    html +=
      ' value="' +
      // Important: Escape user input text
      escapeHtml(value) +
      '"' +
      (valueConfig.placeholder
        ? ' placeholder="' + valueConfig.placeholder + '"'
        : '') +
      ' />'

    return html
  }

  function buildInputLabel(fieldConfig, key) {
    var label = fieldConfig[key + '_label'] || ''
    if (!label) return label
    return (
      '<label class="tangible-logic-rule-input-label">' + label + '</label>'
    )
  }

  function buildInputDescription(fieldConfig, key) {
    var label = fieldConfig[key + '_description'] || ''
    if (!label) return label
    return (
      '<div class="tangible-logic-rule-input-description">' + label + '</div>'
    )
  }

  function updateRuleBasedOnField($field, config) {
    var fieldName = $field.attr('name')
    var ruleField = $field.val()

    var $rule = $field.closest('.tangible-logic-rule')
    var $columns = $rule.find('.tangible-logic-rule-columns')

    // From previous rule
    var $subFields = $rule.find('.tangible-logic-rule-subfield')
    var $operand = $rule.find('.tangible-logic-rule-operand')
    var $value = $rule.find('.tangible-logic-rule-value')
    var $subValues = $rule.find('.tangible-logic-rule-subvalue')

    $subFields.remove()
    $operand.remove()
    $value.remove()
    $subValues.remove()

    if (!ruleField) {
      return
    }

    var ruleData = $rule.data('tangibleLogicRuleData') || {}
    var fieldConfig = config.fieldMap[ruleField] || {}

    // Field label

    var $fieldColumn = $rule.find(
      '.tangible-logic-rule-field .tangible-logic-rule-column-content'
    )
    var fieldLabel = buildInputLabel(fieldConfig, 'field')
    var fieldDescription = buildInputDescription(fieldConfig, 'field')

    $fieldColumn.find('.tangible-logic-rule-input-label').remove()
    $fieldColumn.find('.tangible-logic-rule-input-description').remove()

    if (fieldLabel) $fieldColumn.prepend($(fieldLabel))
    if (fieldDescription) $fieldColumn.append($(fieldDescription))

    // Subfields: field_2, ..
    for (let i = 0; i < 3; i++) {
      const subvalueIndex = i + 2 // Start with 2
      const subFieldKey = 'field_' + subvalueIndex
      const subFields = fieldConfig[subFieldKey]

      // No more subfields
      if (!subFields) break

      $columns.append(
        buildRuleColumn(
          'subfield',
          buildSubfieldSelect(fieldName, ruleData, subFields, subvalueIndex)
        )
      )
    }

    // Build operand

    if (fieldConfig.operands) {
      $columns.append(
        buildRuleColumn(
          'operand',
          buildOperandSelect(fieldName, ruleData, fieldConfig.operands)
        )
      )
    }

    updateRuleBasedOnOperand(
      $columns.find('.tangible-logic-rule-operand-select'),
      config,
      $rule
    )

    // Reset rule data
    //$rule.data('tangibleLogicRuleData', {})
  }

  function updateRuleBasedOnOperand(
    $operandSelect,
    config,
    $ruleWithNoOperand
  ) {
    var $rule, currentOperand

    if (!$operandSelect.length) {
      if (!$ruleWithNoOperand) return

      // No operand - Continue building value fields

      $rule = $ruleWithNoOperand
      currentOperand = ''
    } else {
      $rule = $operandSelect.closest('.tangible-logic-rule')
      currentOperand = $operandSelect.val()
    }

    var $columns = $rule.find('.tangible-logic-rule-columns')

    var $fieldSelect = $rule.find('.tangible-logic-rule-field-select')

    var fieldName = $fieldSelect.attr('name')
    var ruleField = $fieldSelect.val()
    if (!ruleField) return

    var ruleData = $rule.data('tangibleLogicRuleData') || {}

    // Reset rule data
    $rule.data('tangibleLogicRuleData', {})

    // From previous rule
    var $value = $rule.find('.tangible-logic-rule-value')
    if ($value.length) {
      ruleData.value = $value.find('.tangible-logic-rule-value-select').val()
    }

    var $subValues = $rule.find('.tangible-logic-rule-subvalue')
    $subValues.each(function (i) {
      $(this)
        .find('.tangible-logic-rule-input')
        .each(function () {
          var $el = $(this)
          var key = $el.data('tangibleLogicRuleInputName')
          ruleData[key] = $el.val()
        })
    })

    $value.remove()
    $subValues.remove()

    // Build value

    var fieldConfig = config.fieldMap[ruleField] || {}

    if (!fieldConfig.values) return

    // Operand can set value=false
    if (currentOperand && fieldConfig.operands) {
      for (let i = 0, len = fieldConfig.operands.length; i < len; i++) {
        if (
          !fieldConfig.operands[i] ||
          fieldConfig.operands[i].name !== currentOperand
        )
          continue
        // No value field
        if (fieldConfig.operands[i].value === false) return
        // Found matching
        break
      }
    }

    function withLabel(key, content) {
      return (
        buildInputLabel(fieldConfig, key) +
        content +
        buildInputDescription(fieldConfig, key)
      )
    }

    const column = buildRuleColumn(
      'value',
      withLabel(
        'values',
        buildValueSelect(
          fieldName,
          ruleData,
          fieldConfig.values,
          currentOperand
        )
      )
    )

    // If the first value needs to be before the operand field
    if (
      fieldConfig.values.length > 0 &&
      fieldConfig.values[0].hasOwnProperty('before_operand') &&
      fieldConfig.values[0].before_operand === true
    ) {
      $rule.find('.tangible-logic-rule-operand').before(column)
    } else {
      $columns.append(column)
    }

    // If there is conditional displaying for field values
    let visibilities = addVisibility(fieldConfig.values, 'values', [])

    // Build subvalues
    for (let i = 0; i < 3; i++) {
      var subvalueIndex = i + 2 // Start at 2
      var subvalueKey = 'values_' + subvalueIndex

      var subvalues = fieldConfig[subvalueKey]

      // If there is no other subvalue
      if (!subvalues) break

      const column = buildRuleColumn(
        'subvalue',
        withLabel(
          subvalueKey,
          buildValueSelect(
            fieldName,
            ruleData,
            subvalues,
            currentOperand,
            subvalueIndex
          )
        )
      )

      // If the subfield needs to be before the operand field
      if (
        subvalues.length > 0 &&
        subvalues[0].hasOwnProperty('before_operand') &&
        subvalues[0].before_operand === true
      ) {
        $rule.find('.tangible-logic-rule-operand').before(column)
      } else {
        $columns.append(column)
      }

      visibilities = addVisibility(subvalues, subvalueKey, visibilities)
    }

    // Apply the visibility when all fields are loaded
    applyVisibilities(visibilities, $rule)
  }

  // Form: Save

  function saveForm($form, $input) {
    // Save form data to hidden input field

    var formData = getFormData($form)

    console.log('Tangible logic form result', formData)

    formData = JSON.stringify(formData)

    $input.val(formData)
    $input.trigger('change')
  }

  // Form: Get data to save

  function getFormData($form) {
    var ruleGroups = []

    $form.find('.tangible-logic-rule-group').each(function () {
      var $rules = $(this).find('.tangible-logic-rule')
      var rules = []

      $rules.each(function () {
        var rule = {}

        $(this)
          .find('.tangible-logic-rule-input')
          .each(function () {
            var $input = $(this)
            var name = $input.data('tangibleLogicRuleInputName')
            var value = $input.val()

            if (value !== '') {
              rule[name] = value
            }
          })

        rules.push(rule)
      })

      ruleGroups.push(rules)
    })

    return ruleGroups
  }

  // Visibility conditions

  function addVisibility(values, fieldName, visibilities) {
    // Value type
    if (values[0] === undefined || values[0].type === undefined)
      return visibilities

    // Visibility conditions
    if (values[0].visibility === undefined) return visibilities

    var visibility = values[0].visibility

    // We store a callback for applying the visbility when all the fields are created
    visibilities.push({
      name: fieldName,
      config: visibility,
    })

    return visibilities
  }

  function applyVisibilities(data, $rule) {
    for (let i = 0; i < data.length; i++) {
      applyVisibility(data[i].name, data[i].config, $rule)
    }
  }

  function applyVisibility(fieldName, visibility, $rule) {
    let show = false

    // Test each visibility condition
    for (let i = 0; i < visibility.length; i++) {
      // We need to remove the 's' in value => name is value but backend is values
      let $field = $rule.find(
        'select[name="tangible_logic[][][' +
          visibility[i].field.replace('s', '') +
          ']"]'
      )

      // If we have an array on multiple field
      if (
        visibility[i].value.constructor === Array &&
        visibility[i].value.indexOf($field.val()) !== -1
      ) {
        show = true
      }
      // On string name
      else if (visibility[i].value === $field.val()) {
        show = true
      }
    }

    let $container = $rule
      .find(
        'select[name="tangible_logic[][][' + fieldName.replace('s', '') + ']"]'
      )
      .parent()
      .parent()
    show !== false ? $container.show() : $container.hide()
  }

  // Utilities

  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  }

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s]
    })
  }
})
