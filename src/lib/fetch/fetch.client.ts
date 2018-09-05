import isPlainObject from 'is-plain-object'
import isoFetch from 'isomorphic-fetch'
import queryString from 'query-string'
import { API_URL } from '~/core/constants'

export interface Options {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  query?: object
  body?: FormData | object | string
  headers?: object
  channelId: string
  session?: {
    id: string
  }
}

export function fetch(baseUri: string, options?: Options) {
  let url = baseUri

  if (options) {
    if (isPlainObject(options.body)) {
      options.body = JSON.stringify(options.body)
      options.headers = options.headers || {}
      options.headers['Content-Type'] = 'application/json'
    }

    if (options.query) {
      const markIndex = url.indexOf('?')
      let strinfiedQuery = queryString.stringify(options.query)

      if (markIndex === -1) {
        url += `?${strinfiedQuery}`
      } else {
        if (markIndex !== url.length - 1) {
          strinfiedQuery += '&'
        }

        url = url.replace('?', `?${strinfiedQuery}`)
      }
    }

    if (options.session) {
      options.headers = options.headers || {}
      options.headers['Authorization'] = `JWT '${options.session.id}'`
    }
  }

  return isoFetch(url, options).then(response => {
    if (response.status !== 200 && response.status !== 201) {
      throw response
    }

    return response
  })
}

export function fetchJSON(url: string, options?: Options) {
  return fetch(url, options)
    .then(response => response.json())
    .catch(response => {
      if (
        response.headers &&
        response.headers.get('content-type').indexOf('application/json') !==
          -1 &&
        response.json
      ) {
        return response.json().then(json => {
          throw json
        })
      }

      throw response
    })
}

export const fetchAPI = (url: string, options?: Options) =>
  fetchJSON(`${API_URL}${url}`, options)
