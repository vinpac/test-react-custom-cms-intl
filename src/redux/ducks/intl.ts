export type IntlReducerState =
  | {
      readonly locale: string
      readonly messages: { [messageId: string]: string }
    }
  | {}

export default (state: IntlReducerState = {}): IntlReducerState => state
