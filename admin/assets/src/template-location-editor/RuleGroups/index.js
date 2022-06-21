import Rule from './Rule'

const createNewRuleGroup = () => [
  {}, // Empty rule
]

const RuleGroups = ({ ruleGroups, setRuleGroups, ruleProps }) => {
  return (
    <>
      <div className="rule-groups">
        {ruleGroups.map((group, groupIndex) => (
          <div key={`rule-group-${groupIndex}`} className="rule-group">
            {/* {groupIndex > 0 &&
          <div>
            ..or..
          </div>
          } */}

            {group.map((rule, ruleIndex) => (
              <Rule
                key={`rule-group-${groupIndex}-rule-${ruleIndex}`}
                {...{
                  ruleGroups,
                  setRuleGroups,
                  group,
                  groupIndex,
                  rule,
                  ruleIndex,
                  ruleProps,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="button button--add-rule-group"
        onClick={() => {
          ruleGroups.push(createNewRuleGroup())
          setRuleGroups(ruleGroups)
        }}
      >
        Add location
      </button>
    </>
  )
}

export default RuleGroups
