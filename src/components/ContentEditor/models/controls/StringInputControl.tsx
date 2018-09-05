import * as React from 'react'
import styled from 'styled-components'
import {
  PropertyControl,
  InputComponentProps,
} from '~/components/ContentEditor/types'
import ControlForm from '~/components/ContentEditor/Editor/ControlForm'
import Icon from '~/components/Icon'

interface StringInputControlProps {
  readonly label?: string
  readonly placeholder?: string
  readonly format?: string
  readonly addon?: { type: string; name: string; set?: 'material' }
}

const Input = styled.input.attrs({ className: 'input' })`
  color: #fff;
  background: #272527;
  border-width: 0;
  font-size: 13px;
  padding: 4px 6px;
  height: 28px;

  &:focus {
    border-color: #0099fe;
  }

  &::placeholder {
    color: #999;
  }
`

export const StringControlType = '@@control/String'
export type StringControlType = '@@control/String'
export interface StringControl extends PropertyControl {
  type: StringControlType
  placeholder?: string
  format?: string
  addon?: { type: string; name: string; set?: 'material' }
}

const unformatValue = (value: string, map: string) => {
  const [prefix, suffix] = map.split('$0')

  return `${value.substr(
    prefix.length,
    value.length - prefix.length - suffix.length,
  )}`
}

const formatValue = (value: string, map: string) => {
  const [prefix, suffix] = map.split('$0')

  return `${prefix}${value}${suffix}`
}

interface StringInputControlState {
  value: string
}

class StringInputControl extends React.Component<
  StringInputControlProps & InputComponentProps<string>,
  StringInputControlState
> {
  static defaultProps = {
    className: undefined,
  }

  static defaultValue = ''

  static getDerivedStateFromProps(
    props: StringInputControlProps & InputComponentProps<string>,
    state,
  ): StringInputControlState {
    const { format } = props
    return {
      value: state
        ? state.value
        : format
          ? unformatValue(props.value, format)
          : props.value,
    }
  }

  constructor(props) {
    super(props)

    this.state = StringInputControl.getDerivedStateFromProps(props, null)
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    this.setState({ value })
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      this.fireChange()
    }
  }

  fireChange = () => {
    const { onChange, format } = this.props
    const { value } = this.state

    onChange(format ? formatValue(value, format) : value)
  }

  render() {
    const { placeholder, label, addon } = this.props
    const { value } = this.state

    const input = (
      <Input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onBlur={this.fireChange}
      />
    )
    return (
      <ControlForm label={label}>
        {addon ? (
          <div className="input-group">
            <span className="input-group-prepend">
              <Icon
                name={addon.name}
                iconSet={addon.set}
                className="input-group-text"
              />
            </span>
            {input}
          </div>
        ) : (
          input
        )}
      </ControlForm>
    )
  }
}

export default StringInputControl
