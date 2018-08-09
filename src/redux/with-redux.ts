import { createStore, applyMiddleware, compose, Middleware } from 'redux'
import withRedux, { StoreCreatorOptions } from 'next-redux-wrapper'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { dev } from '~/core/constants'
import rootReducer from '~/redux/root-reducer'
import { MapStateToProps, MapDispatchToProps, MergeProps } from 'react-redux'
import { Channel } from '~/types/channel'
import { IncomingMessage } from 'http'

declare global {
  interface Window {
    devToolsExtension: Function
  }
}

interface MyStoreCreatorOptions
  extends StoreCreatorOptions<any, any, any, any, any> {
  req: IncomingMessage & { channel: Channel } & {
    locale: string
    messages: { [messageId: string]: string }
  }
}

const configureStore = (baseState: object, context: MyStoreCreatorOptions) => {
  let initialState = baseState
  if (context && context.isServer) {
    initialState = {
      channel: context.req.channel,
      intl: {
        locale: context.req.locale,
        messages: context.req.messages,
      },
    }
  }

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
