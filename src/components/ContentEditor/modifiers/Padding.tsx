import { Modifier } from '~/components/ContentEditor/types'

interface PaddingValue {
  readonly type: 'vertical' | 'horizontal' | 'both'
  readonly length: number
}

const PaddingModifier: Modifier<PaddingValue> = (props, { length, type }) => {
  return {
    ...props,
    className: `${props.className || ''} p${
      type === 'both' ? '' : type === 'vertical' ? 'y' : 'x'
    }-${length}`.trim(),
  }
}

export default PaddingModifier
