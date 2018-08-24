import * as React from 'react'
import styled from 'styled-components'
import {
  StatelessInputComponent,
  PropertyControl,
} from '~/components/ContentEditor/types'
import ControlForm from '~/components/ContentEditor/Editor/ControlForm'

interface ColorInputControlProps {
  readonly placeholder?: string
}

const Input = styled.input.attrs({ className: 'input' })`
  color: #fff;
  background: #232223;
  border-color: #010101;
  font-size: 14px;
  padding: 4px 6px;
  height: 30px;

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

const Button = styled.button.attrs({ className: 'btn btn--block' })`
  padding: 4px;
  background: #232223;
`

const Indicator = styled.div`
  height: 20px;
  border-radius: 3px;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px rgba(0, 0, 0, 0.1);
`

export const ColorControlType = '@@control/Color'
export interface ColorControl extends PropertyControl {
  type: '@@control/Color'
  placeholder?: string
}

const ColorInputControl: StatelessInputComponent<
  string,
  ColorInputControlProps
> = ({ placeholder, label, value, onChange }) => (
  <ControlForm label={label}>
    <div className="row row--gutter-1">
      <div className="col-6 col--gutter-1">
        <Button>
          <Indicator style={{ backgroundColor: value }} />
        </Button>
      </div>
      <div className="col-6 col--gutter-1">
        <Input
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={event => onChange(event.target.value)}
        />
      </div>
    </div>
  </ControlForm>
)

ColorInputControl.defaultValue = ''
ColorInputControl.displayName = 'ColorInputControl'

export default ColorInputControl
