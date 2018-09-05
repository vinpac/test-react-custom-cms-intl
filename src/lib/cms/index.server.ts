import { readFile } from 'fs'
import { dev } from '~/core/constants'
import path from 'path'
import { Content, NotFound } from '~/lib/cms/types'

export { NotFound }

const cache: { [filepath: string]: Content } = {}

export const reset = (filepath: string): Promise<Content> => {
  delete cache[filepath]

  return get(filepath)
}

export const get = async (filepath: string): Promise<Content> => {
  let json: Content | undefined = cache[filepath]

  try {
    if (!json || dev) {
      json = await new Promise<Content>((resolve, reject) => {
        readFile(
          `${path.resolve('src', 'channel', 'content', filepath)}.json`,
          'utf8',
          (error, body) => {
            if (error) {
              reject(error)
              return
            }

            resolve(JSON.parse(body) as Content)
          },
        )
      })
    }

    cache[filepath] = json
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new NotFound(error.path)
    }

    throw error
  }

  return json
}
