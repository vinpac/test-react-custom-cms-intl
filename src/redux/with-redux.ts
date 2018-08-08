import { createStore, applyMiddleware, compose, Middleware } from 'redux'
import withRedux from 'next-redux-wrapper'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { dev } from '~/core/constants'
import rootReducer from '~/redux/root-reducer'
import {
  MapStateToProps,
  MapDispatchToProps,
  MergeProps,
} from '../../node_modules/@types/react-redux'

declare global {
  interface Window {
    devToolsExtension: Function
  }
}

const configureStore = (initialState?: object) => {
  const middleware: Middleware[] = [thunk]

  let enhancer

  if (dev) {
    middleware.push(createLogger())

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = (f: any) => f
    if (typeof window !== 'undefined' && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension()
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    )
  } else {
    enhancer = applyMiddleware(...middleware)
  }

  return createStore(rootReducer, initialState!, enhancer)
}

export default (
  mapStateToProps?: MapStateToProps<any, any, any>,
  mapDispatchToProps?: MapDispatchToProps<any, any>,
  mergeProps?: MergeProps<any, any, any, any>,
) => withRedux(configureStore, mapStateToProps, mapDispatchToProps, mergeProps)
