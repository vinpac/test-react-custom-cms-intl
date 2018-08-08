import React from 'react'
import { storiesOf } from '@storybook/react'

import { withInfo } from '@storybook/addon-info'
import Button from '.'
const text = `
A very important part of this example is the \`.babelrc\` file which configures the test
environment to use \`babel-preset-env\` and configures it to transpile modules to commonjs).
Learn more.

Hello world
`

storiesOf('Button', module)
  .add(
    'Default',
    withInfo({ text })(() => (
      <Button color="blue" position={{ x: 1, y: 2 }} text="qw" />
    )),
  )
  .add(
    'Loading',
    withInfo({ text })(() => (
      <Button color="green" position={{ x: 1, y: 2 }} text="qw" />
    )),
  )
