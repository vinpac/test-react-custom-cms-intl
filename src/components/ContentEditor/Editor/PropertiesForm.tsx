import * as React from 'react'
import Schema from '~/components/ContentEditor/models/Schema'

interface PropertiesFormProps {
  readonly schema: Schema
  readonly className?: string
  readonly controls: object
  readonly value: object
  readonly onChange: (value: object) => void
}

const PropertiesForm: React.SFC<PropertiesFormProps> = ({
  schema,
  onChange,
  controls,
  value,
}) => (
  <>
    {Object.keys(controls).map(propertyKey => {
      const { type, label, ...props } = controls[propertyKey]
      const Input = schema.getInputControl(type)

      if (!Input) {
        console.error(
          `Invalid Property Control '${type}' given at \`${propertyKey}.type\``,
        )

        return null
      }

      return (
        <Input
          key={propertyKey}
          {...props}
          label={label}
          schema={schema}
          onChange={newValue =>
            onChange({
              ...value,
              [propertyKey]: newValue,
            })
          }
          value={
            value[propertyKey] !== undefined
              ? value[propertyKey]
              : Input.defaultValue
          }
        />
      )
    })}
  </>
)

PropertiesForm.displayName = 'PropertiesForm'
PropertiesForm.defaultProps = {
  className: undefined,
}

export default PropertiesForm
