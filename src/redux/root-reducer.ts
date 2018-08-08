/*
  Every file ,js in the same level will be considered a reducer
  So if you create a file under ducks/ you have to 'export default a reducer'
*/

import { combineReducers } from 'redux'
import user, { State as UserState } from './ducks/user'

export type RootState = {
  readonly user: UserState
}

export default combineReducers<RootState>({
  user,
})
