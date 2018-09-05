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

export const ControlType: {
  Boolean: BooleanControlType
  String: StringControlType
  Number: NumberControlType
  Object: ObjectControlType
  Color: ColorControlType
  SegmentedEnum: SegmentedEnumControlType
} = {
  Boolean: BooleanControlType,
  String: StringControlType,
  Number: NumberControlType,
  Object: ObjectControlType,
  Color: ColorControlType,
  SegmentedEnum: SegmentedEnumControlType,
}

export type PropertyControls<P = any> = {
  [K in keyof P]?: ControlDescription<Partial<P>>
}

export type ControlDescription<Props> =
  | StringControl
  | BooleanControl
  | ColorControl
  | SegmentedEnumControl
  | NumberControl
  | ObjectControl<Props>

export default {
  [ControlType.Boolean]: BooleanInputControl,
  [ControlType.String]: StringInputControl,
  [ControlType.Number]: NumberInputControl,
  [ControlType.Color]: ColorInputControl,
  [ControlType.SegmentedEnum]: SegmentedEnumInputControl,
  [ControlType.Object]: ObjectInputControl,
}
