import defaultInputComponents, {
  PropertyControls,
  ControlType,
} from '~/components/ContentEditor/models/controls'
import {
  ComponentsMap,
  ModifiersMap,
  InputComponentsMap,
  InputComponent,
  ComponentOptions,
  Modifier,
  ComponentDefinition,
  InputComponentType,
} from '~/components/ContentEditor/types'
import { ComponentType } from 'react'

const TextComponentDefinition = {
  component: ({ value }: { value: string }) => value,
  propertyControls: {
    value: {
      type: ControlType.String,
      label: 'Text',
      placeholder: 'Text...',
    },
  },
}

class Schema<C = PropertyControls<any>> {
  protected plainTypes: string[]
  protected components: ComponentsMap<C>
  protected modifiers: ModifiersMap
  protected inputComponents: InputComponentsMap

  constructor({
    plainTypes,
    modifiers,
    components,
    inputComponents,
  }: {
    plainTypes?: string[]
    components: ComponentsMap<C>
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

  getComponent(kind: string): ComponentDefinition<C> | undefined {
    const def = this.components[kind]

    if (!def && kind === 'Text') {
      // @ts-ignore
      return TextComponentDefinition
    }

    return def
  }

  getReactComponent(kind: string): ComponentType | undefined {
    return this.components[kind] ? this.components[kind].component : undefined
  }

  isValidPlainType(kind: string): boolean {
    return this.plainTypes.indexOf(kind) !== -1
  }

  getModifier(kind: string): Modifier<any> | undefined {
    return this.modifiers[kind]
  }

  getInputControl = (kind: string): InputComponentType<any, any> | undefined =>
    this.inputComponents[kind]

  addComponent(
    kind: string,
    component: React.ComponentType,
    options?: ComponentOptions<C>,
  ) {
    this.components[kind] = {
      ...options,
      component,
    }
  }

  addInputComponent(kind: string, component: InputComponent<any, any>) {
    this.inputComponents[kind] = component
  }
}

export default Schema
