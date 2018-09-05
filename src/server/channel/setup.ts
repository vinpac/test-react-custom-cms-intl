import { Express, Request } from 'express'
import { dev } from '~/core/constants'
import { resolve } from 'path'
import { Channel } from '~/types/channel'
import { fetchAPI } from '~/lib/fetch'

export interface ChannelRequest extends Request {
  channel: Channel
}

let cachedChannel: Channel | undefined
async function getChannel(): Promise<Channel> {
  if (!dev && cachedChannel) {
    return cachedChannel
  }

  const channelConfigPath = resolve('src/channel/channel.json')
  // @ts-ignore
  delete __non_webpack_require__.cache[channelConfigPath]
  cachedChannel = {
    causes: [],
    skills: [],
    assets: {},
    // @ts-ignore
    ...__non_webpack_require__(channelConfigPath),
  }

  try {
    const { causes, skills } = await fetchAPI('/startup/')
    if (cachedChannel) {
      cachedChannel.causes = causes
      cachedChannel.skills = skills
    }
  } catch (error) {
    if (dev) {
      console.error('> Failed to fetch startup')
    } else {
      console.error(error)
    }
  }

  return cachedChannel!
}

export default (server: Express) => {
  server.use(async (req: ChannelRequest, _, next) => {
    req.channel = await getChannel()
    next()
  })
}
