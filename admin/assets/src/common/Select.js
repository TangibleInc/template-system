import { useEffect, useRef } from 'react' // Aliased from Tangible.Preact || wp.element

/**
 * Wrap Select2 module from vendor/tangible/interface
 *
 * @see https://select2.org/
 *
 * Also used in ../template-import-export
 */
const { jQuery: $ } = window

const Select = ({
  labelForEmptyValue = '',
  options = [],
  value = '',
  onChange,
  multiSelect,
  style
}) => {

  const ref = useRef()

  /**
   * Activate Select2
   */

  useEffect(() => {

    const $el = $(ref.current)
    ref.current.$el = $el

    onChange(value)

    $el.tangibleSelect({
      minimumResultsForSearch: 5
    })

    if (multiSelect) {
      // Ensure multiple values are selected on mount
      $el.val(value)
      $el.trigger('change')
    }

    $el.on('change', function(e) {

      if ( !multiSelect ) {
        onChange(e.target.value)
        return
      }

      if ( !ref.current ) return

      // Ensure array of values for multi-select

      const values = $el.select2('data').map(item => item.id)
      onChange(values)
    })

    const select2 = ref.current.select2 = $el.data('select2')

    // Clean up when component removed
    return () => {
      select2 && select2.destroy()
    }

  }, []) // NOTE: Empty array to run only once on component mount

  // Ensure Select2 shows current value
  if (ref.current && ref.current.$el) {
    if (multiSelect) {
      const currentValues = ref.current.$el.val()
      if (value.length!==currentValues.length && options.length) {
        // After select is rendered with options
        setImmediate(function() {
          ref.current.$el.val(value)
          ref.current.$el.trigger('change')
        })
      }
    } else if (ref.current.value!==value) {
      ref.current.$el.val(value)
      ref.current.$el.trigger('change')
    }
  }

  return <select
    ref={ref}
    // onChange={e => onChange(e.target.value)}
    autoComplete='off'
    multiple={multiSelect}
    style={{
      display: 'none',
      width: '160px', // Default width
      ...style
    }}
  >
    { labelForEmptyValue &&
       <option value="" disabled={true} selected={value==null}>{ labelForEmptyValue }</option>
    }
    { options.map((option, optionIndex) =>
      <option
        key={`option-${optionIndex}`}
        value={option.value}
        selected={option.value===value}
      >{option.label}</option>
    )}

  </select>
}

export default Select
