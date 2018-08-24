/*
  Every file ,js in the same level will be considered a reducer
  So if you create a file under ducks/ you have to 'export default a reducer'
*/

import { combineReducers } from 'redux'
import user, { State as UserState } from '~/redux/ducks/user'
import channel, { ChannelReducerState } from '~/redux/ducks/channel'
import intl, { IntlReducerState } from '~/redux/ducks/intl'

export type RootState = {
  readonly user: UserState
  readonly channel: ChannelReducerState
  readonly intl: IntlReducerState
}

export default combineReducers<RootState>({
  user,
  channel,
  intl,
})
