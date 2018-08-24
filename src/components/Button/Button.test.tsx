/* eslint-env jest */
import React from 'react'
import { create } from 'react-test-renderer'
import Button from '~/components/Button'

describe('NiceCheckbox', () => {
  it('renders the checkbox with correct label', () => {
    expect(
      create(
        <Button text="qwe" position={{ x: 1, y: 2 }} color="blue" />,
      ).toJSON(),
    ).toMatchSnapshot()
    expect(
      create(<Button text="qwe" position={{ x: 1, y: 2 }} />).toJSON(),
    ).toMatchSnapshot()
  })
})
