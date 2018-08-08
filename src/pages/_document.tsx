import NextDocument, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { NextDocumentContext } from 'next/document'
import { STATIC_DIST_DIRNAME } from '~/core/constants'
import { IncomingMessage } from 'http'

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class Document extends NextDocument {
  static getInitialProps({
    renderPage,
    req: { locale, localeDataScript },
  }: NextDocumentContext & {
    req: IncomingMessage & { locale: string; localeDataScript: string }
  }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App: any) => props =>
      sheet.collectStyles(<App {...props} />),
    )
    const styleTags = sheet.getStyleElement()
    return {
      ...page,
      locale,
      localeDataScript,
      styleTags,
    }
  }

  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${
      this.props.locale
    }`

    return (
      <html>
        <Head>
          <title>My page</title>
          <link
            rel="stylesheet"
            href={`/_static/${STATIC_DIST_DIRNAME}/_index.css`}
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700"
            rel="stylesheet"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}
