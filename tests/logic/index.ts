import { test, is, ok, run } from 'testra'
import { getServer } from '../../framework/env'

export default run(async () => {
  const { wpx } = await getServer()

  test('logic', async () => {
    for (const [template, expected] of [
      [
        `
<Logic debug=true>
  <Rule taxonomy=category term=uncategorized />
</Logic>`,
        {
          logic: {
            and: [{ taxonomy: 'category', term: 'uncategorized' }],
          },
        },
      ],
      [
        `
<Logic name=weekend_webinar debug=true>
  <Rule taxonomy=event_type term=webinar />
  <Or>
    <Rule field=event_date value=Saturday />
    <Rule field=event_date value=Sunday />
  </Or>
</Logic>`,
        {
          name: 'weekend_webinar',
          logic: {
            and: [
              { taxonomy: 'event_type', term: 'webinar' },
              {
                or: [
                  { field: 'event_date', value: 'Saturday' },
                  { field: 'event_date', value: 'Sunday' },
                ],
              },
            ],
          },
        },
      ],
      [
        `
<Logic name=example action=hide debug=true>
  <Rule control=text_1 value="some value" />
</Logic>
`,
        {
          name: 'example',
          action: 'hide',
          logic: {
            and: [{ control: 'text_1', value: 'some value' }],
          },
        },
      ],
    ]) {
      let result = (
        await wpx`
return tangible_template(<<<'HTML'
${template}
HTML);
      `
      ).trim()

      const logic = JSON.parse(result)
      is(expected, logic, result)

      if (logic.name) {
        result = (
          await wpx`
tangible_template(<<<'HTML'
${template}
HTML);
return json_encode(
  tangible\\template_system\\get_logic_by_name("${logic.name}")
);
`
        ).trim()

        is(expected, JSON.parse(result), `get logic by name "${logic.name}"`)
      }
    }
  })
})
