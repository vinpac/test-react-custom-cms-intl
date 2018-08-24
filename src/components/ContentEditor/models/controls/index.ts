import BooleanInputControl, {
  BooleanControlType,
  BooleanControl,
} from './BooleanInputControl'
import StringInputControl, {
  StringControlType,
  StringControl,
} from './StringInputControl'
import ColorInputControl, {
  ColorControlType,
  ColorControl,
} from './ColorInputControl'
import SegmentedEnumInputControl, {
  SegmentedEnumControlType,
  SegmentedEnumControl,
} from './SegmentedEnumInputControl'
import NumberInputControl, {
  NumberControlType,
  NumberControl,
} from './NumberInputControl'
import ObjectInputControl, {
  ObjectControlType,
  ObjectControl,
} from './ObjectInputControl'
import { PropertyControl } from '~/components/ContentEditor/types'

export const ControlType = {
  Boolean: BooleanControlType,
  String: StringControlType,
  Number: NumberControlType,
  Object: ObjectControlType,
  Color: ColorControlType,
  SegmentedEnum: SegmentedEnumControlType,
}

export type PropertyControls<Props> = {
  [K in keyof Props]?: Props[K] extends boolean
    ? BooleanControl
    : Props[K] extends string
      ? StringControl | ColorControl | SegmentedEnumControl
      : Props[K] extends number
        ? NumberControl
        : Props[K] extends object
          ? ObjectControl<PropertyControls<Props>>
          : PropertyControl
}

export default {
  [ControlType.Boolean]: BooleanInputControl,
  [ControlType.String]: StringInputControl,
  [ControlType.Number]: NumberInputControl,
  [ControlType.Color]: ColorInputControl,
  [ControlType.SegmentedEnum]: SegmentedEnumInputControl,
  [ControlType.Object]: ObjectInputControl,
}
