import { fetchJSON } from '~/lib/fetch'
import { dev } from '~/core/constants'
import { Cache, NotFound, Content } from '~/lib/cms/types'

export { NotFound }

const cache: Cache = {}

export const reset = (slug: string): Promise<Content> => {
  delete cache[slug]

  return get(slug)
}

export const get = async (slug: string): Promise<Content> => {
  let json: Content | undefined = cache[slug]

  try {
    if (!json || dev) {
      json = (await fetchJSON(`/api/v1/cms/${slug}`)) as Content
    }

    if (json) {
      cache[slug] = json
    }
  } catch (error) {
    if (error.status === 404) {
      throw new NotFound(slug)
    }

    throw error
  }

  return json
}
