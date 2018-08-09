import { Express, Request } from 'express'
import flatten from 'flat'
import yaml from 'js-yaml'
import IntlPolyfill from 'intl'
import accepts from 'accepts'
import { resolve, dirname, basename, relative } from 'path'
import { readFileSync } from 'fs'
import glob from 'glob'
import { dev } from '~/core/constants'

Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

interface IntlMessages {
  [messageId: string]: string
}

// Get the supported languages by looking for translations in the `lang/` dir.
const messagesFilesPath = resolve('src/lang/*/index.yaml')
const languages: string[] = glob
  .sync(messagesFilesPath)
  .map(filepath => basename(dirname(filepath)))

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map()
const getLocaleDataScript = (locale: string) => {
  const lang = locale.split('-')[0]

  if (!localeDataCache.has(lang)) {
    // @ts-ignore
    const localeDataFile = __non_webpack_require__.resolve(
      `react-intl/locale-data/${lang}`,
    )

    const localeDataScript = readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(lang, localeDataScript)
  }

  return localeDataCache.get(lang)
}

// We need to load and expose the translations on the request for the user's
// locale. This will load every yaml file under `src/lang/{locale}` and
// `src/lang/.defaults`.
// In production it will only load a locale's messages once.
const messagesCache = new Map<string, IntlMessages>()
let definedMessages: object | undefined
const getMessages = (locale: string): IntlMessages => {
  if (!dev && messagesCache.has(locale)) {
    return messagesCache.get(locale)!
  }

  const localeDir = `src/lang/${locale}`
  const messages: IntlMessages = {}

  // Include definedMessages
  if (!dev) {
    if (definedMessages) {
      Object.assign(messages, definedMessages)
    } else {
      definedMessages = {}
      glob.sync(resolve('src/lang/.defaults/**/*.yaml')).forEach(filepath => {
        // @ts-ignore
        __non_webpack_require__(filepath, 'utf8').forEach(message => {
          definedMessages![message.id] = message.defaultMessage
        })
      })

      Object.assign(messages, definedMessages)
    }
  }

  glob.sync(resolve(`${localeDir}/**/*.yaml`)).forEach(filepath => {
    const relpath = relative(localeDir, filepath)
    const json = flatten(yaml.safeLoad(readFileSync(filepath, 'utf8')))

    if (relpath === 'index.yaml') {
      Object.assign(messages, json)
      return
    }

    if (relpath.endsWith('/index.yaml')) {
      Object.assign(
        messages,
        flatten({
          [basename(dirname(relpath).replace(/\//g, '.'), '.yaml')]: flatten(
            json,
          ),
        }),
      )
      return
    }

    Object.assign(
      messages,
      flatten({
        [basename(relpath.replace(/\//g, '.'), '.yaml')]: flatten(json),
      }),
    )
  })

  if (!dev) {
    messagesCache.set(locale, messages)
  }

  return messages
}

export interface IntlRequest extends Request {
  locale: string
  localeDataScript
  messages: IntlMessages
}

export default (server: Express) => {
  server.use((req: IntlRequest, _, next) => {
    const accept = accepts(req)
    const locale: string = accept.language(languages)

    req.locale = locale
    req.localeDataScript = getLocaleDataScript(locale)
    req.messages = getMessages(locale)

    next()
  })
}
