import { create } from 'react-test-renderer'
import Page from 'pages/home'
import 'jest-styled-components'

describe('Home', () => {
  it('shoud match snapshot', () => {
    const component = create(<Page />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
