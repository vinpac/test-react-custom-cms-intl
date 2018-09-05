import NextApp, { Container, AppComponentProps } from 'next/app'
import React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import styled, { ThemeProvider } from 'styled-components'
import Router from 'next/router'
import withRedux from '~/redux/with-redux'
import { RootState } from '~/redux/root-reducer'
import { GlobalModals } from '~/components/Modal'
import globalModals from '~/components/Modal/global-modals'
import ProgressBar from '~/components/ProgressBar'

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

const GlobalProgressBar = styled(ProgressBar)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 9000;
`

interface AppProps extends AppComponentProps {
  readonly store: Store
}

class App extends NextApp<AppProps> {
  progressBar: ProgressBar | null

  componentDidMount() {
    if (this.progressBar) {
      Router.onRouteChangeStart = this.progressBar.start
      Router.onRouteChangeComplete = this.progressBar.done
      Router.onRouteChangeError = this.progressBar.done
    }
  }

  render() {
    const { Component, store, pageProps } = this.props
    const {
      channel,
      intl: { locale, messages },
    } = store.getState()
    const now = Date.now()

    return (
      <Container>
        <IntlProvider locale={locale} messages={messages} initialNow={now}>
          <Provider store={store}>
            <ThemeProvider theme={{ colorPrimary: channel.theme.colorPrimary }}>
              <GlobalModals modals={globalModals}>
                <GlobalProgressBar
                  innerRef={ref => {
                    this.progressBar = ref as ProgressBar
                  }}
                />
                <Component {...pageProps} />
              </GlobalModals>
            </ThemeProvider>
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
