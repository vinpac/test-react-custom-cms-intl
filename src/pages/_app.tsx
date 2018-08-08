import NextApp, { Container, AppComponentProps } from 'next/app'
import React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import withRedux from '~/redux/with-redux'
import { RootState } from '~/redux/root-reducer'

declare global {
  interface Window {
    __NEXT_DATA__: { [key: string]: any }
    ReactIntlLocaleData: { [lang: string]: string }
  }
}

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang])
  })
}

interface AppProps extends AppComponentProps {
  readonly store: Store
  readonly locale: string
  readonly messages: { [messageId: string]: object }
}

class App extends NextApp<AppProps> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx
    const { locale, messages } = req || window.__NEXT_DATA__.props.pageProps

    return { pageProps, locale, messages }
  }

  render() {
    const { Component, store, pageProps, locale, messages } = this.props
    const now = Date.now()

    return (
      <Container>
        <IntlProvider locale={locale} messages={messages} initialNow={now}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </IntlProvider>
      </Container>
    )
  }
}

const mapStateToProps = ({ user }: RootState) => ({
  authToken: user ? user.name : null,
})
export default withRedux(mapStateToProps)(App as any)
