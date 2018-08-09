import { Modifier } from '~/components/ContentEditor/types'

interface MarginValue {
  readonly top: number
  readonly left: number
  readonly right: number
  readonly bottom: number
}

const MarginModifier: Modifier<MarginValue> = (
  props,
  { top, left, right, bottom },
) => {
  return {
    ...props,
    className: `${props.className || ''} ${top ? `mt-${top}` : ''} ${
      left ? `ml-${left}` : ''
    } ${right ? `mr-${right}` : ''} ${bottom ? `mb-${bottom}` : ''}`.trim(),
  }
}

export default MarginModifier
