import { APP_URL } from '../core/constants'
import {
  fetch as defaultFetch,
  fetchJSON as defaultFetchJSON,
} from '~/lib/fetch/fetch.client'

const normalizeUrl = url => (url.startsWith('/') ? `${APP_URL}${url}` : url)
export const fetch = (url, options) => defaultFetch(normalizeUrl(url), options)
export const fetchJSON = (url, options) =>
  defaultFetchJSON(normalizeUrl(url), options)
