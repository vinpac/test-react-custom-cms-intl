import { Modifier } from '~/components/ContentEditor/types'

const RadiusModifier: Modifier<string> = (props, value) => {
  return {
    ...props,
    style: {
      ...props.style,
      borderRadius: value,
    },
  }
}

export default RadiusModifier
