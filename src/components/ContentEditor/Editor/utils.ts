import { StringComponentType } from '~/components/ContentEditor/types'

type WrapperComponent = (React.ComponentType | StringComponentType<any>) & {
  WrappedComponent?: WrapperComponent
}

export function generateRandomId(): string {
  return Math.random()
    .toString(36)
    .substring(7)
}

export const getWrappedComponent = (
  component: WrapperComponent,
): React.ComponentType | StringComponentType<any> => {
  if (component.WrappedComponent!) {
    return getWrappedComponent(component.WrappedComponent!)
  }

  return component
}
