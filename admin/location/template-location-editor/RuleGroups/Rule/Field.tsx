import Select from '../../../../common/Select'

const Field = ({ rule, setRule, ruleProps, ensureData }) => {
  const { fieldOptions } = ruleProps

  return (
    <div className="rule-part rule-field">
      <Select
        {...{
          labelForEmptyValue: 'Select location..',
          options: fieldOptions,
          value: rule.field,
          onChange(value) {
            setRule({
              field: value,
            }) // Will trigger ensureData()
          },
        }}
      />
    </div>
  )
}

export default Field
