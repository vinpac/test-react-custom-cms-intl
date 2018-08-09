import { Modifier } from '~/components/ContentEditor/types'

interface BackgroundValue {
  readonly color: string
}

const BackgroundModifier: Modifier<BackgroundValue> = (props, { color }) => {
  return {
    ...props,
    style: {
      ...props.style,
      backgroundColor: color,
    },
  }
}

export default BackgroundModifier
