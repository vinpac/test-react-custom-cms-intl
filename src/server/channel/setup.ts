import { Express, Request } from 'express'
import { dev } from '~/core/constants'
import { resolve } from 'path'
import { Channel } from '~/types/channel'

export interface ChannelRequest extends Request {
  channel: Channel
}

let cachedChannel: Channel | undefined
function getChannel(): Channel {
  if (!dev && cachedChannel) {
    return cachedChannel
  }

  const channelConfigPath = resolve('src/content/channel.json')
  // @ts-ignore
  delete __non_webpack_require__.cache[channelConfigPath]
  // @ts-ignore
  cachedChannel = __non_webpack_require__(channelConfigPath)

  return cachedChannel!
}

export default (server: Express) => {
  server.use((req: ChannelRequest, _, next) => {
    req.channel = getChannel()
    next()
  })
}
