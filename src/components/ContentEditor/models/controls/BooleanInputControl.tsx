import * as React from 'react'
import {
  StatelessInputComponent,
  PropertyControl,
} from '~/components/ContentEditor/types'
import ControlForm from '~/components/ContentEditor/Editor/ControlForm'
import { ButtonGroup } from '~/components/ContentEditor/models/controls/SegmentedEnumInputControl'

interface BooleanInputControlProps {
  readonly className?: string
  readonly disabled?: string
  readonly enabled?: string
}

export const BooleanControlType = '@@control/Boolean'
export type BooleanControlType = '@@control/Boolean'
export interface BooleanControl extends PropertyControl {
  type: BooleanControlType
  disabled?: string
  enabled?: string
}

const BooleanInputControl: StatelessInputComponent<
  boolean,
  BooleanInputControlProps
> = ({ className, enabled, disabled, label, value, onChange }) => (
  <ControlForm className={className} label={label}>
    <ButtonGroup>
      <button
        className={`btn ${value ? 'active' : ''}`}
        onClick={() => onChange(true)}
      >
        {enabled}
      </button>
      <button
        className={`btn ${!value ? 'active' : ''}`}
        onClick={() => onChange(false)}
      >
        {disabled}
      </button>
    </ButtonGroup>
  </ControlForm>
)

BooleanInputControl.defaultValue = false
BooleanInputControl.displayName = 'BooleanInputControl'
BooleanInputControl.defaultProps = {
  className: undefined,
  disabled: 'False',
  enabled: 'True',
}

export default BooleanInputControl
