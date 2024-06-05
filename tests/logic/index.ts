import { test, is, ok, run } from 'testra'
import { getServer } from '../../framework/env'

export default run(async () => {
  const { wpx } = await getServer()

  test('Logic tag', async () => {
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
<Logic compare=or debug=true>
  <Rule taxonomy=category term=uncategorized />
</Logic>`,
        {
          logic: {
            or: [{ rule: { taxonomy: 'category', term: 'uncategorized' } }],
          },
        },
      ],
      [
        `
<Logic compare=not debug=true>
  <Rule taxonomy=category term=uncategorized />
</Logic>`,
        {
          logic: {
            not: [{ rule: { taxonomy: 'category', term: 'uncategorized' } }],
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

    let result, expected, template, logic

    /**
     * <Logic compare=all>
     */
    template = `
<Logic compare=all debug=true>
  <Rule taxonomy=category term=uncategorized />
</Logic>
`
    expected = {
      logic: {
        and: [{ rule: { taxonomy: 'category', term: 'uncategorized' } }],
      },
    }

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${template}
HTML);
    `
    ).trim()

    logic = JSON.parse(result)
    is(expected, logic, `<Logic compare=all>`)

    /**
     * <Logic compare=any>
     */
    template = `
<Logic compare=any debug=true>
  <Rule taxonomy=category term=uncategorized />
</Logic>
`
    expected = {
      logic: {
        or: [{ rule: { taxonomy: 'category', term: 'uncategorized' } }],
      },
    }

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${template}
HTML);
    `
    ).trim()

    logic = JSON.parse(result)
    is(expected, logic, `<Logic compare=any>`)
  }) // Logic tag

  test('Logic tag with If and Loop', async () => {
    let template, result, expected, testList, testLogic

    // Test map

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

    // Get logic by name

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

    // Evaluate logic by name

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

    // Logic or

    result = (
      await wpx`
return tangible_template(<<<'HTML'
<List test_list>
  <Map>
    <Key name>TEST_MAP_1</Key>
  </Map>
  <Map>
    <Key name>TEST_MAP_2</Key>
    <Key field_2>456</Key>
  </Map>
</List>
<Logic name=test_logic compare=or>
  <Rule field=wrong value=value />
  <Rule field=field_2 value=456 />
</Logic>
<Loop list=test_list logic=test_logic>
  <Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_2'

    is(expected, result, '<Logic or>')

    // Logic not

    result = (
      await wpx`
return tangible_template(<<<'HTML'
<List test_list>
  <Map>
    <Key name>TEST_MAP_1</Key>
    <Key field_1>123</Key>
  </Map>
  <Map>
    <Key name>TEST_MAP_2</Key>
  </Map>
</List>
<Logic name=test_logic compare=not>
  <Rule field=field_1 value=123 />
</Logic>
<Loop list=test_list logic=test_logic>
  <Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_2'

    is(expected, result, '<Logic not>')

    /**
     * All
     */

    testList = `
<List test_list>
  <Map>
    <Key name>TEST_MAP_1</Key>
    <Key field_1>123</Key>
    <Key field_2>456</Key>
  </Map>
  <Map>
    <Key name>TEST_MAP_2</Key>
    <Key field_3>789</Key>
  </Map>
</List>
`

    testLogic = `
<Logic name=test_logic>
  <All>
    <Rule field=field_1 value=123 />
    <Rule field=field_2 value=456 />
  </All>
</Logic>
`

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${testList}
${testLogic}
<Loop list=test_list logic=test_logic>
  <Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_1'

    is(expected, result, '<All>')

    /**
     * Any
     */

    testLogic = `
<Logic name=test_logic>
  <Any>
    <Rule field=field_1 value=123 />
    <Rule field=field_2 value=456 />
  </Any>
</Logic>
`

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${testList}
${testLogic}
<Loop list=test_list logic=test_logic>
  <Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_1'

    is(expected, result, '<Any>')

    /**
     * Not
     */

    testList = `
<List test_list>
  <Map>
    <Key name>TEST_MAP_1</Key>
    <Key field_1>123</Key>
  </Map>
  <Map>
    <Key name>TEST_MAP_2</Key>
    <Key field_2>456</Key>
  </Map>
</List>
`

    testLogic = `
<Logic name=test_logic>
  <Not>
    <Rule field=field_1 value=123 />
  </Not>
</Logic>
`

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${testList}
${testLogic}
<Loop list=test_list logic=test_logic>
  <Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_2'

    is(expected, result, '<Not>')

    /**
     * Not multiple
     */

    testList = `
<List test_list>
  <Map>
    <Key name>TEST_MAP_1</Key>
    <Key field_1>123</Key>
    <Key field_2>456</Key>
  </Map>
  <Map>
    <Key name>TEST_MAP_2</Key>
    <Key field_3>789</Key>
  </Map>
</List>
`

    testLogic = `
<Logic name=test_logic>
  <Not>
    <Rule field=field_1 value=123 />
    <Rule field=field_2 value=456 />
  </Not>
</Logic>
`

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${testList}
${testLogic}
<Loop list=test_list logic=test_logic>
  <Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_2'

    is(expected, result, '<Not> with multiple rules')

    /**
     * <Any false> is same as "not all"
     */

    testLogic = `
<Logic name=test_logic>
  <Any false>
    <Rule field=field_1 value=123 />
    <Rule field=field_2 value=456 />
  </Any>
</Logic>
`

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${testList}
${testLogic}
<Loop list=test_list logic=test_logic>
  <Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_2'

    is(expected, result, '<Any false>')

    /**
     * Not or
     */

    testList = `
<List test_list>
  <Map>
    <Key name>TEST_MAP_1</Key>
    <Key field_1>123</Key>
  </Map>
  <Map>
    <Key name>TEST_MAP_2</Key>
    <Key field_2>456</Key>
  </Map>
  <Map>
    <Key name>TEST_MAP_3</Key>
    <Key field_3>789</Key>
  </Map>
</List>
`

    testLogic = `
<Not>
  <Any>
    <Rule field=field_1 value=123 />
    <Rule field=field_2 value=456 />
  </Any>
</Not>
`

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${testList}
<Logic name=test_logic>
  ${testLogic}
</Logic>
<Loop list=test_list logic=test_logic>
  <Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_3'

    is(expected, result, '<Not> with <Any>')

    /**
     * <All false> is same as "not any" (all rules must be false)
     */

    testLogic = `
<All false>
  <Rule field=field_1 value=123 />
  <Rule field=field_2 value=456 />
</All>
`

    result = (
      await wpx`
return tangible_template(<<<'HTML'
${testList}
<Logic name=test_logic>
${testLogic}
</Logic>
<Loop list=test_list logic=test_logic>
<Field name />
</Loop>
HTML);
`
    ).trim()

    expected = 'TEST_MAP_3'

    is(expected, result, '<All false>')
  })
})
