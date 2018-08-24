import * as React from 'react'
import styled from 'styled-components'
import {
  StatelessInputComponent,
  PropertyControl,
} from '~/components/ContentEditor/types'
import ControlForm from '~/components/ContentEditor/Editor/ControlForm'

export const ButtonGroup = styled.div.attrs({ className: 'btn-group w-100' })`
  display: flex;

  .btn {
    border-left-width: 0;
    border-right-width: 0;
    position: relative;
    flex: 1 1 auto;
    font-size: 12px;
    background: #272527;
    border-width: 0;
    padding: 7px 2px;
    color: #aaa;
    font-weight: normal;

    &:hover,
    &:focus {
      color: #fff;
      box-shadow: none !important;
    }

    &::after {
      content: '';
      position: absolute;
      left: -1px;
      width: 1px;
      background: rgba(255, 255, 255, 0.1);
      top: 6px;
      bottom: 6px;
      z-index: 10;
    }

    &.active {
      font-weight: 500;
      background: #3b393e;

      &,
      &:hover,
      &:focus {
        color: #fff;
        box-shadow: none !important;
      }
    }
  }

  .btn.active::after,
  .btn.active + .btn::after {
    display: none;
  }

  .btn:first-child {
    border-right-width: 1px;
  }

  .btn:first-child {
    border-right-width: 1px;

    &::after {
      display: none;
    }
  }
`

type Option = { label: string; value: string }
export const SegmentedEnumControlType = '@@control/SegmentedEnum'
export interface SegmentedEnumControl extends PropertyControl {
  type: '@@control/SegmentedEnum'
  options: Option[]
}

interface SegmentedEnumInputControlProps {
  readonly placeholder?: string
  options: Option[]
}

const SegmentedEnumInputControl: StatelessInputComponent<
  string,
  SegmentedEnumInputControlProps
> = ({ label, options, value, onChange }) => (
  <ControlForm label={label}>
    <ButtonGroup>
      {options.map(option => (
        <button
          key={option.label}
          className={`btn ${option.value === value ? 'active' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </ButtonGroup>
  </ControlForm>
)

SegmentedEnumInputControl.defaultValue = ''
SegmentedEnumInputControl.displayName = 'SegmentedEnumInputControl'

export default SegmentedEnumInputControl
