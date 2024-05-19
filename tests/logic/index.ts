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
            and: [{ rule: { taxonomy: 'category', term: 'uncategorized' } }],
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
              { rule: { taxonomy: 'event_type', term: 'webinar' } },
              {
                or: [
                  { rule: { field: 'event_date', value: 'Saturday' } },
                  { rule: { field: 'event_date', value: 'Sunday' } },
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
            and: [{ rule: { control: 'text_1', value: 'some value' } }],
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

  test('logic with if', async () => {
    let template, result, expected

    const map1 = `
<Map test_map>
  <Key field_1>123</Key>
  <Key field_2>456</Key>
  <Key field_3>789</Key>
</Map>
`

    result = JSON.parse(
      (
        await wpx`return tangible_template(<<<'HTML'
${map1}
<Get map=test_map />
HTML);`
      ).trim(),
    )

    expected = { field_1: '123', field_2: '456', field_3: '789' }
    is(expected, result, JSON.stringify(expected))

    const logic1 = `
<Logic name=test_logic>
  <Rule field=field_1 value=123 />
  <Rule field=field_2 value=456 />
  <Or>
    <Rule field=field_3 value=789 />
    <Rule field=field_3 value=abc />
  </Or>
</Logic>
`

    result = JSON.parse(
      (
        await wpx`
tangible_template(<<<'HTML'
${logic1}
HTML);
return json_encode(
  tangible\\template_system\\get_logic_by_name('test_logic')
);`
      ).trim(),
    )

    expected = {
      name: 'test_logic',
      logic: {
        and: [
          { rule: { field: 'field_1', value: '123' } },
          { rule: { field: 'field_2', value: '456' } },
          {
            or: [
              { rule: { field: 'field_3', value: '789' } },
              { rule: { field: 'field_3', value: 'abc' } },
            ],
          },
        ],
      },
    }
    is(expected, result, JSON.stringify(result))

    result = (
      await wpx`
tangible_template(<<<'HTML'
${map1}
${logic1}
HTML);
return json_encode(
  tangible\\template_system\\evaluate_logic_by_name('test_logic', function($rule) {
    return false;
  })
);
`
    ).trim()

    is('false', result, 'evaluate_logic_by_name === false')

    // If logic

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${map1}
${logic1}
<Loop map=test_map>
  <If logic=test_logic>TRUE<Else />FALSE</If>
</Loop>
HTML);
`
    ).trim()

    expected = 'TRUE'

    is(expected, result, '<If logic> === true')

    // If logic false
    result = (
      await wpx`
return tangible_template(<<<'HTML'
<Map test_map>
  <Key wrong>value</Key>
</Map>
${logic1}
<Loop map=test_map>
  <If logic=test_logic>TRUE<Else />FALSE</If>
</Loop>
HTML);
`
    ).trim()

    expected = 'FALSE'

    is(expected, result, '<If logic> === false')

    // Loop logic

    result = (
      await wpx`
return tangible_template(<<<'HTML'
<List test_list>
  <Map>
    <Key name>TEST_MAP_1</Key>
  </Map>
  <Map>
    <Key name>TEST_MAP_2</Key>
    <Key field_1>123</Key>
    <Key field_2>456</Key>
    <Key field_3>789</Key>
  </Map>
</List>
${logic1}
<Loop list=test_list logic=test_logic>
  <Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_2'

    is(expected, result, '<Loop logic> === true')
  })
})
