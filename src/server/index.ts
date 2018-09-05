import './core/setup'
import { resolve } from 'path'
import * as express from 'express'
import * as next from 'next'
import * as bodyParser from 'body-parser'
import { dev, STATIC_DIST_DIRNAME } from '~/core/constants'
import setupChannel, { ChannelRequest } from './channel/setup'
import setupIntl from './intl/setup'
import setupCMS from './cms/setup'

const port = process.env.PORT || 3000
const server = express()

// Body parser
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use(
  `/_static/${STATIC_DIST_DIRNAME}`,
  express.static(
    resolve('.dist', 'static'),
    dev
      ? {}
      : {
          maxAge: 31536000000,
          immutable: true,
        },
  ),
)
server.use(
  express.static(resolve('public'), {
    maxAge: 31536000000,
    immutable: true,
  }),
)

setupChannel(server)
setupIntl(server)
setupCMS(server)

const listen = () =>
  server.listen(port, () => console.info(`> Ready on http://localhost:${port}`))

if (!process.env.DISABLE_NEXT) {
  const app = next({ dir: 'src', dev, quiet: true })
  const handle = app.getRequestHandler()

  // Define routes
  require('./routes').default(app, server)

  // Handle get request with next request handler
  server.get('*', (req, res) => handle(req, res))

  app.prepare().then(listen)
} else {
  server.get('/', (req: ChannelRequest, res) =>
    res.json({
      channel: req.channel,
    }),
  )
  listen()
}
