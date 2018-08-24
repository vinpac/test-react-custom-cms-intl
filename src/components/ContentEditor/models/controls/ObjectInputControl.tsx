import * as React from 'react'
import {
  StatelessInputComponent,
  PropertyControl,
} from '~/components/ContentEditor/types'
import PropertiesForm from '~/components/ContentEditor/Editor/PropertiesForm'

interface ObjectInputControlProps {
  readonly placeholder?: string
  readonly controls: { [key: string]: PropertyControl }
}

export const ObjectControlType = '@@control/Object'
export interface ObjectControl<P> extends PropertyControl {
  type: '@@control/Object'
  controls: P
}

const ObjectInputControl: StatelessInputComponent<
  object,
  ObjectInputControlProps
> = ({ schema, controls, value, onChange }) => (
  <PropertiesForm
    schema={schema}
    controls={controls}
    value={value}
    onChange={newValue => onChange(newValue)}
  />
)

ObjectInputControl.defaultValue = {}
ObjectInputControl.displayName = 'ObjectInputControl'

export default ObjectInputControl
