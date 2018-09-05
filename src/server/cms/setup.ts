import { Express } from 'express'
import * as CMS from '~/lib/cms'

export default (server: Express) => {
  server.get('/api/v1/cms/:slug*', async (req, res, next) => {
    try {
      const content = await CMS.get(`${req.params.slug}${req.params[0] || ''}`)

      res.json(content)
    } catch (error) {
      if (error instanceof CMS.NotFound) {
        next()
        return
      }

      next(error)
    }
  })
}
