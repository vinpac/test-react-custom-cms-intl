import { Modifier } from '~/components/ContentEditor/types'

interface BackgroundValue {
  readonly color?: string
  readonly image?: string
  readonly size?: string
  readonly position?: string
}

const BackgroundModifier: Modifier<BackgroundValue> = (
  props,
  { color, image, size, position },
) => {
  const style: React.CSSProperties = {}

  if (color) {
    style.backgroundColor = color
  }

  if (size) {
    style.backgroundSize = size
  }

  if (position) {
    style.backgroundPosition = position
  }

  if (image) {
    style.backgroundImage = `url('${image}')`

    if (!size && !position) {
      style.backgroundSize = 'cover'
      style.backgroundPosition = 'center'
    }
  }

  return {
    ...props,
    style: {
      ...props.style,
      ...style,
    },
  }
}

export default BackgroundModifier
