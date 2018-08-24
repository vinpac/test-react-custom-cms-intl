type WrapperComponent = React.ComponentType & {
  WrappedComponent?: WrapperComponent
}

export function generateRandomId(): string {
  return Math.random()
    .toString(36)
    .substring(7)
}

export const getWrappedComponent = (
  component: WrapperComponent,
): React.ComponentType => {
  if (component.WrappedComponent!) {
    return getWrappedComponent(component.WrappedComponent!)
  }

  return component
}
