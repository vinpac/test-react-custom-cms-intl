import next from 'next'
import { Express } from 'express'

export default (app: next.Server, server: Express): void => {
  server.get('/editor/:slug', (req: any, res: any) => {
    app.render(req, res, '/editor', { slug: `pages/${req.params.slug}` })
  })

  server.get('/render', (req: any, res: any) =>
    app.render(req, res, '/render-cms', {
      key: req.query.key,
    }),
  )

  server.get('/:slug', (req: any, res: any) =>
    app.render(req, res, '/render', { slug: req.params.slug }),
  )

  server.get('/', (req: any, res: any) =>
    app.render(req, res, '/render', { slug: 'home' }),
  )
}
