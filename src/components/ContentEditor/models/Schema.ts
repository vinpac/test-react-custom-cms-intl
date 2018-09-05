import defaultInputComponents, {
  PropertyControls,
  ControlType,
} from '~/components/ContentEditor/models/controls'
import {
  ComponentsMap,
  ModifiersMap,
  InputComponentsMap,
  InputComponent,
  ComponentDescription,
  Modifier,
  InputComponentType,
  StringComponentType,
  ComponentType,
} from '~/components/ContentEditor/types'
import { getWrappedComponent } from '~/components/ContentEditor/Editor/utils'

interface TextProps {
  value: string
}
const Text: StringComponentType<TextProps> &
  ComponentDescription<PropertyControls<TextProps>> = ({
  value,
}: {
  value: string
}) => value
Text.propertyControls = {
  value: {
    type: ControlType.String,
    label: 'Text',
    placeholder: 'Text...',
  },
}

class Schema<Controls = PropertyControls<any>> {
  protected plainTypes: string[]
  protected components: ComponentsMap<Controls>
  protected modifiers: ModifiersMap
  protected inputComponents: InputComponentsMap

  constructor({
    plainTypes,
    modifiers,
    components,
    inputComponents,
  }: {
    plainTypes?: string[]
    components: ComponentsMap<Controls>
    modifiers?: ModifiersMap
    inputComponents?: InputComponentsMap
  }) {
    this.plainTypes = plainTypes || []
    this.components = components
    this.modifiers = modifiers || {}
    this.inputComponents = {
      ...defaultInputComponents,
      ...inputComponents,
    }
  }

  getComponentKinds = (): string[] => Object.keys(this.components)

  getComponent = (kind: string): ComponentType<any, Controls> | undefined => {
    return this.components[kind]
  }

  getComponentDescription(
    kind: string,
  ): ComponentType<any, Controls> | undefined {
    return this.components[kind]
      ? getWrappedComponent(this.components[kind])
      : undefined
  }

  isValidPlainType(kind: string): boolean {
    return this.plainTypes.indexOf(kind) !== -1
  }

  getModifier(kind: string): Modifier<any> | undefined {
    return this.modifiers[kind]
  }

  getInputControl = (kind: string): InputComponentType<any, any> | undefined =>
    this.inputComponents[kind]

  addComponent(kind: string, component: ComponentType<any, Controls>) {
    this.components[kind] = component
  }

  addInputComponent(kind: string, component: InputComponent<any, any>) {
    this.inputComponents[kind] = component
  }
}

export default Schema
