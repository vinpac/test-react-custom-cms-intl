import {
  Options,
  fetch as defaultFetch,
  fetchJSON as defaultFetchJSON,
} from '~/lib/fetch/fetch.client'
import { APP_URL, API_URL } from '~/core/constants'

const normalizeUrl = url => (url.startsWith('/') ? `${APP_URL}${url}` : url)
export const fetch = (url: string, options?: Options) =>
  defaultFetch(normalizeUrl(url), options)
export const fetchJSON = (url: string, options?: Options) =>
  defaultFetchJSON(normalizeUrl(url), options)
export const fetchAPI = (url: string, options?: Options) =>
  defaultFetchJSON(`${API_URL}${url}`, options)
