import * as React from 'react'
import { mount } from 'enzyme'
import { serialize, deserialize } from './react-seritalize'

class CustomComponent extends React.Component<any, any> {
  render() {
    return <div className="CustomComponent">{this.props.children}</div>
  }
}

const INJECTABLE_TAG = (props: any) => (
  <span className="INJECTABLE_TAG">{props.children}</span>
)

const MyAwesome = (props: { children: React.ReactNode }) => (
  <span className="FunctionalComponent"></span>
)
const testComponent = (
  <div>
    This is a test component with some{' '}
    <MyAwesome>inline stuff happening</MyAwesome>
    <INJECTABLE_TAG>Be prepared for awesomness!!!</INJECTABLE_TAG>
  </div>
)

describe('React serialization tests', () => {
  it('should serialize components', () => {
    const ser = serialize(testComponent)
    const deser = deserialize(ser, {
      components: {
        [INJECTABLE_TAG.name]: CustomComponent,
        [MyAwesome.name]: MyAwesome,
      },
    })

    const wrapper = mount(deser)

    console.log(wrapper.html())
  })
})
