import { Channel } from '~/types/channel'

export type ChannelReducerState = Channel | {}
export default (channel: ChannelReducerState = {}): ChannelReducerState =>
  channel
