import Select from '../../../common/Select'

const ExportRule = ({
  rule,
  ruleIndex,

  exportRulesRef,
  setExportRules,

  templateTypeItemOptionsRef,
  ensureTemplateTypeItemOptions,
  templateCategoryOptions,
  hasPlugin
}) => (
  <div className="export-rule">
    <div className="export-rule-part">
      <Select
        {...{
          labelForEmptyValue: 'Select template type',
          options: [

            /**
             * Enable block export only when Blocks & Editor is active
             */
            ...((hasPlugin['blocks'] && hasPlugin['blocks_editor'])
              ? [{ label: 'Block', value: 'tangible_block' }]
              : []),
            ...(hasPlugin['loops'] || hasPlugin['template_system']
              ? [
                { label: 'Template', value: 'tangible_template' },
                { label: 'Style', value: 'tangible_style' },
                { label: 'Script', value: 'tangible_script' },
                { label: 'Layout', value: 'tangible_layout' },
              ]
              : []
            )
          ],
          value: rule.field,
          onChange(field) {
            rule.field = field

            exportRulesRef.current[ruleIndex] = rule
            setExportRules(exportRulesRef.current)
          },
        }}
      />
    </div>

    {rule.field && (
      <div className="export-rule-part">
        <Select
          {...{
            options: [
              { label: 'All', value: 'all' },
              { label: 'Include', value: 'include' },
              { label: 'Exclude', value: 'exclude' },
              { label: 'Include category', value: 'include_template_categories' },
              { label: 'Exclude category', value: 'exclude_template_categories' },
            ],
            value: rule.operator,
            onChange(operator) {
              rule.operator = operator

              if (operator === 'all') {
                rule.values = [] // Clear values from include/exclude
              }

              exportRulesRef.current[ruleIndex] = rule
              setExportRules(exportRulesRef.current)

              if (['include', 'exclude'].includes(operator)) {
                ensureTemplateTypeItemOptions(rule.field)
              }
            },
            style: { width: 'auto' },
          }}
        />
      </div>
    )}

    {rule.field &&
      rule.operator !== 'all' &&
      (['include_template_categories', 'exclude_template_categories'].includes(rule.operator)
      ? <div className="export-rule-part">
          <Select
            {...{
              options: templateCategoryOptions,
              value: rule.values,
              onChange(values) {
                rule.values = values
                exportRulesRef.current[ruleIndex] = rule
                setExportRules(exportRulesRef.current)
              },
              multiSelect: true,
            }}
          />
        </div>
      :
      // Include/exclude post IDs
      templateTypeItemOptionsRef.current[rule.field] && (
        <div className="export-rule-part">
          <Select
            {...{
              options:
                templateTypeItemOptionsRef.current[rule.field] instanceof
                Promise
                  ? [] // Still loading
                  : templateTypeItemOptionsRef.current[rule.field],

              value: rule.values,

              onChange(values) {
                rule.values = values

                exportRulesRef.current[ruleIndex] = rule
                setExportRules(exportRulesRef.current)
              },
              multiSelect: true,
            }}
          />
        </div>
      ))
    }

    <div className="export-rule-part export-rule-part--remove-rule">
      <div
        className="icon"
        onClick={() => {
          // Remove this rule
          exportRulesRef.current.splice(ruleIndex, 1)

          setExportRules(exportRulesRef.current)
        }}
      >
        <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" />
        </svg>
      </div>
    </div>
  </div>
)

export default ExportRule
