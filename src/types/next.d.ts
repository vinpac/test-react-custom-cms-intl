import next from 'next'
import { Store as ReduxStore, AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

interface Store<S = any, A extends Action<any> = AnyAction>
  extends ReduxStore<S, A> {
  dispatch: ThunkDispatch<S, any, A>
}

declare module 'next' {
  export interface NextContext {
    store: Store
  }
}
