import * as React from 'react'
import styled from 'styled-components'
import {
  StatelessInputComponent,
  PropertyControl,
} from '~/components/ContentEditor/types'
import ControlForm from '~/components/ContentEditor/Editor/ControlForm'

interface NumberInputControlProps {
  readonly placeholder?: string
}

const Input = styled.input.attrs({ className: 'input' })`
  color: #fff;
  background: #232223;
  border-color: #010101;
  font-size: 14px;
  padding: 4px 6px;
  height: 30px;

  &:disabled {
    background: #232223;
    opacity: 0.6;
  }

  &:hover {
    border-color: #010101;
  }

  &:focus {
    border-color: #0099fe;
  }

  &::placeholder {
    color: #999;
  }
`

export const NumberControlType = '@@control/Number'
export type NumberControlType = '@@control/Number'
export interface NumberControl extends PropertyControl {
  type: NumberControlType
  placeholder?: string
}

const NumberInputControl: StatelessInputComponent<
  number | null,
  NumberInputControlProps
> = ({ placeholder, label, value, onChange }) => (
  <ControlForm
    label={label}
    optional
    checked={value !== null}
    onChange={e => (e.target.checked ? onChange(0) : onChange(null))}
  >
    <Input
      placeholder={placeholder}
      type="text"
      value={value || 0}
      disabled={value === null}
      onChange={event => onChange(parseFloat(event.target.value))}
    />
  </ControlForm>
)

NumberInputControl.defaultValue = 0
NumberInputControl.displayName = 'NumberInputControl'

export default NumberInputControl
