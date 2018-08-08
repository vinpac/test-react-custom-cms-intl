import next from 'next'
import { Express } from 'express'

export default (app: next.Server, server: Express): void => {
  server.get('/', (req: any, res: any) => app.render(req, res, '/home'))
  server.get('/about', (req: any, res: any) => app.render(req, res, '/about'))
}
