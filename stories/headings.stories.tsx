import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import styled from 'styled-components'

const Container = styled.div`
  background: #ffe9e9;
  border: 0;
`

const Item = styled.div`
  background: #ecdcff;
  color: #8723fd;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

storiesOf('Core Styles', module)
  .add(
    'Heading',
    withInfo({ source: false, propTypes: false })(() => (
      <div>
        <h1>H1</h1>
        <h2>H2</h2>
        <h3>H3</h3>
        <h4>H4</h4>
        <h5>H5</h5>
        <h6>H6</h6>
      </div>
    )),
  )
  .add(
    'Padding',
    withInfo({ source: false, propTables: null })(() => (
      <div>
        <h3 className="tw-normal mb-4 mt-4">
          Full <code className="code-inline float-right">.p-*</code>
        </h3>
        <Container className="card p-1 mb-3">
          <Item>p-1</Item>
        </Container>
        <Container className="card p-2 mb-3">
          <Item>p-2</Item>
        </Container>
        <Container className="card p-3 mb-3">
          <Item>p-3</Item>
        </Container>
        <Container className="card p-4 mb-3">
          <Item>p-4</Item>
        </Container>
        <Container className="card p-5 mb-3">
          <Item>p-5</Item>
        </Container>
        <h3 className="tw-normal mb-4 mt-4">
          Horizontal <code className="code-inline float-right">.px-*</code>
        </h3>
        <Container className="card px-1 mb-3">
          <Item>px-1</Item>
        </Container>
        <Container className="card px-2 mb-3">
          <Item>px-2</Item>
        </Container>
        <Container className="card px-3 mb-3">
          <Item>px-3</Item>
        </Container>
        <Container className="card px-4 mb-3">
          <Item>px-4</Item>
        </Container>
        <Container className="card px-5 mb-3">
          <Item>px-5</Item>
        </Container>
        <h3 className="tw-normal mb-4 mt-4">
          Vertical <code className="code-inline float-right">.py-*</code>
        </h3>
        <Container className="card py-1 mb-3">
          <Item>py-1</Item>
        </Container>
        <Container className="card py-2 mb-3">
          <Item>py-2</Item>
        </Container>
        <Container className="card py-3 mb-3">
          <Item>py-3</Item>
        </Container>
        <Container className="card py-4 mb-3">
          <Item>py-4</Item>
        </Container>
        <Container className="card py-5 mb-3">
          <Item>py-5</Item>
        </Container>
      </div>
    )),
  )
