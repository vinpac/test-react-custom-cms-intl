import isPlainObject from 'is-plain-object'
import isoFetch from 'isomorphic-fetch'
import queryString from 'query-string'

export function fetch(rawURL, options) {
  let url = rawURL

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
      options.headers['x-next-auth-token'] = options.session.id
      options.headers['x-next-auth-secret'] = options.session.secret
    }
  }

  return isoFetch(url, options).then(response => {
    if (response.status !== 200 && response.status !== 201) {
      throw response
    }

    return response
  })
}

export function fetchJSON(url, options) {
  return fetch(url, options)
    .then(response => (response.json ? response.json() : response))
    .catch(response => {
      if (response.json) {
        return response.json().then(json => {
          throw json
        })
      }

      throw response
    })
}
